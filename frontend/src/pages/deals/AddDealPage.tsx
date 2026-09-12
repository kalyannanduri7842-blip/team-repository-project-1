import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDealStore, useCustomerStore, useAuthStore, useNotificationStore } from '../../store';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { ArrowLeft, Briefcase, Plus, Trash2, DollarSign, Package } from 'lucide-react';
import { mockUsers } from '../../data/mock/mockUsers';
import { formatCurrency } from '../../utils/formatters';

const productSchema = z.object({
  name: z.string().min(2, 'Product name is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  unitPrice: z.number().min(0, 'Unit price must be positive'),
});

const dealSchema = z.object({
  title: z.string().min(3, 'Deal title is required'),
  customerId: z.string().min(1, 'Please select a customer account'),
  stage: z.enum(['new', 'qualified', 'proposal', 'negotiation', 'won', 'lost']),
  probability: z.number().min(0).max(100),
  expectedCloseDate: z.string().min(1, 'Expected close date is required'),
  priority: z.enum(['urgent', 'high', 'medium', 'low']),
  ownerId: z.string().min(1, 'Please assign an account executive'),
  leadSource: z.string().optional(),
  notes: z.string().optional(),
  tags: z.string().optional(),
  products: z.array(productSchema).min(1, 'At least one line item is required'),
});

type DealFormData = z.infer<typeof dealSchema>;

export const AddDealPage: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const customers = useCustomerStore((s) => s.customers);
  const addDeal = useDealStore((s) => s.addDeal);
  const showSuccess = useNotificationStore((s) => s.showSuccess);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<DealFormData>({
    resolver: zodResolver(dealSchema),
    defaultValues: {
      title: '',
      customerId: customers[0]?.id || '',
      stage: 'qualified',
      probability: 35,
      expectedCloseDate: new Date(Date.now() + 45 * 86400000).toISOString().split('T')[0],
      priority: 'high',
      ownerId: user?.id || 'usr_sales',
      leadSource: 'website',
      notes: '',
      tags: 'Q4 Forecast, Core Platform',
      products: [
        { name: 'Nexora Enterprise SaaS License', quantity: 1, unitPrice: 75000 },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products',
  });

  const watchedProducts = watch('products');
  const calculatedTotal = (watchedProducts || []).reduce(
    (sum, p) => sum + (Number(p.quantity) || 0) * (Number(p.unitPrice) || 0),
    0
  );

  const onSubmit = async (data: DealFormData) => {
    const cust = customers.find((c) => c.id === data.customerId) || customers[0];
    const owner = mockUsers.find((u) => u.id === data.ownerId) || user || mockUsers[0];
    const tagsArray = data.tags ? data.tags.split(',').map((t) => t.trim()).filter(Boolean) : [];

    const productsWithTotals = data.products.map((p, idx) => ({
      id: `p_${Date.now()}_${idx}`,
      name: p.name,
      quantity: Number(p.quantity),
      unitPrice: Number(p.unitPrice),
      totalPrice: Number(p.quantity) * Number(p.unitPrice),
    }));

    const totalAmount = productsWithTotals.reduce((sum, p) => sum + p.totalPrice, 0);

    const newDeal = addDeal({
      title: data.title,
      customerId: cust.id,
      customerName: cust.name,
      customerCompany: cust.company,
      amount: totalAmount,
      currency: 'USD',
      stage: data.stage,
      probability: Number(data.probability),
      expectedCloseDate: data.expectedCloseDate,
      ownerId: owner.id,
      ownerName: owner.name,
      ownerAvatar: owner.avatar,
      priority: data.priority,
      leadSource: data.leadSource,
      notes: data.notes,
      products: productsWithTotals,
      tags: tagsArray,
    });

    showSuccess(`Deal "${newDeal.title}" created successfully!`);
    navigate(`/deals/${newDeal.id}`);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-3">
        <Link
          to="/deals"
          className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Create Deal Opportunity
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Define deal parameters, assign probability, and configure product line items.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Deal Basics */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            <Briefcase className="w-4 h-4 text-forest-700" />
            <span>Opportunity Scope</span>
          </div>

          <Input
            label="Deal Title *"
            placeholder="e.g. Acme Technologies Global Rollout"
            {...register('title')}
            error={errors.title?.message}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Customer Account *"
              {...register('customerId')}
              error={errors.customerId?.message}
              options={customers.map((c) => ({ value: c.id, label: `${c.name} (${c.tier})` }))}
            />
            <Select
              label="Account Executive"
              {...register('ownerId')}
              options={mockUsers.map((u) => ({ value: u.id, label: `${u.name} (${u.role})` }))}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="Stage"
              {...register('stage')}
              options={[
                { value: 'new', label: 'Discovery / New' },
                { value: 'qualified', label: 'Qualified' },
                { value: 'proposal', label: 'Proposal Sent' },
                { value: 'negotiation', label: 'In Negotiation' },
                { value: 'won', label: 'Closed Won' },
                { value: 'lost', label: 'Closed Lost' },
              ]}
            />
            <Input
              label="Win Probability (%)"
              type="number"
              {...register('probability', { valueAsNumber: true })}
            />
            <Input
              label="Target Close Date"
              type="date"
              {...register('expectedCloseDate')}
              error={errors.expectedCloseDate?.message}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Priority"
              {...register('priority')}
              options={[
                { value: 'urgent', label: 'Urgent' },
                { value: 'high', label: 'High' },
                { value: 'medium', label: 'Medium' },
                { value: 'low', label: 'Low' },
              ]}
            />
            <Input label="Tags" placeholder="Strategic, Q4, Expansion" {...register('tags')} />
          </div>
        </div>

        {/* Product Line Items */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              <Package className="w-4 h-4 text-forest-700" />
              <span>Products & Services</span>
            </div>
            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={() => append({ name: '', quantity: 1, unitPrice: 10000 })}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Add Item
            </Button>
          </div>

          <div className="space-y-3">
            {fields.map((field, idx) => (
              <div key={field.id} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700/60 grid grid-cols-12 gap-3 items-center">
                <div className="col-span-12 sm:col-span-6">
                  <Input
                    placeholder="Product or module name"
                    {...register(`products.${idx}.name` as const)}
                    error={errors.products?.[idx]?.name?.message}
                  />
                </div>
                <div className="col-span-5 sm:col-span-2">
                  <Input
                    type="number"
                    placeholder="Qty"
                    {...register(`products.${idx}.quantity` as const, { valueAsNumber: true })}
                  />
                </div>
                <div className="col-span-5 sm:col-span-3">
                  <Input
                    type="number"
                    placeholder="Unit Price ($)"
                    {...register(`products.${idx}.unitPrice` as const, { valueAsNumber: true })}
                  />
                </div>
                <div className="col-span-2 sm:col-span-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => remove(idx)}
                    disabled={fields.length === 1}
                    className="p-2 text-slate-400 hover:text-rose-500 disabled:opacity-30"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Line Items Total */}
          <div className="flex justify-end pt-3 text-right">
            <div>
              <span className="text-xs text-slate-400 block uppercase">Calculated Total</span>
              <span className="text-2xl font-black text-forest-800 dark:text-peach-400">
                {formatCurrency(calculatedTotal)}
              </span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={() => navigate('/deals')}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            Save Deal
          </Button>
        </div>
      </form>
    </div>
  );
};
