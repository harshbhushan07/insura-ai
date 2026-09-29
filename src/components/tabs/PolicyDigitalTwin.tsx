import React, { useState } from 'react';
import { 
  Shield, 
  FileText, 
  ChevronRight, 
  ChevronDown, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Info, 
  ArrowUpRight, 
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';
import { PolicyTreeNode } from '../../types';
import { POLICY_TREE_DATA, ACTIVE_POLICY } from '../../data/mockData';

interface PolicyDigitalTwinProps {
  onViewEvidence: (evidence: any) => void;
}

export const PolicyDigitalTwin: React.FC<PolicyDigitalTwinProps> = ({ onViewEvidence }) => {
  const [selectedNode, setSelectedNode] = useState<PolicyTreeNode>(POLICY_TREE_DATA[0].children![0]);
  const [expandedNodes, setExpandedNodes] = useState<{ [key: string]: boolean }>({
    'cov-group': true,
    'limits-group': true,
    'waiting-group': true,
    'exclusions-group': true,
  });

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedNodes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const structuredCards = [
    { title: 'Coverage', value: '₹10,00,000', subtitle: 'Sum Insured', status: 'optimal' },
    { title: 'Hospitalization', value: 'Covered', subtitle: 'In-patient > 24h', status: 'optimal' },
    { title: 'ICU', value: 'Covered', subtitle: 'No sub-limit cap', status: 'optimal' },
    { title: 'Room Rent', value: '₹5,000/day', subtitle: 'Proportionate clause', status: 'warning' },
    { title: 'Co-pay', value: '10%', subtitle: 'For age 55 & above', status: 'warning' },
    { title: 'Deductible', value: '₹20,000', subtitle: 'Annual aggregate', status: 'warning' },
    { title: 'Waiting Period', value: '24 months', subtitle: '✓ Completed (Tenure 28m)', status: 'optimal' },
    { title: 'Pre-existing Disease', value: 'Applicable conditions', subtitle: '36mo (8m remaining)', status: 'review' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-2">
          <Layers className="w-3.5 h-3.5 text-brand-600" />
          <span>Knowledge Graph Representation</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          Your Policy at a Glance
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Machine-readable Digital Twin of <strong>SecureHealth Plus</strong> with clause-level grounding.
        </p>
      </div>

      {/* 8 Structured Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {structuredCards.map((card, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-white dark:bg-navy-850 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition space-y-1"
          >
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {card.title}
            </div>
            <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-mono">
              {card.value}
            </div>
            <div className={`text-[11px] font-medium flex items-center gap-1 ${
              card.status === 'optimal' 
                ? 'text-emerald-600 dark:text-emerald-400' 
                : card.status === 'warning'
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-purple-600 dark:text-purple-400'
            }`}>
              <span>{card.subtitle}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Policy Tree & Explanation Side Panel Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Interactive Policy Tree */}
        <div className="lg:col-span-7 bg-white dark:bg-navy-850 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-brand-600" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Interactive Policy Decision Tree
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Click node to inspect clause
            </span>
          </div>

          {/* Tree Root */}
          <div className="space-y-3 font-sans">
            <div className="p-3 rounded-xl bg-slate-900 text-white dark:bg-slate-800 font-bold text-xs flex items-center justify-between shadow-sm">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-brand-400" />
                <span>POLICY: SecureHealth Plus (#SHP-9082-IND)</span>
              </div>
              <span className="text-[10px] font-mono bg-white/20 px-2 py-0.5 rounded">
                Root Node
              </span>
            </div>

            {/* Tree Branches */}
            <div className="pl-4 border-l-2 border-slate-200 dark:border-slate-800 space-y-3 mt-3">
              {POLICY_TREE_DATA.map((group) => {
                const isExpanded = !!expandedNodes[group.id];
                const isSelected = selectedNode.id === group.id;

                return (
                  <div key={group.id} className="space-y-2">
                    {/* Category Group Item */}
                    <div
                      onClick={() => setSelectedNode(group)}
                      className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition ${
                        isSelected
                          ? 'bg-brand-500/10 text-brand-700 dark:text-brand-300 font-bold border border-brand-300 dark:border-brand-700'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => toggleExpand(group.id, e)}
                          className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded"
                        >
                          {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                        </button>
                        <span className="text-xs font-bold tracking-tight">
                          ├── {group.name}
                        </span>
                      </div>

                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        group.category === 'coverage'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : group.category === 'limit'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                          : group.category === 'waiting'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                          : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                      }`}>
                        {group.category.toUpperCase()}
                      </span>
                    </div>

                    {/* Children Items */}
                    {isExpanded && group.children && (
                      <div className="pl-6 border-l border-dashed border-slate-300 dark:border-slate-700 space-y-1.5 ml-3">
                        {group.children.map((child) => {
                          const isChildSelected = selectedNode.id === child.id;
                          return (
                            <div
                              key={child.id}
                              onClick={() => setSelectedNode(child)}
                              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer text-xs transition ${
                                isChildSelected
                                  ? 'bg-brand-600 text-white font-bold shadow-sm'
                                  : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-600 dark:text-slate-300'
                              }`}
                            >
                              <div className="flex items-center space-x-2">
                                <span className={isChildSelected ? 'text-white' : 'text-slate-400'}>
                                  └──
                                </span>
                                <span>{child.name}</span>
                              </div>
                              <span className={`text-[10px] font-mono ${isChildSelected ? 'text-brand-100' : 'text-slate-400'}`}>
                                P.{child.evidence.page}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Selected Node Detail Side Panel */}
        <div className="lg:col-span-5 bg-white dark:bg-navy-850 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5 sticky top-20">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Selected Policy Clause
              </span>
              <h4 className="text-base font-black text-slate-900 dark:text-white mt-0.5">
                {selectedNode.name}
              </h4>
            </div>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
              selectedNode.status === 'covered'
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                : selectedNode.status === 'capped'
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                : selectedNode.status === 'conditional'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
            }`}>
              {selectedNode.status.toUpperCase()}
            </span>
          </div>

          {/* Summary & Details */}
          <div className="space-y-3">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Executive Summary
              </span>
              <p className="text-xs text-slate-800 dark:text-slate-200 font-semibold mt-1">
                {selectedNode.summary}
              </p>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Context & Operational Scope
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                {selectedNode.details}
              </p>
            </div>
          </div>

          {/* Official Clause Quoting */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-brand-600" />
                <span>{selectedNode.evidence.section}</span>
              </span>
              <span className="font-mono text-slate-400">Page {selectedNode.evidence.page}</span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 italic border-l-2 border-brand-500 pl-3 py-0.5 leading-relaxed font-serif">
              "{selectedNode.evidence.clauseText}"
            </p>
          </div>

          {/* Simple Explanation */}
          <div className="p-3.5 rounded-xl bg-brand-50/70 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-900/60 flex items-start space-x-2.5">
            <Info className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-white block mb-0.5">Plain-English Translation:</strong>
              {selectedNode.evidence.simpleExplanation}
            </div>
          </div>

          {/* Action Trigger for PDF Evidence */}
          <button
            onClick={() => onViewEvidence(selectedNode.evidence)}
            className="w-full py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition shadow flex items-center justify-center space-x-2"
          >
            <span>View in Official Policy PDF (Page {selectedNode.evidence.page})</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
