import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  UploadCloud, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  ArrowRight, 
  Loader2, 
  Sparkles, 
  HelpCircle, 
  ExternalLink,
  ShieldAlert,
  ArrowDown
} from 'lucide-react';
import { BillLineItem } from '../../types';
import { MOCK_HOSPITAL_BILL_ITEMS } from '../../data/mockData';

interface HospitalBillAnalyzerProps {
  onViewEvidence: (evidence: any) => void;
}

export const HospitalBillAnalyzer: React.FC<HospitalBillAnalyzerProps> = ({ onViewEvidence }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(true);
  const [selectedBillItem, setSelectedBillItem] = useState<BillLineItem>(MOCK_HOSPITAL_BILL_ITEMS[3]); // Consumables by default

  const handleSimulateUpload = () => {
    setIsAnalyzing(true);
    setIsAnalyzed(false);
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsAnalyzed(true);
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-2">
          <FileSpreadsheet className="w-3.5 h-3.5 text-brand-600" />
          <span>Smart Bill OCR & Policy Mapping</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          Hospital Bill Analyzer & Deduction Explainer
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Upload any hospital final bill or estimate to detect non-payable items and proportionate room penalties.
        </p>
      </div>

      {/* Upload Drag & Drop Interface (Section 12) */}
      <div className="p-6 rounded-2xl bg-white dark:bg-navy-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div 
          onClick={handleSimulateUpload}
          className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center hover:bg-slate-50 dark:hover:bg-slate-900/40 transition cursor-pointer group"
        >
          <div className="w-12 h-12 mx-auto rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center group-hover:scale-110 transition">
            {isAnalyzing ? (
              <Loader2 className="w-6 h-6 animate-spin text-brand-600" />
            ) : (
              <UploadCloud className="w-6 h-6" />
            )}
          </div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-3">
            {isAnalyzing ? 'Running OCR Extraction & Line Item Classification...' : 'Upload Hospital Bill'}
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            Drop your hospital invoice PDF/Scan here or click to simulate Apollo Knee Surgery Bill
          </p>
        </div>

        {/* Status Badge */}
        {isAnalyzed && (
          <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs">
            <div className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-200 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Bill analyzed ✓ (Apollo Hospital Invoice #APL-92144 • Total: ₹3,20,000)</span>
            </div>
            <span className="font-mono text-emerald-700 dark:text-emerald-400 text-[11px]">
              5 Line-Items Extracted
            </span>
          </div>
        )}
      </div>

      {/* Itemized Parsed Bill Table */}
      {isAnalyzed && (
        <div className="p-6 rounded-2xl bg-white dark:bg-navy-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Extracted Line-Items & Coverage Audit
              </h3>
              <p className="text-xs text-slate-500">
                Click "Why?" on any expense to review the exact policy exclusion clause
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
              Total Invoiced: ₹3,20,000
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-bold text-[10px]">
                  <th className="py-3 px-3">Item Description</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Amount</th>
                  <th className="py-3 px-3">Policy Status</th>
                  <th className="py-3 px-3 text-right">Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-sans">
                {MOCK_HOSPITAL_BILL_ITEMS.map((item) => (
                  <tr 
                    key={item.id}
                    className={`hover:bg-slate-50 dark:hover:bg-slate-900/60 transition ${
                      selectedBillItem.id === item.id ? 'bg-brand-50/40 dark:bg-brand-950/20' : ''
                    }`}
                  >
                    <td className="py-3.5 px-3 font-semibold text-slate-900 dark:text-white">
                      {item.description}
                    </td>
                    <td className="py-3.5 px-3 text-slate-500">
                      {item.category}
                    </td>
                    <td className="py-3.5 px-3 font-mono font-bold text-slate-900 dark:text-white">
                      ₹{item.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === 'Covered'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : item.status === 'Partially Covered'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => setSelectedBillItem(item)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-brand-600 hover:text-white dark:bg-slate-800 dark:hover:bg-brand-600 text-slate-700 dark:text-slate-300 font-bold transition flex items-center gap-1 ml-auto"
                      >
                        <HelpCircle className="w-3 h-3" />
                        <span>Why?</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Section 13: Bill → Policy Mapping Visual Diagram */}
      <div className="p-6 rounded-2xl bg-white dark:bg-navy-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Automated Legal Grounding
          </span>
          <h3 className="text-base font-black text-slate-900 dark:text-white mt-0.5">
            Bill → Policy Rule Mapping Flow
          </h3>
          <p className="text-xs text-slate-500">
            Interactive relationship graph for selected item: <strong>{selectedBillItem.description}</strong>
          </p>
        </div>

        {/* Visual Flow / Connected Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center relative">
          {/* Step 1: Hospital Bill */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-1.5 relative">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              1. Invoiced Item
            </span>
            <div className="font-bold text-sm text-slate-900 dark:text-white">
              {selectedBillItem.category}
            </div>
            <div className="text-sm font-mono font-black text-brand-600 dark:text-brand-400">
              ₹{selectedBillItem.amount.toLocaleString('en-IN')}
            </div>
          </div>

          {/* Step 2: Policy Rule */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              2. Matched Policy Rule
            </span>
            <div className="font-semibold text-xs text-slate-900 dark:text-white">
              "{selectedBillItem.policyRule}"
            </div>
          </div>

          {/* Step 3: Status */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              3. Claim Status
            </span>
            <span className={`inline-block px-2.5 py-1 rounded text-xs font-bold ${
              selectedBillItem.status === 'Covered'
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
            }`}>
              {selectedBillItem.status}
            </span>
          </div>

          {/* Step 4: Evidence */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-200 block">
              4. Grounded Evidence
            </span>
            <div className="font-bold text-xs text-amber-900 dark:text-amber-100">
              Page {selectedBillItem.evidence.page} • {selectedBillItem.evidence.section}
            </div>
            <button
              onClick={() => onViewEvidence(selectedBillItem.evidence)}
              className="text-[11px] font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1 pt-1"
            >
              <span>View Policy Clause</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Detailed Explanation for Selected Item */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-1">
          <strong className="text-slate-900 dark:text-white">InsuraAI Auditor Note:</strong>
          <p>{selectedBillItem.whyExplanation}</p>
        </div>
      </div>

      {/* Section 14: Claim Deduction Explainer */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-50 to-orange-50 dark:from-navy-900 dark:to-slate-900 border border-rose-200 dark:border-rose-900/60 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 text-rose-800 dark:text-rose-300">
          <ShieldAlert className="w-5 h-5 text-rose-600 flex-shrink-0" />
          <h3 className="font-black text-base">
            Claim Deduction Explainer: "Why was ₹10,000 deducted?"
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="text-slate-400 block text-[10px]">Original Claim Amount</span>
            <span className="font-bold font-mono text-slate-900 dark:text-white text-sm">₹1,20,000</span>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="text-rose-600 dark:text-rose-400 block text-[10px] font-bold">Disallowed Deduction</span>
            <span className="font-bold font-mono text-rose-600 dark:text-rose-400 text-sm">-₹10,000</span>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="text-slate-400 block text-[10px]">Specific Clause Reason</span>
            <span className="font-bold text-slate-900 dark:text-white">Room-rent proportionate deduction</span>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="text-slate-400 block text-[10px]">Policy Evidence</span>
            <button
              onClick={() => onViewEvidence({
                page: 24,
                section: 'Section 6.3 — Proportionate Room Rent Clause',
                clauseText: 'If the insured occupies a room with higher tariff than ₹5,000/day, all associated medical expenses shall be borne proportionately by the insured.',
                simpleExplanation: 'Choosing an ₹8,000 or ₹10,000 room reduces doctor consultations, surgeon fees, and OT charges proportionately.'
              })}
              className="font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
            >
              <span>Page 24, Sec 6.3</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-rose-200 dark:border-rose-900/60 space-y-1.5">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-900 dark:text-white">
            <CheckCircle2 className="w-4 h-4 text-brand-600" />
            <span>Simple Explanation for Patient:</span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            "Your selected hospital room (₹7,500/day) exceeded the policy's allowed room-rent limit of ₹5,000/day. Under Indian health insurance regulations, when you upgrade your room, the insurer proportionately reduces related expenses (such as doctor visits, surgeon fees, and nursing charges) in the same ratio."
          </p>
        </div>
      </div>
    </div>
  );
};
