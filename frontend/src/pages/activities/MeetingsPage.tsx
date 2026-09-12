import React, { useState } from 'react';
import { Calendar, Plus, Trash2, Clock, MapPin, Users, ExternalLink, Video } from 'lucide-react';
import { useActivityStore, useCustomerStore, useNotificationStore, useAuthStore } from '../../store';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { formatDate } from '../../utils/formatters';

export const MeetingsPage: React.FC = () => {
  const { meetings, addMeeting, deleteMeeting } = useActivityStore();
  const customers = useCustomerStore((s) => s.customers);
  const user = useAuthStore((s) => s.user);
  const showSuccess = useNotificationStore((s) => s.showSuccess);

  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [meetingType, setMeetingType] = useState<any>('demo');
  const [customerId, setCustomerId] = useState(customers[0]?.id || '');
  const [startDate, setStartDate] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0] + 'T14:00');
  const [endDate, setEndDate] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0] + 'T15:00');
  const [location, setLocation] = useState('Google Meet');

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const cust = customers.find((c) => c.id === customerId) || customers[0];

    addMeeting({
      title,
      description: description || 'Commercial alignment and product demonstration.',
      meetingType,
      participants: [
        { name: user?.name || 'Sarah Chen', email: user?.email || 'sales@nexora.demo', role: 'Host' },
        { name: cust?.name || 'Client Lead', email: cust?.email || 'client@example.com', role: 'Participant' },
      ],
      relatedToType: 'customer',
      relatedToId: cust?.id || 'cust_default',
      relatedToName: cust?.name || 'Client Account',
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      location,
      meetingUrl: location.includes('http') ? location : 'https://meet.google.com/nex-crm-sync',
      status: 'scheduled',
      ownerId: user?.id || 'usr_sales',
      ownerName: user?.name || 'Sarah Chen',
    });

    showSuccess(`Meeting "${title}" scheduled successfully!`);
    setTitle('');
    setDescription('');
    setIsScheduleModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <Calendar className="w-6 h-6 text-forest-700" />
            <span>Meetings & Executive Calendar</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Schedule product demonstrations, architectural reviews, and quarterly strategic syncs.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsScheduleModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Schedule Meeting
        </Button>
      </div>

      {/* Meetings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meetings.length === 0 ? (
          <div className="col-span-3 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-12 text-center text-xs text-slate-400">
            No meetings currently scheduled.
          </div>
        ) : (
          meetings.map((m) => (
            <div
              key={m.id}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-xs flex flex-col justify-between hover:border-peach-400/50 transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <Badge variant="primary" size="sm">
                    {m.meetingType.replace('_', ' ').toUpperCase()}
                  </Badge>
                  <Badge variant={m.status === 'scheduled' ? 'info' : 'success'} size="sm" dot>
                    {m.status}
                  </Badge>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1 leading-snug">
                  {m.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
                  {m.description || 'Client discussion and demo.'}
                </p>

                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                    <span>{new Date(m.startDate).toLocaleDateString()} at {new Date(m.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                    <span className="truncate">{m.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{m.participants.length} Participants</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                {m.meetingUrl ? (
                  <a
                    href={m.meetingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-forest-800 dark:text-peach-400 flex items-center gap-1 hover:underline"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Join Meeting</span>
                  </a>
                ) : (
                  <span className="text-xs text-slate-400">In Person</span>
                )}

                <button
                  onClick={() => {
                    deleteMeeting(m.id);
                    showSuccess('Meeting removed');
                  }}
                  className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
                  title="Cancel Meeting"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Schedule Modal */}
      <Modal isOpen={isScheduleModalOpen} onClose={() => setIsScheduleModalOpen(false)} title="Schedule New Meeting">
        <form onSubmit={handleSchedule} className="space-y-4">
          <Input
            label="Meeting Subject *"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Q4 Executive Business Review"
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Meeting Type"
              value={meetingType}
              onChange={(e) => setMeetingType(e.target.value as any)}
              options={[
                { value: 'demo', label: 'Product Demonstration' },
                { value: 'discovery', label: 'Technical Discovery' },
                { value: 'quarterly_review', label: 'Quarterly Review (QBR)' },
                { value: 'negotiation', label: 'Contract Negotiation' },
                { value: 'check_in', label: 'Customer Check-in' },
              ]}
            />
            <Select
              label="Related Account"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              options={customers.map((c) => ({ value: c.id, label: c.name }))}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Start Date & Time"
              type="datetime-local"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Input
              label="End Date & Time"
              type="datetime-local"
              required
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <Input
            label="Location / Meeting Link"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Google Meet (https://meet.google.com/xxx)"
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsScheduleModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Schedule Meeting
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
