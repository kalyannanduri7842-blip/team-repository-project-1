import React, { useState, useMemo } from 'react';
import {
  CheckSquare,
  Plus,
  Trash2,
  Edit,
  Calendar,
  Clock,
  Filter,
  Search,
  Download,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import {
  useTaskStore,
  useLeadStore,
  useCustomerStore,
  useDealStore,
  useAuthStore,
  useNotificationStore,
} from '../../store';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Task, TaskStatus, TaskPriority } from '../../types';
import { formatDate } from '../../utils/formatters';
import { mockUsers } from '../../data/mock/mockUsers';

export const TasksPage: React.FC = () => {
  const { tasks, addTask, updateTask, toggleTaskComplete, deleteTask, exportTasksCSV, filters, setFilters, resetFilters } = useTaskStore();
  const leads = useLeadStore((s) => s.leads);
  const customers = useCustomerStore((s) => s.customers);
  const deals = useDealStore((s) => s.deals);
  const user = useAuthStore((s) => s.user);
  const showSuccess = useNotificationStore((s) => s.showSuccess);

  const [search, setSearch] = useState('');
  const [activeStatusTab, setActiveStatusTab] = useState<TaskStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'all'>('all');

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteTaskItem, setDeleteTaskItem] = useState<Task | null>(null);

  // Form states
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskPriority, setTaskPriority] = useState<TaskPriority>('high');
  const [taskDueDate, setTaskDueDate] = useState(
    new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0]
  );
  const [taskAssigneeId, setTaskAssigneeId] = useState(user?.id || 'usr_sales');
  const [relatedType, setRelatedType] = useState<'none' | 'lead' | 'customer' | 'deal'>('none');
  const [relatedId, setRelatedId] = useState('');

  const filteredTasks = useMemo(() => {
    let list = [...tasks];
    if (activeStatusTab !== 'all') {
      list = list.filter((t) => t.status === activeStatusTab);
    }
    if (priorityFilter !== 'all') {
      list = list.filter((t) => t.priority === priorityFilter);
    }
    if (search) {
      const q = search.toLowerCase();
      return list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          (t.relatedToName && t.relatedToName.toLowerCase().includes(q)) ||
          t.assigneeName.toLowerCase().includes(q)
      );
    }
    return list;
  }, [tasks, activeStatusTab, priorityFilter, search]);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle) return;

    const assignee = mockUsers.find((u) => u.id === taskAssigneeId) || user || mockUsers[0];
    let relName = undefined;
    if (relatedType === 'lead') {
      relName = leads.find((l) => l.id === relatedId)?.fullName;
    } else if (relatedType === 'customer') {
      relName = customers.find((c) => c.id === relatedId)?.name;
    } else if (relatedType === 'deal') {
      relName = deals.find((d) => d.id === relatedId)?.title;
    }

    addTask({
      title: taskTitle,
      description: taskDesc || 'Follow-up task.',
      status: 'todo',
      priority: taskPriority,
      dueDate: new Date(taskDueDate).toISOString(),
      assigneeId: assignee.id,
      assigneeName: assignee.name,
      assigneeAvatar: assignee.avatar,
      creatorId: user?.id || 'usr_sales',
      creatorName: user?.name || 'Sarah Chen',
      relatedToType: relatedType === 'none' ? undefined : relatedType,
      relatedToId: relatedType === 'none' ? undefined : relatedId,
      relatedToName: relName,
      tags: ['Sales Follow-up'],
    });

    showSuccess(`Task "${taskTitle}" created successfully!`);
    setTaskTitle('');
    setTaskDesc('');
    setIsCreateModalOpen(false);
  };

  const handleUpdateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask || !taskTitle) return;

    updateTask(editingTask.id, {
      title: taskTitle,
      description: taskDesc,
      priority: taskPriority,
      dueDate: new Date(taskDueDate).toISOString(),
    });

    showSuccess('Task updated');
    setEditingTask(null);
  };

  const openEditModal = (t: Task) => {
    setEditingTask(t);
    setTaskTitle(t.title);
    setTaskDesc(t.description);
    setTaskPriority(t.priority);
    setTaskDueDate(t.dueDate.split('T')[0]);
  };

  const getPriorityBadge = (p: TaskPriority) => {
    switch (p) {
      case 'urgent':
        return <Badge variant="danger">Urgent</Badge>;
      case 'high':
        return <Badge variant="warning">High</Badge>;
      case 'medium':
        return <Badge variant="primary">Medium</Badge>;
      case 'low':
        return <Badge variant="neutral">Low</Badge>;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <CheckSquare className="w-6 h-6 text-forest-700" />
            <span>Tasks & Follow-up Manager</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Organize action items, track SLAs, assign follow-ups, and link tasks to leads, customers, and deals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={exportTasksCSV} leftIcon={<Download className="w-3.5 h-3.5" />}>
            Export CSV
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setTaskTitle('');
              setTaskDesc('');
              setIsCreateModalOpen(true);
            }}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Create Task
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-medium">
          {[
            { id: 'all', label: 'All Tasks' },
            { id: 'todo', label: 'To Do' },
            { id: 'in_progress', label: 'In Progress' },
            { id: 'completed', label: 'Completed' },
            { id: 'overdue', label: 'Overdue' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveStatusTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeStatusTab === tab.id
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs font-semibold'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Priority & Search */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as any)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-peach-500"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <Input
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
            className="w-48 sm:w-60"
          />
        </div>
      </div>

      {/* Task List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs divide-y divide-slate-100 dark:divide-slate-800/80">
        {filteredTasks.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">
            No tasks found matching your filter criteria.
          </div>
        ) : (
          filteredTasks.map((t) => {
            const isCompleted = t.status === 'completed';
            const isOverdue = t.status === 'overdue' || (!isCompleted && new Date(t.dueDate) < new Date());

            return (
              <div
                key={t.id}
                className={`p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 transition-colors ${
                  isCompleted ? 'bg-slate-50/50 dark:bg-slate-900/30 opacity-75' : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-start sm:items-center gap-4 min-w-0">
                  <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={() => {
                      toggleTaskComplete(t.id);
                      showSuccess(`Task marked as ${isCompleted ? 'pending' : 'completed'}`);
                    }}
                    className="mt-1 sm:mt-0 rounded border-slate-300 text-forest-800 focus:ring-peach-500 w-5 h-5 cursor-pointer"
                  />

                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3
                        className={`text-sm font-bold truncate ${
                          isCompleted
                            ? 'line-through text-slate-400 dark:text-slate-500'
                            : 'text-slate-900 dark:text-slate-100'
                        }`}
                      >
                        {t.title}
                      </h3>
                      {getPriorityBadge(t.priority)}
                      {isOverdue && !isCompleted && (
                        <Badge variant="danger" size="sm">
                          Overdue
                        </Badge>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                      {t.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        Due: <strong className="text-slate-600 dark:text-slate-300">{new Date(t.dueDate).toLocaleDateString()}</strong>
                      </span>
                      {t.relatedToName && (
                        <span className="text-forest-800 dark:text-peach-400 font-medium">
                          🔗 {t.relatedToName}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="hidden md:flex items-center gap-2">
                    <Avatar src={t.assigneeAvatar} name={t.assigneeName} size="xs" />
                    <span className="text-xs text-slate-600 dark:text-slate-300">{t.assigneeName}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(t)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                      title="Edit Task"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteTaskItem(t)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 transition-colors"
                      title="Delete Task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Create Task Modal */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Create New Task">
        <form onSubmit={handleCreateTask} className="space-y-4">
          <Input
            label="Task Title *"
            required
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="e.g. Schedule Executive QBR Review"
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
          <Select
            label="Assignee"
            value={taskAssigneeId}
            onChange={(e) => setTaskAssigneeId(e.target.value)}
            options={mockUsers.map((u) => ({ value: u.id, label: `${u.name} (${u.role})` }))}
          />
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Description
            </label>
            <textarea
              rows={3}
              value={taskDesc}
              onChange={(e) => setTaskDesc(e.target.value)}
              placeholder="Task instructions or deliverables..."
              className="block w-full rounded-xl text-sm bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 p-3 focus:outline-none focus:ring-2 focus:ring-peach-500"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create Task
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Task Modal */}
      <Modal isOpen={!!editingTask} onClose={() => setEditingTask(null)} title="Edit Task">
        <form onSubmit={handleUpdateTask} className="space-y-4">
          <Input
            label="Task Title *"
            required
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
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
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Description
            </label>
            <textarea
              rows={3}
              value={taskDesc}
              onChange={(e) => setTaskDesc(e.target.value)}
              className="block w-full rounded-xl text-sm bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 p-3 focus:outline-none focus:ring-2 focus:ring-peach-500"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setEditingTask(null)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteTaskItem}
        onClose={() => setDeleteTaskItem(null)}
        onConfirm={() => {
          if (deleteTaskItem) {
            deleteTask(deleteTaskItem.id);
            showSuccess('Task removed');
            setDeleteTaskItem(null);
          }
        }}
        title="Delete Task"
        message={`Are you sure you want to delete task "${deleteTaskItem?.title}"?`}
        confirmLabel="Delete Task"
        variant="danger"
      />
    </div>
  );
};
