import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLeadStore, useAuthStore, useNotificationStore } from '../../store';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { ArrowLeft, Users, Building, Briefcase, DollarSign, Tag, FileText, CheckCircle2 } from 'lucide-react';
import { mockUsers } from '../../data/mock/mockUsers';

const leadSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please provide a valid business email'),
  phone: z.string().min(6, 'Please enter a valid phone number'),
  company: z.string().min(2, 'Company name is required'),
  jobTitle: z.string().min(2, 'Job title is required'),
  website: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  source: z.enum([
    'website',
    'referral',
    'social_media',
    'email_campaign',
    'advertisement',
    'direct',
    'event',
    'partner',
  ]),
  status: z.enum(['new', 'contacted', 'qualified', 'unqualified', 'converted']),
  score: z.number().min(0).max(100),
  industry: z.enum([
    'Software & Technology',
    'Healthcare & Life Sciences',
    'Financial Services',
    'Manufacturing',
    'Retail & E-commerce',
    'Telecommunications',
    'Consulting & Professional Services',
    'Logistics & Supply Chain',
    'Real Estate',
    'Education',
  ]),
  companySize: z.enum(['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+']),
  estimatedValue: z.number().min(0, 'Estimated value must be positive'),
  ownerId: z.string().min(1, 'Please select an account owner'),
  notesSummary: z.string().optional(),
  tags: z.string().optional(),
});

type LeadFormData = z.infer<typeof leadSchema>;

export const AddLeadPage: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const addLead = useLeadStore((s) => s.addLead);
  const showSuccess = useNotificationStore((s) => s.showSuccess);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      jobTitle: '',
      website: '',
      source: 'website',
      status: 'new',
      score: 75,
      industry: 'Software & Technology',
      companySize: '51-200',
      estimatedValue: 65000,
      ownerId: user?.id || 'usr_sales',
      notesSummary: '',
      tags: 'Hot Lead, SaaS Discovery',
    },
  });

  const onSubmit = async (data: LeadFormData) => {
    const owner = mockUsers.find((u) => u.id === data.ownerId) || user || mockUsers[0];
    const tagsArray = data.tags ? data.tags.split(',').map((t) => t.trim()).filter(Boolean) : [];

    const newLead = addLead({
      firstName: data.firstName,
      lastName: data.lastName,
      fullName: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      company: data.company,
      jobTitle: data.jobTitle,
      website: data.website || undefined,
      source: data.source,
      status: data.status,
      score: Number(data.score),
      ownerId: owner.id,
      ownerName: owner.name,
      ownerAvatar: owner.avatar,
      industry: data.industry,
      companySize: data.companySize,
      estimatedValue: Number(data.estimatedValue),
      notesSummary: data.notesSummary,
      tags: tagsArray,
    });

    showSuccess(`Lead "${newLead.fullName}" created successfully!`);
    navigate(`/leads/${newLead.id}`);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/leads"
            className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Create New Lead
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Fill in the prospect information to begin qualification and pipeline nurturing.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Section 1: Contact Information */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            <Users className="w-4 h-4 text-forest-700" />
            <span>Contact Details</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="First Name *"
              placeholder="e.g. Jordan"
              {...register('firstName')}
              error={errors.firstName?.message}
            />
            <Input
              label="Last Name *"
              placeholder="e.g. Lee"
              {...register('lastName')}
              error={errors.lastName?.message}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Business Email *"
              type="email"
              placeholder="jordan.lee@company.com"
              {...register('email')}
              error={errors.email?.message}
            />
            <Input
              label="Phone Number *"
              placeholder="+1 (555) 432-1098"
              {...register('phone')}
              error={errors.phone?.message}
            />
          </div>
        </div>

        {/* Section 2: Organization & Firmographics */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            <Building className="w-4 h-4 text-forest-700" />
            <span>Company & Organization</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Company Name *"
              placeholder="e.g. Pinnacle Media"
              {...register('company')}
              error={errors.company?.message}
            />
            <Input
              label="Job Title *"
              placeholder="e.g. Director of Infrastructure"
              {...register('jobTitle')}
              error={errors.jobTitle?.message}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Company Website"
              placeholder="https://pinnaclemedia.com"
              {...register('website')}
              error={errors.website?.message}
            />
            <Select
              label="Industry"
              {...register('industry')}
              error={errors.industry?.message}
              options={[
                { value: 'Software & Technology', label: 'Software & Technology' },
                { value: 'Healthcare & Life Sciences', label: 'Healthcare & Life Sciences' },
                { value: 'Financial Services', label: 'Financial Services' },
                { value: 'Manufacturing', label: 'Manufacturing' },
                { value: 'Retail & E-commerce', label: 'Retail & E-commerce' },
                { value: 'Logistics & Supply Chain', label: 'Logistics & Supply Chain' },
                { value: 'Consulting & Professional Services', label: 'Consulting' },
              ]}
            />
            <Select
              label="Company Size"
              {...register('companySize')}
              error={errors.companySize?.message}
              options={[
                { value: '1-10', label: '1-10 employees' },
                { value: '11-50', label: '11-50 employees' },
                { value: '51-200', label: '51-200 employees' },
                { value: '201-500', label: '201-500 employees' },
                { value: '501-1000', label: '501-1000 employees' },
                { value: '1000+', label: '1000+ employees' },
              ]}
            />
          </div>
        </div>

        {/* Section 3: Qualification, Value, & Assignment */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            <Briefcase className="w-4 h-4 text-forest-700" />
            <span>Lead Scoring & Value</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="Lead Source"
              {...register('source')}
              options={[
                { value: 'website', label: 'Website Inbound' },
                { value: 'referral', label: 'Referral' },
                { value: 'social_media', label: 'Social Media / LinkedIn' },
                { value: 'email_campaign', label: 'Email Campaign' },
                { value: 'event', label: 'Event / Conference' },
                { value: 'partner', label: 'Partner Channel' },
                { value: 'direct', label: 'Direct Outreach' },
              ]}
            />
            <Select
              label="Initial Status"
              {...register('status')}
              options={[
                { value: 'new', label: 'New' },
                { value: 'contacted', label: 'Contacted' },
                { value: 'qualified', label: 'Qualified' },
                { value: 'unqualified', label: 'Unqualified' },
              ]}
            />
            <Input
              label="Lead Score (0-100)"
              type="number"
              {...register('score', { valueAsNumber: true })}
              error={errors.score?.message}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Estimated Deal Value ($)"
              type="number"
              {...register('estimatedValue', { valueAsNumber: true })}
              error={errors.estimatedValue?.message}
            />
            <Select
              label="Assigned Account Owner"
              {...register('ownerId')}
              options={mockUsers.map((u) => ({ value: u.id, label: `${u.name} (${u.role})` }))}
            />
          </div>

          <Input
            label="Tags (Comma-separated)"
            placeholder="Hot Lead, Q4 Budget, Enterprise"
            {...register('tags')}
          />

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Discovery Notes & Requirements
            </label>
            <textarea
              {...register('notesSummary')}
              rows={3}
              placeholder="Enter discovery notes, key requirements, competitor mentions..."
              className="block w-full rounded-xl text-sm bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 p-3.5 focus:outline-none focus:ring-2 focus:ring-peach-500/20 focus:border-peach-400"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={() => navigate('/leads')}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            Save & Create Lead
          </Button>
        </div>
      </form>
    </div>
  );
};
