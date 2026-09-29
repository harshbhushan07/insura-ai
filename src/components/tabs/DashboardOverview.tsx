import React from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  FileText, 
  Activity, 
  Calculator, 
  HelpCircle,
  FileSpreadsheet,
  AlertTriangle,
  Scale
} from 'lucide-react';
import { ActiveTab, PolicySchedule } from '../../types';
import { RISK_RADAR_ITEMS } from '../../data/mockData';

interface DashboardOverviewProps {
  policy: PolicySchedule;
  onNavigate: (tab: ActiveTab) => void;
  onViewEvidence: (evidence: any) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  policy,
  onNavigate,
  onViewEvidence
}) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Welcome & Policy Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-900 via-indigo-900 to-navy-900 text-white shadow-xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-semibold text-brand-200 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Policy Status: ACTIVE (Verified via IRDAI Registry)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {policy.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Contract #{policy.policyNumber} • {policy.insurer} • Valid through {policy.validUntil}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onNavigate('ask-ai')}
              className="px-4 py-2.5 rounded-xl bg-white text-brand-900 hover:bg-brand-50 text-xs font-bold transition shadow flex items-center gap-1.5"
            >
              <span>Ask AI Policy Assistant</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('my-policy')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-white/15"
            >
              View Digital Twin
            </button>
          </div>
        </div>
      </div>

      {/* Top 5 Summary Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: Status */}
        <div className="p-5 rounded-2xl bg-white dark:bg-navy-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Policy Status
          </div>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-5 h-5" />
            <span>ACTIVE</span>
          </div>
          <div className="text-[11px] text-slate-500 pt-1">
            28 months tenure
          </div>
        </div>

        {/* Card 2: Sum Insured */}
        <div className="p-5 rounded-2xl bg-white dark:bg-navy-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Sum Insured
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white font-mono">
            ₹10,00,000
          </div>
          <div className="text-[11px] text-slate-500 pt-1">
            Individual Comprehensive
          </div>
        </div>

        {/* Card 3: Used Coverage */}
        <div className="p-5 rounded-2xl bg-white dark:bg-navy-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Used Coverage
          </div>
          <div className="text-xl font-black text-amber-600 dark:text-amber-400 font-mono">
            ₹2,40,000
          </div>
          <div className="text-[11px] text-slate-500 pt-1">
            1 Prior Claim Settled
          </div>
        </div>

        {/* Card 4: Remaining */}
        <div className="p-5 rounded-2xl bg-white dark:bg-navy-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Remaining Balance
          </div>
          <div className="text-xl font-black text-brand-600 dark:text-brand-400 font-mono">
            ₹7,60,000
          </div>
          <div className="text-[11px] text-slate-500 pt-1">
            76% Balance Available
          </div>
        </div>

        {/* Card 5: Waiting Period */}
        <div className="col-span-2 lg:col-span-1 p-5 rounded-2xl bg-white dark:bg-navy-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Waiting Period
          </div>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-5 h-5" />
            <span>✓ Completed</span>
          </div>
          <div className="text-[11px] text-slate-500 pt-1">
            24mo Elective Unlocked
          </div>
        </div>
      </div>

      {/* Policy Health Section */}
      <div className="p-6 rounded-2xl bg-white dark:bg-navy-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-600" />
              <span>Policy Health & Readiness Index</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Evaluated against IRDAI benchmarking, sub-limit vulnerability, and document readiness
            </p>
          </div>
          <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 self-start sm:self-auto">
            Algorithmic Grade: A (Strong)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Coverage: 92% */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Coverage Depth
              </span>
              <span className="text-base font-black text-brand-600 dark:text-brand-400 font-mono">
                92%
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-brand-600 rounded-full" style={{ width: '92%' }}></div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
              High indemnity for inpatient, surgery, and ICU care. Sub-limit applies only to room rent (₹5,000) and cataract (₹45,000).
            </p>
          </div>

          {/* Policy Clarity: 88% */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Policy Clarity
              </span>
              <span className="text-base font-black text-emerald-600 dark:text-emerald-400 font-mono">
                88%
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '88%' }}></div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
              Digital Twin indexed with 100% cited clause evidence. Minimal ambiguity detected in surgical schedule definitions.
            </p>
          </div>

          {/* Claim Readiness: 76% */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Claim Readiness
              </span>
              <span className="text-base font-black text-amber-600 dark:text-amber-400 font-mono">
                76%
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '76%' }}></div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
              4 of 6 essential claim documents verified. Hospital estimate & pre-auth forms pending before elective submission.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Action Decision Grid */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Intelligence Workflows
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div 
            onClick={() => onNavigate('treatment-cost')}
            className="p-5 rounded-2xl bg-white dark:bg-navy-850 border border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 hover:shadow-lg transition cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center group-hover:scale-110 transition">
              <Activity className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition">
              Check Treatment Cost
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Select Knee, Cataract, or CABG across Pune, Mumbai, Delhi & check eligibility.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('financial-calculator')}
            className="p-5 rounded-2xl bg-white dark:bg-navy-850 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-lg transition cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition">
              <Calculator className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
              Estimate Out-of-Pocket
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Interactive waterfall breakdown showing insurer vs patient share & deductions.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('what-if')}
            className="p-5 rounded-2xl bg-white dark:bg-navy-850 border border-slate-200 dark:border-slate-800 hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-lg transition cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition">
              <Scale className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition">
              What-If Simulator
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Compare room rent options (₹5k vs ₹10k) and witness proportionate cost delta.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('bill-analyzer')}
            className="p-5 rounded-2xl bg-white dark:bg-navy-850 border border-slate-200 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-500 hover:shadow-lg transition cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
              Audit Hospital Bill
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Upload mock bill, run OCR, and map lines to policy exclusion clauses.
            </p>
          </div>
        </div>
      </div>

      {/* Coverage Risk Radar Preview */}
      <div className="p-6 rounded-2xl bg-white dark:bg-navy-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Coverage Risk Radar
            </h3>
          </div>
          <button
            onClick={() => onNavigate('my-policy')}
            className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
          >
            <span>Explore All Policy Rules</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {RISK_RADAR_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => onViewEvidence(item.policyEvidence)}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-navy-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                  item.level === 'HIGH'
                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                    : item.level === 'MEDIUM'
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                    : item.level === 'REVIEW'
                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                    : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                }`}>
                  {item.level} IMPACT
                </span>
                <span className="text-[10px] text-slate-400 font-mono">P.{item.policyEvidence.page}</span>
              </div>

              <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition line-clamp-1">
                {item.title}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
