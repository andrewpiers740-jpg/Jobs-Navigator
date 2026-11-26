import rawGeneratedJobs from '@/src/data/generated-au-jobs.json';

export interface Job {
  id: string;
  slug?: string;
  title: string;
  sectorId: string;
  sectorName: string;
  location: string;
  cityOrSuburb?: string;
  postcode?: string;
  state: 'NSW' | 'VIC' | 'QLD' | 'WA' | 'SA' | 'TAS' | 'ACT' | 'NT';
  workType: 'Full-Time' | 'Part-Time' | 'Casual' | 'Contract / Temp' | 'FIFO / DIDO' | 'Apprenticeship / Traineeship';
  salary: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryPeriod?: 'HOUR' | 'YEAR';
  superannuation: string;
  employer: string;
  confidentialEmployer: boolean;
  featured: boolean;
  urgent: boolean;
  visaSponsorshipEligible: boolean;
  postedDate: string;
  overview: string;
  descriptionHtml?: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  screeningQuestion: string;
  screeningQuestions?: string[];
  image?: string;
  status?: 'ACTIVE' | 'FILLED';
  isRemote?: boolean;
  region?: string;
}

export const SPOTLIGHT_JOBS: Job[] = [
  {
    id: 'JN-WA-001',
    slug: 'heavy-diesel-mechanic-fifo-pilbara-wa',
    title: 'Heavy Diesel Mechanic - FIFO',
    sectorId: 'mining-resources-energy',
    sectorName: 'Mining, Resources & Energy',
    location: 'Perth / Pilbara, WA',
    cityOrSuburb: 'Perth',
    state: 'WA',
    workType: 'FIFO / DIDO',
    salary: '$140,000 - $165,000',
    salaryMin: 140000,
    salaryMax: 165000,
    salaryPeriod: 'YEAR',
    superannuation: '+ 11.5% Superannuation (12% from July 2025)',
    employer: 'Tier 1 Mining Services Partner',
    confidentialEmployer: true,
    featured: true,
    urgent: true,
    visaSponsorshipEligible: false,
    postedDate: '24 Nov 2026',
    overview: 'Experienced heavy diesel fitter required for a 2:1 FIFO roster servicing mobile open-cut mining fleet (Caterpillar 793 trucks, Komatsu 930E, Hitachi EX3600 excavators) in the Pilbara region.',
    responsibilities: [
      'Diagnose, overhaul, and service mechanical and hydraulic systems on heavy mobile mining plant equipment.',
      'Conduct scheduled preventative maintenance inspections and component change-outs in field workshop conditions.',
      'Maintain rigorous adherence to WA Department of Mines safety regulations and Take 5 hazard assessments.',
      'Collaborate with maintenance planners to document work orders in SAP.'
    ],
    requirements: [
      'Australian Trade Certificate III in Mobile Plant Technology (or recognized VETASSESS/Trades Recognition Australia equivalent).',
      'Minimum 3 years post-trade experience working on heavy earthmoving or mining plant equipment.',
      'Valid Australian High Risk Work Licence (DG, LF, CN advantageous).',
      'Current Australian Driver Licence (C or MR class).',
      'Ability to pass comprehensive pre-employment mining medical and drug/alcohol screen.'
    ],
    benefits: [
      'Top-tier 2:1 FIFO roster flying out of Perth Airport.',
      'Generous site retention allowances and annual tool allowance.',
      'Single en-suite room in modern mining village with high-speed WiFi, gym, pool, and hot meal service.',
      'Full salary packaging and superannuation matching program.'
    ],
    screeningQuestion: 'Do you hold an Australian Trade Certificate III in Mobile Plant Technology (or recognized TRA qualification)?',
    screeningQuestions: [
      'Do you hold an Australian Trade Certificate III in Mobile Plant Technology (or recognized TRA qualification)?',
      'Do you hold valid work rights in Australia for this role?'
    ],
    image: '/images/mining_fifo.jpg',
    status: 'ACTIVE'
  },
  {
    id: 'JN-VIC-002',
    slug: 'registered-nurse-aged-care-melbourne-vic',
    title: 'Registered Nurse - Aged Care',
    sectorId: 'healthcare-medical',
    sectorName: 'Healthcare & Medical',
    location: 'Melbourne, VIC',
    cityOrSuburb: 'Melbourne',
    state: 'VIC',
    workType: 'Full-Time',
    salary: '$85,000 - $102,000',
    salaryMin: 85000,
    salaryMax: 102000,
    salaryPeriod: 'YEAR',
    superannuation: '+ 11.5% Superannuation',
    employer: 'Leading Residential Care Network',
    confidentialEmployer: true,
    featured: true,
    urgent: true,
    visaSponsorshipEligible: false,
    postedDate: '23 Nov 2026',
    overview: 'Compassionate and clinical AHPRA-registered nurse needed for a reputable 110-bed residential aged care facility in inner-eastern Melbourne. Lead a supportive care team delivering resident-focused palliative and complex clinical care.',
    responsibilities: [
      'Deliver evidence-based clinical nursing assessments, complex wound management, and medication administration.',
      'Formulate and update personalized resident care plans in accordance with Aged Care Quality Standards.',
      'Lead and supervise Enrolled Nurses (ENs) and Personal Care Assistants (PCAs) during day and afternoon shifts.',
      'Liaise with visiting General Practitioners, allied health specialists, and resident family members.'
    ],
    requirements: [
      'Current, unrestricted registration as a Registered Nurse with the Nursing and Midwifery Board of Australia (AHPRA).',
      'Demonstrated experience in aged care, sub-acute rehabilitation, or clinical hospital wards.',
      'Valid NDIS Worker Screening Check and current Victorian Employee Working with Children Check (WWCC).',
      'Up-to-date CPR and First Aid certifications.'
    ],
    benefits: [
      'Full not-for-profit salary packaging benefits (up to $15,900 tax-free fringe benefits).',
      'Structured professional development CPD hours and leadership pathways.',
      'Flexible rotating rosters with consistent shift patterns.',
      'Supportive on-site Clinical Care Manager and Nurse Educator.'
    ],
    screeningQuestion: 'Do you hold current unrestricted AHPRA registration and a valid NDIS Worker Screening Check?',
    screeningQuestions: [
      'Do you hold current unrestricted AHPRA registration and a valid NDIS Worker Screening Check?',
      'Do you hold valid work rights in Australia for this role?'
    ],
    image: '/images/healthcare_medical.jpg',
    status: 'ACTIVE'
  },
  {
    id: 'JN-NSW-003',
    slug: 'licensed-electrician-commercial-sydney-nsw',
    title: 'Licensed Electrician - Commercial',
    sectorId: 'trades-construction',
    sectorName: 'Trades, Construction & Engineering',
    location: 'Sydney, NSW',
    cityOrSuburb: 'Sydney',
    state: 'NSW',
    workType: 'Full-Time',
    salary: '$95,000 - $115,000',
    salaryMin: 95000,
    salaryMax: 115000,
    salaryPeriod: 'YEAR',
    superannuation: '+ 11.5% Superannuation',
    employer: 'Premier Electrical Infrastructure Group',
    confidentialEmployer: false,
    featured: true,
    urgent: false,
    visaSponsorshipEligible: false,
    postedDate: '24 Nov 2026',
    overview: 'Qualified A-Grade electrician required for high-profile commercial fit-outs, data cabling, switchboard upgrades, and preventive maintenance projects across Greater Sydney and North Sydney.',
    responsibilities: [
      'Rough-in and fit-off of high-spec commercial office towers, hospitals, and educational institutions.',
      'Install, test, and commission Main Switchboards (MSB), sub-boards, and commercial lighting control systems (CBus/DALI).',
      'Read and interpret schematic architectural and engineering layouts independently.',
      'Ensure 100% compliance with AS/NZS 3000 Wiring Rules and SafeWork NSW guidelines.'
    ],
    requirements: [
      'Current NSW Electrical Contractor or Qualified Supervisor Electrician Licence.',
      'Current General Construction Induction Card (NSW White Card).',
      'Valid Australian Driver Licence with clean driving history.',
      'Proven track record delivering commercial fit-outs and multi-storey builds.'
    ],
    benefits: [
      'Fully equipped company trade vehicle with fuel card and E-Tag.',
      'Paid overtime at penalty rates (1.5x / 2.0x) and rostered days off (RDOs).',
      'Uniform, PPE, and test instrument kit provided.',
      'Job security with locked-in commercial pipeline extending into 2028.'
    ],
    screeningQuestion: 'Do you hold a current NSW Electrical Licence and Construction White Card?',
    screeningQuestions: [
      'Do you hold a current NSW Electrical Licence and Construction White Card?',
      'Do you hold valid work rights in Australia for this role?'
    ],
    image: '/images/trades_construction.jpg',
    status: 'ACTIVE'
  },
  {
    id: 'JN-QLD-004',
    slug: 'full-stack-software-engineer-nextjs-brisbane-qld',
    title: 'Full-Stack Software Engineer (Next.js / Node)',
    sectorId: 'it-digital',
    sectorName: 'Information Technology & Digital',
    location: 'Brisbane, QLD (Hybrid)',
    cityOrSuburb: 'Brisbane',
    state: 'QLD',
    workType: 'Full-Time',
    salary: '$125,000 - $145,000',
    salaryMin: 125000,
    salaryMax: 145000,
    salaryPeriod: 'YEAR',
    superannuation: '+ 11.5% Superannuation',
    employer: 'Fast-Growing Australian FinTech SaaS',
    confidentialEmployer: true,
    featured: true,
    urgent: false,
    visaSponsorshipEligible: false,
    postedDate: '22 Nov 2026',
    overview: 'Build high-performance web applications and resilient microservices for an Australian enterprise SaaS team processing over $40M monthly in compliant transaction workflows.',
    responsibilities: [
      'Develop modern web applications using React, Next.js App Router, TypeScript, and Tailwind CSS.',
      'Architect robust REST and GraphQL API endpoints in Node.js and PostgreSQL.',
      'Collaborate with Australian product designers and DevOps engineers on AWS CI/CD pipelines.',
      'Conduct peer code reviews and uphold automated unit/integration test coverage.'
    ],
    requirements: [
      '3+ years commercial software engineering experience building production web applications.',
      'Strong proficiency in TypeScript, React, Next.js, and modern CSS frameworks.',
      'Solid understanding of relational database modeling, indexing, and SQL.',
      'Valid Australian working rights (Citizen, Permanent Resident, or lawful onshore visa holder currently living in Australia).'
    ],
    benefits: [
      'Flexible hybrid working (2 days in modern Fortitude Valley office, 3 days WFH).',
      '$3,000 annual home office setup and learning stipend.',
      'Equity stock option scheme in high-growth venture.',
      'Health & wellness allowances plus annual company retreats.'
    ],
    screeningQuestion: 'How many years of commercial React and TypeScript experience do you have in production environments?',
    screeningQuestions: [
      'How many years of commercial React and TypeScript experience do you have in production environments?',
      'Do you hold valid work rights in Australia for this role?'
    ],
    image: '/images/tech_digital.jpg',
    status: 'ACTIVE'
  },
  {
    id: 'JN-SA-005',
    slug: 'hc-truck-driver-metro-regional-adelaide-sa',
    title: 'HC Truck Driver - Metro & Regional',
    sectorId: 'transport-logistics',
    sectorName: 'Transport, Logistics & Warehousing',
    location: 'Adelaide, SA',
    cityOrSuburb: 'Adelaide',
    state: 'SA',
    workType: 'Casual',
    salary: '$38 - $44/hr',
    salaryMin: 38,
    salaryMax: 44,
    salaryPeriod: 'HOUR',
    superannuation: '+ 11.5% Superannuation + Shift Loadings',
    employer: 'National Freight Distribution Carrier',
    confidentialEmployer: false,
    featured: false,
    urgent: true,
    visaSponsorshipEligible: false,
    postedDate: '24 Nov 2026',
    overview: 'Reliable Heavy Combination (HC) driver needed for scheduled palletised freight distribution across Adelaide metropolitan depots, Barossa Valley, and regional South Australia.',
    responsibilities: [
      'Safe operation of late-model automatic prime movers with refrigerated and tautliner trailers.',
      'Conduct pre-trip and post-trip vehicle mechanical inspections in line with NHVR standards.',
      'Ensure proper load restraint compliance and electronic consignment scanning.',
      'Maintain accurate logbook records and comply with Chain of Responsibility (CoR) laws.'
    ],
    requirements: [
      'Current Australian Heavy Combination (HC) or Multi Combination (MC) driver licence.',
      'Minimum 12 months verified commercial driving experience on Australian roads.',
      'Current 5-year driving history printout with clean safety record.',
      'Ability to pass commercial driver pre-employment medical and drug screen.'
    ],
    benefits: [
      'Modern, well-maintained fleet equipped with automatic transmissions and air-ride cabins.',
      'Weekly pay cycle with attractive afternoon and weekend penalty rates.',
      'Opportunity for ongoing permanent transition based on performance.',
      'Local management based at Wingfield depot.'
    ],
    screeningQuestion: 'Do you hold a current Australian HC licence and have at least 12 months commercial driving experience?',
    screeningQuestions: [
      'Do you hold a current Australian HC licence and have at least 12 months commercial driving experience?',
      'Do you hold valid work rights in Australia for this role?'
    ],
    image: '/images/trades_construction.jpg',
    status: 'ACTIVE'
  },
  {
    id: 'JN-WA-006',
    slug: 'senior-bookkeeper-payroll-officer-perth-wa',
    title: 'Senior Bookkeeper & Payroll Officer',
    sectorId: 'accounting-finance',
    sectorName: 'Accounting, Finance & Banking',
    location: 'Perth, WA',
    cityOrSuburb: 'Perth',
    state: 'WA',
    workType: 'Part-Time',
    salary: '$45 - $55/hr',
    salaryMin: 45,
    salaryMax: 55,
    salaryPeriod: 'HOUR',
    superannuation: '+ 11.5% Superannuation',
    employer: 'Mid-Tier Chartered Accounting & Advisory',
    confidentialEmployer: false,
    featured: false,
    urgent: false,
    visaSponsorshipEligible: false,
    postedDate: '21 Nov 2026',
    overview: 'Autonomous senior bookkeeper required for 24 hours per week (flexible across 3-4 days) managing end-to-end multi-client bookkeeping, Single Touch Payroll (STP Phase 2), and BAS preparation in Perth CBD.',
    responsibilities: [
      'Manage multi-entity client accounts, reconciliations, and cash flow tracking in Xero and MYOB.',
      'Process weekly, fortnightly, and monthly payroll runs across various Modern Awards (Clerks, Building, Hospitality).',
      'Prepare and lodge Business Activity Statements (BAS) and Installment Activity Statements (IAS).',
      'Manage Superannuation clearing house payments and end-of-year STP finalisations.'
    ],
    requirements: [
      'Certificate IV in Accounting and Bookkeeping or higher Australian qualification.',
      'Current registration as a Registered BAS Agent (or working towards).',
      'Expertise in Xero, Receipt Bank/Dext, and Single Touch Payroll Phase 2.',
      'Proven knowledge of Fair Work award interpretation and superannuation guarantee legislation.'
    ],
    benefits: [
      'Flexible hours designed around family or study commitments.',
      'Convenient Perth CBD office adjacent to Elizabeth Quay station with WFH flexibility.',
      'Supportive culture with continuing professional education support.'
    ],
    screeningQuestion: 'Are you experienced with Single Touch Payroll (STP) Phase 2 and Australian modern award interpretation?',
    screeningQuestions: [
      'Are you experienced with Single Touch Payroll (STP) Phase 2 and Australian modern award interpretation?',
      'Do you hold valid work rights in Australia for this role?'
    ],
    image: '/images/tech_digital.jpg',
    status: 'ACTIVE'
  }
];

