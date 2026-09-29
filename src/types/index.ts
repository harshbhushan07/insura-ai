export type ActiveTab = 
  | 'overview'
  | 'my-policy'
  | 'ask-ai'
  | 'treatment-cost'
  | 'financial-calculator'
  | 'what-if'
  | 'bill-analyzer'
  | 'claim-assistant'
  | 'policy-comparison'
  | 'conflicts'
  | 'trust-center';

export interface PolicySchedule {
  id: string;
  name: string;
  policyNumber: string;
  insurer: string;
  policyType: string;
  status: 'ACTIVE' | 'PENDING' | 'EXPIRED';
  validUntil: string;
  sumInsured: number;
  usedCoverage: number;
  remainingCoverage: number;
  waitingPeriodMonths: number;
  waitingPeriodCompleted: boolean;
  roomRentLimit: number;
  roomRentType: string;
  coPayPercent: number;
  deductible: number;
  preExistingDiseaseWaitingMonths: number;
  icuLimit: string;
  ambulanceLimit: number;
  healthMetrics: {
    coverageScore: number;
    clarityScore: number;
    claimReadiness: number;
  };
}

export interface PolicyTreeNode {
  id: string;
  name: string;
  category: 'coverage' | 'limit' | 'waiting' | 'exclusion';
  status: 'covered' | 'capped' | 'conditional' | 'excluded';
  summary: string;
  details: string;
  evidence: {
    page: number;
    section: string;
    clauseText: string;
    simpleExplanation: string;
  };
  children?: PolicyTreeNode[];
}

export interface ChatEvidence {
  sourcePage: number;
  section: string;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  confidenceReason?: string;
  clauseExcerpt: string;
  explanation: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  evidence?: ChatEvidence;
  isStreaming?: boolean;
}

export interface TreatmentOption {
  id: string;
  name: string;
  category: string;
  description: string;
  typicalStayDays: number;
  cities: {
    [city: string]: {
      minCost: number;
      medianCost: number;
      maxCost: number;
      breakdown: {
        consultation: number;
        diagnostics: number;
        surgery: number;
        hospitalization: number;
        medicines: number;
        followUp: number;
      };
    };
  };
  policyEligibility: {
    status: 'Potentially Covered' | 'Subject to Sub-limit' | 'Non-Covered';
    confidence: 'HIGH' | 'MEDIUM' | 'LOW';
    conditions: string[];
    evidence: {
      page: number;
      section: string;
      clauseText: string;
    };
  };
}

export interface BillLineItem {
  id: string;
  category: string;
  description: string;
  amount: number;
  status: 'Covered' | 'Potentially Non-covered' | 'Partially Covered';
  policyRule: string;
  evidence: {
    page: number;
    section: string;
    clauseText: string;
  };
  whyExplanation: string;
}

export interface RiskRadarItem {
  id: string;
  level: 'HIGH' | 'MEDIUM' | 'REVIEW' | 'LOW';
  title: string;
  subtitle: string;
  whyItMatters: string;
  policyEvidence: {
    page: number;
    section: string;
    clauseText: string;
  };
  potentialImpact: string;
}

export interface ClaimChecklistItem {
  id: string;
  title: string;
  description: string;
  status: 'ready' | 'pending' | 'missing';
  required: boolean;
  documentType: string;
}

export interface PolicyComparisonData {
  feature: string;
  category: string;
  policyA: string;
  policyB: string;
  differenceNote: string;
  advantage: 'A' | 'B' | 'NEUTRAL';
}

export interface PolicyVersionDiff {
  feature: string;
  version2025: string;
  version2026: string;
  changeType: 'improved' | 'worsened' | 'neutral';
  impactExplanation: string;
}
