export type ApprovalStatus = 'pending' | 'approved' | 'rejected';
export type ApprovalEntityType = 'customer' | 'lead' | 'deal';

export interface ApprovalRequest<T = any> {
  id: string;
  entityType: ApprovalEntityType;
  title: string;
  subtitle: string;
  entityData: T;
  submittedById: string;
  submittedByName: string;
  submittedByRole: string;
  status: ApprovalStatus;
  reviewedById?: string;
  reviewedByName?: string;
  reviewNote?: string;
  estimatedValue?: number;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  reviewedAt?: string;
}
