import { Activity, CallLog, Meeting, Note } from '../../types';
import { storage } from '../../utils/storage';
import { STORAGE_KEYS } from './db';
import { mockActivities, mockCalls, mockMeetings, mockNotes } from '../../data/mock';

export const activityRepository = {
  getAll(): Activity[] {
    return storage.getItem<Activity[]>(STORAGE_KEYS.ACTIVITIES, mockActivities);
  },

  getActivities(): Activity[] {
    return this.getAll();
  },

  getCalls(): CallLog[] {
    return storage.getItem<CallLog[]>(STORAGE_KEYS.CALLS, mockCalls);
  },

  getMeetings(): Meeting[] {
    return storage.getItem<Meeting[]>(STORAGE_KEYS.MEETINGS, mockMeetings);
  },

  getNotes(): Note[] {
    return storage.getItem<Note[]>(STORAGE_KEYS.NOTES, mockNotes);
  },

  getById(id: string): Activity | null {
    const activities = this.getAll();
    return activities.find((a) => a.id === id) || null;
  },

  getByEntity(entityType: Activity['entityType'], entityId: string): Activity[] {
    const activities = this.getAll();
    return activities.filter((a) => a.entityType === entityType && a.entityId === entityId);
  },

  getByType(type: Activity['type']): Activity[] {
    const activities = this.getAll();
    return activities.filter((a) => a.type === type);
  },

  create(activityData: Omit<Activity, 'id' | 'createdAt' | 'timestamp'> & { timestamp?: string }): Activity {
    const activities = this.getAll();
    const newActivity: Activity = {
      ...activityData,
      id: `act_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      timestamp: activityData.timestamp || new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    activities.unshift(newActivity);
    storage.setItem(STORAGE_KEYS.ACTIVITIES, activities);
    return newActivity;
  },

  logActivity(activityData: Omit<Activity, 'id' | 'createdAt' | 'timestamp'> & { timestamp?: string }): Activity {
    return this.create(activityData);
  },

  createCall(data: Omit<CallLog, 'id' | 'createdAt'>): CallLog {
    const calls = this.getCalls();
    const newCall: CallLog = {
      ...data,
      id: `call_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString(),
    };
    calls.unshift(newCall);
    storage.setItem(STORAGE_KEYS.CALLS, calls);
    return newCall;
  },

  deleteCall(id: string): boolean {
    const calls = this.getCalls();
    const filtered = calls.filter((c) => c.id !== id);
    if (filtered.length === calls.length) return false;
    storage.setItem(STORAGE_KEYS.CALLS, filtered);
    return true;
  },

  createMeeting(data: Omit<Meeting, 'id' | 'createdAt'>): Meeting {
    const meetings = this.getMeetings();
    const newMeeting: Meeting = {
      ...data,
      id: `meet_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString(),
    };
    meetings.unshift(newMeeting);
    storage.setItem(STORAGE_KEYS.MEETINGS, meetings);
    return newMeeting;
  },

  updateMeeting(id: string, updates: Partial<Meeting>): Meeting | null {
    const meetings = this.getMeetings();
    const index = meetings.findIndex((m) => m.id === id);
    if (index === -1) return null;

    meetings[index] = { ...meetings[index], ...updates };
    storage.setItem(STORAGE_KEYS.MEETINGS, meetings);
    return meetings[index];
  },

  deleteMeeting(id: string): boolean {
    const meetings = this.getMeetings();
    const filtered = meetings.filter((m) => m.id !== id);
    if (filtered.length === meetings.length) return false;
    storage.setItem(STORAGE_KEYS.MEETINGS, filtered);
    return true;
  },

  createNote(data: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Note {
    const notes = this.getNotes();
    const newNote: Note = {
      ...data,
      id: `note_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    notes.unshift(newNote);
    storage.setItem(STORAGE_KEYS.NOTES, notes);
    return newNote;
  },

  updateNote(id: string, updates: Partial<Note>): Note | null {
    const notes = this.getNotes();
    const index = notes.findIndex((n) => n.id === id);
    if (index === -1) return null;

    notes[index] = { ...notes[index], ...updates, updatedAt: new Date().toISOString() };
    storage.setItem(STORAGE_KEYS.NOTES, notes);
    return notes[index];
  },

  deleteNote(id: string): boolean {
    const notes = this.getNotes();
    const filtered = notes.filter((n) => n.id !== id);
    if (filtered.length === notes.length) return false;
    storage.setItem(STORAGE_KEYS.NOTES, filtered);
    return true;
  },

  delete(id: string): boolean {
    const activities = this.getAll();
    const filtered = activities.filter((a) => a.id !== id);
    if (filtered.length === activities.length) return false;
    storage.setItem(STORAGE_KEYS.ACTIVITIES, filtered);
    return true;
  },
};
