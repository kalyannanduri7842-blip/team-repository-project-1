import { AppNotification } from '../../types';
import { storage } from '../../utils/storage';
import { STORAGE_KEYS } from './db';
import { mockNotifications } from '../../data/mock';

export const notificationRepository = {
  getAll(): AppNotification[] {
    return storage.getItem<AppNotification[]>(STORAGE_KEYS.NOTIFICATIONS, mockNotifications);
  },

  getAllForUser(userId: string): AppNotification[] {
    const notifs = this.getAll();
    return notifs.filter((n) => n.userId === userId);
  },

  getUnreadCount(userId?: string): number {
    const notifs = this.getAll();
    if (userId) {
      return notifs.filter((n) => n.userId === userId && !n.read).length;
    }
    return notifs.filter((n) => !n.read).length;
  },

  create(data: Omit<AppNotification, 'id' | 'createdAt'>): AppNotification {
    const notifs = this.getAll();
    const newNotif: AppNotification = {
      ...data,
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString(),
    };
    notifs.unshift(newNotif);
    storage.setItem(STORAGE_KEYS.NOTIFICATIONS, notifs);
    return newNotif;
  },

  markAsRead(id: string): boolean {
    const notifs = this.getAll();
    const index = notifs.findIndex((n) => n.id === id);
    if (index === -1) return false;

    notifs[index] = { ...notifs[index], read: true };
    storage.setItem(STORAGE_KEYS.NOTIFICATIONS, notifs);
    return true;
  },

  markAllAsRead(userId?: string): number {
    const notifs = this.getAll();
    let updatedCount = 0;
    const updated = notifs.map((n) => {
      if ((!userId || n.userId === userId) && !n.read) {
        updatedCount++;
        return { ...n, read: true };
      }
      return n;
    });
    storage.setItem(STORAGE_KEYS.NOTIFICATIONS, updated);
    return updatedCount;
  },

  clearAll(userId?: string): void {
    if (!userId) {
      storage.setItem(STORAGE_KEYS.NOTIFICATIONS, []);
      return;
    }
    const notifs = this.getAll();
    const filtered = notifs.filter((n) => n.userId !== userId);
    storage.setItem(STORAGE_KEYS.NOTIFICATIONS, filtered);
  },

  delete(id: string): boolean {
    const notifs = this.getAll();
    const filtered = notifs.filter((n) => n.id !== id);
    if (filtered.length === notifs.length) return false;
    storage.setItem(STORAGE_KEYS.NOTIFICATIONS, filtered);
    return true;
  },
};
