import React from 'react';
import { 
  Shield, 
  LayoutDashboard, 
  FileText, 
  Bot, 
  Calculator, 
  SlidersHorizontal, 
  FileSpreadsheet, 
  CheckSquare, 
  GitCompare, 
  Scale, 
  ShieldCheck, 
  Moon, 
  Sun, 
  Upload, 
  ChevronRight,
  Stethoscope
} from 'lucide-react';
import { ActiveTab } from '../../types';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  onOpenUpload: () => void;
  policyName: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isDarkMode,
  setIsDarkMode,
  onOpenUpload,
  policyName
}) => {
  const navItems = [
    { id: 'overview' as ActiveTab, label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'my-policy' as ActiveTab, label: 'My Policy', icon: FileText, badge: 'Twin' },
    { id: 'ask-ai' as ActiveTab, label: 'Ask AI', icon: Bot, badge: 'Grounded' },
    { id: 'treatment-cost' as ActiveTab, label: 'Treatment Cost', icon: Stethoscope, badge: null },
    { id: 'financial-calculator' as ActiveTab, label: 'Financial Estimate', icon: Calculator, badge: 'OOP' },
    { id: 'what-if' as ActiveTab, label: 'What-If Simulator', icon: SlidersHorizontal, badge: 'Interactive' },
    { id: 'bill-analyzer' as ActiveTab, label: 'Bill Analyzer', icon: FileSpreadsheet, badge: 'OCR' },
    { id: 'claim-assistant' as ActiveTab, label: 'Claim Assistant', icon: CheckSquare, badge: '75%' },
    { id: 'policy-comparison' as ActiveTab, label: 'Policy Comparison', icon: GitCompare, badge: 'Diff' },
    { id: 'conflicts' as ActiveTab, label: 'Rule Interactions', icon: Scale, badge: null },
    { id: 'trust-center' as ActiveTab, label: 'Responsible AI', icon: ShieldCheck, badge: null },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-white dark:bg-navy-850 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between select-none">
      {/* Brand Header */}
      <div>
        <div className="p-5 border-b border-slate-200 dark:border-slate-800">
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
                  v1.2
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                Insurance Decision Intelligence
              </p>
            </div>
          </div>
        </div>

        {/* Active Policy Status Chip */}
        <div className="p-3 mx-3 my-3 rounded-xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Active Policy
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Policy Active"></span>
          </div>
          <div className="font-bold text-xs text-slate-900 dark:text-white mt-0.5 truncate">
            {policyName}
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px]">
            <span className="text-slate-500">₹10L Sum Insured</span>
            <button
              onClick={onOpenUpload}
              className="text-brand-600 dark:text-brand-400 font-semibold hover:underline flex items-center gap-0.5"
            >
              <span>Switch</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="px-3 py-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Actions */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
        <button
          onClick={onOpenUpload}
          className="w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-xs font-bold text-slate-700 dark:text-slate-200 transition"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload New Policy</span>
        </button>

        <div className="flex items-center justify-between px-2 pt-1 text-xs">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center space-x-2 text-slate-500 hover:text-slate-800 dark:hover:text-white transition"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            <span className="text-[11px] font-medium">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>

          <span className="text-[10px] text-slate-400 font-mono">
            FIN-01 Prototype
          </span>
        </div>
      </div>
    </aside>
  );
};
