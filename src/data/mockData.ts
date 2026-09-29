import { 
  PolicySchedule, 
  PolicyTreeNode, 
  TreatmentOption, 
  BillLineItem, 
  RiskRadarItem, 
  ClaimChecklistItem, 
  PolicyComparisonData, 
  PolicyVersionDiff,
  ChatMessage,
  ChatEvidence
} from '../types';

export const ACTIVE_POLICY: PolicySchedule = {
  id: 'pol-securehealth-2025',
  name: 'SecureHealth Plus',
  policyNumber: 'SHP-9082-IND-2025',
  insurer: 'StarHealth Universal Assurance',
  policyType: 'Individual Comprehensive Health',
  status: 'ACTIVE',
  validUntil: '14 Oct 2027',
  sumInsured: 1000000, // ₹10,00,000
  usedCoverage: 240000, // ₹2,40,000
  remainingCoverage: 760000, // ₹7,60,000
  waitingPeriodMonths: 24,
  waitingPeriodCompleted: true,
  roomRentLimit: 5000, // ₹5,000 / day
  roomRentType: '₹5,000 / day (or Single Standard AC)',
  coPayPercent: 10, // 10% co-pay for ages > 55
  deductible: 20000, // ₹20,000
  preExistingDiseaseWaitingMonths: 36,
  icuLimit: 'No sub-limit up to Sum Insured',
  ambulanceLimit: 3000,
  healthMetrics: {
    coverageScore: 92,
    clarityScore: 88,
    claimReadiness: 76,
  }
};

