import { describe, it, expect, beforeEach } from 'vitest';
import { useActivityStore } from '../../store/useActivityStore';
import { storage } from '../../utils/storage';
import { STORAGE_KEYS } from '../../services/local/db';

describe('useActivityStore', () => {
  beforeEach(() => {
    storage.setItem(STORAGE_KEYS.ACTIVITIES, []);
    storage.setItem(STORAGE_KEYS.CALLS, []);
    useActivityStore.setState({
      activities: [],
      calls: [],
      meetings: [],
      notes: [],
      activityFilter: 'all',
    });
  });

  it('logs call activities and updates calls list', () => {
    const call = useActivityStore.getState().addCall({
      contactName: 'Austin Rivers',
      contactType: 'lead',
      contactId: 'lead_1',
      phoneNumber: '+1-555-0199',
      date: new Date().toISOString(),
      durationSeconds: 300,
      outcome: 'connected_positive',
      notes: 'Customer requested 50 additional user seats.',
      ownerId: 'user_1',
      ownerName: 'Sarah Jenkins',
    });

    expect(call.id).toBeDefined();
    expect(useActivityStore.getState().calls.length).toBe(1);

    useActivityStore.getState().setActivityFilter('call');
    expect(useActivityStore.getState().activityFilter).toBe('call');
  });
});
