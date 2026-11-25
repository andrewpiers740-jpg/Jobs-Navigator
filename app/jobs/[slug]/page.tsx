import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  MapPin, 
  DollarSign, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  Building2, 
  Clock, 
  Share2, 
  AlertCircle 
} from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatHub from '@/components/ChatHub';
import PrivacyBanner from '@/components/PrivacyBanner';
import { getJobBySlug, INITIAL_JOBS, Job } from '@/lib/data/jobs';
import { SITE } from '@/src/config/site';
import ClientJobApplyWrapper from './ClientJobApplyWrapper';
import SalaryDistributionHistogram from '@/components/SalaryDistributionHistogram';

interface JobPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: JobPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    return {
      title: 'Job Not Found | Jobs Navigator',
      description: 'The requested Australian job listing is no longer available.',
    };
  }

  return {
    title: `${job.title} | Jobs Navigator Australia`,
    description: `Apply for ${job.title} in ${job.location}. Salary: ${job.salary} (${job.superannuation}). Verified Australian right-to-work and candidate matching.`,
    alternates: {
      canonical: `/jobs/${job.slug || job.id}/`,
    },
    openGraph: {
      title: `${job.title} | Jobs Navigator`,
      description: `Apply now for ${job.title} in ${job.location}. Certified remuneration ${job.salary}.`,
      type: 'article',
    },
  };
}

export default async function JobDetailPage({ params }: JobPageProps) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  // Schema.org JobPosting JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.overview,
    datePosted: '2026-11-20',
    validThrough: '2027-02-20',
    employmentType: job.workType === 'Full-Time' ? 'FULL_TIME' : job.workType === 'Part-Time' ? 'PART_TIME' : job.workType === 'Casual' ? 'OTHER' : 'CONTRACTOR',
    hiringOrganization: {
      '@type': 'Organization',
      name: job.confidentialEmployer ? 'Jobs Navigator (Confidential Employer)' : job.employer,
      sameAs: 'https://jobsnavigator.com.au',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.cityOrSuburb || 'Sydney',
        addressRegion: job.state,
        postalCode: job.postcode || '2000',
        addressCountry: 'AU',
      },
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'AUD',
      value: {
        '@type': 'QuantitativeValue',
        minValue: job.salaryMin || 85000,
        maxValue: job.salaryMax || 110000,
        unitText: job.salaryPeriod || 'YEAR',
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
        {/* Breadcrumb / Back Link */}
        <div className="mb-6">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-teal-700 hover:text-teal-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Jobs ({INITIAL_JOBS.length.toLocaleString()}+ Roles)</span>
          </Link>
        </div>

        {/* Status notice if filled */}
        {job.status === 'FILLED' && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-xs text-amber-900">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-sm">Position Filled (Archived Listing)</strong>
              <span>
                This position has successfully been filled. However, similar opportunities are constantly opening across {job.sectorName}. You can still register your profile with our talent pool below.
              </span>
            </div>
          </div>
        )}

        {/* Job Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-teal-800">{job.sectorName}</span>
            <span>·</span>
            <span>{job.workType}</span>
            <span>·</span>
            <span>{job.location}</span>
            <span>·</span>
            <span className="text-slate-400">Ref: {job.id}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {job.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-slate-700">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-teal-600" />
              <span className="font-medium">{job.employer}</span>
              {job.confidentialEmployer && <span className="text-slate-400 italic">(Confidential)</span>}
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-teal-600" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span className="font-bold text-slate-900">{job.salary}</span>
              <span className="text-slate-500 font-normal">({job.superannuation})</span>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Body */}
          <div className="lg:col-span-8 space-y-8">
            {/* Overview */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Role Description & Overview
              </h2>
              <div 
                className="text-sm text-slate-700 leading-relaxed space-y-3"
                dangerouslySetInnerHTML={{ __html: job.descriptionHtml || `<p>${job.overview}</p>` }}
              />
            </div>

            {/* Mandatory Screening Question Banner */}
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-6 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-900">
                Mandatory Candidate Screening Requirement
              </span>
              <p className="text-sm font-semibold text-teal-950">
                {job.screeningQuestion}
              </p>
              <p className="text-xs text-teal-800 leading-relaxed">
                Candidates must answer this screening question and upload compulsory right-to-work verification (Driver Licence front & back OR Passport) during the online application.
              </p>
            </div>

            {/* D3 Salary Distribution & Market Benchmark */}
            <SalaryDistributionHistogram job={job} />

            {/* Responsibilities */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Key Responsibilities
              </h2>
              <ul className="space-y-2.5 text-sm text-slate-700">
                {job.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Required Qualifications & Australian Work Rights
              </h2>
              <ul className="space-y-2.5 text-sm text-slate-700">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-2" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Statutory Compliance Notice */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Australian Privacy Principles & 90-Day Retention Notice</span>
              </div>
              <p>
                In compliance with the <em>Privacy Act 1988 (Cth)</em> and National Employment Standards, all uploaded identity verification images are encrypted, retained for 90 days, and automatically deleted. We never disclose documents without mutual interview agreement.
              </p>
            </div>
          </div>

          {/* Sidebar Action Widget (Client Component with Apply Modal) */}
          <div className="lg:col-span-4">
            <ClientJobApplyWrapper job={job} />
          </div>
        </div>
      </main>

      <Footer />
      <ChatHub />
      <PrivacyBanner />
    </div>
  );
}
