import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  CheckCheck,
  Trash2,
  Calendar,
  Briefcase,
  CheckSquare,
  Users,
  Info,
  ExternalLink,
  Filter,
} from 'lucide-react';
import { useNotificationStore } from '../../store';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { formatDate } from '../../utils/formatters';

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    getUnreadCount,
  } = useNotificationStore();

  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'task_due' | 'deal_won' | 'meeting_reminder'>('all');

  const unreadCount = getUnreadCount();

  const filtered = notifications.filter((n) => {
    if (activeFilter === 'unread') return !n.read;
    if (activeFilter !== 'all') return n.type === activeFilter;
    return true;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'deal_won':
      case 'deal_stage':
        return <Briefcase className="w-5 h-5 text-amber-500" />;
      case 'task_due':
        return <CheckSquare className="w-5 h-5 text-purple-500" />;
      case 'new_lead':
      case 'conversion':
        return <Users className="w-5 h-5 text-forest-700" />;
      case 'meeting_reminder':
        return <Calendar className="w-5 h-5 text-cyan-500" />;
      default:
        return <Info className="w-5 h-5 text-forest-700" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
              <Bell className="w-6 h-6 text-forest-700" />
              <span>Notification Center</span>
            </h1>
            {unreadCount > 0 && (
              <Badge variant="danger" size="sm">
                {unreadCount} unread
              </Badge>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Stay updated with pipeline movements, upcoming meetings, assigned leads, and task due dates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              leftIcon={<CheckCheck className="w-4 h-4" />}
            >
              Mark all as read
            </Button>
          )}
          {notifications.length > 0 && (
            <Button
              variant="danger"
              size="sm"
              onClick={clearAllNotifications}
              leftIcon={<Trash2 className="w-4 h-4" />}
            >
              Clear all
            </Button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-2 shadow-xs flex flex-wrap items-center gap-2 text-xs">
        {[
          { id: 'all', label: 'All Notifications' },
          { id: 'unread', label: 'Unread' },
          { id: 'task_due', label: 'Tasks' },
          { id: 'deal_won', label: 'Deals' },
          { id: 'meeting_reminder', label: 'Meetings' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id as any)}
            className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
              activeFilter === tab.id
                ? 'bg-forest-900 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs divide-y divide-slate-100 dark:divide-slate-800/80">
        {filtered.length === 0 ? (
          <div className="p-16 text-center text-xs text-slate-400">
            No notifications in this category.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                markAsRead(item.id);
                if (item.link) navigate(item.link);
              }}
              className={`p-5 flex items-start justify-between gap-4 transition-colors cursor-pointer group ${
                item.read
                  ? 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  : 'bg-peach-100/40 dark:bg-forest-900/20 hover:bg-peach-100/70 dark:hover:bg-forest-900/40'
              }`}
            >
              <div className="flex items-start gap-4 min-w-0">
                <div className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs shrink-0 mt-0.5">
                  {getIcon(item.type)}
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className={`text-sm font-bold truncate ${item.read ? 'text-slate-800 dark:text-slate-200' : 'text-slate-900 dark:text-slate-100'}`}>
                      {item.title}
                    </h3>
                    {!item.read && <span className="w-2 h-2 rounded-full bg-forest-800" />}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.message}
                  </p>

                  <span className="text-[10px] text-slate-400 block pt-0.5">
                    {formatDate(item.createdAt, 'long')}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {item.link && (
                  <span className="text-xs text-forest-800 dark:text-peach-400 font-semibold group-hover:underline hidden sm:inline-flex items-center gap-1">
                    View <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(item.id);
                  }}
                  className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