export const POLICY_TREE_DATA: PolicyTreeNode[] = [
  {
    id: 'cov-group',
    name: 'Coverage Scope',
    category: 'coverage',
    status: 'covered',
    summary: 'Core in-patient and daycare treatments covered up to ₹10,00,000 Sum Insured.',
    details: 'Covers essential medical treatments, surgeries, ICU accommodations, and medical practitioner fees.',
    evidence: {
      page: 4,
      section: 'Section 2.1 — Scope of In-patient Cover',
      clauseText: 'The Company shall indemnify reasonable and customary charges incurred towards hospitalization for medically necessary treatment up to the Sum Insured of ₹10,00,000.',
      simpleExplanation: 'You are protected for medical hospital stays exceeding 24 hours up to your remaining balance.'
    },
    children: [
      {
        id: 'cov-hosp',
        name: 'Hospitalization',
        category: 'coverage',
        status: 'covered',
        summary: 'Room boarding, nursing, doctor charges during stay',
        details: 'Eligible for inpatient treatment exceeding 24 hours or specified daycare surgeries.',
        evidence: {
          page: 5,
          section: 'Section 2.2 — Hospitalization Expenses',
          clauseText: 'Nursing expenses, Resident Medical Officer fees, intensive care unit boarding, and operation theatre fees are covered.',
          simpleExplanation: 'Your base hospital stay and clinical staff costs are covered subject to room rent tier.'
        }
      },
      {
        id: 'cov-surgery',
        name: 'Surgery & Daycare',
        category: 'coverage',
        status: 'covered',
        summary: '530+ listed daycare procedures and major operations',
        details: 'Both major elective/emergency surgeries and advanced daycare procedures requiring <24h hospitalization are covered.',
        evidence: {
          page: 9,
          section: 'Section 3.1 — Day Care Procedures & Surgery',
          clauseText: 'Surgeries including Joint Replacements, Laparoscopy, Cataract, and Stenting are covered under daycare and inpatient schedules.',
          simpleExplanation: 'Surgeries are covered even if you are discharged the same day, provided they are performed in a recognized OT.'
        }
      },
      {
        id: 'cov-icu',
        name: 'ICU / ICCU Boarding',
        category: 'coverage',
        status: 'covered',
        summary: 'No capping up to full Sum Insured',
        details: 'Intensive Cardiac / Critical Care unit charges have zero room cap under SecureHealth Plus.',
        evidence: {
          page: 6,
          section: 'Section 2.4 — Intensive Care Unit Charges',
          clauseText: 'ICU / ICCU expenses shall be reimbursed on actual incurred basis without application of proportionate room-rent deductions.',
          simpleExplanation: 'If you are admitted to the ICU, there is no ₹5,000 daily limit penalty on those critical care days.'
        }
      },
      {
        id: 'cov-ambulance',
        name: 'Road Ambulance',
        category: 'coverage',
        status: 'capped',
        summary: '₹3,000 per hospitalization episode',
        details: 'Covers emergency ambulance conveyance to nearest registered hospital.',
        evidence: {
          page: 11,
          section: 'Section 3.6 — Emergency Ambulance Services',
          clauseText: 'Road ambulance charges incurred up to ₹3,000 per valid hospitalization claim.',
          simpleExplanation: 'Keep ambulance receipts; up to ₹3,000 is reimbursed per hospital episode.'
        }
      }
    ]
  },
  {
    id: 'limits-group',
    name: 'Limits & Cost-Sharing',
    category: 'limit',
    status: 'conditional',
    summary: 'Sub-limits, daily allowances, co-pays, and deductibles that reduce claim payouts.',
    details: 'Financial caps established in the policy schedule that dictate the percentage of patient out-of-pocket costs.',
    evidence: {
      page: 14,
      section: 'Section 4.1 — Sub-limits and Deductibles',
      clauseText: 'Reimbursement of eligible hospitalization expenses shall be adjusted against specified room-rent limits, deductibles, and applicable co-payment.',
      simpleExplanation: 'These clauses explain why insurance might not pay 100% of your hospital bill.'
    },
    children: [
      {
        id: 'limit-room',
        name: 'Room Rent Sub-limit',
        category: 'limit',
        status: 'capped',
        summary: '₹5,000/day (Proportionate deduction applies if exceeded)',
        details: 'If patient chooses a room exceeding ₹5,000/day, all associated doctor, surgery, and OT costs are proportionately reduced.',
        evidence: {
          page: 24,
          section: 'Section 6.3 — Proportionate Room Rent Clause',
          clauseText: 'If the insured occupies a room with a tariff higher than the eligible limit of ₹5,000/day, all associated medical expenses shall be borne by the insured in proportion to the difference.',
          simpleExplanation: 'Staying in an ₹8,000 room when your limit is ₹5,000 means you pay 37.5% of many doctor and surgery fees out-of-pocket!'
        }
      },
      {
        id: 'limit-copay',
        name: 'Co-Payment',
        category: 'limit',
        status: 'conditional',
        summary: '10% co-pay for insured individuals age 55 or above',
        details: 'The patient contributes 10% of the approved eligible claim amount after room rent and deductible adjustments.',
        evidence: {
          page: 16,
          section: 'Section 4.4 — Co-payment Terms',
          clauseText: 'A mandatory co-payment of 10% shall apply to each and every admissible claim for insured persons aged 55 years and above at the time of claim.',
          simpleExplanation: 'For senior claims, 10% of the admissible amount is shared by the patient.'
        }
      },
      {
        id: 'limit-deductible',
        name: 'Annual Deductible',
        category: 'limit',
        status: 'capped',
        summary: '₹20,000 aggregate deductible per policy year',
        details: 'The first ₹20,000 of cumulative eligible hospital bills in a year are paid by the policyholder before insurer pays.',
        evidence: {
          page: 15,
          section: 'Section 4.2 — Deductible Schedule',
          clauseText: 'The Insured shall bear an aggregate deductible of ₹20,000 per policy year. Claims beyond this threshold become admissible.',
          simpleExplanation: 'The first ₹20,000 of claims in the policy year must come from your own pocket.'
        }
      }
    ]
  },
  {
    id: 'waiting-group',
    name: 'Waiting Periods',
    category: 'waiting',
    status: 'conditional',
    summary: 'Time durations from inception before specific conditions qualify for coverage.',
    details: 'Initial 30 days, 24 months specific disease list, and 36 months pre-existing diseases.',
    evidence: {
      page: 18,
      section: 'Section 5.1 — Waiting Periods Schedule',
      clauseText: 'No claims will be admissible during the specified waiting periods, except accidental injuries which are covered from Day 1.',
      simpleExplanation: 'Your policy is currently active for 28 months, so the 24-month waiting periods have been fulfilled!'
    },
    children: [
      {
        id: 'wait-30days',
        name: 'Initial 30-Day Waiting',
        category: 'waiting',
        status: 'covered',
        summary: 'Completed (Covered except accidental)',
        details: 'Standard 30-day waiting period from initial policy inception.',
        evidence: {
          page: 18,
          section: 'Section 5.1.1 — 30 Days Waiting Period',
          clauseText: 'A waiting period of 30 days from the inception date of the policy will apply.',
          simpleExplanation: 'Fully completed in 2023. All acute illnesses are now claimable.'
        }
      },
      {
        id: 'wait-specific',
        name: 'Specific Illnesses (24 Months)',
        category: 'waiting',
        status: 'covered',
        summary: 'Joint replacement, Cataract, Hernia, Hysterectomy now covered',
        details: '24-month waiting requirement for elective surgeries is currently satisfied as policy tenure is 28 months.',
        evidence: {
          page: 19,
          section: 'Section 5.1.2 — 24-Month Specific Illness List',
          clauseText: 'Expenses related to treatment of Cataract, Total Knee/Hip Replacement, Gallbladder stones, and Hernia have a 24-month waiting period.',
          simpleExplanation: 'You are now past the 24-month mark, meaning Knee Replacement and Cataract procedures are fully claimable!'
        }
      },
      {
        id: 'wait-ped',
        name: 'Pre-existing Diseases (PED)',
        category: 'waiting',
        status: 'conditional',
        summary: '36 Months (8 months remaining for declared conditions)',
        details: 'Pre-existing conditions declared at proposal have 8 months remaining out of 36 months.',
        evidence: {
          page: 20,
          section: 'Section 5.1.3 — Pre-Existing Disease Clause',
          clauseText: 'Cover for pre-existing conditions shall commence after continuous coverage of 36 months without break.',
          simpleExplanation: 'Declared chronic conditions (e.g. Hypertension) have 8 months remaining before non-emergency coverage starts.'
        }
      }
    ]
  },
  {
    id: 'exclusions-group',
    name: 'Exclusions & Non-Payables',
    category: 'exclusion',
    status: 'excluded',
    summary: 'Procedures, medical consumables, and treatments never reimbursed by insurer.',
    details: 'Based on IRDAI non-medical items list and explicit policy contract exclusions.',
    evidence: {
      page: 30,
      section: 'Section 8.1 — General Permanent Exclusions',
      clauseText: 'The Company is not liable for costs of non-medical consumables, cosmetic treatments, obesity surgery, or unproven experimental treatments.',
      simpleExplanation: 'Items like gloves, PPE kits, admission kits, and cosmetic procedures must be paid out-of-pocket.'
    },
    children: [
      {
        id: 'excl-consumables',
        name: 'Non-Medical Consumables (List I)',
        category: 'exclusion',
        status: 'excluded',
        summary: 'Gloves, face masks, sanitizers, thermometer, admission kits',
        details: 'IRDAI List I non-payable consumables are excluded unless a specific Consumable Protect add-on is purchased.',
        evidence: {
          page: 31,
          section: 'Section 8.4 — Non-Payable Consumables Schedule',
          clauseText: 'Items categorized under IRDAI Annexure I (cotton, syringes, surgical gloves, housekeeping packs) shall be non-admissible.',
          simpleExplanation: 'Expect roughly ₹10,000 — ₹15,000 in surgical consumable deductions on major operations.'
        }
      },
      {
        id: 'excl-cosmetics',
        name: 'Cosmetic / Aesthetic Surgery',
        category: 'exclusion',
        status: 'excluded',
        summary: 'Strictly non-covered unless reconstructive post-trauma',
        details: 'Plastic surgery or aesthetic procedures are completely excluded.',
        evidence: {
          page: 32,
          section: 'Section 8.7 — Cosmetic and Plastic Surgery',
          clauseText: 'Expenses incurred for cosmetic or plastic surgery or any elective aesthetic treatment are excluded.',
          simpleExplanation: 'Elective cosmetic improvements are 100% patient responsibility.'
        }
      }
    ]
  }
];

