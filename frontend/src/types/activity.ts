export type ActivityType =
  | 'call'
  | 'meeting'
  | 'note'
  | 'task_completed'
  | 'deal_stage_changed'
  | 'deal_created'
  | 'lead_created'
  | 'lead_converted'
  | 'customer_created'
  | 'email_sent';

export type CallOutcome =
  | 'connected_positive'
  | 'connected_neutral'
  | 'connected_negative'
  | 'left_voicemail'
  | 'busy'
  | 'wrong_number'
  | 'follow_up_scheduled';

export interface CallLog {
  id: string;
  contactName: string;
  contactType: 'lead' | 'customer';
  contactId: string;
  phoneNumber: string;
  date: string;
  durationSeconds: number; // e.g. 340s
  outcome: CallOutcome;
  notes: string;
  ownerId: string;
  ownerName: string;
  createdAt: string;
}

export type MeetingType = 'discovery' | 'demo' | 'negotiation' | 'quarterly_review' | 'check_in' | 'onboarding';

export interface Meeting {
  id: string;
  title: string;
  description?: string;
  meetingType: MeetingType;
  participants: {
    name: string;
    email: string;
    role?: string;
    avatar?: string;
  }[];
  relatedToType: 'lead' | 'customer' | 'deal';
  relatedToId: string;
  relatedToName: string;
  startDate: string; // ISO
  endDate: string; // ISO
  location: string; // "Google Meet", "Zoom", "Office HQ"
  meetingUrl?: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  outcomeNotes?: string;
  ownerId: string;
  ownerName: string;
  createdAt: string;
}

export interface Note {
  id: string;
  title?: string;
  content: string;
  isPinned: boolean;
  relatedToType: 'lead' | 'customer' | 'deal' | 'task';
  relatedToId: string;
  relatedToName: string;
  tags: string[];
  ownerId: string;
  ownerName: string;
  ownerAvatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  entityType: 'lead' | 'customer' | 'deal' | 'task' | 'call' | 'meeting' | 'note';
  entityId: string;
  entityName: string;
  performedById: string;
  performedByName: string;
  performedByAvatar?: string;
  metadata?: Record<string, any>;
  timestamp: string;
  createdAt?: string;
}
