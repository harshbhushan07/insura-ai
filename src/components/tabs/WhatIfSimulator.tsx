import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  ArrowRight, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  FileText,
  Building2,
  BedDouble,
  Activity
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Legend, 
  CartesianGrid 
} from 'recharts';

interface WhatIfSimulatorProps {
  onViewEvidence: (evidence: any) => void;
}

export const WhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({ onViewEvidence }) => {
  // Simulator Controls
  const [selectedRoom, setSelectedRoom] = useState<number>(10000); // 5000, 8000, 10000
  const [selectedHospitalTier, setSelectedHospitalTier] = useState<'network' | 'non-network'>('network');
  const [treatmentTech, setTreatmentTech] = useState<'standard' | 'premium'>('standard');

  // Baseline Scenario (Room: ₹5,000, Network, Standard):
  const baseline = {
    room: 5000,
    hospital: 'Network (Apollo Pune)',
    tech: 'Standard Cruciate-Retaining',
    bill: 300000,
    insurance: 245000,
    oop: 55000,
    roomPenalty: 0,
  };

  // Calculate Dynamic New Scenario based on controls:
  const calculateScenario = () => {
    let bill = 300000;
    let roomDiff = selectedRoom - 5000; // e.g. 5000 if 10000
    let days = 4;
    let roomDeduction = roomDiff > 0 ? roomDiff * days : 0;
    
    // Proportionate reduction on surgical & OT fees if room > 5000
    let proportionateRatio = selectedRoom > 5000 ? (selectedRoom - 5000) / selectedRoom : 0;
    let surgicalPenalty = Math.round(200000 * proportionateRatio * 0.4); // insurer cuts portion of OT/doctor fee
    
    // Tech premium
    let techExtra = treatmentTech === 'premium' ? 35000 : 0;
    // Network penalty
    let networkExtra = selectedHospitalTier === 'non-network' ? 25000 : 0;

    let totalOOP = 55000 + roomDeduction + surgicalPenalty + techExtra + networkExtra;
    let newBill = bill + (roomDiff * days) + techExtra;
    let newInsurance = Math.max(0, newBill - totalOOP);

    return {
      bill: newBill,
      insurance: newInsurance,
      oop: totalOOP,
      delta: totalOOP - baseline.oop,
      roomPenalty: roomDeduction + surgicalPenalty
    };
  };

  const newScenario = calculateScenario();

  const comparisonChartData = [
    {
      scenario: 'Current (₹5k Room)',
      'Insurance Contribution': baseline.insurance,
      'Your Out-of-Pocket': baseline.oop,
    },
    {
      scenario: `Simulated (₹${selectedRoom/1000}k Room)`,
      'Insurance Contribution': newScenario.insurance,
      'Your Out-of-Pocket': newScenario.oop,
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-brand-600" />
          <span>Interactive Decision Sandbox</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          What If?
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          See how treatment and policy choices can change your estimated cost.
        </p>
      </div>

      {/* Interactive Controls Bar */}
      <div className="p-6 rounded-2xl bg-white dark:bg-navy-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Room Control */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <BedDouble className="w-4 h-4 text-brand-600" />
              <span>Room Category</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[5000, 8000, 10000].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setSelectedRoom(rate)}
                  className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition border ${
                    selectedRoom === rate
                      ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-navy-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                  }`}
                >
                  <div>₹{rate.toLocaleString('en-IN')}</div>
                  <span className="text-[10px] font-normal opacity-80 block">
                    {rate === 5000 ? 'Policy Limit' : rate === 8000 ? 'Deluxe' : 'Suite'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Hospital Network Control */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-accent-teal" />
              <span>Hospital Network Status</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setSelectedHospitalTier('network')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition border ${
                  selectedHospitalTier === 'network'
                    ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-navy-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                Network (Cashless)
              </button>
              <button
                onClick={() => setSelectedHospitalTier('non-network')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition border ${
                  selectedHospitalTier === 'non-network'
                    ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-navy-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                Non-Network (Reimburse)
              </button>
            </div>
          </div>

          {/* Treatment Tech Control */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-purple-600" />
              <span>Procedure Variant</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setTreatmentTech('standard')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition border ${
                  treatmentTech === 'standard'
                    ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-navy-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                Standard Implant
              </button>
              <button
                onClick={() => setTreatmentTech('premium')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition border ${
                  treatmentTech === 'premium'
                    ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-navy-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                Robotic / Premium
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison: Current vs New Scenario */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CURRENT SCENARIO CARD */}
        <div className="p-6 rounded-2xl bg-white dark:bg-navy-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Baseline Choice
              </span>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                CURRENT SCENARIO
              </h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              Optimal Cap
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Selected Room</span>
              <span className="font-bold text-slate-900 dark:text-white font-mono">₹5,000 / day</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Hospital Network</span>
              <span className="font-bold text-slate-900 dark:text-white">Network (Cashless)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Procedure Technique</span>
              <span className="font-bold text-slate-900 dark:text-white">Standard Joint Implant</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Estimated Total Bill</span>
              <span className="font-bold text-slate-900 dark:text-white font-mono">₹3,00,000</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-500 block uppercase tracking-wide">
              Estimated Out-of-Pocket
            </span>
            <div className="text-3xl font-black text-slate-900 dark:text-white font-mono mt-1">
              ₹55,000
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Covers standard co-pay + deductible with zero proportionate room deductions.
            </p>
          </div>
        </div>

        {/* NEW SCENARIO CARD */}
        <div className="p-6 rounded-2xl bg-white dark:bg-navy-850 border-2 border-brand-500 dark:border-brand-500/80 shadow-lg space-y-5 relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Interactive Simulation
              </span>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                NEW SCENARIO
              </h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
              Live Calculated
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Selected Room</span>
              <span className="font-bold text-slate-900 dark:text-white font-mono">₹{selectedRoom.toLocaleString('en-IN')} / day</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Hospital Network</span>
              <span className="font-bold text-slate-900 dark:text-white capitalize">{selectedHospitalTier}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Procedure Technique</span>
              <span className="font-bold text-slate-900 dark:text-white capitalize">{treatmentTech}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Estimated Total Bill</span>
              <span className="font-bold text-slate-900 dark:text-white font-mono">₹{newScenario.bill.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-rose-700 dark:text-rose-300 block uppercase tracking-wide">
                  Estimated Out-of-Pocket
                </span>
                <div className="text-3xl font-black text-rose-600 dark:text-rose-400 font-mono mt-1">
                  ₹{newScenario.oop.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Dynamic Delta Badge */}
              <div className="text-right">
                <span className={`inline-flex items-center text-xs font-black px-2.5 py-1 rounded-full ${
                  newScenario.delta > 0 
                    ? 'bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-100'
                    : 'bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100'
                }`}>
                  {newScenario.delta > 0 ? `+₹${newScenario.delta.toLocaleString('en-IN')}` : '₹0'}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Cost Difference</span>
              </div>
            </div>

            <p className="text-[11px] text-rose-700/80 dark:text-rose-300/80 mt-2">
              Proportionate penalty on room & surgical honorarium: <strong>₹{newScenario.roomPenalty.toLocaleString('en-IN')}</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Dynamic Animated Explanation Box */}
      <div className="p-6 rounded-2xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 space-y-3">
        <div className="flex items-center space-x-2 text-amber-800 dark:text-amber-300 font-bold text-sm">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <span>Why does your Out-of-Pocket increase by ₹{newScenario.delta.toLocaleString('en-IN')}?</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          Estimated OOP increases because the selected room (₹{selectedRoom.toLocaleString('en-IN')}/day) exceeds the policy's stated room-rent limit of ₹5,000/day. Under <strong className="text-amber-900 dark:text-amber-200">Section 6.3 (Proportionate Room Rent Clause)</strong>, the insurer does not merely deduct the ₹{((selectedRoom - 5000) * 4).toLocaleString('en-IN')} room tariff difference, but also applies a proportional reduction across doctor visits, surgeon charges, and operation theatre fees.
        </p>

        <div className="pt-2 flex items-center justify-between">
          <button
            onClick={() => onViewEvidence({
              page: 24,
              section: 'Section 6.3 — Proportionate Room Rent Clause',
              clauseText: 'If the insured occupies a room higher than the eligible limit of ₹5,000/day, all associated medical expenses shall be borne in proportion to the difference.',
              simpleExplanation: 'Upgrading your room triggers proportionate deductions on doctor visits and OT fees.',
              confidence: 'HIGH'
            })}
            className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
          >
            <span>[View Clause 6.3 Evidence in Policy PDF]</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <span className="text-[11px] text-slate-500">
            Action: Request a ₹5,000/day room to save ₹{newScenario.delta.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Recharts Animated Stack Comparison Chart */}
      <div className="p-6 rounded-2xl bg-white dark:bg-navy-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          Visual Cost Comparison (Current vs Simulated)
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonChartData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="scenario" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${v/1000}k`} />
              <Tooltip 
                formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, '']}
                contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="Insurance Contribution" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Your Out-of-Pocket" fill="#f43f5e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
