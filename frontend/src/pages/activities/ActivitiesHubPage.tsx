import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PhoneCall,
  Calendar,
  FileText,
  Clock,
  Plus,
  Filter,
  CheckCircle,
  Briefcase,
  Users,
  Building2,
} from 'lucide-react';
import { useActivityStore } from '../../store';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { formatDate } from '../../utils/formatters';

export const ActivitiesHubPage: React.FC = () => {
  const navigate = useNavigate();
  const { activities, activityFilter, setActivityFilter } = useActivityStore();
  const [search, setSearch] = useState('');

  const filtered = activities.filter((act) => {
    if (activityFilter !== 'all' && act.type !== activityFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        act.title.toLowerCase().includes(q) ||
        act.description.toLowerCase().includes(q) ||
        act.entityName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'call':
        return <PhoneCall className="w-4 h-4 text-forest-700" />;
      case 'meeting':
        return <Calendar className="w-4 h-4 text-cyan-500" />;
      case 'note':
        return <FileText className="w-4 h-4 text-amber-500" />;
      case 'deal_stage_changed':
      case 'deal_created':
        return <Briefcase className="w-4 h-4 text-emerald-500" />;
      case 'lead_created':
      case 'lead_converted':
        return <Users className="w-4 h-4 text-purple-500" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <PhoneCall className="w-6 h-6 text-forest-700" />
            <span>Activity Center & Timeline</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Unified chronological audit trail of all team interactions, phone calls, meetings, and pipeline movements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/activities/calls')}
            leftIcon={<PhoneCall className="w-3.5 h-3.5" />}
          >
            Calls Log
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/activities/meetings')}
            leftIcon={<Calendar className="w-3.5 h-3.5" />}
          >
            Calendar
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/activities/notes')}
            leftIcon={<FileText className="w-3.5 h-3.5" />}
          >
            Notes Board
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {['all', 'call', 'meeting', 'note', 'deal_stage_changed', 'lead_converted'].map((t) => (
            <button
              key={t}
              onClick={() => setActivityFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                activityFilter === t
                  ? 'bg-forest-900 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {t.replace(/_/g, ' ')}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-64">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search activities..."
            className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-peach-500"
          />
        </div>
      </div>

      {/* Activity Timeline List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-400">
            No activity matches your search or filter.
          </div>
        ) : (
          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
            {filtered.map((act) => (
              <div key={act.id} className="relative group">
                {/* Dot */}
                <div className="absolute -left-[27px] top-1.5 w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-2 border-peach-400 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-forest-800" />
                </div>

                <div
                  onClick={() => {
                    if (act.entityType === 'lead') navigate(`/leads/${act.entityId}`);
                    else if (act.entityType === 'customer') navigate(`/customers/${act.entityId}`);
                    else if (act.entityType === 'deal') navigate(`/deals/${act.entityId}`);
                  }}
                  className="p-4 rounded-2xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 hover:border-peach-400/50 hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                        {getIcon(act.type)}
                      </div>
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {act.title}
                      </span>
                    </div>

                    <span className="text-[10px] text-slate-400">
                      {formatDate(act.timestamp, 'long')}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed ml-7">
                    {act.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-200/60 dark:border-slate-700/50 ml-7 text-[10px] text-slate-400">
                    <span>
                      Target: <strong className="text-slate-700 dark:text-slate-300">{act.entityName}</strong>
                    </span>
                    <span>Performed by {act.performedByName}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
