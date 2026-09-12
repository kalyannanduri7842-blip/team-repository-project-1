import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Briefcase,
  DollarSign,
  Trophy,
  Target,
  CheckSquare,
  AlertCircle,
  TrendingUp,
  ArrowRight,
  UserCheck,
  Activity,
  Calendar,
  PhoneCall,
  Clock,
  Sparkles,
  Layers,
  ArrowUpRight,
  AlertTriangle,
  Award,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useApprovalStore } from '../../store';
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
} from 'recharts';
import { StatCard } from '../ui/StatCard';
import { ChartCard } from '../ui/ChartCard';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { Lead, Customer, Deal, Task, Activity as ActivityType } from '../../types';
import { formatCurrency, formatCompactNumber, formatDate } from '../../utils/formatters';
import { mockRepPerformance } from '../../data/mock/mockReports';

interface ManagerTeamDashboardProps {
  leads: Lead[];
  customers: Customer[];
  deals: Deal[];
  tasks: Task[];
  activities: ActivityType[];
  dateRange: 'month' | 'quarter' | 'year';
  onOpenQuickAdd: (tab: any) => void;
}

export const ManagerTeamDashboard: React.FC<ManagerTeamDashboardProps> = ({
  leads,
  customers,
  deals,
  tasks,
  activities,
  dateRange,
  onOpenQuickAdd,
}) => {
  const navigate = useNavigate();
  const pendingRequests = useApprovalStore((s) => s.requests.filter((r) => r.status === 'pending'));

  // Team-level metrics calculations
  const totalTeamLeads = leads.length;
  const openDeals = deals.filter((d) => d.stage !== 'won' && d.stage !== 'lost');
  const wonDeals = deals.filter((d) => d.stage === 'won');
  const lostDeals = deals.filter((d) => d.stage === 'lost');

  const teamRevenue = wonDeals.reduce((sum, d) => sum + d.amount, 0);
  const teamPipelineValue = openDeals.reduce((sum, d) => sum + d.amount, 0);
  const teamTargetQuota = 1000000; // $1.0M team quarterly target
  const teamAchievementPercent = Math.min(100, Math.round((teamRevenue / teamTargetQuota) * 100));
  const teamConversionRate = totalTeamLeads > 0 ? ((wonDeals.length / totalTeamLeads) * 100).toFixed(1) : '0.0';

  const totalWonLost = wonDeals.length + lostDeals.length;
  const winRate = totalWonLost > 0 ? Math.round((wonDeals.length / totalWonLost) * 100) : 0;
  const lostRevenue = lostDeals.reduce((sum, d) => sum + d.amount, 0);

  // Overdue follow-ups & alerts
  const overdueTasks = tasks.filter((t) => t.status === 'overdue');
  const overdueFollowUps = leads.filter((l) => l.status === 'contacted' && l.score >= 70);

  // Upcoming High-Value Deals closing this month
  const upcomingDeals = openDeals
    .filter((d) => d.amount >= 20000)
    .sort((a, b) => new Date(a.expectedCloseDate).getTime() - new Date(b.expectedCloseDate).getTime())
    .slice(0, 4);

  // Pipeline by stage
  const stageData = [
    { stage: 'Discovery', count: deals.filter((d) => d.stage === 'new').length, value: deals.filter((d) => d.stage === 'new').reduce((s, d) => s + d.amount, 0) },
    { stage: 'Qualified', count: deals.filter((d) => d.stage === 'qualified').length, value: deals.filter((d) => d.stage === 'qualified').reduce((s, d) => s + d.amount, 0) },
    { stage: 'Proposal', count: deals.filter((d) => d.stage === 'proposal').length, value: deals.filter((d) => d.stage === 'proposal').reduce((s, d) => s + d.amount, 0) },
    { stage: 'Negotiation', count: deals.filter((d) => d.stage === 'negotiation').length, value: deals.filter((d) => d.stage === 'negotiation').reduce((s, d) => s + d.amount, 0) },
    { stage: 'Won', count: wonDeals.length, value: teamRevenue },
  ];

  // Lead Distribution among Reps
  const leadDistData = mockRepPerformance.map((rep) => {
    const assignedLeadsCount = leads.filter((l) => l.ownerName === rep.repName || (l.ownerName && l.ownerName.includes(rep.repName.split(' ')[0]))).length || 5;
    return {
      name: rep.repName.split(' ')[0],
      leads: assignedLeadsCount,
      deals: rep.dealsWon,
    };
  });

  // Won vs Lost Chart Data
  const wonLostData = [
    { name: 'Deals Won', count: wonDeals.length, value: teamRevenue, color: '#047857' },
    { name: 'Deals Lost', count: lostDeals.length, value: lostRevenue, color: '#e11d48' },
  ];

  const COLORS = ['#047857', '#f97316', '#059669', '#fb923c', '#065f46'];

  return (
    <div className="space-y-6">
      {/* Sales Manager Scope Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-forest-900/90 text-peach-50 border border-peach-400/30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-peach-500/20 border border-peach-400/40 flex items-center justify-center text-peach-300">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-peach-50">Sales Management Dashboard</h2>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 bg-peach-500/20 text-peach-300 rounded border border-peach-500/30">
                Team Level
              </span>
            </div>
            <p className="text-xs text-peach-200/80">Sales rep quotas, pipeline velocity, lead distribution, and team forecasts</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="xs"
            variant="secondary"
            onClick={() => navigate('/deals/kanban')}
            className="bg-peach-100 text-forest-950 hover:bg-peach-200 border-none text-xs font-semibold"
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Pipeline Board
          </Button>
          <Button
            size="xs"
            variant="primary"
            onClick={() => onOpenQuickAdd('deal')}
            className="bg-forest-800 text-peach-100 border border-peach-400/30 text-xs font-semibold"
          >
            Assign Deal
          </Button>
        </div>
      </div>

      {/* Team Quota Target vs Achievement Progress Banner */}
      <div className="bg-white dark:bg-forest-900/80 border border-peach-200/70 dark:border-forest-800 rounded-3xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-forest-800 dark:text-peach-400 flex items-center gap-1.5 font-mono">
              <Award className="w-4 h-4" />
              Q3 Team Target vs Achievement
            </span>
            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-peach-50">
                {formatCurrency(teamRevenue)}
              </span>
              <span className="text-xs text-slate-500 dark:text-peach-200/70">
                of {formatCurrency(teamTargetQuota)} fiscal quota target
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs font-bold text-forest-900 dark:text-peach-300 block">
                {teamAchievementPercent}% Achieved
              </span>
              <span className="text-[10px] text-slate-400">
                {formatCurrency(teamTargetQuota - teamRevenue)} remaining
              </span>
            </div>
            <Badge variant={teamAchievementPercent >= 80 ? 'success' : 'primary'} size="lg">
              {teamAchievementPercent}%
            </Badge>
          </div>
        </div>

        {/* Target Progress Bar */}
        <div className="w-full bg-peach-100 dark:bg-forest-950 rounded-full h-3.5 overflow-hidden border border-peach-200 dark:border-forest-800">
          <div
            className="bg-gradient-to-r from-forest-700 via-forest-600 to-peach-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${teamAchievementPercent}%` }}
          />
        </div>
      </div>

      {/* Pending Rep Approvals Quick Action Alert (If Any) */}
      {pendingRequests.length > 0 && (
        <div className="p-4 rounded-3xl bg-amber-500/15 border border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500 text-slate-950 font-bold shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-peach-50">
                {pendingRequests.length} Sales Rep Submissions Awaiting Approval
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-peach-200/80">
                Latest: <strong>{pendingRequests[0]?.title}</strong> submitted by {pendingRequests[0]?.submittedByName}
              </p>
            </div>
          </div>
          <Button
            size="xs"
            variant="primary"
            className="bg-forest-900 text-peach-100 hover:bg-forest-850 font-bold self-end sm:self-center"
            onClick={() => navigate('/approvals')}
            rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
          >
            Open Approvals Queue ({pendingRequests.length})
          </Button>
        </div>
      )}

      {/* 6 Manager Team KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Team Revenue"
          value={formatCurrency(teamRevenue)}
          change={28.5}
          changePeriod="vs last quarter"
          icon={<Trophy className="w-5 h-5" />}
          iconBg="bg-emerald-50 dark:bg-forest-900/60 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-forest-800"
          onClick={() => navigate('/reports/sales')}
        />
        <StatCard
          title="Team Leads"
          value={totalTeamLeads}
          change={19.4}
          changePeriod="assigned to team"
          icon={<Users className="w-5 h-5" />}
          iconBg="bg-peach-100 dark:bg-forest-900/60 text-forest-800 dark:text-peach-300 border-peach-200 dark:border-forest-800"
          onClick={() => navigate('/leads')}
        />
        <StatCard
          title="Pipeline Value"
          value={formatCurrency(teamPipelineValue)}
          change={16.2}
          changePeriod="open deals"
          icon={<DollarSign className="w-5 h-5" />}
          iconBg="bg-peach-100 dark:bg-forest-900/60 text-forest-800 dark:text-peach-300 border-peach-200 dark:border-forest-800"
          onClick={() => navigate('/deals/kanban')}
        />
        <StatCard
          title="Team Win Rate"
          value={`${winRate}%`}
          change={5.2}
          changePeriod="won vs lost"
          icon={<Target className="w-5 h-5" />}
          iconBg="bg-peach-100 dark:bg-forest-900/60 text-forest-800 dark:text-peach-300 border-peach-200 dark:border-forest-800"
          onClick={() => navigate('/analytics')}
        />
        <StatCard
          title="Conversion Rate"
          value={`${teamConversionRate}%`}
          change={2.9}
          changePeriod="lead to won"
          icon={<TrendingUp className="w-5 h-5" />}
          iconBg="bg-peach-100 dark:bg-forest-900/60 text-forest-800 dark:text-peach-300 border-peach-200 dark:border-forest-800"
          onClick={() => navigate('/analytics')}
        />
        <StatCard
          title="Overdue Tasks"
          value={overdueTasks.length}
          change={overdueTasks.length > 0 ? -10.0 : 0}
          changePeriod="needs escalation"
          icon={<AlertCircle className="w-5 h-5" />}
          iconBg="bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-900/50"
          onClick={() => navigate('/tasks')}
        />
      </div>

      {/* Row 1: Deals by Stage & Won/Lost Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Deals by Stage (2 cols) */}
        <div className="lg:col-span-2">
          <ChartCard
            title="Team Pipeline by Stage"
            subtitle="Deal value distribution across active stages"
            action={
              <Button variant="ghost" size="xs" onClick={() => navigate('/deals/kanban')} rightIcon={<ArrowRight className="w-3 h-3" />}>
                Kanban
              </Button>
            }
          >
            <ResponsiveContainer width="100%" height={280}>
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
                  formatter={(val: any) => [`$${Number(val).toLocaleString()}`, 'Pipeline Value']}
                />
                <Bar dataKey="value" fill="#047857" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Won vs Lost Deals Breakdown */}
        <div className="lg:col-span-1">
          <ChartCard
            title="Won vs Lost Deals"
            subtitle="Closed deal outcomes and revenue impact"
            action={
              <Button variant="ghost" size="xs" onClick={() => navigate('/reports/pipeline')} rightIcon={<ArrowRight className="w-3 h-3" />}>
                Report
              </Button>
            }
          >
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={wonLostData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={6}
                  dataKey="count"
                >
                  {wonLostData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
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
                  formatter={(val: any, name: any) => [`${val} Deals`, name]}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>

      {/* Row 2: Sales Rep Performance Leaderboard & Lead Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Rep Leaderboard (2 cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-forest-900/80 border border-peach-200/70 dark:border-forest-800 rounded-3xl p-6 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-peach-50">
                Sales Representative Performance
              </h3>
              <p className="text-xs text-slate-500 dark:text-peach-200/70 mt-0.5">
                Manager tracking of quota attainment and deal closures
              </p>
            </div>
            <Button variant="ghost" size="xs" onClick={() => navigate('/reports/reps')} rightIcon={<ArrowRight className="w-3 h-3" />}>
              Team Roster
            </Button>
          </div>

          <div className="space-y-4 flex-1">
            {mockRepPerformance.map((rep, idx) => (
              <div
                key={rep.repId}
                className="p-3.5 rounded-2xl bg-peach-50/50 dark:bg-forest-850/60 border border-peach-200/60 dark:border-forest-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-5 text-center font-bold text-xs text-slate-400">
                    #{idx + 1}
                  </span>
                  <Avatar src={rep.avatar} name={rep.repName} size="md" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-900 dark:text-peach-50 truncate">
                      {rep.repName}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">{rep.role}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 text-right">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Won Deals</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-peach-100">
                      {rep.dealsWon} deals
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Revenue</span>
                    <span className="text-xs font-bold text-forest-900 dark:text-peach-200">
                      {formatCurrency(rep.revenueGenerated)}
                    </span>
                  </div>

                  <div className="w-24 text-right">
                    <Badge
                      variant={rep.quotaAttainmentPercent >= 100 ? 'success' : 'primary'}
                      size="sm"
                    >
                      {rep.quotaAttainmentPercent}% Quota
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Distribution by Representative (1 col) */}
        <div className="lg:col-span-1">
          <ChartCard
            title="Lead Distribution by Rep"
            subtitle="Workload balancing across sales team"
            action={
              <Button variant="ghost" size="xs" onClick={() => navigate('/leads')} rightIcon={<ArrowRight className="w-3 h-3" />}>
                Assign
              </Button>
            }
          >
            <ResponsiveContainer width="100%" height={290}>
              <BarChart data={leadDistData} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" opacity={0.25} />
                <XAxis type="number" stroke="#9a3412" fontSize={11} tickLine={false} />
                <YAxis dataKey="name" type="category" stroke="#9a3412" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#062016',
                    borderColor: '#164e37',
                    borderRadius: '12px',
                    color: '#fff8f3',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="leads" name="Assigned Leads" fill="#f97316" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>

      {/* Row 3: Upcoming High-Value Deals & Manager Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Deals Closing Soon */}
        <div className="bg-white dark:bg-forest-900/80 border border-peach-200/70 dark:border-forest-800 rounded-3xl p-6 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-peach-50">
                Upcoming High-Value Deals
              </h3>
              <p className="text-xs text-slate-500 dark:text-peach-200/70 mt-0.5">
                Priority deals closing this cycle with significant revenue impact
              </p>
            </div>
            <Button variant="ghost" size="xs" onClick={() => navigate('/deals')} rightIcon={<ArrowRight className="w-3 h-3" />}>
              All Deals
            </Button>
          </div>

          <div className="space-y-3 flex-1">
            {upcomingDeals.map((deal) => (
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
                      {deal.probability}% Prob
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    {deal.customerName} • {deal.customerCompany}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-forest-900 dark:text-peach-200">
                    {formatCurrency(deal.amount)}
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono">
                    Close: {new Date(deal.expectedCloseDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Manager Action Alerts & Overdue Follow-ups */}
        <div className="bg-white dark:bg-forest-900/80 border border-peach-200/70 dark:border-forest-800 rounded-3xl p-6 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-peach-50 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                Overdue Follow-ups & Alerts
              </h3>
              <p className="text-xs text-slate-500 dark:text-peach-200/70 mt-0.5">
                Critical team items requiring managerial escalation
              </p>
            </div>
            <Badge variant="danger" size="sm">
              {overdueTasks.length + overdueFollowUps.length} Urgent
            </Badge>
          </div>

          <div className="space-y-3 flex-1">
            {overdueTasks.slice(0, 2).map((task) => (
              <div
                key={task.id}
                className="p-3 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/50 flex items-start gap-3"
              >
                <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-rose-900 dark:text-rose-200 truncate">
                    Overdue Task: {task.title}
                  </p>
                  <p className="text-[11px] text-rose-700/80 dark:text-rose-300 truncate">
                    Assigned to: {task.assigneeName} • Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}

            {overdueFollowUps.slice(0, 2).map((lead) => (
              <div
                key={lead.id}
                className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 flex items-start gap-3"
              >
                <Clock className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-amber-900 dark:text-amber-200 truncate">
                    Lead Follow-up: {lead.fullName} ({lead.company})
                  </p>
                  <p className="text-[11px] text-amber-700/80 dark:text-amber-300 truncate">
                    Lead Score: {lead.score}/100 • Assigned to: {lead.ownerName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

