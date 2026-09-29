import React, { useState } from 'react';
import { 
  CheckSquare, 
  FileCheck, 
  AlertCircle, 
  Clock, 
  Download, 
  Printer, 
  Sparkles, 
  CheckCircle2, 
  Upload, 
  FileText,
  ShieldCheck,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ClaimChecklistItem } from '../../types';
import { CLAIM_CHECKLIST_DATA } from '../../data/mockData';

export const ClaimAssistant: React.FC = () => {
  const [checklist, setChecklist] = useState<ClaimChecklistItem[]>(CLAIM_CHECKLIST_DATA);
  const [isGenerated, setIsGenerated] = useState(false);

  const readyCount = checklist.filter(item => item.status === 'ready').length;
  const readinessPercent = Math.round((readyCount / checklist.length) * 100);

  const toggleItem = (id: string) => {
    setChecklist(prev => {
      const updated = prev.map(item => {
        if (item.id === id) {
          const nextStatus = item.status === 'ready' ? 'missing' : 'ready';
          return { ...item, status: nextStatus as 'ready' | 'missing' };
        }
        return item;
      });

      const newReady = updated.filter(item => item.status === 'ready').length;
      if (newReady === updated.length) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      return updated;
    });
  };

  const handleGenerateDossier = () => {
    setIsGenerated(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-2">
          <CheckSquare className="w-3.5 h-3.5 text-brand-600" />
          <span>Cashless & Reimbursement Preparation Dossier</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          Claim Assistant
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Prepare an airtight insurance claim package to prevent queries and avoidable deductions.
        </p>
      </div>

      {/* Progress Readiness Bar Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-navy-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Pre-Authorization Readiness Score
            </span>
            <div className="text-3xl font-black text-slate-900 dark:text-white font-mono mt-0.5 flex items-center gap-2">
              <span>{readinessPercent}%</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                readinessPercent >= 80 
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
              }`}>
                {readinessPercent >= 80 ? 'High Settlement Probability' : 'Action Required'}
              </span>
            </div>
          </div>

          <button
            onClick={handleGenerateDossier}
            className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs transition shadow flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate Claim Checklist</span>
          </button>
        </div>

        {/* Progress Visual Bar */}
        <div className="space-y-1.5">
          <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 rounded-full ${
                readinessPercent >= 80 ? 'bg-emerald-500' : 'bg-gradient-to-r from-amber-500 to-brand-600'
              }`}
              style={{ width: `${readinessPercent}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>{readyCount} of {checklist.length} essential items verified</span>
            <span>Target: 100% prior to TPA submission</span>
          </div>
        </div>
      </div>

      {/* Interactive Checklist Grid */}
      <div className="bg-white dark:bg-navy-850 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-base font-black text-slate-900 dark:text-white">
            Required Pre-Authorization & Claim Artifacts
          </h3>
          <span className="text-xs text-slate-400">
            Click row to check or uncheck document
          </span>
        </div>

        <div className="space-y-2.5">
          {checklist.map((item) => {
            const isReady = item.status === 'ready';
            const isPending = item.status === 'pending';

            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`p-4 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                  isReady
                    ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20'
                    : isPending
                    ? 'border-amber-200 dark:border-amber-900/60 bg-amber-50/30 dark:bg-amber-950/20'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-navy-900/50 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-start space-x-3.5">
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center mt-0.5 transition ${
                    isReady 
                      ? 'bg-emerald-600 text-white' 
                      : 'border-2 border-slate-300 dark:border-slate-600 text-transparent'
                  }`}>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className={`text-xs font-bold ${isReady ? 'text-slate-900 dark:text-white line-through opacity-80' : 'text-slate-900 dark:text-white'}`}>
                        {item.title}
                      </h4>
                      {item.required && (
                        <span className="text-[10px] font-semibold text-rose-500 bg-rose-50 dark:bg-rose-950 px-1.5 py-0.2 rounded">
                          Mandatory
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isReady
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : isPending
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {isReady ? '✓ Verified' : isPending ? '⚠ Pending Hospital' : '☐ Missing'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Generated Dossier Preview (appears after clicking Generate) */}
      {isGenerated && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-navy-950 text-white shadow-xl space-y-5 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm">InsuraAI Claim Ready Dossier Generated</h4>
                <p className="text-xs text-slate-400">
                  Ready for submission to StarHealth TPA desk at Apollo Hospital Pune
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button 
                onClick={() => alert("Simulating download of formatted Claim Package (PDF)")}
                className="px-3.5 py-1.5 rounded-xl bg-white text-slate-900 text-xs font-bold hover:bg-slate-100 transition flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Dossier PDF</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Insured ID</span>
              <p className="font-bold text-white font-mono">SHP-9082-IND • Harsh Bhushan</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Planned Surgery</span>
              <p className="font-bold text-white">Total Knee Replacement (ICD-10 Z96.65)</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Estimated Pre-Auth</span>
              <p className="font-bold text-emerald-400 font-mono">₹2,47,500 Cashless Approved</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
