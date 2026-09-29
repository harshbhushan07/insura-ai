import React, { useState } from 'react';
import { 
  GitCompare, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingDown, 
  TrendingUp, 
  FileText, 
  Sparkles,
  Calculator,
  ShieldCheck,
  Scale
} from 'lucide-react';
import { POLICY_COMPARISON_TABLE, POLICY_VERSION_DIFF } from '../../data/mockData';

export const PolicyComparison: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'two-policies' | 'version-diff'>('two-policies');
  const [showFinancialImpact, setShowFinancialImpact] = useState<boolean>(true);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-2">
          <GitCompare className="w-3.5 h-3.5 text-brand-600" />
          <span>Factual Comparative Analysis</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          Policy Comparison & Renewal Version Diff
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Objective clause-by-clause comparison without promotional bias or subjective ratings.
        </p>
      </div>

      {/* Sub-Tabs Switcher */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 space-x-4">
        <button
          onClick={() => setActiveSubTab('two-policies')}
          className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition ${
            activeSubTab === 'two-policies'
              ? 'border-brand-600 text-brand-600 dark:text-brand-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          Compare Policy A vs Policy B
        </button>

        <button
          onClick={() => setActiveSubTab('version-diff')}
          className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition ${
            activeSubTab === 'version-diff'
              ? 'border-brand-600 text-brand-600 dark:text-brand-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          Renewal Diff: Policy 2025 vs 2026
        </button>
      </div>

      {/* Sub-Tab 1: Two Policies Comparison (Section 16) */}
      {activeSubTab === 'two-policies' && (
        <div className="space-y-6">
          {/* Comparison Table */}
          <div className="bg-white dark:bg-navy-850 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Factual Feature Matrix
              </h3>
              <div className="flex items-center space-x-4 text-xs font-semibold">
                <span className="text-slate-700 dark:text-slate-300 font-bold">Policy A: SecureHealth Plus</span>
                <span className="text-slate-400">vs</span>
                <span className="text-brand-600 dark:text-brand-400 font-bold">Policy B: CareShield Elite</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-bold text-[10px]">
                    <th className="py-3 px-3">Policy Feature</th>
                    <th className="py-3 px-3">Policy A (Current)</th>
                    <th className="py-3 px-3">Policy B (Alternative)</th>
                    <th className="py-3 px-3">Factual Difference</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-sans">
                  {POLICY_COMPARISON_TABLE.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/60 transition">
                      <td className="py-3.5 px-3 font-bold text-slate-900 dark:text-white">
                        {row.feature}
                        <span className="block text-[10px] text-slate-400 font-normal">{row.category}</span>
                      </td>
                      <td className="py-3.5 px-3 font-semibold text-slate-800 dark:text-slate-200">
                        {row.policyA}
                      </td>
                      <td className="py-3.5 px-3 font-semibold text-slate-800 dark:text-slate-200">
                        {row.policyB}
                      </td>
                      <td className="py-3.5 px-3 text-slate-600 dark:text-slate-400 text-[11px]">
                        {row.differenceNote}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Treatment Financial Impact Simulation against Both Policies */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-navy-950 text-white shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400 block">
                  Simulated Treatment Benchmark
                </span>
                <h3 className="text-base font-black text-white mt-0.5">
                  Financial Impact: Total Knee Replacement (Pune ₹3,20,000 Bill)
                </h3>
              </div>
              <span className="text-xs font-mono bg-white/10 px-3 py-1 rounded-full text-slate-300">
                Identical Hospital & Surgeon
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Policy A Impact */}
              <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-sm text-slate-200">Policy A: SecureHealth Plus</h4>
                  <span className="text-[10px] font-mono bg-slate-800 px-2 py-0.5 rounded text-slate-300">Current</span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span>Insurance Pays:</span>
                    <span className="font-bold text-emerald-400 font-mono">₹2,45,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Room & Proportionate Penalty:</span>
                    <span className="text-rose-400 font-mono">-₹10,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>10% Senior Co-pay:</span>
                    <span className="text-rose-400 font-mono">-₹29,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Policy Deductible:</span>
                    <span className="text-rose-400 font-mono">-₹20,000</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400">Total Patient OOP:</span>
                  <span className="text-2xl font-black text-rose-400 font-mono">₹74,500</span>
                </div>
                <p className="text-[10px] text-slate-400">Annual premium: ₹18,400 (Saves ₹9,400/yr)</p>
              </div>

              {/* Policy B Impact */}
              <div className="p-5 rounded-xl bg-brand-500/10 border border-brand-500/30 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-sm text-brand-300">Policy B: CareShield Elite</h4>
                  <span className="text-[10px] font-mono bg-brand-900/60 px-2 py-0.5 rounded text-brand-200">Alternative</span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span>Insurance Pays:</span>
                    <span className="font-bold text-emerald-400 font-mono">₹2,82,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Room Penalty:</span>
                    <span className="text-emerald-400 font-mono">₹0 (Single AC Covered)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Co-Payment:</span>
                    <span className="text-emerald-400 font-mono">₹0 (Zero Co-pay)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Deductible:</span>
                    <span className="text-emerald-400 font-mono">₹0</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-brand-500/20 flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400">Total Patient OOP:</span>
                  <span className="text-2xl font-black text-emerald-400 font-mono">₹38,000</span>
                </div>
                <p className="text-[10px] text-slate-400">Annual premium: ₹27,800 (+₹9,400/yr premium cost)</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 text-center pt-2">
              <strong>Takeaway:</strong> Policy B saves ₹36,500 in hospital OOP per surgery, but requires ₹9,400 more in upfront annual premium.
            </p>
          </div>
        </div>
      )}

      {/* Sub-Tab 2: Policy Version Comparison (Section 17) */}
      {activeSubTab === 'version-diff' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-navy-850 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Contract Terms Diff: Policy 2025 vs Policy 2026 Renewal
                </h3>
                <p className="text-xs text-slate-500">
                  Track IRDAI-mandated wording modifications and revised sub-limit schedules
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950 px-2.5 py-1 rounded-lg">
                Renewal Review
              </span>
            </div>

            <div className="space-y-3">
              {POLICY_VERSION_DIFF.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-navy-900/50 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">
                      {item.feature}
                    </span>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                      item.changeType === 'improved'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {item.changeType === 'improved' ? '✓ Improved Coverage' : '⚠ Premium Increase'}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 text-xs font-mono">
                    <span className="text-slate-500 bg-slate-200/60 dark:bg-slate-800 px-2 py-1 rounded line-through">
                      {item.version2025}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-600" />
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-1 rounded">
                      {item.version2026}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    {item.impactExplanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
