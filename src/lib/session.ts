import { cache } from 'react';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { UserRole } from '@/db/schema';

import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { users } from '@/db/schema';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

export type SessionPayload = {
  userId: number;
};

export type SessionUser = {
  userId: number;
  publicId: string;
  login: string;
  role: UserRole;
  status: boolean;
};

export const createSession = async (payload: SessionPayload) => {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET_KEY);

  const cookieStore = await cookies();
  cookieStore.set('session_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
};

export const getSession = cache(async (): Promise<SessionUser | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    const userId = payload.userId as number;

    if (!userId) return null;

    const [user] = await db
      .select({
        userId: users.id,
        publicId: users.uuid,
        login: users.login,
        role: users.role,
        status: users.status,
      })
      .from(users)
      .where(eq(users.id, userId));

    if (!user?.status) return null;

    return user;
  } catch {
    return null;
  }
});

export const destroySession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('session_token');
};