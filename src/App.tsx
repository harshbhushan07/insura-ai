import React, { useState, useEffect } from 'react';
import { ActiveTab, PolicySchedule } from './types';
import { ACTIVE_POLICY } from './data/mockData';
import { LandingPage } from './components/landing/LandingPage';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { DashboardOverview } from './components/tabs/DashboardOverview';
import { PolicyDigitalTwin } from './components/tabs/PolicyDigitalTwin';
import { AskMyPolicyChat } from './components/tabs/AskMyPolicyChat';
import { TreatmentCostIntelligence } from './components/tabs/TreatmentCostIntelligence';
import { FinancialCalculator } from './components/tabs/FinancialCalculator';
import { WhatIfSimulator } from './components/tabs/WhatIfSimulator';
import { HospitalBillAnalyzer } from './components/tabs/HospitalBillAnalyzer';
import { ClaimAssistant } from './components/tabs/ClaimAssistant';
import { PolicyComparison } from './components/tabs/PolicyComparison';
import { ConflictDetector } from './components/tabs/ConflictDetector';
import { TrustCenter } from './components/tabs/TrustCenter';
import { EvidenceViewerModal } from './components/common/EvidenceViewerModal';
import { WhyOOPHighModal } from './components/common/WhyOOPHighModal';
import { PolicyUploadModal } from './components/common/PolicyUploadModal';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';

export function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'app'>('landing');
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [activePolicy, setActivePolicy] = useState<PolicySchedule>(ACTIVE_POLICY);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Modals & Drawers state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isWhyOOPOpen, setIsWhyOOPOpen] = useState(false);
  const [evidenceData, setEvidenceData] = useState<{
    page: number;
    section: string;
    clauseText: string;
    simpleExplanation?: string;
    confidence?: 'HIGH' | 'MEDIUM' | 'LOW';
  } | null>(null);

  // Handle Dark Mode toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Global Keyboard Shortcuts (Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenEvidence = (evidence: any) => {
    setEvidenceData(evidence);
  };

  const handlePolicyLoaded = () => {
    setActivePolicy(ACTIVE_POLICY);
    setCurrentView('app');
    setActiveTab('overview');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-150">
      {currentView === 'landing' ? (
        <LandingPage 
          onAnalyzePolicy={() => setIsUploadModalOpen(true)}
          onEnterDashboard={() => setCurrentView('app')}
        />
      ) : (
        <div className="flex h-screen overflow-hidden">
          {/* Left Navigation Sidebar */}
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            onOpenUpload={() => setIsUploadModalOpen(true)}
            policyName={activePolicy.name}
          />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            {/* Topbar */}
            <Topbar
              onOpenSearch={() => setIsSearchModalOpen(true)}
              onOpenNotifications={() => setIsNotificationOpen(true)}
              onNavigate={(tab) => setActiveTab(tab)}
              unreadCount={2}
            />

            {/* View Breadcrumb / Quick Back to Landing Bar */}
            <div className="px-6 py-2 bg-slate-100/60 dark:bg-navy-900/60 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentView('landing')}
                  className="hover:text-brand-600 dark:hover:text-brand-400 font-semibold"
                >
                  ← Home
                </button>
                <span>/</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300 capitalize">
                  {activeTab.replace('-', ' ')}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                  Policy Digital Twin Synced
                </span>
              </div>
            </div>

            {/* Tab Views Container */}
            <main className="flex-1 overflow-y-auto p-6 lg:p-8">
              <div className="max-w-7xl mx-auto">
                {activeTab === 'overview' && (
                  <DashboardOverview
                    policy={activePolicy}
                    onNavigate={(tab) => setActiveTab(tab)}
                    onViewEvidence={handleOpenEvidence}
                  />
                )}

                {activeTab === 'my-policy' && (
                  <PolicyDigitalTwin
                    onViewEvidence={handleOpenEvidence}
                  />
                )}

                {activeTab === 'ask-ai' && (
                  <AskMyPolicyChat
                    onViewEvidence={handleOpenEvidence}
                  />
                )}

                {activeTab === 'treatment-cost' && (
                  <TreatmentCostIntelligence
                    onNavigate={(tab) => setActiveTab(tab)}
                    onViewEvidence={handleOpenEvidence}
                  />
                )}

                {activeTab === 'financial-calculator' && (
                  <FinancialCalculator
                    onOpenWhyOOP={() => setIsWhyOOPOpen(true)}
                    onNavigate={(tab) => setActiveTab(tab)}
                    onViewEvidence={handleOpenEvidence}
                  />
                )}

                {activeTab === 'what-if' && (
                  <WhatIfSimulator
                    onViewEvidence={handleOpenEvidence}
                  />
                )}

                {activeTab === 'bill-analyzer' && (
                  <HospitalBillAnalyzer
                    onViewEvidence={handleOpenEvidence}
                  />
                )}

                {activeTab === 'claim-assistant' && (
                  <ClaimAssistant />
                )}

                {activeTab === 'policy-comparison' && (
                  <PolicyComparison />
                )}

                {activeTab === 'conflicts' && (
                  <ConflictDetector
                    onViewEvidence={handleOpenEvidence}
                  />
                )}

                {activeTab === 'trust-center' && (
                  <TrustCenter />
                )}
              </div>
            </main>
          </div>
        </div>
      )}

      {/* Global Modals & Drawers */}
      <EvidenceViewerModal
        isOpen={!!evidenceData}
        onClose={() => setEvidenceData(null)}
        evidence={evidenceData}
      />

      <WhyOOPHighModal
        isOpen={isWhyOOPOpen}
        onClose={() => setIsWhyOOPOpen(false)}
        onViewEvidence={handleOpenEvidence}
      />

      <PolicyUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onPolicyLoaded={handlePolicyLoaded}
      />

      <GlobalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onNavigate={(tab) => {
          setCurrentView('app');
          setActiveTab(tab);
        }}
        onViewEvidence={handleOpenEvidence}
      />

      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        onNavigate={(tab) => {
          setCurrentView('app');
          setActiveTab(tab);
        }}
      />
    </div>
  );
}

export default App;
