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
  'database_error',
  'expert_added',
  'expert_nonexist',
  'expert_already_blocked',
  'expert_deactivated',
  'expert_deleted',
  'expert_already_active',
  'expert_activated',
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
    title: 'Logged in',
    description: 'You have successfully logged in',
  }),
  database_error: (_value = '') => ({
    type: 'error',
    title: 'Database error',
    description: 'Unknown database error has occurred',
  }),
  expert_added: (_value = 'That expert') => ({
    type: 'success',
    title: 'Expert added',
    description: `${_value} has been successfully added to the expert list`,
  }),
  expert_nonexist: (_value = 'That expert') => ({
    type: 'error',
    title: 'Expert does not exist',
    description: `${_value} has no records and seemingly does not exist`,
  }),
  expert_already_blocked: (_value = 'That expert') => ({
    type: 'error',
    title: 'Expert is already deactivated',
    description: `${_value} already has the 'deactivated' status`,
  }),
  expert_deactivated: (_value = 'That expert') => ({
    type: 'success',
    title: 'Expert deactivated',
    description: `${_value} has been successfully deactivated`,
  }),
  expert_deleted: (_value = 'That expert') => ({
    type: 'success',
    title: 'Expert deleted',
    description: `${_value} has been successfully deleted from the database`,
  }),
  expert_already_active: (_value = 'That expert') => ({
    type: 'error',
    title: 'Expert is already active',
    description: `${_value} already has the 'active' status`,
  }),
  expert_activated: (_value = 'That expert') => ({
    type: 'success',
    title: 'Expert activated',
    description: `${_value} has been successfully activated`,
  }),
} as const;

export const getNotifyUrl = (
  initUrl: URL,
  notify: NotifyNames
): URL => {
  initUrl.searchParams.set('notify', notify);
  return initUrl;
};