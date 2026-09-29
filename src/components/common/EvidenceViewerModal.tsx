import React from 'react';
import { X, FileText, Search, ZoomIn, ZoomOut, CheckCircle2, AlertTriangle, ShieldCheck, Download, Share2 } from 'lucide-react';

interface EvidenceViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  evidence: {
    page: number;
    section: string;
    clauseText: string;
    simpleExplanation?: string;
    confidence?: 'HIGH' | 'MEDIUM' | 'LOW';
  } | null;
}

export const EvidenceViewerModal: React.FC<EvidenceViewerModalProps> = ({ isOpen, onClose, evidence }) => {
  if (!isOpen || !evidence) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-navy-850 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-navy-900/80">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Policy Evidence Document Viewer
                </h3>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Grounded & Verified
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                SecureHealth Plus Policy Contract (IRDAI/NL-HLT/SHP/2023) • Page {evidence.page}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button 
              onClick={() => alert("Simulated PDF export: Citing Page " + evidence.page + " Clause " + evidence.section)}
              className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition"
              title="Download Citing Page"
            >
              <Download className="w-4 h-4" />
            </button>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-slate-100/70 dark:bg-navy-900 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center space-x-4">
            <span className="font-mono bg-white dark:bg-slate-800 px-2 py-1 rounded border border-slate-300 dark:border-slate-700">
              Page {evidence.page} of 42
            </span>
            <span className="text-slate-400">•</span>
            <span className="font-medium text-brand-600 dark:text-brand-400">
              {evidence.section}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 bg-white dark:bg-slate-800 px-2 py-1 rounded border border-slate-300 dark:border-slate-700">
              <ZoomOut className="w-3.5 h-3.5 text-slate-500 cursor-pointer" />
              <span className="font-mono px-1">100%</span>
              <ZoomIn className="w-3.5 h-3.5 text-slate-500 cursor-pointer" />
            </div>
            <div className="flex items-center space-x-1.5 text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded border border-amber-200 dark:border-amber-900/60 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
              Clause Highlighted
            </div>
          </div>
        </div>

        {/* Document Body & Analysis Split */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800">
          {/* Simulated Authentic Document Page */}
          <div className="lg:col-span-7 p-6 sm:p-8 bg-slate-100/50 dark:bg-navy-950 overflow-y-auto max-h-[60vh] lg:max-h-none">
            <div className="bg-white dark:bg-slate-900 shadow-lg border border-slate-200 dark:border-slate-800 rounded-xl p-8 max-w-2xl mx-auto font-serif text-slate-800 dark:text-slate-200 text-sm leading-relaxed relative">
              {/* Watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none font-sans font-black text-6xl rotate-[-25deg]">
                OFFICIAL POLICY SCHEDULE
              </div>

              {/* Document Header */}
              <div className="border-b-2 border-slate-900 dark:border-slate-600 pb-3 mb-6 font-sans">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-black tracking-wider text-xs uppercase text-slate-900 dark:text-white">
                      STARHEALTH UNIVERSAL ASSURANCE CO. LTD.
                    </h4>
                    <p className="text-[10px] text-slate-500">Corporate Reg No: IRDAI/NL-HLT/SHP/2023/V4</p>
                  </div>
                  <span className="font-mono text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700">
                    Doc Ref: POL-8942-X
                  </span>
                </div>
              </div>

              {/* Preceding text */}
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-4 select-none italic font-sans">
                [...continued from preceding clauses regarding eligibility, pre-authorization, and network hospital standards...]
              </p>

              {/* Active Section */}
              <div className="mb-4">
                <h5 className="font-sans font-bold text-sm text-slate-900 dark:text-white mb-2">
                  {evidence.section}
                </h5>
                <p className="text-slate-600 dark:text-slate-400 text-xs mb-3">
                  Under the terms of this Comprehensive Health Insurance contract, the following terms, definitions, and limitations shall govern the indemnity of benefits:
                </p>

                {/* Highlighted Yellow Excerpt */}
                <div className="my-4 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 relative">
                  <div className="absolute top-2 right-2 text-[10px] font-sans font-bold bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100 px-1.5 py-0.5 rounded uppercase">
                    Cited Excerpt
                  </div>
                  <blockquote className="text-sm font-semibold text-slate-900 dark:text-amber-100 leading-relaxed font-sans pr-14">
                    "{evidence.clauseText}"
                  </blockquote>
                </div>

                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  Provided always that the Company shall not be liable to make any payment under this policy in respect of any expenses whatsoever incurred by any Insured Person in connection with or in respect of any conditions not fulfilling the criteria of Medical Necessity as defined under Section 1.4.
                </p>
              </div>

              {/* Document Footer */}
              <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 text-[10px] font-sans text-slate-400 flex justify-between items-center">
                <span>Policy Terms & Conditions v2025.1</span>
                <span>Page {evidence.page} of 42</span>
              </div>
            </div>
          </div>

          {/* Right Side: Simple Plain-Language Intelligence */}
          <div className="lg:col-span-5 p-6 bg-white dark:bg-navy-850 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  AI Clause Intelligence
                </span>
                <h4 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                  Why this clause matters
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Automated translation from complex legal jargon into clear financial takeaways.
                </p>
              </div>

              {/* Confidence Indicator */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
                    Extraction Grounding
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    Exact Match (Verified)
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
                    Evidence Confidence
                  </span>
                  <span className="inline-flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                    {evidence.confidence || 'HIGH'} (99.4%)
                  </span>
                </div>
              </div>

              {/* Plain English Translation */}
              <div className="p-4 rounded-xl bg-brand-50/60 dark:bg-brand-950/30 border border-brand-200/80 dark:border-brand-900/60 space-y-2">
                <div className="flex items-center space-x-2 text-brand-800 dark:text-brand-300 font-bold text-xs uppercase tracking-wide">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  <span>Plain Language Summary</span>
                </div>
                <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                  {evidence.simpleExplanation || 'This clause establishes the specific limits, deductibles, or waiting conditions that dictate your final reimbursement amount.'}
                </p>
              </div>

              {/* Financial Takeaway Alert */}
              <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 space-y-2">
                <div className="flex items-center space-x-2 text-amber-800 dark:text-amber-300 font-bold text-xs uppercase tracking-wide">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Financial Impact & Recommendation</span>
                </div>
                <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 list-disc pl-4 leading-normal">
                  <li>Request a standard AC room (capped at ₹5,000) to avoid proportionate deductions on surgeon fees.</li>
                  <li>Confirm whether your planned hospital is in the insurer's cashless network.</li>
                  <li>Submit pre-authorization at least 48 hours prior to planned hospital admission.</li>
                </ul>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between mt-6">
              <span className="text-[11px] text-slate-400">
                Grounded in policy PDF hash #e3b0c44
              </span>
              <button
                onClick={onClose}
                className="px-5 py-2 text-xs font-semibold rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition shadow"
              >
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
