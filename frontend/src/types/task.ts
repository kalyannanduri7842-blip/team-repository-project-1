export type TaskStatus = 'todo' | 'in_progress' | 'completed' | 'overdue';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string; // ISO date
  completedAt?: string;
  assigneeId: string;
  assigneeName: string;
  assigneeAvatar?: string;
  creatorId: string;
  creatorName: string;
  relatedToType?: 'lead' | 'customer' | 'deal';
  relatedToId?: string;
  relatedToName?: string;
  tags: string[];
  reminderMinutesBefore?: number;
  createdAt: string;
  updatedAt: string;
}
