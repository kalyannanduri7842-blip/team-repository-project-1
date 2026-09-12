import { create } from 'zustand';
import { ApprovalRequest, ApprovalStatus, ApprovalEntityType } from '../types';
import { storage } from '../utils/storage';
import { STORAGE_KEYS } from '../services/local/db';
import { mockApprovals } from '../data/mock';
import { customerRepository, leadRepository, dealRepository, activityRepository, notificationRepository } from '../services/local';

interface ApprovalState {
  requests: ApprovalRequest[];
  filterStatus: ApprovalStatus | 'all';
  filterType: ApprovalEntityType | 'all';

  // Actions
  fetchApprovals: () => void;
  submitApproval: (data: {
    entityType: ApprovalEntityType;
    title: string;
    subtitle: string;
    entityData: any;
    submittedById: string;
    submittedByName: string;
    submittedByRole: string;
    estimatedValue?: number;
    priority?: 'low' | 'medium' | 'high' | 'urgent';
  }) => ApprovalRequest;
  approveRequest: (
    id: string,
    reviewerId: string,
    reviewerName: string,
    reviewNote?: string
  ) => boolean;
  rejectRequest: (
    id: string,
    reviewerId: string,
    reviewerName: string,
    reviewNote: string
  ) => boolean;
  setFilterStatus: (status: ApprovalStatus | 'all') => void;
  setFilterType: (type: ApprovalEntityType | 'all') => void;
  getPendingCount: () => number;
}

export const useApprovalStore = create<ApprovalState>((set, get) => ({
  requests: storage.getItem<ApprovalRequest[]>(STORAGE_KEYS.APPROVALS, mockApprovals),
  filterStatus: 'all',
  filterType: 'all',

  fetchApprovals: () => {
    const data = storage.getItem<ApprovalRequest[]>(STORAGE_KEYS.APPROVALS, mockApprovals);
    set({ requests: data });
  },

  submitApproval: (data) => {
    const newRequest: ApprovalRequest = {
      id: `app-${Date.now()}`,
      ...data,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    const current = get().requests;
    const updated = [newRequest, ...current];
    storage.setItem(STORAGE_KEYS.APPROVALS, updated);
    set({ requests: updated });

    // Notify Managers
    notificationRepository.create({
      userId: 'usr-002', // Marcus Reed (Manager)
      title: `Approval Required: ${data.title}`,
      message: `${data.submittedByName} submitted a new ${data.entityType} for review (${data.subtitle}).`,
      type: 'system',
      read: false,
      link: '/approvals',
    });

    activityRepository.logActivity({
      type: 'note',
      title: `Submitted Approval: ${data.title}`,
      description: `Submitted for Manager Approval by ${data.submittedByName}`,
      entityType: data.entityType === 'customer' ? 'customer' : data.entityType === 'lead' ? 'lead' : 'deal',
      entityId: newRequest.id,
      entityName: data.title,
      performedById: data.submittedById,
      performedByName: data.submittedByName,
    });

    return newRequest;
  },

  approveRequest: (id, reviewerId, reviewerName, reviewNote) => {
    const req = get().requests.find((r) => r.id === id);
    if (!req || req.status !== 'pending') return false;

    // 1. Commit entity to active repository based on entityType
    if (req.entityType === 'customer') {
      customerRepository.create(req.entityData);
    } else if (req.entityType === 'lead') {
      leadRepository.create(req.entityData);
    } else if (req.entityType === 'deal') {
      dealRepository.create(req.entityData);
    }

    // 2. Mark request as approved
    const updatedRequests = get().requests.map((r) =>
      r.id === id
        ? {
            ...r,
            status: 'approved' as ApprovalStatus,
            reviewedById: reviewerId,
            reviewedByName: reviewerName,
            reviewNote: reviewNote || 'Approved by Manager',
            reviewedAt: new Date().toISOString(),
          }
        : r
    );

    storage.setItem(STORAGE_KEYS.APPROVALS, updatedRequests);
    set({ requests: updatedRequests });

    // 3. Notify Submitter
    notificationRepository.create({
      userId: req.submittedById,
      title: `Approval Granted: ${req.title}`,
      message: `${reviewerName} approved your ${req.entityType}. It has been published to live CRM data.`,
      type: 'conversion',
      read: false,
      link: req.entityType === 'customer' ? '/customers' : req.entityType === 'lead' ? '/leads' : '/deals',
    });

    activityRepository.logActivity({
      type: 'deal_stage_changed',
      title: `Approved: ${req.title}`,
      description: `Approved by Manager ${reviewerName}. Note: ${reviewNote || 'Approved.'}`,
      entityType: req.entityType,
      entityId: req.id,
      entityName: req.title,
      performedById: reviewerId,
      performedByName: reviewerName,
    });

    return true;
  },

  rejectRequest: (id, reviewerId, reviewerName, reviewNote) => {
    const req = get().requests.find((r) => r.id === id);
    if (!req || req.status !== 'pending') return false;

    const updatedRequests = get().requests.map((r) =>
      r.id === id
        ? {
            ...r,
            status: 'rejected' as ApprovalStatus,
            reviewedById: reviewerId,
            reviewedByName: reviewerName,
            reviewNote: reviewNote || 'Rejected by Manager',
            reviewedAt: new Date().toISOString(),
          }
        : r
    );

    storage.setItem(STORAGE_KEYS.APPROVALS, updatedRequests);
    set({ requests: updatedRequests });

    // Notify Submitter
    notificationRepository.create({
      userId: req.submittedById,
      title: `Approval Rejected: ${req.title}`,
      message: `${reviewerName} requested revisions: "${reviewNote}"`,
      type: 'system',
      read: false,
      link: '/approvals',
    });

    return true;
  },

  setFilterStatus: (filterStatus) => set({ filterStatus }),
  setFilterType: (filterType) => set({ filterType }),
  getPendingCount: () => get().requests.filter((r) => r.status === 'pending').length,
}));
