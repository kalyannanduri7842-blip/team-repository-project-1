import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Users,
  Building,
  Mail,
  Phone,
  Globe,
  Briefcase,
  DollarSign,
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
  Share2,
} from 'lucide-react';
import {
  useLeadStore,
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
import { LeadConversionModal } from './LeadConversionModal';
import { formatCurrency, formatDate, formatDuration } from '../../utils/formatters';

export const LeadDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getLeadById, deleteLead } = useLeadStore();
  const { activities, calls, meetings, notes, addCall, addMeeting, addNote, togglePinNote, deleteNote } = useActivityStore();
  const { tasks, addTask, toggleTaskComplete } = useTaskStore();
  const showSuccess = useNotificationStore((s) => s.showSuccess);

  const lead = getLeadById(id || '');

  const [activeTab, setActiveTab] = useState('overview');
  const [isConversionModalOpen, setIsConversionModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Quick modals for Lead profile sub-entities
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [noteTitle, setNoteTitle] = useState('');

  const [isLogCallModalOpen, setIsLogCallModalOpen] = useState(false);
  const [callDuration, setCallDuration] = useState(300);
  const [callOutcome, setCallOutcome] = useState<any>('connected_positive');
  const [callNotes, setCallNotes] = useState('');

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDueDate, setTaskDueDate] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
  const [taskPriority, setTaskPriority] = useState<any>('high');

  if (!lead) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Lead Not Found</h2>
        <p className="text-xs text-slate-500 mt-1">The requested lead does not exist or has been deleted.</p>
        <Button className="mt-4" onClick={() => navigate('/leads')}>
          Back to Leads
        </Button>
      </div>
    );
  }

  // Filter activities related to this lead
  const leadActivities = activities.filter((a) => a.entityId === lead.id || a.metadata?.leadId === lead.id);
  const leadNotes = notes.filter((n) => n.relatedToId === lead.id);
  const leadCalls = calls.filter((c) => c.contactId === lead.id);
  const leadMeetings = meetings.filter((m) => m.relatedToId === lead.id);
  const leadTasks = tasks.filter((t) => t.relatedToId === lead.id);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent) return;

    addNote({
      title: noteTitle || undefined,
      content: noteContent,
      isPinned: false,
      relatedToType: 'lead',
      relatedToId: lead.id,
      relatedToName: lead.fullName,
      tags: ['Lead Note'],
      ownerId: lead.ownerId,
      ownerName: lead.ownerName,
    });

    showSuccess('Note saved successfully');
    setNoteContent('');
    setNoteTitle('');
    setIsAddNoteModalOpen(false);
  };

  const handleLogCall = (e: React.FormEvent) => {
    e.preventDefault();
    addCall({
      contactName: lead.fullName,
      contactType: 'lead',
      contactId: lead.id,
      phoneNumber: lead.phone,
      date: new Date().toISOString(),
      durationSeconds: Number(callDuration),
      outcome: callOutcome,
      notes: callNotes || 'Call logged from lead profile.',
      ownerId: lead.ownerId,
      ownerName: lead.ownerName,
    });

    showSuccess(`Call logged with ${lead.fullName}`);
    setCallNotes('');
    setIsLogCallModalOpen(false);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle) return;

    addTask({
      title: taskTitle,
      description: `Follow up task for lead: ${lead.fullName} (${lead.company})`,
      status: 'todo',
      priority: taskPriority,
      dueDate: new Date(taskDueDate).toISOString(),
      assigneeId: lead.ownerId,
      assigneeName: lead.ownerName,
      creatorId: lead.ownerId,
      creatorName: lead.ownerName,
      relatedToType: 'lead',
      relatedToId: lead.id,
      relatedToName: lead.fullName,
      tags: ['Lead Follow-up'],
    });

    showSuccess('Follow-up task created');
    setTaskTitle('');
    setIsAddTaskModalOpen(false);
  };

  const tabsConfig = [
    { id: 'overview', label: 'Timeline & Overview', count: leadActivities.length },
    { id: 'notes', label: 'Smart Notes', count: leadNotes.length },
    { id: 'tasks', label: 'Tasks & Follow-up', count: leadTasks.length },
    { id: 'calls', label: 'Logged Calls', count: leadCalls.length },
    { id: 'meetings', label: 'Meetings', count: leadMeetings.length },
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Back Navigation Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/leads"
            className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Lead Profile
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xs text-slate-500">{lead.id}</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {lead.fullName}
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/leads/${lead.id}/edit`)}
            leftIcon={<Edit className="w-3.5 h-3.5" />}
          >
            Edit Lead
          </Button>

          {lead.status !== 'converted' ? (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsConversionModalOpen(true)}
              leftIcon={<CheckCircle className="w-4 h-4" />}
            >
              Convert to Customer
            </Button>
          ) : (
            <Badge variant="purple" size="md">
              Converted Opportunity
            </Badge>
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

      {/* Hero 360 Header Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <Avatar name={lead.fullName} size="xl" />
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {lead.fullName}
                </h2>
                <Badge
                  variant={
                    lead.status === 'qualified'
                      ? 'success'
                      : lead.status === 'new'
                      ? 'primary'
                      : lead.status === 'converted'
                      ? 'purple'
                      : 'default'
                  }
                  size="sm"
                  dot
                >
                  {lead.status.toUpperCase()}
                </Badge>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
                {lead.jobTitle} at <strong className="text-slate-900 dark:text-slate-100">{lead.company}</strong>
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-500 dark:text-slate-400">
                <a
                  href={`mailto:${lead.email}`}
                  className="flex items-center gap-1.5 hover:text-forest-800 dark:hover:text-peach-400"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{lead.email}</span>
                </a>
                <a
                  href={`tel:${lead.phone}`}
                  className="flex items-center gap-1.5 hover:text-forest-800 dark:hover:text-peach-400"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{lead.phone}</span>
                </a>
                {lead.website && (
                  <a
                    href={lead.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 hover:text-forest-800 dark:hover:text-peach-400"
                  >
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                    <span>{lead.website.replace('https://', '')}</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Key Value & Score Pillars */}
          <div className="flex items-center gap-4 sm:gap-8 border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800 pt-4 lg:pt-0 lg:pl-8">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Estimated Value
              </span>
              <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">
                {formatCurrency(lead.estimatedValue)}
              </p>
              <span className="text-[11px] text-slate-500 capitalize">{lead.industry}</span>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Lead Score
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  {lead.score}
                </span>
                <span className="text-xs text-slate-400">/ 100</span>
              </div>
              <span className="text-[11px] text-slate-500">
                {lead.score >= 80 ? '🔥 Hot Lead' : 'Warm Prospect'}
              </span>
            </div>
          </div>
        </div>

        {/* Tags Bar */}
        {lead.tags && lead.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
            <Tag className="w-3.5 h-3.5 text-slate-400 mr-1" />
            {lead.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Quick Profile Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setIsLogCallModalOpen(true)}
            leftIcon={<PhoneCall className="w-3.5 h-3.5" />}
          >
            Log Call
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setIsAddNoteModalOpen(true)}
            leftIcon={<FileText className="w-3.5 h-3.5" />}
          >
            Add Note
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setIsAddTaskModalOpen(true)}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Create Task
          </Button>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Owner:</span>
          <Avatar src={lead.ownerAvatar} name={lead.ownerName} size="xs" />
          <span className="font-semibold text-slate-700 dark:text-slate-300">{lead.ownerName}</span>
        </div>
      </div>

      {/* Profile Subview Tabs */}
      <Tabs tabs={tabsConfig} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab Content Panels */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timeline Feed (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-forest-700" />
              <span>Chronological Activity Timeline</span>
            </h3>

            {leadActivities.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-8 text-center text-xs text-slate-400">
                No recent activities logged for this lead yet.
              </div>
            ) : (
              <div className="space-y-3">
                {leadActivities.map((act) => (
                  <div
                    key={act.id}
                    className="p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-xl bg-peach-100 dark:bg-forest-900/60 border border-peach-200 dark:border-forest-900 flex items-center justify-center text-forest-800 dark:text-peach-400 shrink-0 mt-0.5">
                      {act.type === 'call' && <PhoneCall className="w-4 h-4" />}
                      {act.type === 'note' && <FileText className="w-4 h-4" />}
                      {act.type === 'lead_converted' && <CheckCircle className="w-4 h-4" />}
                      {!['call', 'note', 'lead_converted'].includes(act.type) && <Clock className="w-4 h-4" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                          {act.title}
                        </p>
                        <span className="text-[10px] text-slate-400">
                          {formatDate(act.timestamp, 'long')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                        {act.description}
                      </p>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        Logged by {act.performedByName}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Lead Context Sidebar (1 col) */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4 text-xs">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-2">
                Lead Information
              </h4>

              <div className="space-y-2.5">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Company Size</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{lead.companySize} employees</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Acquisition Source</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 capitalize">
                    {lead.source.replace('_', ' ')}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Created Date</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {formatDate(lead.createdAt, 'long')}
                  </span>
                </div>
                {lead.notesSummary && (
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Discovery Summary</span>
                    <p className="text-slate-700 dark:text-slate-300 mt-0.5 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                      {lead.notesSummary}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Smart Notes Tab */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Smart Notes ({leadNotes.length})
            </h3>
            <Button size="sm" variant="primary" onClick={() => setIsAddNoteModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
              Add Note
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leadNotes.map((note) => (
              <div
                key={note.id}
                className={`p-4 rounded-2xl border bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between ${
                  note.isPinned ? 'border-amber-400/80 dark:border-amber-500/50 ring-1 ring-amber-400/30' : 'border-slate-200/80 dark:border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      {note.title || 'Quick Note'}
                    </h4>
                    <button
                      onClick={() => togglePinNote(note.id)}
                      className={`p-1 rounded-lg transition-colors ${
                        note.isPinned ? 'text-amber-500 hover:text-amber-600' : 'text-slate-400 hover:text-slate-600'
                      }`}
                      title={note.isPinned ? 'Unpin note' : 'Pin note'}
                    >
                      <Pin className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {note.content}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400">
                  <span>{formatDate(note.createdAt, 'medium')}</span>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-slate-400 hover:text-rose-500 transition-colors"
                    title="Delete Note"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tasks Tab */}
      {activeTab === 'tasks' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Tasks & Action Items ({leadTasks.length})
            </h3>
            <Button size="sm" variant="primary" onClick={() => setIsAddTaskModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
              Create Task
            </Button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800/80 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden">
            {leadTasks.map((t) => (
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

      {/* Calls Tab */}
      {activeTab === 'calls' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Call History ({leadCalls.length})
            </h3>
            <Button size="sm" variant="primary" onClick={() => setIsLogCallModalOpen(true)} leftIcon={<PhoneCall className="w-4 h-4" />}>
              Log Call
            </Button>
          </div>

          <div className="space-y-3">
            {leadCalls.map((c) => (
              <div key={c.id} className="p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {c.contactName} ({c.phoneNumber})
                      </span>
                      <Badge variant="success" size="sm">
                        {c.outcome.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{c.notes}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Duration: {formatDuration(c.durationSeconds)} • {formatDate(c.date, 'long')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Meetings Tab */}
      {activeTab === 'meetings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Scheduled Meetings ({leadMeetings.length})
            </h3>
          </div>

          <div className="space-y-3">
            {leadMeetings.map((m) => (
              <div key={m.id} className="p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{m.title}</h4>
                  <Badge variant="primary" size="sm">{m.meetingType}</Badge>
                </div>
                <p className="text-xs text-slate-500 mt-1">{m.description}</p>
                <div className="flex items-center gap-4 mt-2 text-[10px] text-slate-400">
                  <span>📅 {new Date(m.startDate).toLocaleString()}</span>
                  <span>📍 {m.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conversion Modal */}
      <LeadConversionModal
        lead={lead}
        isOpen={isConversionModalOpen}
        onClose={() => setIsConversionModalOpen(false)}
        onConverted={(custId) => navigate(`/customers/${custId}`)}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => {
          deleteLead(lead.id);
          showSuccess(`Lead "${lead.fullName}" deleted`);
          navigate('/leads');
        }}
        title="Delete Lead"
        message={`Are you sure you want to delete "${lead.fullName}" (${lead.company})? This record will be permanently deleted.`}
        confirmLabel="Delete Lead"
        variant="danger"
      />

      {/* Add Note Modal */}
      <Modal isOpen={isAddNoteModalOpen} onClose={() => setIsAddNoteModalOpen(false)} title="Add Note to Lead">
        <form onSubmit={handleAddNote} className="space-y-4">
          <Input
            label="Note Subject"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            placeholder="e.g. Budget confirmation call"
          />
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Note Content *
            </label>
            <textarea
              required
              rows={4}
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Enter details..."
              className="block w-full rounded-xl text-sm bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 p-3 focus:outline-none focus:ring-2 focus:ring-peach-500/20 focus:border-peach-400"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsAddNoteModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Note
            </Button>
          </div>
        </form>
      </Modal>

      {/* Log Call Modal */}
      <Modal isOpen={isLogCallModalOpen} onClose={() => setIsLogCallModalOpen(false)} title="Log Phone Call">
        <form onSubmit={handleLogCall} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Call Outcome"
              value={callOutcome}
              onChange={(e) => setCallOutcome(e.target.value as any)}
              options={[
                { value: 'connected_positive', label: 'Connected (Positive)' },
                { value: 'connected_neutral', label: 'Connected (Neutral)' },
                { value: 'left_voicemail', label: 'Left Voicemail' },
                { value: 'follow_up_scheduled', label: 'Follow-up Scheduled' },
              ]}
            />
            <Input
              label="Duration (seconds)"
              type="number"
              value={callDuration}
              onChange={(e) => setCallDuration(Number(e.target.value))}
            />
          </div>
          <Input
            label="Call Notes"
            value={callNotes}
            onChange={(e) => setCallNotes(e.target.value)}
            placeholder="Discussed requirements and SLA..."
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsLogCallModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Log Call
            </Button>
          </div>
        </form>
      </Modal>

      {/* Create Task Modal */}
      <Modal isOpen={isAddTaskModalOpen} onClose={() => setIsAddTaskModalOpen(false)} title="Create Lead Task">
        <form onSubmit={handleAddTask} className="space-y-4">
          <Input
            label="Task Title *"
            required
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="e.g. Deliver custom proposal"
          />
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
            <Input
              label="Due Date"
              type="date"
              required
              value={taskDueDate}
              onChange={(e) => setTaskDueDate(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsAddTaskModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create Task
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
