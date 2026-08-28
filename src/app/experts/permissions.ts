import { UserRole } from '@/db/schema';

export const PERMISSIONS: Record<string, UserRole[]> = {
  newExpertAction: ['admin', 'tech'],
  deactiveExpertAction: ['admin', 'tech'],
  deleteExpertAction: ['tech'],
} as const;

export const EXPERT_BTNS: Record<string, UserRole[]> = {
  info: ['user', 'admin', 'tech'],
  deactivate: ['admin', 'tech'],
  delete: ['admin', 'tech'],
} as const;