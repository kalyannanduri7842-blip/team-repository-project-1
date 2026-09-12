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
  PhoneCall,
  Calendar,
  Clock,
  Sparkles,
  Plus,
  CheckCircle2,
  Mail,
  PhoneForwarded,
  User,
  Zap,
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
} from 'recharts';
import { StatCard } from '../ui/StatCard';
import { ChartCard } from '../ui/ChartCard';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { Lead, Customer, Deal, Task, Activity as ActivityType } from '../../types';
import { formatCurrency, formatCompactNumber, formatDate } from '../../utils/formatters';

interface SalesRepPersonalDashboardProps {
  currentUserName: string;
  leads: Lead[];
  customers: Customer[];
  deals: Deal[];
  tasks: Task[];
  activities: ActivityType[];
  dateRange: 'month' | 'quarter' | 'year';
  onOpenQuickAdd: (tab: any) => void;
  onToggleTaskComplete?: (taskId: string) => void;
}

export const SalesRepPersonalDashboard: React.FC<SalesRepPersonalDashboardProps> = ({
  currentUserName,
  leads,
  customers,
  deals,
  tasks,
  activities,
  dateRange,
  onOpenQuickAdd,
  onToggleTaskComplete,
}) => {
  const navigate = useNavigate();

  // Filter personal items assigned to the sales rep (fallback to first rep matches or user name)
  const repFirstName = currentUserName.split(' ')[0] || 'Alex';
  
  const myLeads = leads.filter(
    (l) => l.ownerName === currentUserName || (l.ownerName && l.ownerName.includes(repFirstName))
  );
  const myCustomers = customers.filter(
    (c) => c.ownerName === currentUserName || (c.ownerName && c.ownerName.includes(repFirstName))
  );
  const myDeals = deals.filter(
    (d) => d.ownerName === currentUserName || (d.ownerName && d.ownerName.includes(repFirstName))
  );
  const myTasks = tasks.filter(
    (t) => t.assigneeName === currentUserName || (t.assigneeName && t.assigneeName.includes(repFirstName))
  );
  const myActivities = activities.filter(
    (a) => a.performedByName === currentUserName || (a.performedByName && a.performedByName.includes(repFirstName))
  );

  // Fallbacks if data is sparse for current logged-in demo user
  const effectiveLeads = myLeads.length > 0 ? myLeads : leads.slice(0, 8);
  const effectiveCustomers = myCustomers.length > 0 ? myCustomers : customers.slice(0, 6);
  const effectiveDeals = myDeals.length > 0 ? myDeals : deals.slice(0, 6);
  const effectiveTasks = myTasks.length > 0 ? myTasks : tasks.slice(0, 6);
  const effectiveActivities = myActivities.length > 0 ? myActivities : activities.slice(0, 5);

  const openDeals = effectiveDeals.filter((d) => d.stage !== 'won' && d.stage !== 'lost');
  const wonDeals = effectiveDeals.filter((d) => d.stage === 'won');

  const myPipelineValue = openDeals.reduce((sum, d) => sum + d.amount, 0);
  const myRevenue = wonDeals.reduce((sum, d) => sum + d.amount, 0) || 185000;
  const myQuotaTarget = 200000; // $200k personal quarterly quota
  const myQuotaProgress = Math.min(100, Math.round((myRevenue / myQuotaTarget) * 100));

  const myConversionRate = effectiveLeads.length > 0
    ? ((wonDeals.length / effectiveLeads.length) * 100).toFixed(1)
    : '28.5';

  const pendingTasks = effectiveTasks.filter((t) => t.status !== 'completed');
  const overdueTasks = effectiveTasks.filter((t) => t.status === 'overdue');

  // Today's Follow-ups & Calling Queue
  const todayFollowUps = effectiveLeads
    .filter((l) => l.status === 'new' || l.status === 'contacted')
    .slice(0, 4);

  // Deals Closing Soon (Sorted by expected close date)
  const dealsClosingSoon = openDeals
    .sort((a, b) => new Date(a.expectedCloseDate).getTime() - new Date(b.expectedCloseDate).getTime())
    .slice(0, 4);

  // Upcoming Meetings (Activity items or customer interactions)
  const upcomingMeetings = [
    {
      id: 'm-1',
      title: 'Enterprise Architecture & SLA Review',
      customer: 'Acme Corp',
      time: 'Today, 2:30 PM',
      duration: '45 mins',
      contact: 'Sarah Miller',
      email: 'sarah.m@acme.io',
    },
    {
      id: 'm-2',
      title: 'Proposal & Commercial Contract Walkthrough',
      customer: 'TechFlow Systems',
      time: 'Tomorrow, 10:00 AM',
      duration: '30 mins',
      contact: 'Michael Chang',
      email: 'm.chang@techflow.com',
    },
    {
      id: 'm-3',
      title: 'Quarterly Executive Touchpoint',
      customer: 'Global Logistics Global',
      time: 'Thu, 3:00 PM',
      duration: '30 mins',
      contact: 'Elena Rostova',
      email: 'elena@globallogistics.eu',
    },
  ];

  // Personal Monthly Won Revenue Trend
  const personalRevenueTrend = [
    { month: 'Jan', revenue: 28000, target: 30000 },
    { month: 'Feb', revenue: 35000, target: 32000 },
    { month: 'Mar', revenue: 42000, target: 35000 },
    { month: 'Apr', revenue: 38000, target: 35000 },
    { month: 'May', revenue: 48000, target: 40000 },
    { month: 'Jun', revenue: 54000, target: 45000 },
  ];

  return (
    <div className="space-y-6">
      {/* Sales Rep Personal Scope Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-forest-900/90 text-peach-50 border border-peach-400/30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-peach-500/20 border border-peach-400/40 flex items-center justify-center text-peach-300">
            <User className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-peach-50">Personal Sales Workspace</h2>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 bg-peach-500/20 text-peach-300 rounded border border-peach-500/30">
                My Pipeline
              </span>
            </div>
            <p className="text-xs text-peach-200/80">Daily follow-ups, personal deals closing soon, call queue, and personal quota progress</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="xs"
            variant="secondary"
            onClick={() => onOpenQuickAdd('call')}
            leftIcon={<PhoneCall className="w-3.5 h-3.5" />}
            className="bg-peach-100 text-forest-950 hover:bg-peach-200 border-none text-xs font-semibold"
          >
            Quick Log Call
          </Button>
          <Button
            size="xs"
            variant="primary"
            onClick={() => onOpenQuickAdd('lead')}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
            className="bg-forest-800 text-peach-100 border border-peach-400/30 text-xs font-semibold"
          >
            Add Lead
          </Button>
        </div>
      </div>

      {/* Personal Quota Progress Gauge Banner */}
      <div className="bg-white dark:bg-forest-900/80 border border-peach-200/70 dark:border-forest-800 rounded-3xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-forest-800 dark:text-peach-400 flex items-center gap-1.5 font-mono">
              <Zap className="w-4 h-4 text-peach-500" />
              Personal Sales Target & Quota Progress
            </span>
            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-peach-50">
                {formatCurrency(myRevenue)}
              </span>
              <span className="text-xs text-slate-500 dark:text-peach-200/70">
                achieved of {formatCurrency(myQuotaTarget)} personal target
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs font-bold text-forest-900 dark:text-peach-300 block">
                {myQuotaProgress}% Quota Achieved
              </span>
              <span className="text-[10px] text-slate-400">
                {formatCurrency(myQuotaTarget - myRevenue)} to 100% club
              </span>
            </div>
            <Badge variant={myQuotaProgress >= 90 ? 'success' : 'primary'} size="lg">
              {myQuotaProgress}%
            </Badge>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-peach-100 dark:bg-forest-950 rounded-full h-3.5 overflow-hidden border border-peach-200 dark:border-forest-800">
          <div
            className="bg-gradient-to-r from-forest-700 via-emerald-600 to-peach-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${myQuotaProgress}%` }}
          />
        </div>
      </div>

      {/* 7 Personal KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        <StatCard
          title="My Leads"
          value={effectiveLeads.length}
          change={12.0}
          changePeriod="in pipeline"
          icon={<Users className="w-5 h-5" />}
          iconBg="bg-peach-100 dark:bg-forest-900/60 text-forest-800 dark:text-peach-300 border-peach-200 dark:border-forest-800"
          onClick={() => navigate('/leads')}
        />
        <StatCard
          title="My Customers"
          value={effectiveCustomers.length}
          change={8.5}
          changePeriod="managed accounts"
          icon={<Building2 className="w-5 h-5" />}
          iconBg="bg-peach-100 dark:bg-forest-900/60 text-forest-800 dark:text-peach-300 border-peach-200 dark:border-forest-800"
          onClick={() => navigate('/customers')}
        />
        <StatCard
          title="My Deals"
          value={effectiveDeals.length}
          change={15.0}
          changePeriod="active deals"
          icon={<Briefcase className="w-5 h-5" />}
          iconBg="bg-peach-100 dark:bg-forest-900/60 text-forest-800 dark:text-peach-300 border-peach-200 dark:border-forest-800"
          onClick={() => navigate('/deals/kanban')}
        />
        <StatCard
          title="My Pipeline"
          value={formatCurrency(myPipelineValue)}
          change={18.4}
          changePeriod="open value"
          icon={<DollarSign className="w-5 h-5" />}
          iconBg="bg-peach-100 dark:bg-forest-900/60 text-forest-800 dark:text-peach-300 border-peach-200 dark:border-forest-800"
          onClick={() => navigate('/deals/kanban')}
        />
        <StatCard
          title="My Revenue"
          value={formatCurrency(myRevenue)}
          change={24.0}
          changePeriod="won this period"
          icon={<Trophy className="w-5 h-5" />}
          iconBg="bg-emerald-50 dark:bg-forest-900/60 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-forest-800"
          onClick={() => navigate('/reports/sales')}
        />
        <StatCard
          title="Win Rate"
          value={`${myConversionRate}%`}
          change={4.5}
          changePeriod="conversion rate"
          icon={<Target className="w-5 h-5" />}
          iconBg="bg-peach-100 dark:bg-forest-900/60 text-forest-800 dark:text-peach-300 border-peach-200 dark:border-forest-800"
          onClick={() => navigate('/analytics')}
        />
        <StatCard
          title="Pending Tasks"
          value={pendingTasks.length}
          change={overdueTasks.length > 0 ? -10.0 : 0}
          changePeriod="to do today"
          icon={<CheckSquare className="w-5 h-5" />}
          iconBg="bg-peach-100 dark:bg-forest-900/60 text-forest-800 dark:text-peach-300 border-peach-200 dark:border-forest-800"
          onClick={() => navigate('/tasks')}
        />
      </div>

      {/* Row 1: Today's Follow-ups & Upcoming Meetings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Follow-ups & Call Queue */}
        <div className="bg-white dark:bg-forest-900/80 border border-peach-200/70 dark:border-forest-800 rounded-3xl p-6 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-peach-50 flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-forest-800 dark:text-peach-400" />
                Today's Follow-ups & Calling Queue
              </h3>
              <p className="text-xs text-slate-500 dark:text-peach-200/70 mt-0.5">
                Priority leads ready for phone outreach and discovery
              </p>
            </div>
            <Button variant="ghost" size="xs" onClick={() => navigate('/activities/calls')} rightIcon={<ArrowRight className="w-3 h-3" />}>
              Call Log
            </Button>
          </div>

          <div className="space-y-3 flex-1">
            {todayFollowUps.map((lead) => (
              <div
                key={lead.id}
                className="p-3.5 rounded-2xl bg-peach-50/40 dark:bg-forest-850/40 border border-peach-200/60 dark:border-forest-800 flex items-center justify-between gap-3 hover:border-peach-400/60 transition-all"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-slate-900 dark:text-peach-50 truncate">
                      {lead.fullName}
                    </p>
                    <Badge variant="primary" size="sm">
                      Score: {lead.score}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    {lead.company} • {lead.jobTitle} • {lead.phone}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <a
                    href={`tel:${lead.phone}`}
                    className="p-2 rounded-xl bg-forest-900 text-peach-100 hover:bg-forest-800 transition-colors shadow-xs"
                    title={`Call ${lead.fullName}`}
                  >
                    <PhoneForwarded className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={`mailto:${lead.email}`}
                    className="p-2 rounded-xl bg-peach-100 text-forest-950 hover:bg-peach-200 transition-colors border border-peach-300"
                    title={`Email ${lead.fullName}`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Meetings Schedule */}
        <div className="bg-white dark:bg-forest-900/80 border border-peach-200/70 dark:border-forest-800 rounded-3xl p-6 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-peach-50 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-forest-800 dark:text-peach-400" />
                Upcoming Meetings Schedule
              </h3>
              <p className="text-xs text-slate-500 dark:text-peach-200/70 mt-0.5">
                Confirmed sales demos and executive touchpoints
              </p>
            </div>
            <Button variant="ghost" size="xs" onClick={() => navigate('/activities/meetings')} rightIcon={<ArrowRight className="w-3 h-3" />}>
              Calendar
            </Button>
          </div>

          <div className="space-y-3 flex-1">
            {upcomingMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="p-3.5 rounded-2xl bg-peach-50/40 dark:bg-forest-850/40 border border-peach-200/60 dark:border-forest-800 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 dark:text-peach-50 truncate">
                    {meeting.title}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    {meeting.customer} • Contact: {meeting.contact}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-forest-900 dark:text-peach-300 block">
                    {meeting.time}
                  </span>
                  <span className="text-[10px] text-slate-400">{meeting.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Deals Closing Soon & Actionable Personal Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deals Closing Soon */}
        <div className="bg-white dark:bg-forest-900/80 border border-peach-200/70 dark:border-forest-800 rounded-3xl p-6 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-peach-50">
                My Deals Closing Soon
              </h3>
              <p className="text-xs text-slate-500 dark:text-peach-200/70 mt-0.5">
                High probability opportunities closing this month
              </p>
            </div>
            <Button variant="ghost" size="xs" onClick={() => navigate('/deals/kanban')} rightIcon={<ArrowRight className="w-3 h-3" />}>
              Kanban
            </Button>
          </div>

          <div className="space-y-3 flex-1">
            {dealsClosingSoon.map((deal) => (
              <div
                key={deal.id}
                onClick={() => navigate(`/deals/${deal.id}`)}
                className="p-3.5 rounded-2xl bg-peach-50/40 dark:bg-forest-850/40 border border-peach-200/60 dark:border-forest-800 hover:border-peach-400/60 transition-all cursor-pointer flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-slate-900 dark:text-peach-50 truncate">
                      {deal.title}
                    </p>
                    <Badge variant="primary" size="sm">
                      {deal.probability}% Win Prob
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    {deal.customerName} ({deal.customerCompany})
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-forest-900 dark:text-peach-200">
                    {formatCurrency(deal.amount)}
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono">
                    Due: {new Date(deal.expectedCloseDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actionable Personal Tasks & Overdue Alert Box */}
        <div className="bg-white dark:bg-forest-900/80 border border-peach-200/70 dark:border-forest-800 rounded-3xl p-6 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-peach-50 flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-forest-800 dark:text-peach-400" />
                My Actionable Tasks
              </h3>
              <p className="text-xs text-slate-500 dark:text-peach-200/70 mt-0.5">
                Pending customer follow-ups and due actions
              </p>
            </div>
            <Button variant="ghost" size="xs" onClick={() => navigate('/tasks')} rightIcon={<ArrowRight className="w-3 h-3" />}>
              All Tasks
            </Button>
          </div>

          <div className="space-y-3 flex-1">
            {pendingTasks.slice(0, 4).map((task) => (
              <div
                key={task.id}
                className="p-3.5 rounded-2xl bg-peach-50/40 dark:bg-forest-850/40 border border-peach-200/60 dark:border-forest-800 flex items-center justify-between gap-3 hover:border-peach-400/60 transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <input
                    type="checkbox"
                    checked={task.status === 'completed'}
                    onChange={() => onToggleTaskComplete && onToggleTaskComplete(task.id)}
                    className="rounded border-peach-300 dark:border-forest-700 text-forest-800 focus:ring-peach-500 w-4 h-4 cursor-pointer"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-900 dark:text-peach-100 truncate">
                      {task.title}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <Badge
                  variant={
                    task.priority === 'urgent'
                      ? 'danger'
                      : task.priority === 'high'
                      ? 'warning'
                      : 'default'
                  }
                  size="sm"
                >
                  {task.priority}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

