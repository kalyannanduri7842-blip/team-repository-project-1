import { create } from 'zustand';
import { AppNotification, ToastMessage } from '../types';
import { notificationRepository } from '../services/local';

interface NotificationState {
  notifications: AppNotification[];
  toasts: ToastMessage[];

  // Actions
  fetchNotifications: () => void;
  addNotification: (data: Omit<AppNotification, 'id' | 'createdAt'>) => AppNotification;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAllNotifications: () => void;
  getUnreadCount: () => number;

  // Toasts
  addToast: (toast: Omit<ToastMessage, 'id'>) => string;
  removeToast: (id: string) => void;
  showSuccess: (message: string, title?: string) => void;
  showError: (message: string, title?: string) => void;
  showInfo: (message: string, title?: string) => void;
  showWarning: (message: string, title?: string) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: notificationRepository.getAll(),
  toasts: [],

  fetchNotifications: () => {
    set({ notifications: notificationRepository.getAll() });
  },

  addNotification: (data) => {
    const newNotif = notificationRepository.create(data);
    set((state) => ({ notifications: [newNotif, ...state.notifications] }));
    return newNotif;
  },

  markAsRead: (id) => {
    notificationRepository.markAsRead(id);
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    }));
  },

  markAllAsRead: () => {
    notificationRepository.markAllAsRead();
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    }));
  },

  deleteNotification: (id) => {
    notificationRepository.delete(id);
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  clearAllNotifications: () => {
    notificationRepository.clearAll();
    set({ notifications: [] });
  },

  getUnreadCount: () => {
    return get().notifications.filter((n) => !n.read).length;
  },

  // Toast UI System
  addToast: (toast) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    const newToast: ToastMessage = { ...toast, id, duration: toast.duration || 4000 };

    set((state) => ({ toasts: [...state.toasts, newToast] }));

    setTimeout(() => {
      get().removeToast(id);
    }, newToast.duration);

    return id;
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  showSuccess: (message, title = 'Success') => {
    get().addToast({ type: 'success', title, message });
  },

  showError: (message, title = 'Error') => {
    get().addToast({ type: 'error', title, message });
  },

  showInfo: (message, title = 'Information') => {
    get().addToast({ type: 'info', title, message });
  },

  showWarning: (message, title = 'Warning') => {
    get().addToast({ type: 'warning', title, message });
  },
}));
