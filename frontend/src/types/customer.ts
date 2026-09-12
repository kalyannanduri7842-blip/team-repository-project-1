import { IndustryType, CompanySize } from './lead';

export type CustomerStatus = 'active' | 'churn_risk' | 'churned' | 'onboarding' | 'dormant';
export type CustomerTier = 'Enterprise' | 'Mid-Market' | 'Growth' | 'Starter';

export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  website?: string;
  industry: IndustryType;
  tier: CustomerTier;
  status: CustomerStatus;
  healthScore: number; // 0 - 100
  relationshipScore: number; // 0 - 100
  ownerId: string;
  ownerName: string;
  ownerAvatar?: string;
  companySize: CompanySize;
  annualRevenue?: number;
  lifetimeValue: number;
  openDealsCount: number;
  totalDealsValue: number;
  pendingTasksCount: number;
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  billingContact?: {
    name: string;
    email: string;
    phone: string;
  };
  tags: string[];
  convertedFromLeadId?: string;
  lastContactedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerHealthMetrics {
  healthScore: number;
  relationshipScore: number;
  engagementIndex: number;
  productUsageScore: number;
  supportTicketScore: number;
  npsScore: number;
  status: CustomerStatus;
  trend: 'increasing' | 'stable' | 'decreasing';
}
