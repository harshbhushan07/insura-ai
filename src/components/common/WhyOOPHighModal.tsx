import React from 'react';
import { X, HelpCircle, AlertOctagon, TrendingDown, ShieldAlert, ArrowRight, CheckCircle2, Info } from 'lucide-react';

interface WhyOOPHighModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewEvidence?: (evidence: any) => void;
}

export const WhyOOPHighModal: React.FC<WhyOOPHighModalProps> = ({ isOpen, onClose, onViewEvidence }) => {
  if (!isOpen) return null;

  const oopComponents = [
    {
      title: 'Co-Payment (10% over age 55)',
      amount: '₹29,500',
      percentage: '39.6% of OOP',
      severity: 'medium',
      reason: 'Under Clause 4.4, any insured member age 55 or above contributes a mandatory 10% of admissible expenses.',
      actionableTip: 'This is a fixed policy condition; cannot be waived during this policy cycle.',
      evidence: {
        page: 16,
        section: 'Section 4.4 — Co-payment Terms',
        clauseText: 'A mandatory co-payment of 10% shall apply to each and every admissible claim for insured persons aged 55 years and above at the time of claim.',
        simpleExplanation: 'As the patient is 55, 10% of all medically eligible hospital charges must be paid directly by the patient.'
      }
    },
    {
      title: 'Annual Policy Deductible',
      amount: '₹20,000',
      percentage: '26.8% of OOP',
      severity: 'medium',
      reason: 'Under Clause 4.2, the first ₹20,000 of cumulative eligible claims in a policy year must be absorbed by the insured.',
      actionableTip: 'Once you fulfill this ₹20,000 deductible on your first claim, future hospitalizations this year have ₹0 deductible.',
      evidence: {
        page: 15,
        section: 'Section 4.2 — Deductible Schedule',
        clauseText: 'The Insured shall bear an aggregate deductible of ₹20,000 per policy year. Claims beyond this threshold become admissible.',
        simpleExplanation: 'The first ₹20,000 of any hospital treatment in this policy year is your personal responsibility before coverage kicks in.'
      }
    },
    {
      title: 'Non-Medical Consumables (List I)',
      amount: '₹15,000',
      percentage: '20.1% of OOP',
      severity: 'high',
      reason: 'Items like surgical gloves, PPE gowns, bio-hazard packs, and admission kits are legally excluded by IRDAI regulations.',
      actionableTip: 'Ask the hospital billing desk if they provide itemized consumable receipts or generic alternatives.',
      evidence: {
        page: 31,
        section: 'Section 8.4 — Non-Payable Consumables Schedule',
        clauseText: 'Items categorized under IRDAI Annexure I (cotton, syringes, surgical gloves, housekeeping packs) shall be non-admissible.',
        simpleExplanation: 'Consumables are excluded from standard indemnity health plans unless a specific add-on rider is active.'
      }
    },
    {
      title: 'Room-Rent Proportionate Adjustment',
      amount: '₹10,000',
      percentage: '13.4% of OOP',
      severity: 'high',
      reason: 'The selected room is ₹8,000/day while your policy cap is ₹5,000/day. The excess daily room tariff is deducted.',
      actionableTip: 'Downgrade to a ₹5,000/day standard AC room at admission to eliminate this deduction entirely and save ₹10,000+!',
      evidence: {
        page: 24,
        section: 'Section 6.3 — Proportionate Room Rent Clause',
        clauseText: 'If the insured occupies a room with a tariff higher than the eligible limit of ₹5,000/day, all associated medical expenses shall be borne by the insured in proportion to the difference.',
        simpleExplanation: 'Exceeding the ₹5,000 room cap costs you not just the room delta, but triggers penalties across doctors and OT fees.'
      }
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-navy-850 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-amber-500/5 dark:bg-amber-500/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Why is my Out-of-Pocket ₹74,500?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Transparent factor-by-factor breakdown of your treatment cost calculations
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Top Summary Banner */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Total Estimated Bill
              </span>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                ₹3,20,000
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wide flex items-center justify-end gap-1">
                <AlertOctagon className="w-3.5 h-3.5" /> Total Patient Out-of-Pocket
              </span>
              <div className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-0.5">
                ₹74,500 <span className="text-xs font-medium text-slate-500">(23.3%)</span>
              </div>
            </div>
          </div>

          {/* Breakdown Cards */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              The 4 Contributing Factors
            </h4>

            {oopComponents.map((item, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {item.title}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                      {item.percentage}
                    </span>
                  </div>
                  <span className="text-base font-black text-slate-900 dark:text-white font-mono">
                    +{item.amount}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.reason}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs">
                  <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-medium text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                    <span>How to optimize: {item.actionableTip}</span>
                  </div>

                  {onViewEvidence && (
                    <button
                      onClick={() => onViewEvidence(item.evidence)}
                      className="text-brand-600 dark:text-brand-400 hover:underline font-semibold flex items-center gap-0.5 text-xs flex-shrink-0 ml-2"
                    >
                      Clause Evidence <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Simulation Insight */}
          <div className="p-4 rounded-xl bg-brand-50/70 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-900/60 flex items-start space-x-3">
            <Info className="w-5 h-5 text-brand-600 dark:text-brand-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">
                Immediate Saving Opportunity: Save ₹10,000 to ₹36,000
              </span>
              <p>
                By requesting a <strong className="text-brand-700 dark:text-brand-300">Standard Single AC Room (₹5,000/day)</strong> instead of a Deluxe Suite, you completely avoid proportionate deductions on surgeon charges and room tariff.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-navy-900 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-xs font-bold rounded-xl bg-brand-600 text-white hover:bg-brand-700 transition shadow"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
