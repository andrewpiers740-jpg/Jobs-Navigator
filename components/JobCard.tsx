import Link from 'next/link';
import { Job } from '@/lib/data/jobs';
import { MapPin, DollarSign, ArrowUpRight, ShieldCheck, Bookmark, Globe2 } from 'lucide-react';
import { useSavedJobIds, toggleSaveJob } from '@/lib/store';

interface JobCardProps {
  job: Job;
  onApply: (job: Job) => void;
  onSelect?: (job: Job) => void;
}

export default function JobCard({ job, onApply, onSelect }: JobCardProps) {
  const detailUrl = `/jobs/${job.slug || job.id}/`;
  const savedJobIds = useSavedJobIds();
  const saved = savedJobIds.includes(job.id);

  const handleToggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaveJob(job.id);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 hover:border-slate-300 p-5 sm:p-6 transition-all hover:shadow-md flex flex-col justify-between group relative">
      <div>
        {/* Top Kicker: Clean unboxed metadata with separators (NO PILLS) */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-teal-800">{job.sectorName}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>{job.workType}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>{job.state}</span>
            {job.isRemote && (
              <>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="text-indigo-700 font-semibold flex items-center gap-1">
                  <Globe2 className="w-3 h-3" />
                  <span>Remote Available</span>
                </span>
              </>
            )}
          </div>

          {/* Bookmark Button (SEEK style) */}
          <button
            onClick={handleToggleBookmark}
            title={saved ? 'Remove from Saved Jobs' : 'Save Job for Later'}
            className={`p-1.5 rounded-lg border transition-colors ${
              saved
                ? 'bg-amber-50 text-amber-600 border-amber-300'
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 border-transparent'
            }`}
            aria-label="Bookmark job"
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Primary Job Title with Link */}
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
          <Link href={detailUrl} className="hover:underline">
            {job.title}
          </Link>
        </h3>

        {/* Employer & Confidential status */}
        <div className="text-xs text-slate-600 mt-1 flex items-center gap-1.5">
          <span>{job.employer}</span>
          {job.confidentialEmployer && (
            <span className="text-slate-400 italic">(Confidential via Jobs Navigator)</span>
          )}
        </div>

        {/* Key Metrics / Attributes (Clean unboxed line) */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-700">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="font-medium">{job.location}</span>
            {job.region && <span className="text-slate-400 text-[11px]">({job.region})</span>}
          </div>
          <div className="flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-bold text-slate-900">{job.salary}</span>
            <span className="text-slate-500 font-normal">({job.superannuation})</span>
          </div>
        </div>

        {/* Overview Excerpt */}
        <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
          {job.overview}
        </p>

        {/* Screening Question Teaser */}
        <div className="mt-3 p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg text-xs text-slate-700">
          <span className="font-semibold text-slate-900 block mb-0.5">Key Screening Requirement:</span>
          <span className="text-slate-600 truncate block">{job.screeningQuestion}</span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-xs text-teal-800">
          <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
          <span>Verified Right-to-Work</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={detailUrl}
            className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap"
          >
            Details
          </Link>
          <button
            onClick={() => onApply(job)}
            className="px-4 py-2 bg-[#0F2942] hover:bg-teal-700 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm flex items-center gap-1 whitespace-nowrap"
          >
            <span>Apply Now</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
