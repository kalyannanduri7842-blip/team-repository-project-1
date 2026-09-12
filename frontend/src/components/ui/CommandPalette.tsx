import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Users,
  Building2,
  Briefcase,
  CheckSquare,
  FileText,
  Settings,
  PlusCircle,
  Moon,
  Sun,
  Laptop,
  ArrowRight,
} from 'lucide-react';
import { useLeadStore, useCustomerStore, useDealStore, useTaskStore, useSettingsStore } from '../../store';
import { cn } from '../../utils/cn';

interface PaletteItem {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  icon: React.ReactNode;
  action: () => void;
}

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAddLead?: () => void;
  onOpenAddCustomer?: () => void;
  onOpenAddDeal?: () => void;
  onOpenAddTask?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenAddLead,
  onOpenAddCustomer,
  onOpenAddDeal,
  onOpenAddTask,
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const leads = useLeadStore((s) => s.leads);
  const customers = useCustomerStore((s) => s.customers);
  const deals = useDealStore((s) => s.deals);
  const tasks = useTaskStore((s) => s.tasks);
  const { preferences, setTheme } = useSettingsStore();

  // Focus input when palette opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Global key listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Navigation Items
  const navActions: PaletteItem[] = [
    { id: 'nav_dash', title: 'Dashboard', category: 'Navigation', icon: <Building2 className="w-4 h-4" />, action: () => navigate('/dashboard') },
    { id: 'nav_leads', title: 'Leads Pipeline', category: 'Navigation', icon: <Users className="w-4 h-4" />, action: () => navigate('/leads') },
    { id: 'nav_customers', title: 'Customers Directory', category: 'Navigation', icon: <Building2 className="w-4 h-4" />, action: () => navigate('/customers') },
    { id: 'nav_deals', title: 'Deals & Kanban', category: 'Navigation', icon: <Briefcase className="w-4 h-4" />, action: () => navigate('/deals') },
    { id: 'nav_tasks', title: 'Task Manager', category: 'Navigation', icon: <CheckSquare className="w-4 h-4" />, action: () => navigate('/tasks') },
    { id: 'nav_reports', title: 'Sales & Lead Reports', category: 'Navigation', icon: <FileText className="w-4 h-4" />, action: () => navigate('/reports') },
    { id: 'nav_settings', title: 'System Settings', category: 'Navigation', icon: <Settings className="w-4 h-4" />, action: () => navigate('/settings') },
  ];

  // Quick Create Actions
  const quickActions: PaletteItem[] = [
    { id: 'qa_lead', title: 'Create New Lead', category: 'Quick Action', icon: <PlusCircle className="w-4 h-4 text-forest-700" />, action: () => { if (onOpenAddLead) onOpenAddLead(); else navigate('/leads/new'); } },
    { id: 'qa_customer', title: 'Add New Customer', category: 'Quick Action', icon: <PlusCircle className="w-4 h-4 text-emerald-500" />, action: () => { if (onOpenAddCustomer) onOpenAddCustomer(); else navigate('/customers/new'); } },
    { id: 'qa_deal', title: 'Create Deal', category: 'Quick Action', icon: <PlusCircle className="w-4 h-4 text-amber-500" />, action: () => { if (onOpenAddDeal) onOpenAddDeal(); else navigate('/deals/new'); } },
    { id: 'qa_task', title: 'Create Task', category: 'Quick Action', icon: <PlusCircle className="w-4 h-4 text-purple-500" />, action: () => { if (onOpenAddTask) onOpenAddTask(); else navigate('/tasks'); } },
    { id: 'qa_dark', title: 'Switch to Dark Theme', category: 'Theme', icon: <Moon className="w-4 h-4 text-slate-400" />, action: () => setTheme('dark') },
    { id: 'qa_light', title: 'Switch to Light Theme', category: 'Theme', icon: <Sun className="w-4 h-4 text-amber-400" />, action: () => setTheme('light') },
  ];

  // Search Results across Entities
  const cleanQ = query.trim().toLowerCase();

  const matchingLeads: PaletteItem[] = leads
    .filter((l) => l.fullName.toLowerCase().includes(cleanQ) || l.company.toLowerCase().includes(cleanQ))
    .slice(0, 3)
    .map((l) => ({
      id: l.id,
      title: `${l.fullName} (${l.company})`,
      subtitle: `Lead • ${l.status.toUpperCase()} • Score: ${l.score}`,
      category: 'Leads',
      icon: <Users className="w-4 h-4 text-forest-700" />,
      action: () => navigate(`/leads/${l.id}`),
    }));

  const matchingCustomers: PaletteItem[] = customers
    .filter((c) => c.name.toLowerCase().includes(cleanQ) || c.company.toLowerCase().includes(cleanQ))
    .slice(0, 3)
    .map((c) => ({
      id: c.id,
      title: c.name,
      subtitle: `Customer • ${c.tier} • Health: ${c.healthScore}%`,
      category: 'Customers',
      icon: <Building2 className="w-4 h-4 text-emerald-500" />,
      action: () => navigate(`/customers/${c.id}`),
    }));

  const matchingDeals: PaletteItem[] = deals
    .filter((d) => d.title.toLowerCase().includes(cleanQ) || d.customerName.toLowerCase().includes(cleanQ))
    .slice(0, 3)
    .map((d) => ({
      id: d.id,
      title: d.title,
      subtitle: `Deal • $${d.amount.toLocaleString()} • Stage: ${d.stage.toUpperCase()}`,
      category: 'Deals',
      icon: <Briefcase className="w-4 h-4 text-amber-500" />,
      action: () => navigate(`/deals/${d.id}`),
    }));

  const matchingTasks: PaletteItem[] = tasks
    .filter((t) => t.title.toLowerCase().includes(cleanQ))
    .slice(0, 3)
    .map((t) => ({
      id: t.id,
      title: t.title,
      subtitle: `Task • Priority: ${t.priority.toUpperCase()} • ${t.status}`,
      category: 'Tasks',
      icon: <CheckSquare className="w-4 h-4 text-purple-500" />,
      action: () => navigate('/tasks'),
    }));

  const matchingNav: PaletteItem[] = navActions.filter((n) => n.title.toLowerCase().includes(cleanQ));
  const matchingQuick: PaletteItem[] = quickActions.filter((q) => q.title.toLowerCase().includes(cleanQ));

  const allItems: PaletteItem[] = cleanQ
    ? [...matchingLeads, ...matchingCustomers, ...matchingDeals, ...matchingTasks, ...matchingNav, ...matchingQuick]
    : [...quickActions, ...navActions];

  const handleSelect = (index: number) => {
    const item = allItems[index];
    if (item) {
      item.action();
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < allItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : allItems.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSelect(selectedIndex);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh]"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 shrink-0">
              <Search className="w-5 h-5 text-slate-400 dark:text-slate-500" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or search records..."
                className="w-full bg-transparent border-0 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-0 p-0"
              />
              <span className="hidden sm:inline-flex text-[10px] uppercase font-mono px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded border border-slate-200 dark:border-slate-700">
                ESC
              </span>
            </div>

            {/* Results List */}
            <div className="p-2 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/40">
              {allItems.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-500">
                  No matching results for "{query}"
                </div>
              ) : (
                allItems.map((item, idx) => {
                  const isSelected = selectedIndex === idx;
                  return (
                    <div
                      key={item.id || idx}
                      onClick={() => handleSelect(idx)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={cn(
                        'flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors',
                        isSelected
                          ? 'bg-forest-900 text-white'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={cn(
                            'p-1.5 rounded-lg shrink-0',
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                          )}
                        >
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold truncate leading-tight">{item.title}</p>
                          {'subtitle' in item && item.subtitle && (
                            <p
                              className={cn(
                                'text-[11px] truncate mt-0.5',
                                isSelected ? 'text-peach-100' : 'text-slate-400 dark:text-slate-500'
                              )}
                            >
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={cn(
                            'text-[10px] uppercase font-mono px-2 py-0.5 rounded-full',
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                          )}
                        >
                          {item.category}
                        </span>
                        {isSelected && <ArrowRight className="w-3.5 h-3.5 text-white" />}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer tips */}
            <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
              <span className="font-medium text-slate-400">NEXORA Search</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
