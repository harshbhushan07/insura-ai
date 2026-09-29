import React, { useState, useEffect } from 'react';
import { Search, X, FileText, Activity, ShieldAlert, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';
import { ActiveTab } from '../../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: ActiveTab, params?: any) => void;
  onViewEvidence: (evidence: any) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ 
  isOpen, 
  onClose, 
  onNavigate, 
  onViewEvidence 
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const searchableItems = [
    {
      type: 'clause',
      title: 'Room Rent Sub-limit & Proportionate Deduction',
      category: 'Policy Limit',
      snippet: 'Capped at ₹5,000/day. Excess triggers proportionate penalty across doctors and OT.',
      tab: 'my-policy' as ActiveTab,
      evidence: {
        page: 24,
        section: 'Section 6.3 — Proportionate Room Rent Clause',
        clauseText: 'If the insured occupies a room with higher tariff than ₹5,000/day, all associated medical expenses shall be borne proportionately by the insured.',
        simpleExplanation: 'Choosing an ₹8,000 or ₹10,000 room will proportionately reduce reimbursement for doctor consultations, surgeon fees, and OT charges.'
      }
    },
    {
      type: 'treatment',
      title: 'Total Knee Replacement (Unilateral)',
      category: 'Treatment & Cost',
      snippet: 'Admissible after 24-month waiting period. Pune benchmark ₹2.8L - ₹3.7L.',
      tab: 'treatment-cost' as ActiveTab,
    },
    {
      type: 'clause',
      title: 'Cataract Surgery Sub-limit',
      category: 'Policy Clause',
      snippet: 'Capped at ₹45,000 per eye inclusive of IOL lens and daycare charges.',
      tab: 'my-policy' as ActiveTab,
      evidence: {
        page: 7,
        section: 'Section 4.2 — Cataract Treatment Sub-limit',
        clauseText: 'The liability of the Company for Cataract operation shall not exceed ₹45,000 per eye per policy period, inclusive of IOL lens cost.',
        simpleExplanation: 'While your overall policy limit is ₹10 Lakhs, cataract is capped at ₹45,000 per eye.'
      }
    },
    {
      type: 'clause',
      title: 'Senior Co-Payment Terms (10% over age 55)',
      category: 'Cost Sharing',
      snippet: 'Mandatory 10% co-payment on all admissible hospital claims for age 55+.',
      tab: 'financial-calculator' as ActiveTab,
      evidence: {
        page: 16,
        section: 'Section 4.4 — Co-payment Terms',
        clauseText: 'A mandatory co-payment of 10% shall apply to each and every admissible claim for insured persons aged 55 years and above.',
        simpleExplanation: 'For senior claims, 10% of the admissible amount is shared by the patient.'
      }
    },
    {
      type: 'feature',
      title: 'What-If Cost Simulator',
      category: 'Interactive Tool',
      snippet: 'Simulate cost impact of upgrading from ₹5k to ₹10k room or switching network hospital.',
      tab: 'what-if' as ActiveTab,
    },
    {
      type: 'feature',
      title: 'Hospital Bill OCR Analyzer',
      category: 'Bill Audit',
      snippet: 'Upload itemized hospital bill to detect non-medical consumable deductions.',
      tab: 'bill-analyzer' as ActiveTab,
    },
    {
      type: 'clause',
      title: 'Pre-existing Disease Waiting Period (36 Months)',
      category: 'Waiting Period',
      snippet: 'Declared chronic conditions have 8 months remaining out of 36 months.',
      tab: 'my-policy' as ActiveTab,
      evidence: {
        page: 20,
        section: 'Section 5.1.3 — Pre-Existing Disease Clause',
        clauseText: 'Cover for pre-existing conditions shall commence after continuous coverage of 36 months without break.',
        simpleExplanation: 'Declared chronic conditions have 8 months remaining before non-emergency coverage starts.'
      }
    }
  ];

  const filtered = searchableItems.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase()) ||
    item.snippet.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white dark:bg-navy-850 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-navy-900/50">
          <Search className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search policy clauses, treatments, sub-limits, or rules..."
            autoFocus
            className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          {query ? (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block font-mono text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-300 dark:border-slate-700">
              ESC
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-1">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  if (item.evidence) {
                    onViewEvidence(item.evidence);
                  }
                  onNavigate(item.tab);
                  onClose();
                }}
                className="group flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer transition"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center mt-0.5">
                    {item.type === 'clause' ? (
                      <FileText className="w-4 h-4" />
                    ) : item.type === 'treatment' ? (
                      <Activity className="w-4 h-4" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                      {item.snippet}
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center space-x-1 text-slate-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 text-xs font-medium">
                  <span>Open</span>
                  <CornerDownLeft className="w-3.5 h-3.5" />
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-slate-400 text-xs">
              No matching policy clauses or tools found for "{query}".
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-navy-900 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-[11px] text-slate-500">
          <span>Navigate with mouse or keyboard</span>
          <span>Policy: SecureHealth Plus (Active)</span>
        </div>
      </div>
    </div>
  );
};
