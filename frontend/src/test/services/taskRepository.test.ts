import { describe, it, expect, beforeEach } from 'vitest';
import { taskRepository } from '../../services/local/taskRepository';
import { STORAGE_KEYS } from '../../services/local/db';
import { storage } from '../../utils/storage';

describe('taskRepository', () => {
  beforeEach(() => {
    storage.setItem(STORAGE_KEYS.TASKS, []);
  });

  it('performs full CRUD lifecycle on tasks', () => {
    const newTask: any = {
      title: 'Prepare Board Deck for Q3 Pipeline Review',
      description: 'Summarize top 20 enterprise deals closing this quarter',
      dueDate: '2026-04-15',
      priority: 'high',
      status: 'todo',
      assigneeId: 'user_1',
      category: 'presentation',
    };

    const created = taskRepository.create(newTask);
    expect(created.id).toBeDefined();
    expect(created.title).toBe('Prepare Board Deck for Q3 Pipeline Review');

    const updated = taskRepository.toggleStatus(created.id);
    expect(updated?.status).toBe('completed');

    const deleted = taskRepository.delete(created.id);
    expect(deleted).toBe(true);
    expect(taskRepository.getById(created.id)).toBeNull();
  });

  it('filters tasks by completion status and assigned user', () => {
    taskRepository.create({
      title: 'Task 1',
      dueDate: '2026-05-01',
      priority: 'medium',
      status: 'completed',
      assigneeId: 'user_1',
    } as any);

    taskRepository.create({
      title: 'Task 2',
      dueDate: '2026-05-02',
      priority: 'urgent',
      status: 'todo',
      assigneeId: 'user_2',
    } as any);

    const pending = taskRepository.getPending();
    expect(pending.length).toBe(1);
    expect(pending[0].title).toBe('Task 2');

    const user1Tasks = taskRepository.getByUser('user_1');
    expect(user1Tasks.length).toBe(1);
    expect(user1Tasks[0].title).toBe('Task 1');
  });
});
