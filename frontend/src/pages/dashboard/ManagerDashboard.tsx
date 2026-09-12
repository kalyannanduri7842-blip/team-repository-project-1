/**
 * Sales Manager Dashboard — team performance & pipeline
 */
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, Briefcase, DollarSign, Target, Trophy, TrendingUp,
  AlertCircle, Calendar, CheckSquare, Activity, BarChart3,
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { useLeadStore, useCustomerStore, useDealStore, useTaskStore, useActivityStore, useAuthStore } from '../../store';
import { StatCard } from '../../components/ui/StatCard';
import { ChartCard } from '../../components/ui/ChartCard';
import { Badge } from '../../components/ui/Badge';
import { formatCurrency, formatCompactNumber } from '../../utils/formatters';
import { mockRepPerformance } from '../../data/mock/mockReports';

const COLORS = ['#2d6a4f', '#40916c', '#52b788', '#74c69d', '#95d5b2', '#bc4749'];

export const ManagerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const leads = useLeadStore((s) => s.leads);
  const deals = useDealStore((s) => s.deals);
  const tasks = useTaskStore((s) => s.tasks);
  const activities = useActivityStore((s) => s.activities);

  const m = useMemo(() => {
    const open = deals.filter((d) => d.stage !== 'won' && d.stage !== 'lost');
    const won = deals.filter((d) => d.stage === 'won');
    const lost = deals.filter((d) => d.stage === 'lost');
    const pipeline = open.reduce((s, d) => s + (d.amount || 0), 0);
    const revenue = won.reduce((s, d) => s + (d.amount || 0), 0);
    const target = 500000;
    const achievement = target ? (revenue / target) * 100 : 0;
    const conversion = leads.length ? (won.length / leads.length) * 100 : 0;
    const overdue = tasks.filter((t: any) => {
      if (t.status === 'done' || t.status === 'completed') return false;
      if (!t.dueDate) return false;
      return new Date(t.dueDate) < new Date();
    });
    const byStage: Record<string, number> = {};
    deals.forEach((d) => { byStage[d.stage] = (byStage[d.stage] || 0) + (d.amount || 0); });
    const stageData = Object.entries(byStage).map(([name, value]) => ({ name, value }));
    const upcoming = open
      .filter((d: any) => d.expectedCloseDate || d.closeDate)
      .slice(0, 6);
    return {
      teamLeads: leads.length,
      pipeline,
      revenue,
      target,
      achievement,
      conversion,
      won: won.length,
      lost: lost.length,
      open: open.length,
      overdue: overdue.length,
      activities: activities.length,
      tasks: tasks.length,
      stageData,
      upcoming,
      forecast: pipeline * 0.35 + revenue,
    };
  }, [leads, deals, tasks, activities]);

  return (
    <div className="space-y-6 p-1">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Sales Manager Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">Team performance & pipeline · {user?.name}</p>
        </div>
        <Badge variant="warning">Manager</Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        <StatCard title="Team Revenue" value={formatCurrency(m.revenue)} icon={<DollarSign className="w-5 h-5" />} />
        <StatCard title="Target Achievement" value={`${m.achievement.toFixed(0)}%`} icon={<Target className="w-5 h-5" />} />
        <StatCard title="Team Leads" value={formatCompactNumber(m.teamLeads)} icon={<Users className="w-5 h-5" />} />
        <StatCard title="Team Conversion" value={`${m.conversion.toFixed(1)}%`} icon={<TrendingUp className="w-5 h-5" />} />
        <StatCard title="Pipeline Value" value={formatCurrency(m.pipeline)} icon={<Briefcase className="w-5 h-5" />} />
        <StatCard title="Won / Lost" value={`${m.won} / ${m.lost}`} icon={<Trophy className="w-5 h-5" />} />
        <StatCard title="Overdue Follow-ups" value={String(m.overdue)} icon={<AlertCircle className="w-5 h-5" />} />
        <StatCard title="Sales Forecast" value={formatCurrency(m.forecast)} icon={<BarChart3 className="w-5 h-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Deals by Stage (Value)" subtitle="Team pipeline">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={m.stageData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => formatCurrency(v)} />
              <Bar dataKey="value" fill="#2d6a4f" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Rep Performance" subtitle="Sales representative contribution">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={(mockRepPerformance || []).slice(0, 6)}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="revenue" fill="#40916c" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2"><Calendar className="w-4 h-4" /> Upcoming Team Deals</h3>
        <div className="space-y-2">
          {m.upcoming.length === 0 && <p className="text-sm text-slate-500">No upcoming deals flagged.</p>}
          {m.upcoming.map((d: any) => (
            <div key={d.id} className="flex justify-between text-sm border-b border-slate-100 dark:border-slate-800 py-2">
              <span>{d.title || d.name || d.id}</span>
              <span className="font-medium">{formatCurrency(d.amount || 0)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button type="button" onClick={() => navigate('/deals')} className="rounded-lg border p-3 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800">Pipeline Board</button>
        <button type="button" onClick={() => navigate('/leads')} className="rounded-lg border p-3 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800">Lead Distribution</button>
        <button type="button" onClick={() => navigate('/tasks')} className="rounded-lg border p-3 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800">Team Tasks</button>
        <button type="button" onClick={() => navigate('/activities')} className="rounded-lg border p-3 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800">Team Activities</button>
      </div>
    </div>
  );
};
