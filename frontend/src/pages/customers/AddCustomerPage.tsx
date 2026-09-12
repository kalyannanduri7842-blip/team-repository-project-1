import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCustomerStore, useAuthStore, useNotificationStore } from '../../store';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { ArrowLeft, Building2, MapPin, DollarSign, Heart, Tag } from 'lucide-react';
import { mockUsers } from '../../data/mock/mockUsers';

const customerSchema = z.object({
  name: z.string().min(2, 'Customer account name is required'),
  company: z.string().min(2, 'Company name is required'),
  email: z.string().email('Valid business email is required'),
  phone: z.string().min(6, 'Valid phone number is required'),
  website: z.string().optional().or(z.literal('')),
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
  tier: z.enum(['Enterprise', 'Mid-Market', 'Growth', 'Starter']),
  status: z.enum(['active', 'onboarding', 'churn_risk', 'dormant', 'churned']),
  healthScore: z.number().min(0).max(100),
  relationshipScore: z.number().min(0).max(100),
  annualRevenue: z.number().min(0).optional(),
  lifetimeValue: z.number().min(0),
  ownerId: z.string().min(1, 'Please select an account owner'),
  companySize: z.enum(['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+']),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  billingContactName: z.string().optional(),
  billingContactEmail: z.string().optional(),
  billingContactPhone: z.string().optional(),
  tags: z.string().optional(),
});

type CustomerFormData = z.infer<typeof customerSchema>;

export const AddCustomerPage: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const addCustomer = useCustomerStore((s) => s.addCustomer);
  const showSuccess = useNotificationStore((s) => s.showSuccess);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      website: '',
      industry: 'Software & Technology',
      tier: 'Enterprise',
      status: 'active',
      healthScore: 90,
      relationshipScore: 85,
      annualRevenue: 25000000,
      lifetimeValue: 120000,
      ownerId: user?.id || 'usr_sales',
      companySize: '201-500',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'United States',
      billingContactName: '',
      billingContactEmail: '',
      billingContactPhone: '',
      tags: 'Strategic Account, Key Customer',
    },
  });

  const onSubmit = async (data: CustomerFormData) => {
    const owner = mockUsers.find((u) => u.id === data.ownerId) || user || mockUsers[0];
    const tagsArray = data.tags ? data.tags.split(',').map((t) => t.trim()).filter(Boolean) : [];

    const newCust = addCustomer({
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      website: data.website || undefined,
      industry: data.industry,
      tier: data.tier,
      status: data.status,
      healthScore: Number(data.healthScore),
      relationshipScore: Number(data.relationshipScore),
      ownerId: owner.id,
      ownerName: owner.name,
      ownerAvatar: owner.avatar,
      companySize: data.companySize,
      annualRevenue: data.annualRevenue ? Number(data.annualRevenue) : undefined,
      lifetimeValue: Number(data.lifetimeValue),
      openDealsCount: 0,
      totalDealsValue: 0,
      pendingTasksCount: 0,
      address: data.street
        ? {
            street: data.street,
            city: data.city || '',
            state: data.state || '',
            postalCode: data.postalCode || '',
            country: data.country || 'United States',
          }
        : undefined,
      billingContact: data.billingContactName
        ? {
            name: data.billingContactName,
            email: data.billingContactEmail || '',
            phone: data.billingContactPhone || '',
          }
        : undefined,
      tags: tagsArray,
      lastContactedAt: new Date().toISOString(),
    });

    showSuccess(`Customer account "${newCust.name}" created successfully!`);
    navigate(`/customers/${newCust.id}`);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-3">
        <Link
          to="/customers"
          className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Create Customer Account
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Register a company account, establish health baseline, and setup billing profile.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Account Essentials */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-forest-700" />
            <span>Account Details</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Account / Brand Name *"
              placeholder="e.g. Cobalt Robotics AI Inc."
              {...register('name')}
              error={errors.name?.message}
            />
            <Input
              label="Legal Company Name *"
              placeholder="e.g. Cobalt Robotics Inc."
              {...register('company')}
              error={errors.company?.message}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Primary Email *"
              type="email"
              placeholder="ops@cobaltrobotics.ai"
              {...register('email')}
              error={errors.email?.message}
            />
            <Input
              label="Phone Number *"
              placeholder="+1 (555) 890-1234"
              {...register('phone')}
              error={errors.phone?.message}
            />
            <Input
              label="Website"
              placeholder="https://cobaltrobotics.ai"
              {...register('website')}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="Industry"
              {...register('industry')}
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
              label="Customer Tier"
              {...register('tier')}
              options={[
                { value: 'Enterprise', label: 'Enterprise' },
                { value: 'Mid-Market', label: 'Mid-Market' },
                { value: 'Growth', label: 'Growth' },
                { value: 'Starter', label: 'Starter' },
              ]}
            />
            <Select
              label="Initial Status"
              {...register('status')}
              options={[
                { value: 'active', label: 'Active Customer' },
                { value: 'onboarding', label: 'In Onboarding' },
                { value: 'churn_risk', label: 'Churn Risk' },
                { value: 'dormant', label: 'Dormant' },
              ]}
            />
          </div>
        </div>

        {/* Health & Value Metrics */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            <Heart className="w-4 h-4 text-emerald-500" />
            <span>Health & Relationship Metrics</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Input
              label="Health Score (0-100)"
              type="number"
              {...register('healthScore', { valueAsNumber: true })}
            />
            <Input
              label="Relationship Index (0-100)"
              type="number"
              {...register('relationshipScore', { valueAsNumber: true })}
            />
            <Input
              label="Lifetime Value ($)"
              type="number"
              {...register('lifetimeValue', { valueAsNumber: true })}
            />
            <Select
              label="Account Owner"
              {...register('ownerId')}
              options={mockUsers.map((u) => ({ value: u.id, label: `${u.name} (${u.role})` }))}
            />
          </div>

          <Input
            label="Tags (Comma-separated)"
            placeholder="Strategic, High Engagement, SOC2"
            {...register('tags')}
          />
        </div>

        {/* Corporate Address & Billing */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-forest-700" />
            <span>Headquarters & Billing Contact</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input label="Street Address" placeholder="100 Technology Way" {...register('street')} />
            <Input label="City" placeholder="San Francisco" {...register('city')} />
            <Input label="State / Province" placeholder="CA" {...register('state')} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input label="Billing Contact Name" placeholder="Victoria Vance" {...register('billingContactName')} />
            <Input label="Billing Email" type="email" placeholder="billing@company.com" {...register('billingContactEmail')} />
            <Input label="Billing Phone" placeholder="+1 (555) 000-1122" {...register('billingContactPhone')} />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={() => navigate('/customers')}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            Save Customer Account
          </Button>
        </div>
      </form>
    </div>
  );
};
