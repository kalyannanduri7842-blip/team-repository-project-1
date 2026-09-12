import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Building2,
  Users,
  Briefcase,
  AlertCircle,
  Eye,
  Filter,
  ArrowRight,
  UserCheck,
  Plus,
  Send,
} from 'lucide-react';
import { useApprovalStore, useAuthStore, useCustomerStore, useLeadStore, useDealStore } from '../../store';
import { ApprovalRequest, ApprovalEntityType, ApprovalStatus } from '../../types';
import { Button, Badge, Modal, Input } from '../../components/ui';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const ApprovalsPage: React.FC = () => {
  const user = useAuthStore((s) => s.user);
  const { requests, approveRequest, rejectRequest, submitApproval } = useApprovalStore();
  const fetchCustomers = useCustomerStore((s) => s.fetchCustomers);
  const fetchLeads = useLeadStore((s) => s.fetchLeads);
  const fetchDeals = useDealStore((s) => s.fetchDeals);

  const [activeTab, setActiveTab] = useState<ApprovalStatus | 'all'>('pending');
  const [selectedType, setSelectedType] = useState<ApprovalEntityType | 'all'>('all');
  const [inspectModal, setInspectModal] = useState<{ isOpen: boolean; request: ApprovalRequest | null }>({
    isOpen: false,
    request: null,
  });

  // Action Modals State
  const [approveDialog, setApproveDialog] = useState<{ isOpen: boolean; request: ApprovalRequest | null; note: string }>({
    isOpen: false,
    request: null,
    note: 'Approved. Looks great for team onboarding.',
  });

  const [rejectDialog, setRejectDialog] = useState<{ isOpen: boolean; request: ApprovalRequest | null; note: string }>({
    isOpen: false,
    request: null,
    note: '',
  });

  // New Submission Modal State
  const [submitModal, setSubmitModal] = useState({
    isOpen: false,
    type: 'customer' as ApprovalEntityType,
    name: '',
    company: '',
    email: '',
    value: 50000,
    tier: 'Enterprise',
  });

  const pendingCount = requests.filter((r) => r.status === 'pending').length;
  const approvedCount = requests.filter((r) => r.status === 'approved').length;
  const rejectedCount = requests.filter((r) => r.status === 'rejected').length;

  const filteredRequests = requests.filter((r) => {
    const matchesTab = activeTab === 'all' || r.status === activeTab;
    const matchesType = selectedType === 'all' || r.entityType === selectedType;
    return matchesTab && matchesType;
  });

  const handleConfirmApprove = () => {
    if (!approveDialog.request) return;
    const reviewerId = user?.id || 'usr-002';
    const reviewerName = user?.name || 'Marcus Reed (Manager)';
    
    approveRequest(approveDialog.request.id, reviewerId, reviewerName, approveDialog.note);
    fetchCustomers();
    fetchLeads();
    fetchDeals();
    setApproveDialog({ isOpen: false, request: null, note: '' });
  };

  const handleConfirmReject = () => {
    if (!rejectDialog.request) return;
    const reviewerId = user?.id || 'usr-002';
    const reviewerName = user?.name || 'Marcus Reed (Manager)';

    rejectRequest(
      rejectDialog.request.id,
      reviewerId,
      reviewerName,
      rejectDialog.note || 'Data requires further validation before approval.'
    );
    setRejectDialog({ isOpen: false, request: null, note: '' });
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitModal.name) return;

    if (submitModal.type === 'customer') {
      submitApproval({
        entityType: 'customer',
        title: submitModal.name,
        subtitle: `${submitModal.company || submitModal.name} • ${submitModal.tier} • ${formatCurrency(submitModal.value)} ARR`,
        entityData: {
          name: submitModal.name,
          company: submitModal.company || submitModal.name,
          email: submitModal.email || 'contact@client.com',
          phone: '+1 (555) 987-6543',
          industry: 'Software & Technology',
          tier: submitModal.tier,
          status: 'onboarding',
          healthScore: 88,
          relationshipScore: 85,
          ownerId: user?.id || 'usr-003',
          ownerName: user?.name || 'Alex Morgan',
          companySize: '51-200',
          lifetimeValue: submitModal.value,
          openDealsCount: 1,
          totalDealsValue: submitModal.value,
          pendingTasksCount: 1,
          tags: ['Submitted for Review'],
          lastContactedAt: new Date().toISOString(),
        },
        submittedById: user?.id || 'usr-003',
        submittedByName: user?.name || 'Alex Morgan',
        submittedByRole: user?.role || 'sales',
        estimatedValue: submitModal.value,
        priority: 'high',
      });
    } else if (submitModal.type === 'lead') {
      submitApproval({
        entityType: 'lead',
        title: submitModal.name,
        subtitle: `${submitModal.company || 'Enterprise Lead'} • Est. ${formatCurrency(submitModal.value)}`,
        entityData: {
          firstName: submitModal.name.split(' ')[0] || submitModal.name,
          lastName: submitModal.name.split(' ')[1] || 'Lead',
          fullName: submitModal.name,
          email: submitModal.email || 'lead@company.com',
          phone: '+1 (555) 345-6789',
          company: submitModal.company || 'TechCorp',
          jobTitle: 'Director of Procurement',
          source: 'direct',
          status: 'qualified',
          score: 82,
          ownerId: user?.id || 'usr-003',
          ownerName: user?.name || 'Alex Morgan',
          industry: 'Software & Technology',
          companySize: '51-200',
          estimatedValue: submitModal.value,
          tags: ['Pending Approval'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        submittedById: user?.id || 'usr-003',
        submittedByName: user?.name || 'Alex Morgan',
        submittedByRole: user?.role || 'sales',
        estimatedValue: submitModal.value,
        priority: 'medium',
      });
    }

    setSubmitModal({
      isOpen: false,
      type: 'customer',
      name: '',
      company: '',
      email: '',
      value: 50000,
      tier: 'Enterprise',
    });
  };

  const getEntityIcon = (type: ApprovalEntityType) => {
    switch (type) {
      case 'customer':
        return <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'lead':
        return <Users className="w-4 h-4 text-peach-600 dark:text-peach-400" />;
      case 'deal':
        return <Briefcase className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white/90 dark:bg-forest-900/90 backdrop-blur-md border border-peach-200/70 dark:border-forest-800 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-forest-900 text-peach-100 dark:bg-forest-850 dark:text-peach-50 border border-peach-400/40 shadow-xs">
              <ShieldCheck className="w-6 h-6 text-peach-300" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-peach-50">
                Manager Approvals Hub
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-peach-200/70">
                Data governance pipeline: Sales Rep customer & lead submissions requiring Manager approval.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setSubmitModal({ ...submitModal, isOpen: true })}
            leftIcon={<Plus className="w-4 h-4" />}
            className="bg-forest-900 hover:bg-forest-850 text-peach-100 border border-peach-400/30 shadow-sm"
          >
            Submit for Approval
          </Button>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => setActiveTab('pending')}
          className={`p-5 rounded-3xl cursor-pointer transition-all border ${
            activeTab === 'pending'
              ? 'bg-amber-500/10 border-amber-500/40 shadow-sm ring-1 ring-amber-500/30'
              : 'bg-white/80 dark:bg-forest-900/60 border-peach-200/70 dark:border-forest-800 hover:border-amber-400/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider font-mono">
              Pending Review
            </span>
            <Clock className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-peach-50 mt-2">{pendingCount}</p>
          <p className="text-[11px] text-slate-500 dark:text-peach-300/70 mt-1">Requires Manager 1-click review</p>
        </div>

        <div
          onClick={() => setActiveTab('approved')}
          className={`p-5 rounded-3xl cursor-pointer transition-all border ${
            activeTab === 'approved'
              ? 'bg-emerald-500/10 border-emerald-500/40 shadow-sm ring-1 ring-emerald-500/30'
              : 'bg-white/80 dark:bg-forest-900/60 border-peach-200/70 dark:border-forest-800 hover:border-emerald-400/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider font-mono">
              Approved & Published
            </span>
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-peach-50 mt-2">{approvedCount}</p>
          <p className="text-[11px] text-slate-500 dark:text-peach-300/70 mt-1">Active in CRM database</p>
        </div>

        <div
          onClick={() => setActiveTab('rejected')}
          className={`p-5 rounded-3xl cursor-pointer transition-all border ${
            activeTab === 'rejected'
              ? 'bg-rose-500/10 border-rose-500/40 shadow-sm ring-1 ring-rose-500/30'
              : 'bg-white/80 dark:bg-forest-900/60 border-peach-200/70 dark:border-forest-800 hover:border-rose-400/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-700 dark:text-rose-300 uppercase tracking-wider font-mono">
              Revision Requested
            </span>
            <XCircle className="w-5 h-5 text-rose-500" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-peach-50 mt-2">{rejectedCount}</p>
          <p className="text-[11px] text-slate-500 dark:text-peach-300/70 mt-1">Returned with manager feedback</p>
        </div>
      </div>

      {/* Tabs & Type Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 bg-white/80 dark:bg-forest-900/70 border border-peach-200/70 dark:border-forest-800 rounded-2xl">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {(['pending', 'approved', 'rejected', 'all'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                activeTab === tab
                  ? 'bg-forest-900 text-peach-50 shadow-xs'
                  : 'text-slate-600 dark:text-peach-200 hover:text-forest-900 hover:bg-peach-100/50'
              }`}
            >
              {tab === 'all' ? 'All Requests' : tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-400 dark:text-peach-300/70 uppercase font-mono">
            Filter:
          </span>
          {(['all', 'customer', 'lead', 'deal'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize transition-all ${
                selectedType === type
                  ? 'bg-peach-200 dark:bg-forest-800 text-forest-950 dark:text-peach-50 font-bold border border-peach-400/40'
                  : 'text-slate-500 hover:text-slate-800 dark:text-peach-300/60'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Requests List Cards */}
      <div className="space-y-3.5">
        {filteredRequests.length === 0 ? (
          <div className="p-12 text-center bg-white/60 dark:bg-forest-900/40 rounded-3xl border border-dashed border-peach-300 dark:border-forest-800">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto opacity-70 mb-3" />
            <h3 className="text-base font-bold text-slate-800 dark:text-peach-100">No approval requests found</h3>
            <p className="text-xs text-slate-500 dark:text-peach-300/60 mt-1">
              All submissions in this category have been processed.
            </p>
          </div>
        ) : (
          filteredRequests.map((req) => (
            <motion.div
              key={req.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-3xl bg-white/95 dark:bg-forest-900/90 border border-peach-200/70 dark:border-forest-800 shadow-xs hover:border-peach-400/60 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <div className="p-3 rounded-2xl bg-peach-50 dark:bg-forest-950 border border-peach-200 dark:border-forest-800 shrink-0">
                  {getEntityIcon(req.entityType)}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-peach-50 truncate">
                      {req.title}
                    </h3>
                    <Badge
                      variant={
                        req.status === 'approved'
                          ? 'success'
                          : req.status === 'rejected'
                          ? 'danger'
                          : 'warning'
                      }
                      size="sm"
                    >
                      {req.status.toUpperCase()}
                    </Badge>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-peach-100/70 dark:bg-forest-950 text-forest-900 dark:text-peach-300 border border-peach-300/50">
                      {req.entityType}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-peach-200/80 mt-1">
                    {req.subtitle}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 dark:text-peach-300/60 mt-2">
                    <span>
                      Submitted by <strong className="text-slate-700 dark:text-peach-200">{req.submittedByName}</strong> ({req.submittedByRole})
                    </span>
                    <span>• {formatDate(req.createdAt)}</span>
                    {req.estimatedValue && (
                      <span className="font-bold text-forest-700 dark:text-emerald-400">
                        • Value: {formatCurrency(req.estimatedValue)}
                      </span>
                    )}
                  </div>

                  {req.reviewNote && (
                    <div className="mt-2.5 p-2.5 rounded-xl bg-peach-50/70 dark:bg-forest-950/70 border border-peach-200/60 dark:border-forest-800 text-xs text-slate-700 dark:text-peach-200">
                      <span className="font-bold text-forest-800 dark:text-peach-300">Manager Note ({req.reviewedByName}):</span>{' '}
                      {req.reviewNote}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end lg:self-center shrink-0">
                <Button
                  size="xs"
                  variant="outline"
                  leftIcon={<Eye className="w-3.5 h-3.5" />}
                  onClick={() => setInspectModal({ isOpen: true, request: req })}
                >
                  Inspect Data
                </Button>

                {req.status === 'pending' && (
                  <>
                    <Button
                      size="xs"
                      variant="primary"
                      className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold"
                      leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                      onClick={() => setApproveDialog({ isOpen: true, request: req, note: 'Approved by Manager' })}
                    >
                      Accept
                    </Button>
                    <Button
                      size="xs"
                      variant="secondary"
                      className="bg-rose-100 text-rose-800 hover:bg-rose-200 border-rose-300 dark:bg-rose-950 dark:text-rose-200"
                      leftIcon={<XCircle className="w-3.5 h-3.5" />}
                      onClick={() => setRejectDialog({ isOpen: true, request: req, note: '' })}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Approve Confirmation Modal */}
      <Modal
        isOpen={approveDialog.isOpen}
        onClose={() => setApproveDialog({ isOpen: false, request: null, note: '' })}
        title="Approve & Publish Record"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600 dark:text-peach-200">
            Accepting will officially create and add <strong className="text-forest-800 dark:text-peach-100">{approveDialog.request?.title}</strong> into the live CRM database and notify the sales representative.
          </p>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-peach-200 mb-1">
              Approval Note (Optional)
            </label>
            <input
              type="text"
              value={approveDialog.note}
              onChange={(e) => setApproveDialog({ ...approveDialog, note: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-forest-950 border border-peach-200 dark:border-forest-800 text-slate-900 dark:text-peach-50"
              placeholder="e.g. Approved. Assigned to enterprise onboarding."
            />
          </div>
          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setApproveDialog({ isOpen: false, request: null, note: '' })}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              variant="primary"
              className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold"
              onClick={handleConfirmApprove}
            >
              Confirm & Publish
            </Button>
          </div>
        </div>
      </Modal>

      {/* Reject Revision Request Modal */}
      <Modal
        isOpen={rejectDialog.isOpen}
        onClose={() => setRejectDialog({ isOpen: false, request: null, note: '' })}
        title="Request Revisions / Reject Submission"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600 dark:text-peach-200">
            Please provide feedback for <strong className="text-rose-700 dark:text-rose-300">{rejectDialog.request?.title}</strong> so the submitter can adjust the pricing or details.
          </p>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-peach-200 mb-1">
              Feedback / Reason for Rejection *
            </label>
            <textarea
              rows={3}
              value={rejectDialog.note}
              onChange={(e) => setRejectDialog({ ...rejectDialog, note: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-forest-950 border border-peach-200 dark:border-forest-800 text-slate-900 dark:text-peach-50"
              placeholder="e.g. Quoted discount exceeds margin limit. Please revise to max 15% discount."
            />
          </div>
          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setRejectDialog({ isOpen: false, request: null, note: '' })}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              variant="primary"
              className="bg-rose-700 hover:bg-rose-600 text-white font-bold"
              onClick={handleConfirmReject}
            >
              Submit Rejection
            </Button>
          </div>
        </div>
      </Modal>

      {/* Inspect Raw Data Modal */}
      <Modal
        isOpen={inspectModal.isOpen}
        onClose={() => setInspectModal({ isOpen: false, request: null })}
        title={`Inspecting: ${inspectModal.request?.title || 'Record'}`}
      >
        <div className="space-y-4">
          <div className="p-3 bg-peach-50 dark:bg-forest-950 rounded-2xl border border-peach-200 dark:border-forest-800 max-h-72 overflow-y-auto font-mono text-xs text-slate-800 dark:text-peach-200">
            <pre>{JSON.stringify(inspectModal.request?.entityData, null, 2)}</pre>
          </div>
          <div className="flex justify-end">
            <Button size="sm" variant="outline" onClick={() => setInspectModal({ isOpen: false, request: null })}>
              Close
            </Button>
          </div>
        </div>
      </Modal>

      {/* Fast Submit Modal */}
      <Modal
        isOpen={submitModal.isOpen}
        onClose={() => setSubmitModal({ ...submitModal, isOpen: false })}
        title="Submit Record for Manager Review"
      >
        <form onSubmit={handleQuickSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-peach-200 mb-1">Entity Type</label>
              <select
                value={submitModal.type}
                onChange={(e) => setSubmitModal({ ...submitModal, type: e.target.value as ApprovalEntityType })}
                className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-forest-950 border border-peach-200 dark:border-forest-800 text-slate-900 dark:text-peach-50"
              >
                <option value="customer">Customer</option>
                <option value="lead">Lead</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-peach-200 mb-1">Estimated ARR ($)</label>
              <input
                type="number"
                value={submitModal.value}
                onChange={(e) => setSubmitModal({ ...submitModal, value: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-forest-950 border border-peach-200 dark:border-forest-800 text-slate-900 dark:text-peach-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-peach-200 mb-1">
              {submitModal.type === 'customer' ? 'Customer / Organization Name' : 'Lead Contact Name'} *
            </label>
            <input
              type="text"
              required
              value={submitModal.name}
              onChange={(e) => setSubmitModal({ ...submitModal, name: e.target.value })}
              className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-forest-950 border border-peach-200 dark:border-forest-800 text-slate-900 dark:text-peach-50"
              placeholder="e.g. Apex Global Systems"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-peach-200 mb-1">Company / Domain</label>
            <input
              type="text"
              value={submitModal.company}
              onChange={(e) => setSubmitModal({ ...submitModal, company: e.target.value })}
              className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-forest-950 border border-peach-200 dark:border-forest-800 text-slate-900 dark:text-peach-50"
              placeholder="e.g. Apex Global"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button size="sm" variant="outline" type="button" onClick={() => setSubmitModal({ ...submitModal, isOpen: false })}>
              Cancel
            </Button>
            <Button size="sm" variant="primary" type="submit" leftIcon={<Send className="w-3.5 h-3.5" />}>
              Send to Manager
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
