import React, { useState } from 'react';
import {
  FileText,
  DollarSign,
  Users,
  Trophy,
  Download,
  Printer,
  Calendar,
  Filter,
  TrendingUp,
  Award,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Tabs } from '../../components/ui/Tabs';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { StatCard } from '../../components/ui/StatCard';
import { ChartCard } from '../../components/ui/ChartCard';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  mockSalesSummary,
  mockLeadSummary,
  mockRepPerformance,
  mockRevenueTrends,
  mockPipelineMetrics,
} from '../../data/mock/mockReports';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import { exportToCSV } from '../../utils/csv';

export const ReportsHubPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sales' | 'leads' | 'performance'>('sales');
  const [dateRange, setDateRange] = useState('quarter');

  const tabsConfig = [
    { id: 'sales', label: 'Sales & Revenue Report', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'leads', label: 'Lead Conversion Report', icon: <Users className="w-4 h-4" /> },
    { id: 'performance', label: 'Sales Team Performance', icon: <Trophy className="w-4 h-4" /> },
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleExportReport = () => {
    if (activeTab === 'sales') {
      exportToCSV(mockRevenueTrends, 'sales_revenue_report');
    } else if (activeTab === 'leads') {
      exportToCSV(mockLeadSummary.leadsBySource, 'lead_sources_report');
    } else {
      exportToCSV(mockRepPerformance, 'rep_performance_report');
    }
  };

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

  return (
    <div className="space-y-6 pb-16 print:p-0 print:space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-forest-700" />
            <span>Executive Reports & Intelligence</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Generate printable audit reports, examine conversion funnels, and benchmark sales quota attainment.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint} leftIcon={<Printer className="w-3.5 h-3.5" />}>
            Print Report
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportReport} leftIcon={<Download className="w-3.5 h-3.5" />}>
            Export CSV
          </Button>
        </div>
      </div>

      {/* Report Tabs */}
      <div className="print:hidden">
        <Tabs tabs={tabsConfig} activeTab={activeTab} onChange={(t) => setActiveTab(t as any)} />
      </div>

      {/* SALES REPORT VIEW */}
      {activeTab === 'sales' && (
        <div className="space-y-6">
          {/* Top Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Realized Revenue"
              value={formatCurrency(mockSalesSummary.totalRevenue)}
              change={mockSalesSummary.revenueGrowthPercent}
              icon={<DollarSign className="w-5 h-5" />}
            />
            <StatCard
              title="Win Rate"
              value={`${mockSalesSummary.winRate}%`}
              change={5.4}
              icon={<Trophy className="w-5 h-5" />}
              iconBg="bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/50"
            />
            <StatCard
              title="Average Deal Size"
              value={formatCurrency(mockSalesSummary.avgDealSize)}
              change={12.0}
              icon={<TrendingUp className="w-5 h-5" />}
              iconBg="bg-peach-100 dark:bg-forest-900/50 text-forest-800 dark:text-peach-400 border-peach-200 dark:border-forest-900/50"
            />
            <StatCard
              title="Avg Sales Cycle"
              value={`${mockSalesSummary.salesCycleDays} Days`}
              change={-8.5}
              icon={<Calendar className="w-5 h-5" />}
              iconBg="bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-900/50"
            />
          </div>

          {/* Revenue Chart */}
          <ChartCard
            title="Fiscal Year Monthly Performance"
            subtitle="Realized revenue vs quota targets across all commercial tiers"
          >
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={mockRevenueTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="label" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip formatter={(val: any) => [`$${Number(val).toLocaleString()}`, '']} />
                <Legend />
                <Area type="monotone" dataKey="actual" name="Actual Revenue" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
                <Area type="monotone" dataKey="target" name="Target Quota" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeDasharray="3 3" />
                <Area type="monotone" dataKey="lastYear" name="Prior Year" stroke="#94a3b8" fill="none" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Pipeline Stage Conversions Table */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Pipeline Stage Conversion Breakdown
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-semibold">
                    <th className="py-2.5 px-3">Stage Name</th>
                    <th className="py-2.5 px-3 text-center">Deals Count</th>
                    <th className="py-2.5 px-3 text-right">Total Pipeline Value</th>
                    <th className="py-2.5 px-3 text-right">Weighted Forecast</th>
                    <th className="py-2.5 px-3 text-center">Stage Conversion %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {mockPipelineMetrics.map((p) => (
                    <tr key={p.stage}>
                      <td className="py-3 px-3 font-semibold text-slate-800 dark:text-slate-200">{p.stageName}</td>
                      <td className="py-3 px-3 text-center">{p.count}</td>
                      <td className="py-3 px-3 text-right">{formatCurrency(p.value)}</td>
                      <td className="py-3 px-3 text-right font-bold text-forest-800 dark:text-peach-400">{formatCurrency(p.weightedValue)}</td>
                      <td className="py-3 px-3 text-center font-bold text-emerald-600 dark:text-emerald-400">{p.conversionRate}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* LEADS REPORT VIEW */}
      {activeTab === 'leads' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Leads Ingested"
              value={mockLeadSummary.totalLeads}
              change={mockLeadSummary.leadsGrowthPercent}
              icon={<Users className="w-5 h-5" />}
            />
            <StatCard
              title="Qualified Leads"
              value={mockLeadSummary.qualifiedLeadsCount}
              change={14.2}
              icon={<CheckCircle2 className="w-5 h-5" />}
              iconBg="bg-peach-100 dark:bg-forest-900/50 text-forest-800 dark:text-peach-400 border-peach-200 dark:border-forest-900/50"
            />
            <StatCard
              title="Converted to Customers"
              value={mockLeadSummary.convertedLeadsCount}
              change={22.0}
              icon={<Award className="w-5 h-5" />}
              iconBg="bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/50"
            />
            <StatCard
              title="Avg Conversion Cycle"
              value={`${mockLeadSummary.avgConversionDays} Days`}
              change={-11.4}
              icon={<Calendar className="w-5 h-5" />}
              iconBg="bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-900/50"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Lead Acquisition by Source" subtitle="Volume and pipeline value generated per channel">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={mockLeadSummary.leadsBySource}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                  <XAxis dataKey="source" stroke="#64748b" fontSize={10} />
                  <YAxis stroke="#64748b" fontSize={10} />
                  <Tooltip formatter={(v: any) => [v, 'Leads Count']} />
                  <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Conversion Rate by Channel" subtitle="Percentage of leads transformed into paying accounts">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={mockLeadSummary.leadsBySource}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                  <XAxis dataKey="source" stroke="#64748b" fontSize={10} />
                  <YAxis stroke="#64748b" fontSize={10} tickFormatter={(v) => `${v}%`} />
                  <Tooltip formatter={(v: any) => [`${v}%`, 'Conversion Rate']} />
                  <Bar dataKey="conversionRate" fill="#10b981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </div>
      )}

      {/* TEAM PERFORMANCE REPORT VIEW */}
      {activeTab === 'performance' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Commercial Sales Representative Quota & Execution Audit
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-semibold">
                    <th className="py-2.5 px-3">Sales Rep</th>
                    <th className="py-2.5 px-3">Role</th>
                    <th className="py-2.5 px-3 text-right">Revenue Closed</th>
                    <th className="py-2.5 px-3 text-right">Quota Target</th>
                    <th className="py-2.5 px-3 text-center">Quota Attainment</th>
                    <th className="py-2.5 px-3 text-center">Deals Won</th>
                    <th className="py-2.5 px-3 text-center">Calls Logged</th>
                    <th className="py-2.5 px-3 text-center">Meetings Held</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {mockRepPerformance.map((rep) => (
                    <tr key={rep.repId}>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <Avatar src={rep.avatar} name={rep.repName} size="xs" />
                          <span className="font-bold text-slate-900 dark:text-slate-100">{rep.repName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-slate-500">{rep.role}</td>
                      <td className="py-3 px-3 text-right font-bold text-slate-900 dark:text-slate-100">
                        {formatCurrency(rep.revenueGenerated)}
                      </td>
                      <td className="py-3 px-3 text-right text-slate-500">{formatCurrency(rep.quotaTarget)}</td>
                      <td className="py-3 px-3 text-center">
                        <Badge variant={rep.quotaAttainmentPercent >= 100 ? 'success' : 'primary'}>
                          {rep.quotaAttainmentPercent}%
                        </Badge>
                      </td>
                      <td className="py-3 px-3 text-center font-semibold">{rep.dealsWon}</td>
                      <td className="py-3 px-3 text-center text-slate-600 dark:text-slate-400">{rep.callsLogged}</td>
                      <td className="py-3 px-3 text-center text-slate-600 dark:text-slate-400">{rep.meetingsHeld}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