function normalizeWorkType(wt: string): Job['workType'] {
  switch (wt) {
    case 'FULL_TIME': return 'Full-Time';
    case 'PART_TIME': return 'Part-Time';
    case 'CASUAL': return 'Casual';
    case 'CONTRACT': return 'Contract / Temp';
    case 'FIFO': return 'FIFO / DIDO';
    default: return 'Full-Time';
  }
}

function formatSalary(min: number, max: number, period: 'HOUR' | 'YEAR'): string {
  if (period === 'HOUR') {
    return `$${min} - $${max}/hr`;
  }
  return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
}

// Convert generated jobs to unified Job interface
export const GENERATED_JOBS: Job[] = (rawGeneratedJobs as any[]).map((raw) => {
  const normWorkType = normalizeWorkType(raw.workType);
  const salaryStr = formatSalary(raw.salaryMin, raw.salaryMax, raw.salaryPeriod);
  
  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    sectorId: raw.sectorSlug,
    sectorName: raw.sectorName,
    location: `${raw.cityOrSuburb}, ${raw.state}`,
    cityOrSuburb: raw.cityOrSuburb,
    postcode: raw.postcode,
    state: raw.state as Job['state'],
    workType: normWorkType,
    salary: salaryStr,
    salaryMin: raw.salaryMin,
    salaryMax: raw.salaryMax,
    salaryPeriod: raw.salaryPeriod,
    superannuation: raw.includesSuper ? '+ 11.5% Superannuation' : 'Incl. Superannuation',
    employer: 'Verified Australian Employer',
    confidentialEmployer: true,
    featured: false,
    urgent: raw.workType === 'FIFO',
    visaSponsorshipEligible: false,
    postedDate: 'Recent',
    overview: `Verified opportunity in ${raw.cityOrSuburb}, ${raw.state} within ${raw.sectorName}. Direct application with Australian right-to-work verification and fast employer review.`,
    descriptionHtml: raw.descriptionHtml,
    responsibilities: [
      'Execute core duties adhering strictly to Australian National Employment Standards and SafeWork regulations.',
      'Maintain clear communication and collaboration with project leads and team members.',
      'Operate in accordance with relevant Modern Award guidelines and statutory standards.'
    ],
    requirements: [
      'Valid Australian work rights (Australian Citizen, Permanent Resident, New Zealand Citizen, or lawful onshore resident visa holder).',
      'Relevant Australian trade qualification, university degree, or proven industry experience.',
      'Compulsory identity verification (Driver Licence front & back OR Passport) under 90-day retention schedule.'
    ],
    benefits: [
      'Competitive remuneration under certified Australian awards with statutory 11.5% Superannuation guarantee.',
      'Safe, modern working environment with growth opportunities.',
      'Direct on-site application processing with 48-hour matching turnaround.'
    ],
    screeningQuestion: raw.screeningQuestions?.[0] || 'Do you hold valid work rights in Australia for this role?',
    screeningQuestions: raw.screeningQuestions || [
      'Do you hold valid work rights in Australia for this role?',
      'When can you start or what is your current notice period?'
    ],
    isRemote: Boolean(raw.isRemote),
    region: raw.region,
    status: raw.status as 'ACTIVE' | 'FILLED'
  };
});

