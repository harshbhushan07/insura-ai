import React from 'react';
import { 
  ShieldCheck, 
  Search, 
  HelpCircle, 
  Calculator, 
  UserCheck, 
  FileText, 
  CheckCircle2,
  Lock,
  Database,
  Cpu
} from 'lucide-react';

export const TrustCenter: React.FC = () => {
  const principles = [
    {
      title: 'Evidence First',
      icon: Search,
      color: 'text-brand-600 dark:text-brand-400 bg-brand-500/10',
      description: 'Every policy answer cites supporting evidence.',
      details: 'InsuraAI never produces free-form summaries without anchoring to an exact page number, section code, and verbatim clause excerpt from your policy contract.'
    },
    {
      title: 'No Guessing',
      icon: HelpCircle,
      color: 'text-amber-600 dark:text-amber-400 bg-amber-500/10',
      description: 'Missing information is explicitly flagged.',
      details: 'When critical variables like hospital network accreditation or exact implant models are unknown, the engine flags uncertainty instead of hallucinating precise bills.'
    },
    {
      title: 'Transparent Calculations',
      icon: Calculator,
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10',
      description: 'Cost calculations show their components.',
      details: 'No black-box math. Every out-of-pocket projection is presented as an itemized waterfall: non-payables, room adjustments, co-pays, and deductibles.'
    },
    {
      title: 'Human Verification',
      icon: UserCheck,
      color: 'text-purple-600 dark:text-purple-400 bg-purple-500/10',
      description: 'Informational decision support for patients.',
      details: 'AI output serves as structured preparation intelligence. Final financial commitments must be validated with the hospital TPA desk and insurance underwriter.'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
          <span>Ethical & Grounded Healthcare AI</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          Responsible AI & Trust Center
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Our core architecture principles ensuring zero hallucination, safety, and transparency.
        </p>
      </div>

      {/* 4 Core Principles Cards (Section 20) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {principles.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-navy-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-xl ${p.color} flex items-center justify-center font-bold`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {p.title}
                  </h3>
                  <p className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                    {p.description}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                {p.details}
              </p>
            </div>
          );
        })}
      </div>

      {/* Audit Log & Sandbox Status */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <Cpu className="w-4 h-4 text-brand-600" />
          <span>System Integrity & Verifiability Audit</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Document Hash</span>
            <span className="font-mono text-slate-900 dark:text-white font-bold truncate block">#sha256-e3b0c44298fc1c149af</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Data Privacy</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
              <Lock className="w-3.5 h-3.5" /> Zero PHI Uploaded to Cloud
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Regulatory Framework</span>
            <span className="font-bold text-slate-900 dark:text-white">IRDAI Health Regulations 2024</span>
          </div>
        </div>
      </div>
    </div>
  );
};
