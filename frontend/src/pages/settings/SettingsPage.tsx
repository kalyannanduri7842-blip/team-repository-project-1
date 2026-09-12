import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  User,
  Sliders,
  Bell,
  Moon,
  Sun,
  Laptop,
  Database,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react';
import { useAuthStore, useSettingsStore, useNotificationStore } from '../../store';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Tabs } from '../../components/ui/Tabs';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { createDatabaseSnapshot, restoreDatabaseSnapshot } from '../../services/local/db';
import { ThemeMode } from '../../types';

export const SettingsPage: React.FC = () => {
  const { user, updateProfile } = useAuthStore();
  const { preferences, setTheme, updatePreferences, resetAllData } = useSettingsStore();
  const showSuccess = useNotificationStore((s) => s.showSuccess);
  const showError = useNotificationStore((s) => s.showError);

  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'notifications' | 'database'>('profile');
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Profile Form State
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [title, setTitle] = useState(user?.title || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');

  const tabsConfig = [
    { id: 'profile', label: 'User Profile', icon: <User className="w-4 h-4" /> },
    { id: 'preferences', label: 'Display & Theme', icon: <Sliders className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notification Config', icon: <Bell className="w-4 h-4" /> },
    { id: 'database', label: 'Data Management & Backup', icon: <Database className="w-4 h-4" /> },
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, phone, title, avatar });
    showSuccess('Profile details updated successfully');
  };

  const handleDownloadSnapshot = () => {
    const snapshot = createDatabaseSnapshot();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(snapshot, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `nexora_crm_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showSuccess('Database snapshot downloaded successfully');
  };

  const handleRestoreFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = (function(){ const raw=String(event.target?.result||''); if(raw.trim().startsWith('<')) throw new Error('HTML not allowed'); return JSON.parse(raw); })();
        const ok = restoreDatabaseSnapshot(json);
        if (ok) {
          showSuccess('Database restored successfully from snapshot! Reloading...');
          setTimeout(() => window.location.reload(), 1000);
        } else {
          showError('Failed to restore database from file.');
        }
      } catch (err) {
        showError('Invalid JSON backup file format.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetData = () => {
    resetAllData();
    showSuccess('Database restored to default enterprise demo state! Reloading...');
    setIsResetConfirmOpen(false);
    setTimeout(() => window.location.reload(), 800);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
          <SettingsIcon className="w-6 h-6 text-forest-700" />
          <span>System & Account Settings</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Customize your profile, configure UI themes, toggle notification rules, and manage local data backups.
        </p>
      </div>

      {/* Settings Navigation Tabs */}
      <Tabs tabs={tabsConfig} activeTab={activeTab} onChange={(t) => setActiveTab(t as any)} />

      {/* PROFILE SETTINGS */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-6">
          <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <img
              src={avatar || user?.avatar}
              alt={name}
              className="w-16 h-16 rounded-full object-cover ring-4 ring-indigo-500/20"
            />
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{user?.name}</h3>
              <p className="text-xs text-slate-500">{user?.title} • Role: {user?.role.toUpperCase()}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Full Name" required value={name} onChange={(e) => setName(e.target.value)} />
            <Input label="Email Address" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <Input label="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <Input
            label="Avatar Image URL"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            placeholder="https://images.unsplash.com/photo-..."
          />

          <div className="flex justify-end pt-2">
            <Button type="submit" variant="primary">
              Save Profile Changes
            </Button>
          </div>
        </form>
      )}

      {/* DISPLAY & THEME SETTINGS */}
      {activeTab === 'preferences' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-6">
          {/* Theme Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Color Theme Mode
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'dark', label: 'Dark Mode', icon: <Moon className="w-5 h-5 text-peach-400" /> },
                { id: 'light', label: 'Light Mode', icon: <Sun className="w-5 h-5 text-amber-400" /> },
                { id: 'system', label: 'System Default', icon: <Laptop className="w-5 h-5 text-slate-400" /> },
              ].map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => setTheme(theme.id as ThemeMode)}
                  className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center gap-2 transition-all ${
                    preferences.theme === theme.id
                      ? 'border-forest-800 bg-peach-100/50 dark:bg-forest-900/40 ring-2 ring-indigo-600/30'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  {theme.icon}
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{theme.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Regional Formats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Select
              label="Date Display Format"
              value={preferences.dateFormat}
              onChange={(e) => updatePreferences({ dateFormat: e.target.value as any })}
              options={[
                { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (US Standard)' },
                { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (International)' },
                { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (ISO)' },
              ]}
            />
            <Select
              label="Default Dashboard View"
              value={preferences.defaultDashboardView}
              onChange={(e) => updatePreferences({ defaultDashboardView: e.target.value as any })}
              options={[
                { value: 'executive', label: 'Executive 360 Overview' },
                { value: 'sales', label: 'Sales Rep Leaderboard' },
                { value: 'pipeline', label: 'Pipeline Forecast' },
              ]}
            />
          </div>
        </div>
      )}

      {/* NOTIFICATIONS SETTINGS */}
      {activeTab === 'notifications' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            In-App Notification Alerts
          </h3>

          <div className="space-y-4">
            {[
              { id: 'taskDue', title: 'Task Due Date Reminders', desc: 'Notify when assigned follow-up tasks reach due date' },
              { id: 'dealAssigned', title: 'Deal Stage Updates', desc: 'Alert when pipeline deals advance or are marked won/lost' },
              { id: 'leadAssigned', title: 'New Inbound Lead Alerts', desc: 'Notify when high-score leads register through channels' },
              { id: 'meetingReminder', title: 'Upcoming Meeting Reminders', desc: 'Send reminder alerts 30 minutes before client demos' },
            ].map((pref) => (
              <div key={pref.id} className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{pref.title}</h4>
                  <p className="text-[11px] text-slate-500">{pref.desc}</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-300 text-forest-800 focus:ring-peach-500 w-4 h-4 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DATABASE & BACKUP SETTINGS */}
      {activeTab === 'database' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              LocalStorage Database Management
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              NEXORA CRM stores all leads, deals, customers, and activities in browser LocalStorage. You can export complete snapshots, restore backups, or reset to original seed data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Download className="w-4 h-4 text-forest-700" />
                <span>Export Database Snapshot</span>
              </h4>
              <p className="text-xs text-slate-500">
                Download a complete JSON file containing all CRM records, activities, and settings.
              </p>
              <Button variant="outline" size="sm" onClick={handleDownloadSnapshot}>
                Download Backup JSON
              </Button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Upload className="w-4 h-4 text-emerald-500" />
                <span>Restore Database from Snapshot</span>
              </h4>
              <p className="text-xs text-slate-500">
                Select a previously saved backup file to restore all customer and pipeline states.
              </p>
              <input
                type="file"
                accept=".json,application/json"
                onChange={handleRestoreFile}
                className="block text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
              />
            </div>
          </div>

          {/* Reset Danger Zone */}
          <div className="p-4 rounded-2xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20 space-y-3">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs">
              <ShieldAlert className="w-4 h-4" />
              <span>Danger Zone: Factory Reset Seed Data</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Reset all CRM tables back to the initial high-quality demo accounts, enterprise leads, and pipeline records.
            </p>
            <Button variant="danger" size="sm" onClick={() => setIsResetConfirmOpen(true)} leftIcon={<RotateCcw className="w-3.5 h-3.5" />}>
              Reset to Factory Seed Data
            </Button>
          </div>
        </div>
      )}

      {/* Reset Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={handleResetData}
        title="Reset Entire Database"
        message="Are you sure you want to reset all CRM records to initial demo seed data? Any new leads or deals you created locally will be replaced."
        confirmLabel="Reset Everything"
        variant="danger"
      />
    </div>
  );
};