// All combined jobs
export const INITIAL_JOBS: Job[] = [...SPOTLIGHT_JOBS, ...GENERATED_JOBS];

export function getJobBySlug(slug: string): Job | undefined {
  return INITIAL_JOBS.find(j => j.slug === slug || j.id === slug);
}

export function getJobById(id: string): Job | undefined {
  return INITIAL_JOBS.find(j => j.id === id);
}

export interface ApplicationRecord {
  id: string;
  referenceNumber: string;
  jobId: string;
  jobTitle: string;
  applicantName: string;
  email: string;
  phone: string;
  location: string;
  rightToWork: string;
  visaDetails?: string;
  screeningAnswer: string;
  cvFileName: string;
  cvFileSize: string;
  cvDataUrl?: string;
  idType: 'drivers_licence' | 'passport';
  idFrontFileName?: string;
  idFrontDataUrl?: string;
  idBackFileName?: string;
  idBackDataUrl?: string;
  passportFileName?: string;
  passportDataUrl?: string;
  retentionConsentAccepted: boolean;
  notes?: string;
  status: 'Pending' | 'Shortlisted' | 'Interviewing' | 'Placed' | 'Archived';
  submittedAt: string;
}

export interface EmployerInquiry {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  location: string;
  sector: string;
  roleTitle: string;
  workType: string;
  estimatedSalary: string;
  candidateVolume: string;
  requirements: string;
  urgent: boolean;
  status: 'New' | 'Contacted' | 'Proposal Sent' | 'Archived';
  submittedAt: string;
}

