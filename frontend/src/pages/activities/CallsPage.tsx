import React, { useState } from 'react';
import { PhoneCall, Plus, Trash2, Calendar, Clock, User, Filter, Search } from 'lucide-react';
import { useActivityStore, useNotificationStore, useAuthStore } from '../../store';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { formatDuration, formatDate } from '../../utils/formatters';

export const CallsPage: React.FC = () => {
  const { calls, addCall, deleteCall } = useActivityStore();
  const user = useAuthStore((s) => s.user);
  const showSuccess = useNotificationStore((s) => s.showSuccess);

  const [search, setSearch] = useState('');
  const [outcomeFilter, setOutcomeFilter] = useState('all');
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  // New call form
  const [contactName, setContactName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [durationSeconds, setDurationSeconds] = useState(300);
  const [outcome, setOutcome] = useState<any>('connected_positive');
  const [notes, setNotes] = useState('');

  const filteredCalls = calls.filter((c) => {
    if (outcomeFilter !== 'all' && c.outcome !== outcomeFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        c.contactName.toLowerCase().includes(q) ||
        c.phoneNumber.toLowerCase().includes(q) ||
        c.notes.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleLogCall = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName) return;

    addCall({
      contactName,
      contactType: 'lead',
      contactId: `contact_${Date.now()}`,
      phoneNumber: phoneNumber || '+1 (555) 000-1122',
      date: new Date().toISOString(),
      durationSeconds: Number(durationSeconds),
      outcome,
      notes: notes || 'Call logged.',
      ownerId: user?.id || 'usr_sales',
      ownerName: user?.name || 'Sarah Chen',
    });

    showSuccess(`Call with ${contactName} logged successfully`);
    setContactName('');
    setPhoneNumber('');
    setNotes('');
    setIsLogModalOpen(false);
  };

  const getOutcomeBadge = (out: string) => {
    switch (out) {
      case 'connected_positive':
        return <Badge variant="success">Connected (Positive)</Badge>;
      case 'connected_neutral':
        return <Badge variant="info">Connected (Neutral)</Badge>;
      case 'left_voicemail':
        return <Badge variant="warning">Left Voicemail</Badge>;
      case 'follow_up_scheduled':
        return <Badge variant="purple">Follow-up Scheduled</Badge>;
      default:
        return <Badge variant="default">{out}</Badge>;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <PhoneCall className="w-6 h-6 text-forest-700" />
            <span>Call Logging Center</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track outbound discovery calls, client syncs, durations, and follow-up outcomes.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsLogModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Log Phone Call
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <select
            value={outcomeFilter}
            onChange={(e) => setOutcomeFilter(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-peach-500"
          >
            <option value="all">All Outcomes</option>
            <option value="connected_positive">Connected (Positive)</option>
            <option value="connected_neutral">Connected (Neutral)</option>
            <option value="left_voicemail">Left Voicemail</option>
            <option value="follow_up_scheduled">Follow-up Scheduled</option>
          </select>
        </div>

        <div className="w-full sm:w-64">
          <Input
            placeholder="Search calls..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
      </div>

      {/* Calls List */}
      <div className="space-y-3">
        {filteredCalls.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-12 text-center text-xs text-slate-400">
            No logged calls match your criteria.
          </div>
        ) : (
          filteredCalls.map((call) => (
            <div
              key={call.id}
              className="p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs flex items-start justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-peach-100 dark:bg-forest-900/60 border border-peach-200 dark:border-forest-900 flex items-center justify-center text-forest-800 dark:text-peach-400 shrink-0 mt-0.5">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {call.contactName}
                    </h3>
                    <span className="text-xs text-slate-400">({call.phoneNumber})</span>
                    {getOutcomeBadge(call.outcome)}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {call.notes}
                  </p>

                  <div className="flex items-center gap-4 text-[10px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Duration: {formatDuration(call.durationSeconds)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(call.date, 'long')}
                    </span>
                    <span>Logged by: {call.ownerName}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  deleteCall(call.id);
                  showSuccess('Call record deleted');
                }}
                className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg transition-colors"
                title="Delete Call"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Log Call Modal */}
      <Modal isOpen={isLogModalOpen} onClose={() => setIsLogModalOpen(false)} title="Log Phone Call">
        <form onSubmit={handleLogCall} className="space-y-4">
          <Input
            label="Contact Name *"
            required
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            placeholder="e.g. Alexander Wright"
          />
          <Input
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+1 (555) 234-8901"
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Call Outcome"
              value={outcome}
              onChange={(e) => setOutcome(e.target.value as any)}
              options={[
                { value: 'connected_positive', label: 'Connected (Positive)' },
                { value: 'connected_neutral', label: 'Connected (Neutral)' },
                { value: 'left_voicemail', label: 'Left Voicemail' },
                { value: 'follow_up_scheduled', label: 'Follow-up Scheduled' },
              ]}
            />
            <Input
              label="Duration (seconds)"
              type="number"
              value={durationSeconds}
              onChange={(e) => setDurationSeconds(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Call Summary & Next Steps
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Key notes and topics discussed..."
              className="block w-full rounded-xl text-sm bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 p-3 focus:outline-none focus:ring-2 focus:ring-peach-500"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsLogModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Call Log
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
