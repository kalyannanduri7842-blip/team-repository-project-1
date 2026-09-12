import { describe, it, expect, beforeEach } from 'vitest';
import { activityRepository } from '../../services/local/activityRepository';
import { STORAGE_KEYS } from '../../services/local/db';
import { storage } from '../../utils/storage';
import { Activity } from '../../types';

describe('activityRepository', () => {
  beforeEach(() => {
    storage.setItem(STORAGE_KEYS.ACTIVITIES, []);
  });

  it('logs activities and retrieves chronologically', () => {
    const act: Omit<Activity, 'id' | 'createdAt'> = {
      type: 'call',
      title: 'Initial Discovery Call',
      description: 'Discussed cloud migration timelines with VP of Engineering.',
      performedById: 'user_1',
      performedByName: 'Sarah Jenkins',
      entityType: 'lead',
      entityId: 'lead_1',
      entityName: 'Austin Rivers',
      timestamp: new Date().toISOString(),
      metadata: { callDuration: 1800, outcome: 'Connected' },
    };

    const created = activityRepository.create(act);
    expect(created.id).toBeDefined();
    expect(created.title).toBe('Initial Discovery Call');

    const entityActivities = activityRepository.getByEntity('lead', 'lead_1');
    expect(entityActivities.length).toBe(1);
    expect(entityActivities[0].id).toBe(created.id);
  });

  it('filters activities by type (call, meeting, note, email)', () => {
    activityRepository.create({
      type: 'meeting',
      title: 'Architecture Review',
      description: 'Demoed multi-region deployment setup.',
      performedById: 'user_1',
      performedByName: 'Sarah Jenkins',
      entityType: 'customer',
      entityId: 'cust_1',
      entityName: 'CloudMatrix Inc',
      timestamp: new Date().toISOString(),
    });

    activityRepository.create({
      type: 'note',
      title: 'Internal Account Note',
      description: 'Budget approved by CFO.',
      performedById: 'user_1',
      performedByName: 'Sarah Jenkins',
      entityType: 'customer',
      entityId: 'cust_1',
      entityName: 'CloudMatrix Inc',
      timestamp: new Date().toISOString(),
    });

    const meetings = activityRepository.getByType('meeting');
    expect(meetings.length).toBe(1);
    expect(meetings[0].title).toBe('Architecture Review');

    const notes = activityRepository.getByType('note');
    expect(notes.length).toBe(1);
    expect(notes[0].title).toBe('Internal Account Note');
  });
});
