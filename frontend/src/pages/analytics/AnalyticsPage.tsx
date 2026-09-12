import React from 'react';
import {
  TrendingUp,
  Target,
  Zap,
  DollarSign,
  Activity,
  Layers,
  ArrowUpRight,
  PieChart as PieIcon,
} from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { ChartCard } from '../../components/ui/ChartCard';
import { Badge } from '../../components/ui/Badge';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { mockRevenueTrends, mockPipelineMetrics, mockRepPerformance } from '../../data/mock/mockReports';
import { formatCurrency } from '../../utils/formatters';

export const AnalyticsPage: React.FC = () => {
  const velocityData = [
    { month: 'May', velocityDays: 45, winRate: 72 },
    { month: 'Jun', velocityDays: 42, winRate: 75 },
    { month: 'Jul', velocityDays: 39, winRate: 78 },
    { month: 'Aug', velocityDays: 35, winRate: 82 },
    { month: 'Sep', velocityDays: 31, winRate: 86 },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
          <TrendingUp className="w-6 h-6 text-forest-700" />
          <span>Advanced Analytics & Pipeline Velocity</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Deep-dive predictive models, deal acceleration telemetry, and pipeline stage conversion metrics.
        </p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Pipeline Velocity"
          value="31 Days"
          change={-14.2}
          changePeriod="faster than Q2"
          icon={<Zap className="w-5 h-5" />}
        />
        <StatCard
          title="Average Deal Size"
          value="$82,333"
          change={18.0}
          icon={<DollarSign className="w-5 h-5" />}
          iconBg="bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/50"
        />
        <StatCard
          title="Conversion Win Rate"
          value="82.3%"
          change={6.5}
          icon={<Target className="w-5 h-5" />}
          iconBg="bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-900/50"
        />
        <StatCard
          title="Team Activity Index"
          value="98.4"
          change={12.1}
          icon={<Activity className="w-5 h-5" />}
          iconBg="bg-peach-100 dark:bg-forest-900/50 text-forest-800 dark:text-peach-400 border-peach-200 dark:border-forest-900/50"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Sales Cycle Compression Trend"
          subtitle="Days required from discovery lead to closed contract"
        >
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={velocityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="velocityDays" name="Avg Cycle (Days)" stroke="#6366f1" strokeWidth={3} dot={{ r: 5 }} />
              <Line type="monotone" dataKey="winRate" name="Win Rate %" stroke="#10b981" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Revenue Realization vs Projections"
          subtitle="Monthly realized revenue curve versus forecasted pipeline"
        >
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={mockRevenueTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="label" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip formatter={(v: any) => [`$${Number(v).toLocaleString()}`, '']} />
              <Legend />
              <Area type="monotone" dataKey="forecast" name="Forecast Pipeline" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
              <Area type="monotone" dataKey="actual" name="Realized Revenue" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Representative Multi-Action Distribution */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
          Commercial Activity Distribution by Representative
        </h3>
        <p className="text-xs text-slate-500">
          Auditing calls, meetings, and completed follow-up tasks per sales executive.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {mockRepPerformance.map((rep) => (
            <div key={rep.repId} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900 dark:text-slate-100">{rep.repName}</span>
                <Badge variant="primary" size="sm">{rep.quotaAttainmentPercent}%</Badge>
              </div>

              <div className="space-y-1.5 text-xs text-slate-500">
                <div className="flex justify-between">
                  <span>Calls Logged:</span>
                  <strong className="text-slate-800 dark:text-slate-200">{rep.callsLogged}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Meetings Held:</span>
                  <strong className="text-slate-800 dark:text-slate-200">{rep.meetingsHeld}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Tasks Done:</span>
                  <strong className="text-slate-800 dark:text-slate-200">{rep.tasksCompleted}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
