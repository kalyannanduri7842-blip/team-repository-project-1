export type DealStage =
  | 'new'
  | 'qualified'
  | 'proposal'
  | 'negotiation'
  | 'won'
  | 'lost';

export type DealPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface DealStageConfig {
  id: DealStage;
  label: string;
  defaultProbability: number;
  color: string;
  badgeBg: string;
  badgeText: string;
}

export const DEAL_STAGES: DealStageConfig[] = [
  { id: 'new', label: 'New / Discovery', defaultProbability: 10, color: '#f97316', badgeBg: 'bg-peach-500/15 dark:bg-peach-500/25', badgeText: 'text-peach-700 dark:text-peach-300' },
  { id: 'qualified', label: 'Qualified', defaultProbability: 35, color: '#a855f7', badgeBg: 'bg-purple-500/10 dark:bg-purple-500/20', badgeText: 'text-purple-600 dark:text-purple-400' },
  { id: 'proposal', label: 'Proposal Sent', defaultProbability: 60, color: '#f59e0b', badgeBg: 'bg-amber-500/10 dark:bg-amber-500/20', badgeText: 'text-amber-600 dark:text-amber-400' },
  { id: 'negotiation', label: 'In Negotiation', defaultProbability: 80, color: '#047857', badgeBg: 'bg-forest-700/15 dark:bg-forest-500/25', badgeText: 'text-forest-800 dark:text-peach-200' },
  { id: 'won', label: 'Closed Won', defaultProbability: 100, color: '#059669', badgeBg: 'bg-emerald-500/15 dark:bg-emerald-500/25', badgeText: 'text-emerald-700 dark:text-emerald-300' },
  { id: 'lost', label: 'Closed Lost', defaultProbability: 0, color: '#ef4444', badgeBg: 'bg-rose-500/10 dark:bg-rose-500/20', badgeText: 'text-rose-600 dark:text-rose-400' },
];

export interface Deal {
  id: string;
  title: string;
  customerId: string;
  customerName: string;
  customerCompany: string;
  amount: number;
  currency: string;
  stage: DealStage;
  probability: number; // 0 - 100
  weightedValue: number; // amount * (probability / 100)
  expectedCloseDate: string;
  actualCloseDate?: string;
  ownerId: string;
  ownerName: string;
  ownerAvatar?: string;
  priority: DealPriority;
  leadSource?: string;
  leadId?: string;
  lossReason?: string;
  competitors?: string[];
  products: {
    id: string;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
  notes?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
