/**
 * Admin Executive Dashboard — organization-wide KPIs
 */
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, Building2, Briefcase, DollarSign, Trophy, Target, TrendingUp,
  Activity, CheckSquare, Bell, PieChart as PieIcon, BarChart3,
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { useLeadStore, useCustomerStore, useDealStore, useTaskStore, useActivityStore, useNotificationStore, useAuthStore } from '../../store';
import { StatCard } from '../../components/ui/StatCard';
import { ChartCard } from '../../components/ui/ChartCard';
import { Badge } from '../../components/ui/Badge';
import { formatCurrency, formatCompactNumber } from '../../utils/formatters';
import { mockRevenueTrends, mockRepPerformance } from '../../data/mock/mockReports';

const COLORS = ['#2d6a4f', '#40916c', '#52b788', '#74c69d', '#95d5b2', '#d8f3dc', '#1b4332'];

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const leads = useLeadStore((s) => s.leads);
  const customers = useCustomerStore((s) => s.customers);
  const deals = useDealStore((s) => s.deals);
  const tasks = useTaskStore((s) => s.tasks);
  const activities = useActivityStore((s) => s.activities);
  const notifications = useNotificationStore((s) => s.notifications);

  const metrics = useMemo(() => {
    const openDeals = deals.filter((d) => d.stage !== 'won' && d.stage !== 'lost');
    const won = deals.filter((d) => d.stage === 'won');
    const lost = deals.filter((d) => d.stage === 'lost');
    const pipelineValue = openDeals.reduce((s, d) => s + (d.amount || 0), 0);
    const revenue = won.reduce((s, d) => s + (d.amount || 0), 0);
    const conversion = leads.length ? ((won.length / leads.length) * 100) : 0;
    const completedTasks = tasks.filter((t) => (t.status as any) === 'done' || t.status === 'completed').length;
    const taskRate = tasks.length ? (completedTasks / tasks.length) * 100 : 0;

    const byStage: Record<string, number> = {};
    deals.forEach((d) => { byStage[d.stage] = (byStage[d.stage] || 0) + 1; });
    const stageData = Object.entries(byStage).map(([name, value]) => ({ name, value }));

    const sources: Record<string, number> = {};
    leads.forEach((l: any) => {
      const src = l.source || l.leadSource || 'Other';
      sources[src] = (sources[src] || 0) + 1;
    });
    const sourceData = Object.entries(sources).map(([name, value]) => ({ name, value }));

    return {
      totalCustomers: customers.length,
      totalLeads: leads.length,
      totalDeals: deals.length,
      revenue,
      pipelineValue,
      conversion,
      openDeals: openDeals.length,
      won: won.length,
      lost: lost.length,
      taskRate,
      completedTasks,
      activities: activities.length,
      notifications: notifications?.length ?? 0,
      stageData,
      sourceData,
    };
  }, [leads, customers, deals, tasks, activities, notifications]);

  return (
    <div className="space-y-6 p-1">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Executive Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Organization-wide overview · Signed in as {user?.name} (Admin)
          </p>
        </div>
        <Badge variant="success">Admin</Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        <StatCard title="Total Customers" value={formatCompactNumber(metrics.totalCustomers)} icon={<Building2 className="w-5 h-5" />} />
        <StatCard title="Total Leads" value={formatCompactNumber(metrics.totalLeads)} icon={<Users className="w-5 h-5" />} />
        <StatCard title="Total Deals" value={formatCompactNumber(metrics.totalDeals)} icon={<Briefcase className="w-5 h-5" />} />
        <StatCard title="Total Revenue" value={formatCurrency(metrics.revenue)} icon={<DollarSign className="w-5 h-5" />} />
        <StatCard title="Pipeline Value" value={formatCurrency(metrics.pipelineValue)} icon={<Target className="w-5 h-5" />} />
        <StatCard title="Conversion Rate" value={`${metrics.conversion.toFixed(1)}%`} icon={<TrendingUp className="w-5 h-5" />} />
        <StatCard title="Won Deals" value={String(metrics.won)} icon={<Trophy className="w-5 h-5" />} />
        <StatCard title="Task Completion" value={`${metrics.taskRate.toFixed(0)}%`} icon={<CheckSquare className="w-5 h-5" />} />
        <StatCard title="Activities" value={String(metrics.activities)} icon={<Activity className="w-5 h-5" />} />
        <StatCard title="Notifications" value={String(metrics.notifications)} icon={<Bell className="w-5 h-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Revenue Trend" subtitle="Organization sales performance">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={mockRevenueTrends || []}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#2d6a4f" fill="#52b788" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Deal Stages" subtitle="Pipeline distribution">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={metrics.stageData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                {metrics.stageData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Lead Sources" subtitle="Acquisition channels">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={metrics.sourceData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#40916c" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Team Performance" subtitle="Sales rep contribution">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={(mockRepPerformance || []).slice(0, 8)}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="revenue" fill="#1b4332" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button type="button" onClick={() => navigate('/leads')} className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800">
          <PieIcon className="w-5 h-5 text-emerald-700 mb-2" />
          <p className="font-semibold">Lead Management</p>
          <p className="text-xs text-slate-500">All org leads & sources</p>
        </button>
        <button type="button" onClick={() => navigate('/deals')} className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800">
          <BarChart3 className="w-5 h-5 text-emerald-700 mb-2" />
          <p className="font-semibold">Deal Pipeline</p>
          <p className="text-xs text-slate-500">Stages, wins, losses</p>
        </button>
        <button type="button" onClick={() => navigate('/analytics')} className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800">
          <TrendingUp className="w-5 h-5 text-emerald-700 mb-2" />
          <p className="font-semibold">Growth Analytics</p>
          <p className="text-xs text-slate-500">Customer growth & trends</p>
        </button>
      </div>
    </div>
  );
};
