'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  CheckCircle2, 
  FileCheck, 
  Clock, 
  HelpCircle, 
  ArrowRight, 
  Lock, 
  UserCheck, 
  Briefcase,
  AlertCircle
} from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatHub from '@/components/ChatHub';
import PrivacyBanner from '@/components/PrivacyBanner';
import GeneralTalentModal from '@/components/GeneralTalentModal';

import { SITE } from '@/src/config/site';

export default function HowItWorksPage() {
  const [talentModalOpen, setTalentModalOpen] = useState(false);

  const faqs = [
    {
      q: 'Why does Jobs Navigator require compulsory identity document upload?',
      a: 'Under Australian workplace legislation (including the Migration Act 1958 and Fair Work Act 2009), employers are subject to severe civil penalties if they employ individuals without valid Australian work rights. By verifying identity (via Driver Licence front & back, or Passport photo page) at application time, we guarantee that only genuine, work-authorized candidates are submitted to employers, drastically accelerating hiring turnaround.'
    },
    {
      q: 'What is the 90-Day Document Retention Policy?',
      a: 'In strict compliance with Australian Privacy Principle 11 (Privacy Act 1988 Cth), identity documents and sensitive candidate records are retained for a maximum of 90 calendar days from the date of submission. After 90 days, all identity image attachments are permanently and cryptographically purged from our secure servers unless the candidate has been placed in an active ongoing role.'
    },
    {
      q: 'Are advertised salaries inclusive or exclusive of Superannuation?',
      a: 'All remuneration figures displayed across Jobs Navigator clearly specify whether Superannuation is exclusive (+ Super) or inclusive. Under Australian statutory legislation, employers must contribute 11.5% compulsory Superannuation into each employee’s nominated fund in addition to base pay.'
    },
    {
      q: 'Can international candidates living overseas or requiring visa sponsorship apply?',
      a: 'No. Jobs Navigator is strictly dedicated to Australian Citizens, Permanent Residents, and onshore residents currently living in Australia with valid work rights. We do not accept applications from overseas or facilitate international visa sponsorships. All candidate profiles must hold immediate, lawful right to work within Australia.'
    },
    {
      q: 'How does Jobs Navigator protect candidate privacy from current employers?',
      a: 'Candidates can select confidential representation. Your identity files and resume are never made public or indexed by search engines. They are only shared with a specific hiring organization once you have been shortlisted and provided verbal or written consent.'
    },
    {
      q: 'Is Jobs Navigator an Australian registered business entity?',
      a: 'Yes. Jobs Navigator operates as an authentic Australian recruitment intermediary under Australian Business Number (ABN) 18 684 623 667, headquartered in Broadview, South Australia. You can verify our registration status directly on the Australian Business Register (ABR).'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar onOpenTalentModal={() => setTalentModalOpen(true)} />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 mb-2">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Integrity & Verification Framework</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How Jobs Navigator Works
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            A transparent, legally compliant bridge between skilled talent and Australian employers, governed by the Australian Privacy Principles and National Employment Standards.
          </p>
        </div>

        {/* CANDIDATE JOURNEY */}
        <section className="mb-16">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">For Job Seekers</span>
            <h2 className="text-2xl font-bold text-slate-900 mt-0.5">The 4-Step Candidate Application Flow</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <span className="font-mono text-2xl font-bold text-teal-700">01</span>
              <h3 className="text-base font-bold text-slate-900">Select Role & Answer Screening</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Filter verified roles by trade, state, or salary. Answer the mandatory screening requirement (e.g. Trade Certificate III or AHPRA registration number).
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <span className="font-mono text-2xl font-bold text-teal-700">02</span>
              <h3 className="text-base font-bold text-slate-900">Compulsory ID Upload</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Provide your Australian Driver Licence (both front and back photos required) OR Passport photo page to verify right-to-work in Australia.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <span className="font-mono text-2xl font-bold text-teal-700">03</span>
              <h3 className="text-base font-bold text-slate-900">90-Day Encrypted Storage</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Identity documents are held in strict adherence to the Privacy Act 1988 (Cth) and purged automatically after 90 days.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <span className="font-mono text-2xl font-bold text-teal-700">04</span>
              <h3 className="text-base font-bold text-slate-900">Direct Employer Match</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Shortlisted candidates are introduced directly to hiring managers within 48 hours for interviews and formal offer letters.
              </p>
            </div>
          </div>
        </section>

        {/* EMPLOYER ASSURANCE */}
        <section className="mb-16 bg-[#0F2942] text-white rounded-2xl p-8 sm:p-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">Employer Protection</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Why Australian Hiring Managers Rely On Jobs Navigator
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Recruitment teams waste countless hours filtering unverified applications with questionable right-to-work credentials. Jobs Navigator eliminates this friction. Before an applicant reaches your desk, we have verified:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Legally confirmed Australian right-to-work status</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Dual-sided Australian Driver Licence or Passport</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Trade certificate or professional registration check</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Mandatory screening questions answered in full</span>
              </div>
            </div>
            <div className="pt-4">
              <Link
                href="/employers"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm"
              >
                <span>Post A Vacancy With Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* COMPLIANCE & FREQUENTLY ASKED QUESTIONS */}
        <section className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Australian Regulatory Compliance</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-slate-900 flex items-start gap-2.5">
                  <HelpCircle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-7">
                  {faq.a}
                </p>
              </div>
            ))}
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
