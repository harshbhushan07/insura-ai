import React from 'react';
import { 
  Calculator, 
  HelpCircle, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  TrendingDown, 
  PieChart as PieIcon, 
  ShieldCheck, 
  Info,
  SlidersHorizontal
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from 'recharts';
import { ActiveTab } from '../../types';

interface FinancialCalculatorProps {
  onOpenWhyOOP: () => void;
  onNavigate: (tab: ActiveTab) => void;
  onViewEvidence: (evidence: any) => void;
}

export const FinancialCalculator: React.FC<FinancialCalculatorProps> = ({
  onOpenWhyOOP,
  onNavigate,
  onViewEvidence
}) => {
  const pieData = [
    { name: 'Estimated Insurance Contribution', value: 247500, color: '#4f46e5' },
    { name: 'Estimated Patient Out-of-Pocket', value: 72500, color: '#f43f5e' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-2">
            <Calculator className="w-3.5 h-3.5 text-brand-600" />
            <span>Out-of-Pocket & Coverage Waterfall</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Treatment Financial Estimate
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Exact mathematical breakdown of insurance coverage vs patient liability for Total Knee Replacement in Pune.
          </p>
        </div>

        {/* Clear Estimate Disclaimer */}
        <div className="px-3.5 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-800 dark:text-amber-200 flex items-center space-x-2 self-start sm:self-auto">
          <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span className="font-semibold">PRE-ADMISSION ESTIMATE ONLY</span>
        </div>
      </div>

      {/* Top 4 Financial Metric Highlights */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Bill */}
        <div className="p-5 rounded-2xl bg-white dark:bg-navy-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Total Estimated Bill
          </span>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            ₹3,20,000
          </div>
          <p className="text-[11px] text-slate-500">
            Apollo Hospital benchmark
          </p>
        </div>

        {/* Potentially Eligible */}
        <div className="p-5 rounded-2xl bg-white dark:bg-navy-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Potentially Eligible
          </span>
          <div className="text-2xl font-black text-brand-600 dark:text-brand-400 font-mono">
            ₹2,75,000
          </div>
          <p className="text-[11px] text-slate-500">
            After non-payable exclusions
          </p>
        </div>

        {/* Insurance Contribution */}
        <div className="p-5 rounded-2xl bg-white dark:bg-navy-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
            Estimated Insurance Pays
          </span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
            ₹2,47,500
          </div>
          <p className="text-[11px] text-slate-500">
            77.3% Coverage Share
          </p>
        </div>

        {/* Out-of-Pocket */}
        <div className="p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider block">
            Estimated Out-of-Pocket
          </span>
          <div className="text-2xl font-black text-rose-600 dark:text-rose-400 font-mono">
            ₹72,500
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-500">22.7% Patient Share</span>
            <button
              onClick={onOpenWhyOOP}
              className="text-[11px] font-bold text-rose-700 dark:text-rose-300 hover:underline flex items-center gap-0.5"
            >
              Why so high? <HelpCircle className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Split: Donut Chart vs Detailed Waterfall Calculation Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Recharts Donut Visualization */}
        <div className="lg:col-span-5 bg-white dark:bg-navy-850 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-2">
              <PieIcon className="w-4 h-4 text-brand-600" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Financial Split Visualization
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Share Ratio</span>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Amount']}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Custom Legend */}
          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-brand-600"></span>
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  Estimated Insurance Contribution
                </span>
              </div>
              <span className="font-bold font-mono text-slate-900 dark:text-white">
                ₹2,47,500 (77.3%)
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  Estimated Patient Out-of-Pocket
                </span>
              </div>
              <span className="font-bold font-mono text-rose-600 dark:text-rose-400">
                ₹72,500 (22.7%)
              </span>
            </div>
          </div>

          {/* Quick simulator CTA */}
          <button
            onClick={() => onNavigate('what-if')}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition flex items-center justify-center space-x-2"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Simulate What-If Scenarios (Save ₹36k)</span>
          </button>
        </div>

        {/* Right: Detailed Calculation Card */}
        <div className="lg:col-span-7 bg-white dark:bg-navy-850 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="font-black text-base text-slate-900 dark:text-white">
                Step-by-Step Policy Waterfall
              </h3>
              <p className="text-xs text-slate-500">
                How every policy deduction affects your final hospital discharge bill
              </p>
            </div>
            <button
              onClick={onOpenWhyOOP}
              className="px-3 py-1.5 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold text-xs hover:bg-rose-200 dark:hover:bg-rose-900 transition flex items-center gap-1 shadow-xs"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Why is my OOP this high?</span>
            </button>
          </div>

          {/* Waterfall Line Items */}
          <div className="space-y-3 font-mono text-xs">
            {/* 1. Base Bill */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center space-x-2.5">
                <span className="font-sans font-bold text-slate-900 dark:text-white">Hospital bill (Estimated)</span>
              </div>
              <span className="font-black text-slate-900 dark:text-white text-sm">
                ₹3,20,000
              </span>
            </div>

            {/* 2. Non-covered */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 dark:bg-navy-900/50 border border-slate-200/80 dark:border-slate-800 text-rose-600 dark:text-rose-400">
              <div className="flex items-center space-x-2 font-sans">
                <span>Non-covered expenses (PPE, gloves, consumables)</span>
                <button
                  onClick={() => onViewEvidence({
                    page: 31,
                    section: 'Section 8.4 — Non-Payable Consumables Schedule',
                    clauseText: 'Items categorized under IRDAI Annexure I (cotton, housekeeping packs, disposable PPE kits) shall be non-admissible.',
                    simpleExplanation: 'Consumables are excluded from standard health plans unless an add-on is active.'
                  })}
                  className="text-[10px] text-brand-600 dark:text-brand-400 underline font-semibold"
                >
                  Clause 8.4
                </button>
              </div>
              <span className="font-bold">-₹15,000</span>
            </div>

            {/* 3. Room Rent adjustment */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 dark:bg-navy-900/50 border border-slate-200/80 dark:border-slate-800 text-rose-600 dark:text-rose-400">
              <div className="flex items-center space-x-2 font-sans">
                <span>Room-rent adjustment (Exceeds ₹5k/day cap)</span>
                <button
                  onClick={() => onViewEvidence({
                    page: 24,
                    section: 'Section 6.3 — Proportionate Room Rent Clause',
                    clauseText: 'If the insured occupies a room with higher tariff than ₹5,000/day, all associated medical expenses shall be borne proportionately by the insured.',
                    simpleExplanation: 'Exceeding the ₹5,000 room limit triggers proportional penalties.'
                  })}
                  className="text-[10px] text-brand-600 dark:text-brand-400 underline font-semibold"
                >
                  Clause 6.3
                </button>
              </div>
              <span className="font-bold">-₹10,000</span>
            </div>

            {/* 4. Subtotal Eligible */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-brand-50/60 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-900/60 text-brand-800 dark:text-brand-200">
              <span className="font-sans font-bold">Eligible amount</span>
              <span className="font-black text-sm">₹2,95,000</span>
            </div>

            {/* 5. 10% co-pay */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 dark:bg-navy-900/50 border border-slate-200/80 dark:border-slate-800 text-rose-600 dark:text-rose-400">
              <div className="flex items-center space-x-2 font-sans">
                <span>10% co-pay (Applicable for patient age 55)</span>
                <button
                  onClick={() => onViewEvidence({
                    page: 16,
                    section: 'Section 4.4 — Co-payment Terms',
                    clauseText: 'A mandatory co-payment of 10% shall apply to each and every admissible claim for insured persons aged 55 years and above.',
                    simpleExplanation: 'For senior claims, 10% of admissible costs is shared.'
                  })}
                  className="text-[10px] text-brand-600 dark:text-brand-400 underline font-semibold"
                >
                  Clause 4.4
                </button>
              </div>
              <span className="font-bold">-₹29,500</span>
            </div>

            {/* 6. Deductible */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 dark:bg-navy-900/50 border border-slate-200/80 dark:border-slate-800 text-rose-600 dark:text-rose-400">
              <div className="flex items-center space-x-2 font-sans">
                <span>Annual policy deductible</span>
                <button
                  onClick={() => onViewEvidence({
                    page: 15,
                    section: 'Section 4.2 — Deductible Schedule',
                    clauseText: 'The Insured shall bear an aggregate deductible of ₹20,000 per policy year.',
                    simpleExplanation: 'First claim of the year absorbs the ₹20,000 deductible threshold.'
                  })}
                  className="text-[10px] text-brand-600 dark:text-brand-400 underline font-semibold"
                >
                  Clause 4.2
                </button>
              </div>
              <span className="font-bold">-₹20,000</span>
            </div>

            {/* 7. Final Insurance Contribution */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200">
              <span className="font-sans font-black text-sm">
                Estimated insurance contribution
              </span>
              <span className="font-black text-base">
                ₹2,45,500
              </span>
            </div>

            {/* 8. Final Patient Payment */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200">
              <span className="font-sans font-black text-sm">
                Estimated patient payment (Total OOP)
              </span>
              <span className="font-black text-base">
                ₹74,500
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
