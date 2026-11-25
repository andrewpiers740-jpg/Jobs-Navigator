'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, X } from 'lucide-react';

export default function PrivacyBanner() {
  const [acknowledged, setAcknowledged] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const isConsentGiven = localStorage.getItem('jn_privacy_consent_v1');
      if (!isConsentGiven) {
        setAcknowledged(false);
      }
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('jn_privacy_consent_v1', 'true');
    setAcknowledged(true);
  };

  if (acknowledged) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 bg-[#0F172A]/95 text-slate-200 border-t border-slate-700/80 px-4 py-3.5 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-start gap-2.5">
          <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-white">Australian Privacy Notice:</strong> Jobs Navigator collects applicant information and identity verification documents in strict compliance with the Australian Privacy Principles (Privacy Act 1988 Cth). Uploaded identity verification documents are securely processed and retained for a maximum of 90 days. Learn more in our{' '}
            <Link href="/privacy-policy" className="text-teal-300 underline underline-offset-2 hover:text-white">
              Privacy Policy
            </Link>.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
          <button
            onClick={handleAccept}
            className="px-4 py-1.5 bg-teal-600 hover:bg-teal-500 text-white font-medium rounded-md transition-colors whitespace-nowrap"
          >
            I Understand & Agree
          </button>
          <button
            onClick={handleAccept}
            className="text-slate-400 hover:text-white p-1"
            aria-label="Dismiss privacy notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
