export interface RevenueStream {
  id: string;
  name: string;
  category: 'recurring_saas' | 'enterprise_license' | 'professional_services' | 'add_ons';
  amount: number;
  growthPercentage: number;
}

export interface ExpenseItem {
  id: string;
  name: string;
  category: 'salaries_wages' | 'sales_commissions' | 'cloud_infrastructure' | 'marketing_advertising' | 'saas_tools' | 'office_operations';
  amount: number;
  isRecurring: boolean;
}

export interface MonthlyFinancialSummary {
  month: string; // e.g. "2026-01" or "Jan 2026"
  grossRevenue: number;
  totalExpenses: number;
  grossProfit: number;
  netProfit: number;
  netMarginPercentage: number;
  ebitda: number;
  targetRevenue: number;
  targetProfit: number;
}

export interface ProfitLossStatement {
  fiscalYear: number;
  totalAnnualRevenue: number;
  totalAnnualExpenses: number;
  netAnnualProfit: number;
  netAnnualMargin: number;
  monthlyBreakdown: MonthlyFinancialSummary[];
  revenueStreams: RevenueStream[];
  expenses: ExpenseItem[];
}