export const INITIAL_APPLICATIONS: ApplicationRecord[] = [
  {
    id: 'app-001',
    referenceNumber: 'JN-2026-8492',
    jobId: 'JN-WA-001',
    jobTitle: 'Heavy Diesel Mechanic - FIFO',
    applicantName: 'Lachlan Campbell',
    email: 'l.campbell.diesel@outlook.com.au',
    phone: '0412 884 192',
    location: 'Rockingham, WA',
    rightToWork: 'Australian Citizen',
    screeningAnswer: 'Yes, I completed Certificate III in Mobile Plant Technology with WesTrac CAT in 2018. Over 6 years FIFO experience in Pilbara.',
    cvFileName: 'Lachlan_Campbell_Heavy_Diesel_CV.pdf',
    cvFileSize: '348 KB',
    idType: 'drivers_licence',
    idFrontFileName: 'Lachlan_WA_Licence_Front.jpg',
    idBackFileName: 'Lachlan_WA_Licence_Back.jpg',
    retentionConsentAccepted: true,
    status: 'Shortlisted',
    submittedAt: '2026-11-24T14:22:00Z'
  },
  {
    id: 'app-002',
    referenceNumber: 'JN-2026-7819',
    jobId: 'JN-VIC-002',
    jobTitle: 'Registered Nurse - Aged Care',
    applicantName: 'Priya Sharma',
    email: 'priya.sharma.rn@gmail.com',
    phone: '0423 719 330',
    location: 'Hawthorn, Melbourne VIC',
    rightToWork: 'Permanent Resident',
    screeningAnswer: 'Yes, current AHPRA Registration valid to 2027, plus Victorian NDIS check cleared in August 2025.',
    cvFileName: 'Priya_Sharma_AHPRA_RN_Resume.pdf',
    cvFileSize: '412 KB',
    idType: 'passport',
    passportFileName: 'Priya_Passport_PhotoPage.jpg',
    retentionConsentAccepted: true,
    status: 'Interviewing',
    submittedAt: '2026-11-23T09:15:00Z'
  },
  {
    id: 'app-003',
    referenceNumber: 'JN-2026-9041',
    jobId: 'JN-NSW-003',
    jobTitle: 'Licensed Electrician - Commercial',
    applicantName: 'Mark Kowalski',
    email: 'mark.k.electrical@gmail.com',
    phone: '0439 120 445',
    location: 'Parramatta, Sydney NSW',
    rightToWork: 'Australian Citizen',
    screeningAnswer: 'Yes, NSW Electrician Licence #304892C and current White Card. 8 years commercial fitout experience.',
    cvFileName: 'Mark_Kowalski_Licensed_Electrician.pdf',
    cvFileSize: '290 KB',
    idType: 'drivers_licence',
    idFrontFileName: 'Mark_NSW_Licence_Front.jpg',
    idBackFileName: 'Mark_NSW_Licence_Back.jpg',
    retentionConsentAccepted: true,
    status: 'Pending',
    submittedAt: '2026-11-24T16:40:00Z'
  }
];

