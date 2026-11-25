// scripts/generate-au-jobs.mjs
import fs from 'node:fs';
import path from 'node:path';

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// BATCH 1: Capital & Major Metro/Regional Hubs (from initial generation)
const SECTORS_METRO = [
  { slug: 'trades-construction', name: 'Trades, Construction & Engineering', roles: ['Licensed Electrician', 'Commercial Plumber', 'Site Supervisor', 'Civil Project Engineer', 'Carpenter & Joiner', 'Estimator'] },
  { slug: 'mining-resources-energy', name: 'Mining, Resources & Energy', roles: ['Heavy Diesel Mechanic', 'FIFO Drillers Offsider', 'Mine Geologist', 'HSE Advisor', 'Fixed Plant Fitter', 'Solar Commissioning Tech'] },
  { slug: 'healthcare-medical', name: 'Healthcare & Medical', roles: ['Registered Nurse', 'Aged Care Support Worker', 'NDIS Disability Support Worker', 'Physiotherapist', 'Dental Assistant', 'Practice Manager'] },
  { slug: 'it-digital', name: 'Information Technology & Digital', roles: ['Full-Stack Developer', 'Cybersecurity Analyst', 'Cloud DevOps Engineer', 'Data Analyst', 'IT Service Desk Engineer', 'Product Designer'] },
  { slug: 'accounting-finance', name: 'Accounting, Finance & Banking', roles: ['Senior Bookkeeper', 'Payroll Officer', 'Assistant Accountant', 'Financial Planner', 'Credit Analyst', 'Audit Associate'] },
  { slug: 'retail-hospitality-tourism', name: 'Retail, Hospitality & Tourism', roles: ['Chef de Partie', 'Venue Manager', 'Retail Store Manager', 'Barista & Front of House', 'Hotel Duty Manager', 'Travel Consultant'] },
  { slug: 'transport-logistics', name: 'Transport, Logistics & Warehousing', roles: ['HC Truck Driver', 'MC Road Train Driver', 'Forklift Operator', 'Warehouse Team Leader', 'Supply Chain Coordinator', 'Freight Allocator'] },
  { slug: 'admin-office-support', name: 'Administration & Office Support', roles: ['Executive Assistant', 'Office Administrator', 'Customer Service Specialist', 'Receptionist', 'Operations Coordinator', 'Data Entry Officer'] },
  { slug: 'education-training', name: 'Education & Training', roles: ['Early Childhood Educator', 'Primary School Teacher', 'Secondary Relief Teacher', 'VET Trainer & Assessor', 'Childcare Room Leader', 'Learning Support Aide'] },
  { slug: 'sales-marketing', name: 'Sales, Marketing & Communications', roles: ['Account Executive', 'Digital Marketing Specialist', 'Business Development Manager', 'Content & SEO Specialist', 'Client Success Manager', 'Campaign Coordinator'] },
  { slug: 'manufacturing-agriculture', name: 'Manufacturing & Agribusiness', roles: ['Production Line Operator', 'Quality Assurance Officer', 'Farm Hand & Machinery Operator', 'Food Safety Coordinator', 'Agronomy Technician', 'Maintenance Fitter'] },
  { slug: 'legal-government-nfp', name: 'Legal, Government & Community', roles: ['Paralegal', 'Policy & Program Officer', 'Community Caseworker', 'Compliance Officer', 'Grant & Contract Coordinator', 'Legal Secretary'] },
];

const LOCATIONS_METRO = [
  { state: 'NSW', city: 'Sydney', postcode: '2000' },
  { state: 'NSW', city: 'Newcastle', postcode: '2300' },
  { state: 'VIC', city: 'Melbourne', postcode: '3000' },
  { state: 'VIC', city: 'Geelong', postcode: '3220' },
  { state: 'QLD', city: 'Brisbane', postcode: '4000' },
  { state: 'QLD', city: 'Gold Coast', postcode: '4217' },
  { state: 'WA', city: 'Perth', postcode: '6000' },
  { state: 'WA', city: 'Karratha', postcode: '6714' },
  { state: 'SA', city: 'Adelaide', postcode: '5000' },
  { state: 'TAS', city: 'Hobart', postcode: '7000' },
  { state: 'ACT', city: 'Canberra', postcode: '2601' },
  { state: 'NT', city: 'Darwin', postcode: '0800' },
];

