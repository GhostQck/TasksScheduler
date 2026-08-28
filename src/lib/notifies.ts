export type NotifyTypes = 'error' | 'success' | 'info';

export interface NotifyMessage {
  id: string;
  type: NotifyTypes;
  title: string;
  description: string;
}

const allNames = [
  'unauthorized',
  'session_expired',
  'login_required',
  'login_success',
  'expert_added',
] as const;
export type NotifyNames = (typeof allNames)[number];

export const MSGS_MAP: Record<NotifyNames, Omit<NotifyMessage, 'id'>> = {
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
    type: 'error',
    title: 'Authentication Required',
    description: 'Please log in to access that area',
  },
  login_success: {
    type: 'success',
    title: 'Logged In',
    description: 'You have successfully logged in',
  },
  expert_added: {
    type: 'success',
    title: 'Expert Added',
    description: 'Expert has been successfully added',
  },
} as const;

export const getNotifyUrl = (
  initUrl: URL,
  notify: NotifyNames
): URL => {
  initUrl.searchParams.set('notify', notify);
  return initUrl;
};