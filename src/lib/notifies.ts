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

export const MSGS_MAP: Record<NotifyNames, (_value?: string) => Omit<NotifyMessage, 'id'>> = {
  unauthorized: (_value = '') => ({
    type: 'error',
    title: 'Access denied',
    description: 'You do not have permission to view that page',
  }),
  session_expired: (_value = '') => ({
    type: 'info',
    title: 'Session expired',
    description: 'Please log in again to continue',
  }),
  login_required: (_value = '') => ({
    type: 'error',
    title: 'Authentication required',
    description: 'Please log in to access that area',
  }),
  login_success: (_value = '') => ({
    type: 'success',
    title: 'Logged In',
    description: 'You have successfully logged in',
  }),
  expert_added: (_value = '') => ({
    type: 'success',
    title: 'Expert added',
    description: `${_value} has been successfully added to the expert list`,
  }),
} as const;

export const getNotifyUrl = (
  initUrl: URL,
  notify: NotifyNames
): URL => {
  initUrl.searchParams.set('notify', notify);
  return initUrl;
};