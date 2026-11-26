'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ArrowUpRight, 
  Globe2, 
  Users, 
  Clock, 
  Building2, 
  Sparkles,
  ChevronRight,
  HardHat,
  Stethoscope,
  Pickaxe,
  Laptop,
  Truck,
  TrendingUp,
  FileCheck
} from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatHub from '@/components/ChatHub';
import PrivacyBanner from '@/components/PrivacyBanner';
import JobCard from '@/components/JobCard';
import ApplyModal from '@/components/ApplyModal';
import JobDetailModal from '@/components/JobDetailModal';
import GeneralTalentModal from '@/components/GeneralTalentModal';

import { SITE } from '@/src/config/site';
import { Job, INITIAL_JOBS } from '@/lib/data/jobs';

export default function HomePage() {
  const [keyword, setKeyword] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedCategoryTab, setSelectedCategoryTab] = useState('all');

  // Modal states
  const [activeJobForApply, setActiveJobForApply] = useState<Job | null>(null);
  const [activeJobForDetail, setActiveJobForDetail] = useState<Job | null>(null);
  const [talentModalOpen, setTalentModalOpen] = useState(false);

  // Email Alert state
  const [alertEmail, setAlertEmail] = useState('');
  const [alertSuccess, setAlertSuccess] = useState(false);

  // Available jobs (initial fallback or stored)
  const allJobs = useMemo(() => {
    return INITIAL_JOBS;
  }, []);

  // Filtered jobs for featured section
  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      // Tab filter
      if (selectedCategoryTab === 'fifo' && job.workType !== 'FIFO / DIDO') return false;
      if (selectedCategoryTab === 'health' && job.sectorId !== 'healthcare-medical') return false;
      if (selectedCategoryTab === 'trades' && job.sectorId !== 'trades-construction') return false;
      if (selectedCategoryTab === 'tech' && job.sectorId !== 'it-digital') return false;
      if (selectedCategoryTab === 'remote' && !job.isRemote) return false;

      // Dropdown filters
      if (selectedSector !== 'all' && job.sectorId !== selectedSector) return false;
      if (selectedState !== 'ALL' && job.state !== selectedState) return false;

      // Keyword search
      if (keyword.trim()) {
        const q = keyword.toLowerCase();
        return (
          job.title.toLowerCase().includes(q) ||
          job.overview.toLowerCase().includes(q) ||
          job.location.toLowerCase().includes(q) ||
          job.sectorName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [allJobs, selectedCategoryTab, selectedSector, selectedState, keyword]);

  const handleSubscribeAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertEmail.includes('@')) return;
    setAlertSuccess(true);
    setTimeout(() => setAlertSuccess(false), 5000);
    setAlertEmail('');
  };

  const sectorIcons: Record<string, any> = {
    'mining-resources': Pickaxe,
    'healthcare-medical': Stethoscope,
    'trades-construction': HardHat,
    'it-digital': Laptop,
    'transport-logistics': Truck,
    'accounting-finance': TrendingUp,
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Top Navigation */}
      <Navbar onOpenTalentModal={() => setTalentModalOpen(true)} />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative bg-[#0F2942] text-white overflow-hidden border-b border-[#1E3A5F]">
          {/* Subtle background overlay */}
          <div className="absolute inset-0 z-0 opacity-15">
            <Image
              src="/images/hero_workforce.jpg"
              alt="Australian Workforce"
              fill
              priority
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 lg:pt-20 lg:pb-24">
            <div className="max-w-3xl">
              {/* Quiet kicker */}
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-400 mb-3">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>Verified Right-to-Work National Job Board</span>
                <span className="text-slate-400">·</span>
                <span>Australia Wide</span>
              </div>

              {/* Single H1 per page rule */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Connecting Skilled Talent With Leading Australian Employers
              </h1>

              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Discover high-paying permanent, contract, and FIFO opportunities across all 8 Australian States & Territories. Direct candidate matching, verified Australian right-to-work screening, and 90-day privacy compliance.
              </p>
            </div>

            {/* SEARCH & FILTER CONSOLE */}
            <div className="mt-8 bg-white rounded-2xl shadow-xl p-3 sm:p-4 text-slate-900 border border-slate-200/80 max-w-5xl">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                {/* Keyword search input */}
                <div className="md:col-span-4 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Job title, trade, or skill keyword..."
                    className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                {/* Sector dropdown */}
                <div className="md:col-span-3">
                  <select
                    value={selectedSector}
                    onChange={(e) => setSelectedSector(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
                  >
                    <option value="all">All 12 Australian Sectors</option>
                    {SITE.sectors.map((sec) => (
                      <option key={sec.id} value={sec.id}>{sec.name}</option>
                    ))}
                  </select>
                </div>

                {/* State dropdown */}
                <div className="md:col-span-3">
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
                  >
                    {SITE.states.map((s) => (
                      <option key={s.code} value={s.code}>{s.name}</option>
                    ))}
                  </select>
                </div>

                {/* CTA Action button */}
                <div className="md:col-span-2">
                  <Link
                    href={`/jobs?q=${encodeURIComponent(keyword)}&sector=${selectedSector}&state=${selectedState}`}
                    className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-sm transition-colors text-center flex items-center justify-center gap-1.5"
                  >
                    <span>Search Jobs</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Quick filter shortcut tags */}
              <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Popular Inquiries:</span>
                <button
                  onClick={() => { setKeyword('FIFO'); setSelectedSector('mining-resources'); }}
                  className="hover:text-teal-700 underline underline-offset-2"
                >
                  FIFO Mining Pilbara
                </button>
                <span>·</span>
                <button
                  onClick={() => { setKeyword('Registered Nurse'); setSelectedSector('healthcare-medical'); }}
                  className="hover:text-teal-700 underline underline-offset-2"
                >
                  AHPRA Registered Nurses
                </button>
                <span>·</span>
                <button
                  onClick={() => { setKeyword('Electrician'); setSelectedSector('trades-construction'); }}
                  className="hover:text-teal-700 underline underline-offset-2"
                >
                  Commercial Electricians Sydney
                </button>
                <span>·</span>
                <button
                  onClick={() => { setKeyword('Software'); setSelectedSector('it-digital'); }}
                  className="hover:text-teal-700 underline underline-offset-2"
                >
                  Next.js Software Engineers
                </button>
              </div>
            </div>

            {/* CLAIM-TO-PROOF ADJACENCY STATS STRIP */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-700/60 text-slate-200">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">2,200+</p>
                <p className="text-xs text-slate-400 mt-0.5">Verified Australian Roles</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-teal-400 font-mono tabular-nums">100%</p>
                <p className="text-xs text-slate-400 mt-0.5">ID & Right-to-Work Screened</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">48 Hrs</p>
                <p className="text-xs text-slate-400 mt-0.5">Average Employer Match Time</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">8 States</p>
                <p className="text-xs text-slate-400 mt-0.5">National & Regional Footprint</p>
              </div>
            </div>
          </div>
        </section>

        {/* AUSTRALIAN SECTOR EXPLORER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">Explore by Industry</span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
                Australia&apos;s High-Demand Employment Sectors
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-xl">
                Browse positions matched against current Australian skills priority lists and Modern Award frameworks.
              </p>
            </div>
            <Link
              href="/sectors"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-teal-700 hover:text-teal-900 transition-colors shrink-0"
            >
              <span>View All 12 Sectors</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Sectors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SITE.sectors.slice(0, 6).map((sector) => {
              const Icon = sectorIcons[sector.id] || Briefcase;
              return (
                <Link
                  key={sector.id}
                  href={`/jobs?sector=${sector.id}`}
                  className="bg-white rounded-xl border border-slate-200/90 hover:border-teal-500/60 p-5 transition-all hover:shadow-md flex items-start justify-between group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                        {sector.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        {sector.count} Active Opportunities Listed
                      </p>
                      <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-teal-700 group-hover:translate-x-1 transition-transform">
                        <span>Browse sector</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* FEATURED JOBS SECTION WITH SEGMENTED TABS */}
        <section className="bg-slate-100/70 py-14 lg:py-20 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">Immediate Openings</span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
                  Featured Opportunities
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Direct employer listings with verified remuneration (+ 11.5% Superannuation).
                </p>
              </div>

              {/* Functional Segmented Tabs (Interactive Buttons) */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl">
                {[
                  { id: 'all', label: 'All Jobs' },
                  { id: 'remote', label: '100% Remote' },
                  { id: 'fifo', label: 'Mining / FIFO' },
                  { id: 'health', label: 'Healthcare' },
                  { id: 'trades', label: 'Trades & Construction' },
                  { id: 'tech', label: 'IT & Digital' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategoryTab(tab.id)}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                      selectedCategoryTab === tab.id
                        ? 'bg-white text-slate-900 shadow-sm font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Job Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.slice(0, 6).map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onApply={(j) => setActiveJobForApply(j)}
                  onSelect={(j) => setActiveJobForDetail(j)}
                />
              ))}
            </div>

            {/* View More Button */}
            <div className="mt-10 text-center">
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F2942] hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow-sm transition-colors"
              >
                <span>Browse All Available Roles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* AUSTRALIAN CITIZENS & LOCAL RESIDENTS TALENT PRIORITY */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20">
          <div className="bg-[#0F2942] rounded-2xl text-white p-8 sm:p-12 relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-400">
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  <span>Domestic Australian Talent Commitment</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  Dedicated Exclusively to Australians & Onshore Residents
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Jobs Navigator is dedicated strictly to Australian Citizens, Permanent Residents, and onshore individuals currently living in Australia with verified existing work rights. We do not provide international visa sponsorships or accept applications from overseas, ensuring Australian employers connect only with immediately available, work-ready domestic talent.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setTalentModalOpen(true)}
                    className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                  >
                    Join Australian Talent Pool
                  </button>
                  <Link
                    href="/jobs"
                    className="px-5 py-2.5 border border-slate-500 hover:border-white text-slate-200 hover:text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Browse All Domestic Roles
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#0A1C2E] p-6 rounded-xl border border-slate-700/80 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">
                  Strict Domestic Eligibility Rules
                </h4>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <strong>Australian Citizens & Permanent Residents:</strong> Unrestricted priority matching across all 8 States and Territories.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <strong>Currently Residing in Australia:</strong> All applicants must already live in Australia with active local residency.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <strong>Zero Offshore / Foreign Applicants:</strong> We do not facilitate international visa sponsorships. Unverified overseas applications are automatically filtered out.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 4-STEP VERIFICATION PROCESS */}
        <section className="bg-white py-14 lg:py-20 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">How It Works</span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
                The Jobs Navigator Verification Standard
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                We combine direct digital applications with rigorous Australian identity screening under the Privacy Act 1988.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: '01',
                  title: 'Select Role & Answer Screening',
                  desc: 'Browse verified Australian positions and answer role-specific qualification questions directly on-site.'
                },
                {
                  step: '02',
                  title: 'Compulsory ID Check',
                  desc: 'Upload your CV plus Driver Licence (both front & back) or Passport photo page for right-to-work verification.'
                },
                {
                  step: '03',
                  title: '90-Day Encrypted Storage',
                  desc: 'All candidate identity files are stored in strict compliance with Australian Privacy Principles and purged after 90 days.'
                },
                {
                  step: '04',
                  title: 'Direct Employer Interview',
                  desc: 'Vetted candidates bypass resume queues and connect directly with hiring managers across Australia.'
                }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-xl border border-slate-200/90 bg-slate-50/50 space-y-3">
                  <span className="font-mono text-2xl font-bold text-teal-700">{item.step}</span>
                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EMPLOYER HIRING BANNER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20">
          <div className="border border-slate-200 bg-white rounded-2xl p-8 sm:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">For Australian Employers</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Need Pre-Screened, Work-Ready Talent in Australia?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Skip the deluge of unqualified applicants. Jobs Navigator delivers pre-screened Australian trades, engineering, healthcare, and corporate professionals with verified right-to-work status in under 48 hours.
              </p>
            </div>
            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <Link
                href="/employers"
                className="px-6 py-3 bg-[#0F2942] hover:bg-[#0A1C2E] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm text-center"
              >
                Post Vacancy / Request Talent
              </Link>
              <a
                href={`tel:${SITE.phone}`}
                className="px-5 py-3 border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors text-center"
              >
                Call {SITE.phoneFormatted}
              </a>
            </div>
          </div>
        </section>

        {/* EMAIL JOB ALERTS STRIP */}
        <section className="bg-slate-100 py-12 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Never Miss A High-Paying Australian Opportunity
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
              Subscribe to verified Australian job alerts tailored to your industry. No spam, unsubscribe anytime.
            </p>

            <form onSubmit={handleSubscribeAlert} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
              <input
                type="email"
                required
                value={alertEmail}
                onChange={(e) => setAlertEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-grow px-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors shrink-0"
              >
                Get Job Alerts
              </button>
            </form>

            {alertSuccess && (
              <p className="text-xs font-semibold text-teal-800 animate-in fade-in">
                ✓ You have successfully subscribed to Australian Job Alerts!
              </p>
            )}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />

      {/* FLOATING CHAT HUB & PRIVACY BANNER */}
      <ChatHub />
      <PrivacyBanner />

      {/* MODALS */}
      <ApplyModal
        job={activeJobForApply}
        isOpen={Boolean(activeJobForApply)}
        onClose={() => setActiveJobForApply(null)}
      />

      <JobDetailModal
        job={activeJobForDetail}
        isOpen={Boolean(activeJobForDetail)}
        onClose={() => setActiveJobForDetail(null)}
        onApply={(job) => {
          setActiveJobForDetail(null);
          setActiveJobForApply(job);
        }}
      />

      <GeneralTalentModal
        isOpen={talentModalOpen}
        onClose={() => setTalentModalOpen(false)}
      />
    </div>
  );
}
