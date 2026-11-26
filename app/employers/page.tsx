'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  Users, 
  Clock, 
  FileCheck, 
  Phone, 
  Mail, 
  ArrowRight, 
  AlertCircle,
  EyeOff,
  HelpCircle,
  DollarSign,
  UserCheck,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Lock,
  Sparkles
} from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatHub from '@/components/ChatHub';
import PrivacyBanner from '@/components/PrivacyBanner';
import GeneralTalentModal from '@/components/GeneralTalentModal';

import { SITE } from '@/src/config/site';
import { saveEmployerInquiry } from '@/lib/store';
import { EmployerInquiry } from '@/lib/data/jobs';

interface EmployerFaqItem {
  id: string;
  category: 'screening' | 'privacy' | 'fees';
  categoryLabel: string;
  question: string;
  answer: string;
  highlights?: string[];
}

const EMPLOYER_FAQS: EmployerFaqItem[] = [
  {
    id: 'screening-process',
    category: 'screening',
    categoryLabel: 'Candidate Screening',
    question: 'How does Jobs Navigator screen candidate work rights and prevent unqualified applications?',
    answer: 'Unlike generic open job boards where hundreds of unvetted applicants apply without verified work rights, Jobs Navigator enforces a mandatory four-tier vetting gate before any candidate file reaches your desk:',
    highlights: [
      'Statutory Work Rights Declaration: Candidates specify whether they are an Australian Citizen, Permanent Resident, New Zealand Citizen (SCV 444), or active onshore resident visa holder currently living in Australia. Offshore applications are strictly barred.',
      'Compulsory ID Document Upload: Applicants must provide an Australian Driver Licence (both front & back) or biometric Passport photo page. Incomplete profiles cannot submit.',
      'Sector-Specific Screening Questions: Candidates must answer your mandatory qualification questions (e.g. Cert III Mobile Plant Technology, AHPRA medical license, White Card, High Risk tickets).',
      'Pre-Interview VEVO Verification: For onshore visa holders, our team confirms work rights, hour limits, and visa validity via the Department of Home Affairs VEVO system before referral.'
    ]
  },
  {
    id: 'offshore-visas-policy',
    category: 'screening',
    categoryLabel: 'Candidate Screening',
    question: 'Do you accept offshore applications or require employers to sponsor international visas?',
    answer: 'No. Jobs Navigator strictly focuses on domestic Australian talent. Every candidate must currently reside in Australia with existing lawful work rights (Citizens, Permanent Residents, NZ Citizens, or onshore visa holders). We do not accept applications from candidates living overseas and do not facilitate international employer sponsorships, ensuring zero visa processing delays or offshore risks for your business.'
  },
  {
    id: 'turnaround-time',
    category: 'screening',
    categoryLabel: 'Candidate Screening',
    question: 'What is the typical turnaround time to receive vetted candidate shortlists?',
    answer: 'For standard roles across trades, healthcare, IT, corporate, and logistics, you will receive your first batch of pre-screened, ID-verified candidates within 24 to 48 business hours. If your vacancy is marked with the "Urgent Staffing Need" flag (such as emergency mine shutdowns in WA/QLD or critical clinical shift cover), our Adelaide talent matching desk prioritizes active talent pool matching within 12 to 24 hours.'
  },
  {
    id: 'fifo-regional-sourcing',
    category: 'screening',
    categoryLabel: 'Candidate Screening',
    question: 'Can you source and screen candidates for remote, regional, or FIFO mining rosters?',
    answer: 'Yes. A substantial portion of our talent network specializes in regional and remote operations throughout Western Australia (Pilbara, Kalgoorlie, Goldfields), Queensland (Bowen Basin, Mount Isa), and South Australia (Roxby Downs, Whyalla, Olympic Dam). We screen specifically for roster compatibility (e.g. 2:1, 8:6, or DIDO residential), valid High Risk Work licences, underground/surface inductions, and readiness to pass pre-employment Category 1–3 Rail/Mining medicals and drug/alcohol screens.'
  },
  {
    id: 'privacy-retention',
    category: 'privacy',
    categoryLabel: 'Privacy Compliance',
    question: 'How is candidate identity documentation handled under the Australian Privacy Principles (Privacy Act 1988)?',
    answer: 'Jobs Navigator operates under an automated 90-Day Identity Document Retention Schedule strictly adhering to Australian Privacy Principle 11 (Security of personal information) and the Privacy Act 1988 (Cth):',
    highlights: [
      'Encrypted Storage: All uploaded driver licences and passports are encrypted using AES-256 protocols and stored on isolated secure servers.',
      'Automated 90-Day Purge: Personal identity verification files are automatically and permanently deleted after 90 calendar days unless a candidate is placed in an active ongoing engagement.',
      'Restricted Access: Identity files are accessible solely to accredited compliance staff and are never indexed, crawled by search engines, or distributed to third-party marketing brokers.',
      'Candidate Consent: Full unmasked identity documentation is only released to your direct HR/compliance onboarding team once mutual interview interest has been established.'
    ]
  },
  {
    id: 'confidential-hiring',
    category: 'privacy',
    categoryLabel: 'Privacy Compliance',
    question: 'How do you protect our company’s confidentiality if we do not want competitors or current staff to know we are hiring?',
    answer: 'We provide a 100% Confidential Employer Listing option at no additional charge. When selected on your intake form, public advertisements are published under "Jobs Navigator (Confidential Partner)", masking your company name, exact facility address, and internal identifiers. Only candidates who have successfully passed our screening checks and signed mutual non-disclosure acknowledgments are informed of your company identity.'
  },
  {
    id: 'service-fees',
    category: 'fees',
    categoryLabel: 'Service Fees & Commercials',
    question: 'What are the recruitment and vacancy listing fees for Australian employers?',
    answer: 'We operate with full commercial transparency and zero hidden overheads. Depending on your hiring volume and requirements, we provide three flexible options:',
    highlights: [
      'Standard Vacancy Lodgement ($0 Upfront): Free to lodge a vacancy, receive initial applications, and test market appetite.',
      'Featured 30-Day Listing & Talent Broadcast ($149 + GST): Priority placement at the top of sector search results, featured badge on listing cards, and automated job alerts sent to active candidates matching your trade.',
      'Success-Only Talent Placement: For end-to-end headhunting, credential verification, and interview coordination, our success fee is a competitive fixed percentage of first-year base salary, payable strictly upon candidate commencement.',
      'Enterprise & Volume Staffing: Discounted retained or subscription rates available for multi-hire FIFO campaigns, new healthcare facility rollouts, or seasonal agribusiness intakes.'
    ]
  },
  {
    id: 'replacement-guarantee',
    category: 'fees',
    categoryLabel: 'Service Fees & Commercials',
    question: 'Do you offer a replacement guarantee if a placed candidate does not work out?',
    answer: 'Yes. All candidate placements made through our dedicated recruitment service include an industry-standard 90-Day Replacement Guarantee. In the unlikely event that a placed candidate departs or fails probation within their first 90 calendar days, Jobs Navigator will source and vet a qualified replacement at zero additional fee.'
  },
  {
    id: 'candidate-charges-prohibition',
    category: 'fees',
    categoryLabel: 'Service Fees & Commercials',
    question: 'Are job seekers charged any fees to apply for our vacancies?',
    answer: 'Absolutely not. Under the Fair Work Act 2009 and Australian employment standards, charging candidates fees for employment matching or application submission is strictly prohibited. Jobs Navigator is 100% free for all job seekers. All operating costs are funded by employer hiring services.'
  }
];

