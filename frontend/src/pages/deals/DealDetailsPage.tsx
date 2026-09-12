import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Briefcase,
  Building2,
  DollarSign,
  Calendar,
  CheckCircle,
  XCircle,
  Plus,
  PhoneCall,
  FileText,
  Clock,
  Pin,
  Trash2,
  Edit,
  Tag,
  Package,
  Layers,
  TrendingUp,
} from 'lucide-react';
import {
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
import { DealStage, DEAL_STAGES } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const DealDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getDealById, updateDealStage, deleteDeal } = useDealStore();
  const { activities, notes, addNote, togglePinNote, deleteNote } = useActivityStore();
  const { tasks, addTask, toggleTaskComplete } = useTaskStore();
  const showSuccess = useNotificationStore((s) => s.showSuccess);

  const deal = getDealById(id || '');

  const [activeTab, setActiveTab] = useState('products');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Notes & Tasks Modals
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDueDate, setTaskDueDate] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
  const [taskPriority, setTaskPriority] = useState<any>('high');

  if (!deal) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Deal Not Found</h2>
        <Button className="mt-4" onClick={() => navigate('/deals/kanban')}>
          Back to Kanban
        </Button>
      </div>
    );
  }

  const dealActivities = activities.filter((a) => a.entityId === deal.id || a.metadata?.dealId === deal.id);
  const dealNotes = notes.filter((n) => n.relatedToId === deal.id);
  const dealTasks = tasks.filter((t) => t.relatedToId === deal.id);

  const handleStageClick = (stageId: DealStage) => {
    updateDealStage(deal.id, stageId);
    showSuccess(`Deal moved to ${stageId.toUpperCase()}`);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent) return;

    addNote({
      title: noteTitle || undefined,
      content: noteContent,
      isPinned: false,
      relatedToType: 'deal',
      relatedToId: deal.id,
      relatedToName: deal.title,
      tags: ['Deal Note'],
      ownerId: deal.ownerId,
      ownerName: deal.ownerName,
    });

    showSuccess('Note added to deal');
    setNoteContent('');
    setNoteTitle('');
    setIsAddNoteModalOpen(false);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle) return;

    addTask({
      title: taskTitle,
      description: `Task for deal: ${deal.title}`,
      status: 'todo',
      priority: taskPriority,
      dueDate: new Date(taskDueDate).toISOString(),
      assigneeId: deal.ownerId,
      assigneeName: deal.ownerName,
      creatorId: deal.ownerId,
      creatorName: deal.ownerName,
      relatedToType: 'deal',
      relatedToId: deal.id,
      relatedToName: deal.title,
      tags: ['Deal Milestone'],
    });

    showSuccess('Task added to deal');
    setTaskTitle('');
    setIsAddTaskModalOpen(false);
  };

  const tabsConfig = [
    { id: 'products', label: 'Products & Line Items', count: deal.products?.length || 0 },
    { id: 'tasks', label: 'Milestones & Tasks', count: dealTasks.length },
    { id: 'notes', label: 'Smart Notes', count: dealNotes.length },
    { id: 'activity', label: 'Stage History & Activities', count: dealActivities.length },
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/deals/kanban"
            className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Deal Opportunity
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xs text-slate-500">{deal.id}</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {deal.title}
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/deals/${deal.id}/edit`)}
            leftIcon={<Edit className="w-3.5 h-3.5" />}
          >
            Edit Deal
          </Button>

          {deal.stage !== 'won' && (
            <Button
              variant="success"
              size="sm"
              onClick={() => handleStageClick('won')}
              leftIcon={<CheckCircle className="w-4 h-4" />}
            >
              Mark Won
            </Button>
          )}

          {deal.stage !== 'lost' && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleStageClick('lost')}
              leftIcon={<XCircle className="w-4 h-4" />}
            >
              Mark Lost
            </Button>
          )}

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

      {/* Interactive Stage Stepper */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-xs">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
          Pipeline Progression
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {DEAL_STAGES.map((s, idx) => {
            const isCurrent = deal.stage === s.id;
            return (
              <button
                key={s.id}
                onClick={() => handleStageClick(s.id)}
                className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                  isCurrent
                    ? 'border-peach-400 bg-peach-100/60 dark:bg-forest-900/40 ring-2 ring-indigo-500/20'
                    : 'border-slate-200/70 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-slate-400">0{idx + 1}</span>
                  {isCurrent && <span className="w-2 h-2 rounded-full bg-forest-800 animate-pulse" />}
                </div>
                <div>
                  <p className={`text-xs font-bold leading-tight ${isCurrent ? 'text-forest-800 dark:text-peach-400' : 'text-slate-800 dark:text-slate-200'}`}>
                    {s.label}
                  </p>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">{s.defaultProbability}% win prob</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hero Financial Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Account:</span>
              <Link
                to={`/customers/${deal.customerId}`}
                className="text-sm font-bold text-forest-800 hover:text-forest-900 dark:text-peach-400 flex items-center gap-1.5"
              >
                <Building2 className="w-4 h-4" />
                <span>{deal.customerName}</span>
              </Link>
            </div>

            <div className="flex items-center gap-4 pt-2 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Expected Close: <strong className="text-slate-800 dark:text-slate-200">{deal.expectedCloseDate}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Avatar src={deal.ownerAvatar} name={deal.ownerName} size="xs" />
                <span>AE: <strong className="text-slate-800 dark:text-slate-200">{deal.ownerName}</strong></span>
              </div>
            </div>
          </div>

          {/* Value Stats */}
          <div className="flex items-center gap-4 sm:gap-8 border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800 pt-4 lg:pt-0 lg:pl-8">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Total Deal Value
              </span>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
                {formatCurrency(deal.amount)}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Weighted Forecast ({deal.probability}%)
              </span>
              <p className="text-2xl sm:text-3xl font-black text-forest-800 dark:text-peach-400">
                {formatCurrency(deal.weightedValue)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Tabs */}
      <Tabs tabs={tabsConfig} activeTab={activeTab} onChange={setActiveTab} />

      {/* Subviews */}
      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Package className="w-4 h-4 text-forest-700" />
            <span>Products & Services Included</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-semibold">
                  <th className="py-2.5 px-3">Product Name</th>
                  <th className="py-2.5 px-3 text-center">Quantity</th>
                  <th className="py-2.5 px-3 text-right">Unit Price</th>
                  <th className="py-2.5 px-3 text-right">Total Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {(deal.products || []).map((prod) => (
                  <tr key={prod.id}>
                    <td className="py-3 px-3 font-semibold text-slate-800 dark:text-slate-200">{prod.name}</td>
                    <td className="py-3 px-3 text-center text-slate-600 dark:text-slate-400">{prod.quantity}</td>
                    <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-400">{formatCurrency(prod.unitPrice)}</td>
                    <td className="py-3 px-3 text-right font-bold text-slate-900 dark:text-slate-100">{formatCurrency(prod.totalPrice)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tasks Tab */}
      {activeTab === 'tasks' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Deal Milestones ({dealTasks.length})
            </h3>
            <Button size="sm" variant="primary" onClick={() => setIsAddTaskModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
              Add Milestone
            </Button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden">
            {dealTasks.map((t) => (
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

      {/* Notes Tab */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Deal Notes ({dealNotes.length})
            </h3>
            <Button size="sm" variant="primary" onClick={() => setIsAddNoteModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
              Add Note
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dealNotes.map((n) => (
              <div
                key={n.id}
                className={`p-4 rounded-2xl border bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between ${
                  n.isPinned ? 'border-amber-400/80 ring-1 ring-amber-400/30' : 'border-slate-200/80 dark:border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{n.title || 'Deal Note'}</h4>
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

      {/* Stage History */}
      {activeTab === 'activity' && (
        <div className="space-y-3">
          {dealActivities.map((act) => (
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

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => {
          deleteDeal(deal.id);
          showSuccess(`Deal "${deal.title}" deleted`);
          navigate('/deals/kanban');
        }}
        title="Delete Deal"
        message={`Are you sure you want to delete "${deal.title}"?`}
        confirmLabel="Delete Deal"
        variant="danger"
      />

      {/* Add Note Modal */}
      <Modal isOpen={isAddNoteModalOpen} onClose={() => setIsAddNoteModalOpen(false)} title="Add Deal Note">
        <form onSubmit={handleAddNote} className="space-y-4">
          <Input label="Subject" value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} placeholder="e.g. Closing timeline check" />
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

      {/* Add Task Modal */}
      <Modal isOpen={isAddTaskModalOpen} onClose={() => setIsAddTaskModalOpen(false)} title="Create Deal Task">
        <form onSubmit={handleAddTask} className="space-y-4">
          <Input label="Task Title *" required value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} placeholder="e.g. Review MSA Exhibit B" />
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
