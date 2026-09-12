import { create } from 'zustand';
import { Task, TaskStatus, TaskPriority, SortOption } from '../types';
import { taskRepository, activityRepository } from '../services/local';
import { exportToCSV } from '../utils/csv';

export interface TaskFilterOptions {
  search: string;
  status: TaskStatus | 'all';
  priority: TaskPriority | 'all';
  assigneeId: string | 'all';
}

interface TaskState {
  tasks: Task[];
  filters: TaskFilterOptions;
  sort: SortOption<keyof Task>;

  // Actions
  fetchTasks: () => void;
  getTaskById: (id: string) => Task | undefined;
  addTask: (data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Task;
  updateTask: (id: string, updates: Partial<Task>) => Task | null;
  toggleTaskComplete: (id: string) => void;
  deleteTask: (id: string) => boolean;
  bulkDeleteTasks: (ids: string[]) => void;
  setFilters: (filters: Partial<TaskFilterOptions>) => void;
  resetFilters: () => void;
  setSort: (field: keyof Task) => void;
  exportTasksCSV: () => void;
}

const defaultFilters: TaskFilterOptions = {
  search: '',
  status: 'all',
  priority: 'all',
  assigneeId: 'all',
};

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: taskRepository.getAll(),
  filters: defaultFilters,
  sort: { field: 'dueDate', direction: 'asc' },

  fetchTasks: () => {
    set({ tasks: taskRepository.getAll() });
  },

  getTaskById: (id) => {
    return get().tasks.find((t) => t.id === id);
  },

  addTask: (data) => {
    const newTask = taskRepository.create(data);

    activityRepository.logActivity({
      type: 'call',
      title: `Created Task: ${newTask.title}`,
      description: `Priority: ${newTask.priority.toUpperCase()} - Due: ${new Date(newTask.dueDate).toLocaleDateString()}`,
      entityType: 'task',
      entityId: newTask.id,
      entityName: newTask.title,
      performedById: newTask.creatorId,
      performedByName: newTask.creatorName,
    });

    set((state) => ({ tasks: [newTask, ...state.tasks] }));
    return newTask;
  },

  updateTask: (id, updates) => {
    const updated = taskRepository.update(id, updates);
    if (updated) {
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? updated : t)),
      }));
    }
    return updated;
  },

  toggleTaskComplete: (id) => {
    const task = get().getTaskById(id);
    if (!task) return;

    const newStatus: TaskStatus = task.status === 'completed' ? 'todo' : 'completed';
    const updated = taskRepository.updateStatus(id, newStatus);

    if (updated && newStatus === 'completed') {
      activityRepository.logActivity({
        type: 'task_completed',
        title: `Completed Task: ${task.title}`,
        description: `Task marked as completed by assignee.`,
        entityType: 'task',
        entityId: task.id,
        entityName: task.title,
        performedById: task.assigneeId,
        performedByName: task.assigneeName,
      });
    }

    if (updated) {
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? updated : t)),
      }));
    }
  },

  deleteTask: (id) => {
    const success = taskRepository.delete(id);
    if (success) {
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
      }));
    }
    return success;
  },

  bulkDeleteTasks: (ids) => {
    taskRepository.bulkDelete(ids);
    set((state) => ({
      tasks: state.tasks.filter((t) => !ids.includes(t.id)),
    }));
  },

  setFilters: (newFilters) => {
    set((state) => ({ filters: { ...state.filters, ...newFilters } }));
  },

  resetFilters: () => {
    set({ filters: defaultFilters });
  },

  setSort: (field) => {
    set((state) => {
      const isCurrent = state.sort.field === field;
      const direction = isCurrent && state.sort.direction === 'asc' ? 'desc' : 'asc';
      return { sort: { field, direction } };
    });
  },

  exportTasksCSV: () => {
    const tasks = get().tasks;
    exportToCSV(tasks, 'nexora_tasks_export', [
      { key: 'title', header: 'Task Title' },
      { key: 'status', header: 'Status' },
      { key: 'priority', header: 'Priority' },
      { key: 'dueDate', header: 'Due Date' },
      { key: 'assigneeName', header: 'Assignee' },
      { key: 'relatedToName', header: 'Related Record' },
      { key: 'createdAt', header: 'Created Date' },
    ]);
  },
}));
