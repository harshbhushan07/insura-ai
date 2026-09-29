import React, { useState } from 'react';
import { 
  Stethoscope, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  MapPin, 
  Building2, 
  DollarSign, 
  TrendingUp, 
  FileText, 
  ArrowRight, 
  ExternalLink,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  Cell 
} from 'recharts';
import { TreatmentOption, ActiveTab } from '../../types';
import { TREATMENTS_DATABASE } from '../../data/mockData';

interface TreatmentCostIntelligenceProps {
  onNavigate: (tab: ActiveTab) => void;
  onViewEvidence: (evidence: any) => void;
}

export const TreatmentCostIntelligence: React.FC<TreatmentCostIntelligenceProps> = ({
  onNavigate,
  onViewEvidence
}) => {
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string>('knee-replacement');
  const [patientAge, setPatientAge] = useState<number>(55);
  const [selectedCity, setSelectedCity] = useState<string>('Pune');
  const [hospitalType, setHospitalType] = useState<string>('Private');
  const [selectedRoomRent, setSelectedRoomRent] = useState<number>(8000);
  const [isChecked, setIsChecked] = useState<boolean>(true);

  const currentTreatment = TREATMENTS_DATABASE.find(t => t.id === selectedTreatmentId) || TREATMENTS_DATABASE[0];
  const cityData = currentTreatment.cities[selectedCity] || currentTreatment.cities['Pune'];

  const chartData = [
    { name: 'Consultation', amount: cityData.breakdown.consultation, fill: '#6366f1' },
    { name: 'Diagnostics', amount: cityData.breakdown.diagnostics, fill: '#8b5cf6' },
    { name: 'Surgery / OT', amount: cityData.breakdown.surgery, fill: '#3b82f6' },
    { name: 'Hospital Stay', amount: cityData.breakdown.hospitalization, fill: '#06b6d4' },
    { name: 'Pharmacy', amount: cityData.breakdown.medicines, fill: '#10b981' },
    { name: 'Follow-up', amount: cityData.breakdown.followUp, fill: '#f59e0b' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-2">
          <Stethoscope className="w-3.5 h-3.5 text-brand-600" />
          <span>Treatment Cost Intelligence & Eligibility Engine</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          Treatment Eligibility & Cost Intelligence
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Predict costs and verify clause coverage across major Indian healthcare centers before admission.
        </p>
      </div>

      {/* Form Input Section */}
      <div className="p-6 rounded-2xl bg-white dark:bg-navy-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Configure Planned Treatment Scenario
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Treatment Dropdown */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Treatment Procedure
            </label>
            <div className="relative">
              <select
                value={selectedTreatmentId}
                onChange={(e) => setSelectedTreatmentId(e.target.value)}
                className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-900 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {TREATMENTS_DATABASE.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Patient Age */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex justify-between">
              <span>Patient Age</span>
              <span className="font-mono text-brand-600">{patientAge} yrs</span>
            </label>
            <input
              type="number"
              min={18}
              max={95}
              value={patientAge}
              onChange={(e) => setPatientAge(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-900 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* City */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              City
            </label>
            <div className="relative">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-900 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="Pune">Pune</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Hospital Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Hospital Type
            </label>
            <div className="relative">
              <select
                value={hospitalType}
                onChange={(e) => setHospitalType(e.target.value)}
                className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-900 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="Private">Private Hospital (Network)</option>
                <option value="Super Specialty">Super Specialty (Tertiary)</option>
                <option value="Semi-Private">Semi-Private / Trust</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Room Tariff */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Room Category
            </label>
            <div className="relative">
              <select
                value={selectedRoomRent}
                onChange={(e) => setSelectedRoomRent(Number(e.target.value))}
                className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-900 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value={5000}>₹5,000/day (Policy Standard)</option>
                <option value={8000}>₹8,000/day (Deluxe Single)</option>
                <option value={12000}>₹12,000/day (Executive Suite)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={() => setIsChecked(true)}
            className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition shadow flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Check Eligibility & Estimate Cost</span>
          </button>
        </div>
      </div>

      {/* Results Grid: Eligibility + Cost Intelligence */}
      {isChecked && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Eligibility Card (Section 6) */}
          <div className="lg:col-span-5 bg-white dark:bg-navy-850 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Policy Status
                </span>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  TREATMENT ELIGIBILITY
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                🟢 Potentially Covered
              </span>
            </div>

            {/* Confidence */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500">Coverage Confidence</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {currentTreatment.policyEligibility.confidence} (IRDAI Grounded)
              </span>
            </div>

            {/* Applicable Conditions List */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                Applicable Conditions:
              </span>
              <div className="space-y-2 text-xs">
                <div className="flex items-start space-x-2 text-slate-800 dark:text-slate-200 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Hospitalization coverage applies (Inpatient &gt; 24h)</span>
                </div>
                <div className="flex items-start space-x-2 text-slate-800 dark:text-slate-200 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Surgery is listed under covered procedures</span>
                </div>
                {selectedRoomRent > 5000 && (
                  <div className="flex items-start space-x-2 text-amber-700 dark:text-amber-300 font-medium">
                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Room-rent limit (₹5,000/day) may affect reimbursement proportionately</span>
                  </div>
                )}
                {patientAge >= 55 && (
                  <div className="flex items-start space-x-2 text-amber-700 dark:text-amber-300 font-medium">
                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>10% co-pay applies (Insured age 55 or above)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Evidence Citation */}
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 space-y-2 text-xs">
              <div className="flex items-center justify-between text-amber-900 dark:text-amber-200 font-bold">
                <span>Evidence: Policy Page {currentTreatment.policyEligibility.evidence.page}</span>
                <span className="font-mono text-[11px]">{currentTreatment.policyEligibility.evidence.section}</span>
              </div>
              <p className="text-slate-700 dark:text-amber-100/90 italic leading-relaxed font-serif text-[11px]">
                "{currentTreatment.policyEligibility.evidence.clauseText}"
              </p>
              <button
                onClick={() => onViewEvidence({
                  page: currentTreatment.policyEligibility.evidence.page,
                  section: currentTreatment.policyEligibility.evidence.section,
                  clauseText: currentTreatment.policyEligibility.evidence.clauseText,
                  simpleExplanation: 'This procedure is explicitly recognized under surgical benefits post 24-month waiting tenure.',
                  confidence: 'HIGH'
                })}
                className="pt-1 text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
              >
                <span>[View Evidence in Policy PDF]</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Button to proceed to financial calculator */}
            <button
              onClick={() => onNavigate('financial-calculator')}
              className="w-full py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition shadow flex items-center justify-center space-x-2"
            >
              <span>Calculate Out-of-Pocket Breakdown</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right: Treatment Cost Intelligence (Section 7) */}
          <div className="lg:col-span-7 bg-white dark:bg-navy-850 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Treatment Cost Intelligence
                </h3>
                <p className="text-xs text-slate-500">
                  {currentTreatment.name} • {selectedCity} • {hospitalType}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Estimated Range
                </span>
                <span className="text-sm font-black text-slate-900 dark:text-white font-mono">
                  ₹{(cityData.minCost / 100000).toFixed(1)}L — ₹{(cityData.maxCost / 100000).toFixed(1)}L
                </span>
              </div>
            </div>

            {/* Median Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-brand-50 to-indigo-50 dark:from-brand-950/40 dark:to-indigo-950/40 border border-brand-200 dark:border-brand-900/60 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-brand-700 dark:text-brand-300 block">
                  Median Cost Estimate
                </span>
                <span className="text-2xl font-black text-brand-900 dark:text-white font-mono">
                  ₹{cityData.medianCost.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  Confidence: MEDIUM
                </span>
                <p className="text-[11px] text-slate-500 mt-1 max-w-[200px]">
                  "Hospital-specific pricing is unavailable - based on {selectedCity} benchmark."
                </p>
              </div>
            </div>

            {/* Recharts Bar Range Visualization */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                Itemized Cost Distribution (₹ INR)
              </span>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} />
                    <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `₹${v/1000}k`} />
                    <Tooltip 
                      formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Cost']}
                      contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                    />
                    <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Breakdown Table */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                Detailed Component Breakdown
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Doctor consultation</span>
                  <span className="font-bold font-mono text-slate-900 dark:text-white">
                    ₹{cityData.breakdown.consultation.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Diagnostics & Labs</span>
                  <span className="font-bold font-mono text-slate-900 dark:text-white">
                    ₹{cityData.breakdown.diagnostics.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Surgery / OT Charges</span>
                  <span className="font-bold font-mono text-slate-900 dark:text-white">
                    ₹{cityData.breakdown.surgery.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Hospitalization Boarding</span>
                  <span className="font-bold font-mono text-slate-900 dark:text-white">
                    ₹{cityData.breakdown.hospitalization.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Medicines & Consumables</span>
                  <span className="font-bold font-mono text-slate-900 dark:text-white">
                    ₹{cityData.breakdown.medicines.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Recovery / Follow-up</span>
                  <span className="font-bold font-mono text-slate-900 dark:text-white">
                    ₹{cityData.breakdown.followUp.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