export const INITIAL_EMPLOYER_INQUIRIES: EmployerInquiry[] = [
  {
    id: 'emp-001',
    companyName: 'Apex Resources Australia',
    contactName: 'David Sterling (HR Director)',
    email: 'd.sterling@apexresources.com.au',
    phone: '08 9482 1100',
    location: 'Perth, WA',
    sector: 'Mining, Resources & Energy',
    roleTitle: '4x Heavy Diesel Fitters + 2x Auto Electricians',
    workType: 'FIFO / DIDO',
    estimatedSalary: '$150,000 - $170,000 + Super',
    candidateVolume: '6 positions',
    requirements: 'Urgent expansion on Fortescue River iron ore site. Need vetted fitters with active high risk work tickets ready for January onboarding.',
    urgent: true,
    status: 'New',
    submittedAt: '2026-11-24T11:05:00Z'
  },
  {
    id: 'emp-002',
    companyName: 'Regency Health Communities',
    contactName: 'Sarah Jenkins (Talent Acquisition Manager)',
    email: 's.jenkins@regencycare.vic.gov.au',
    phone: '03 9811 4455',
    location: 'Melbourne, VIC',
    sector: 'Healthcare & Medical',
    roleTitle: 'Clinical Care Coordinator & 3x Registered Nurses',
    workType: 'Full-Time',
    estimatedSalary: '$95,000 - $115,000 + Super',
    candidateVolume: '4 positions',
    requirements: 'Requires AHPRA registered candidates with verified Australian work rights and clean police checks for immediate start.',
    urgent: false,
    status: 'Proposal Sent',
    submittedAt: '2026-11-22T15:30:00Z'
  }
];
