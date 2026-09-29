import React, { useState, useEffect } from 'react';
import { X, UploadCloud, FileText, CheckCircle2, Loader2, Sparkles, Shield, AlertCircle, ArrowRight } from 'lucide-react';
import { ACTIVE_POLICY } from '../../data/mockData';

interface PolicyUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPolicyLoaded: () => void;
}

export const PolicyUploadModal: React.FC<PolicyUploadModalProps> = ({ isOpen, onClose, onPolicyLoaded }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPreset, setSelectedPreset] = useState<string>('securehealth');
  const [uploadProgress, setUploadProgress] = useState(0);

  const steps = [
    'Reading policy document PDF & OCR text streams...',
    'Extracting policy schedule, sum insured, and sub-limits...',
    'Analyzing room-rent proportionate deductions & co-pay terms...',
    'Parsing 142 exclusion clauses & waiting period timelines...',
    'Synthesizing Policy Digital Twin & knowledge graph... Complete!'
  ];

  const presets = [
    {
      id: 'securehealth',
      name: 'SecureHealth Plus 2025 (Active Demo)',
      details: '₹10,00,000 Sum Insured • ₹5,000/day Room Rent • 10% Co-pay',
      filename: 'SecureHealth_Plus_Schedule_2025.pdf',
      size: '2.4 MB'
    },
    {
      id: 'careshield',
      name: 'CareShield Elite Floater',
      details: '₹15,00,000 Sum Insured • Single Standard AC • 0% Co-pay',
      filename: 'CareShield_Elite_Floater_Policy.pdf',
      size: '3.1 MB'
    },
    {
      id: 'starhealth',
      name: 'Star Comprehensive Health Cover',
      details: '₹7,50,000 Sum Insured • Standard Room • ₹25,000 Deductible',
      filename: 'Star_Comprehensive_Terms_v2.pdf',
      size: '1.9 MB'
    }
  ];

  const handleStartAnalysis = () => {
    setIsProcessing(true);
    setCurrentStep(0);
    setUploadProgress(15);
  };

  useEffect(() => {
    if (!isProcessing) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          setUploadProgress((p) => Math.min(p + 22, 98));
          return prev + 1;
        } else {
          clearInterval(interval);
          setUploadProgress(100);
          setTimeout(() => {
            setIsProcessing(false);
            onPolicyLoaded();
            onClose();
          }, 600);
          return prev;
        }
      });
    }, 700);

    return () => clearInterval(interval);
  }, [isProcessing]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-navy-850 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Upload & Ingest Insurance Policy
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Transforms static policy PDFs into a queryable, evidence-backed Digital Twin
              </p>
            </div>
          </div>
          {!isProcessing && (
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {!isProcessing ? (
            <>
              {/* Drag and Drop Box */}
              <div 
                onClick={handleStartAnalysis}
                className="border-2 border-dashed border-brand-300 dark:border-brand-700/60 rounded-2xl p-8 text-center bg-brand-50/30 dark:bg-brand-950/20 hover:bg-brand-50/60 dark:hover:bg-brand-950/40 transition cursor-pointer group"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-white dark:bg-slate-800 shadow-md flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-110 transition duration-200">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <h4 className="mt-4 font-bold text-slate-900 dark:text-white text-base">
                  Drag and drop your policy document
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                  Supports PDF policy schedules, wordings, and endorsement annexures (up to 50 MB)
                </p>
                <div className="mt-4 inline-flex items-center space-x-2 text-xs font-semibold text-brand-600 dark:text-brand-400 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <span>Browse File on Computer</span>
                </div>
              </div>

              {/* Or Select Preset Demo */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Or select pre-loaded policy dataset:
                  </span>
                  <span className="text-[11px] text-brand-600 dark:text-brand-400 font-medium">
                    100% Synthetic Demo Data
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {presets.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setSelectedPreset(p.id)}
                      className={`p-3.5 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                        selectedPreset === p.id
                          ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/40 dark:border-brand-500 ring-2 ring-brand-500/20'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-navy-900/50 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <FileText className={`w-5 h-5 ${selectedPreset === p.id ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400'}`} />
                        <div>
                          <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
                            {p.name}
                            {p.id === 'securehealth' && (
                              <span className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 px-1.5 py-0.2 rounded font-semibold">
                                Recommended
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {p.details}
                          </div>
                        </div>
                      </div>

                      <div className="text-right font-mono text-[11px] text-slate-400">
                        {p.size}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* AI Processing Pipeline View */
            <div className="py-6 space-y-6">
              <div className="text-center space-y-2">
                <div className="relative inline-flex items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center animate-pulse">
                    <Sparkles className="w-8 h-8" />
                  </div>
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Ingesting Policy & Building Digital Twin...
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Grounding clauses, extracting numerical limits, and indexing legal definitions
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <span>Knowledge Synthesis</span>
                  <span className="font-mono">{uploadProgress}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-brand-600 to-accent-teal rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* Sequential Steps Checklist */}
              <div className="space-y-2.5 bg-slate-50 dark:bg-navy-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                {steps.map((s, idx) => (
                  <div key={idx} className="flex items-center space-x-3 text-xs">
                    {idx < currentStep ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    ) : idx === currentStep ? (
                      <Loader2 className="w-4 h-4 text-brand-600 animate-spin flex-shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-700 flex-shrink-0"></div>
                    )}
                    <span className={`font-medium ${
                      idx < currentStep 
                        ? 'text-slate-800 dark:text-slate-200 font-semibold' 
                        : idx === currentStep 
                        ? 'text-brand-600 dark:text-brand-400 font-bold' 
                        : 'text-slate-400'
                    }`}>
                      {s}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-navy-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-[11px] text-slate-500">
            <Shield className="w-3.5 h-3.5 text-emerald-500" />
            <span>Zero Data Leakage • Local Sandbox Processing</span>
          </div>

          {!isProcessing && (
            <button
              onClick={handleStartAnalysis}
              className="px-6 py-2.5 text-xs font-bold rounded-xl bg-brand-600 text-white hover:bg-brand-700 transition shadow flex items-center gap-1.5"
            >
              <span>Analyze Policy</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
