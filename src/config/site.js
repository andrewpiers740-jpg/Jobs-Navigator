/**
 * Jobs Navigator - Single Source of Truth Configuration
 * Compliant with Australian Privacy Principles (Privacy Act 1988) and Fair Work Act 2009.
 */

export const SITE = {
  name: 'Jobs Navigator',
  tagline: 'Connecting Skilled Talent With Leading Australian Employers',
  domain: 'jobsnavigator.com.au',
  url: 'https://jobsnavigator.com.au',
  email: 'info@jobsnavigator.com.au',
  phone: '0489989442',
  phoneFormatted: '0489 989 442',
  phoneIntl: '+61 489 989 442',
  whatsapp: '61489989442',
  businessLocation: '16 Copley St, Broadview SA 5083, Australia',
  abn: '18 684 623 667',
  abnRaw: '18684623667',
  abnLookupUrl: 'https://abr.business.gov.au/ABN/View?abn=18684623667',
  foundingDate: '07 May 2025',
  foundingLocation: 'Broadview, SA, Australia',
  countryOfOperation: 'Australia',
  currency: {
    code: 'AUD',
    symbol: '$',
    locale: 'en-AU'
  },
  adminPasscode: 'Bubu2011lolo@',
  
  // Theme colours
  theme: {
    primary: '#0F2942', // Deep Pacific Navy
    primaryDark: '#0A1C2E',
    accent: '#0D9488', // Teal / Opal Green
    accentHover: '#0F766E',
    gold: '#D97706',
    surface: '#F8FAFC',
    border: '#E2E8F0',
  },

  // Australian Sectors (12 standard industry groupings)
  sectors: [
    { id: 'mining-resources', name: 'Mining, Resources & Energy', icon: 'Pickaxe', count: 184, featured: true },
    { id: 'healthcare-medical', name: 'Healthcare & Medical', icon: 'Stethoscope', count: 240, featured: true },
    { id: 'trades-construction', name: 'Trades, Construction & Engineering', icon: 'HardHat', count: 310, featured: true },
    { id: 'it-digital', name: 'Information Technology & Digital', icon: 'Laptop', count: 195, featured: true },
    { id: 'transport-logistics', name: 'Transport, Logistics & Warehousing', icon: 'Truck', count: 142, featured: true },
    { id: 'accounting-finance', name: 'Accounting, Finance & Banking', icon: 'TrendingUp', count: 118, featured: true },
    { id: 'retail-hospitality', name: 'Retail, Hospitality & Tourism', icon: 'Coffee', count: 165, featured: false },
    { id: 'admin-office', name: 'Administration & Office Support', icon: 'FileText', count: 94, featured: false },
    { id: 'education-training', name: 'Education & Training', icon: 'GraduationCap', count: 112, featured: false },
    { id: 'sales-marketing', name: 'Sales, Marketing & Communications', icon: 'Megaphone', count: 88, featured: false },
    { id: 'manufacturing-agri', name: 'Manufacturing & Agribusiness', icon: 'Wheat', count: 76, featured: false },
    { id: 'legal-community', name: 'Legal, Government & Community', icon: 'Scale', count: 64, featured: false },
  ],

  // Australian States & Territories
  states: [
    { code: 'ALL', name: 'All Australia' },
    { code: 'NSW', name: 'New South Wales' },
    { code: 'VIC', name: 'Victoria' },
    { code: 'QLD', name: 'Queensland' },
    { code: 'WA', name: 'Western Australia' },
    { code: 'SA', name: 'South Australia' },
    { code: 'TAS', name: 'Tasmania' },
    { code: 'ACT', name: 'Australian Capital Territory' },
    { code: 'NT', name: 'Northern Territory' },
  ],

  // Australian Work Types
  workTypes: [
    'Full-Time',
    'Part-Time',
    'Casual',
    'Contract / Temp',
    'FIFO / DIDO',
    'Apprenticeship / Traineeship'
  ],

  // Australian Right to Work Statuses (Domestic Australian Residents Only)
  workRightsOptions: [
    { id: 'citizen', label: 'Australian Citizen', description: 'Full unrestricted Australian work rights' },
    { id: 'permanent_resident', label: 'Permanent Resident (PR)', description: 'Full unrestricted Australian permanent work rights' },
    { id: 'nz_citizen', label: 'New Zealand Citizen (SCV 444)', description: 'Currently residing in Australia with full work rights' },
    { id: 'onshore_visa', label: 'Valid Onshore Resident Visa', description: 'Currently living in Australia with existing valid work rights (No offshore applicants)' }
  ],

  // Compulsory ID Verification specifications
  idVerification: {
    compulsory: true,
    retentionDays: 90,
    acceptedTypes: [
      {
        id: 'drivers_licence',
        label: 'Australian Driver Licence',
        requiresBothSides: true,
        description: 'Both Front photo AND Back photo required'
      },
      {
        id: 'passport',
        label: 'Passport (Australian or International)',
        requiresBothSides: false,
        description: 'Main biometric photo page required'
      }
    ],
    privacyNotice: 'In accordance with the Australian Privacy Principles (Privacy Act 1988 Cth), identity documents are collected exclusively for mandatory right-to-work verification and fraud mitigation. Identity images are stored securely under encrypted 90-day retention and permanently deleted thereafter. They are never shared without your written consent.'
  },

  compliance: {
    superannuationRate: '11.5%',
    fairWorkNotice: 'All roles advertised comply with National Employment Standards (NES) and relevant Modern Awards under the Fair Work Act 2009.',
    disclaimer: 'Jobs Navigator acts as a recruitment intermediary and candidate vetting network. Submission of an application does not guarantee employment.',
    domesticPolicyNotice: 'Jobs Navigator exclusively serves Australian Citizens, Permanent Residents, and onshore residents living in Australia. Offshore international applications and visa sponsorships are strictly not supported.'
  }
};
