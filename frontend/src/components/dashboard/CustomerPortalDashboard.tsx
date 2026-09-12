import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  LifeBuoy,
  Plus,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  ShieldCheck,
  Headphones,
  DollarSign,
  Briefcase,
  AlertCircle,
  User,
  Calendar,
  ExternalLink,
} from 'lucide-react';
import { useSupportStore, useAuthStore, useCustomerStore, useDealStore } from '../../store';
import { SupportTicket, TicketCategory, TicketPriority } from '../../types';
import { Button, Badge, Modal, Input } from '../ui';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const CustomerPortalDashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const { tickets, raiseTicket } = useSupportStore();
  const customers = useCustomerStore((s) => s.customers);
  const deals = useDealStore((s) => s.deals);

  // Match customer record or fallback
  const myCustomer = customers.find((c) => c.name.toLowerCase().includes('apex') || c.company.toLowerCase().includes('apex')) || customers[0];
  const myDeals = deals.filter((d) => d.customerId === myCustomer?.id || d.customerName === myCustomer?.name);

  // Tickets for this customer or raised by this user
  const myTickets = tickets.filter(
    (t) => t.raisedById === user?.id || t.raisedByName.toLowerCase().includes('customer') || t.relatedEntityName?.includes(myCustomer?.name || '')
  );

  const [isRaiseModalOpen, setIsRaiseModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    category: 'technical' as TicketCategory,
    priority: 'medium' as TicketPriority,
  });

  const handleRaiseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject || !formData.description) return;

    raiseTicket({
      subject: formData.subject,
      description: formData.description,
      category: formData.category,
      priority: formData.priority,
      raisedById: user?.id || 'usr_customer',
      raisedByName: user?.name || 'David Hayes (Customer)',
      raisedByRole: 'customer',
      relatedEntityName: myCustomer?.name || 'Apex BioTech Inc.',
      relatedEntityType: 'customer',
    });

    setFormData({
      subject: '',
      description: '',
      category: 'technical',
      priority: 'medium',
    });
    setIsRaiseModalOpen(false);
  };

  const solvedTicketsCount = myTickets.filter((t) => t.status === 'resolved' || t.status === 'closed').length;
  const inProgressCount = myTickets.filter((t) => t.status === 'in_progress').length;
  const rejectedCount = myTickets.filter((t) => t.status === 'rejected').length;
  const openCount = myTickets.filter((t) => t.status === 'open').length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved':
      case 'closed':
        return <Badge variant="success" size="sm">SOLVED</Badge>;
      case 'in_progress':
        return <Badge variant="warning" size="sm">IN PROGRESS (PROCESS)</Badge>;
      case 'rejected':
        return <Badge variant="danger" size="sm">REJECTED</Badge>;
      default:
        return <Badge variant="primary" size="sm">OPEN</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Customer Header Banner */}
      <div className="p-6 rounded-3xl bg-forest-900/95 text-peach-50 border border-peach-400/30 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-peach-500/20 border border-peach-400/30 text-peach-300">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold text-peach-50">
                {myCustomer?.name || 'Apex BioTech Inc.'} — Client Portal
              </h2>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30 font-mono">
                {myCustomer?.tier || 'Enterprise'} Plan
              </span>
            </div>
            <p className="text-xs text-peach-200/80 mt-1">
              Account Managed by <strong className="text-peach-100">{myCustomer?.ownerName || 'Sarah Chen (Senior AE)'}</strong> • Support Level: 24/7 Priority SLA
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="primary"
            onClick={() => setIsRaiseModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold border border-emerald-400/40 shadow-sm"
          >
            Raise Support Ticket
          </Button>
        </div>
      </div>

      {/* Account Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white/90 dark:bg-forest-900/80 border border-peach-200/70 dark:border-forest-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-peach-300/80 font-mono uppercase">
              Contract Value
            </span>
            <DollarSign className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-peach-50 mt-2">
            {formatCurrency(myCustomer?.lifetimeValue || 120000)} / yr
          </p>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 inline-block">Active Annual Subscription</span>
        </div>

        <div className="p-5 rounded-3xl bg-white/90 dark:bg-forest-900/80 border border-peach-200/70 dark:border-forest-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-peach-300/80 font-mono uppercase">
              Health & SLA
            </span>
            <ShieldCheck className="w-5 h-5 text-forest-700 dark:text-peach-300" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-peach-50 mt-2">
            {myCustomer?.healthScore || 95}% Operational
          </p>
          <span className="text-[11px] text-slate-500 dark:text-peach-300/70 mt-1 inline-block">Enterprise SLA Guaranteed</span>
        </div>

        <div className="p-5 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 font-mono uppercase">
              Solved Tickets
            </span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-peach-50 mt-2">{solvedTicketsCount}</p>
          <span className="text-[11px] text-emerald-700 dark:text-emerald-300/80 mt-1 inline-block">Resolved by Support Team</span>
        </div>

        <div className="p-5 rounded-3xl bg-amber-500/10 border border-amber-500/30 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-700 dark:text-amber-300 font-mono uppercase">
              Active / In Process
            </span>
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-peach-50 mt-2">{inProgressCount + openCount}</p>
          <span className="text-[11px] text-amber-700 dark:text-amber-300/80 mt-1 inline-block">Under Investigation</span>
        </div>
      </div>

      {/* Support Ticket Center */}
      <div className="bg-white/90 dark:bg-forest-900/80 border border-peach-200/70 dark:border-forest-800 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-peach-100 dark:border-forest-800">
          <div>
            <div className="flex items-center gap-2">
              <LifeBuoy className="w-5 h-5 text-forest-800 dark:text-peach-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-peach-50">
                Customer Support & Helpdesk Tickets
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-peach-200/70 mt-0.5">
              Submit issues, feature requests, or billing queries. Real-time status updates from our technical support team.
            </p>
          </div>

          <Button
            size="xs"
            variant="primary"
            onClick={() => setIsRaiseModalOpen(true)}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
            className="bg-forest-900 hover:bg-forest-850 text-peach-100 border border-peach-400/30 shadow-xs self-start sm:self-center"
          >
            New Support Ticket
          </Button>
        </div>

        {/* Tickets List */}
        <div className="space-y-3">
          {myTickets.length === 0 ? (
            <div className="p-8 text-center bg-peach-50/50 dark:bg-forest-950/40 rounded-2xl border border-dashed border-peach-300 dark:border-forest-800">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-80" />
              <p className="text-xs font-bold text-slate-700 dark:text-peach-100">No active support tickets</p>
              <p className="text-[11px] text-slate-400 dark:text-peach-300/60 mt-0.5">
                All systems running normally. Click "Raise Support Ticket" if you need assistance.
              </p>
            </div>
          ) : (
            myTickets.map((t) => (
              <div
                key={t.id}
                className="p-4 rounded-2xl bg-peach-50/40 dark:bg-forest-950/60 border border-peach-200/70 dark:border-forest-800 flex flex-col sm:flex-row sm:items-start justify-between gap-3 hover:border-peach-400/60 transition-all"
              >
                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-peach-200/80 dark:bg-forest-900 text-forest-900 dark:text-peach-300">
                      {t.ticketNumber}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-peach-50">{t.subject}</h4>
                    {getStatusBadge(t.status)}
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-forest-800 text-slate-700 dark:text-peach-200">
                      {t.category.replace('_', ' ')}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-peach-200/80">{t.description}</p>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 dark:text-peach-300/60">
                    <span>Created: {formatDate(t.createdAt)}</span>
                    <span>• Assigned: {t.assignedToName || 'Technical Support Lead'}</span>
                  </div>

                  {t.resolutionNote && (
                    <div className="mt-2 p-2.5 rounded-xl bg-emerald-50 dark:bg-forest-900/90 border border-emerald-200 dark:border-forest-750 text-xs text-emerald-900 dark:text-emerald-200">
                      <strong>Support Response:</strong> {t.resolutionNote}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Active Contracts & Invoices */}
      <div className="bg-white/90 dark:bg-forest-900/80 border border-peach-200/70 dark:border-forest-800 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-peach-100 dark:border-forest-800">
          <FileText className="w-5 h-5 text-forest-800 dark:text-peach-400" />
          <h3 className="text-base font-bold text-slate-900 dark:text-peach-50">
            Active Contracts & Subscription Invoices
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-peach-200/70 dark:border-forest-800 text-[10px] uppercase font-bold text-slate-400 dark:text-peach-300 tracking-wider">
                <th className="pb-3 pl-1">Service Package</th>
                <th className="pb-3 text-center">Term</th>
                <th className="pb-3 text-right">Amount</th>
                <th className="pb-3 text-right pr-1">Payment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-peach-100 dark:divide-forest-850">
              <tr className="hover:bg-peach-50/50 dark:hover:bg-forest-850/50">
                <td className="py-3 pl-1 font-semibold text-slate-900 dark:text-peach-50">
                  Nexora Enterprise CRM Suite (50 Seats)
                </td>
                <td className="py-3 text-center text-slate-600 dark:text-peach-200">Annual (2026-2027)</td>
                <td className="py-3 text-right font-bold text-forest-900 dark:text-peach-100">$120,000.00</td>
                <td className="py-3 text-right pr-1">
                  <Badge variant="success" size="sm">PAID</Badge>
                </td>
              </tr>
              <tr className="hover:bg-peach-50/50 dark:hover:bg-forest-850/50">
                <td className="py-3 pl-1 font-semibold text-slate-900 dark:text-peach-50">
                  Dedicated 24/7 SLA & Solution Architect Add-on
                </td>
                <td className="py-3 text-center text-slate-600 dark:text-peach-200">Quarterly</td>
                <td className="py-3 text-right font-bold text-forest-900 dark:text-peach-100">$18,000.00</td>
                <td className="py-3 text-right pr-1">
                  <Badge variant="success" size="sm">PAID</Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Raise Ticket Modal */}
      <Modal
        isOpen={isRaiseModalOpen}
        onClose={() => setIsRaiseModalOpen(false)}
        title="Submit Support Request"
      >
        <form onSubmit={handleRaiseSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-peach-200 mb-1">
              Issue Summary / Subject *
            </label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-forest-950 border border-peach-200 dark:border-forest-800 text-slate-900 dark:text-peach-50"
              placeholder="e.g. Need assistance configuring webhook integration"
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
                <option value="technical">Technical Support</option>
                <option value="billing">Billing & Invoices</option>
                <option value="customer_issue">Account & Setup</option>
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
                <option value="low">Low (General Query)</option>
                <option value="medium">Medium (Standard)</option>
                <option value="high">High (Urgent Attention)</option>
                <option value="urgent">Urgent (System Blocker)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-peach-200 mb-1">
              Problem Description & Details *
            </label>
            <textarea
              rows={3}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-forest-950 border border-peach-200 dark:border-forest-800 text-slate-900 dark:text-peach-50"
              placeholder="Please explain the issue you are experiencing..."
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button size="sm" variant="outline" type="button" onClick={() => setIsRaiseModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" variant="primary" type="submit">
              Send to Support Team
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