export default function EmployersPage() {
  const [talentModalOpen, setTalentModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<EmployerInquiry | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // FAQ state
  const [activeFaqCategory, setActiveFaqCategory] = useState<'all' | 'screening' | 'privacy' | 'fees'>('all');
  const [openFaqId, setOpenFaqId] = useState<string | null>('screening-process');

  const filteredFaqs = useMemo(() => {
    if (activeFaqCategory === 'all') return EMPLOYER_FAQS;
    return EMPLOYER_FAQS.filter(f => f.category === activeFaqCategory);
  }, [activeFaqCategory]);

  const toggleFaq = (id: string) => {
    setOpenFaqId(prev => (prev === id ? null : id));
  };

  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    location: '',
    sector: 'Mining, Resources & Energy',
    roleTitle: '',
    workType: 'Full-Time',
    estimatedSalary: '$120,000 - $140,000 + Super',
    candidateVolume: '1-2 Candidates',
    requirements: '',
    isConfidential: true,
    urgent: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.companyName.trim() || !formData.contactName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg('Please complete company name, contact person, email, and phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/employers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      const inqId = data.inquiryId || `EMP-${Date.now().toString().slice(-6)}`;

      const newInquiry: EmployerInquiry = {
        id: inqId,
        companyName: formData.companyName,
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        location: formData.location || 'Australia Wide',
        sector: formData.sector,
        roleTitle: formData.roleTitle || 'Skilled Professional',
        workType: formData.workType,
        estimatedSalary: formData.estimatedSalary,
        candidateVolume: formData.candidateVolume,
        requirements: formData.requirements,
        urgent: formData.urgent,
        status: 'New',
        submittedAt: new Date().toISOString(),
      };

      saveEmployerInquiry(newInquiry);
      setSubmittedInquiry(newInquiry);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error lodging employer request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar onOpenTalentModal={() => setTalentModalOpen(true)} />

      <main className="flex-grow">
        {/* HERO BANNER */}
        <section className="bg-[#0F2942] text-white py-14 sm:py-20 border-b border-[#1E3A5F]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-400">
                <Building2 className="w-4 h-4 text-teal-400" />
                <span>Australian Employer & Talent Acquisition Services</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Hire Pre-Screened, Identity-Verified Australian Talent
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                Eliminate unverified resumes and unqualified applicant queues. Jobs Navigator delivers vetted candidates with confirmed Australian work rights and compulsory ID verification in under 48 hours.
              </p>
            </div>
          </div>
        </section>

        {/* VALUE PROPOSITION GRID */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Compulsory Identity & Right-to-Work</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Every applicant uploads verified identity documentation (Australian Driver Licence front & back, or Passport) with explicit 90-day retention consent under the Privacy Act 1988.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">48-Hour Shortlist Delivery</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Whether filling urgent FIFO mining shutdowns in Western Australia or clinical aged care shifts in Melbourne, receive pre-screened candidate files ready for immediate interview.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                <EyeOff className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Confidential Employer Listings</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Protect sensitive business changes, leadership transitions, or remote project expansions with our confidential employer listings option. Only shortlisted candidates learn your company name.
              </p>
            </div>
          </div>
        </section>

        {/* EMPLOYER INTAKE FORM */}
        <section id="intake-form" className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="bg-[#0A1C2E] text-white p-6 sm:p-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">Employer Intake Portal</span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
                Lodge a Vacancy or Talent Request
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Tell us about your staffing requirements. An Australian talent consultant will review your needs and connect within 24 hours.
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-700/60 text-xs text-slate-300">
                <span className="text-teal-400 font-semibold">Registered Australian Intermediary:</span>
                <span>ABN</span>
                <a
                  href={SITE.abnLookupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-teal-300 font-bold underline decoration-teal-400/50 underline-offset-2"
                >
                  {SITE.abn}
                </a>
                <span className="text-slate-400 text-[11px]">(Verified on Australian Business Register)</span>
              </div>
            </div>

            {submittedInquiry ? (
              <div className="p-8 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Employer Intake Received</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Thank you, <strong>{submittedInquiry.contactName}</strong> from <strong>{submittedInquiry.companyName}</strong>. Your talent request has been logged with reference:
                  </p>
                  <div className="mt-3 inline-block px-4 py-2 bg-slate-100 border border-slate-300 rounded-lg font-mono text-base font-bold text-slate-900">
                    {submittedInquiry.id}
                  </div>
                </div>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                  Our Adelaide operations centre has assigned your request to our <strong>{submittedInquiry.sector}</strong> specialist. We will contact you at <strong>{submittedInquiry.email}</strong> or <strong>{submittedInquiry.phone}</strong>.
                </p>
                <div className="pt-3">
                  <button
                    onClick={() => setSubmittedInquiry(null)}
                    className="px-6 py-2.5 bg-[#0F2942] text-white text-xs font-semibold uppercase tracking-wider rounded-lg"
                  >
                    Lodge Another Vacancy
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
                {errorMsg && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2 text-xs text-rose-700">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Company Details */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-2 border-b border-slate-100 mb-4">
                    1. Company & Contact Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Organization Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="e.g. Apex Mining Services Pty Ltd"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Hiring Manager / Contact Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        placeholder="e.g. David Sterling"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Corporate Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com.au"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Direct Phone / Mobile *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="0489 989 442"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Role Details */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-2 border-b border-slate-100 mb-4">
                    2. Role & Staffing Specifications
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Role Title / Trade Description</label>
                      <input
                        type="text"
                        value={formData.roleTitle}
                        onChange={(e) => setFormData({ ...formData, roleTitle: e.target.value })}
                        placeholder="e.g. Heavy Diesel Fitter or Registered Nurse"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Industry Sector</label>
                      <select
                        value={formData.sector}
                        onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        {SITE.sectors.map((s) => (
                          <option key={s.id} value={s.name}>{s.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Work Type</label>
                      <select
                        value={formData.workType}
                        onChange={(e) => setFormData({ ...formData, workType: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        {SITE.workTypes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Indicative Salary Package (+ Super)</label>
                      <input
                        type="text"
                        value={formData.estimatedSalary}
                        onChange={(e) => setFormData({ ...formData, estimatedSalary: e.target.value })}
                        placeholder="e.g. $140,000 - $165,000 + Super"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Key Qualifications, Screening Criteria, or Tickets Required
                    </label>
                    <textarea
                      rows={3}
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      placeholder="e.g. Cert III Mobile Plant Technology, current AHPRA registration, High Risk licence, or specific software experience..."
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                {/* Options */}
                <div className="pt-2 space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isConfidential}
                      onChange={(e) => setFormData({ ...formData, isConfidential: e.target.checked })}
                      className="text-teal-600 focus:ring-teal-500 rounded"
                    />
                    <span className="text-xs text-slate-700 font-medium">
                      Keep Employer Name Confidential on public advertisement
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.urgent}
                      onChange={(e) => setFormData({ ...formData, urgent: e.target.checked })}
                      className="text-teal-600 focus:ring-teal-500 rounded"
                    />
                    <span className="text-xs text-slate-700 font-medium text-rose-700">
                      Urgent Staffing Need (requires expedited 24-48hr talent matching)
                    </span>
                  </label>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    Prefer direct contact? Call <strong className="text-slate-900">{SITE.phoneFormatted}</strong>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm transition-colors"
                  >
                    {isSubmitting ? 'Lodging Vacancy...' : 'Submit Vacancy for Matching'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* EMPLOYER FREQUENTLY ASKED QUESTIONS SECTION */}
        <section id="employer-faqs" className="max-w-5xl mx-auto px-4 sm:px-6 py-14 lg:py-20 border-t border-slate-200">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
              <span>Employer Intelligence & Advisory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Employer Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Transparent answers regarding our compulsory candidate vetting process, strict Australian Privacy Principles compliance, and commercial fee structures.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            <button
              type="button"
              onClick={() => setActiveFaqCategory('all')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                activeFaqCategory === 'all'
                  ? 'bg-[#0F2942] text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
              }`}
            >
              All Questions ({EMPLOYER_FAQS.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveFaqCategory('screening')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                activeFaqCategory === 'screening'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Candidate Screening (3)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveFaqCategory('privacy')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                activeFaqCategory === 'privacy'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Privacy & Compliance (2)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveFaqCategory('fees')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                activeFaqCategory === 'fees'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Fees & Commercials (3)</span>
            </button>
          </div>

          {/* Accordion Questions List */}
          <div className="space-y-4">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                    isOpen
                      ? 'border-teal-500/80 shadow-md ring-1 ring-teal-500/20'
                      : 'border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 select-none"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          faq.category === 'screening' 
                            ? 'bg-blue-50 text-blue-700'
                            : faq.category === 'privacy'
                            ? 'bg-amber-50 text-amber-800'
                            : 'bg-emerald-50 text-emerald-800'
                        }`}>
                          {faq.categoryLabel}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 pt-1">
                        {faq.question}
                      </h3>
                    </div>
                    <div className={`p-2 rounded-xl shrink-0 transition-colors ${
                      isOpen ? 'bg-teal-50 text-teal-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100 space-y-3">
                      <p>{faq.answer}</p>
                      {faq.highlights && faq.highlights.length > 0 && (
                        <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2 mt-2">
                          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                            Key Operational Standards:
                          </span>
                          <ul className="space-y-2 text-xs text-slate-700">
                            {faq.highlights.map((h, hIdx) => (
                              <li key={hIdx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Employer Helpdesk & Direct Consultation Box */}
          <div className="mt-12 bg-gradient-to-br from-[#0F2942] to-[#0A1C2E] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md border border-[#1E3A5F]">
            <div className="space-y-2 max-w-xl text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-teal-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Dedicated Australian Account Manager</span>
              </div>
              <h4 className="text-xl font-bold text-white">Have a Bespoke Staffing Requirement?</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Whether organizing batch FIFO flight-ready crews, enterprise healthcare rosters, or executive engineering searches, speak directly with our senior talent acquisition team in Adelaide.
              </p>
              <div className="pt-1 text-xs text-slate-400">
                Registered Australian Intermediary:{' '}
                <a
                  href={SITE.abnLookupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-300 font-semibold underline underline-offset-2"
                >
                  ABN {SITE.abn}
                </a>{' '}
                (ABR Verified)
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a
                href={`tel:${SITE.phone}`}
                className="px-5 py-3 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm text-center flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call {SITE.phoneFormatted}</span>
              </a>
              <a
                href={`mailto:${SITE.email}?subject=Employer Staffing Enquiry - Custom Proposal`}
                className="px-5 py-3 bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors text-center flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Email Talent Desk</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ChatHub />
      <PrivacyBanner />

      <GeneralTalentModal
        isOpen={talentModalOpen}
        onClose={() => setTalentModalOpen(false)}
      />
    </div>
  );
}
