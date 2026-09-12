import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDealStore, useCustomerStore, useNotificationStore } from '../../store';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { ArrowLeft, Briefcase, Plus, Trash2, Package } from 'lucide-react';
import { mockUsers } from '../../data/mock/mockUsers';
import { formatCurrency } from '../../utils/formatters';

const productSchema = z.object({
  name: z.string().min(2, 'Product name is required'),
  quantity: z.number().min(1),
  unitPrice: z.number().min(0),
});

const dealEditSchema = z.object({
  title: z.string().min(3, 'Deal title is required'),
  customerId: z.string().min(1),
  stage: z.enum(['new', 'qualified', 'proposal', 'negotiation', 'won', 'lost']),
  probability: z.number().min(0).max(100),
  expectedCloseDate: z.string().min(1),
  priority: z.enum(['urgent', 'high', 'medium', 'low']),
  ownerId: z.string().min(1),
  notes: z.string().optional(),
  tags: z.string().optional(),
  products: z.array(productSchema).min(1),
});

type DealEditFormData = z.infer<typeof dealEditSchema>;

export const EditDealPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getDealById, updateDeal } = useDealStore();
  const customers = useCustomerStore((s) => s.customers);
  const showSuccess = useNotificationStore((s) => s.showSuccess);

  const deal = getDealById(id || '');

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<DealEditFormData>({
    resolver: zodResolver(dealEditSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products',
  });

  useEffect(() => {
    if (deal) {
      reset({
        title: deal.title,
        customerId: deal.customerId,
        stage: deal.stage,
        probability: deal.probability,
        expectedCloseDate: deal.expectedCloseDate,
        priority: deal.priority,
        ownerId: deal.ownerId,
        notes: deal.notes || '',
        tags: deal.tags?.join(', ') || '',
        products: deal.products?.length
          ? deal.products.map((p) => ({ name: p.name, quantity: p.quantity, unitPrice: p.unitPrice }))
          : [{ name: 'Enterprise Platform License', quantity: 1, unitPrice: deal.amount }],
      });
    }
  }, [deal, reset]);

  if (!deal) {
    return (
      <div className="text-center py-12">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">Deal Not Found</h2>
        <Button className="mt-4" onClick={() => navigate('/deals')}>
          Back to Deals
        </Button>
      </div>
    );
  }

  const watchedProducts = watch('products');
  const calculatedTotal = (watchedProducts || []).reduce(
    (sum, p) => sum + (Number(p.quantity) || 0) * (Number(p.unitPrice) || 0),
    0
  );

  const onSubmit = async (data: DealEditFormData) => {
    const cust = customers.find((c) => c.id === data.customerId) || { id: deal.customerId, name: deal.customerName, company: deal.customerCompany };
    const owner = mockUsers.find((u) => u.id === data.ownerId) || mockUsers[0];
    const tagsArray = data.tags ? data.tags.split(',').map((t) => t.trim()).filter(Boolean) : [];

    const productsWithTotals = data.products.map((p, idx) => ({
      id: `p_${Date.now()}_${idx}`,
      name: p.name,
      quantity: Number(p.quantity),
      unitPrice: Number(p.unitPrice),
      totalPrice: Number(p.quantity) * Number(p.unitPrice),
    }));

    const totalAmount = productsWithTotals.reduce((sum, p) => sum + p.totalPrice, 0);

    updateDeal(deal.id, {
      title: data.title,
      customerId: cust.id,
      customerName: cust.name,
      customerCompany: cust.company,
      amount: totalAmount,
      stage: data.stage,
      probability: Number(data.probability),
      expectedCloseDate: data.expectedCloseDate,
      ownerId: owner.id,
      ownerName: owner.name,
      ownerAvatar: owner.avatar,
      priority: data.priority,
      notes: data.notes,
      products: productsWithTotals,
      tags: tagsArray,
    });

    showSuccess(`Deal "${data.title}" updated successfully!`);
    navigate(`/deals/${deal.id}`);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-3">
        <Link
          to={`/deals/${deal.id}`}
          className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Edit Deal: {deal.title}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Modify probability, expected close date, and product quantities.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
          <Input label="Deal Title *" {...register('title')} error={errors.title?.message} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Customer"
              {...register('customerId')}
              options={customers.map((c) => ({ value: c.id, label: c.name }))}
            />
            <Select
              label="Owner"
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
            <Input label="Probability (%)" type="number" {...register('probability', { valueAsNumber: true })} />
            <Input label="Expected Close" type="date" {...register('expectedCloseDate')} />
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
            <Input label="Tags" {...register('tags')} />
          </div>
        </div>

        {/* Line items */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              <Package className="w-4 h-4 text-forest-700" />
              <span>Products & Line Items</span>
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
                  <Input placeholder="Product name" {...register(`products.${idx}.name` as const)} />
                </div>
                <div className="col-span-5 sm:col-span-2">
                  <Input type="number" placeholder="Qty" {...register(`products.${idx}.quantity` as const, { valueAsNumber: true })} />
                </div>
                <div className="col-span-5 sm:col-span-3">
                  <Input type="number" placeholder="Unit Price" {...register(`products.${idx}.unitPrice` as const, { valueAsNumber: true })} />
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

          <div className="flex justify-end pt-3 text-right">
            <div>
              <span className="text-xs text-slate-400 block uppercase">Updated Total</span>
              <span className="text-2xl font-black text-forest-800 dark:text-peach-400">
                {formatCurrency(calculatedTotal)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={() => navigate(`/deals/${deal.id}`)}>
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
