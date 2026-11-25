'use client';

import { useState } from 'react';
import { MessageSquare, Phone, Mail, X, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { SITE } from '@/src/config/site';

export default function ChatHub() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappMessage = encodeURIComponent(
    `Hi ${SITE.name}, I would like to enquire about current Australian job openings and recruitment services.`
  );
  const whatsappUrl = `https://wa.me/${SITE.whatsapp}?text=${whatsappMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Expanded Quick Contact Panel */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {/* Header */}
          <div className="bg-[#0F2942] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-xs">
                JN
              </div>
              <div>
                <h4 className="text-sm font-semibold">{SITE.name} Direct Connect</h4>
                <p className="text-xs text-teal-300">South Australia & National Desk</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-300 hover:text-white p-1"
              aria-label="Close chat options"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Options */}
          <div className="p-4 space-y-2.5">
            {/* WhatsApp option */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/60 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-emerald-950">Chat via WhatsApp</p>
                  <p className="text-[11px] text-emerald-800">Direct message with team</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Direct Phone */}
            <a
              href={`tel:${SITE.phone}`}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#0F2942] flex items-center justify-center text-white shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-slate-900">Direct Phone Call</p>
                  <p className="text-[11px] text-slate-500">{SITE.phoneFormatted}</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Email */}
            <a
              href={`mailto:${SITE.email}?subject=Jobs%20Navigator%20Enquiry`}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center text-white shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-slate-900">Email Inquiries</p>
                  <p className="text-[11px] text-slate-500">{SITE.email}</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Privacy footnote */}
            <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[10px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>Australian Privacy Principles (Privacy Act 1988) Protected</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 rounded-full bg-[#0F2942] text-white flex items-center justify-center shadow-xl hover:bg-[#0A1C2E] border-2 border-teal-400 focus:outline-none focus:ring-4 focus:ring-teal-500/30 transition-transform hover:scale-105 active:scale-95"
        aria-label="Direct contact options"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
}
