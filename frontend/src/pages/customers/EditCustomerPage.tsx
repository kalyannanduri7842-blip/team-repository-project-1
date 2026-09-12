import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCustomerStore, useNotificationStore } from '../../store';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { ArrowLeft, Building2, Heart, MapPin } from 'lucide-react';
import { mockUsers } from '../../data/mock/mockUsers';

const customerEditSchema = z.object({
  name: z.string().min(2, 'Account name is required'),
  company: z.string().min(2, 'Company name is required'),
  email: z.string().email('Valid email is required'),
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
  ownerId: z.string().min(1),
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

type CustomerEditFormData = z.infer<typeof customerEditSchema>;

export const EditCustomerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCustomerById, updateCustomer } = useCustomerStore();
  const showSuccess = useNotificationStore((s) => s.showSuccess);

  const customer = getCustomerById(id || '');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CustomerEditFormData>({
    resolver: zodResolver(customerEditSchema),
  });

  useEffect(() => {
    if (customer) {
      reset({
        name: customer.name,
        company: customer.company,
        email: customer.email,
        phone: customer.phone,
        website: customer.website || '',
        industry: customer.industry,
        tier: customer.tier,
        status: customer.status,
        healthScore: customer.healthScore,
        relationshipScore: customer.relationshipScore,
        annualRevenue: customer.annualRevenue,
        lifetimeValue: customer.lifetimeValue,
        ownerId: customer.ownerId,
        companySize: customer.companySize,
        street: customer.address?.street || '',
        city: customer.address?.city || '',
        state: customer.address?.state || '',
        postalCode: customer.address?.postalCode || '',
        country: customer.address?.country || 'United States',
        billingContactName: customer.billingContact?.name || '',
        billingContactEmail: customer.billingContact?.email || '',
        billingContactPhone: customer.billingContact?.phone || '',
        tags: customer.tags?.join(', ') || '',
      });
    }
  }, [customer, reset]);

  if (!customer) {
    return (
      <div className="text-center py-12">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">Customer Not Found</h2>
        <Button className="mt-4" onClick={() => navigate('/customers')}>
          Back to Customers
        </Button>
      </div>
    );
  }

  const onSubmit = async (data: CustomerEditFormData) => {
    const owner = mockUsers.find((u) => u.id === data.ownerId) || mockUsers[0];
    const tagsArray = data.tags ? data.tags.split(',').map((t) => t.trim()).filter(Boolean) : [];

    updateCustomer(customer.id, {
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
    });

    showSuccess(`Customer account "${data.name}" updated successfully!`);
    navigate(`/customers/${customer.id}`);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-3">
        <Link
          to={`/customers/${customer.id}`}
          className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Edit Customer: {customer.name}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Update account metadata, tier assignment, and headquarters information.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Account Details */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-forest-700" />
            <span>Account Details</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Account Name *" {...register('name')} error={errors.name?.message} />
            <Input label="Legal Company *" {...register('company')} error={errors.company?.message} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input label="Email *" type="email" {...register('email')} error={errors.email?.message} />
            <Input label="Phone *" {...register('phone')} error={errors.phone?.message} />
            <Input label="Website" {...register('website')} />
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
              label="Tier"
              {...register('tier')}
              options={[
                { value: 'Enterprise', label: 'Enterprise' },
                { value: 'Mid-Market', label: 'Mid-Market' },
                { value: 'Growth', label: 'Growth' },
                { value: 'Starter', label: 'Starter' },
              ]}
            />
            <Select
              label="Status"
              {...register('status')}
              options={[
                { value: 'active', label: 'Active' },
                { value: 'onboarding', label: 'Onboarding' },
                { value: 'churn_risk', label: 'Churn Risk' },
                { value: 'dormant', label: 'Dormant' },
                { value: 'churned', label: 'Churned' },
              ]}
            />
          </div>
        </div>

        {/* Health & Valuation */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            <Heart className="w-4 h-4 text-emerald-500" />
            <span>Health & Relationship</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Input label="Health Score (0-100)" type="number" {...register('healthScore', { valueAsNumber: true })} />
            <Input label="Relationship Score" type="number" {...register('relationshipScore', { valueAsNumber: true })} />
            <Input label="Lifetime Value ($)" type="number" {...register('lifetimeValue', { valueAsNumber: true })} />
            <Select
              label="Owner"
              {...register('ownerId')}
              options={mockUsers.map((u) => ({ value: u.id, label: `${u.name} (${u.role})` }))}
            />
          </div>

          <Input label="Tags" {...register('tags')} />
        </div>

        {/* Address */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-forest-700" />
            <span>Address & Billing</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input label="Street" {...register('street')} />
            <Input label="City" {...register('city')} />
            <Input label="State" {...register('state')} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input label="Billing Contact Name" {...register('billingContactName')} />
            <Input label="Billing Contact Email" type="email" {...register('billingContactEmail')} />
            <Input label="Billing Phone" {...register('billingContactPhone')} />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={() => navigate(`/customers/${customer.id}`)}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};
