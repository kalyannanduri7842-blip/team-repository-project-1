import { describe, it, expect, beforeEach } from 'vitest';
import { useSettingsStore } from '../../store/useSettingsStore';
import { clearAllStorage } from '../../utils/storage';

describe('useSettingsStore', () => {
  beforeEach(() => {
    clearAllStorage();
    useSettingsStore.setState({
      orgProfile: {
        name: 'Nexora Technologies Inc.',
        website: 'https://nexora.io',
        currency: 'USD',
        timezone: 'America/Los_Angeles',
        address: '100 Market St, Suite 1200, San Francisco, CA 94105',
        phone: '+1 (415) 555-0100',
        supportEmail: 'support@nexora.io',
      },
    });
  });

  it('toggles theme between dark and light modes', () => {
    useSettingsStore.getState().setTheme('light');
    expect(useSettingsStore.getState().preferences.theme).toBe('light');

    useSettingsStore.getState().setTheme('dark');
    expect(useSettingsStore.getState().preferences.theme).toBe('dark');
  });

  it('updates organization profile metadata', () => {
    useSettingsStore.getState().updateOrgProfile({
      name: 'Nexora Enterprise SaaS Ltd.',
      phone: '+1 (415) 555-9999',
    });

    expect(useSettingsStore.getState().orgProfile.name).toBe('Nexora Enterprise SaaS Ltd.');
    expect(useSettingsStore.getState().orgProfile.phone).toBe('+1 (415) 555-9999');
  });
});