// BATCH 2: Remote Cities, Outposts & Professional Remote Roles (NOT LISTED BEFORE)
const LOCATIONS_REMOTE_CITIES = [
  // Northern Territory Remote
  { state: 'NT', city: 'Alice Springs', postcode: '0870', region: 'Central Australia Outback' },
  { state: 'NT', city: 'Katherine', postcode: '0850', region: 'Top End Regional' },
  { state: 'NT', city: 'Tennant Creek', postcode: '0860', region: 'Barkly Tablelands' },
  { state: 'NT', city: 'Nhulunbuy', postcode: '0880', region: 'East Arnhem Land' },
  { state: 'NT', city: 'Jabiru', postcode: '0886', region: 'Kakadu National Park' },

  // Western Australia Remote & Kimberley/Pilbara/Goldfields
  { state: 'WA', city: 'Broome', postcode: '6725', region: 'Kimberley Coast' },
  { state: 'WA', city: 'Port Hedland', postcode: '6721', region: 'Pilbara Iron Ore Hub' },
  { state: 'WA', city: 'Kalgoorlie', postcode: '6430', region: 'Eastern Goldfields' },
  { state: 'WA', city: 'Geraldton', postcode: '6530', region: 'Mid West Coast' },
  { state: 'WA', city: 'Esperance', postcode: '6450', region: 'South Coast' },
  { state: 'WA', city: 'Newman', postcode: '6753', region: 'East Pilbara' },
  { state: 'WA', city: 'Tom Price', postcode: '6751', region: 'Hamersley Range' },
  { state: 'WA', city: 'Kununurra', postcode: '6743', region: 'Ord River East Kimberley' },
  { state: 'WA', city: 'Carnarvon', postcode: '6701', region: 'Gascoyne Coast' },
  { state: 'WA', city: 'Albany', postcode: '6330', region: 'Great Southern' },

  // South Australia Remote & Outback
  { state: 'SA', city: 'Coober Pedy', postcode: '5723', region: 'Far North Opal Outback' },
  { state: 'SA', city: 'Roxby Downs', postcode: '5725', region: 'Olympic Dam Mining Zone' },
  { state: 'SA', city: 'Whyalla', postcode: '5600', region: 'Eyre Peninsula Green Steel Hub' },
  { state: 'SA', city: 'Port Augusta', postcode: '5700', region: 'Spencer Gulf Crossroad' },
  { state: 'SA', city: 'Port Lincoln', postcode: '5606', region: 'Lower Eyre Peninsula' },
  { state: 'SA', city: 'Mount Gambier', postcode: '5290', region: 'Limestone Coast' },
  { state: 'SA', city: 'Renmark', postcode: '5341', region: 'Riverland' },
  { state: 'SA', city: 'Ceduna', postcode: '5690', region: 'Nullarbor Gateway' },

  // Queensland Remote, Mining & Tropical Regional
  { state: 'QLD', city: 'Mount Isa', postcode: '4825', region: 'North West Minerals Province' },
  { state: 'QLD', city: 'Cairns', postcode: '4870', region: 'Far North Tropical' },
  { state: 'QLD', city: 'Townsville', postcode: '4810', region: 'North Queensland Hub' },
  { state: 'QLD', city: 'Mackay', postcode: '4740', region: 'Bowen Basin Mining Gateway' },
  { state: 'QLD', city: 'Gladstone', postcode: '4680', region: 'Central Queensland Port & LNG' },
  { state: 'QLD', city: 'Rockhampton', postcode: '4700', region: 'Capricorn Coast' },
  { state: 'QLD', city: 'Weipa', postcode: '4874', region: 'Cape York Bauxite' },
  { state: 'QLD', city: 'Longreach', postcode: '4730', region: 'Central West Outback' },
  { state: 'QLD', city: 'Emerald', postcode: '4720', region: 'Central Highlands' },
  { state: 'QLD', city: 'Roma', postcode: '4455', region: 'Maranoa Gas Basin' },
  { state: 'QLD', city: 'Bundaberg', postcode: '4670', region: 'Wide Bay Burnett' },

  // New South Wales Remote & Far West
  { state: 'NSW', city: 'Broken Hill', postcode: '2880', region: 'Far West Outback Mining' },
  { state: 'NSW', city: 'Dubbo', postcode: '2830', region: 'Central West Inland Hub' },
  { state: 'NSW', city: 'Orange', postcode: '2800', region: 'Central Tablelands' },
  { state: 'NSW', city: 'Tamworth', postcode: '2340', region: 'New England' },
  { state: 'NSW', city: 'Armidale', postcode: '2350', region: 'Northern Tablelands' },
  { state: 'NSW', city: 'Wagga Wagga', postcode: '2650', region: 'Riverina' },
  { state: 'NSW', city: 'Albury', postcode: '2640', region: 'Murray Border Regional' },
  { state: 'NSW', city: 'Griffith', postcode: '2680', region: 'Murrumbidgee Irrigation Area' },
  { state: 'NSW', city: 'Cobar', postcode: '2835', region: 'Coburn Copper & Gold Basin' },
  { state: 'NSW', city: 'Bourke', postcode: '2840', region: 'Darling River Outback' },

  // Victoria Regional & Remote
  { state: 'VIC', city: 'Mildura', postcode: '3500', region: 'Sunraysia Murray' },
  { state: 'VIC', city: 'Shepparton', postcode: '3630', region: 'Goulburn Valley' },
  { state: 'VIC', city: 'Warrnambool', postcode: '3280', region: 'Great Ocean Road Regional' },
  { state: 'VIC', city: 'Bendigo', postcode: '3550', region: 'Loddon Mallee' },
  { state: 'VIC', city: 'Ballarat', postcode: '3350', region: 'Central Highlands' },
  { state: 'VIC', city: 'Wodonga', postcode: '3690', region: 'Hume North East' },
  { state: 'VIC', city: 'Traralgon', postcode: '3844', region: 'Latrobe Valley' },
  { state: 'VIC', city: 'Horsham', postcode: '3400', region: 'Wimmera Regional' },

  // Tasmania Regional & Remote
  { state: 'TAS', city: 'Launceston', postcode: '7250', region: 'Tamar Valley Hub' },
  { state: 'TAS', city: 'Devonport', postcode: '7310', region: 'North West Coast' },
  { state: 'TAS', city: 'Burnie', postcode: '7320', region: 'Bass Strait Port' },
  { state: 'TAS', city: 'Queenstown', postcode: '7467', region: 'West Coast Mining Heritage' },
  { state: 'TAS', city: 'Strahan', postcode: '7468', region: 'Wilderness Coast' },
  { state: 'TAS', city: 'St Helens', postcode: '7216', region: 'East Coast Bay of Fires' },
];