export const TREATMENTS_DATABASE: TreatmentOption[] = [
  {
    id: 'knee-replacement',
    name: 'Total Knee Replacement (Unilateral)',
    category: 'Orthopedic Surgery',
    description: 'Surgical procedure to replace the weight-bearing surfaces of the knee joint with prosthetic implants.',
    typicalStayDays: 4,
    cities: {
      'Pune': {
        minCost: 280000,
        medianCost: 320000,
        maxCost: 370000,
        breakdown: {
          consultation: 2000,
          diagnostics: 12000,
          surgery: 220000,
          hospitalization: 50000,
          medicines: 15000,
          followUp: 20000
        }
      },
      'Mumbai': {
        minCost: 310000,
        medianCost: 360000,
        maxCost: 420000,
        breakdown: {
          consultation: 3000,
          diagnostics: 15000,
          surgery: 250000,
          hospitalization: 60000,
          medicines: 18000,
          followUp: 24000
        }
      },
      'Delhi': {
        minCost: 290000,
        medianCost: 340000,
        maxCost: 395000,
        breakdown: {
          consultation: 2500,
          diagnostics: 14000,
          surgery: 235000,
          hospitalization: 54000,
          medicines: 16000,
          followUp: 22000
        }
      },
      'Bangalore': {
        minCost: 300000,
        medianCost: 350000,
        maxCost: 405000,
        breakdown: {
          consultation: 2500,
          diagnostics: 14000,
          surgery: 240000,
          hospitalization: 58000,
          medicines: 17000,
          followUp: 23000
        }
      }
    },
    policyEligibility: {
      status: 'Potentially Covered',
      confidence: 'HIGH',
      conditions: [
        'Hospitalization coverage applies (Inpatient > 24 hours)',
        'Surgery is listed under covered orthopedic procedures',
        '24-month waiting period is satisfied (Policy age: 28 months)',
        'Room-rent limit of ₹5,000/day may trigger proportionate deduction if upgraded',
        '10% co-payment applies for patient age 55 or above',
        'Annual deductible of ₹20,000 applies to first claim of policy year'
      ],
      evidence: {
        page: 18,
        section: 'Section 5.2 — Major Joint Replacement Cover',
        clauseText: 'Total Knee Replacement surgery is an eligible in-patient procedure post completion of the 24-month specific illness waiting period, subject to Room Rent category and age-linked co-payment.'
      }
    }
  },
  {
    id: 'cataract-surgery',
    name: 'Cataract Surgery (Phacoemulsification with Foldable IOL)',
    category: 'Ophthalmology',
    description: 'Daycare removal of cloudy natural eye lens and replacement with a monofocal or multifocal intraocular lens.',
    typicalStayDays: 1,
    cities: {
      'Pune': {
        minCost: 35000,
        medianCost: 45000,
        maxCost: 55000,
        breakdown: {
          consultation: 1500,
          diagnostics: 4500,
          surgery: 28000,
          hospitalization: 4000,
          medicines: 3500,
          followUp: 3500
        }
      },
      'Mumbai': {
        minCost: 42000,
        medianCost: 52000,
        maxCost: 68000,
        breakdown: {
          consultation: 2000,
          diagnostics: 5500,
          surgery: 34000,
          hospitalization: 5000,
          medicines: 4000,
          followUp: 4500
        }
      },
      'Delhi': {
        minCost: 38000,
        medianCost: 48000,
        maxCost: 60000,
        breakdown: {
          consultation: 1800,
          diagnostics: 5000,
          surgery: 30000,
          hospitalization: 4500,
          medicines: 3800,
          followUp: 4000
        }
      },
      'Bangalore': {
        minCost: 40000,
        medianCost: 50000,
        maxCost: 62000,
        breakdown: {
          consultation: 2000,
          diagnostics: 5000,
          surgery: 32000,
          hospitalization: 4500,
          medicines: 4000,
          followUp: 4000
        }
      }
    },
    policyEligibility: {
      status: 'Subject to Sub-limit',
      confidence: 'HIGH',
      conditions: [
        'Covered as recognized Day Care procedure',
        'Specific disease sub-limit: Capped at ₹45,000 per eye',
        'Multifocal premium lenses are reimbursed up to monofocal equivalent standard',
        '24-month waiting period requirement has been met'
      ],
      evidence: {
        page: 7,
        section: 'Section 4.2 — Cataract Treatment Sub-limit',
        clauseText: 'The liability of the Company for Cataract operation shall not exceed ₹45,000 per eye per policy period, inclusive of IOL lens cost and daycare theatre charges.'
      }
    }
  },
  {
    id: 'appendectomy',
    name: 'Laparoscopic Appendectomy',
    category: 'General Surgery',
    description: 'Minimally invasive keyhole surgical removal of inflamed or infected appendix vermiformis.',
    typicalStayDays: 2,
    cities: {
      'Pune': {
        minCost: 75000,
        medianCost: 95000,
        maxCost: 120000,
        breakdown: {
          consultation: 1500,
          diagnostics: 8500,
          surgery: 58000,
          hospitalization: 16000,
          medicines: 6500,
          followUp: 4500
        }
      },
      'Mumbai': {
        minCost: 90000,
        medianCost: 115000,
        maxCost: 145000,
        breakdown: {
          consultation: 2000,
          diagnostics: 10500,
          surgery: 70000,
          hospitalization: 20000,
          medicines: 8000,
          followUp: 5500
        }
      },
      'Delhi': {
        minCost: 80000,
        medianCost: 102000,
        maxCost: 130000,
        breakdown: {
          consultation: 1800,
          diagnostics: 9500,
          surgery: 62000,
          hospitalization: 18000,
          medicines: 7200,
          followUp: 5000
        }
      },
      'Bangalore': {
        minCost: 85000,
        medianCost: 108000,
        maxCost: 135000,
        breakdown: {
          consultation: 1800,
          diagnostics: 9800,
          surgery: 66000,
          hospitalization: 19000,
          medicines: 7500,
          followUp: 5200
        }
      }
    },
    policyEligibility: {
      status: 'Potentially Covered',
      confidence: 'HIGH',
      conditions: [
        'Acute emergency condition covered immediately post 30-day initial period',
        'No disease-specific sub-limit applies',
        'Reimbursable up to full remaining Sum Insured',
        'Room-rent limit ₹5,000/day applies'
      ],
      evidence: {
        page: 6,
        section: 'Section 2.3 — Emergency Surgical Interventions',
        clauseText: 'Emergency surgical treatments required for acute visceral conditions including appendicitis are admissible without disease-specific capping.'
      }
    }
  },
  {
    id: 'heart-bypass',
    name: 'Coronary Artery Bypass Graft (CABG)',
    category: 'Cardiology & Cardiothoracic',
    description: 'Open heart surgical procedure to restore normal blood flow to obstructed coronary arteries.',
    typicalStayDays: 7,
    cities: {
      'Pune': {
        minCost: 380000,
        medianCost: 450000,
        maxCost: 550000,
        breakdown: {
          consultation: 5000,
          diagnostics: 25000,
          surgery: 280000,
          hospitalization: 95000,
          medicines: 25000,
          followUp: 20000
        }
      },
      'Mumbai': {
        minCost: 420000,
        medianCost: 510000,
        maxCost: 620000,
        breakdown: {
          consultation: 6000,
          diagnostics: 30000,
          surgery: 315000,
          hospitalization: 110000,
          medicines: 29000,
          followUp: 25000
        }
      },
      'Delhi': {
        minCost: 400000,
        medianCost: 480000,
        maxCost: 590000,
        breakdown: {
          consultation: 5500,
          diagnostics: 28000,
          surgery: 295000,
          hospitalization: 104000,
          medicines: 27500,
          followUp: 23000
        }
      },
      'Bangalore': {
        minCost: 410000,
        medianCost: 490000,
        maxCost: 600000,
        breakdown: {
          consultation: 5500,
          diagnostics: 28500,
          surgery: 300000,
          hospitalization: 106000,
          medicines: 28000,
          followUp: 24000
        }
      }
    },
    policyEligibility: {
      status: 'Potentially Covered',
      confidence: 'HIGH',
      conditions: [
        'Covered under Major Medical Illness schedule',
        'ICU days are exempt from ₹5,000 room-rent penalty',
        'Reimbursable up to available ₹7,60,000 remaining Sum Insured',
        'Pre-authorization required at least 48 hours prior to elective admission'
      ],
      evidence: {
        page: 8,
        section: 'Section 2.5 — Critical & Cardiovascular Interventions',
        clauseText: 'Cardiovascular surgeries including CABG and angioplasty are covered under inpatient hospitalization schedules, with critical ICU days reimbursed on actual tariffs.'
      }
    }
  },
  {
    id: 'gallbladder-surgery',
    name: 'Laparoscopic Cholecystectomy',
    category: 'Gastroenterology',
    description: 'Surgical removal of diseased gallbladder containing symptomatic gallstones via laparoscopy.',
    typicalStayDays: 2,
    cities: {
      'Pune': {
        minCost: 85000,
        medianCost: 110000,
        maxCost: 140000,
        breakdown: {
          consultation: 2000,
          diagnostics: 9000,
          surgery: 68000,
          hospitalization: 18000,
          medicines: 7500,
          followUp: 5500
        }
      },
      'Mumbai': {
        minCost: 105000,
        medianCost: 135000,
        maxCost: 165000,
        breakdown: {
          consultation: 2500,
          diagnostics: 11500,
          surgery: 82000,
          hospitalization: 22500,
          medicines: 9500,
          followUp: 7000
        }
      },
      'Delhi': {
        minCost: 95000,
        medianCost: 122000,
        maxCost: 152000,
        breakdown: {
          consultation: 2200,
          diagnostics: 10000,
          surgery: 75000,
          hospitalization: 20000,
          medicines: 8500,
          followUp: 6300
        }
      },
      'Bangalore': {
        minCost: 100000,
        medianCost: 128000,
        maxCost: 158000,
        breakdown: {
          consultation: 2300,
          diagnostics: 10500,
          surgery: 78000,
          hospitalization: 21000,
          medicines: 9000,
          followUp: 6700
        }
      }
    },
    policyEligibility: {
      status: 'Potentially Covered',
      confidence: 'HIGH',
      conditions: [
        '24-month waiting period for gallstones satisfied',
        'Standard Daycare / 48-hour inpatient protocol applies',
        'Room-rent sub-limit applies to recovery room'
      ],
      evidence: {
        page: 19,
        section: 'Section 5.1.2 — Calculus of Gallbladder & Bile Ducts',
        clauseText: 'Cholecystectomy for gallstones is an admissible surgical claim following completion of 24 months continuous coverage.'
      }
    }
  }
];

