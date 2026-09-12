import { describe, it, expect, beforeEach } from 'vitest';
import { notificationRepository } from '../../services/local/notificationRepository';
import { STORAGE_KEYS } from '../../services/local/db';
import { storage } from '../../utils/storage';

describe('notificationRepository', () => {
  beforeEach(() => {
    storage.setItem(STORAGE_KEYS.NOTIFICATIONS, []);
  });

  it('creates notifications and tracks unread count', () => {
    const notif = notificationRepository.create({
      userId: 'user_1',
      title: 'Deal Won!',
      message: 'Global Cloud Migration deal has been marked Won ($150,000)',
      type: 'deal_won',
      link: '/deals/deal_1',
      read: false,
    } as any);

    expect(notif.id).toBeDefined();
    expect(notificationRepository.getUnreadCount('user_1')).toBe(1);

    notificationRepository.markAsRead(notif.id);
    expect(notificationRepository.getUnreadCount('user_1')).toBe(0);
  });

  it('supports markAllAsRead and clearAll', () => {
    notificationRepository.create({
      userId: 'user_1',
      title: 'Notif 1',
      message: 'Msg 1',
      type: 'system',
      read: false,
    } as any);

    notificationRepository.create({
      userId: 'user_1',
      title: 'Notif 2',
      message: 'Msg 2',
      type: 'lead_assigned',
      read: false,
    } as any);

    expect(notificationRepository.getUnreadCount('user_1')).toBe(2);

    notificationRepository.markAllAsRead('user_1');
    expect(notificationRepository.getUnreadCount('user_1')).toBe(0);

    notificationRepository.clearAll('user_1');
    expect(notificationRepository.getAllForUser('user_1').length).toBe(0);
  });
});
