import React, { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Lead, IndustryType, DealStage } from '../../types';
import { useLeadStore, useNotificationStore } from '../../store';
import { ArrowRight, CheckCircle2, DollarSign, Building2, Briefcase } from 'lucide-react';

export interface LeadConversionModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onConverted?: (customerId: string, dealId: string) => void;
}

export const LeadConversionModal: React.FC<LeadConversionModalProps> = ({
  lead,
  isOpen,
  onClose,
  onConverted,
}) => {
  const convertLead = useLeadStore((s) => s.convertLead);
  const showSuccess = useNotificationStore((s) => s.showSuccess);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states initialized with lead data
  const [customerName, setCustomerName] = useState('');
  const [dealName, setDealName] = useState('');
  const [dealAmount, setDealAmount] = useState(0);
  const [dealStage, setDealStage] = useState<DealStage>('qualified');
  const [expectedCloseDate, setExpectedCloseDate] = useState('');
  const [dealProbability, setDealProbability] = useState(35);

  React.useEffect(() => {
    if (lead) {
      setCustomerName(lead.company);
      setDealName(`${lead.company} - Platform License`);
      setDealAmount(lead.estimatedValue || 75000);
      setDealStage('qualified');
      setExpectedCloseDate(
        new Date(Date.now() + 45 * 86400000).toISOString().split('T')[0]
      );
      setDealProbability(35);
    }
  }, [lead]);

  if (!lead) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !dealName) return;

    setIsSubmitting(true);
    try {
      const result = convertLead({
        leadId: lead.id,
        customerName,
        company: lead.company,
        email: lead.email,
        phone: lead.phone,
        industry: lead.industry,
        dealName,
        dealAmount: Number(dealAmount),
        dealStage,
        expectedCloseDate,
        dealProbability: Number(dealProbability),
        notes: lead.notesSummary,
      });

      showSuccess(`Lead "${lead.fullName}" successfully converted into Customer and Deal!`);
      onClose();
      if (onConverted) {
        onConverted(result.customerId, result.dealId);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Convert Lead to Customer & Deal" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Banner summary */}
        <div className="p-4 bg-peach-100/80 dark:bg-forest-900/40 border border-peach-200 dark:border-forest-900/50 rounded-2xl flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-forest-900 text-white flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-forest-950 dark:text-peach-200">
              Converting: {lead.fullName} ({lead.company})
            </h4>
            <p className="text-xs text-forest-900/80 dark:text-peach-300/80 mt-0.5">
              Converting this lead will mark it as "Converted", create an active Customer record, and generate an opportunity in your Deals pipeline.
            </p>
          </div>
        </div>

        {/* Section 1: Customer Record */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-1 border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
            <Building2 className="w-4 h-4 text-forest-700" />
            <span>New Customer Account Details</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Account / Company Name"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <Input
              label="Primary Contact Email"
              type="email"
              disabled
              value={lead.email}
            />
          </div>
        </div>

        {/* Section 2: Deal Record */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-1 border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
            <Briefcase className="w-4 h-4 text-amber-500" />
            <span>Pipeline Deal Configuration</span>
          </div>

          <Input
            label="Deal Name"
            required
            value={dealName}
            onChange={(e) => setDealName(e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Deal Value ($)"
              type="number"
              required
              value={dealAmount}
              onChange={(e) => setDealAmount(Number(e.target.value))}
            />
            <Select
              label="Initial Deal Stage"
              value={dealStage}
              onChange={(e) => setDealStage(e.target.value as any)}
              options={[
                { value: 'new', label: 'Discovery / New' },
                { value: 'qualified', label: 'Qualified' },
                { value: 'proposal', label: 'Proposal Sent' },
                { value: 'negotiation', label: 'In Negotiation' },
                { value: 'won', label: 'Closed Won' },
              ]}
            />
            <Input
              label="Expected Close Date"
              type="date"
              required
              value={expectedCloseDate}
              onChange={(e) => setExpectedCloseDate(e.target.value)}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Convert & Create Opportunity
          </Button>
        </div>
      </form>
    </Modal>
  );
};