export const CANNED_AI_QA: { [key: string]: { answer: string; evidence: ChatEvidence } } = {
  'is cataract surgery covered?': {
    answer: 'Yes, cataract surgery appears to be covered subject to the applicable conditions and sub-limits. Your policy has completed the mandatory 24-month waiting period. However, a disease-specific sub-limit of ₹45,000 per eye applies.',
    evidence: {
      sourcePage: 7,
      section: 'Section 4.2 — Cataract Treatment Sub-limit',
      confidence: 'HIGH',
      clauseExcerpt: 'The liability of the Company for Cataract operation shall not exceed ₹45,000 per eye per policy period, inclusive of IOL lens cost and daycare theatre charges.',
      explanation: 'While your overall policy limit is ₹10 Lakhs, cataract is capped at ₹45,000 per eye. Monofocal lens costs fit within this limit; premium multifocal lenses will incur patient out-of-pocket costs.'
    }
  },
  'is knee replacement covered?': {
    answer: 'Yes, Total Knee Replacement is covered as an admissible in-patient surgical procedure. Because your policy tenure is 28 months, you have successfully completed the 24-month waiting period for joint replacements.',
    evidence: {
      sourcePage: 18,
      section: 'Section 5.2 — Major Joint Replacement Cover',
      confidence: 'HIGH',
      clauseExcerpt: 'Total Knee Replacement surgery is an eligible in-patient procedure post completion of the 24-month specific illness waiting period, subject to Room Rent category and age-linked co-payment.',
      explanation: 'Coverage applies to OT, surgeon fees, and standard FDA/CDSCO-approved prosthetic implants. Keep in mind: staying in a room above ₹5,000/day triggers proportionate deduction across surgery fees.'
    }
  },
  'what is my room-rent limit?': {
    answer: 'Your room-rent limit is ₹5,000 per day for standard hospitalization. If admitted to an ICU, there is no sub-limit cap up to your full Sum Insured.',
    evidence: {
      sourcePage: 24,
      section: 'Section 6.3 — Proportionate Room Rent Clause',
      confidence: 'HIGH',
      clauseExcerpt: 'Room boarding and nursing charges are capped at ₹5,000 per day. If the insured chooses a room with higher tariff, all associated medical expenses shall be borne proportionately by the insured.',
      explanation: 'Choosing an ₹8,000 or ₹10,000 room will proportionately reduce reimbursement for doctor consultations, surgeon fees, and OT charges.'
    }
  },
  'do i have a waiting period?': {
    answer: 'You have satisfied the 30-day initial waiting period and the 24-month specific illness waiting period (including knee replacement, cataract, and hernia). You have 8 months remaining on your 36-month pre-existing disease (PED) clause for declared chronic conditions.',
    evidence: {
      sourcePage: 18,
      section: 'Section 5.1 — Waiting Periods Schedule',
      confidence: 'HIGH',
      clauseExcerpt: 'Expenses related to treatment of Cataract, Total Knee/Hip Replacement have a 24-month waiting period. Cover for pre-existing conditions shall commence after continuous coverage of 36 months.',
      explanation: 'All acute surgeries and elective joint replacements are fully unlocked right now. Pre-existing declared hypertension or diabetes treatment becomes claimable after 8 more months.'
    }
  },
  'what expenses are excluded?': {
    answer: 'General permanent exclusions include non-medical consumables (IRDAI List I items such as gloves, syringes, sanitizers, thermometer, admission kits), cosmetic and aesthetic surgery, unproven treatments, and obesity surgery.',
    evidence: {
      sourcePage: 31,
      section: 'Section 8.4 — Non-Payable Consumables Schedule',
      confidence: 'HIGH',
      clauseExcerpt: 'Items categorized under IRDAI Annexure I (cotton, housekeeping packs, disposable PPE kits, admin charges) shall be non-admissible.',
      explanation: 'On average, hospital bills contain 5% to 8% in non-medical consumable charges that health insurance policies do not pay unless a specific add-on rider exists.'
    }
  },
  'how much co-pay do i have?': {
    answer: 'A 10% co-payment applies if the insured patient is 55 years of age or older at the time of claim admission. For patients under 55, there is zero co-payment.',
    evidence: {
      sourcePage: 16,
      section: 'Section 4.4 — Co-payment Terms',
      confidence: 'HIGH',
      clauseExcerpt: 'A mandatory co-payment of 10% shall apply to each and every admissible claim for insured persons aged 55 years and above at the time of claim.',
      explanation: 'After non-covered items and deductibles are calculated, the insurer covers 90% of admissible costs, and the patient covers 10%.'
    }
  }
};

