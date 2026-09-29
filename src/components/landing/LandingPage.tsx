import React from 'react';
import { 
  Shield, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Activity, 
  FileText, 
  Calculator, 
  SlidersHorizontal, 
  Search, 
  ShieldCheck, 
  TrendingUp, 
  AlertTriangle,
  Play
} from 'lucide-react';
import { ACTIVE_POLICY } from '../../data/mockData';

interface LandingPageProps {
  onAnalyzePolicy: () => void;
  onEnterDashboard: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onAnalyzePolicy,
  onEnterDashboard
}) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900 text-slate-900 dark:text-slate-100 flex flex-col justify-between selection:bg-brand-500 selection:text-white">
      {/* Top Navbar */}
      <header className="px-6 lg:px-12 py-5 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-navy-900/80 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-teal flex items-center justify-center text-white shadow-glow">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                Insura<span className="text-brand-600 dark:text-brand-400">AI</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-mono">
                FIN-01 Prototype
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium hidden sm:block">
              Policy-to-Patient Coverage & Cost Intelligence
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={onEnterDashboard}
            className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition"
          >
            Live Demo
          </button>
          <button
            onClick={onAnalyzePolicy}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 text-white hover:bg-brand-700 shadow-md shadow-brand-600/20 transition flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Analyze My Policy</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headlines & CTA */}
        <div className="lg:col-span-7 space-y-8">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Next-Gen Healthcare FinTech Decision Platform</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              Insurance shouldn't be a <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-accent-teal bg-clip-text text-transparent">puzzle</span>.
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl">
              InsuraAI transforms complex insurance policies into clear, evidence-backed treatment and cost decisions.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={onAnalyzePolicy}
              className="px-8 py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-base font-bold shadow-xl shadow-brand-600/25 transition-all duration-200 flex items-center justify-center space-x-2 group hover:translate-y-[-2px]"
            >
              <span>Analyze My Policy</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>

            <button
              onClick={onEnterDashboard}
              className="px-8 py-4 rounded-2xl bg-white dark:bg-navy-850 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-white text-base font-bold border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-200 flex items-center justify-center space-x-2 hover:translate-y-[-2px]"
            >
              <Play className="w-4 h-4 text-brand-600 dark:text-brand-400 fill-brand-600 dark:fill-brand-400" />
              <span>View Interactive Demo</span>
            </button>
          </div>

          {/* Trust Statement */}
          <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400">
            <ShieldCheck className="w-5 h-5 text-emerald-500 flex-shrink-0" />
            <p className="leading-normal">
              <strong>Responsible Decision Engine:</strong> AI-generated insights are supported by policy evidence and clearly identify uncertainty.
            </p>
          </div>
        </div>

        {/* Right Column: Visual Dashboard Mockup */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* Glowing Backdrop Blob */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-brand-500/20 to-accent-teal/20 rounded-3xl blur-2xl -z-10"></div>

            {/* Main Interactive Card Frame */}
            <div className="bg-white dark:bg-navy-850 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5">
              {/* Header inside mockup */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-black text-sm text-slate-900 dark:text-white">SecureHealth Plus</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      ACTIVE
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">POL-8942-X • Sum Insured ₹10,00,000</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-slate-500 block">Remaining</span>
                  <span className="text-sm font-black text-slate-900 dark:text-white">₹7,60,000</span>
                </div>
              </div>

              {/* Treatment Query Preview */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-brand-600" /> Planned Surgery
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">Knee Replacement (Pune)</span>
                </div>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-500">Estimated Procedure Cost</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono">₹3,20,000</span>
                </div>
              </div>

              {/* Coverage & OOP Split */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60">
                  <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 block">
                    Insurance Pays
                  </span>
                  <span className="text-lg font-black text-emerald-700 dark:text-emerald-200 font-mono">
                    ₹2,47,500
                  </span>
                  <span className="text-[10px] text-emerald-600/80 dark:text-emerald-400 block mt-0.5">
                    77.3% Covered
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60">
                  <span className="text-[11px] font-semibold text-rose-700 dark:text-rose-300 block">
                    Your Out-of-Pocket
                  </span>
                  <span className="text-lg font-black text-rose-700 dark:text-rose-200 font-mono">
                    ₹72,500
                  </span>
                  <span className="text-[10px] text-rose-600/80 dark:text-rose-400 block mt-0.5">
                    Co-pay + Consumables
                  </span>
                </div>
              </div>

              {/* Evidence Citation Tag */}
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                  <span className="font-semibold text-amber-900 dark:text-amber-200 text-[11px]">
                    Clause 5.2 Cited (Page 18)
                  </span>
                </div>
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wide bg-amber-200/60 dark:bg-amber-900/60 px-2 py-0.5 rounded">
                  High Confidence
                </span>
              </div>

              {/* Click to Demo Button */}
              <button
                onClick={onEnterDashboard}
                className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:bg-slate-800 dark:hover:bg-slate-100 transition shadow"
              >
                Explore Live Interactive Twin →
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* 4 Feature Cards Section */}
      <section className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-navy-850/50 py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Core Decision Pillars
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Transforming dense 40-page insurance PDF contracts into actionable financial predictions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition space-y-3">
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                ✓ Policy Intelligence
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Extracts room-rent limits, 10% co-pays, deductibles, waiting periods, and exclusions into a queryable Policy Digital Twin.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition space-y-3">
              <div className="w-12 h-12 rounded-xl bg-accent-teal/10 text-accent-teal flex items-center justify-center">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                ✓ Treatment Cost Intelligence
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Hospital and city benchmarks across Pune, Mumbai, Delhi, and Bangalore with itemized procedure and doctor cost distributions.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                ✓ Evidence-Backed Answers
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Zero hallucination policy chat. Every answer visually cites exact policy PDF page numbers and highlighted legal clauses.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                ✓ Out-of-Pocket Estimation
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Waterfall deduction calculator exposing room-rent proportionate penalties, non-medical consumables, and deductible impacts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 px-6 lg:px-12 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          © 2026 InsuraAI • Prototype for FIN-01 "Policy-to-Patient Intelligence"
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-slate-500">Synthetic Demo Environment</span>
          <button onClick={onEnterDashboard} className="text-brand-600 dark:text-brand-400 font-semibold hover:underline">
            Launch Platform
          </button>
        </div>
      </footer>
    </div>
  );
};
