export interface SalesMetricSummary {
  totalRevenue: number;
  targetRevenue: number;
  revenueGrowthPercent: number;
  openPipelineValue: number;
  wonDealsCount: number;
  wonDealsValue: number;
  lostDealsCount: number;
  lostDealsValue: number;
  avgDealSize: number;
  winRate: number; // percentage
  salesCycleDays: number;
}

export interface LeadMetricSummary {
  totalLeads: number;
  leadsGrowthPercent: number;
  newLeadsCount: number;
  qualifiedLeadsCount: number;
  convertedLeadsCount: number;
  conversionRate: number;
  avgConversionDays: number;
  leadsBySource: {
    source: string;
    count: number;
    value: number;
    conversionRate: number;
  }[];
  leadsByStatus: {
    status: string;
    count: number;
    percentage: number;
  }[];
}

export interface RepPerformanceMetric {
  repId: string;
  repName: string;
  avatar: string;
  role: string;
  dealsWon: number;
  revenueGenerated: number;
  quotaTarget: number;
  quotaAttainmentPercent: number;
  activitiesCount: number;
  callsLogged: number;
  meetingsHeld: number;
  tasksCompleted: number;
  conversionRate: number;
}

export interface RevenueTrendPoint {
  date: string;
  label: string;
  actual: number;
  target: number;
  forecast: number;
  lastYear: number;
}

export interface PipelineStageMetric {
  stage: string;
  stageName: string;
  count: number;
  value: number;
  weightedValue: number;
  conversionRate: number;
}
