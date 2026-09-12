import { describe, it, expect, beforeEach } from 'vitest';
import { getStorageItem, setStorageItem, removeStorageItem, clearAllStorage } from '../../utils/storage';
import { exportDatabaseSnapshot, restoreDatabaseSnapshot, resetDatabaseToDefaults } from '../../services/local/db';

describe('Local Storage & Database Snapshot Service', () => {
  beforeEach(() => {
    clearAllStorage();
  });

  it('stores, retrieves, and removes arbitrary typed items', () => {
    const userPref = { theme: 'dark', notifications: true };
    setStorageItem('test_pref', userPref);

    const retrieved = getStorageItem('test_pref', null);
    expect(retrieved).toEqual(userPref);

    removeStorageItem('test_pref');
    expect(getStorageItem('test_pref', null)).toBeNull();
  });

  it('returns default fallback when key does not exist or JSON is corrupt', () => {
    const fallback = { fallback: true };
    expect(getStorageItem('non_existent_key', fallback)).toEqual(fallback);

    // Corrupt key value
    localStorage.setItem('nexora_corrupt_key', '{not_json');
    expect(getStorageItem('corrupt_key', fallback)).toEqual(fallback);
  });

  it('exports, restores, and resets complete database snapshots', () => {
    resetDatabaseToDefaults();

    const snapshot = exportDatabaseSnapshot();
    expect(snapshot).toHaveProperty('version');
    expect(snapshot).toHaveProperty('exportedAt');
    expect(snapshot.leads.length).toBeGreaterThan(0);
    expect(snapshot.customers.length).toBeGreaterThan(0);
    expect(snapshot.deals.length).toBeGreaterThan(0);

    // Modify a lead
    const modifiedSnapshot = {
      ...snapshot,
      leads: [{ ...snapshot.leads[0], fullName: 'Modified Test Name' }],
    };

    const restored = restoreDatabaseSnapshot(modifiedSnapshot);
    expect(restored).toBe(true);

    const updatedSnapshot = exportDatabaseSnapshot();
    expect(updatedSnapshot.leads[0].fullName).toBe('Modified Test Name');
  });
});
