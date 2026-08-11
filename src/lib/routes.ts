import type { UserRole } from '@/db/schema';

export type Route = {
  label: string;
  href: string;
  roles?: UserRole[];
};

export const ROUTES_ACCESS: Route[] = [
  {
    label: 'Log In',
    href: '/login',
  },
  {
    label: 'Main',
    href: '/',
  },
  {
    label: 'All Tasks',
    href: '/tasks',
  },
  {
    label: 'Experts',
    href: '/experts',
    roles: ['admin', 'tech'],
  },
  {
    label: 'Agents',
    href: '/agents',
    roles: ['tech'],
  }
] as const;