export const SAMPLE_CHAT_HISTORY: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'user',
    text: 'Is cataract surgery covered?',
    timestamp: '10:41 AM'
  },
  {
    id: 'msg-2',
    sender: 'ai',
    text: 'Yes, cataract surgery appears to be covered subject to the applicable conditions and sub-limits.',
    timestamp: '10:41 AM',
    evidence: {
      sourcePage: 7,
      section: 'Section 4.2 — Cataract Treatment Sub-limit',
      confidence: 'HIGH',
      clauseExcerpt: 'The liability of the Company for Cataract operation shall not exceed ₹45,000 per eye per policy period, inclusive of IOL lens cost and daycare theatre charges.',
      explanation: 'Your 24-month waiting period has been successfully completed. However, a disease-specific capping of ₹45,000 per eye applies for each procedure.'
    }
  }
];

export const MOCK_HOSPITAL_BILL_ITEMS: BillLineItem[] = [
  {
    id: 'bill-item-1',
    category: 'Room & Boarding',
    description: 'Hospital Room (Deluxe Twin Sharing - 4 Days @ ₹7,500/day)',
    amount: 30000,
    status: 'Partially Covered',
    policyRule: 'Room rent capped at ₹5,000/day. Proportionate deduction applies to excess.',
    evidence: {
      page: 24,
      section: 'Section 6.3 — Proportionate Room Rent Clause',
      clauseText: 'Room boarding charges are capped at ₹5,000/day. Excess daily tariff of ₹2,500/day is disallowed.'
    },
    whyExplanation: 'Policy allows ₹5,000/day (₹20,000 for 4 days). The hospital charged ₹7,500/day (₹30,000). The ₹10,000 difference is directly deducted.'
  },
  {
    id: 'bill-item-2',
    category: 'Surgical Services',
    description: 'Operation Theatre & Surgeon Fee (Total Knee Arthroplasty)',
    amount: 220000,
    status: 'Covered',
    policyRule: 'Covered subject to 10% co-pay and proportionate room-rent adjustment.',
    evidence: {
      page: 18,
      section: 'Section 5.2 — Major Joint Replacement Cover',
      clauseText: 'Operation theatre and specialist surgeon honorarium are admissible under surgical inpatient benefit.'
    },
    whyExplanation: 'Surgeon and OT fees are standard eligible medical expenses.'
  },
  {
    id: 'bill-item-3',
    category: 'Pharmacy',
    description: 'In-patient Medicines & Antibiotics / IV Fluids',
    amount: 15000,
    status: 'Covered',
    policyRule: 'Medically necessary prescribed inpatient drugs are fully payable.',
    evidence: {
      page: 5,
      section: 'Section 2.2 — Hospitalization Expenses',
      clauseText: 'All prescription medicines administered during hospital admission are eligible.'
    },
    whyExplanation: 'All listed medications were verified against inpatient clinical discharge records.'
  },
  {
    id: 'bill-item-4',
    category: 'Consumables',
    description: 'PPE Kits, Surgical Gloves, Bio-waste, Admission Kit',
    amount: 12000,
    status: 'Potentially Non-covered',
    policyRule: 'Non-medical consumables excluded (IRDAI Annexure I List I)',
    evidence: {
      page: 31,
      section: 'Section 8.4 — Non-Payable Consumables Schedule',
      clauseText: 'Housekeeping, administrative charges, gloves, thermometer, and sanitation kits are non-payable items.'
    },
    whyExplanation: 'IRDAI regulations categorize administrative kits, disposable gloves, and sanitation packs as non-payable items unless a separate Consumables Add-on rider is active.'
  },
  {
    id: 'bill-item-5',
    category: 'Diagnostics',
    description: 'Pre-op Blood Panel, Digital X-Rays & ECG',
    amount: 8000,
    status: 'Covered',
    policyRule: 'Pre-hospitalization diagnostics within 30 days prior to admission are eligible.',
    evidence: {
      page: 6,
      section: 'Section 2.3 — Pre-Hospitalization Diagnostic Cover',
      clauseText: 'Pathological and radiological investigations directly related to the condition are covered.'
    },
    whyExplanation: 'Pre-surgery imaging and clinical blood tests directly pertain to the joint replacement surgery.'
  }
];

