import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LifeBuoy,
  Plus,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Flame,
  MessageSquare,
  Search,
  Filter,
  CheckCircle,
  HelpCircle,
  User,
  Building2,
  Briefcase,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { useSupportStore, useAuthStore } from '../../store';
import { SupportTicket, TicketCategory, TicketPriority, TicketStatus } from '../../types';
import { Button, Badge, Modal, Input } from '../../components/ui';
import { formatDate } from '../../utils/formatters';

export const SupportHelpdeskPage: React.FC = () => {
  const user = useAuthStore((s) => s.user);
  const { tickets, filters, setFilters, raiseTicket, updateTicketStatus, getMetrics } = useSupportStore();

  const metrics = getMetrics();

  // Modals
  const [isRaiseModalOpen, setIsRaiseModalOpen] = useState(false);
  const [resolveModal, setResolveModal] = useState<{
    isOpen: boolean;
    ticket: SupportTicket | null;
    note: string;
  }>({
    isOpen: false,
    ticket: null,
    note: 'Issue verified and resolved. Client notified.',
  });

  // Raise Ticket Form State
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    category: 'technical' as TicketCategory,
    priority: 'medium' as TicketPriority,
    relatedEntityName: '',
  });

  const handleRaiseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject || !formData.description) return;

    raiseTicket({
      subject: formData.subject,
      description: formData.description,
      category: formData.category,
      priority: formData.priority,
      raisedById: user?.id || 'usr-003',
      raisedByName: user?.name || 'Alex Morgan',
      raisedByRole: user?.role || 'sales',
      relatedEntityName: formData.relatedEntityName || undefined,
    });

    setFormData({
      subject: '',
      description: '',
      category: 'technical',
      priority: 'medium',
      relatedEntityName: '',
    });
    setIsRaiseModalOpen(false);
  };

  const handleConfirmResolve = () => {
    if (!resolveModal.ticket) return;
    updateTicketStatus(
      resolveModal.ticket.id,
      'resolved',
      resolveModal.note,
      user?.name || 'Marcus Reed (Support Lead)'
    );
    setResolveModal({ isOpen: false, ticket: null, note: '' });
  };

  const filteredTickets = tickets.filter((t) => {
    const matchesStatus =
      filters.status === 'all'
        ? true
        : filters.status === 'resolved'
        ? t.status === 'resolved' || t.status === 'closed'
        : t.status === filters.status;

    const matchesCategory = filters.category === 'all' || t.category === filters.category;
    const matchesPriority = filters.priority === 'all' || t.priority === filters.priority;
    const matchesSearch =
      !filters.search ||
      t.subject.toLowerCase().includes(filters.search.toLowerCase()) ||
      t.ticketNumber.toLowerCase().includes(filters.search.toLowerCase()) ||
      t.raisedByName.toLowerCase().includes(filters.search.toLowerCase());

    return matchesStatus && matchesCategory && matchesPriority && matchesSearch;
  });

  // Chart Data for Category Distribution
  const categoryData = [
    { name: 'Technical', count: tickets.filter((t) => t.category === 'technical').length },
    { name: 'Billing', count: tickets.filter((t) => t.category === 'billing').length },
    { name: 'Customer Issue', count: tickets.filter((t) => t.category === 'customer_issue').length },
    { name: 'Deal Escalation', count: tickets.filter((t) => t.category === 'deal_escalation').length },
    { name: 'Feature Request', count: tickets.filter((t) => t.category === 'feature_request').length },
  ];

  // Chart Data for Solved Status
  const statusPieData = [
    { name: 'Resolved / Solved', value: metrics.resolvedTickets + metrics.closedTickets, color: '#047857' },
    { name: 'In Progress', value: metrics.inProgressTickets, color: '#f59e0b' },
    { name: 'Open Queue', value: metrics.openTickets, color: '#e11d48' },
  ];

  const getPriorityBadge = (p: TicketPriority) => {
    switch (p) {
      case 'urgent':
        return <Badge variant="danger" size="sm">URGENT</Badge>;
      case 'high':
        return <Badge variant="warning" size="sm">HIGH</Badge>;
      case 'medium':
        return <Badge variant="primary" size="sm">MEDIUM</Badge>;
      case 'low':
        return <Badge variant="neutral" size="sm">LOW</Badge>;
    }
  };

  const getStatusBadge = (s: TicketStatus) => {
    switch (s) {
      case 'resolved':
        return <Badge variant="success" size="sm">SOLVED</Badge>;
      case 'closed':
        return <Badge variant="neutral" size="sm">CLOSED</Badge>;
      case 'in_progress':
        return <Badge variant="warning" size="sm">IN PROGRESS</Badge>;
      case 'open':
        return <Badge variant="danger" size="sm">OPEN</Badge>;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white/90 dark:bg-forest-900/90 backdrop-blur-md border border-peach-200/70 dark:border-forest-800 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-forest-900 text-peach-100 dark:bg-forest-850 dark:text-peach-50 border border-peach-400/40 shadow-xs">
            <LifeBuoy className="w-6 h-6 text-peach-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-peach-50">
                Customer Support Helpdesk
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-mono">
                {metrics.resolutionRate}% Solved
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-peach-200/70">
              Raise tickets for client blockers, technical issues, billing, and escalations.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsRaiseModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
            className="bg-forest-900 hover:bg-forest-850 text-peach-100 border border-peach-400/30 shadow-sm"
          >
            Raise Support Ticket
          </Button>
        </div>
      </div>

      {/* Solved / Resolution Intelligence Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white/90 dark:bg-forest-900/90 border border-peach-200/70 dark:border-forest-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-peach-300/80 font-mono uppercase">
              Total Tickets
            </span>
            <LifeBuoy className="w-5 h-5 text-forest-700 dark:text-peach-300" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-peach-50 mt-2">{metrics.totalTickets}</p>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>100% Local SLA coverage</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 font-mono uppercase">
              Solved Rate
            </span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-peach-50 mt-2">{metrics.resolutionRate}%</p>
          <p className="text-[11px] text-emerald-700 dark:text-emerald-300/80 mt-1">
            {metrics.resolvedTickets + metrics.closedTickets} of {metrics.totalTickets} tickets solved
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-amber-500/10 border border-amber-500/30 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-700 dark:text-amber-300 font-mono uppercase">
              In Progress / Open
            </span>
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-peach-50 mt-2">
            {metrics.openTickets + metrics.inProgressTickets}
          </p>
          <p className="text-[11px] text-amber-700 dark:text-amber-300/80 mt-1">
            Avg resolution: {metrics.avgResolutionTimeHours} hrs
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-rose-500/10 border border-rose-500/30 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-700 dark:text-rose-300 font-mono uppercase">
              Urgent Priority
            </span>
            <Flame className="w-5 h-5 text-rose-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-peach-50 mt-2">{metrics.slaBreachCount}</p>
          <p className="text-[11px] text-rose-700 dark:text-rose-300/80 mt-1">High-attention queue</p>
        </div>
      </div>

      {/* Visual Resolution Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Distribution Pie Chart */}
        <div className="bg-white/90 dark:bg-forest-900/90 border border-peach-200/70 dark:border-forest-800 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-peach-50">Resolution Status Breakdown</h3>
            <p className="text-xs text-slate-500 dark:text-peach-200/70">Solved vs ongoing support work</p>
          </div>

          <div className="h-44 my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={68}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {statusPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-around text-xs pt-2 border-t border-peach-100 dark:border-forest-800">
            {statusPieData.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600 dark:text-peach-200 text-[11px]">{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown Bar Chart */}
        <div className="lg:col-span-2 bg-white/90 dark:bg-forest-900/90 border border-peach-200/70 dark:border-forest-800 rounded-3xl p-6 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-peach-50">Support Volume by Category</h3>
          <p className="text-xs text-slate-500 dark:text-peach-200/70 mb-4">Technical issues, billing queries, and feature requests</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#047857" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white/90 dark:bg-forest-900/90 border border-peach-200/70 dark:border-forest-800 rounded-3xl p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          {(['all', 'open', 'in_progress', 'resolved'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilters({ status })}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                filters.status === status
                  ? 'bg-forest-900 text-peach-50 shadow-xs'
                  : 'text-slate-600 dark:text-peach-200 hover:text-forest-900 hover:bg-peach-100/60'
              }`}
            >
              {status === 'all' ? 'All Tickets' : status === 'resolved' ? 'Solved / Closed' : status.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({ search: e.target.value })}
              placeholder="Search ticket # or subject..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs bg-peach-50/70 dark:bg-forest-950 border border-peach-200 dark:border-forest-800 text-slate-900 dark:text-peach-50 placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-3.5">
        {filteredTickets.length === 0 ? (
          <div className="p-12 text-center bg-white/60 dark:bg-forest-900/40 rounded-3xl border border-dashed border-peach-300 dark:border-forest-800">
            <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto opacity-70 mb-3" />
            <h3 className="text-base font-bold text-slate-800 dark:text-peach-100">No support tickets found</h3>
            <p className="text-xs text-slate-500 dark:text-peach-300/60 mt-1">
              Try adjusting your filter criteria or search keyword.
            </p>
          </div>
        ) : (
          filteredTickets.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-3xl bg-white/95 dark:bg-forest-900/90 border border-peach-200/70 dark:border-forest-800 shadow-xs hover:border-peach-400/60 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              <div className="space-y-2 min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-extrabold text-forest-800 dark:text-peach-300 px-2 py-0.5 rounded bg-peach-100/80 dark:bg-forest-950 border border-peach-300/50">
                    {t.ticketNumber}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-peach-50 truncate">
                    {t.subject}
                  </h3>
                  {getPriorityBadge(t.priority)}
                  {getStatusBadge(t.status)}
                </div>

                <p className="text-xs text-slate-600 dark:text-peach-200/80 line-clamp-2">
                  {t.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 dark:text-peach-300/60">
                  <span>
                    Raised by <strong className="text-slate-700 dark:text-peach-200">{t.raisedByName}</strong> ({t.raisedByRole})
                  </span>
                  <span>• Assigned to: <strong className="text-forest-700 dark:text-peach-200">{t.assignedToName || 'Support Lead'}</strong></span>
                  {t.relatedEntityName && (
                    <span className="text-peach-700 dark:text-peach-300 font-medium">
                      • Related: {t.relatedEntityName}
                    </span>
                  )}
                  <span>• {formatDate(t.createdAt)}</span>
                </div>

                {t.resolutionNote && (
                  <div className="mt-2 p-2.5 rounded-xl bg-emerald-50/80 dark:bg-forest-950/80 border border-emerald-200/80 dark:border-forest-800 text-xs text-emerald-900 dark:text-emerald-200">
                    <strong className="text-emerald-800 dark:text-emerald-300">Resolution:</strong> {t.resolutionNote}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end lg:self-center shrink-0">
                {t.status !== 'resolved' && t.status !== 'closed' && (
                  <Button
                    size="xs"
                    variant="primary"
                    className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold"
                    leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                    onClick={() => setResolveModal({ isOpen: true, ticket: t, note: 'Issue resolved & verified with user.' })}
                  >
                    Mark as Solved
                  </Button>
                )}

                <select
                  value={t.status}
                  onChange={(e) =>
                    updateTicketStatus(
                      t.id,
                      e.target.value as TicketStatus,
                      undefined,
                      user?.name || 'Support Agent'
                    )
                  }
                  className="px-2.5 py-1 rounded-xl text-xs bg-peach-50 dark:bg-forest-950 border border-peach-200 dark:border-forest-800 text-slate-800 dark:text-peach-100 font-medium"
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Resolve Ticket Modal */}
      <Modal
        isOpen={resolveModal.isOpen}
        onClose={() => setResolveModal({ isOpen: false, ticket: null, note: '' })}
        title="Mark Support Ticket as Solved"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600 dark:text-peach-200">
            Provide resolution notes for <strong className="text-forest-800 dark:text-peach-100">{resolveModal.ticket?.ticketNumber} ({resolveModal.ticket?.subject})</strong>:
          </p>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-peach-200 mb-1">
              Resolution Summary *
            </label>
            <textarea
              rows={3}
              value={resolveModal.note}
              onChange={(e) => setResolveModal({ ...resolveModal, note: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-forest-950 border border-peach-200 dark:border-forest-800 text-slate-900 dark:text-peach-50"
              placeholder="e.g. Patch applied, tested with customer, confirmed operational."
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button size="sm" variant="outline" onClick={() => setResolveModal({ isOpen: false, ticket: null, note: '' })}>
              Cancel
            </Button>
            <Button size="sm" variant="primary" className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold" onClick={handleConfirmResolve}>
              Confirm Solved
            </Button>
          </div>
        </div>
      </Modal>

      {/* Raise Ticket Modal */}
      <Modal
        isOpen={isRaiseModalOpen}
        onClose={() => setIsRaiseModalOpen(false)}
        title="Raise Customer Support Ticket"
      >
        <form onSubmit={handleRaiseSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-peach-200 mb-1">
              Ticket Subject / Issue Summary *
            </label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-forest-950 border border-peach-200 dark:border-forest-800 text-slate-900 dark:text-peach-50"
              placeholder="e.g. SSO Authentication Error on SAML Login"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-peach-200 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as TicketCategory })}
                className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-forest-950 border border-peach-200 dark:border-forest-800 text-slate-900 dark:text-peach-50"
              >
                <option value="technical">Technical Issue</option>
                <option value="billing">Billing & Invoice</option>
                <option value="customer_issue">Customer Issue</option>
                <option value="deal_escalation">Deal Escalation</option>
                <option value="feature_request">Feature Request</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-peach-200 mb-1">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as TicketPriority })}
                className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-forest-950 border border-peach-200 dark:border-forest-800 text-slate-900 dark:text-peach-50"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent (SLA)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-peach-200 mb-1">
              Related Customer / Lead / Deal (Optional)
            </label>
            <input
              type="text"
              value={formData.relatedEntityName}
              onChange={(e) => setFormData({ ...formData, relatedEntityName: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-forest-950 border border-peach-200 dark:border-forest-800 text-slate-900 dark:text-peach-50"
              placeholder="e.g. Acme Global Corporation"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-peach-200 mb-1">
              Detailed Description *
            </label>
            <textarea
              rows={3}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-forest-950 border border-peach-200 dark:border-forest-800 text-slate-900 dark:text-peach-50"
              placeholder="Describe what happened, error message, or steps required to resolve..."
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button size="sm" variant="outline" type="button" onClick={() => setIsRaiseModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" variant="primary" type="submit">
              Submit Ticket
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
