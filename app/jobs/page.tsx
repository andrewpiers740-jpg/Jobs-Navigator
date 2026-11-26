'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  MapPin, 
  DollarSign, 
  Briefcase, 
  ShieldCheck, 
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
  Globe2,
  Bookmark 
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
import { useSavedJobIds } from '@/lib/store';

const PAGE_SIZE = 24;

function JobsContent() {
  const searchParams = useSearchParams();

  // Initialize search states directly from URL searchParams
  const initialQ = searchParams.get('q') || '';
  const initialSector = searchParams.get('sector') || 'all';
  const initialState = searchParams.get('state') || 'ALL';
  const initialWorkType = searchParams.get('workType') || 'all';
  const initialRemote = searchParams.get('remote') === 'true';

  const [keyword, setKeyword] = useState(initialQ);
  const [selectedSector, setSelectedSector] = useState(initialSector);
  const [selectedState, setSelectedState] = useState(initialState);
  const [selectedWorkType, setSelectedWorkType] = useState(initialWorkType);
  const [remoteOnly, setRemoteOnly] = useState(initialRemote);
  const [savedOnly, setSavedOnly] = useState(false);
  const savedJobIds = useSavedJobIds();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Modals
  const [activeJobForApply, setActiveJobForApply] = useState<Job | null>(null);
  const [activeJobForDetail, setActiveJobForDetail] = useState<Job | null>(null);
  const [talentModalOpen, setTalentModalOpen] = useState(false);

  const allJobs = useMemo(() => {
    return INITIAL_JOBS;
  }, []);

  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      if (selectedSector !== 'all' && job.sectorId !== selectedSector) return false;
      if (selectedState !== 'ALL' && job.state !== selectedState) return false;
      if (selectedWorkType !== 'all' && job.workType !== selectedWorkType) return false;
      if (remoteOnly && !job.isRemote) return false;
      if (savedOnly && !savedJobIds.includes(job.id)) return false;

      if (keyword.trim()) {
        const q = keyword.toLowerCase();
        const matches =
          job.title.toLowerCase().includes(q) ||
          job.overview.toLowerCase().includes(q) ||
          job.location.toLowerCase().includes(q) ||
          (job.region && job.region.toLowerCase().includes(q)) ||
          job.sectorName.toLowerCase().includes(q) ||
          job.screeningQuestion.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    });
  }, [allJobs, keyword, selectedSector, selectedState, selectedWorkType, remoteOnly, savedOnly, savedJobIds]);

  const displayedJobs = useMemo(() => {
    return filteredJobs.slice(0, visibleCount);
  }, [filteredJobs, visibleCount]);

  const resetFilters = () => {
    setKeyword('');
    setSelectedSector('all');
    setSelectedState('ALL');
    setSelectedWorkType('all');
    setRemoteOnly(false);
    setSavedOnly(false);
    setVisibleCount(PAGE_SIZE);
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + PAGE_SIZE);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar onOpenTalentModal={() => setTalentModalOpen(true)} />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 mb-1.5">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Australian Employment Market</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Browse Australian Jobs ({allJobs.length.toLocaleString()}+ Verified Roles)
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Explore active positions across all Australian states, regional cities, and remote roles. Strictly open to Australian Citizens, Permanent Residents, and onshore residents currently living in Australia (Offshore applications not accepted).
          </p>
        </div>

        {/* Search Bar Console */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-sm mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Keyword */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                  setVisibleCount(PAGE_SIZE);
                }}
                placeholder="Search role, skill, or city (e.g. Remote, Alice Springs, Nurse, Fitter)..."
                className="w-full pl-10 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900"
              />
            </div>

            {/* Sector */}
            <div className="md:col-span-4">
              <select
                value={selectedSector}
                onChange={(e) => {
                  setSelectedSector(e.target.value);
                  setVisibleCount(PAGE_SIZE);
                }}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
              >
                <option value="all">All 12 Australian Sectors</option>
                {SITE.sectors.map((sec) => (
                  <option key={sec.id} value={sec.id}>{sec.name}</option>
                ))}
              </select>
            </div>

            {/* State (Cities in brackets completely removed!) */}
            <div className="md:col-span-3">
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setVisibleCount(PAGE_SIZE);
                }}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
              >
                {SITE.states.map((s) => (
                  <option key={s.code} value={s.code}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Secondary Filter Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              {/* Work Type */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium">Work Type:</span>
                <select
                  value={selectedWorkType}
                  onChange={(e) => {
                    setSelectedWorkType(e.target.value);
                    setVisibleCount(PAGE_SIZE);
                  }}
                  className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                >
                  <option value="all">All Types</option>
                  {SITE.workTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Remote Only Toggle */}
              <label className="flex items-center gap-1.5 cursor-pointer bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors">
                <input
                  type="checkbox"
                  checked={remoteOnly}
                  onChange={(e) => {
                    setRemoteOnly(e.target.checked);
                    setVisibleCount(PAGE_SIZE);
                  }}
                  className="text-teal-600 focus:ring-teal-500 rounded"
                />
                <Globe2 className="w-3.5 h-3.5 text-indigo-600" />
                <span className="text-slate-800 font-semibold">Remote Only</span>
              </label>

              {/* Saved Jobs Filter Toggle */}
              <label className={`flex items-center gap-1.5 cursor-pointer px-2.5 py-1.5 rounded-lg border transition-colors ${
                savedOnly ? 'bg-amber-50 border-amber-300 text-amber-900 font-semibold' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}>
                <input
                  type="checkbox"
                  checked={savedOnly}
                  onChange={(e) => {
                    setSavedOnly(e.target.checked);
                    setVisibleCount(PAGE_SIZE);
                  }}
                  className="text-amber-600 focus:ring-amber-500 rounded"
                />
                <Bookmark className="w-3.5 h-3.5 text-amber-600" />
                <span>Saved Jobs ({savedJobIds.length})</span>
              </label>

              {(keyword || selectedSector !== 'all' || selectedState !== 'ALL' || selectedWorkType !== 'all' || remoteOnly || savedOnly) && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-teal-700 hover:text-teal-900 font-semibold"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>

            {/* Total Results Count */}
            <div className="text-slate-500 font-medium">
              Showing <strong className="text-slate-900">{displayedJobs.length}</strong> of <strong className="text-slate-900">{filteredJobs.length.toLocaleString()}</strong> matching positions
            </div>
          </div>
        </div>

        {/* Job Listings Grid */}
        {filteredJobs.length > 0 ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onApply={(j) => setActiveJobForApply(j)}
                  onSelect={(j) => setActiveJobForDetail(j)}
                />
              ))}
            </div>

            {/* Load More Button */}
            {visibleCount < filteredJobs.length && (
              <div className="text-center pt-4">
                <button
                  onClick={handleLoadMore}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs uppercase tracking-wider rounded-xl border border-slate-300 shadow-sm transition-colors"
                >
                  <span>Load More Positions ({filteredJobs.length - visibleCount} remaining)</span>
                  <ChevronDown className="w-4 h-4 text-teal-600" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto space-y-4">
            <Briefcase className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">No positions match your specific criteria</h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search filters or submit your CV to our general talent pool for upcoming matches.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={resetFilters}
                className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Clear Filters
              </button>
              <button
                onClick={() => setTalentModalOpen(true)}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-semibold"
              >
                Submit General CV
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <ChatHub />
      <PrivacyBanner />

      {/* Modals */}
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

export default function JobsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-slate-500">Loading Australian job listings...</div>}>
      <JobsContent />
    </Suspense>
  );
}
