'server-only';
'use server';

import { experts, UserRole } from '@/db/schema';
import { getSession } from '@/lib/session';
import { PERMISSIONS } from './permissions';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { NotifyNames } from '@/lib/notifies';

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

    return {
      success: true,
      fields: rawFields,
    };
  } catch (err) {
    console.error('Database Error (newExpertAction): ', err);
    return {
      success: false,
      error: 'A database error occurred.',
      fields: rawFields,
    };
  }
};

interface DefaultExpertState {
  success: boolean;
  notify?: NotifyNames | null;
  name?: string | null;
}

export const deactivateExpertAction = async (expertId: string): Promise<DefaultExpertState> => {
  const user = await getSession();

  if (!user || !user.session) return {
    success: false,
    notify: 'login_required',
  };

  const role = user.session.userRole as UserRole;
  if (!role || !PERMISSIONS.deactiveExpertAction.includes(role)) return {
    success: false,
    notify: 'unauthorized',
  };

  try {
    const [expert] = await db
      .select({
        id: experts.id,
        name: experts.name,
        status: experts.status,
      })
      .from(experts)
      .where(eq(experts.uuid, expertId))
      .limit(1);

    if (!expert) return {
      success: false,
      notify: 'expert_nonexist',
    };

    if (!expert.status) return {
      success: false,
      notify: 'expert_already_blocked',
      name: expert.name,
    };

    await db
      .update(experts)
      .set({
        status: false,
      })
      .where(eq(experts.id, expert.id));

    revalidatePath('/experts');

    return {
      success: true,
      notify: 'expert_deactivated',
      name: expert.name,
    };
  } catch (err) {
    console.error('Database Error (deactivateExpertAction): ', err);
    return {
      success: false,
      notify: 'database_error',
    };
  }
};

export const deleteExpertAction = async (expertId: string): Promise<DefaultExpertState> => {
  const user = await getSession();

  if (!user || !user.session) return {
    success: false,
    notify: 'login_required',
  };

  const role = user.session.userRole as UserRole;
  if (!role || !PERMISSIONS.deleteExpertAction.includes(role)) return {
    success: false,
    notify: 'unauthorized',
  };

  try {
    const [expert] = await db
      .select({
        id: experts.id,
        name: experts.name,
      })
      .from(experts)
      .where(eq(experts.uuid, expertId))
      .limit(1);

    if (!expert) return {
      success: false,
      notify: 'expert_nonexist',
    };

    await db
      .delete(experts)
      .where(eq(experts.id, expert.id));

    revalidatePath('/experts');

    return {
      success: true,
      notify: 'expert_deleted',
      name: expert.name,
    };
  } catch (err) {
    console.error('Database Error (deleteExpertAction): ', err);
    return {
      success: false,
      notify: 'database_error',
    };
  }
};

export const activateExpertAction = async (expertId: string): Promise<DefaultExpertState> => {
  const user = await getSession();

  if (!user || !user.session) return {
    success: false,
    notify: 'login_required',
  };

  const role = user.session.userRole as UserRole;
  if (!role || !PERMISSIONS.deactiveExpertAction.includes(role)) return {
    success: false,
    notify: 'unauthorized',
  };

  try {
    const [expert] = await db
      .select({
        id: experts.id,
        name: experts.name,
        status: experts.status,
      })
      .from(experts)
      .where(eq(experts.uuid, expertId))
      .limit(1);

    if (!expert) return {
      success: false,
      notify: 'expert_nonexist',
    };

    if (expert.status) return {
      success: false,
      notify: 'expert_already_active',
      name: expert.name,
    };

    await db
      .update(experts)
      .set({
        status: true,
      })
      .where(eq(experts.id, expert.id));

    revalidatePath('/experts');

    return {
      success: true,
      notify: 'expert_activated',
      name: expert.name,
    };
  } catch (err) {
    console.error('Database Error (activateExpertAction): ', err);
    return {
      success: false,
      notify: 'database_error',
    };
  }
};