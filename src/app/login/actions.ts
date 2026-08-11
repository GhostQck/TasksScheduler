'use server';

import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

import bcrypt from 'bcryptjs';

import { createSession, destroySession } from '@/lib/session';
import { redirect } from 'next/navigation';

export type AuthFormState = {
  error?: string;
};

export const authUser = async (
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> => {
  const username = formData.get('auth_user') as string;
  const password = formData.get('auth_pwd') as string;
  const redirectTo = (formData.get('redirectTo') as string) || '/';

  if (!username)
    return { error: 'Please enter both username and password' };
  else if (!password)
    return { error: 'Please enter password' };

  try {
    let [user] = await db
      .select()
      .from(users)
      .where(eq(users.login, username.toLowerCase()));

    if (!user)
      return { error: 'Authentication Failed' };

    const isPwdValid = await bcrypt.compare(password, user.password);
    if (!isPwdValid)
      return { error: 'Authentication Failed' };

    await createSession({
      userId: user.id,
      userRole: user.role,
    });
  } catch (err) {
    if (
      err instanceof Error
      && err.message.includes('NEXT_REDIRECT')
    ) throw err;
    
    console.error('Auth error: ', err);

    return { error: 'Unexpected error occurred' };
  }

  redirect(redirectTo);
};

export const logoutUser = async () => {
  await destroySession();
  redirect('/login');
};