// Specialised Professional & Remote Roles (High demand in remote Australia & Australia-wide remote)
const PROFESSIONAL_REMOTE_SECTORS = [
  {
    slug: 'it-digital',
    name: 'Information Technology & Digital',
    roles: [
      'Remote Cloud Solutions Architect (AWS / Azure)',
      'Remote Cybersecurity Threat Analyst',
      'Remote Senior Full-Stack Engineer (Next.js / Node)',
      'Remote Senior Data & ML Engineer',
      'Remote DevOps & Platform Reliability Engineer',
      'Remote Product Design & UI/UX Lead',
      'Remote Systems Security Specialist',
      'Remote Telecommunications & Satellite Field Engineer',
    ],
    salaryMin: 125000,
    salaryMax: 185000,
  },
  {
    slug: 'healthcare-medical',
    name: 'Healthcare & Medical',
    roles: [
      'Remote Telehealth Registered Nurse Specialist',
      'Remote Telehealth Clinical Psychologist',
      'Remote Indigenous Community Healthcare Coordinator',
      'Remote Occupational Therapist (Telehealth & Regional)',
      'Remote Clinical Coder & Health Information Manager',
      'Remote Rural & Outback Flight Nurse',
      'Remote Telehealth Mental Health Social Worker',
      'Remote Chronic Disease Management Consultant',
    ],
    salaryMin: 95000,
    salaryMax: 155000,
  },
  {
    slug: 'mining-resources-energy',
    name: 'Mining, Resources & Energy',
    roles: [
      'Remote Mining Fleet Telemetry & Dispatch Controller',
      'Remote GIS & Exploration Geologist',
      'Remote Renewable Energy Grid Connection Engineer',
      'Remote Environmental Compliance & Carbon Specialist',
      'Remote Blast Optimization & Geotechnical Planner',
      'Remote Mine Automation & Autonomous Fleet Tech',
      'FIFO Remote Power Generation Technician',
      'Remote Resource Estimator & Feasibility Analyst',
    ],
    salaryMin: 135000,
    salaryMax: 205000,
  },
  {
    slug: 'trades-construction',
    name: 'Trades, Construction & Engineering',
    roles: [
      'Remote Project Controls & Cost Estimator',
      'Remote Structural Design & BIM Coordinator',
      'Remote Regional Infrastructure QA/QC Inspector',
      'Remote Contracts Administrator (AS 4000 / AS 2124)',
      'Remote Mechanical Commissioning Lead',
      'Remote Solar Farm & BESS Site Supervisor',
      'Remote Wind Turbine High Voltage Specialist',
      'Remote Heavy Vehicle Field Service Technician',
    ],
    salaryMin: 110000,
    salaryMax: 165000,
  },
  {
    slug: 'accounting-finance',
    name: 'Accounting, Finance & Banking',
    roles: [
      'Remote Senior Management Accountant',
      'Remote Single Touch Payroll (STP) Phase 2 Specialist',
      'Remote Corporate Financial Controller',
      'Remote Regional Agri-Business Banking Analyst',
      'Remote Forensic Audit & Internal Controls Manager',
      'Remote Commercial Tax Advisor (CPA / CA)',
      'Remote Treasury & Capital Risk Analyst',
      'Remote ERP Systems & Xero Implementation Consultant',
    ],
    salaryMin: 105000,
    salaryMax: 160000,
  },
  {
    slug: 'manufacturing-agriculture',
    name: 'Manufacturing & Agribusiness',
    roles: [
      'Remote Precision Agriculture & Satellite Crop Analyst',
      'Remote Broadacre Carbon Farming Advisor',
      'Remote Livestock Genetics & Traceability Specialist',
      'Remote AgTech IoT & Sensor Integration Engineer',
      'Remote Export Grain Trade & Supply Chain Trader',
      'Remote Regional Biosecurity & Crop Protection Officer',
      'Remote Agronomy & Soil Chemistry Specialist',
      'Remote Food Safety & Export Quality Auditor',
    ],
    salaryMin: 98000,
    salaryMax: 145000,
  },
  {
    slug: 'legal-government-nfp',
    name: 'Legal, Government & Community',
    roles: [
      'Remote Commercial In-House Legal Counsel',
      'Remote Government Policy & Legislative Analyst',
      'Remote Native Title & Indigenous Heritage Advisor',
      'Remote Privacy & Compliance Officer (Privacy Act 1988)',
      'Remote NDIS Support Coordinator & Specialist',
      'Remote Social Justice & Community Housing Manager',
      'Remote Grant Funding & Capital Project Officer',
      'Remote Regulatory Affairs & ACCC Compliance Lead',
    ],
    salaryMin: 115000,
    salaryMax: 175000,
  },
  {
    slug: 'education-training',
    name: 'Education & Training',
    roles: [
      'Remote Outback Distance Education STEM Teacher',
      'Remote Digital Curriculum & Instructional Designer',
      'Remote VET Training Assessor (Mining & Engineering)',
      'Remote University E-Learning Platform Specialist',
      'Remote Regional Literacy & Numeracy Interventionist',
      'Remote Aboriginal & Torres Strait Islander Education Advisor',
    ],
    salaryMin: 88000,
    salaryMax: 125000,
  },
  {
    slug: 'transport-logistics',
    name: 'Transport, Logistics & Warehousing',
    roles: [
      'Remote National Freight Logistics Coordinator',
      'Remote Transport Chain of Responsibility (CoR) Auditor',
      'Remote Route Optimization & Telematics Controller',
      'Remote Rail Freight Logistics & Yard Controller',
      'Remote Cold-Chain Compliance Manager',
      'Remote Customs Brokerage & Import Clearance Specialist',
    ],
    salaryMin: 85000,
    salaryMax: 135000,
  },
  {
    slug: 'sales-marketing',
    name: 'Sales, Marketing & Communications',
    roles: [
      'Remote Growth Marketing & Paid Acquisition Lead',
      'Remote B2B SaaS Enterprise Account Director',
      'Remote Technical Content & SEO Strategist',
      'Remote Public Relations & Regional Media Specialist',
      'Remote Partner Ecosystem & Channel Manager',
    ],
    salaryMin: 95000,
    salaryMax: 150000,
  },
  {
    slug: 'admin-office-support',
    name: 'Administration & Office Support',
    roles: [
      'Remote Executive Virtual Assistant (C-Suite)',
      'Remote Operations & Project Office Coordinator',
      'Remote Legal Transcriptionist & Case File Manager',
      'Remote Bilingual Customer Support Specialist',
    ],
    salaryMin: 75000,
    salaryMax: 98000,
  },
  {
    slug: 'retail-hospitality-tourism',
    name: 'Retail, Hospitality & Tourism',
    roles: [
      'Remote Luxury Safari & Outback Lodge Manager',
      'Remote Eco-Tourism Operations Director',
      'Remote Regional Hospitality Group General Manager',
      'Remote Destination Marketing & Tourism Specialist',
    ],
    salaryMin: 85000,
    salaryMax: 130000,
  },
];

