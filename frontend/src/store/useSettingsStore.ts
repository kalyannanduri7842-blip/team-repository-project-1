import { create } from 'zustand';
import { UserPreferences, ThemeMode, OrganizationProfile } from '../types';
import { storage } from '../utils/storage';
import { STORAGE_KEYS, defaultPreferences, resetLocalDB } from '../services/local/db';

export interface SettingsState {
  preferences: UserPreferences;
  orgProfile: OrganizationProfile;

  // Actions
  setTheme: (theme: ThemeMode) => void;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  updateOrgProfile: (updates: Partial<OrganizationProfile>) => void;
  resetAllData: () => void;
  applyThemeToDOM: () => void;
}

const defaultOrgProfile: OrganizationProfile = {
  name: 'Nexora Technologies Inc.',
  website: 'https://nexora.io',
  currency: 'USD',
  timezone: 'America/Los_Angeles',
  address: '100 Market St, Suite 1200, San Francisco, CA 94105',
  phone: '+1 (415) 555-0100',
  supportEmail: 'support@nexora.io',
};

const initialPreferences = storage.getItem<UserPreferences>(STORAGE_KEYS.PREFERENCES, defaultPreferences);
const initialOrgProfile = storage.getItem<OrganizationProfile>('nexora_org_profile', defaultOrgProfile);

export const useSettingsStore = create<SettingsState>((set, get) => ({
  preferences: initialPreferences,
  orgProfile: initialOrgProfile,

  setTheme: (theme) => {
    const updated = { ...get().preferences, theme };
    storage.setItem(STORAGE_KEYS.PREFERENCES, updated);
    set({ preferences: updated });
    get().applyThemeToDOM();
  },

  updatePreferences: (updates) => {
    const updated = { ...get().preferences, ...updates };
    storage.setItem(STORAGE_KEYS.PREFERENCES, updated);
    set({ preferences: updated });
  },

  updateOrgProfile: (updates) => {
    const updated = { ...get().orgProfile, ...updates };
    storage.setItem('nexora_org_profile', updated);
    set({ orgProfile: updated });
  },

  resetAllData: () => {
    resetLocalDB();
  },

  applyThemeToDOM: () => {
    const theme = get().preferences?.theme || 'dark';
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
    } else {
      // system
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  },
}));

// Initialize theme on start
if (typeof window !== 'undefined') {
  useSettingsStore.getState().applyThemeToDOM();
}
