import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  PhoneCall,
  CheckSquare,
  BarChart3,
  TrendingUp,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
  Layers,
  Sparkles,
  Calendar,
  FileText,
} from 'lucide-react';
import { useAuthStore, useTaskStore, useNotificationStore, useLeadStore } from '../../store';
import { cn } from '../../utils/cn';
import { BrandLogo } from '../brand/BrandLogo';

interface SidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen = false, onMobileClose }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const user = useAuthStore((s) => s.user);

  const unreadNotifs = useNotificationStore((s) => s.getUnreadCount());
  const pendingTasks = useTaskStore((s) => s.tasks.filter((t) => t.status !== 'completed').length);
  const newLeads = useLeadStore((s) => s.leads.filter((l) => l.status === 'new').length);

  const role = user?.role || 'sales';

  const allSectionsRaw = [
    {
      title: 'MAIN',
      roles: ['admin', 'manager', 'sales'],
      items: [
        { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, roles: ['admin', 'manager', 'sales'] },
      ],
    },
    {
      title: 'SALES & CRM',
      roles: ['admin', 'manager', 'sales'],
      items: [
        { name: 'Leads', path: '/leads', icon: <Users className="w-5 h-5" />, badge: newLeads > 0 ? newLeads : undefined, badgeColor: 'bg-emerald-600', roles: ['admin', 'manager', 'sales'] },
        { name: 'Customers', path: '/customers', icon: <Building2 className="w-5 h-5" />, roles: ['admin', 'manager', 'sales'] },
        { name: 'Deals & Pipeline', path: '/deals', icon: <Briefcase className="w-5 h-5" />, roles: ['admin', 'manager', 'sales'] },
        { name: 'Activities & Calls', path: '/activities', icon: <PhoneCall className="w-5 h-5" />, roles: ['admin', 'manager', 'sales'] },
        { name: 'Tasks', path: '/tasks', icon: <CheckSquare className="w-5 h-5" />, badge: pendingTasks > 0 ? pendingTasks : undefined, badgeColor: 'bg-amber-600', roles: ['admin', 'manager', 'sales'] },
      ],
    },
    {
      title: 'INSIGHTS',
      roles: ['admin', 'manager'],
      items: [
        { name: 'Reports', path: '/reports', icon: <FileText className="w-5 h-5" />, roles: ['admin', 'manager'] },
        { name: 'Analytics', path: '/analytics', icon: <TrendingUp className="w-5 h-5" />, roles: ['admin', 'manager'] },
      ],
    },
    {
      title: 'SYSTEM',
      roles: ['admin', 'manager', 'sales'],
      items: [
        { name: 'Notifications', path: '/notifications', icon: <Bell className="w-5 h-5" />, badge: unreadNotifs > 0 ? unreadNotifs : undefined, badgeColor: 'bg-peach-500', roles: ['admin', 'manager', 'sales'] },
        { name: 'Settings', path: '/settings', icon: <Settings className="w-5 h-5" /> },
      ],
    },
  ];

  const navigationSections = allSectionsRaw
    .filter((section: any) => !section.roles || section.roles.includes(role))
    .map((section: any) => ({
      ...section,
      items: section.items.filter((item: any) => !item.roles || item.roles.includes(role)),
    }))
    .filter((section: any) => section.items.length > 0);

  const sidebarContent = (

    <div className="flex flex-col h-full bg-[#062016] border-r border-[#0e3526] text-[#ffeedd] select-none">
      {/* Brand Header */}
      <div className="h-16 px-3 flex items-center justify-between border-b border-[#0e3526] shrink-0 bg-[#041710]/70">
        <div className="flex items-center gap-3 overflow-hidden">
          <BrandLogo size="sm" showText={!isCollapsed} />
        </div>

        {/* Collapse Button (Desktop Only) */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex p-1.5 rounded-lg text-peach-300/70 hover:text-white hover:bg-forest-850 transition-colors"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav Link Groups */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navigationSections.map((section) => (
          <div key={section.title} className="space-y-1">
            {!isCollapsed && (
              <div className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-peach-300/60 font-mono">
                {section.title}
              </div>
            )}
            {section.items.map((item: any) => {
              const isActive =
                location.pathname === item.path ||
                (item.path !== '/dashboard' && location.pathname.startsWith(item.path));

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => onMobileClose && onMobileClose()}
                  className={cn(
                    'group relative flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150',
                    isActive
                      ? 'bg-gradient-to-r from-forest-800 to-forest-850 text-peach-50 shadow-sm font-semibold border border-peach-400/40'
                      : 'text-peach-200/80 hover:text-white hover:bg-[#0b2b1e]',
                    isCollapsed && 'justify-center px-2'
                  )}
                  title={isCollapsed ? item.name : undefined}
                >
                  <span className={cn('shrink-0 transition-transform group-hover:scale-110', isActive ? 'text-peach-200' : 'text-peach-300/70')}>
                    {item.icon}
                  </span>

                  {!isCollapsed && <span className="flex-1 truncate">{item.name}</span>}

                  {!isCollapsed && item.badge !== undefined && (
                    <span
                      className={cn(
                        'px-2 py-0.5 rounded-full text-[10px] font-bold text-white',
                        item.badgeColor
                      )}
                    >
                      {item.badge}
                    </span>
                  )}

                  {isCollapsed && item.badge !== undefined && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-peach-500 ring-2 ring-[#062016]" />
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>

      {/* User Info / Role Pill */}
      {user && (
        <div className="p-3 border-t border-[#0e3526] bg-[#041710]/80 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-forest-800/80 border border-peach-400/30 flex items-center justify-center text-peach-300 shrink-0">
              <Shield className="w-3.5 h-3.5" />
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-peach-100 truncate">{user.name}</p>
                <span className="text-[10px] text-peach-200/70 capitalize truncate font-mono block">
                  {user.role} role
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden md:block h-screen shrink-0 transition-all duration-300 z-30 sticky top-0',
          isCollapsed ? 'w-16' : 'w-64'
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="relative w-72 max-w-[85vw] h-full z-10"
            >
              {sidebarContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
