export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'unqualified' | 'converted';

export type LeadSource =
  | 'website'
  | 'referral'
  | 'social_media'
  | 'email_campaign'
  | 'advertisement'
  | 'direct'
  | 'event'
  | 'partner';

export type CompanySize =
  | '1-10'
  | '11-50'
  | '51-200'
  | '201-500'
  | '501-1000'
  | '1000+';

export type IndustryType =
  | 'Software & Technology'
  | 'Healthcare & Life Sciences'
  | 'Financial Services'
  | 'Manufacturing'
  | 'Retail & E-commerce'
  | 'Telecommunications'
  | 'Consulting & Professional Services'
  | 'Logistics & Supply Chain'
  | 'Real Estate'
  | 'Education';

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  website?: string;
  source: LeadSource;
  status: LeadStatus;
  score: number; // 0 - 100
  ownerId: string;
  ownerName: string;
  ownerAvatar?: string;
  industry: IndustryType;
  companySize: CompanySize;
  estimatedValue: number;
  notesSummary?: string;
  tags: string[];
  convertedCustomerId?: string;
  convertedDealId?: string;
  convertedAt?: string;
  lastContactedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadConversionPayload {
  leadId: string;
  customerName: string;
  company: string;
  email: string;
  phone: string;
  industry: IndustryType;
  dealName: string;
  dealAmount: number;
  dealStage: string;
  expectedCloseDate: string;
  dealProbability: number;
  notes?: string;
}
