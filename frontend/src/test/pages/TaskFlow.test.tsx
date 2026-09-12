import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { TasksPage } from '../../pages/tasks/TasksPage';
import { useTaskStore } from '../../store/useTaskStore';
import { storage } from '../../utils/storage';
import { STORAGE_KEYS } from '../../services/local/db';

describe('Task Flow Integration', () => {
  beforeEach(() => {
    storage.setItem(STORAGE_KEYS.TASKS, [
      {
        id: 'task_test_1',
        title: 'Review Legal Agreement for Q3 Renewal',
        dueDate: '2026-05-15',
        priority: 'high',
        status: 'pending',
        assignedTo: 'user_1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);
    useTaskStore.getState().fetchTasks();
  });

  it('renders task list with priorities and due dates', () => {
    render(
      <BrowserRouter>
        <TasksPage />
      </BrowserRouter>
    );

    expect(screen.getByText('Review Legal Agreement for Q3 Renewal')).toBeInTheDocument();
  });
});
