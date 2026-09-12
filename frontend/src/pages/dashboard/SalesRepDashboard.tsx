/**
 * Sales Representative Dashboard — personal work queue
 */
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, Building2, Briefcase, DollarSign, Target, TrendingUp,
  CheckSquare, Calendar, Phone, Clock, AlertCircle, Activity,
} from 'lucide-react';
import { useLeadStore, useCustomerStore, useDealStore, useTaskStore, useActivityStore, useAuthStore } from '../../store';
import { StatCard } from '../../components/ui/StatCard';
import { Badge } from '../../components/ui/Badge';
import { formatCurrency, formatCompactNumber, formatDate } from '../../utils/formatters';

export const SalesRepDashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const leads = useLeadStore((s) => s.leads);
  const customers = useCustomerStore((s) => s.customers);
  const deals = useDealStore((s) => s.deals);
  const tasks = useTaskStore((s) => s.tasks);
  const activities = useActivityStore((s) => s.activities);

  const mine = useMemo(() => {
    const uid = user?.id || '';
    const name = user?.name || '';
    const owns = (r: any) =>
      r.ownerId === uid || r.assignedTo === uid || r.owner === name || r.ownerName === name ||
      r.salesRep === name || !r.ownerId; // demo: include unassigned for visibility

    const myLeads = leads.filter(owns);
    const myCustomers = customers.filter(owns);
    const myDeals = deals.filter(owns);
    const open = myDeals.filter((d) => d.stage !== 'won' && d.stage !== 'lost');
    const won = myDeals.filter((d) => d.stage === 'won');
    const pipeline = open.reduce((s, d) => s + (d.amount || 0), 0);
    const revenue = won.reduce((s, d) => s + (d.amount || 0), 0);
    const conversion = myLeads.length ? (won.length / myLeads.length) * 100 : 0;
    const myTasks = tasks.filter(owns);
    const overdue = myTasks.filter((t: any) => {
      if (t.status === 'done' || t.status === 'completed') return false;
      return t.dueDate && new Date(t.dueDate) < new Date();
    });
    const today = new Date().toISOString().slice(0, 10);
    const todayFollowups = myTasks.filter((t: any) => (t.dueDate || '').slice(0, 10) === today);
    const closingSoon = open.filter((d: any) => {
      const close = d.expectedCloseDate || d.closeDate;
      if (!close) return false;
      const days = (new Date(close).getTime() - Date.now()) / 86400000;
      return days >= 0 && days <= 14;
    });
    const myActs = activities.filter(owns).slice(0, 8);
    const personalTarget = 100000;
    const progress = personalTarget ? (revenue / personalTarget) * 100 : 0;
    const meetings = myActs.filter((a: any) => (a.type || '').toLowerCase().includes('meeting'));
    const calls = myActs.filter((a: any) => (a.type || '').toLowerCase().includes('call'));

    return {
      myLeads: myLeads.length,
      myCustomers: myCustomers.length,
      myDeals: myDeals.length,
      pipeline,
      revenue,
      conversion,
      myTasks: myTasks.length,
      overdue: overdue.length,
      todayFollowups,
      closingSoon,
      myActs,
      progress,
      personalTarget,
      meetings: meetings.length,
      calls: calls.length,
      openTasks: myTasks.filter((t: any) => t.status !== 'done' && t.status !== 'completed').slice(0, 6),
    };
  }, [user, leads, customers, deals, tasks, activities]);

  return (
    <div className="space-y-6 p-1">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Sales Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">Personal pipeline & daily work · {user?.name}</p>
        </div>
        <Badge>Sales Rep</Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        <StatCard title="My Leads" value={formatCompactNumber(mine.myLeads)} icon={<Users className="w-5 h-5" />} />
        <StatCard title="My Customers" value={formatCompactNumber(mine.myCustomers)} icon={<Building2 className="w-5 h-5" />} />
        <StatCard title="My Deals" value={formatCompactNumber(mine.myDeals)} icon={<Briefcase className="w-5 h-5" />} />
        <StatCard title="My Pipeline" value={formatCurrency(mine.pipeline)} icon={<Target className="w-5 h-5" />} />
        <StatCard title="My Revenue" value={formatCurrency(mine.revenue)} icon={<DollarSign className="w-5 h-5" />} />
        <StatCard title="My Conversion" value={`${mine.conversion.toFixed(1)}%`} icon={<TrendingUp className="w-5 h-5" />} />
        <StatCard title="My Tasks" value={String(mine.myTasks)} icon={<CheckSquare className="w-5 h-5" />} />
        <StatCard title="Target Progress" value={`${mine.progress.toFixed(0)}%`} icon={<Target className="w-5 h-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-3">
          <h3 className="font-semibold flex items-center gap-2"><Calendar className="w-4 h-4" /> Today&apos;s Follow-ups</h3>
          {mine.todayFollowups.length === 0 && <p className="text-sm text-slate-500">No follow-ups due today.</p>}
          {mine.todayFollowups.map((t: any) => (
            <div key={t.id} className="text-sm flex justify-between border-b border-slate-100 dark:border-slate-800 py-1.5">
              <span>{t.title || t.name || 'Task'}</span>
              <span className="text-slate-500">{t.priority || ''}</span>
            </div>
          ))}
          <div className="flex gap-4 text-xs text-slate-500 pt-2">
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {mine.calls} calls</span>
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {mine.meetings} meetings</span>
            <span className="flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {mine.overdue} overdue</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-3">
          <h3 className="font-semibold flex items-center gap-2"><Clock className="w-4 h-4" /> Deals Closing Soon (14d)</h3>
          {mine.closingSoon.length === 0 && <p className="text-sm text-slate-500">No deals closing in the next 2 weeks.</p>}
          {mine.closingSoon.map((d: any) => (
            <div key={d.id} className="text-sm flex justify-between border-b border-slate-100 dark:border-slate-800 py-1.5">
              <span>{d.title || d.name || d.id}</span>
              <span className="font-medium">{formatCurrency(d.amount || 0)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2"><Activity className="w-4 h-4" /> Recent Activities</h3>
        <div className="space-y-2">
          {mine.myActs.length === 0 && <p className="text-sm text-slate-500">No recent activity.</p>}
          {mine.myActs.map((a: any) => (
            <div key={a.id} className="text-sm flex justify-between py-1 border-b border-slate-50 dark:border-slate-800">
              <span>{a.subject || a.title || a.type || 'Activity'}</span>
              <span className="text-slate-400 text-xs">{a.createdAt ? formatDate(a.createdAt) : ''}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button type="button" onClick={() => navigate('/leads')} className="rounded-lg border p-3 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800">My Leads</button>
        <button type="button" onClick={() => navigate('/customers')} className="rounded-lg border p-3 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800">My Customers</button>
        <button type="button" onClick={() => navigate('/deals')} className="rounded-lg border p-3 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800">My Deals</button>
        <button type="button" onClick={() => navigate('/tasks')} className="rounded-lg border p-3 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800">My Tasks</button>
      </div>
    </div>
  );
};
