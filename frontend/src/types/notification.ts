export type NotificationType =
  | 'task_due'
  | 'deal_won'
  | 'deal_stage'
  | 'new_lead'
  | 'meeting_reminder'
  | 'conversion'
  | 'system';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  link?: string;
  entityType?: 'lead' | 'customer' | 'deal' | 'task' | 'meeting';
  entityId?: string;
  userId: string;
  createdAt: string;
}