export const RISK_RADAR_ITEMS: RiskRadarItem[] = [
  {
    id: 'risk-1',
    level: 'HIGH',
    title: 'Room-rent sub-limit (₹5,000/day)',
    subtitle: 'High financial impact via proportionate deduction clause',
    whyItMatters: 'If you choose an ₹8,000 or ₹10,000/day room, the insurer does not just deduct the room difference — they proportionately slash your surgeon fees, OT charges, and doctor consultation reimbursement by 37% to 50%!',
    policyEvidence: {
      page: 24,
      section: 'Section 6.3 — Proportionate Room Rent Clause',
      clauseText: 'If the insured occupies a room higher than the eligible limit of ₹5,000/day, all associated medical expenses shall be borne in proportion to the difference.'
    },
    potentialImpact: 'Potential extra out-of-pocket cost: ₹36,000 — ₹65,000 on a ₹3,20,000 bill'
  },
  {
    id: 'risk-2',
    level: 'MEDIUM',
    title: '10% Senior Co-payment (Age 55+)',
    subtitle: 'Mandatory cost-sharing on all admissible amounts',
    whyItMatters: 'Because patient age is 55, a 10% co-pay is deducted after eligible amounts are calculated, increasing your out-of-pocket burden even in cashless network hospitals.',
    policyEvidence: {
      page: 16,
      section: 'Section 4.4 — Co-payment Terms',
      clauseText: 'A mandatory co-payment of 10% shall apply to each and every admissible claim for insured persons aged 55 years and above.'
    },
    potentialImpact: 'Estimated out-of-pocket share: ₹24,000 — ₹35,000 per major hospitalization'
  },
  {
    id: 'risk-3',
    level: 'REVIEW',
    title: 'Disease-Specific Sub-limits (Cataract / Hernia)',
    subtitle: 'Cap of ₹45,000 per eye for cataract',
    whyItMatters: 'While your overall policy is ₹10 Lakhs, certain elective daycare procedures have hard ceilings regardless of your remaining coverage balance.',
    policyEvidence: {
      page: 7,
      section: 'Section 4.2 — Cataract Treatment Sub-limit',
      clauseText: 'Cataract operation expenses capped at ₹45,000 per eye inclusive of IOL lens.'
    },
    potentialImpact: 'Premium robotic or multifocal cataract lenses exceeding ₹45,000 must be borne by patient'
  },
  {
    id: 'risk-4',
    level: 'LOW',
    title: 'Sum Insured Adequacy (₹7,60,000 Remaining)',
    subtitle: 'Sum insured currently appears sufficient for planned surgery',
    whyItMatters: 'The median benchmark for Knee Replacement in Pune is ₹3,20,000, which is well within your remaining ₹7,60,000 Sum Insured.',
    policyEvidence: {
      page: 4,
      section: 'Section 2.1 — Aggregate Sum Insured',
      clauseText: 'Annual aggregate in-patient indemnity up to ₹10,00,000 with restoration benefits.'
    },
    potentialImpact: 'Minimal risk of exhausting base policy limit during this procedure'
  }
];

