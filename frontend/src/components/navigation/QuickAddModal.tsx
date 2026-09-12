import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { useLeadStore, useCustomerStore, useDealStore, useTaskStore, useActivityStore, useNotificationStore, useAuthStore } from '../../store';
import { Users, Building2, Briefcase, CheckSquare, PhoneCall, Calendar } from 'lucide-react';
import { IndustryType, LeadSource, DealStage, TaskPriority } from '../../types';

export interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'lead' | 'customer' | 'deal' | 'task' | 'call' | 'meeting';
}

export const QuickAddModal: React.FC<QuickAddModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'lead',
}) => {
  const [activeTab, setActiveTab] = useState<'lead' | 'customer' | 'deal' | 'task' | 'call' | 'meeting'>(defaultTab);
  const user = useAuthStore((s) => s.user);
  const showSuccess = useNotificationStore((s) => s.showSuccess);

  // Stores
  const addLead = useLeadStore((s) => s.addLead);
  const addCustomer = useCustomerStore((s) => s.addCustomer);
  const customers = useCustomerStore((s) => s.customers);
  const addDeal = useDealStore((s) => s.addDeal);
  const addTask = useTaskStore((s) => s.addTask);
  const addCall = useActivityStore((s) => s.addCall);
  const addMeeting = useActivityStore((s) => s.addMeeting);

  // Form States
  // Lead
  const [leadForm, setLeadForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    source: 'website' as LeadSource,
    industry: 'Software & Technology' as IndustryType,
    estimatedValue: 50000,
  });

  // Customer
  const [custForm, setCustForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    industry: 'Software & Technology' as IndustryType,
    tier: 'Enterprise' as const,
  });

  // Deal
  const [dealForm, setDealForm] = useState({
    title: '',
    customerId: customers[0]?.id || '',
    amount: 75000,
    stage: 'qualified' as DealStage,
    expectedCloseDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
  });

  // Task
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    priority: 'high' as TaskPriority,
    dueDate: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
  });

  // Call
  const [callForm, setCallForm] = useState({
    contactName: '',
    phoneNumber: '',
    durationSeconds: 300,
    outcome: 'connected_positive' as const,
    notes: '',
  });

  // Meeting
  const [meetForm, setMeetForm] = useState({
    title: '',
    startDate: new Date(Date.now() + 86400000).toISOString().split('T')[0] + 'T14:00',
    endDate: new Date(Date.now() + 86400000).toISOString().split('T')[0] + 'T15:00',
    location: 'Google Meet',
  });

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.firstName || !leadForm.lastName || !leadForm.email || !leadForm.company) return;

    addLead({
      firstName: leadForm.firstName,
      lastName: leadForm.lastName,
      fullName: `${leadForm.firstName} ${leadForm.lastName}`,
      email: leadForm.email,
      phone: leadForm.phone || '+1 (555) 000-1122',
      company: leadForm.company,
      jobTitle: leadForm.jobTitle || 'Decision Maker',
      source: leadForm.source,
      status: 'new',
      score: 75,
      ownerId: user?.id || 'usr_sales',
      ownerName: user?.name || 'Sarah Chen',
      ownerAvatar: user?.avatar,
      industry: leadForm.industry,
      companySize: '51-200',
      estimatedValue: Number(leadForm.estimatedValue),
      tags: ['Quick Added'],
    });

    showSuccess(`Lead "${leadForm.firstName} ${leadForm.lastName}" created successfully`);
    onClose();
  };

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custForm.name || !custForm.email) return;

    addCustomer({
      name: custForm.name,
      company: custForm.company || custForm.name,
      email: custForm.email,
      phone: custForm.phone || '+1 (555) 333-4455',
      industry: custForm.industry,
      tier: custForm.tier,
      status: 'active',
      healthScore: 90,
      relationshipScore: 85,
      ownerId: user?.id || 'usr_sales',
      ownerName: user?.name || 'Sarah Chen',
      ownerAvatar: user?.avatar,
      companySize: '201-500',
      lifetimeValue: 100000,
      openDealsCount: 0,
      totalDealsValue: 0,
      pendingTasksCount: 0,
      tags: ['New Customer'],
      lastContactedAt: new Date().toISOString(),
    });

    showSuccess(`Customer "${custForm.name}" created successfully`);
    onClose();
  };

  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealForm.title) return;

    const selectedCust = customers.find((c) => c.id === dealForm.customerId) || customers[0];

    addDeal({
      title: dealForm.title,
      customerId: selectedCust?.id || 'cust_default',
      customerName: selectedCust?.name || 'Acme Technologies Inc.',
      customerCompany: selectedCust?.company || 'Acme Technologies',
      amount: Number(dealForm.amount),
      currency: 'USD',
      stage: dealForm.stage,
      probability: dealForm.stage === 'won' ? 100 : 50,
      expectedCloseDate: dealForm.expectedCloseDate,
      ownerId: user?.id || 'usr_sales',
      ownerName: user?.name || 'Sarah Chen',
      ownerAvatar: user?.avatar,
      priority: 'high',
      products: [
        {
          id: `prod_${Date.now()}`,
          name: 'Core Platform Suite',
          quantity: 1,
          unitPrice: Number(dealForm.amount),
          totalPrice: Number(dealForm.amount),
        },
      ],
      tags: ['Quick Deal'],
    });

    showSuccess(`Deal "${dealForm.title}" created successfully`);
    onClose();
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskForm.title) return;

    addTask({
      title: taskForm.title,
      description: taskForm.description || 'Action item created via Quick Add.',
      status: 'todo',
      priority: taskForm.priority,
      dueDate: new Date(taskForm.dueDate).toISOString(),
      assigneeId: user?.id || 'usr_sales',
      assigneeName: user?.name || 'Sarah Chen',
      assigneeAvatar: user?.avatar,
      creatorId: user?.id || 'usr_sales',
      creatorName: user?.name || 'Sarah Chen',
      tags: ['Quick Task'],
    });

    showSuccess(`Task "${taskForm.title}" created successfully`);
    onClose();
  };

  const handleCreateCall = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callForm.contactName) return;

    addCall({
      contactName: callForm.contactName,
      contactType: 'lead',
      contactId: `lead_${Date.now()}`,
      phoneNumber: callForm.phoneNumber || '+1 (555) 999-0000',
      date: new Date().toISOString(),
      durationSeconds: Number(callForm.durationSeconds),
      outcome: callForm.outcome,
      notes: callForm.notes || 'Quick logged call.',
      ownerId: user?.id || 'usr_sales',
      ownerName: user?.name || 'Sarah Chen',
    });

    showSuccess(`Call with "${callForm.contactName}" logged successfully`);
    onClose();
  };

  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetForm.title) return;

    addMeeting({
      title: meetForm.title,
      meetingType: 'demo',
      participants: [{ name: user?.name || 'Sarah Chen', email: user?.email || 'sales@nexora.demo' }],
      relatedToType: 'customer',
      relatedToId: customers[0]?.id || 'cust_201',
      relatedToName: customers[0]?.name || 'Acme Technologies Inc.',
      startDate: new Date(meetForm.startDate).toISOString(),
      endDate: new Date(meetForm.endDate).toISOString(),
      location: meetForm.location,
      status: 'scheduled',
      ownerId: user?.id || 'usr_sales',
      ownerName: user?.name || 'Sarah Chen',
    });

    showSuccess(`Meeting "${meetForm.title}" scheduled`);
    onClose();
  };

  const tabs = [
    { id: 'lead', label: 'Lead', icon: <Users className="w-4 h-4" /> },
    { id: 'customer', label: 'Customer', icon: <Building2 className="w-4 h-4" /> },
    { id: 'deal', label: 'Deal', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'task', label: 'Task', icon: <CheckSquare className="w-4 h-4" /> },
    { id: 'call', label: 'Log Call', icon: <PhoneCall className="w-4 h-4" /> },
    { id: 'meeting', label: 'Meeting', icon: <Calendar className="w-4 h-4" /> },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Quick Create Record" size="lg">
      <div className="flex flex-col gap-6">
        {/* Tab Buttons */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-slate-900 text-forest-800 dark:text-peach-400 shadow-xs font-semibold'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Lead Form */}
        {activeTab === 'lead' && (
          <form onSubmit={handleCreateLead} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="First Name"
                required
                value={leadForm.firstName}
                onChange={(e) => setLeadForm({ ...leadForm, firstName: e.target.value })}
                placeholder="e.g. Rachel"
              />
              <Input
                label="Last Name"
                required
                value={leadForm.lastName}
                onChange={(e) => setLeadForm({ ...leadForm, lastName: e.target.value })}
                placeholder="e.g. Zimmerman"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Company"
                required
                value={leadForm.company}
                onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                placeholder="e.g. Apex BioTech"
              />
              <Input
                label="Job Title"
                value={leadForm.jobTitle}
                onChange={(e) => setLeadForm({ ...leadForm, jobTitle: e.target.value })}
                placeholder="e.g. VP of Operations"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Work Email"
                type="email"
                required
                value={leadForm.email}
                onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                placeholder="rachel@apexbiotech.com"
              />
              <Input
                label="Phone Number"
                value={leadForm.phone}
                onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                placeholder="+1 (555) 234-9988"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Lead Source"
                value={leadForm.source}
                onChange={(e) => setLeadForm({ ...leadForm, source: e.target.value as any })}
                options={[
                  { value: 'website', label: 'Website Inbound' },
                  { value: 'referral', label: 'Referral' },
                  { value: 'social_media', label: 'LinkedIn / Social' },
                  { value: 'email_campaign', label: 'Email Outreach' },
                  { value: 'event', label: 'Event / Conference' },
                ]}
              />
              <Input
                label="Estimated Deal Value ($)"
                type="number"
                value={leadForm.estimatedValue}
                onChange={(e) => setLeadForm({ ...leadForm, estimatedValue: Number(e.target.value) })}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save Lead
              </Button>
            </div>
          </form>
        )}

        {/* Customer Form */}
        {activeTab === 'customer' && (
          <form onSubmit={handleCreateCustomer} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Account / Company Name"
                required
                value={custForm.name}
                onChange={(e) => setCustForm({ ...custForm, name: e.target.value })}
                placeholder="e.g. Apex BioTech Inc."
              />
              <Input
                label="Primary Contact Email"
                type="email"
                required
                value={custForm.email}
                onChange={(e) => setCustForm({ ...custForm, email: e.target.value })}
                placeholder="contact@apexbiotech.com"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Industry"
                value={custForm.industry}
                onChange={(e) => setCustForm({ ...custForm, industry: e.target.value as any })}
                options={[
                  { value: 'Software & Technology', label: 'Software & Technology' },
                  { value: 'Healthcare & Life Sciences', label: 'Healthcare & Life Sciences' },
                  { value: 'Financial Services', label: 'Financial Services' },
                  { value: 'Manufacturing', label: 'Manufacturing' },
                  { value: 'Logistics & Supply Chain', label: 'Logistics & Supply Chain' },
                ]}
              />
              <Select
                label="Tier"
                value={custForm.tier}
                onChange={(e) => setCustForm({ ...custForm, tier: e.target.value as any })}
                options={[
                  { value: 'Enterprise', label: 'Enterprise' },
                  { value: 'Mid-Market', label: 'Mid-Market' },
                  { value: 'Growth', label: 'Growth' },
                  { value: 'Starter', label: 'Starter' },
                ]}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save Customer
              </Button>
            </div>
          </form>
        )}

        {/* Deal Form */}
        {activeTab === 'deal' && (
          <form onSubmit={handleCreateDeal} className="space-y-4">
            <Input
              label="Deal Title"
              required
              value={dealForm.title}
              onChange={(e) => setDealForm({ ...dealForm, title: e.target.value })}
              placeholder="e.g. Apex BioTech Annual Platform License"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Related Customer"
                value={dealForm.customerId}
                onChange={(e) => setDealForm({ ...dealForm, customerId: e.target.value })}
                options={customers.map((c) => ({ value: c.id, label: c.name }))}
              />
              <Input
                label="Deal Amount ($)"
                type="number"
                required
                value={dealForm.amount}
                onChange={(e) => setDealForm({ ...dealForm, amount: Number(e.target.value) })}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Initial Stage"
                value={dealForm.stage}
                onChange={(e) => setDealForm({ ...dealForm, stage: e.target.value as any })}
                options={[
                  { value: 'new', label: 'Discovery / New' },
                  { value: 'qualified', label: 'Qualified' },
                  { value: 'proposal', label: 'Proposal Sent' },
                  { value: 'negotiation', label: 'Negotiation' },
                ]}
              />
              <Input
                label="Expected Close Date"
                type="date"
                required
                value={dealForm.expectedCloseDate}
                onChange={(e) => setDealForm({ ...dealForm, expectedCloseDate: e.target.value })}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Create Deal
              </Button>
            </div>
          </form>
        )}

        {/* Task Form */}
        {activeTab === 'task' && (
          <form onSubmit={handleCreateTask} className="space-y-4">
            <Input
              label="Task Title"
              required
              value={taskForm.title}
              onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
              placeholder="e.g. Prepare Security & SLA Document for review"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Priority"
                value={taskForm.priority}
                onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value as any })}
                options={[
                  { value: 'urgent', label: 'Urgent' },
                  { value: 'high', label: 'High' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'low', label: 'Low' },
                ]}
              />
              <Input
                label="Due Date"
                type="date"
                required
                value={taskForm.dueDate}
                onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
              />
            </div>
            <Input
              label="Description / Context"
              value={taskForm.description}
              onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
              placeholder="Add details, links, or specific deliverables..."
            />

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save Task
              </Button>
            </div>
          </form>
        )}

        {/* Call Form */}
        {activeTab === 'call' && (
          <form onSubmit={handleCreateCall} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Contact Name"
                required
                value={callForm.contactName}
                onChange={(e) => setCallForm({ ...callForm, contactName: e.target.value })}
                placeholder="e.g. Dr. Arthur Sterling"
              />
              <Input
                label="Phone Number"
                value={callForm.phoneNumber}
                onChange={(e) => setCallForm({ ...callForm, phoneNumber: e.target.value })}
                placeholder="+1 (555) 888-9900"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Outcome"
                value={callForm.outcome}
                onChange={(e) => setCallForm({ ...callForm, outcome: e.target.value as any })}
                options={[
                  { value: 'connected_positive', label: 'Connected - Positive Interest' },
                  { value: 'connected_neutral', label: 'Connected - Follow-up Needed' },
                  { value: 'left_voicemail', label: 'Left Voicemail' },
                  { value: 'follow_up_scheduled', label: 'Follow-up Scheduled' },
                ]}
              />
              <Input
                label="Duration (seconds)"
                type="number"
                value={callForm.durationSeconds}
                onChange={(e) => setCallForm({ ...callForm, durationSeconds: Number(e.target.value) })}
              />
            </div>
            <Input
              label="Call Notes Summary"
              value={callForm.notes}
              onChange={(e) => setCallForm({ ...callForm, notes: e.target.value })}
              placeholder="Key points discussed during call..."
            />

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Log Call
              </Button>
            </div>
          </form>
        )}

        {/* Meeting Form */}
        {activeTab === 'meeting' && (
          <form onSubmit={handleCreateMeeting} className="space-y-4">
            <Input
              label="Meeting Subject"
              required
              value={meetForm.title}
              onChange={(e) => setMeetForm({ ...meetForm, title: e.target.value })}
              placeholder="e.g. Executive Architecture & Demo Session"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Start Date & Time"
                type="datetime-local"
                required
                value={meetForm.startDate}
                onChange={(e) => setMeetForm({ ...meetForm, startDate: e.target.value })}
              />
              <Input
                label="End Date & Time"
                type="datetime-local"
                required
                value={meetForm.endDate}
                onChange={(e) => setMeetForm({ ...meetForm, endDate: e.target.value })}
              />
            </div>
            <Input
              label="Location / Meeting URL"
              value={meetForm.location}
              onChange={(e) => setMeetForm({ ...meetForm, location: e.target.value })}
              placeholder="e.g. Google Meet (https://meet.google.com/xxx)"
            />

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Schedule Meeting
              </Button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};
