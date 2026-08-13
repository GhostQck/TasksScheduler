import { unauthorized } from 'next/navigation';

export type NotifyTypes = 'error' | 'success' | 'info';

export interface NotifyMessage {
  id: string;
  type: NotifyTypes;
  title: string;
  description: string;
}

export const MSGS_MAP: Record<string, Omit<NotifyMessage, 'id'>> = {
  unauthorized: {
    type: 'error',
    title: 'Access Denied',
    description: 'You do not have permission to view that page',
  },
  session_expired: {
    type: 'info',
    title: 'Session Expired',
    description: 'Please log in again to continue',
  },
  login_required: {
    type: 'info',
    title: 'Authentication Required',
    description: 'Please log in to access that area',
  },
  login_success: {
    type: 'success',
    title: 'Logged In',
    description: 'You have successfully logged in',
  },
} as const;