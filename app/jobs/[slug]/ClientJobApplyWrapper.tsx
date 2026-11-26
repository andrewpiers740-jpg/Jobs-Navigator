'use client';

import { useState } from 'react';
import { Job } from '@/lib/data/jobs';
import { SITE } from '@/src/config/site';
import ApplyModal from '@/components/ApplyModal';
import SuperCalculatorModal from '@/components/SuperCalculatorModal';
import { 
  ArrowUpRight, 
  Share2, 
  ShieldCheck, 
  Clock, 
  FileCheck, 
  Calculator 
} from 'lucide-react';

interface ClientJobApplyWrapperProps {
  job: Job;
}

export default function ClientJobApplyWrapper({ job }: ClientJobApplyWrapperProps) {
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [calculatorOpen, setCalculatorOpen] = useState(false);

  const whatsappMessage = encodeURIComponent(
    `Hi ${SITE.name}, I am interested in applying for "${job.title}" (Ref: ${job.id}) in ${job.location}.`
  );
  const whatsappUrl = `https://wa.me/${SITE.whatsapp}?text=${whatsappMessage}`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm sticky top-24 space-y-6">
      <div>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-700">Verified Application</span>
        <h3 className="text-xl font-bold text-slate-900 mt-0.5">Apply for this Role</h3>
        <p className="text-xs text-slate-500 mt-1">
          Complete our 4-step on-site verification with your CV and Australian ID.
        </p>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => setApplyModalOpen(true)}
          className="w-full py-3.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <span>Apply Online (Verified ID)</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => setCalculatorOpen(true)}
          className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <Calculator className="w-4 h-4 text-teal-600" />
          <span>Estimate Take-Home Pay & Super</span>
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <Share2 className="w-4 h-4 text-emerald-700" />
          <span>Ask Question on WhatsApp</span>
        </a>
      </div>

      {/* Snapshot Checklist */}
      <div className="pt-4 border-t border-slate-100 space-y-3 text-xs text-slate-600">
        <div className="flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
          <div>
            <strong>Right to Work Check:</strong> Australian Citizen, PR, or Onshore Resident (No offshore applicants accepted).
          </div>
        </div>

        <div className="flex items-start gap-2">
          <FileCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
          <div>
            <strong>Compulsory ID Upload:</strong> Driver Licence (both front & back) or Passport photo page.
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Clock className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
          <div>
            <strong>Response Time:</strong> Vetted applicants contacted within 48 business hours.
          </div>
        </div>
      </div>

      <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 leading-tight">
        Protected by the Australian Privacy Principles (Privacy Act 1988). Encrypted 90-day retention.
      </div>

      <ApplyModal
        job={job}
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
      />

      <SuperCalculatorModal
        isOpen={calculatorOpen}
        onClose={() => setCalculatorOpen(false)}
        initialSalary={job.salaryMin || 100000}
      />
    </div>
  );
}
