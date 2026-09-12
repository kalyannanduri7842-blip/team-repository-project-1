export type ThemeMode = 'light' | 'dark' | 'system';

export interface UserPreferences {
  theme: ThemeMode;
  dateFormat: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
  timeFormat: '12h' | '24h';
  currency: string;
  defaultDashboardView: 'executive' | 'sales' | 'pipeline';
  itemsPerPage: number;
  emailNotifications: {
    taskDue: boolean;
    dealAssigned: boolean;
    leadAssigned: boolean;
    meetingReminder: boolean;
    weeklyDigest: boolean;
  };
  inAppNotifications: {
    taskDue: boolean;
    dealAssigned: boolean;
    leadAssigned: boolean;
    meetingReminder: boolean;
    soundEnabled: boolean;
  };
}

export interface SystemConfig {
  companyName: string;
  defaultCurrency: string;
  fiscalYearStartMonth: number; // 1 = January
  leadScoreThresholds: {
    hot: number;
    warm: number;
    cold: number;
  };
}

export interface OrganizationProfile {
  name: string;
  website: string;
  currency: string;
  timezone: string;
  address: string;
  phone: string;
  supportEmail: string;
}
