import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  Globe,
  Briefcase,
  DollarSign,
  Heart,
  Calendar,
  CheckCircle,
  Plus,
  PhoneCall,
  FileText,
  Clock,
  Pin,
  Trash2,
  Edit,
  Tag,
  ShieldCheck,
  TrendingUp,
  MapPin,
  UserCheck,
} from 'lucide-react';
import {
  useCustomerStore,
  useDealStore,
  useActivityStore,
  useTaskStore,
  useNotificationStore,
} from '../../store';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Tabs } from '../../components/ui/Tabs';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { formatCurrency, formatDate, formatDuration } from '../../utils/formatters';

export const CustomerDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCustomerById, deleteCustomer } = useCustomerStore();
  const { deals, addDeal } = useDealStore();
  const { activities, calls, meetings, notes, addCall, addMeeting, addNote, togglePinNote, deleteNote } = useActivityStore();
  const { tasks, addTask, toggleTaskComplete } = useTaskStore();
  const showSuccess = useNotificationStore((s) => s.showSuccess);

  const customer = getCustomerById(id || '');

  const [activeTab, setActiveTab] = useState('health');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Modals state
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  const [isAddDealModalOpen, setIsAddDealModalOpen] = useState(false);
  const [dealTitle, setDealTitle] = useState('');
  const [dealAmount, setDealAmount] = useState(85000);
  const [dealStage, setDealStage] = useState<any>('qualified');

  const [isLogCallModalOpen, setIsLogCallModalOpen] = useState(false);
  const [callDuration, setCallDuration] = useState(300);
  const [callOutcome, setCallOutcome] = useState<any>('connected_positive');
  const [callNotes, setCallNotes] = useState('');

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDueDate, setTaskDueDate] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
  const [taskPriority, setTaskPriority] = useState<any>('high');

  if (!customer) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Customer Account Not Found</h2>
        <Button className="mt-4" onClick={() => navigate('/customers')}>
          Back to Customers
        </Button>
      </div>
    );
  }

  // Related Entities
  const customerDeals = deals.filter((d) => d.customerId === customer.id || d.customerName === customer.name);
  const totalDealsValue = customerDeals.reduce((sum, d) => sum + d.amount, 0);
  const customerTasks = tasks.filter((t) => t.relatedToId === customer.id || t.relatedToName === customer.name);
  const customerActivities = activities.filter((a) => a.entityId === customer.id || a.metadata?.customerId === customer.id);
  const customerNotes = notes.filter((n) => n.relatedToId === customer.id);
  const customerCalls = calls.filter((c) => c.contactId === customer.id);
  const customerMeetings = meetings.filter((m) => m.relatedToId === customer.id);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent) return;

    addNote({
      title: noteTitle || undefined,
      content: noteContent,
      isPinned: false,
      relatedToType: 'customer',
      relatedToId: customer.id,
      relatedToName: customer.name,
      tags: ['Customer Note'],
      ownerId: customer.ownerId,
      ownerName: customer.ownerName,
    });

    showSuccess('Note added to account');
    setNoteContent('');
    setNoteTitle('');
    setIsAddNoteModalOpen(false);
  };

  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealTitle) return;

    const newDeal = addDeal({
      title: dealTitle,
      customerId: customer.id,
      customerName: customer.name,
      customerCompany: customer.company,
      amount: Number(dealAmount),
      currency: 'USD',
      stage: dealStage,
      probability: dealStage === 'won' ? 100 : 50,
      expectedCloseDate: new Date(Date.now() + 45 * 86400000).toISOString().split('T')[0],
      ownerId: customer.ownerId,
      ownerName: customer.ownerName,
      priority: 'high',
      products: [
        {
          id: `p_${Date.now()}`,
          name: `${dealTitle} Enterprise License`,
          quantity: 1,
          unitPrice: Number(dealAmount),
          totalPrice: Number(dealAmount),
        },
      ],
      tags: ['Account Expansion'],
    });

    showSuccess(`Opportunity "${newDeal.title}" created!`);
    setDealTitle('');
    setIsAddDealModalOpen(false);
  };

  const handleLogCall = (e: React.FormEvent) => {
    e.preventDefault();
    addCall({
      contactName: customer.billingContact?.name || customer.name,
      contactType: 'customer',
      contactId: customer.id,
      phoneNumber: customer.phone,
      date: new Date().toISOString(),
      durationSeconds: Number(callDuration),
      outcome: callOutcome,
      notes: callNotes || 'Executive account call logged.',
      ownerId: customer.ownerId,
      ownerName: customer.ownerName,
    });

    showSuccess(`Call logged with ${customer.name}`);
    setCallNotes('');
    setIsLogCallModalOpen(false);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle) return;

    addTask({
      title: taskTitle,
      description: `Task for account: ${customer.name}`,
      status: 'todo',
      priority: taskPriority,
      dueDate: new Date(taskDueDate).toISOString(),
      assigneeId: customer.ownerId,
      assigneeName: customer.ownerName,
      creatorId: customer.ownerId,
      creatorName: customer.ownerName,
      relatedToType: 'customer',
      relatedToId: customer.id,
      relatedToName: customer.name,
      tags: ['Account Task'],
    });

    showSuccess('Task added to account');
    setTaskTitle('');
    setIsAddTaskModalOpen(false);
  };

  const tabsConfig = [
    { id: 'health', label: '360 Health & Metrics' },
    { id: 'deals', label: 'Deals & Opportunities', count: customerDeals.length },
    { id: 'tasks', label: 'Tasks & Checklist', count: customerTasks.length },
    { id: 'notes', label: 'Smart Notes', count: customerNotes.length },
    { id: 'activity', label: 'Activity Timeline', count: customerActivities.length },
    { id: 'company', label: 'Company & Billing Info' },
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/customers"
            className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Customer 360
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xs text-slate-500">{customer.id}</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {customer.name}
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/customers/${customer.id}/edit`)}
            leftIcon={<Edit className="w-3.5 h-3.5" />}
          >
            Edit Account
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddDealModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            New Deal
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={() => setIsDeleteDialogOpen(true)}
            leftIcon={<Trash2 className="w-3.5 h-3.5" />}
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Hero 360 Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <Avatar name={customer.name} size="xl" />
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {customer.name}
                </h2>
                <Badge variant={customer.tier === 'Enterprise' ? 'purple' : 'primary'} size="sm">
                  {customer.tier}
                </Badge>
                <Badge
                  variant={customer.status === 'active' ? 'success' : customer.status === 'churn_risk' ? 'danger' : 'info'}
                  size="sm"
                  dot
                >
                  {customer.status.toUpperCase()}
                </Badge>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
                {customer.industry} • <strong className="text-slate-900 dark:text-slate-100">{customer.companySize} employees</strong>
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-500 dark:text-slate-400">
                <a href={`mailto:${customer.email}`} className="flex items-center gap-1.5 hover:text-forest-800 dark:hover:text-peach-400">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{customer.email}</span>
                </a>
                <a href={`tel:${customer.phone}`} className="flex items-center gap-1.5 hover:text-forest-800 dark:hover:text-peach-400">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{customer.phone}</span>
                </a>
                {customer.website && (
                  <a href={customer.website} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-forest-800 dark:hover:text-peach-400">
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                    <span>{customer.website.replace('https://', '')}</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Pillars */}
          <div className="flex items-center gap-4 sm:gap-8 border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800 pt-4 lg:pt-0 lg:pl-8">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Lifetime Value
              </span>
              <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">
                {formatCurrency(customer.lifetimeValue)}
              </p>
              <span className="text-[11px] text-slate-500">Total pipeline: {formatCurrency(totalDealsValue)}</span>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Health Score
              </span>
              <div className="flex items-baseline gap-1">
                <span
                  className={`text-2xl font-black ${
                    customer.healthScore >= 80 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500'
                  }`}
                >
                  {customer.healthScore}%
                </span>
              </div>
              <span className="text-[11px] text-slate-500">
                Relationship: {customer.relationshipScore}/100
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl">
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" variant="secondary" onClick={() => setIsAddDealModalOpen(true)} leftIcon={<Briefcase className="w-3.5 h-3.5" />}>
            Create Deal
          </Button>
          <Button size="sm" variant="secondary" onClick={() => setIsLogCallModalOpen(true)} leftIcon={<PhoneCall className="w-3.5 h-3.5" />}>
            Log Call
          </Button>
          <Button size="sm" variant="secondary" onClick={() => setIsAddNoteModalOpen(true)} leftIcon={<FileText className="w-3.5 h-3.5" />}>
            Add Note
          </Button>
          <Button size="sm" variant="secondary" onClick={() => setIsAddTaskModalOpen(true)} leftIcon={<Plus className="w-3.5 h-3.5" />}>
            Create Task
          </Button>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Account Executive:</span>
          <Avatar src={customer.ownerAvatar} name={customer.ownerName} size="xs" />
          <span className="font-semibold text-slate-700 dark:text-slate-300">{customer.ownerName}</span>
        </div>
      </div>

      {/* Subview Tabs */}
      <Tabs tabs={tabsConfig} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab Panels */}
      {/* 360 Health Metrics */}
      {activeTab === 'health' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Account Health Index
            </h4>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">{customer.healthScore}%</span>
              <Badge variant={customer.healthScore >= 80 ? 'success' : 'warning'}>
                {customer.healthScore >= 80 ? 'High Retention' : 'Attention Needed'}
              </Badge>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full ${customer.healthScore >= 80 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                style={{ width: `${customer.healthScore}%` }}
              />
            </div>
            <p className="text-xs text-slate-500">Based on usage telemetry, support tickets, and executive QBR frequency.</p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Relationship Index
            </h4>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">{customer.relationshipScore}%</span>
              <Badge variant="primary">Executive Sponsor Strong</Badge>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-forest-800"
                style={{ width: `${customer.relationshipScore}%` }}
              />
            </div>
            <p className="text-xs text-slate-500">Reflects CS alignment, monthly touchpoints, and contract renewal timeline.</p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Account Open Pipeline
            </h4>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {formatCurrency(totalDealsValue)}
              </span>
              <Badge variant="purple">{customerDeals.length} deals active</Badge>
            </div>
            <p className="text-xs text-slate-500 pt-2">Expansion and add-on module opportunities currently in flight.</p>
          </div>
        </div>
      )}

      {/* Associated Deals */}
      {activeTab === 'deals' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Associated Deals ({customerDeals.length})
            </h3>
            <Button size="sm" variant="primary" onClick={() => setIsAddDealModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
              Create Deal
            </Button>
          </div>

          {customerDeals.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl text-xs text-slate-400">
              No deals currently associated with this customer.
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden">
              {customerDeals.map((deal) => (
                <div
                  key={deal.id}
                  onClick={() => navigate(`/deals/${deal.id}`)}
                  className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                >
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{deal.title}</h4>
                    <span className="text-[10px] text-slate-400">Close Date: {deal.expectedCloseDate}</span>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {formatCurrency(deal.amount)}
                      </p>
                      <span className="text-[10px] text-slate-400">{deal.probability}% win probability</span>
                    </div>
                    <Badge variant={deal.stage === 'won' ? 'success' : 'primary'} size="sm">
                      {deal.stage.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Customer Tasks */}
      {activeTab === 'tasks' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Account Tasks ({customerTasks.length})
            </h3>
            <Button size="sm" variant="primary" onClick={() => setIsAddTaskModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
              Create Task
            </Button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden">
            {customerTasks.map((t) => (
              <div key={t.id} className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={t.status === 'completed'}
                    onChange={() => toggleTaskComplete(t.id)}
                    className="rounded border-slate-300 text-forest-800 focus:ring-peach-500 w-4 h-4 cursor-pointer"
                  />
                  <div>
                    <p className={`text-xs font-semibold ${t.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
                      {t.title}
                    </p>
                    <span className="text-[10px] text-slate-400">Due: {new Date(t.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <Badge variant={t.priority === 'urgent' ? 'danger' : 'primary'} size="sm">
                  {t.priority}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Smart Notes */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Account Notes ({customerNotes.length})
            </h3>
            <Button size="sm" variant="primary" onClick={() => setIsAddNoteModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
              Add Note
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {customerNotes.map((n) => (
              <div
                key={n.id}
                className={`p-4 rounded-2xl border bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between ${
                  n.isPinned ? 'border-amber-400/80 ring-1 ring-amber-400/30' : 'border-slate-200/80 dark:border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{n.title || 'Account Note'}</h4>
                    <button onClick={() => togglePinNote(n.id)} className={n.isPinned ? 'text-amber-500' : 'text-slate-400'}>
                      <Pin className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{n.content}</p>
                </div>
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400">
                  <span>{formatDate(n.createdAt, 'medium')}</span>
                  <button onClick={() => deleteNote(n.id)} className="hover:text-rose-500">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Activity Timeline */}
      {activeTab === 'activity' && (
        <div className="space-y-3">
          {customerActivities.map((act) => (
            <div key={act.id} className="p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-peach-100 dark:bg-forest-900/60 border border-peach-200 dark:border-forest-900 flex items-center justify-center text-forest-800 dark:text-peach-400 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{act.title}</p>
                  <span className="text-[10px] text-slate-400">{formatDate(act.timestamp, 'long')}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{act.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Company & Billing Info */}
      {activeTab === 'company' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-forest-700" />
              <span>Headquarters Address</span>
            </h4>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {customer.address?.street || '450 Mission Street, Suite 1800'}<br />
              {customer.address?.city || 'San Francisco'}, {customer.address?.state || 'CA'} {customer.address?.postalCode || '94105'}<br />
              {customer.address?.country || 'United States'}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-forest-700" />
              <span>Billing Contact</span>
            </h4>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Name: <strong>{customer.billingContact?.name || 'Victoria Vance'}</strong><br />
              Email: {customer.billingContact?.email || customer.email}<br />
              Phone: {customer.billingContact?.phone || customer.phone}
            </p>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => {
          deleteCustomer(customer.id);
          showSuccess(`Customer account "${customer.name}" deleted`);
          navigate('/customers');
        }}
        title="Delete Customer Account"
        message={`Are you sure you want to delete "${customer.name}"? This action cannot be undone.`}
        confirmLabel="Delete Account"
        variant="danger"
      />

      {/* Create Deal Modal */}
      <Modal isOpen={isAddDealModalOpen} onClose={() => setIsAddDealModalOpen(false)} title={`Create Deal for ${customer.name}`}>
        <form onSubmit={handleCreateDeal} className="space-y-4">
          <Input
            label="Deal Title *"
            required
            value={dealTitle}
            onChange={(e) => setDealTitle(e.target.value)}
            placeholder="e.g. Q4 Platform Expansion"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Amount ($)"
              type="number"
              required
              value={dealAmount}
              onChange={(e) => setDealAmount(Number(e.target.value))}
            />
            <Select
              label="Stage"
              value={dealStage}
              onChange={(e) => setDealStage(e.target.value as any)}
              options={[
                { value: 'new', label: 'Discovery / New' },
                { value: 'qualified', label: 'Qualified' },
                { value: 'proposal', label: 'Proposal Sent' },
                { value: 'negotiation', label: 'Negotiation' },
                { value: 'won', label: 'Closed Won' },
              ]}
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsAddDealModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create Deal
            </Button>
          </div>
        </form>
      </Modal>

      {/* Add Note Modal */}
      <Modal isOpen={isAddNoteModalOpen} onClose={() => setIsAddNoteModalOpen(false)} title="Add Note to Account">
        <form onSubmit={handleAddNote} className="space-y-4">
          <Input label="Subject" value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} placeholder="e.g. Executive Sync" />
          <textarea
            required
            rows={4}
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Enter note..."
            className="block w-full rounded-xl text-sm bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 p-3 focus:outline-none focus:ring-2 focus:ring-peach-500"
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsAddNoteModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Save Note</Button>
          </div>
        </form>
      </Modal>

      {/* Log Call Modal */}
      <Modal isOpen={isLogCallModalOpen} onClose={() => setIsLogCallModalOpen(false)} title="Log Customer Call">
        <form onSubmit={handleLogCall} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Outcome"
              value={callOutcome}
              onChange={(e) => setCallOutcome(e.target.value as any)}
              options={[
                { value: 'connected_positive', label: 'Connected (Positive)' },
                { value: 'connected_neutral', label: 'Connected (Neutral)' },
                { value: 'left_voicemail', label: 'Left Voicemail' },
                { value: 'follow_up_scheduled', label: 'Follow-up Scheduled' },
              ]}
            />
            <Input label="Duration (s)" type="number" value={callDuration} onChange={(e) => setCallDuration(Number(e.target.value))} />
          </div>
          <Input label="Call Notes" value={callNotes} onChange={(e) => setCallNotes(e.target.value)} placeholder="Key takeaways..." />
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsLogCallModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Log Call</Button>
          </div>
        </form>
      </Modal>

      {/* Add Task Modal */}
      <Modal isOpen={isAddTaskModalOpen} onClose={() => setIsAddTaskModalOpen(false)} title="Create Customer Task">
        <form onSubmit={handleAddTask} className="space-y-4">
          <Input label="Task Title *" required value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} placeholder="e.g. Schedule Q4 Executive QBR" />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Priority"
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value as any)}
              options={[
                { value: 'urgent', label: 'Urgent' },
                { value: 'high', label: 'High' },
                { value: 'medium', label: 'Medium' },
                { value: 'low', label: 'Low' },
              ]}
            />
            <Input label="Due Date" type="date" required value={taskDueDate} onChange={(e) => setTaskDueDate(e.target.value)} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsAddTaskModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Create Task</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
