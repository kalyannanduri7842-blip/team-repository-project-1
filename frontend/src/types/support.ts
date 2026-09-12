export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'rejected' | 'closed';
export type TicketCategory =
  | 'technical'
  | 'billing'
  | 'customer_issue'
  | 'deal_escalation'
  | 'product_bug'
  | 'feature_request'
  | 'general';

export interface SupportTicket {
  id: string;
  ticketNumber: string; // e.g. TCK-1042
  subject: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  raisedById: string;
  raisedByName: string;
  raisedByRole: string;
  assignedToId?: string;
  assignedToName?: string;
  relatedEntityName?: string;
  relatedEntityType?: 'customer' | 'lead' | 'deal';
  resolutionNote?: string;
  satisfactionRating?: number; // 1-5
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
}

export interface SupportMetrics {
  totalTickets: number;
  openTickets: number;
  inProgressTickets: number;
  resolvedTickets: number;
  closedTickets: number;
  resolutionRate: number; // percentage
  avgResolutionTimeHours: number;
  slaBreachCount: number;
}
