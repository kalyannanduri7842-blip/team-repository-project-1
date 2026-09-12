import { ProfitLossStatement } from '../../types';

export const mockFinancials: ProfitLossStatement = {
  fiscalYear: 2026,
  totalAnnualRevenue: 1420000,
  totalAnnualExpenses: 580000,
  netAnnualProfit: 840000,
  netAnnualMargin: 59.15,
  revenueStreams: [
    { id: 'rev-1', name: 'Enterprise SaaS Subscriptions', category: 'recurring_saas', amount: 890000, growthPercentage: 28.4 },
    { id: 'rev-2', name: 'Mid-Market Annual Licenses', category: 'enterprise_license', amount: 340000, growthPercentage: 19.2 },
    { id: 'rev-3', name: 'Implementation & Consulting', category: 'professional_services', amount: 130000, growthPercentage: 12.5 },
    { id: 'rev-4', name: 'AI Workflows & Add-ons', category: 'add_ons', amount: 60000, growthPercentage: 45.0 },
  ],
  expenses: [
    { id: 'exp-1', name: 'Engineering & Product Payroll', category: 'salaries_wages', amount: 240000, isRecurring: true },
    { id: 'exp-2', name: 'Sales & Success Commissions', category: 'sales_commissions', amount: 110000, isRecurring: true },
    { id: 'exp-3', name: 'Cloud Infrastructure (AWS / Vercel)', category: 'cloud_infrastructure', amount: 55000, isRecurring: true },
    { id: 'exp-4', name: 'Digital Growth & Lead Generation Ads', category: 'marketing_advertising', amount: 85000, isRecurring: true },
    { id: 'exp-5', name: 'SaaS Tooling & Security Compliance', category: 'saas_tools', amount: 45000, isRecurring: true },
    { id: 'exp-6', name: 'Operational Overheads & Legal', category: 'office_operations', amount: 45000, isRecurring: true },
  ],
  monthlyBreakdown: [
    { month: 'Jan', grossRevenue: 98000, totalExpenses: 44000, grossProfit: 54000, netProfit: 54000, netMarginPercentage: 55.1, ebitda: 58000, targetRevenue: 90000, targetProfit: 48000 },
    { month: 'Feb', grossRevenue: 104000, totalExpenses: 45000, grossProfit: 59000, netProfit: 59000, netMarginPercentage: 56.7, ebitda: 63000, targetRevenue: 95000, targetProfit: 50000 },
    { month: 'Mar', grossRevenue: 115000, totalExpenses: 47000, grossProfit: 68000, netProfit: 68000, netMarginPercentage: 59.1, ebitda: 72000, targetRevenue: 100000, targetProfit: 55000 },
    { month: 'Apr', grossRevenue: 118000, totalExpenses: 46000, grossProfit: 72000, netProfit: 72000, netMarginPercentage: 61.0, ebitda: 76000, targetRevenue: 105000, targetProfit: 58000 },
    { month: 'May', grossRevenue: 122000, totalExpenses: 48000, grossProfit: 74000, netProfit: 74000, netMarginPercentage: 60.6, ebitda: 79000, targetRevenue: 110000, targetProfit: 62000 },
    { month: 'Jun', grossRevenue: 130000, totalExpenses: 50000, grossProfit: 80000, netProfit: 80000, netMarginPercentage: 61.5, ebitda: 85000, targetRevenue: 115000, targetProfit: 65000 },
    { month: 'Jul', grossRevenue: 125000, totalExpenses: 49000, grossProfit: 76000, netProfit: 76000, netMarginPercentage: 60.8, ebitda: 81000, targetRevenue: 120000, targetProfit: 68000 },
    { month: 'Aug', grossRevenue: 138000, totalExpenses: 51000, grossProfit: 87000, netProfit: 87000, netMarginPercentage: 63.0, ebitda: 92000, targetRevenue: 125000, targetProfit: 72000 },
    { month: 'Sep', grossRevenue: 145000, totalExpenses: 52000, grossProfit: 93000, netProfit: 93000, netMarginPercentage: 64.1, ebitda: 98000, targetRevenue: 130000, targetProfit: 76000 },
    { month: 'Oct (Proj)', grossRevenue: 140000, totalExpenses: 49000, grossProfit: 91000, netProfit: 91000, netMarginPercentage: 65.0, ebitda: 95000, targetRevenue: 135000, targetProfit: 80000 },
    { month: 'Nov (Proj)', grossRevenue: 142000, totalExpenses: 50000, grossProfit: 92000, netProfit: 92000, netMarginPercentage: 64.8, ebitda: 97000, targetRevenue: 138000, targetProfit: 82000 },
    { month: 'Dec (Proj)', grossRevenue: 143000, totalExpenses: 49000, grossProfit: 94000, netProfit: 94000, netMarginPercentage: 65.7, ebitda: 99000, targetRevenue: 140000, targetProfit: 85000 },
  ],
};
