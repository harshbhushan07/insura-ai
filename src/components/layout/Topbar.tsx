import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  ShieldCheck, 
  HelpCircle, 
  User, 
  CheckCircle2, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { ActiveTab } from '../../types';

interface TopbarProps {
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onNavigate: (tab: ActiveTab) => void;
  unreadCount?: number;
}

export const Topbar: React.FC<TopbarProps> = ({
  onOpenSearch,
  onOpenNotifications,
  onNavigate,
  unreadCount = 2
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="h-16 px-6 bg-white dark:bg-navy-850 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between z-10 flex-shrink-0">
      {/* Left: Greeting & Subtitle */}
      <div>
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <span>Good morning, Harsh</span>
          <span className="hidden sm:inline-block text-[11px] font-normal px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            Policy Active
          </span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Your insurance intelligence dashboard • Policy #SHP-9082-IND
        </p>
      </div>

      {/* Right Action Icons & Search */}
      <div className="flex items-center space-x-3">
        {/* Cmd+K Search trigger */}
        <button
          onClick={onOpenSearch}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-navy-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 transition"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Search clauses, sub-limits...</span>
          <kbd className="font-mono text-[10px] bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700 text-slate-400">
            ⌘K
          </kbd>
        </button>

        {/* Responsible AI Trust Indicator */}
        <button
          onClick={() => onNavigate('trust-center')}
          className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-900 text-xs font-semibold text-brand-700 dark:text-brand-300 hover:bg-brand-100 dark:hover:bg-brand-900/60 transition"
          title="InsuraAI Trust & Transparency Center"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
          <span>Evidence-First AI</span>
        </button>

        {/* Notifications Icon with Badge */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
          )}
        </button>

        {/* Profile Avatar Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2 p-1.5 pl-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-600 to-indigo-700 text-white font-bold text-xs flex items-center justify-center shadow-sm">
              HB
            </div>
            <div className="hidden sm:block text-left text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200 block leading-tight">Harsh B.</span>
              <span className="text-[10px] text-slate-400 leading-none">Primary Insured</span>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-navy-850 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-900 dark:text-white">Harsh Bhushan</p>
                <p className="text-[11px] text-slate-500 truncate">harsh@insuraai-demo.internal</p>
              </div>
              <div className="py-1">
                <button
                  onClick={() => { onNavigate('my-policy'); setIsProfileOpen(false); }}
                  className="w-full text-left px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Policy Schedule & Details
                </button>
                <button
                  onClick={() => { onNavigate('claim-assistant'); setIsProfileOpen(false); }}
                  className="w-full text-left px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  My Claim Dossier (75% Ready)
                </button>
                <button
                  onClick={() => { onNavigate('trust-center'); setIsProfileOpen(false); }}
                  className="w-full text-left px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Responsible AI Trust Center
                </button>
              </div>
              <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                <div className="px-4 py-1.5 text-[10px] text-slate-400">
                  IRDAI Compliant Sandbox Environment
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
