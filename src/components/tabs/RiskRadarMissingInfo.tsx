import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle2, 
  PlusCircle, 
  X, 
  Sparkles, 
  TrendingUp, 
  FileText,
  Sliders,
  ChevronRight
} from 'lucide-react';
import { RISK_RADAR_ITEMS } from '../../data/mockData';
import { RiskRadarItem } from '../../types';

interface RiskRadarMissingInfoProps {
  onViewEvidence: (evidence: any) => void;
}

export const RiskRadarMissingInfo: React.FC<RiskRadarMissingInfoProps> = ({ onViewEvidence }) => {
  const [selectedRisk, setSelectedRisk] = useState<RiskRadarItem>(RISK_RADAR_ITEMS[0]);
  
  // Missing Information State
  const [hospitalSelected, setHospitalSelected] = useState<string>('');
  const [exactProcedure, setExactProcedure] = useState<string>('');
  const [roomCategory, setRoomCategory] = useState<string>('');
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  // Dynamic confidence calculation
  const missingCount = [hospitalSelected, exactProcedure, roomCategory].filter(v => !v).length;
  const confidenceScore = missingCount === 0 ? 'HIGH' : missingCount === 1 ? 'HIGH (Narrowed)' : 'MEDIUM';
  const confidencePct = missingCount === 0 ? 96 : missingCount === 1 ? 84 : 68;

  const handleApplyMissingInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-2">
          <ShieldAlert className="w-3.5 h-3.5 text-brand-600" />
          <span>Risk & Uncertainty Engine</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          Coverage Risk Radar & Uncertainty Engine
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Proactively flags sub-limit traps and never fabricates numbers when critical parameters are missing.
        </p>
      </div>

      {/* Section 10: Financial Risk Radar */}
      <div className="p-6 rounded-2xl bg-white dark:bg-navy-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span>Coverage Risk Radar</span>
            </h3>
            <p className="text-xs text-slate-500">
              Contract terms prioritized by potential out-of-pocket financial liability
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">Click item to inspect impact</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Risk Badges Column */}
          <div className="md:col-span-6 space-y-3">
            {RISK_RADAR_ITEMS.map((item) => {
              const isSelected = selectedRisk.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedRisk(item)}
                  className={`p-4 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/40 dark:border-brand-500 shadow-sm ring-1 ring-brand-500'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-navy-900/50 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded mt-0.5 ${
                      item.level === 'HIGH'
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                        : item.level === 'MEDIUM'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                        : item.level === 'REVIEW'
                        ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}>
                      {item.level}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400'}`} />
                </div>
              );
            })}
          </div>

          {/* Selected Risk Detail Card */}
          <div className="md:col-span-6 p-5 rounded-2xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Risk Analysis Breakdown
              </span>
              <span className="text-xs font-mono text-slate-400">
                Page {selectedRisk.policyEvidence.page}
              </span>
            </div>

            <div>
              <h4 className="text-sm font-black text-slate-900 dark:text-white">
                {selectedRisk.title}
              </h4>
              <p className="text-xs text-rose-600 dark:text-rose-400 font-bold mt-1">
                {selectedRisk.potentialImpact}
              </p>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Why this matters:
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {selectedRisk.whyItMatters}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <div className="flex justify-between items-center text-[11px] text-slate-500">
                <span className="font-bold text-slate-700 dark:text-slate-300">Policy Citation:</span>
                <span>{selectedRisk.policyEvidence.section}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 italic font-serif">
                "{selectedRisk.policyEvidence.clauseText}"
              </p>
            </div>

            <button
              onClick={() => onViewEvidence(selectedRisk.policyEvidence)}
              className="w-full py-2 px-3 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>View Grounded Evidence (Page {selectedRisk.policyEvidence.page})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Section 11: Missing Information Engine */}
      <div className="p-6 rounded-2xl bg-white dark:bg-navy-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-brand-600" />
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Can we calculate this reliably?
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              InsuraAI explicitly flags gaps instead of fabricating false exact estimates.
            </p>
          </div>

          <div className="flex items-center space-x-3 self-start sm:self-auto">
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Confidence Rating
              </span>
              <span className={`text-sm font-black font-mono ${
                confidenceScore.includes('HIGH') ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
              }`}>
                {confidenceScore} ({confidencePct}%)
              </span>
            </div>
            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 transition shadow flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{isFormOpen ? 'Close Form' : 'Add Missing Information'}</span>
            </button>
          </div>
        </div>

        {/* Missing flags list */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className={`p-4 rounded-xl border ${
            hospitalSelected ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20' : 'border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20'
          }`}>
            <div className="flex items-center space-x-2">
              {hospitalSelected ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              )}
              <span className="font-bold text-xs text-slate-900 dark:text-white">Hospital Selected</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {hospitalSelected ? hospitalSelected : '⚠ Network tier unavailable (affects cashless negotiated tariffs)'}
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${
            exactProcedure ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20' : 'border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20'
          }`}>
            <div className="flex items-center space-x-2">
              {exactProcedure ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              )}
              <span className="font-bold text-xs text-slate-900 dark:text-white">Exact Procedure & Implant</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {exactProcedure ? exactProcedure : '⚠ Unilateral vs Bilateral or high-flex implant model unstated'}
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${
            roomCategory ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20' : 'border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20'
          }`}>
            <div className="flex items-center space-x-2">
              {roomCategory ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              )}
              <span className="font-bold text-xs text-slate-900 dark:text-white">Final Room Category</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {roomCategory ? roomCategory : '⚠ Room tier governs proportionate deduction calculation'}
            </p>
          </div>
        </div>

        {/* Missing Info Interactive Input Modal/Form */}
        {isFormOpen && (
          <form 
            onSubmit={handleApplyMissingInfo}
            className="p-5 rounded-2xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-4 animate-in fade-in"
          >
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Provide Specifics to Upgrade Calculation Confidence
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Select Hospital:
                </label>
                <select
                  value={hospitalSelected}
                  onChange={(e) => setHospitalSelected(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-medium"
                >
                  <option value="">-- Choose Hospital --</option>
                  <option value="Apollo Hospitals, Pune (Network)">Apollo Hospitals, Pune (Network)</option>
                  <option value="Manipal Hospital, Pune (Network)">Manipal Hospital, Pune (Network)</option>
                  <option value="Ruby Hall Clinic, Pune (Network)">Ruby Hall Clinic, Pune (Network)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Exact Implant Specification:
                </label>
                <select
                  value={exactProcedure}
                  onChange={(e) => setExactProcedure(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-medium"
                >
                  <option value="">-- Choose Implant Model --</option>
                  <option value="Stryker Triathlon (FDA Approved)">Stryker Triathlon (FDA Approved)</option>
                  <option value="Zimmer Persona High-Flex">Zimmer Persona High-Flex</option>
                  <option value="Standard Domestic Oxinium">Standard Domestic Oxinium</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Reserved Room Category:
                </label>
                <select
                  value={roomCategory}
                  onChange={(e) => setRoomCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-medium"
                >
                  <option value="">-- Choose Room Category --</option>
                  <option value="Single Standard AC (₹5,000/day)">Single Standard AC (₹5,000/day)</option>
                  <option value="Deluxe Twin Sharing (₹7,500/day)">Deluxe Twin Sharing (₹7,500/day)</option>
                  <option value="Executive Suite (₹12,000/day)">Executive Suite (₹12,000/day)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setHospitalSelected('');
                  setExactProcedure('');
                  setRoomCategory('');
                }}
                className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 transition"
              >
                Apply Parameters & Update Confidence
              </button>
            </div>
          </form>
        )}

        <div className="p-3.5 rounded-xl bg-brand-50/70 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-900/60 text-xs text-slate-700 dark:text-slate-300">
          <strong>Trust Policy:</strong> When incomplete data exists, InsuraAI presents confidence intervals rather than definitive totals, ensuring zero financial surprises at hospital billing.
        </div>
      </div>
    </div>
  );
};
