import 'server-only';

import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

import bcrypt from 'bcryptjs';

import { createSession } from '@/lib/session';
import { redirect } from 'next/navigation';

