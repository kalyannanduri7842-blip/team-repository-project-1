import { storage } from '../../utils/storage';
import {
  mockUsers,
  mockLeads,
  mockCustomers,
  mockDeals,
  mockCalls,
  mockMeetings,
  mockNotes,
  mockActivities,
  mockTasks,
  mockNotifications,
} from '../../data/mock';
import {
  User,
  Lead,
  Customer,
  Deal,
  CallLog,
  Meeting,
  Note,
  Activity,
  Task,
  AppNotification,
  UserPreferences,
} from '../../types';

export const STORAGE_KEYS = {
  VERSION: 'nexora_db_version',
  CURRENT_USER: 'nexora_current_user',
  USERS: 'nexora_users',
  LEADS: 'nexora_leads',
  CUSTOMERS: 'nexora_customers',
  DEALS: 'nexora_deals',
  CALLS: 'nexora_calls',
  MEETINGS: 'nexora_meetings',
  NOTES: 'nexora_notes',
  ACTIVITIES: 'nexora_activities',
  TASKS: 'nexora_tasks',
  NOTIFICATIONS: 'nexora_notifications',
  PREFERENCES: 'nexora_preferences',
  APPROVALS: 'nexora_approvals',
  FINANCIALS: 'nexora_financials',
  SUPPORT_TICKETS: 'nexora_support_tickets',
} as const;

export const DB_CURRENT_VERSION = '1.0.0';

export interface CRMSnapshot {
  version: string;
  exportedAt: string;
  users: User[];
  leads: Lead[];
  customers: Customer[];
  deals: Deal[];
  calls: CallLog[];
  meetings: Meeting[];
  notes: Note[];
  activities: Activity[];
  tasks: Task[];
  notifications: AppNotification[];
}

export const defaultPreferences: UserPreferences = {
  theme: 'dark',
  dateFormat: 'MM/DD/YYYY',
  timeFormat: '12h',
  currency: 'USD',
  defaultDashboardView: 'executive',
  itemsPerPage: 10,
  emailNotifications: {
    taskDue: true,
    dealAssigned: true,
    leadAssigned: true,
    meetingReminder: true,
    weeklyDigest: false,
  },
  inAppNotifications: {
    taskDue: true,
    dealAssigned: true,
    leadAssigned: true,
    meetingReminder: true,
    soundEnabled: true,
  },
};

/**
 * Initializes the local database if keys don't exist or version mismatches.
 */
export function initializeLocalDB(): void {
  const existingVersion = storage.getItem<string | null>(STORAGE_KEYS.VERSION, null);

  if (!existingVersion) {
    seedLocalDB();
  }
}

export function seedLocalDB(): void {
  storage.setItem(STORAGE_KEYS.VERSION, DB_CURRENT_VERSION);
  storage.setItem(STORAGE_KEYS.USERS, mockUsers);
  storage.setItem(STORAGE_KEYS.LEADS, mockLeads);
  storage.setItem(STORAGE_KEYS.CUSTOMERS, mockCustomers);
  storage.setItem(STORAGE_KEYS.DEALS, mockDeals);
  storage.setItem(STORAGE_KEYS.CALLS, mockCalls);
  storage.setItem(STORAGE_KEYS.MEETINGS, mockMeetings);
  storage.setItem(STORAGE_KEYS.NOTES, mockNotes);
  storage.setItem(STORAGE_KEYS.ACTIVITIES, mockActivities);
  storage.setItem(STORAGE_KEYS.TASKS, mockTasks);
  storage.setItem(STORAGE_KEYS.NOTIFICATIONS, mockNotifications);

  if (!storage.getItem(STORAGE_KEYS.PREFERENCES, null)) {
    storage.setItem(STORAGE_KEYS.PREFERENCES, defaultPreferences);
  }

  if (!storage.getItem(STORAGE_KEYS.CURRENT_USER, null)) {
    storage.setItem(STORAGE_KEYS.CURRENT_USER, mockUsers[0]); // Default admin
  }
}

export function resetLocalDB(): void {
  seedLocalDB();
}

export function createDatabaseSnapshot(): CRMSnapshot {
  return {
    version: DB_CURRENT_VERSION,
    exportedAt: new Date().toISOString(),
    users: storage.getItem<User[]>(STORAGE_KEYS.USERS, mockUsers),
    leads: storage.getItem<Lead[]>(STORAGE_KEYS.LEADS, mockLeads),
    customers: storage.getItem<Customer[]>(STORAGE_KEYS.CUSTOMERS, mockCustomers),
    deals: storage.getItem<Deal[]>(STORAGE_KEYS.DEALS, mockDeals),
    calls: storage.getItem<CallLog[]>(STORAGE_KEYS.CALLS, mockCalls),
    meetings: storage.getItem<Meeting[]>(STORAGE_KEYS.MEETINGS, mockMeetings),
    notes: storage.getItem<Note[]>(STORAGE_KEYS.NOTES, mockNotes),
    activities: storage.getItem<Activity[]>(STORAGE_KEYS.ACTIVITIES, mockActivities),
    tasks: storage.getItem<Task[]>(STORAGE_KEYS.TASKS, mockTasks),
    notifications: storage.getItem<AppNotification[]>(STORAGE_KEYS.NOTIFICATIONS, mockNotifications),
  };
}

export function restoreDatabaseSnapshot(snapshot: Partial<CRMSnapshot>): boolean {
  try {
    if (snapshot.users) storage.setItem(STORAGE_KEYS.USERS, snapshot.users);
    if (snapshot.leads) storage.setItem(STORAGE_KEYS.LEADS, snapshot.leads);
    if (snapshot.customers) storage.setItem(STORAGE_KEYS.CUSTOMERS, snapshot.customers);
    if (snapshot.deals) storage.setItem(STORAGE_KEYS.DEALS, snapshot.deals);
    if (snapshot.calls) storage.setItem(STORAGE_KEYS.CALLS, snapshot.calls);
    if (snapshot.meetings) storage.setItem(STORAGE_KEYS.MEETINGS, snapshot.meetings);
    if (snapshot.notes) storage.setItem(STORAGE_KEYS.NOTES, snapshot.notes);
    if (snapshot.activities) storage.setItem(STORAGE_KEYS.ACTIVITIES, snapshot.activities);
    if (snapshot.tasks) storage.setItem(STORAGE_KEYS.TASKS, snapshot.tasks);
    if (snapshot.notifications) storage.setItem(STORAGE_KEYS.NOTIFICATIONS, snapshot.notifications);
    return true;
  } catch (err) {
    console.error('Failed to restore snapshot:', err);
    return false;
  }
}

export const exportDatabaseSnapshot = createDatabaseSnapshot;
export const resetDatabaseToDefaults = resetLocalDB;

