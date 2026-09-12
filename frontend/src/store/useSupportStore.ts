import { create } from 'zustand';
import { SupportTicket, TicketStatus, TicketCategory, TicketPriority, SupportMetrics } from '../types';
import { storage } from '../utils/storage';
import { STORAGE_KEYS } from '../services/local/db';
import { mockSupportTickets } from '../data/mock';
import { activityRepository, notificationRepository } from '../services/local';

interface SupportFilterOptions {
  status: TicketStatus | 'all';
  category: TicketCategory | 'all';
  priority: TicketPriority | 'all';
  search: string;
}

interface SupportState {
  tickets: SupportTicket[];
  filters: SupportFilterOptions;

  // Actions
  fetchTickets: () => void;
  raiseTicket: (data: {
    subject: string;
    description: string;
    category: TicketCategory;
    priority: TicketPriority;
    raisedById: string;
    raisedByName: string;
    raisedByRole: string;
    relatedEntityName?: string;
    relatedEntityType?: 'customer' | 'lead' | 'deal';
  }) => SupportTicket;
  updateTicketStatus: (
    id: string,
    status: TicketStatus,
    resolutionNote?: string,
    resolvedBy?: string
  ) => boolean;
  assignTicket: (id: string, assignedToId: string, assignedToName: string) => boolean;
  setFilters: (filters: Partial<SupportFilterOptions>) => void;
  resetFilters: () => void;
  getMetrics: () => SupportMetrics;
}

const defaultFilters: SupportFilterOptions = {
  status: 'all',
  category: 'all',
  priority: 'all',
  search: '',
};

export const useSupportStore = create<SupportState>((set, get) => ({
  tickets: storage.getItem<SupportTicket[]>(STORAGE_KEYS.SUPPORT_TICKETS, mockSupportTickets),
  filters: defaultFilters,

  fetchTickets: () => {
    const data = storage.getItem<SupportTicket[]>(STORAGE_KEYS.SUPPORT_TICKETS, mockSupportTickets);
    set({ tickets: data });
  },

  raiseTicket: (data) => {
    const count = get().tickets.length + 1;
    const ticketNumber = `TCK-${1040 + count}`;

    const newTicket: SupportTicket = {
      id: `tck-${Date.now()}`,
      ticketNumber,
      subject: data.subject,
      description: data.description,
      category: data.category,
      priority: data.priority,
      status: 'open',
      raisedById: data.raisedById,
      raisedByName: data.raisedByName,
      raisedByRole: data.raisedByRole,
      assignedToId: 'usr-002', // Default Marcus Reed (Support/Manager)
      assignedToName: 'Marcus Reed (Support Lead)',
      relatedEntityName: data.relatedEntityName,
      relatedEntityType: data.relatedEntityType,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [newTicket, ...get().tickets];
    storage.setItem(STORAGE_KEYS.SUPPORT_TICKETS, updated);
    set({ tickets: updated });

    // Notify Support Lead
    notificationRepository.create({
      userId: 'usr-002',
      title: `New Support Ticket [${ticketNumber}]`,
      message: `${data.raisedByName} raised a ${data.priority.toUpperCase()} ticket: ${data.subject}`,
      type: 'system',
      read: false,
      link: '/support',
    });

    activityRepository.logActivity({
      type: 'note',
      title: `Raised Support Ticket ${ticketNumber}`,
      description: `[${data.category.toUpperCase()}] ${data.subject}`,
      entityType: 'note',
      entityId: newTicket.id,
      entityName: data.subject,
      performedById: data.raisedById,
      performedByName: data.raisedByName,
    });

    return newTicket;
  },

  updateTicketStatus: (id, status, resolutionNote, resolvedBy) => {
    const ticket = get().tickets.find((t) => t.id === id);
    if (!ticket) return false;

    const isNowResolved = status === 'resolved' || status === 'closed';
    const updatedTickets = get().tickets.map((t) =>
      t.id === id
        ? {
            ...t,
            status,
            resolutionNote: resolutionNote || t.resolutionNote,
            updatedAt: new Date().toISOString(),
            resolvedAt: isNowResolved ? new Date().toISOString() : t.resolvedAt,
          }
        : t
    );

    storage.setItem(STORAGE_KEYS.SUPPORT_TICKETS, updatedTickets);
    set({ tickets: updatedTickets });

    // Notify Submitter when resolved
    if (isNowResolved) {
      notificationRepository.create({
        userId: ticket.raisedById,
        title: `Ticket Solved: [${ticket.ticketNumber}]`,
        message: `${resolvedBy || 'Support Team'} marked your ticket as ${status.toUpperCase()}. Note: ${resolutionNote || 'Resolved.'}`,
        type: 'system',
        read: false,
        link: '/support',
      });
    }

    return true;
  },

  assignTicket: (id, assignedToId, assignedToName) => {
    const updatedTickets = get().tickets.map((t) =>
      t.id === id
        ? {
            ...t,
            assignedToId,
            assignedToName,
            updatedAt: new Date().toISOString(),
          }
        : t
    );

    storage.setItem(STORAGE_KEYS.SUPPORT_TICKETS, updatedTickets);
    set({ tickets: updatedTickets });
    return true;
  },

  setFilters: (newFilters) => {
    set((state) => ({ filters: { ...state.filters, ...newFilters } }));
  },

  resetFilters: () => {
    set({ filters: defaultFilters });
  },

  getMetrics: () => {
    const tickets = get().tickets;
    const total = tickets.length;
    const open = tickets.filter((t) => t.status === 'open').length;
    const inProgress = tickets.filter((t) => t.status === 'in_progress').length;
    const resolved = tickets.filter((t) => t.status === 'resolved').length;
    const closed = tickets.filter((t) => t.status === 'closed').length;

    const solvedTotal = resolved + closed;
    const resolutionRate = total > 0 ? Math.round((solvedTotal / total) * 100) : 100;

    return {
      totalTickets: total,
      openTickets: open,
      inProgressTickets: inProgress,
      resolvedTickets: resolved,
      closedTickets: closed,
      resolutionRate,
      avgResolutionTimeHours: 3.4,
      slaBreachCount: tickets.filter((t) => t.priority === 'urgent' && t.status === 'open').length,
    };
  },
}));
