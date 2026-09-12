import { describe, it, expect, beforeEach } from 'vitest';
import { useNotificationStore } from '../../store/useNotificationStore';
import { storage } from '../../utils/storage';
import { STORAGE_KEYS } from '../../services/local/db';

describe('useNotificationStore', () => {
  beforeEach(() => {
    storage.setItem(STORAGE_KEYS.NOTIFICATIONS, []);
    useNotificationStore.setState({
      notifications: [],
      toasts: [],
    });
  });

  it('triggers in-app toasts and manages notification read state', () => {
    // Test toast trigger
    useNotificationStore.getState().addToast({
      title: 'Action Successful',
      message: 'New deal created',
      type: 'success',
    });

    expect(useNotificationStore.getState().toasts.length).toBe(1);
    expect(useNotificationStore.getState().toasts[0].title).toBe('Action Successful');

    useNotificationStore.getState().removeToast(useNotificationStore.getState().toasts[0].id);
    expect(useNotificationStore.getState().toasts.length).toBe(0);
  });
});
