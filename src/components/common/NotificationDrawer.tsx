import React from 'react';
import { X, Bell, AlertTriangle, ShieldCheck, Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import { ActiveTab } from '../../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: ActiveTab) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose, onNavigate }) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'notif-1',
      type: 'warning',
      title: 'Proportionate Deduction Risk Alert',
      message: 'Estimated room tariff of ₹8,000/day exceeds your policy cap of ₹5,000/day. Switching to standard room could save ₹36,000+.',
      time: '12m ago',
      actionTab: 'what-if' as ActiveTab,
      actionText: 'Simulate Room Change'
    },
    {
      id: 'notif-2',
      type: 'success',
      title: 'Waiting Period Milestone Achieved',
      message: 'Your 24-month specific illness waiting period has ended. Total Knee Replacement & Cataract surgeries are now fully claimable.',
      time: '2h ago',
      actionTab: 'my-policy' as ActiveTab,
      actionText: 'View Policy Twin'
    },
    {
      id: 'notif-3',
      type: 'info',
      title: 'Pre-Authorization Reminder',
      message: 'Elective surgeries require TPA pre-authorization submission at least 48 hours prior to planned hospital admission.',
      time: '1d ago',
      actionTab: 'claim-assistant' as ActiveTab,
      actionText: 'Open Claim Checklist'
    },
    {
      id: 'notif-4',
      type: 'info',
      title: 'New Network Hospital Added',
      message: 'Sahyadri Specialty Hospital (Hadapsar, Pune) is now accredited for cashless treatment with 100% pre-agreed surgical tariffs.',
      time: '3d ago',
      actionTab: 'treatment-cost' as ActiveTab,
      actionText: 'Check Hospital Tier'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-navy-850 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-navy-900">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Policy & Claim Intelligence Alerts
              </h3>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.map((n) => (
              <div 
                key={n.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:shadow-md transition space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    {n.type === 'warning' ? (
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                    ) : n.type === 'success' ? (
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-brand-500"></span>
                    )}
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {n.title}
                    </h4>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{n.time}</span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {n.message}
                </p>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <button
                    onClick={() => {
                      onNavigate(n.actionTab);
                      onClose();
                    }}
                    className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                  >
                    <span>{n.actionText}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-900 flex justify-between items-center text-xs text-slate-500">
            <span>4 Active Intelligence Alerts</span>
            <button 
              onClick={() => alert("All notifications cleared.")}
              className="text-xs text-brand-600 dark:text-brand-400 font-medium hover:underline"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
