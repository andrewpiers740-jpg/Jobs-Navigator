'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Compass, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  Users, 
  Globe2, 
  ArrowRight,
  Award,
  Building2,
  ExternalLink
} from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatHub from '@/components/ChatHub';
import PrivacyBanner from '@/components/PrivacyBanner';
import GeneralTalentModal from '@/components/GeneralTalentModal';

import { SITE } from '@/src/config/site';

export default function AboutPage() {
  const [talentModalOpen, setTalentModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar onOpenTalentModal={() => setTalentModalOpen(true)} />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 mb-2">
            <Compass className="w-4 h-4 text-teal-600" />
            <span>Australian Recruitment Network</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            About Jobs Navigator
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            Founded in South Australia on 07 May 2025, Jobs Navigator was created to solve Australia&apos;s critical talent shortages through direct digital matching and verified right-to-work screening.
          </p>
        </div>

        {/* Founding & Brand Facts Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-teal-700 font-semibold text-xs uppercase tracking-wider">
              <Calendar className="w-4 h-4" />
              <span>Founded</span>
            </div>
            <p className="text-2xl font-extrabold text-slate-900 font-mono">07 May 2025</p>
            <p className="text-xs text-slate-500">
              Established in Broadview, South Australia, expanding to national coverage within months.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-teal-700 font-semibold text-xs uppercase tracking-wider">
              <Building2 className="w-4 h-4" />
              <span>ABN Verification</span>
            </div>
            <p className="text-xl font-extrabold text-slate-900 font-mono">
              <a
                href={SITE.abnLookupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-700 transition-colors inline-flex items-center gap-1.5"
                title="Verify on Australian Business Register"
              >
                <span>{SITE.abn}</span>
                <ExternalLink className="w-4 h-4 text-teal-600 shrink-0" />
              </a>
            </p>
            <p className="text-xs text-slate-500">
              Registered and verified active entity on the official Australian Business Register (ABR).
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-teal-700 font-semibold text-xs uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Headquarters</span>
            </div>
            <p className="text-xl font-extrabold text-slate-900">Broadview, SA</p>
            <p className="text-xs text-slate-500">
              16 Copley St, Broadview SA 5083, coordinating operations across all 8 Australian States & Territories.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-teal-700 font-semibold text-xs uppercase tracking-wider">
              <Globe2 className="w-4 h-4" />
              <span>Geographic Reach</span>
            </div>
            <p className="text-xl font-extrabold text-slate-900">National & Global</p>
            <p className="text-xs text-slate-500">
              Serving NSW, VIC, QLD, WA, SA, TAS, ACT, NT plus international skilled migration applicants.
            </p>
          </div>
        </section>

        {/* Mission & Core Differentiators */}
        <section className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm mb-16">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Our Core Principles</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              What Sets Jobs Navigator Apart
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Traditional job boards are flooded with AI-generated resumes and unverified profiles, forcing Australian hiring managers to sift through hundreds of irrelevant applications. Jobs Navigator operates on a different standard:
            </p>

            <div className="space-y-4 pt-2">
              {[
                {
                  title: '1. Compulsory Right-to-Work and ID Verification',
                  desc: 'Every applicant confirms their legal eligibility to work in Australia and uploads authentic identity documentation (Driver Licence front & back, or Passport). Employers receive only genuine, verified talent.'
                },
                {
                  title: '2. 90-Day Australian Privacy Principles (APP) Guarantee',
                  desc: 'Candidate identity files are never permanently stored, indexed, or exposed. They are protected under a strict 90-day retention schedule compliant with the Privacy Act 1988 (Cth).'
                },
                {
                  title: '3. Transparent Remuneration with Superannuation',
                  desc: 'All advertised roles clearly state base rates and statutory 11.5% Superannuation guarantee, eliminating guesswork for job seekers.'
                },
                {
                  title: '4. International Talent Migration Gateway',
                  desc: 'We assist qualified overseas candidates and visa holders (TSS 482, Working Holiday 417/462, Graduate 485) to transition smoothly into Australian industries facing domestic skills shortages.'
                }
              ].map((item, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-xl space-y-1">
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Legal & Compliance Authority */}
        <section className="bg-[#0A1C2E] text-white rounded-2xl p-8 sm:p-12 mb-16 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">Governance & Authority</span>
          <h2 className="text-2xl font-bold text-white">Australian Regulatory Compliance</h2>
          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
            Jobs Navigator operates in accordance with the legislative standards established by the Commonwealth of Australia:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-slate-300">
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span><strong>Privacy Act 1988 (Cth):</strong> Governs candidate identity document retention and privacy principles.</span>
            </div>
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span><strong>Fair Work Act 2009:</strong> Guarantees National Employment Standards (NES) and modern award alignment.</span>
            </div>
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span><strong>Migration Act 1958:</strong> Strict VEVO and right-to-work compliance before employer referral.</span>
            </div>
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span><strong>Spam Act 2003:</strong> Explicit opt-in job alert notifications and direct unsubscribe mechanisms.</span>
            </div>
            <div className="flex items-start gap-2 sm:col-span-2 pt-1 border-t border-slate-800">
              <Building2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span>
                <strong>Australian Business Register (ABR):</strong> Registered Australian business entity under{' '}
                <a
                  href={SITE.abnLookupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-teal-300 font-bold underline decoration-teal-400/50 underline-offset-2"
                >
                  ABN {SITE.abn}
                </a>{' '}
                (registered location: South Australia).
              </span>
            </div>
          </div>
        </section>

        {/* CTAs */}
        <section className="text-center space-y-4">
          <h3 className="text-xl font-bold text-slate-900">Ready to Take The Next Step?</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/jobs"
              className="px-6 py-2.5 bg-[#0F2942] hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm"
            >
              Browse Australian Jobs
            </Link>
            <Link
              href="/employers"
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm"
            >
              For Employers: Post a Vacancy
            </Link>
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
