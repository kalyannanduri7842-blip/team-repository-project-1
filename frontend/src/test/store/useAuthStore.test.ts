import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../../store/useAuthStore';
import { clearAllStorage } from '../../utils/storage';

describe('useAuthStore', () => {
  beforeEach(() => {
    clearAllStorage();
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      error: null,
    });
  });

  it('authenticates demo admin user successfully', async () => {
    const success = await useAuthStore.getState().login('admin@nexora.demo', 'demo1234');
    expect(success).toBe(true);

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.user?.email).toBe('admin@nexora.demo');
    expect(state.user?.role).toBe('admin');
  });

  it('authenticates demo sales rep user successfully', async () => {
    const success = await useAuthStore.getState().login('sales@nexora.demo', 'demo1234');
    expect(success).toBe(true);

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.user?.email).toBe('sales@nexora.demo');
    expect(state.user?.role).toBe('sales');
  });

  it('logs out and resets user session state', async () => {
    await useAuthStore.getState().login('admin@nexora.demo', 'demo1234');
    expect(useAuthStore.getState().isAuthenticated).toBe(true);

    useAuthStore.getState().logout();
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useAuthStore.getState().user).toBeNull();
  });
});