export const CLAIM_CHECKLIST_DATA: ClaimChecklistItem[] = [
  {
    id: 'chk-1',
    title: 'Policy Document & Digital Health Card',
    description: 'SecureHealth Plus policy schedule with active member ID',
    status: 'ready',
    required: true,
    documentType: 'Policy PDF'
  },
  {
    id: 'chk-2',
    title: 'Government Photo ID Proof (Aadhaar / PAN)',
    description: 'Patient identity verification document matching policy records',
    status: 'ready',
    required: true,
    documentType: 'Identity'
  },
  {
    id: 'chk-3',
    title: 'Doctor Prescription & Recommendation Letter',
    description: 'Orthopedic specialist consultation note recommending Knee Arthroplasty',
    status: 'ready',
    required: true,
    documentType: 'Medical Note'
  },
  {
    id: 'chk-4',
    title: 'Diagnostic Reports & X-Rays',
    description: 'Knee joint digital X-rays showing Grade IV osteoarthritis',
    status: 'ready',
    required: true,
    documentType: 'Diagnostics'
  },
  {
    id: 'chk-5',
    title: 'Hospital Cost Estimate & Tariff Breakdown',
    description: 'Official estimate on hospital letterhead with room tier and implant details',
    status: 'pending',
    required: true,
    documentType: 'Hospital Form'
  },
  {
    id: 'chk-6',
    title: 'Cashless Pre-Authorization Form',
    description: 'Filled by hospital insurance desk at least 48h prior to planned admission',
    status: 'missing',
    required: true,
    documentType: 'TPA Form'
  },
  {
    id: 'chk-7',
    title: 'Final Itemized Bill & Discharge Summary',
    description: 'Required at discharge for final claim settlement and cashless deduction audit',
    status: 'missing',
    required: true,
    documentType: 'Discharge Bill'
  }
];

