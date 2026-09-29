import React from 'react';
import { 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  HelpCircle, 
  ShieldAlert, 
  GitFork,
  ArrowDown
} from 'lucide-react';

interface ConflictDetectorProps {
  onViewEvidence: (evidence: any) => void;
}

export const ConflictDetector: React.FC<ConflictDetectorProps> = ({ onViewEvidence }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-2">
          <Scale className="w-3.5 h-3.5 text-brand-600" />
          <span>Clause Interplay Engine</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          Policy Rule Interactions & Conflict Detector
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Detects hidden conflicts between general hospitalization coverage, sub-limits, and co-payment clauses.
        </p>
      </div>

      {/* Main Conflict Illustration Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-navy-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Case Study: The 4-Way Clause Collision
              </h3>
              <p className="text-xs text-slate-500">
                How multiple contract rules simultaneously restrict a single surgical claim
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded-lg">
            3 Compounding Deductions
          </span>
        </div>

        {/* Visual Cascade Flow */}
        <div className="space-y-3 font-sans">
          {/* Rule 1: General Hospitalization */}
          <div className="p-4 rounded-xl border-2 border-emerald-500/60 bg-emerald-50/50 dark:bg-emerald-950/30 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 block">
                  Clause 2.1 — General Hospitalization
                </span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  ✓ Covered up to ₹10,00,000 Sum Insured
                </h4>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
              Starts as 100% Eligible
            </span>
          </div>

          <div className="flex justify-center text-slate-400">
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </div>

          {/* Rule 2: BUT Room Rent Limit */}
          <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-950/20 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 block">
                  BUT Clause 6.3 — Room Rent Sub-limit
                </span>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                  Capped at ₹5,000/day (Penalizes associated doctor fees if upgraded)
                </h4>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400">
              -₹10,000 Deduction
            </span>
          </div>

          <div className="flex justify-center text-slate-400">
            <ArrowDown className="w-4 h-4" />
          </div>

          {/* Rule 3: AND Disease Sub-limit */}
          <div className="p-4 rounded-xl border border-purple-300 dark:border-purple-900 bg-purple-50/50 dark:bg-purple-950/20 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ShieldAlert className="w-5 h-5 text-purple-600 flex-shrink-0" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 block">
                  AND Clause 4.2 — Disease-Specific Sub-limit
                </span>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                  Cataract capped at ₹45,000; Joint replacement implant schedules apply
                </h4>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">
              Hard Ceiling Barrier
            </span>
          </div>

          <div className="flex justify-center text-slate-400">
            <ArrowDown className="w-4 h-4" />
          </div>

          {/* Rule 4: AND Co-payment */}
          <div className="p-4 rounded-xl border border-rose-300 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/20 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Scale className="w-5 h-5 text-rose-600 flex-shrink-0" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300 block">
                  AND Clause 4.4 — Senior Co-Payment
                </span>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                  10% patient cost sharing on the remaining balance for age 55+
                </h4>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400">
              -10% of Claim
            </span>
          </div>
        </div>

        {/* Warning Callout */}
        <div className="p-4 rounded-xl bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-2">
          <strong className="text-slate-900 dark:text-white block">
            Conflict Synthesis: Multiple policy conditions compound to reduce claim payouts
          </strong>
          <p>
            Many policyholders believe having ₹10 Lakhs Sum Insured means ₹10 Lakhs is available for any covered hospitalization. In reality, sub-limits and co-pays stack simultaneously. InsuraAI models these interactions in real-time so patients can plan ahead.
          </p>
        </div>
      </div>
    </div>
  );
};
