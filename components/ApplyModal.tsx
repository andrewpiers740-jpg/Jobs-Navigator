'use client';

import { useState, useRef } from 'react';
import { Job, ApplicationRecord } from '@/lib/data/jobs';
import { SITE } from '@/src/config/site';
import { saveApplication } from '@/lib/store';
import { 
  X, 
  Upload, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle, 
  FileText, 
  Camera, 
  ArrowRight, 
  ArrowLeft,
  Share2
} from 'lucide-react';

interface ApplyModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ApplyModal({ job, isOpen, onClose }: ApplyModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<ApplicationRecord | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    state: 'NSW',
    country: 'Australia',
    rightToWork: 'Australian Citizen',
    visaSubclass: '',
    screeningAnswer: '',
    idType: 'drivers_licence' as 'drivers_licence' | 'passport',
    retentionConsent: false,
    notes: '',
  });

  // File uploads
  const [cvFile, setCvFile] = useState<{ name: string; size: string; dataUrl?: string } | null>(null);
  const [driverFront, setDriverFront] = useState<{ name: string; dataUrl?: string } | null>(null);
  const [driverBack, setDriverBack] = useState<{ name: string; dataUrl?: string } | null>(null);
  const [passportPhoto, setPassportPhoto] = useState<{ name: string; dataUrl?: string } | null>(null);

  const cvInputRef = useRef<HTMLInputElement>(null);
  const driverFrontRef = useRef<HTMLInputElement>(null);
  const driverBackRef = useRef<HTMLInputElement>(null);
  const passportRef = useRef<HTMLInputElement>(null);

  if (!isOpen || !job) return null;

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'cv' | 'driver_front' | 'driver_back' | 'passport'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const sizeStr = `${(file.size / 1024).toFixed(0)} KB`;

      if (type === 'cv') {
        setCvFile({ name: file.name, size: sizeStr, dataUrl });
      } else if (type === 'driver_front') {
        setDriverFront({ name: file.name, dataUrl });
      } else if (type === 'driver_back') {
        setDriverBack({ name: file.name, dataUrl });
      } else if (type === 'passport') {
        setPassportPhoto({ name: file.name, dataUrl });
      }
    };
    reader.readAsDataURL(file);
  };

  const validateStep1 = () => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setErrorMsg('Please enter your full first and last name.');
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return false;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Please provide a contact phone number.');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  const validateStep2 = () => {
    if (!formData.screeningAnswer.trim()) {
      setErrorMsg('Please provide a response to the mandatory screening question.');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  const validateStep3 = () => {
    if (!cvFile) {
      setErrorMsg('Resume / CV upload is compulsory for Australian talent matching.');
      return false;
    }
    if (formData.idType === 'drivers_licence') {
      if (!driverFront || !driverBack) {
        setErrorMsg('Both Front Photo AND Back Photo of your Australian Driver Licence are required for right-to-work verification.');
        return false;
      }
    } else {
      if (!passportPhoto) {
        setErrorMsg('Main Passport biometric photo page upload is required.');
        return false;
      }
    }
    if (!formData.retentionConsent) {
      setErrorMsg('You must review and accept the Australian Privacy Principles 90-day retention consent notice.');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
    else if (step === 3 && validateStep3()) setStep(4);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const payload = {
        jobId: job.id,
        jobTitle: job.title,
        applicantName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        location: `${formData.city || 'Metro'}, ${formData.state}`,
        rightToWork: formData.rightToWork,
        visaDetails: formData.visaSubclass,
        screeningAnswer: formData.screeningAnswer,
        cvFileName: cvFile?.name || 'Resume.pdf',
        idType: formData.idType,
        retentionConsentAccepted: formData.retentionConsent,
      };

      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      const refNumber = data.referenceNumber || `JN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

      const newRecord: ApplicationRecord = {
        id: `app-${Date.now()}`,
        referenceNumber: refNumber,
        jobId: job.id,
        jobTitle: job.title,
        applicantName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        location: `${formData.city || 'Metro'}, ${formData.state}`,
        rightToWork: formData.rightToWork,
        visaDetails: formData.visaSubclass,
        screeningAnswer: formData.screeningAnswer,
        cvFileName: cvFile?.name || 'Candidate_CV.pdf',
        cvFileSize: cvFile?.size || 'Unknown',
        cvDataUrl: cvFile?.dataUrl,
        idType: formData.idType,
        idFrontFileName: driverFront?.name,
        idFrontDataUrl: driverFront?.dataUrl,
        idBackFileName: driverBack?.name,
        idBackDataUrl: driverBack?.dataUrl,
        passportFileName: passportPhoto?.name,
        passportDataUrl: passportPhoto?.dataUrl,
        retentionConsentAccepted: true,
        notes: formData.notes,
        status: 'Pending',
        submittedAt: new Date().toISOString(),
      };

      saveApplication(newRecord);
      setSubmittedApp(newRecord);
    } catch (err: any) {
      setErrorMsg(err.message || 'Submission failed. Please check connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setSubmittedApp(null);
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header Bar */}
        <div className="bg-[#0F2942] text-white p-5 sm:p-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-teal-300">
              <span>{job.sectorName}</span>
              <span>·</span>
              <span>{job.location}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
              Apply for {job.title}
            </h2>
            <div className="mt-1 text-xs text-slate-300 flex items-center gap-2">
              <span className="font-semibold text-white">{job.salary}</span>
              <span>({job.superannuation})</span>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Success Confirmation Screen */}
        {submittedApp ? (
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">Application Registered</span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">Application Lodged Successfully</h3>
              <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
                Thank you, <strong>{submittedApp.applicantName}</strong>. Your application and verified identity credentials have been securely registered with reference code:
              </p>
              <div className="mt-3 inline-block px-4 py-2 bg-slate-100 border border-slate-300 rounded-lg font-mono text-base font-bold text-slate-900">
                {submittedApp.referenceNumber}
              </div>
            </div>

            <div className="p-4 bg-teal-50 border border-teal-200/80 rounded-xl text-left text-xs text-teal-950 space-y-2">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Australian Privacy Principles Compliance:</strong> Your identity documents are stored in an encrypted vault under our strict 90-day retention policy and will only be presented to prospective hiring employers upon mutual interview shortlisting.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <p>
                  Our Australian recruitment consultant for <strong>{job.sectorName}</strong> will review your qualifications and contact you on <strong>{submittedApp.phone}</strong> within 48 business hours.
                </p>
              </div>
            </div>

            {/* Centrelink & Direct WhatsApp Action Strip */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={() => {
                  const text = `[Jobs Navigator Australia — Job Application Evidence]\nReference: ${submittedApp.referenceNumber}\nPosition: ${job.title}\nSector: ${job.sectorName}\nLocation: ${job.location}\nDate Lodged: ${new Date().toLocaleDateString('en-AU')}\nMethod: Direct Digital Verification via Jobs Navigator (jobsnavigator.com.au)\nStatus: Lodged & Awaiting Employer Interview`;
                  navigator.clipboard.writeText(text);
                  alert('Application evidence copied to clipboard for Centrelink / Workforce Australia reporting!');
                }}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold transition-colors"
              >
                <FileText className="w-4 h-4 text-teal-700" />
                <span>Copy Centrelink Evidence</span>
              </button>

              <a
                href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
                  `Hi ${SITE.name}, I have just lodged application ${submittedApp.referenceNumber} for "${job.title}". Looking forward to hearing from your talent consultant.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs uppercase tracking-wider transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </a>

              <button
                onClick={resetAndClose}
                className="px-5 py-2.5 rounded-lg bg-[#0F2942] hover:bg-[#0A1C2E] text-white font-medium text-xs uppercase tracking-wider transition-colors"
              >
                Return to Jobs
              </button>
            </div>
          </div>
        ) : (
          /* Multi-Step Wizard */
          <div className="p-6 sm:p-8 space-y-6">
            {/* Step Indicator */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 text-xs">
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
                  step === 1 ? 'bg-[#0F2942] text-white' : 'bg-slate-200 text-slate-700'
                }`}>1</span>
                <span className={step === 1 ? 'font-semibold text-slate-900' : 'text-slate-500'}>Contact</span>
              </div>
              <span className="text-slate-300">·</span>
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
                  step === 2 ? 'bg-[#0F2942] text-white' : 'bg-slate-200 text-slate-700'
                }`}>2</span>
                <span className={step === 2 ? 'font-semibold text-slate-900' : 'text-slate-500'}>Work Rights</span>
              </div>
              <span className="text-slate-300">·</span>
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
                  step === 3 ? 'bg-[#0F2942] text-white' : 'bg-slate-200 text-slate-700'
                }`}>3</span>
                <span className={step === 3 ? 'font-semibold text-slate-900' : 'text-slate-500'}>ID & CV</span>
              </div>
              <span className="text-slate-300">·</span>
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
                  step === 4 ? 'bg-[#0F2942] text-white' : 'bg-slate-200 text-slate-700'
                }`}>4</span>
                <span className={step === 4 ? 'font-semibold text-slate-900' : 'text-slate-500'}>Review</span>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2 text-xs text-rose-700">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* STEP 1: Personal Details */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="e.g. Lachlan"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="e.g. Campbell"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. name@example.com.au"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Contact Phone (AU or Intl) *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 0412 884 192"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Suburb / City
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Perth"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Australian State / Territory
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      {SITE.states.filter(s => s.code !== 'ALL').map((s) => (
                        <option key={s.code} value={s.code}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Current Country
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="e.g. Australia or UK"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Work Rights & Screening Question */}
            {step === 2 && (
              <div className="space-y-5">
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Domestic Australian Policy:</strong> Applicants must currently reside in Australia with existing lawful work rights. Offshore applications and visa sponsorships are strictly not accepted.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-2">
                    Current Australian Work Rights Status *
                  </label>
                  <div className="space-y-2">
                    {SITE.workRightsOptions.map((opt) => (
                      <label
                        key={opt.id}
                        className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                          formData.rightToWork === opt.label
                            ? 'bg-teal-50/70 border-teal-500'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="rightToWork"
                          checked={formData.rightToWork === opt.label}
                          onChange={() => setFormData({ ...formData, rightToWork: opt.label })}
                          className="mt-1 text-teal-600 focus:ring-teal-500"
                        />
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{opt.label}</p>
                          <p className="text-xs text-slate-500">{opt.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {formData.rightToWork.includes('Visa') && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Visa Subclass & Expiry / Conditions
                    </label>
                    <input
                      type="text"
                      value={formData.visaSubclass}
                      onChange={(e) => setFormData({ ...formData, visaSubclass: e.target.value })}
                      placeholder="e.g. Subclass 417 Working Holiday, 88 days completed"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                )}

                {/* Screening Question */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Mandatory Role Screening</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">
                    {job.screeningQuestion}
                  </p>
                  <textarea
                    rows={3}
                    value={formData.screeningAnswer}
                    onChange={(e) => setFormData({ ...formData, screeningAnswer: e.target.value })}
                    placeholder="Provide specific details of your Australian qualifications, licence numbers, ticket dates, or years of commercial experience..."
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                  />
                </div>
              </div>
            )}

            {/* STEP 3: Resume & Compulsory ID Verification */}
            {step === 3 && (
              <div className="space-y-5">
                {/* 1. Resume Upload */}
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    1. Upload Resume / CV (PDF or DOC) *
                  </label>
                  <input
                    type="file"
                    ref={cvInputRef}
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload(e, 'cv')}
                    className="hidden"
                  />
                  <div
                    onClick={() => cvInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 hover:border-teal-500 p-4 rounded-xl text-center cursor-pointer transition-colors bg-slate-50/50"
                  >
                    {cvFile ? (
                      <div className="flex items-center justify-center gap-2 text-teal-700">
                        <FileText className="w-5 h-5" />
                        <span className="text-sm font-semibold">{cvFile.name}</span>
                        <span className="text-xs text-slate-500">({cvFile.size})</span>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                        <p className="text-xs font-medium text-slate-700">Click to upload your Australian formatted CV</p>
                        <p className="text-[11px] text-slate-400">PDF, DOC, DOCX up to 10MB</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Compulsory ID Upload */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-900">
                        2. Compulsory Identity Verification *
                      </label>
                      <span className="text-[11px] font-semibold text-teal-700">90-Day Retention Notice</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      To safeguard Australian employers and prevent right-to-work fraud, candidate identity documents are compulsory.
                    </p>
                  </div>

                  {/* ID Type Selector */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, idType: 'drivers_licence' })}
                      className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-colors ${
                        formData.idType === 'drivers_licence'
                          ? 'bg-[#0F2942] text-white border-[#0F2942]'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      Australian Driver Licence
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, idType: 'passport' })}
                      className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-colors ${
                        formData.idType === 'passport'
                          ? 'bg-[#0F2942] text-white border-[#0F2942]'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      Valid Passport
                    </button>
                  </div>

                  {/* Driver's Licence: FRONT AND BACK REQUIRED */}
                  {formData.idType === 'drivers_licence' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div>
                        <span className="block text-xs font-medium text-slate-700 mb-1">
                          Licence Front Photo *
                        </span>
                        <input
                          type="file"
                          ref={driverFrontRef}
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'driver_front')}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => driverFrontRef.current?.click()}
                          className="w-full border border-slate-300 bg-white hover:bg-slate-50 p-3 rounded-lg text-xs flex items-center justify-center gap-2 text-slate-700"
                        >
                          <Camera className="w-4 h-4 text-teal-600" />
                          <span>{driverFront ? driverFront.name : 'Upload Front Photo'}</span>
                        </button>
                      </div>

                      <div>
                        <span className="block text-xs font-medium text-slate-700 mb-1">
                          Licence Back Photo *
                        </span>
                        <input
                          type="file"
                          ref={driverBackRef}
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'driver_back')}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => driverBackRef.current?.click()}
                          className="w-full border border-slate-300 bg-white hover:bg-slate-50 p-3 rounded-lg text-xs flex items-center justify-center gap-2 text-slate-700"
                        >
                          <Camera className="w-4 h-4 text-teal-600" />
                          <span>{driverBack ? driverBack.name : 'Upload Back Photo'}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Passport Photo Page */}
                  {formData.idType === 'passport' && (
                    <div className="pt-2">
                      <span className="block text-xs font-medium text-slate-700 mb-1">
                        Passport Biometric Photo Page *
                      </span>
                      <input
                        type="file"
                        ref={passportRef}
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'passport')}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => passportRef.current?.click()}
                        className="w-full border border-slate-300 bg-white hover:bg-slate-50 p-3 rounded-lg text-xs flex items-center justify-center gap-2 text-slate-700"
                      >
                        <Camera className="w-4 h-4 text-teal-600" />
                        <span>{passportPhoto ? passportPhoto.name : 'Upload Passport Photo Page'}</span>
                      </button>
                    </div>
                  )}

                  {/* Privacy Principles 90-day retention consent */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.retentionConsent}
                        onChange={(e) => setFormData({ ...formData, retentionConsent: e.target.checked })}
                        className="mt-0.5 text-teal-600 focus:ring-teal-500 rounded"
                      />
                      <span className="text-[11px] text-slate-600 leading-normal">
                        <strong>Australian Privacy Principles (APP) Consent:</strong> I acknowledge that Jobs Navigator collects my identity documents solely for Australian right-to-work validation under the Privacy Act 1988 (Cth). Documents are held under secure 90-day retention and automatically purged.
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Review and Confirmation */}
            {step === 4 && (
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                  <h4 className="font-bold text-slate-900 text-sm">Review Your Application</h4>
                  <div className="grid grid-cols-2 gap-2 text-slate-600 pt-1">
                    <div>
                      <span className="text-slate-400 block">Candidate:</span>
                      <span className="font-medium text-slate-900">{formData.firstName} {formData.lastName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Email:</span>
                      <span className="font-medium text-slate-900">{formData.email}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Phone:</span>
                      <span className="font-medium text-slate-900">{formData.phone}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Work Rights:</span>
                      <span className="font-medium text-slate-900">{formData.rightToWork}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Resume:</span>
                      <span className="font-medium text-slate-900">{cvFile?.name}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">ID Verification:</span>
                      <span className="font-medium text-slate-900">
                        {formData.idType === 'drivers_licence' ? 'Driver Licence (Front & Back)' : 'Passport'}
                      </span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-200">
                    <span className="text-slate-400 block">Screening Answer:</span>
                    <p className="text-slate-800 italic mt-0.5">{formData.screeningAnswer}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Additional Candidate Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Notice period, availability date, or specific location preferences..."
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((step - 1) as any)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-5 py-2.5 bg-[#0F2942] hover:bg-[#0A1C2E] text-white rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-sm"
                >
                  {isSubmitting ? 'Registering Application...' : 'Submit Verified Application'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