export const POLICY_COMPARISON_TABLE: PolicyComparisonData[] = [
  {
    feature: 'Sum Insured',
    category: 'Core Coverage',
    policyA: '₹10,00,000',
    policyB: '₹15,00,000',
    differenceNote: 'Policy B provides ₹5,00,000 higher core indemnity.',
    advantage: 'B'
  },
  {
    feature: 'Room Rent Cap',
    category: 'Limits',
    policyA: '₹5,000/day (Proportionate clause)',
    policyB: 'Single Standard AC (No proportionate deduction)',
    differenceNote: 'Policy B eliminates proportionate deductions for any single private AC room.',
    advantage: 'B'
  },
  {
    feature: 'Co-Payment',
    category: 'Limits',
    policyA: '10% for age 55+',
    policyB: '0% (No age-linked co-payment)',
    differenceNote: 'Policy B has zero co-payment regardless of age.',
    advantage: 'B'
  },
  {
    feature: 'Annual Deductible',
    category: 'Limits',
    policyA: '₹20,000 per policy year',
    policyB: '₹0 (Zero deductible)',
    differenceNote: 'Policy A requires patient to absorb first ₹20,000 of claims.',
    advantage: 'B'
  },
  {
    feature: 'Waiting Period (Specific Surgeries)',
    category: 'Waiting Periods',
    policyA: '24 Months (Currently Completed)',
    policyB: '12 Months (Shorter waiting clause)',
    differenceNote: 'Both policies cover Knee Replacement now as user tenure is 28 months.',
    advantage: 'NEUTRAL'
  },
  {
    feature: 'Cataract Sub-limit',
    category: 'Sub-limits',
    policyA: '₹45,000 per eye',
    policyB: '₹75,000 per eye',
    differenceNote: 'Policy B accommodates premium multifocal and toric lenses.',
    advantage: 'B'
  },
  {
    feature: 'Annual Premium',
    category: 'Financials',
    policyA: '₹18,400 / year',
    policyB: '₹27,800 / year',
    differenceNote: 'Policy A saves ₹9,400 annually in premium outlay.',
    advantage: 'A'
  }
];

export const POLICY_VERSION_DIFF: PolicyVersionDiff[] = [
  {
    feature: 'Waiting Period (Specific Illnesses)',
    version2025: '24 months',
    version2026: '12 months',
    changeType: 'improved',
    impactExplanation: 'Reduced waiting period accelerates coverage eligibility for elective joint and cataract surgeries.'
  },
  {
    feature: 'Room Rent Limit',
    version2025: '₹5,000 / day',
    version2026: '₹7,500 / day',
    changeType: 'improved',
    impactExplanation: 'Allows admission into deluxe private rooms across tier-1 hospitals without triggering proportionate penalties.'
  },
  {
    feature: 'Senior Co-Payment',
    version2025: '20% for age 60+',
    version2026: '10% for age 55+',
    changeType: 'improved',
    impactExplanation: 'Reduced co-payment rate cuts patient out-of-pocket expenses by half on eligible surgical claims.'
  },
  {
    feature: 'Annual Premium',
    version2025: '₹18,400',
    version2026: '₹21,200',
    changeType: 'worsened',
    impactExplanation: 'Modest ₹2,800 premium adjustment reflects upgraded benefits and relaxed sub-limits.'
  }
];
