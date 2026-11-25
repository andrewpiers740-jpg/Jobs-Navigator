'use client';

import { Job } from '@/lib/data/jobs';
import { 
  X, 
  MapPin, 
  DollarSign, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowUpRight, 
  FileText, 
  Building2, 
  Clock 
} from 'lucide-react';
import Image from 'next/image';
import SalaryDistributionHistogram from './SalaryDistributionHistogram';

interface JobDetailModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (job: Job) => void;
}

export default function JobDetailModal({ job, isOpen, onClose, onApply }: JobDetailModalProps) {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#0F2942] text-white p-6 shrink-0 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-300">
              <span>{job.sectorName}</span>
              <span>·</span>
              <span>{job.workType}</span>
              <span>·</span>
              <span>{job.location}</span>
            </div>
            <button
              onClick={onClose}
              className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close details modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-2">
            {job.title}
          </h2>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-teal-400" />
              <span>{job.employer}</span>
              {job.confidentialEmployer && <span className="text-slate-400 italic">(Confidential)</span>}
            </div>
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-teal-400" />
              <span className="font-bold text-white">{job.salary}</span>
              <span className="text-slate-400">({job.superannuation})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-teal-400" />
              <span>Posted {job.postedDate}</span>
            </div>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-sm">
          {/* Hero sector photo if available */}
          {job.image && (
            <div className="relative h-48 sm:h-56 w-full rounded-xl overflow-hidden bg-slate-100">
              <Image
                src={job.image}
                alt={job.title}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs text-white font-medium bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded">
                  {job.sectorName} · Australian Standards Verified
                </span>
              </div>
            </div>
          )}

          {/* Overview */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Role Overview</h3>
            <p className="text-slate-600 leading-relaxed">{job.overview}</p>
          </div>

          {/* Screening Question Banner */}
          <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-900">
              Mandatory Screening Question
            </span>
            <p className="text-sm font-semibold text-teal-950">{job.screeningQuestion}</p>
            <p className="text-xs text-teal-700">
              Candidates will be prompted to answer this question during the verified application step.
            </p>
          </div>

          {/* D3 Salary Distribution & Market Benchmark */}
          <SalaryDistributionHistogram job={job} />

          {/* Responsibilities */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Key Responsibilities</h3>
            <ul className="space-y-2">
              {job.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-2.5 text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Required Qualifications & Experience</h3>
            <ul className="space-y-2">
              {job.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2.5 text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-2" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Remuneration & Employee Benefits</h3>
            <ul className="space-y-2">
              {job.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2.5 text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance & Right to Work Information */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs text-slate-600">
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>Right to Work & Identity Verification Notice</span>
            </div>
            <p>
              Under Australian Workplace Standards and the Migration Act 1958, all successful applicants must have valid Australian work rights (Citizen, Permanent Resident, NZ Citizen, or valid Visa). Jobs Navigator requires compulsory identity verification (Australian Driver Licence or Passport) with 90-day retention under the Australian Privacy Principles.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 shrink-0 flex items-center justify-between gap-4">
          <div className="text-xs text-slate-500 hidden sm:block">
            <span>Reference: {job.id}</span>
            <span className="mx-2">·</span>
            <span>{job.visaSponsorshipEligible ? 'Visa Sponsorship Available' : 'Australian Work Rights Required'}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2.5 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-semibold uppercase tracking-wider"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onApply(job);
              }}
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <span>Apply for this Position</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
