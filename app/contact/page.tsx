'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Share2,
  Building2,
  ExternalLink 
} from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatHub from '@/components/ChatHub';
import PrivacyBanner from '@/components/PrivacyBanner';
import GeneralTalentModal from '@/components/GeneralTalentModal';

import { SITE } from '@/src/config/site';

export default function ContactPage() {
  const [talentModalOpen, setTalentModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Candidate Application Enquiry',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setTicketNumber(data.ticketId || `TKT-${Math.floor(100000 + Math.random() * 900000)}`);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error sending enquiry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hi ${SITE.name}, I would like to enquire about your Australian job board and candidate matching services.`
  );
  const whatsappUrl = `https://wa.me/${SITE.whatsapp}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar onOpenTalentModal={() => setTalentModalOpen(true)} />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 mb-2">
            <Mail className="w-4 h-4 text-teal-600" />
            <span>National Support & Operations Desk</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact Jobs Navigator
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            Reach our Australian talent coordination team in Broadview, South Australia. We assist candidates, employers, and immigration partners across all 8 States and Territories.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Details & WhatsApp Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Headquarters Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                Adelaide Operations & National Office
              </h3>

              <div className="space-y-3.5 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Registered Address:</strong>
                    <span>{SITE.businessLocation}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Australian Business Number (ABN):</strong>
                    <a
                      href={SITE.abnLookupUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-700 font-bold hover:underline inline-flex items-center gap-1.5"
                      title="Verify on Australian Business Register"
                    >
                      <span>{SITE.abn}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-teal-600" />
                    </a>
                    <span className="block text-slate-400 text-xs">Active Australian Entity (ABR Verified)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Direct Telephone:</strong>
                    <a href={`tel:${SITE.phone}`} className="text-teal-700 font-semibold hover:underline">
                      {SITE.phoneFormatted}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Email Desk:</strong>
                    <a href={`mailto:${SITE.email}`} className="text-teal-700 font-semibold hover:underline">
                      {SITE.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Operating Hours:</strong>
                    <span>Monday – Friday: 8:30 AM – 5:30 PM (ACST)</span>
                    <span className="block text-slate-400 text-xs">AEST/AWST coverage across all state shifts</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Instant Action Card */}
            <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6 space-y-3">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                <MessageSquare className="w-5 h-5 text-emerald-700" />
                <span>Instant WhatsApp Concierge</span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Connect directly with our recruitment desk on WhatsApp for instant feedback on vacancy listings or application status.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                <Share2 className="w-4 h-4" />
                <span>Open WhatsApp Chat</span>
              </a>
            </div>

            {/* Privacy Assurance Notice */}
            <div className="p-4 bg-slate-100 rounded-xl text-xs text-slate-600 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Australian Privacy Principles Guaranteed</span>
              </div>
              <p>
                All communications and identity verification inquiries are handled in compliance with the Privacy Act 1988 (Cth).
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
              Send an Enquiry
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Complete the form below and an Australian talent coordinator will respond within 1 business day.
            </p>

            {ticketNumber ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Enquiry Received</h4>
                <p className="text-xs text-slate-600">
                  Thank you, <strong>{formData.name}</strong>. Your enquiry has been registered under reference:
                </p>
                <div className="inline-block px-4 py-2 bg-white border border-slate-300 rounded-lg font-mono text-sm font-bold text-slate-900">
                  {ticketNumber}
                </div>
                <p className="text-xs text-slate-500">
                  A response will be dispatched to <strong>{formData.email}</strong> shortly.
                </p>
                <button
                  onClick={() => setTicketNumber('')}
                  className="px-4 py-2 bg-[#0F2942] text-white text-xs font-semibold uppercase tracking-wider rounded-lg"
                >
                  Submit Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2 text-xs text-rose-700">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Lachlan Campbell"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@domain.com.au"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0489 989 442"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Enquiry Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="Candidate Application Enquiry">Candidate Application Enquiry</option>
                      <option value="Employer Recruitment Request">Employer Recruitment Request</option>
                      <option value="Identity Verification & Privacy">Identity Verification & Privacy</option>
                      <option value="International Visa Sponsorship">International Visa Sponsorship</option>
                      <option value="General Partnerships">General Partnerships</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your question, role requirements, or candidate reference number..."
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors shadow-sm"
                  >
                    {isSubmitting ? 'Sending Message...' : 'Submit Message to Support Desk'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
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