const WORK_TYPES = ['FULL_TIME', 'PART_TIME', 'CASUAL', 'CONTRACT', 'FIFO'];

const jobs = [];
let counter = 1001;

// 1. GENERATE ORIGINAL BATCH (1,056 METRO & MAJOR REGIONAL JOBS)
for (const sector of SECTORS_METRO) {
  for (let i = 0; i < 88; i++) {
    const role = sector.roles[i % sector.roles.length];
    const loc = LOCATIONS_METRO[(i + counter) % LOCATIONS_METRO.length];
    const workType = sector.slug === 'mining-resources-energy' && i % 2 === 0
      ? 'FIFO'
      : WORK_TYPES[(i + sector.roles.length) % WORK_TYPES.length];

    const isHourly = workType === 'CASUAL' || workType === 'PART_TIME';
    const salaryMin = isHourly ? 34 + (i % 22) : 78000 + ((i * 2500) % 95000);
    const salaryMax = isHourly ? salaryMin + 10 : salaryMin + 22000;
    const idNum = counter++;
    const title = `${role} — ${loc.city} (${loc.state})`;
    const slug = `${slugify(role)}-${slugify(loc.city)}-${loc.state.toLowerCase()}-${idNum}`;

    jobs.push({
      id: `job_${idNum}`,
      slug,
      title,
      sectorSlug: sector.slug,
      sectorName: sector.name,
      state: loc.state,
      cityOrSuburb: loc.city,
      postcode: loc.postcode,
      isRemote: i % 11 === 0,
      workType,
      salaryMin,
      salaryMax,
      salaryPeriod: isHourly ? 'HOUR' : 'YEAR',
      includesSuper: true,
      status: i % 25 === 0 ? 'FILLED' : 'ACTIVE',
      descriptionHtml: `<p>We are seeking a capable <strong>${role}</strong> based in <strong>${loc.city}, ${loc.state}</strong> within the <strong>${sector.name}</strong> sector. Candidates apply directly on our platform and are matched with vetted Australian employers.</p><p>Key responsibilities include safe execution of daily duties, clear communication, and adherence to Australian workplace standards.</p>`,
      screeningQuestions: [
        'Do you hold valid work rights in Australia for this role?',
        'When can you start or what is your current notice period?',
      ],
    });
  }
}

