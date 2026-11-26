'use client';

import { useState, useRef } from 'react';
import { SITE } from '@/src/config/site';
import { saveApplication } from '@/lib/store';
import { ApplicationRecord } from '@/lib/data/jobs';
import { 
  X, 
  Upload, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle, 
  FileText, 
  Camera, 
  Share2 
} from 'lucide-react';

interface GeneralTalentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GeneralTalentModal({ isOpen, onClose }: GeneralTalentModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<ApplicationRecord | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    sector: 'Mining, Resources & Energy',
    desiredRole: '',
    locationPreference: 'All Australia',
    rightToWork: 'Australian Citizen',
    notes: '',
    idType: 'drivers_licence' as 'drivers_licence' | 'passport',
    retentionConsent: false,
  });

  const [cvFile, setCvFile] = useState<{ name: string; size: string; dataUrl?: string } | null>(null);
  const [driverFront, setDriverFront] = useState<{ name: string; dataUrl?: string } | null>(null);
  const [driverBack, setDriverBack] = useState<{ name: string; dataUrl?: string } | null>(null);
  const [passportPhoto, setPassportPhoto] = useState<{ name: string; dataUrl?: string } | null>(null);

  const cvInputRef = useRef<HTMLInputElement>(null);
  const driverFrontRef = useRef<HTMLInputElement>(null);
  const driverBackRef = useRef<HTMLInputElement>(null);
  const passportRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

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

      if (type === 'cv') setCvFile({ name: file.name, size: sizeStr, dataUrl });
      else if (type === 'driver_front') setDriverFront({ name: file.name, dataUrl });
      else if (type === 'driver_back') setDriverBack({ name: file.name, dataUrl });
      else if (type === 'passport') setPassportPhoto({ name: file.name, dataUrl });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg('Please enter your full name, email address, and contact phone.');
      return;
    }
    if (!cvFile) {
      setErrorMsg('Please upload your resume/CV for talent pool registration.');
      return;
    }
    if (formData.idType === 'drivers_licence' && (!driverFront || !driverBack)) {
      setErrorMsg('Both Front Photo AND Back Photo of your Australian Driver Licence are required.');
      return;
    }
    if (formData.idType === 'passport' && !passportPhoto) {
      setErrorMsg('Main Passport biometric photo page upload is required.');
      return;
    }
    if (!formData.retentionConsent) {
      setErrorMsg('Please accept the Australian Privacy Principles 90-day retention consent.');
      return;
    }

    setIsSubmitting(true);
    try {
      const refNumber = `JN-GEN-${Math.floor(1000 + Math.random() * 9000)}`;
      const newRecord: ApplicationRecord = {
        id: `gen-${Date.now()}`,
        referenceNumber: refNumber,
        jobId: 'GENERAL-POOL',
        jobTitle: `General Pool: ${formData.desiredRole || formData.sector}`,
        applicantName: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.locationPreference,
        rightToWork: formData.rightToWork,
        screeningAnswer: `Desired role: ${formData.desiredRole || 'General'}. Preferred sector: ${formData.sector}.`,
        cvFileName: cvFile?.name || 'Resume.pdf',
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
      setSubmitted(newRecord);
    } catch (err: any) {
      setErrorMsg(err.message || 'Submission error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSubmitted(null);
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        <div className="bg-[#0F2942] text-white p-5 flex items-start justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">National Australian Talent Pool</span>
            <h3 className="text-xl font-bold tracking-tight text-white mt-0.5">
              Submit Expression of Interest
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Join Jobs Navigator&apos;s verified candidate database across all 8 Australian States & Territories.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {submitted ? (
          <div className="p-6 sm:p-8 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-900">Talent Pool Registration Complete</h4>
              <p className="text-sm text-slate-600 mt-1">
                Your profile and verified credentials have been saved under registration code:
              </p>
              <div className="mt-2 inline-block px-4 py-2 bg-slate-100 border border-slate-300 rounded-lg font-mono text-base font-bold text-slate-900">
                {submitted.referenceNumber}
              </div>
            </div>

            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              When leading Australian employers request pre-screened talent in {formData.sector}, our recruitment coordinators will present your profile directly.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
                  `Hi ${SITE.name}, I have just registered my CV with reference ${submitted.referenceNumber} in the ${formData.sector} talent pool.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs uppercase tracking-wider transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Message Recruiter on WhatsApp</span>
              </a>
              <button
                onClick={handleClose}
                className="px-5 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold uppercase tracking-wider"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                <strong>Domestic Australian Policy:</strong> Open strictly to Australian Citizens, Permanent Residents, and onshore residents living in Australia with valid work rights. Offshore/foreign applications are not supported.
              </span>
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2 text-xs text-rose-700">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
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
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email *</label>
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
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="0489 989 442"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Sector *</label>
                <select
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {SITE.sectors.map((s) => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Desired Job Title / Trade</label>
                <input
                  type="text"
                  value={formData.desiredRole}
                  onChange={(e) => setFormData({ ...formData, desiredRole: e.target.value })}
                  placeholder="e.g. FIFO Electrician, RN, Civil PM"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Work Rights in Australia</label>
                <select
                  value={formData.rightToWork}
                  onChange={(e) => setFormData({ ...formData, rightToWork: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {SITE.workRightsOptions.map((w) => (
                    <option key={w.id} value={w.label}>{w.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Resume Upload */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Upload Resume / CV *
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
                className="border-2 border-dashed border-slate-300 hover:border-teal-500 p-3.5 rounded-xl text-center cursor-pointer transition-colors bg-slate-50"
              >
                {cvFile ? (
                  <div className="flex items-center justify-center gap-2 text-teal-700 text-xs font-semibold">
                    <FileText className="w-4 h-4" />
                    <span>{cvFile.name} ({cvFile.size})</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
                    <Upload className="w-4 h-4 text-slate-400" />
                    <span>Click to select PDF or Word document</span>
                  </div>
                )}
              </div>
            </div>

            {/* Compulsory ID Upload */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Compulsory Identity Document</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, idType: 'drivers_licence' })}
                    className={`text-[11px] px-2 py-0.5 rounded ${
                      formData.idType === 'drivers_licence' ? 'bg-[#0F2942] text-white' : 'text-slate-600'
                    }`}
                  >
                    Driver Licence
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, idType: 'passport' })}
                    className={`text-[11px] px-2 py-0.5 rounded ${
                      formData.idType === 'passport' ? 'bg-[#0F2942] text-white' : 'text-slate-600'
                    }`}
                  >
                    Passport
                  </button>
                </div>
              </div>

              {formData.idType === 'drivers_licence' ? (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
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
                      className="w-full bg-white border border-slate-300 p-2 rounded text-xs flex items-center justify-center gap-1.5 text-slate-700"
                    >
                      <Camera className="w-3.5 h-3.5 text-teal-600" />
                      <span className="truncate">{driverFront ? driverFront.name : 'Front Photo'}</span>
                    </button>
                  </div>
                  <div>
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
                      className="w-full bg-white border border-slate-300 p-2 rounded text-xs flex items-center justify-center gap-1.5 text-slate-700"
                    >
                      <Camera className="w-3.5 h-3.5 text-teal-600" />
                      <span className="truncate">{driverBack ? driverBack.name : 'Back Photo'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="pt-1">
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
                    className="w-full bg-white border border-slate-300 p-2 rounded text-xs flex items-center justify-center gap-1.5 text-slate-700"
                  >
                    <Camera className="w-3.5 h-3.5 text-teal-600" />
                    <span className="truncate">{passportPhoto ? passportPhoto.name : 'Passport Photo Page'}</span>
                  </button>
                </div>
              )}

              <label className="flex items-start gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.retentionConsent}
                  onChange={(e) => setFormData({ ...formData, retentionConsent: e.target.checked })}
                  className="mt-0.5 text-teal-600 focus:ring-teal-500 rounded"
                />
                <span className="text-[10px] text-slate-600 leading-tight">
                  I consent to identity document retention for up to 90 days in accordance with the Australian Privacy Principles (Privacy Act 1988).
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              {isSubmitting ? 'Registering Talent Profile...' : 'Submit to Australian Talent Pool'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
