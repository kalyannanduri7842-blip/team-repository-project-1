import { describe, it, expect, beforeEach } from 'vitest';
import { useTaskStore } from '../../store/useTaskStore';
import { storage } from '../../utils/storage';
import { STORAGE_KEYS } from '../../services/local/db';

describe('useTaskStore', () => {
  beforeEach(() => {
    storage.setItem(STORAGE_KEYS.TASKS, []);
    useTaskStore.setState({
      tasks: [],
      filters: {
        search: '',
        status: 'all',
        priority: 'all',
        assigneeId: 'all',
      },
    });
  });

  it('manages task lifecycle and completion toggle', () => {
    const task = useTaskStore.getState().addTask({
      title: 'Conduct Q2 Quarterly Business Review',
      description: 'Review Q2 pipeline and revenue targets.',
      dueDate: '2026-05-20',
      priority: 'urgent',
      status: 'todo',
      assigneeId: 'user_1',
      assigneeName: 'Sarah Jenkins',
      creatorId: 'user_1',
      creatorName: 'Sarah Jenkins',
      tags: ['QBR'],
    });

    expect(task.id).toBeDefined();
    expect(useTaskStore.getState().tasks.length).toBe(1);

    useTaskStore.getState().toggleTaskComplete(task.id);
    expect(useTaskStore.getState().tasks[0].status).toBe('completed');

    useTaskStore.getState().deleteTask(task.id);
    expect(useTaskStore.getState().tasks.length).toBe(0);
  });
});
