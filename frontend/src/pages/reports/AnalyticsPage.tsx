import React, { useState } from 'react';
import {
  TrendingUp,
  Activity,
  Zap,
  Clock,
  ArrowUpRight,
  Filter,
  Download,
  Calendar,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { StatCard } from '../../components/ui/StatCard';
import { ChartCard } from '../../components/ui/ChartCard';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import { exportToCSV } from '../../utils/csv';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  FunnelChart,
  Funnel,
  LabelList,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area,
} from 'recharts';

export const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'30d' | '90d' | '12m'>('90d');

  // Funnel conversion dataset
  const funnelData = [
    { value: 1450, name: 'Lead Inquiries', fill: '#6366f1' },
    { value: 920, name: 'Qualified MQL/SQL', fill: '#4f46e5' },
    { value: 580, name: 'Demo & Proposal', fill: '#3b82f6' },
    { value: 310, name: 'Contract Review', fill: '#0ea5e9' },
    { value: 175, name: 'Closed Won', fill: '#10b981' },
  ];

  // Pipeline velocity & cohort trends
  const velocityTrends = [
    { month: 'Jan', velocity: 42, cycleDays: 34, conversionRate: 22 },
    { month: 'Feb', velocity: 48, cycleDays: 31, conversionRate: 24 },
    { month: 'Mar', velocity: 55, cycleDays: 29, conversionRate: 26 },
    { month: 'Apr', velocity: 63, cycleDays: 28, conversionRate: 28 },
    { month: 'May', velocity: 59, cycleDays: 27, conversionRate: 29 },
    { month: 'Jun', velocity: 74, cycleDays: 25, conversionRate: 31 },
  ];

  // Sales team capability radar
  const teamCompetency = [
    { subject: 'Outreach & Sourcing', score: 88, fullMark: 100 },
    { subject: 'Discovery Calls', score: 94, fullMark: 100 },
    { subject: 'Product Demos', score: 85, fullMark: 100 },
    { subject: 'Contract Negotiation', score: 92, fullMark: 100 },
    { subject: 'Enterprise Closing', score: 80, fullMark: 100 },
    { subject: 'Upsell & Expansion', score: 86, fullMark: 100 },
  ];

  // Revenue cohort retention
  const retentionCohorts = [
    { cohort: '2025 Q1', m1: 100, m3: 96, m6: 94, m12: 91, nrr: 124 },
    { cohort: '2025 Q2', m1: 100, m3: 97, m6: 95, m12: 92, nrr: 128 },
    { cohort: '2025 Q3', m1: 100, m3: 98, m6: 96, m12: 94, nrr: 132 },
    { cohort: '2025 Q4', m1: 100, m3: 99, m6: 97, m12: 95, nrr: 135 },
    { cohort: '2026 Q1', m1: 100, m3: 99, m6: 98, m12: null, nrr: 140 },
  ];

  const handleExport = () => {
    exportToCSV(velocityTrends, 'nexora-sales-velocity-analytics.csv');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Advanced Analytics & Pipeline Intelligence</h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time pipeline velocity, full-funnel conversion bottlenecks, cohort retention, and team competencies.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                timeRange === '30d' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setTimeRange('90d')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                timeRange === '90d' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              90 Days
            </button>
            <button
              onClick={() => setTimeRange('12m')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                timeRange === '12m' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              12 Months
            </button>
          </div>
          <Button variant="outline" size="sm" onClick={handleExport} leftIcon={<Download className="w-4 h-4" />}>
            Export Dataset
          </Button>
        </div>
      </div>

      {/* KPI Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Pipeline Velocity"
          value="$74.2k/day"
          change={14.8}
          changePeriod="vs. $64.5k last period"
          icon={<Zap className="w-5 h-5" />}
        />
        <StatCard
          title="Avg Sales Cycle"
          value="25.4 Days"
          change={-12.4}
          changePeriod="Accelerated by 3.6 days"
          icon={<Clock className="w-5 h-5" />}
          iconBg="bg-emerald-50 text-emerald-600 border-emerald-100"
        />
        <StatCard
          title="Lead-to-Win Conversion"
          value="12.07%"
          change={2.4}
          changePeriod="Benchmark: 9.8%"
          icon={<TrendingUp className="w-5 h-5" />}
          iconBg="bg-peach-100 text-forest-800 border-peach-200"
        />
        <StatCard
          title="Net Revenue Retention (NRR)"
          value="134.2%"
          change={4.1}
          changePeriod="Top quartile SaaS"
          icon={<Activity className="w-5 h-5" />}
          iconBg="bg-purple-50 text-purple-600 border-purple-100"
        />
      </div>

      {/* Primary Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pipeline Velocity & Cycle Days Chart */}
        <ChartCard
          title="Sales Velocity vs. Cycle Length"
          subtitle="Monthly progression of deal acceleration and pipeline throughput"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={velocityTrends}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis yAxisId="left" tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  formatter={(val: any, name: string) => [
                    name === 'velocity' ? `$${val}k / day` : `${val} days`,
                    name === 'velocity' ? 'Velocity Score' : 'Avg Cycle Days',
                  ]}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="velocity" name="Velocity ($k/day)" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="cycleDays" name="Avg Cycle (Days)" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Full-Funnel Stage Conversion */}
        <ChartCard
          title="Full-Funnel Stage Conversion Bottlenecks"
          subtitle="Stage drop-off rates from initial inquiry to closed-won revenue"
        >
          <div className="space-y-4 pt-2">
            {funnelData.map((stage, idx) => {
              const prevStage = idx === 0 ? funnelData[0] : funnelData[idx - 1];
              const convRate = ((stage.value / prevStage.value) * 100).toFixed(1);
              return (
                <div key={stage.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-800 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: stage.fill }} />
                      {stage.name}
                    </span>
                    <span className="text-slate-500 font-mono">
                      {stage.value.toLocaleString()} deals {idx > 0 && `(${convRate}% pass-through)`}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(stage.value / funnelData[0].value) * 100}%`,
                        backgroundColor: stage.fill,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </ChartCard>
      </div>

      {/* Secondary Analytics: Radar Competency + Cohort Retention */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar Chart */}
        <ChartCard
          title="Sales Org Competency Radar"
          subtitle="Multi-vector sales process efficiency audit"
          className="lg:col-span-1"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={teamCompetency}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" />
                <Radar name="Team Benchmark" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Cohort Retention Table */}
        <ChartCard
          title="Net Revenue Retention Cohorts"
          subtitle="Quarterly customer expansion and net ARR retention"
          className="lg:col-span-2"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Cohort</th>
                  <th className="py-3 px-4 text-center">Month 1</th>
                  <th className="py-3 px-4 text-center">Month 3</th>
                  <th className="py-3 px-4 text-center">Month 6</th>
                  <th className="py-3 px-4 text-center">Month 12</th>
                  <th className="py-3 px-4 text-right">NRR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {retentionCohorts.map((c) => (
                  <tr key={c.cohort} className="hover:bg-slate-50/70">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">{c.cohort}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-semibold">100%</span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-semibold">{c.m3}%</span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-semibold">{c.m6}%</span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {c.m12 ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-semibold">{c.m12}%</span>
                      ) : (
                        <span className="text-slate-400 text-xs">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-forest-800">{c.nrr}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>
      </div>
    </div>
  );
};
