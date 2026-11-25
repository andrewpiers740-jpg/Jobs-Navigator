import Link from 'next/link';
import { Compass, Mail, Phone, MapPin, ShieldCheck, FileText, Lock, AlertTriangle, CheckCircle2, Building2, ExternalLink } from 'lucide-react';
import { SITE } from '@/src/config/site';

export default function Footer() {
  return (
    <footer className="bg-[#0A1C2E] text-slate-300 border-t border-[#1E3A5F]">
      {/* Upper Footer: Value Proposition & National Network */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1 & 2: Brand & National Presence */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 text-xl font-bold tracking-tight text-white">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white">
                <Compass className="w-4 h-4 text-white" />
              </div>
              <span>Jobs Navigator</span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Connecting skilled Australian professionals, remote workers, tradespeople, and international specialists with verified Australian employers across all 8 States, Territories, and regional centres.
            </p>
            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>
                  ABN:{' '}
                  <a
                    href={SITE.abnLookupUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-teal-300 font-semibold underline decoration-teal-500/60 underline-offset-2 transition-colors inline-flex items-center gap-1"
                    title="Verify Jobs Navigator on the Australian Business Register"
                  >
                    <span>{SITE.abn}</span>
                    <ExternalLink className="w-3 h-3 text-teal-400" />
                  </a>
                  <span className="text-[11px] text-teal-400/90 ml-1.5">(Active Australian Entity)</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{SITE.businessLocation}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`tel:${SITE.phone}`} className="hover:text-white transition-colors">
                  {SITE.phoneFormatted} (Direct Inquiries)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`mailto:${SITE.email}`} className="hover:text-white transition-colors">
                  {SITE.email}
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Job Seekers</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/jobs" className="hover:text-teal-400 transition-colors">
                  Browse All 2,200+ Jobs
                </Link>
              </li>
              <li>
                <Link href="/jobs?remote=true" className="hover:text-teal-400 transition-colors font-medium text-slate-300">
                  100% Remote Australian Roles
                </Link>
              </li>
              <li>
                <Link href="/sectors" className="hover:text-teal-400 transition-colors">
                  Industry Sectors & Award Bands
                </Link>
              </li>
              <li>
                <Link href="/jobs?workType=FIFO+%2F+DIDO" className="hover:text-teal-400 transition-colors">
                  FIFO & Mining Roles (WA/QLD/SA)
                </Link>
              </li>
              <li>
                <Link href="/jobs?visa=true" className="hover:text-teal-400 transition-colors">
                  Visa & International Pathways
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-teal-400 transition-colors">
                  How Application Vetting Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Employers & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Employers</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/employers" className="hover:text-teal-400 transition-colors">
                  Post a Vacancy
                </Link>
              </li>
              <li>
                <Link href="/employers#vetting" className="hover:text-teal-400 transition-colors">
                  Verified Candidate Matching
                </Link>
              </li>
              <li>
                <Link href="/employers#confidential" className="hover:text-teal-400 transition-colors">
                  Confidential Search Options
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-teal-400 transition-colors">
                  Speak With A Consultant
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-teal-400 transition-colors inline-flex items-center gap-1 text-slate-400">
                  <Lock className="w-3 h-3 text-teal-400" />
                  <span>Admin Hub</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Australian Standards & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Standards & Trust</h4>
            <ul className="space-y-2 text-xs text-slate-400 leading-relaxed">
              <li className="flex items-start gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>Australian Privacy Principles (Privacy Act 1988) compliant.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <FileText className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>Compulsory ID verification with strict 90-day retention schedule.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>Centrelink mutual obligation job search proof receipts issued.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-teal-400 font-bold shrink-0">11.5%</span>
                <span>Statutory Superannuation guarantee clearly stated on all roles.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Building2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>
                  ABN:{' '}
                  <a
                    href={SITE.abnLookupUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-teal-300 font-semibold underline decoration-teal-500/50 underline-offset-2"
                  >
                    {SITE.abn}
                  </a>{' '}
                  (ABR Registered).
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Scamwatch & Safe Job Seeking Box (SEEK standard) */}
        <div className="mt-8 p-4 bg-[#0F2942]/70 border border-teal-500/30 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-semibold">Safe Job Seeking & Scamwatch Commitment:</strong>
              <span>
                Jobs Navigator and genuine Australian employers will never ask you for money, payment for equipment, or banking passwords. If anyone asks for upfront fees, report it immediately to{' '}
                <a href={`mailto:${SITE.email}`} className="text-teal-300 underline">{SITE.email}</a>.
              </span>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="mt-8 pt-6 border-t border-slate-800 text-xs text-slate-500 leading-relaxed space-y-2">
          <p>
            <strong>Legal Notice & Candidate Protection:</strong> {SITE.compliance.disclaimer} All advertised positions adhere strictly to the Fair Work Act 2009 (Cth), National Employment Standards (NES), Equal Opportunity and Anti-Discrimination legislation. Candidate identity documents (Australian Driver Licences and Passports) are held securely for right-to-work verification under our 90-day data retention policy.
          </p>
          <p className="text-[11px] text-slate-500">
            <strong>Acknowledgment of Country:</strong> Jobs Navigator acknowledges the Traditional Custodians of country throughout Australia and their connections to land, sea, and community. We pay our respect to their Elders past and present.
          </p>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Privacy */}
      <div className="bg-[#071320] border-t border-slate-800/80 py-4 px-4 sm:px-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            © {new Date().getFullYear()} {SITE.name} · ABN{' '}
            <a
              href={SITE.abnLookupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-200 hover:text-teal-300 font-medium underline underline-offset-2 transition-colors"
            >
              {SITE.abn}
            </a>{' '}
            (jobsnavigator.com.au). Founded May 2025. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-slate-400">
            <Link href="/privacy-policy" className="hover:text-teal-300 transition-colors">
              Australian Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/contact" className="hover:text-teal-300 transition-colors">
              Contact & Support
            </Link>
            <span>·</span>
            <Link href="/admin" className="hover:text-teal-300 transition-colors">
              Staff Passcode Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
