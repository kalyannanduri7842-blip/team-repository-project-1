import { Task } from '../../types';
import { storage } from '../../utils/storage';
import { STORAGE_KEYS } from './db';
import { mockTasks } from '../../data/mock';

export const taskRepository = {
  getAll(): Task[] {
    return storage.getItem<Task[]>(STORAGE_KEYS.TASKS, mockTasks);
  },

  getById(id: string): Task | null {
    const tasks = this.getAll();
    return tasks.find((t) => t.id === id) || null;
  },

  getPending(): Task[] {
    const tasks = this.getAll();
    return tasks.filter((t) => t.status !== 'completed');
  },

  getByUser(userId: string): Task[] {
    const tasks = this.getAll();
    return tasks.filter((t) => t.assigneeId === userId);
  },

  create(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task {
    const tasks = this.getAll();
    const newTask: Task = {
      ...taskData,
      id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    tasks.unshift(newTask);
    storage.setItem(STORAGE_KEYS.TASKS, tasks);
    return newTask;
  },

  update(id: string, updates: Partial<Task>): Task | null {
    const tasks = this.getAll();
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return null;

    const updatedTask: Task = {
      ...tasks[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    tasks[index] = updatedTask;
    storage.setItem(STORAGE_KEYS.TASKS, tasks);
    return updatedTask;
  },

  updateStatus(id: string, status: Task['status']): Task | null {
    return this.update(id, { status });
  },

  toggleStatus(id: string): Task | null {
    const task = this.getById(id);
    if (!task) return null;
    const nextStatus: Task['status'] = task.status === 'completed' ? 'todo' : 'completed';
    return this.update(id, { status: nextStatus });
  },

  delete(id: string): boolean {
    const tasks = this.getAll();
    const filtered = tasks.filter((t) => t.id !== id);
    if (filtered.length === tasks.length) return false;
    storage.setItem(STORAGE_KEYS.TASKS, filtered);
    return true;
  },

  bulkDelete(ids: string[]): number {
    const tasks = this.getAll();
    const idSet = new Set(ids);
    const filtered = tasks.filter((t) => !idSet.has(t.id));
    const count = tasks.length - filtered.length;
    storage.setItem(STORAGE_KEYS.TASKS, filtered);
    return count;
  },
};
