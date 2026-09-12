import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Building2,
  Briefcase,
  DollarSign,
  Trophy,
  Target,
  CheckSquare,
  AlertCircle,
  TrendingUp,
  ArrowRight,
  Shield,
  Activity,
  Calendar,
  PhoneCall,
  Clock,
  Sparkles,
  PieChart as PieIcon,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from 'recharts';
import { StatCard } from '../ui/StatCard';
import { ChartCard } from '../ui/ChartCard';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { Lead, Customer, Deal, Task, Activity as ActivityType } from '../../types';
import { formatCurrency, formatCompactNumber, formatDate } from '../../utils/formatters';
import { mockRevenueTrends, mockRepPerformance } from '../../data/mock/mockReports';
import { useFinancialStore } from '../../store';

interface AdminExecutiveDashboardProps {
  leads: Lead[];
  customers: Customer[];
  deals: Deal[];
  tasks: Task[];
  activities: ActivityType[];
  dateRange: 'month' | 'quarter' | 'year';
  onOpenQuickAdd: (tab: any) => void;
}

export const AdminExecutiveDashboard: React.FC<AdminExecutiveDashboardProps> = ({
  leads,
  customers,
  deals,
  tasks,
  activities,
  dateRange,
  onOpenQuickAdd,
}) => {
  const navigate = useNavigate();
  const financialStatement = useFinancialStore((s) => s.statement);

  // Organization-wide aggregated calculations
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((c) => c.status === 'active').length;
  const totalLeads = leads.length;
  const totalDeals = deals.length;
  const openDeals = deals.filter((d) => d.stage !== 'won' && d.stage !== 'lost');
  const openDealsCount = openDeals.length;
  const pipelineValue = openDeals.reduce((sum, d) => sum + d.amount, 0);
  const wonDeals = deals.filter((d) => d.stage === 'won');
  const totalRevenue = wonDeals.reduce((sum, d) => sum + d.amount, 0);
  const conversionRate = totalLeads > 0 ? ((wonDeals.length / totalLeads) * 100).toFixed(1) : '0.0';
  const completedTasks = tasks.filter((t) => t.status === 'completed').length;
  const taskCompletionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;
  const pendingTasks = tasks.filter((t) => t.status === 'todo' || t.status === 'in_progress').length;
  const overdueTasks = tasks.filter((t) => t.status === 'overdue').length;

  // Pipeline by Stage
  const stageData = [
    { stage: 'Discovery', count: deals.filter((d) => d.stage === 'new').length, value: deals.filter((d) => d.stage === 'new').reduce((s, d) => s + d.amount, 0) },
    { stage: 'Qualified', count: deals.filter((d) => d.stage === 'qualified').length, value: deals.filter((d) => d.stage === 'qualified').reduce((s, d) => s + d.amount, 0) },
    { stage: 'Proposal', count: deals.filter((d) => d.stage === 'proposal').length, value: deals.filter((d) => d.stage === 'proposal').reduce((s, d) => s + d.amount, 0) },
    { stage: 'Negotiation', count: deals.filter((d) => d.stage === 'negotiation').length, value: deals.filter((d) => d.stage === 'negotiation').reduce((s, d) => s + d.amount, 0) },
    { stage: 'Won', count: wonDeals.length, value: totalRevenue },
  ];

  // Lead Sources Distribution
  const sourceMap: Record<string, number> = {};
  leads.forEach((l) => {
    sourceMap[l.source] = (sourceMap[l.source] || 0) + 1;
  });
  const leadSourceData = Object.entries(sourceMap).map(([source, count]) => ({
    name: source.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    value: count,
  }));

  // Customer Growth Trend (Quarterly Cohorts)
  const customerGrowthData = [
    { month: 'Jan', newCustomers: 12, totalCustomers: 120, churn: 1 },
    { month: 'Feb', newCustomers: 18, totalCustomers: 137, churn: 2 },
    { month: 'Mar', newCustomers: 24, totalCustomers: 159, churn: 1 },
    { month: 'Apr', newCustomers: 28, totalCustomers: 186, churn: 3 },
    { month: 'May', newCustomers: 35, totalCustomers: 218, churn: 2 },
    { month: 'Jun', newCustomers: 42, totalCustomers: 258, churn: 2 },
  ];

  const COLORS = ['#059669', '#f97316', '#fb923c', '#047857', '#065f46', '#fdba74', '#10b981'];

  return (
    <div className="space-y-6">
      {/* Executive Scope Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-forest-900/90 text-peach-50 border border-peach-400/30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-peach-500/20 border border-peach-400/40 flex items-center justify-center text-peach-300">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-peach-50">Executive Command Overview</h2>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 bg-peach-500/20 text-peach-300 rounded border border-peach-500/30">
                Organization Wide
              </span>
            </div>
            <p className="text-xs text-peach-200/80">Organization-wide sales revenue, customer growth, and team analytics</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="text-right hidden sm:block">
            <span className="text-peach-300/70 text-[10px] uppercase font-semibold block">System Health</span>
            <span className="font-bold text-emerald-400 flex items-center gap-1.5 justify-end">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              100% Operational
            </span>
          </div>
          <Button
            size="xs"
            variant="secondary"
            onClick={() => navigate('/financials')}
            className="bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-400/40 text-xs font-semibold"
            rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
          >
            Financials (P&L): {formatCurrency(financialStatement.netAnnualProfit)} Profit
          </Button>
          <Button
            size="xs"
            variant="secondary"
            onClick={() => navigate('/reports')}
            className="bg-peach-100 text-forest-950 hover:bg-peach-200 border-none text-xs font-semibold"
            rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
          >
            Export Org PDF
          </Button>
        </div>
      </div>

      {/* Monthly & Yearly Executive Funds & Income Command Center */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Monthly Funds & Income Card */}
        <div
          onClick={() => navigate('/financials')}
          className="p-5 rounded-3xl bg-gradient-to-br from-emerald-950/50 to-forest-900/90 border border-emerald-500/40 shadow-sm hover:border-emerald-400 transition-all cursor-pointer relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                <DollarSign className="w-4 h-4" />
              </span>
              <div>
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider font-mono">
                  Monthly Realized Funds & Inflow
                </span>
                <p className="text-[11px] text-peach-200/70">Current month cash flow, subscriptions & MRR</p>
              </div>
            </div>
            <Badge variant="success" size="sm">+14.2% MoM</Badge>
          </div>

          <div className="mt-4 flex items-baseline justify-between">
            <div>
              <p className="text-3xl font-black text-white">$148,500<span className="text-xs font-normal text-peach-300"> / month</span></p>
              <p className="text-[11px] text-emerald-300/80 mt-0.5">Target: $165,000 • 90.0% of monthly quota achieved</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-peach-300/70 uppercase block font-mono">Monthly MRR</span>
              <span className="text-sm font-bold text-emerald-200">$132,000 / mo</span>
            </div>
          </div>
        </div>

        {/* Yearly Funds & Income Card */}
        <div
          onClick={() => navigate('/financials')}
          className="p-5 rounded-3xl bg-gradient-to-br from-forest-950/80 to-forest-900/90 border border-peach-400/40 shadow-sm hover:border-peach-300 transition-all cursor-pointer relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-peach-500/20 text-peach-300 border border-peach-400/40 font-bold">
                <Trophy className="w-4 h-4" />
              </span>
              <div>
                <span className="text-xs font-bold text-peach-300 uppercase tracking-wider font-mono">
                  Yearly Realized Funds (ARR)
                </span>
                <p className="text-[11px] text-peach-200/70">Fiscal Year 2026 recognized funds & reserves</p>
              </div>
            </div>
            <Badge variant="primary" size="sm">+32.4% YoY</Badge>
          </div>

          <div className="mt-4 flex items-baseline justify-between">
            <div>
              <p className="text-3xl font-black text-white">{formatCurrency(totalRevenue)}<span className="text-xs font-normal text-peach-300"> / year</span></p>
              <p className="text-[11px] text-peach-200/80 mt-0.5">Annual Target: $2,200,000 • Net Annual Profit: {formatCurrency(financialStatement.netAnnualProfit)}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-peach-300/70 uppercase block font-mono">Annualized Run Rate</span>
              <span className="text-sm font-bold text-peach-200">$2,180,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Executive Organization KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Total Customers"
          value={totalCustomers}
          change={14.8}
          changePeriod="vs last quarter"
          icon={<Building2 className="w-5 h-5" />}
          iconBg="bg-peach-100 dark:bg-forest-900/60 text-forest-800 dark:text-peach-300 border-peach-200 dark:border-forest-800"
          onClick={() => navigate('/customers')}
        />
        <StatCard
          title="Total Leads"
          value={totalLeads}
          change={21.2}
          changePeriod="vs last quarter"
          icon={<Users className="w-5 h-5" />}
          iconBg="bg-peach-100 dark:bg-forest-900/60 text-forest-800 dark:text-peach-300 border-peach-200 dark:border-forest-800"
          onClick={() => navigate('/leads')}
        />
        <StatCard
          title="Total Deals"
          value={totalDeals}
          change={9.5}
          changePeriod="active deals"
          icon={<Briefcase className="w-5 h-5" />}
          iconBg="bg-peach-100 dark:bg-forest-900/60 text-forest-800 dark:text-peach-300 border-peach-200 dark:border-forest-800"
          onClick={() => navigate('/deals')}
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          change={32.4}
          changePeriod="YTD realized"
          icon={<Trophy className="w-5 h-5" />}
          iconBg="bg-emerald-50 dark:bg-forest-900/60 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-forest-800"
          onClick={() => navigate('/reports/sales')}
        />
        <StatCard
          title="Pipeline Value"
          value={formatCurrency(pipelineValue)}
          change={18.0}
          changePeriod="weighted forecast"
          icon={<DollarSign className="w-5 h-5" />}
          iconBg="bg-peach-100 dark:bg-forest-900/60 text-forest-800 dark:text-peach-300 border-peach-200 dark:border-forest-800"
          onClick={() => navigate('/deals/kanban')}
        />
        <StatCard
          title="Conversion Rate"
          value={`${conversionRate}%`}
          change={3.8}
          changePeriod="lead to customer"
          icon={<Target className="w-5 h-5" />}
          iconBg="bg-peach-100 dark:bg-forest-900/60 text-forest-800 dark:text-peach-300 border-peach-200 dark:border-forest-800"
          onClick={() => navigate('/analytics')}
        />
      </div>

      {/* Row 1: Org Sales Performance & Customer Growth Curves */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Performance Area Chart (2 cols) */}
        <div className="lg:col-span-2">
          <ChartCard
            title="Sales Performance and Fiscal Target"
            subtitle="Organization realized revenue vs company-wide fiscal quota"
            action={
              <Button variant="ghost" size="xs" onClick={() => navigate('/reports/sales')} rightIcon={<ArrowRight className="w-3 h-3" />}>
                Detailed Analysis
              </Button>
            }
          >
            <ResponsiveContainer width="100%" height={290}>
              <AreaChart data={mockRevenueTrends} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="adminActualRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#047857" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#047857" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="adminTargetRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" opacity={0.25} />
                <XAxis dataKey="label" stroke="#9a3412" fontSize={11} tickLine={false} />
                <YAxis stroke="#9a3412" fontSize={11} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#062016',
                    borderColor: '#164e37',
                    borderRadius: '12px',
                    color: '#fff8f3',
                    fontSize: '12px',
                  }}
                  formatter={(value: any) => [`$${Number(value).toLocaleString()}`, '']}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="actual" name="Realized Revenue" stroke="#059669" strokeWidth={3} fillOpacity={1} fill="url(#adminActualRev)" />
                <Area type="monotone" dataKey="target" name="Target Quota" stroke="#f97316" strokeWidth={2.5} strokeDasharray="4 4" fillOpacity={1} fill="url(#adminTargetRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Customer Growth & Expansion Rate */}
        <div className="lg:col-span-1">
          <ChartCard
            title="Customer Growth and Retention"
            subtitle="Net new customer acquisition vs total active base"
            action={
              <Button variant="ghost" size="xs" onClick={() => navigate('/customers')} rightIcon={<ArrowRight className="w-3 h-3" />}>
                Directory
              </Button>
            }
          >
            <ResponsiveContainer width="100%" height={290}>
              <LineChart data={customerGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" opacity={0.25} />
                <XAxis dataKey="month" stroke="#9a3412" fontSize={11} tickLine={false} />
                <YAxis stroke="#9a3412" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#062016',
                    borderColor: '#164e37',
                    borderRadius: '12px',
                    color: '#fff8f3',
                    fontSize: '12px',
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                <Line type="monotone" dataKey="totalCustomers" name="Active Customers" stroke="#047857" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="newCustomers" name="New Signups" stroke="#f97316" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>

      {/* Row 2: Lead Inbound Sources & Pipeline Deal Stages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deal Stages Bar Chart */}
        <ChartCard
          title="Deal Stages and Total Pipeline Volume"
          subtitle="Real-time value distribution across sales funnel"
          action={
            <Button variant="ghost" size="xs" onClick={() => navigate('/deals/kanban')} rightIcon={<ArrowRight className="w-3 h-3" />}>
              Kanban View
            </Button>
          }
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={stageData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" opacity={0.25} />
              <XAxis dataKey="stage" stroke="#9a3412" fontSize={11} tickLine={false} />
              <YAxis stroke="#9a3412" fontSize={11} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#062016',
                  borderColor: '#164e37',
                  borderRadius: '12px',
                  color: '#fff8f3',
                  fontSize: '12px',
                }}
                formatter={(val: any) => [`$${Number(val).toLocaleString()}`, 'Stage Value']}
              />
              <Bar dataKey="value" fill="#047857" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Lead Inbound Channel Sources */}
        <ChartCard
          title="Lead Sources and Channel Attribution"
          subtitle="Distribution of incoming qualified inquiries"
          action={
            <Button variant="ghost" size="xs" onClick={() => navigate('/leads')} rightIcon={<ArrowRight className="w-3 h-3" />}>
              Lead Inbox
            </Button>
          }
        >
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={leadSourceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
              >
                {leadSourceData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#062016',
                  borderColor: '#164e37',
                  borderRadius: '12px',
                  color: '#fff8f3',
                  fontSize: '12px',
                }}
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Row 3: Organization Team Performance Leaderboard & Activity Audit Trail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Performance Table (2 cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-forest-900/80 border border-peach-200/70 dark:border-forest-800 rounded-3xl p-6 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-peach-50">
                Organization Team Performance
              </h3>
              <p className="text-xs text-slate-500 dark:text-peach-200/70 mt-0.5">
                Executive breakdown of quotas, won deals, and revenue output
              </p>
            </div>
            <Button variant="ghost" size="xs" onClick={() => navigate('/reports/reps')} rightIcon={<ArrowRight className="w-3 h-3" />}>
              Full Roster
            </Button>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-peach-200/70 dark:border-forest-800 text-[10px] uppercase font-bold text-slate-400 dark:text-peach-300 tracking-wider">
                  <th className="pb-3 pl-1">Representative</th>
                  <th className="pb-3 text-center">Role</th>
                  <th className="pb-3 text-center">Deals Closed</th>
                  <th className="pb-3 text-right">Revenue Won</th>
                  <th className="pb-3 text-right pr-1">Quota Attainment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-peach-100 dark:divide-forest-850">
                {mockRepPerformance.map((rep, idx) => (
                  <tr key={rep.repId} className="hover:bg-peach-50/50 dark:hover:bg-forest-850/50 transition-colors">
                    <td className="py-3 pl-1">
                      <div className="flex items-center gap-3">
                        <span className="w-4 font-bold text-slate-400">#{idx + 1}</span>
                        <Avatar src={rep.avatar} name={rep.repName} size="sm" />
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-peach-50">{rep.repName}</p>
                          <p className="text-[10px] text-slate-400 font-mono">ID: {rep.repId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-center">
                      <span className="text-[11px] text-slate-600 dark:text-peach-200 font-medium">{rep.role}</span>
                    </td>
                    <td className="py-3 text-center font-semibold text-slate-800 dark:text-peach-100">
                      {rep.dealsWon}
                    </td>
                    <td className="py-3 text-right font-bold text-forest-900 dark:text-peach-200">
                      {formatCurrency(rep.revenueGenerated)}
                    </td>
                    <td className="py-3 text-right pr-1">
                      <Badge
                        variant={rep.quotaAttainmentPercent >= 100 ? 'success' : 'primary'}
                        size="sm"
                      >
                        {rep.quotaAttainmentPercent}%
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Task Completion & Live Audit Stream (1 col) */}
        <div className="lg:col-span-1 space-y-6">
          {/* Task Completion Card */}
          <div className="bg-white dark:bg-forest-900/80 border border-peach-200/70 dark:border-forest-800 rounded-3xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-peach-200">
                Task Completion Velocity
              </h4>
              <Badge variant="primary" size="sm">
                {taskCompletionRate}% Done
              </Badge>
            </div>

            <div className="w-full bg-peach-100 dark:bg-forest-950 rounded-full h-3 mb-3 overflow-hidden border border-peach-200 dark:border-forest-800">
              <div
                className="bg-forest-700 dark:bg-emerald-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${taskCompletionRate}%` }}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-peach-50/70 dark:bg-forest-900">
                <span className="text-[10px] text-slate-400 block">Completed</span>
                <span className="font-bold text-forest-900 dark:text-emerald-400">{completedTasks}</span>
              </div>
              <div className="p-2 rounded-xl bg-peach-50/70 dark:bg-forest-900">
                <span className="text-[10px] text-slate-400 block">Pending</span>
                <span className="font-bold text-peach-600">{pendingTasks}</span>
              </div>
              <div className="p-2 rounded-xl bg-peach-50/70 dark:bg-forest-900">
                <span className="text-[10px] text-slate-400 block">Overdue</span>
                <span className="font-bold text-rose-600">{overdueTasks}</span>
              </div>
            </div>
          </div>

          {/* System Audit Stream */}
          <div className="bg-white dark:bg-forest-900/80 border border-peach-200/70 dark:border-forest-800 rounded-3xl p-5 shadow-xs flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-peach-200 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-forest-800 dark:text-peach-400" />
                Recent System Activity
              </h4>
              <Button variant="ghost" size="xs" onClick={() => navigate('/activities')}>
                Log
              </Button>
            </div>

            <div className="space-y-3">
              {activities.slice(0, 4).map((act) => (
                <div key={act.id} className="flex items-start gap-2.5 text-xs">
                  <div className="w-2 h-2 rounded-full bg-peach-500 mt-1.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 dark:text-peach-100 truncate">{act.title}</p>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{act.description}</p>
                    <span className="text-[9px] text-slate-400 font-mono">{formatDate(act.timestamp, 'relative')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

