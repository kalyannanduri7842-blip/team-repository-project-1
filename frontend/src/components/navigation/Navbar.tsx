import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Search,
  Plus,
  Moon,
  Sun,
  Laptop,
  HelpCircle,
  Menu,
  ChevronRight,
  LogOut,
  User as UserIcon,
  Sliders,
  Shield,
} from 'lucide-react';
import { useAuthStore, useSettingsStore, useNotificationStore } from '../../store';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { Dropdown } from '../ui/Dropdown';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { NotificationsPopover } from './NotificationsPopover';
import { QuickAddModal } from './QuickAddModal';
import { CommandPalette } from '../ui/CommandPalette';
import { BrandLogo } from '../brand/BrandLogo';

interface NavbarProps {
  onMobileMenuToggle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMobileMenuToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const { preferences, setTheme } = useSettingsStore();
  const showSuccess = useNotificationStore((s) => s.showSuccess);

  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

  // Generate breadcrumbs from location
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    return { url, label };
  });

  const handleLogout = () => {
    logout();
    showSuccess('Logged out successfully');
    navigate('/login');
  };

  const userMenuItems = [
    {
      id: 'profile',
      label: 'My Profile',
      icon: <UserIcon className="w-4 h-4" />,
      onClick: () => navigate('/settings/profile'),
    },
    {
      id: 'preferences',
      label: 'Preferences',
      icon: <Sliders className="w-4 h-4" />,
      onClick: () => navigate('/settings/preferences'),
    },
    {
      id: 'settings',
      label: 'System Settings',
      icon: <Shield className="w-4 h-4" />,
      onClick: () => navigate('/settings'),
    },
    {
      id: 'logout',
      label: 'Sign Out',
      icon: <LogOut className="w-4 h-4" />,
      danger: true,
      divider: true,
      onClick: () => setIsLogoutConfirmOpen(true),
    },
  ];

  return (
    <>
      <header className="h-16 bg-[#fff8f3] dark:bg-[#062016] border-b border-[#fed7aa]/50 dark:border-[#0e3526] px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-20">
        {/* Left: Mobile hamburger & Breadcrumbs */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onMobileMenuToggle}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:text-forest-900 dark:text-peach-200 dark:hover:text-white hover:bg-peach-100 dark:hover:bg-forest-850"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumbs */}
          <nav className="hidden sm:flex items-center gap-1.5 text-xs text-slate-600 dark:text-peach-200">
            <Link to="/dashboard" className="hover:text-forest-900 dark:hover:text-white font-medium">
              Home
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb.url}>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-forest-400" />
                <Link
                  to={crumb.url}
                  className={`hover:text-forest-900 dark:hover:text-white truncate max-w-[150px] ${
                    idx === breadcrumbs.length - 1 ? 'font-bold text-forest-950 dark:text-peach-50' : ''
                  }`}
                >
                  {crumb.label}
                </Link>
              </React.Fragment>
            ))}
          </nav>
        </div>

        {/* Center: Global Search Bar */}
        <div className="flex-1 max-w-md mx-2">
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-[#ffeedd] dark:bg-[#0b261c] hover:bg-[#ffe5ce] dark:hover:bg-[#0e3526] border border-[#fed7aa] dark:border-[#164e37] text-xs text-forest-950 dark:text-peach-100/90 transition-colors group shadow-xs"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-forest-800 dark:text-peach-400 group-hover:text-peach-600" />
              <span className="truncate">Search leads, deals, customers, tasks...</span>
            </div>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-mono uppercase bg-[#fff8f3] dark:bg-[#062016] px-1.5 py-0.5 rounded border border-[#fed7aa] dark:border-[#164e37] shadow-xs text-forest-900 dark:text-peach-300">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Quick Add Button */}
          <Button
            size="sm"
            variant="primary"
            onClick={() => setIsQuickAddOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
            className="hidden sm:inline-flex bg-forest-900 hover:bg-forest-850 text-peach-100 border border-peach-400/30 shadow-sm"
          >
            Quick Add
          </Button>

          <button
            onClick={() => setIsQuickAddOpen(true)}
            className="sm:hidden p-2 rounded-xl bg-forest-900 text-peach-100 shadow-xs border border-peach-400/30"
            title="Quick Add"
          >
            <Plus className="w-5 h-5" />
          </button>

          {/* Theme Switcher */}
          <button
            onClick={() => setTheme(preferences.theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-xl text-slate-600 hover:text-forest-900 dark:text-peach-200 dark:hover:text-white hover:bg-peach-100 dark:hover:bg-forest-850 transition-colors"
            title={`Switch to ${preferences.theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {preferences.theme === 'dark' ? (
              <Sun className="w-5 h-5 text-peach-400" />
            ) : (
              <Moon className="w-5 h-5 text-forest-800" />
            )}
          </button>

          {/* Notifications Popover */}
          <NotificationsPopover />

          {/* Help Button */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="hidden sm:flex p-2 rounded-xl text-slate-600 hover:text-forest-900 dark:text-peach-200 dark:hover:text-white hover:bg-peach-100 dark:hover:bg-forest-850 transition-colors"
            title="Keyboard Shortcuts & Help"
          >
            <HelpCircle className="w-5 h-5" />
          </button>

          <div className="w-px h-6 bg-[#fed7aa]/60 dark:border-[#0e3526] mx-1 hidden sm:block" />

          {/* User Profile Menu */}
          {user && (
            <Dropdown
              align="right"
              trigger={
                <button className="flex items-center gap-2 p-1 rounded-xl hover:bg-peach-100/70 dark:hover:bg-forest-850 transition-colors focus:outline-none">
                  <Avatar
                    src={user.avatar}
                    name={user.name}
                    size="sm"
                  />
                  <div className="hidden lg:flex flex-col text-left">
                    <span className="text-xs font-semibold text-slate-900 dark:text-peach-100 leading-tight">
                      {user.name}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-peach-300 capitalize font-mono">{user.role}</span>
                  </div>
                </button>
              }
              items={userMenuItems}
            />
          )}
        </div>
      </header>

      {/* Global Modals */}
      <QuickAddModal isOpen={isQuickAddOpen} onClose={() => setIsQuickAddOpen(false)} />
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenAddLead={() => setIsQuickAddOpen(true)}
      />
      <ConfirmDialog
        isOpen={isLogoutConfirmOpen}
        onClose={() => setIsLogoutConfirmOpen(false)}
        onConfirm={handleLogout}
        title="Sign Out of NEXORA CRM"
        message="Are you sure you want to end your demo session? Your locally saved data and pipeline records will remain intact in LocalStorage."
        confirmLabel="Sign Out"
        variant="danger"
      />
    </>
  );
};