// 2. GENERATE NEW BATCH: 1,100+ PROFESSIONAL & REMOTE JOBS IN REMOTE CITIES (NOT LISTED BEFORE)
let remoteCounter = 3001;
const TARGET_REMOTE_COUNT = 1150; // 1,150 additional remote & regional jobs

for (let i = 0; i < TARGET_REMOTE_COUNT; i++) {
  const sector = PROFESSIONAL_REMOTE_SECTORS[i % PROFESSIONAL_REMOTE_SECTORS.length];
  const role = sector.roles[i % sector.roles.length];
  const loc = LOCATIONS_REMOTE_CITIES[(i + remoteCounter) % LOCATIONS_REMOTE_CITIES.length];
  
  // High percentage of remote or hybrid regional
  const isTrulyRemote = i % 3 !== 0; // ~66% remote anywhere
  const workType = i % 7 === 0 ? 'CONTRACT' : i % 11 === 0 ? 'PART_TIME' : i % 5 === 0 ? 'FIFO' : 'FULL_TIME';

  const baseMin = sector.salaryMin || 95000;
  const baseMax = sector.salaryMax || 155000;
  const salaryVariation = (i * 1750) % 35000;
  const salaryMin = baseMin + salaryVariation;
  const salaryMax = Math.max(salaryMin + 18000, baseMax + (salaryVariation / 2));

  const idNum = remoteCounter++;
  const titlePrefix = isTrulyRemote ? 'Remote' : 'Regional Specialist';
  const displayTitle = role.startsWith('Remote') ? role : `${titlePrefix} ${role}`;
  const title = `${displayTitle} — ${loc.city} (${loc.state})`;
  const slug = `${slugify(displayTitle)}-${slugify(loc.city)}-${loc.state.toLowerCase()}-${idNum}`;

  jobs.push({
    id: `job_${idNum}`,
    slug,
    title,
    sectorSlug: sector.slug,
    sectorName: sector.name,
    state: loc.state,
    cityOrSuburb: loc.city,
    postcode: loc.postcode,
    region: loc.region,
    isRemote: isTrulyRemote,
    workType,
    salaryMin: Math.round(salaryMin),
    salaryMax: Math.round(salaryMax),
    salaryPeriod: 'YEAR',
    includesSuper: true,
    status: i % 30 === 0 ? 'FILLED' : 'ACTIVE', // ~3% filled
    descriptionHtml: `<p>Exciting opportunity for a qualified <strong>${displayTitle}</strong> connected with <strong>${loc.city}, ${loc.state}</strong> (${loc.region}) in the <strong>${sector.name}</strong> sector.</p><p>${isTrulyRemote ? 'This position is 100% remote-enabled across Australia with digital collaboration tools, flexible hours, and full equipment allowances.' : 'This position services high-priority regional infrastructure and commercial clients with site allowances and relocation incentives.'}</p><p>All candidates must have confirmed Australian working rights and complete identity verification under the Australian Privacy Principles (Privacy Act 1988 Cth).</p>`,
    screeningQuestions: [
      'Do you hold unrestricted legal rights to work in Australia for this role?',
      'Do you have access to a secure, private home office or are you willing to relocate/travel to regional hubs?',
      'When can you commence duties or what notice is required with your current employer?',
    ],
  });
}

const outDir = path.resolve('src/data');
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, 'generated-au-jobs.json');
fs.writeFileSync(outFile, JSON.stringify(jobs, null, 2));
console.log(`Generated total of ${jobs.length} Australian job records (including ${TARGET_REMOTE_COUNT} new remote/regional positions) -> ${outFile}`);
