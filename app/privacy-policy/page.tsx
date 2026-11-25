import Link from 'next/link';
import { ShieldCheck, FileText, Lock, CheckCircle2, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatHub from '@/components/ChatHub';
import { SITE } from '@/src/config/site';

export const metadata = {
  title: 'Australian Privacy Policy & APP Statement | Jobs Navigator',
  description: 'Jobs Navigator Privacy Policy adhering to the Australian Privacy Principles (Privacy Act 1988 Cth) and 90-day identity document retention policy.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-teal-700 hover:text-teal-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Jobs Navigator</span>
          </Link>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 mb-1">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Statutory Compliance Document</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Australian Privacy Policy & Identity Retention Statement
          </h1>
          <p className="text-xs text-slate-500 mt-2">
            Last Updated: 25 November 2026 · Compliant with the Privacy Act 1988 (Cth) and Australian Privacy Principles (APPs).
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8 text-slate-700 text-sm leading-relaxed">
          {/* Section 1 */}
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">1. Overview and Commitment</h2>
            <p>
              Jobs Navigator (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;, Australian Business Number:{' '}
              <a
                href={SITE.abnLookupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-700 font-bold underline underline-offset-2"
                title="Verify on Australian Business Register"
              >
                ABN {SITE.abn}
              </a>
              ), headquartered at 16 Copley St, Broadview SA 5083, is dedicated to upholding the highest standards of candidate privacy and data protection. This Privacy Policy outlines how we collect, store, handle, and securely destroy personal information and compulsory identity documents in strict compliance with the <em>Privacy Act 1988 (Cth)</em> and the thirteen <em>Australian Privacy Principles (APPs)</em>.
            </p>
          </div>

          {/* Section 2 */}
          <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl space-y-2">
            <h2 className="text-base font-bold text-teal-950 flex items-center gap-2">
              <Lock className="w-4 h-4 text-teal-700" />
              <span>2. Compulsory Identity Verification & 90-Day Retention Schedule</span>
            </h2>
            <p className="text-xs text-teal-900 leading-relaxed">
              Under Australian Workplace legislation and the <em>Migration Act 1958</em>, employers are legally obligated to employ only individuals with lawful rights to work in Australia. To fulfill this statutory screening requirement:
            </p>
            <ul className="list-disc pl-5 text-xs text-teal-900 space-y-1">
              <li>Candidates must provide verified identification: either an Australian Driver Licence (both Front Photo and Back Photo required) or a valid Passport (biometric photo page).</li>
              <li><strong>Strict 90-Day Retention Schedule:</strong> Uploaded identity images are encrypted using AES-256 and stored for a maximum period of 90 calendar days from the date of application lodgement.</li>
              <li>Upon reaching 90 days, identity files are permanently and automatically deleted from our production storage systems.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">3. What Information We Collect</h2>
            <p className="mb-2">We collect only information reasonably necessary to evaluate, verify, and match you with Australian employment opportunities:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>Contact Information:</strong> Full name, email address, telephone number, residential suburb, and State/Territory.</li>
              <li><strong>Right-to-Work Credentials:</strong> Australian Citizenship, Permanent Residency, New Zealand Special Category Visa (SCV 444), or temporary visa subclass details (e.g. subclass 417, 462, 482, 485).</li>
              <li><strong>Employment History & Qualifications:</strong> Resumes, CVs, trade certificates, AHPRA/TRB registration numbers, and screening question responses.</li>
              <li><strong>Identity Documentation:</strong> Dual-sided Driver Licence photos or Passport photo page for right-to-work verification.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">4. Purpose of Collection & Use</h2>
            <p className="mb-2">We utilize your personal information exclusively for:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Assessing candidate eligibility and suitability for advertised Australian positions.</li>
              <li>Verifying legal eligibility to work under Australian Commonwealth and State legislation.</li>
              <li>Introducing pre-screened talent to verified Australian hiring employers upon mutual shortlist agreement.</li>
              <li>Communicating application updates via email, phone, or WhatsApp.</li>
            </ul>
            <p className="mt-2 text-xs text-slate-500 italic">
              We never sell, rent, or publicly disclose candidate personal information or identity documents to third-party marketing brokers.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">5. Disclosure to Prospective Employers</h2>
            <p>
              Candidate resumes and screening responses are presented to verified hiring managers. Sensitive identity documents (driver licence and passport images) are retained internally by Jobs Navigator for right-to-work validation and are only shared with the direct employer&apos;s HR compliance team after an offer or interview has been scheduled with candidate consent.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">6. Compliance with Fair Work Act 2009 & Superannuation Guarantee</h2>
            <p>
              Jobs Navigator ensures all positions advertised comply with National Employment Standards (NES), modern awards, and national minimum wage orders under the <em>Fair Work Act 2009</em>. Remuneration across our platform explicitly states superannuation contributions (currently 11.5% compulsory superannuation guarantee under Commonwealth law).
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">7. Access, Correction, and Right to Early Deletion</h2>
            <p>
              Under Australian Privacy Principles 12 and 13, you have the right to request access to your personal information or request correction of inaccuracies. You may also request early deletion of your identity documents and resume prior to the standard 90-day expiry by emailing our Privacy Officer at{' '}
              <a href={`mailto:${SITE.email}`} className="text-teal-700 font-semibold underline">
                {SITE.email}
              </a>{' '}
              with your application reference code.
            </p>
          </div>

          {/* Section 8 */}
          <div className="pt-4 border-t border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-2">8. Contact Our Privacy Officer</h2>
            <p className="text-xs text-slate-600">
              If you have any questions or complaints regarding our handling of your personal information, please contact:
            </p>
            <div className="mt-2 p-3 bg-slate-50 rounded-lg text-xs space-y-1">
              <p><strong>Privacy & Compliance Officer:</strong> Jobs Navigator Australia</p>
              <p>
                <strong>Entity Registration:</strong> ABN{' '}
                <a
                  href={SITE.abnLookupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-700 underline font-semibold"
                >
                  {SITE.abn}
                </a>{' '}
                (Australian Business Register)
              </p>
              <p><strong>Address:</strong> 16 Copley St, Broadview SA 5083, Australia</p>
              <p><strong>Email:</strong> {SITE.email}</p>
              <p><strong>Phone:</strong> {SITE.phoneFormatted}</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ChatHub />
    </div>
  );
}
