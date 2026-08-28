'server-only';
'use server';

import { experts, UserRole } from '@/db/schema';
import { getSession } from '@/lib/session';
import { PERMISSIONS } from './permissions';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export type NewExpertFormState = {
  success: boolean;
  error?: string | null;
  fields?: {
    cxId?: string;
    name?: string;
  };
};

export const newExpertAction = async (
  _prevState: NewExpertFormState,
  formData: FormData,
): Promise<NewExpertFormState> => {
  const user = await getSession();

  if (!user || !user.session) return {
    success: false,
    error: 'Unauthorized: You must logged in to perform this action.',
  };

  const role = user.session.userRole as UserRole;
  if (!role || !PERMISSIONS.newExpertAction.includes(role)) return {
    success: false,
    error: 'Forbidden: You do not have permission to perform this action.',
  };

  const cxId = (formData.get('cx_id') as string)?.trim();
  const name = (formData.get('name') as string)?.trim();

  const rawFields = { cxId, name };

  if (!cxId || !name) return {
    success: false,
    error: 'Input values are incorrect',
    fields: rawFields,
  };

  if (cxId.length !== 7) return {
    success: false,
    error: 'CX ID of an expert should be exactly 7 characters.',
    fields: rawFields,
  };

  if (name.length < 3 || name.length > 319) return {
    success: false,
    error: 'Expert name should more than 3 characters and less than 320 characters',
    fields: rawFields,
  };

  try {
    const existing = await db
      .select()
      .from(experts)
      .where(eq(experts.cxId, cxId))
      .limit(1);

    if (existing.length > 0) return {
      success: false,
      error: 'An expert with this CX ID already exists.',
      fields: rawFields,
    };

    await db.insert(experts).values({
      cxId,
      name,
      addedBy: user.session.userId,
    });

    revalidatePath('/experts');

    return { success: true };
  } catch (err) {
    console.error('Database Error (newExpertAction): ', err);
    return {
      success: false,
      error: 'A database error occurred.',
      fields: rawFields,
    };
  }
};

export const deactivateExpertAction = async (expertId: number) => {
  
};