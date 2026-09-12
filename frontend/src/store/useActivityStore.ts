import { create } from 'zustand';
import { Activity, CallLog, Meeting, Note } from '../types';
import { activityRepository } from '../services/local';

interface ActivityState {
  activities: Activity[];
  calls: CallLog[];
  meetings: Meeting[];
  notes: Note[];
  activityFilter: string; // 'all' | 'call' | 'meeting' | 'note' | etc.

  // Actions
  fetchActivities: () => void;
  setActivityFilter: (filter: string) => void;

  // Calls
  addCall: (data: Omit<CallLog, 'id' | 'createdAt'>) => CallLog;
  deleteCall: (id: string) => void;

  // Meetings
  addMeeting: (data: Omit<Meeting, 'id' | 'createdAt'>) => Meeting;
  updateMeeting: (id: string, updates: Partial<Meeting>) => void;
  deleteMeeting: (id: string) => void;

  // Notes
  addNote: (data: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => Note;
  updateNote: (id: string, updates: Partial<Note>) => void;
  togglePinNote: (id: string) => void;
  deleteNote: (id: string) => void;
}

export const useActivityStore = create<ActivityState>((set, get) => ({
  activities: activityRepository.getActivities(),
  calls: activityRepository.getCalls(),
  meetings: activityRepository.getMeetings(),
  notes: activityRepository.getNotes(),
  activityFilter: 'all',

  fetchActivities: () => {
    set({
      activities: activityRepository.getActivities(),
      calls: activityRepository.getCalls(),
      meetings: activityRepository.getMeetings(),
      notes: activityRepository.getNotes(),
    });
  },

  setActivityFilter: (filter) => set({ activityFilter: filter }),

  addCall: (data) => {
    const call = activityRepository.createCall(data);
    set({
      calls: activityRepository.getCalls(),
      activities: activityRepository.getActivities(),
    });
    return call;
  },

  deleteCall: (id) => {
    activityRepository.deleteCall(id);
    set({ calls: activityRepository.getCalls() });
  },

  addMeeting: (data) => {
    const meeting = activityRepository.createMeeting(data);
    set({
      meetings: activityRepository.getMeetings(),
      activities: activityRepository.getActivities(),
    });
    return meeting;
  },

  updateMeeting: (id, updates) => {
    activityRepository.updateMeeting(id, updates);
    set({ meetings: activityRepository.getMeetings() });
  },

  deleteMeeting: (id) => {
    activityRepository.deleteMeeting(id);
    set({ meetings: activityRepository.getMeetings() });
  },

  addNote: (data) => {
    const note = activityRepository.createNote(data);
    set({
      notes: activityRepository.getNotes(),
      activities: activityRepository.getActivities(),
    });
    return note;
  },

  updateNote: (id, updates) => {
    activityRepository.updateNote(id, updates);
    set({ notes: activityRepository.getNotes() });
  },

  togglePinNote: (id) => {
    const note = get().notes.find((n) => n.id === id);
    if (!note) return;
    activityRepository.updateNote(id, { isPinned: !note.isPinned });
    set({ notes: activityRepository.getNotes() });
  },

  deleteNote: (id) => {
    activityRepository.deleteNote(id);
    set({ notes: activityRepository.getNotes() });
  },
}));
