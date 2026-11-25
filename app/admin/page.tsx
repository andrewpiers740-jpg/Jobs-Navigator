'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Users, 
  Briefcase, 
  Building2, 
  Search, 
  Filter, 
  FileText, 
  Camera, 
  Share2, 
  Phone, 
  Mail, 
  Plus, 
  Trash2, 
  LogOut, 
  Eye, 
  X,
  AlertCircle 
} from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SITE } from '@/src/config/site';
import { 
  Job, 
  INITIAL_JOBS, 
  ApplicationRecord, 
  EmployerInquiry, 
  INITIAL_APPLICATIONS, 
  INITIAL_EMPLOYER_INQUIRIES 
} from '@/lib/data/jobs';
import { 
  getStoredJobs, 
  saveJob, 
  deleteJob, 
  getStoredApplications, 
  updateApplicationStatus, 
  getStoredEmployerInquiries, 
  updateEmployerInquiryStatus, 
  isAdminAuthenticated, 
  verifyAdminPasscode, 
  adminSignOut 
} from '@/lib/store';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Dashboard tab
  const [activeTab, setActiveTab] = useState<'applications' | 'jobs' | 'employers'>('applications');

  // Stored state
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [employers, setEmployers] = useState<EmployerInquiry[]>([]);

  // Search & Filters
  const [candidateSearch, setCandidateSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Selected modals
  const [viewingCandidate, setViewingCandidate] = useState<ApplicationRecord | null>(null);
  const [newJobModalOpen, setNewJobModalOpen] = useState(false);

  // New Job Form State
  const [newJob, setNewJob] = useState({
    title: '',
    sectorId: 'mining-resources',
    sectorName: 'Mining, Resources & Energy',
    location: '',
    state: 'WA' as Job['state'],
    workType: 'Full-Time' as Job['workType'],
    salary: '$120,000 - $140,000',
    superannuation: '+ 11.5% Superannuation',
    employer: 'Australian Enterprise Partner',
    confidentialEmployer: true,
    featured: false,
    urgent: false,
    visaSponsorshipEligible: false,
    overview: '',
    screeningQuestion: 'Do you hold relevant Australian trade or professional credentials?',
  });

  const loadData = useCallback(() => {
    setApplications(getStoredApplications());
    setJobs(getStoredJobs());
    setEmployers(getStoredEmployerInquiries());
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const auth = isAdminAuthenticated();
      if (auth) {
        setIsAuthenticated(true);
        loadData();
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [loadData]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const valid = verifyAdminPasscode(passcode);
    if (valid) {
      setIsAuthenticated(true);
      loadData();
    } else {
      setAuthError('Incorrect secret passcode. Access denied.');
    }
  };

  const handleSignOut = () => {
    adminSignOut();
    setIsAuthenticated(false);
    setPasscode('');
  };

  const handleStatusChange = (appId: string, newStatus: ApplicationRecord['status']) => {
    const updated = updateApplicationStatus(appId, newStatus);
    setApplications(updated);
    if (viewingCandidate && viewingCandidate.id === appId) {
      setViewingCandidate({ ...viewingCandidate, status: newStatus });
    }
  };

  const handleEmployerStatusChange = (empId: string, newStatus: EmployerInquiry['status']) => {
    const updated = updateEmployerInquiryStatus(empId, newStatus);
    setEmployers(updated);
  };

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.title.trim() || !newJob.location.trim()) return;

    const sectorObj = SITE.sectors.find(s => s.id === newJob.sectorId);
    const createdJob: Job = {
      id: `JN-${newJob.state}-${Math.floor(100 + Math.random() * 900)}`,
      title: newJob.title,
      sectorId: newJob.sectorId,
      sectorName: sectorObj ? sectorObj.name : newJob.sectorName,
      location: newJob.location,
      state: newJob.state,
      workType: newJob.workType,
      salary: newJob.salary,
      superannuation: newJob.superannuation,
      employer: newJob.employer,
      confidentialEmployer: newJob.confidentialEmployer,
      featured: newJob.featured,
      urgent: newJob.urgent,
      visaSponsorshipEligible: newJob.visaSponsorshipEligible,
      postedDate: 'Today',
      overview: newJob.overview || 'Immediate vacancy with high growth potential.',
      responsibilities: ['Perform tasks in accordance with Australian standards and company safety protocols.'],
      requirements: ['Valid Australian work rights and relevant certification.'],
      benefits: ['Competitive remuneration and modern working environment.'],
      screeningQuestion: newJob.screeningQuestion,
    };

    saveJob(createdJob);
    setJobs(getStoredJobs());
    setNewJobModalOpen(false);
  };

  const handleDeleteJob = (id: string) => {
    if (confirm('Are you sure you want to delete this job listing?')) {
      deleteJob(id);
      setJobs(getStoredJobs());
    }
  };

  const filteredCandidates = applications.filter((app) => {
    if (statusFilter !== 'ALL' && app.status !== statusFilter) return false;
    if (candidateSearch.trim()) {
      const q = candidateSearch.toLowerCase();
      return (
        app.applicantName.toLowerCase().includes(q) ||
        app.jobTitle.toLowerCase().includes(q) ||
        app.referenceNumber.toLowerCase().includes(q) ||
        app.email.toLowerCase().includes(q) ||
        app.phone.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F5F9]">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
        {/* Passcode Login Modal / Gate */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto my-12 bg-white rounded-2xl border border-slate-200 p-8 shadow-xl text-center space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-[#0F2942] text-white flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7 text-teal-400" />
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">Internal Verification Hub</span>
              <h1 className="text-2xl font-extrabold text-slate-900 mt-1">Jobs Navigator Admin Access</h1>
              <p className="text-xs text-slate-500 mt-1">
                Enter your authorized administrative passcode to manage applications, candidates, and job postings.
              </p>
            </div>

            {authError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2 text-xs text-rose-700 text-left">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  required
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter secret passcode..."
                  className="w-full px-4 py-3 text-center text-base tracking-widest font-mono border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#0F2942] hover:bg-[#0A1C2E] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm"
              >
                Authenticate & Enter Portal
              </button>
            </form>

            <div className="pt-2 text-[11px] text-slate-400">
              Compliant with Australian Privacy Principles (90-Day Retention Schedule)
            </div>
          </div>
        ) : (
          /* AUTHENTICATED ADMIN DASHBOARD */
          <div className="space-y-8">
            {/* Top Hub Bar */}
            <div className="bg-[#0F2942] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Admin Operations & Right-to-Work Oversight</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  Jobs Navigator Management Portal
                </h1>
                <p className="text-xs text-slate-300 mt-1">
                  Encrypted 90-day candidate vault · Australian Privacy Act 1988 Compliance
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setNewJobModalOpen(true)}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Post New Job</span>
                </button>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 border border-slate-600 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Quick KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs text-slate-500 font-medium">Total Lodged Applications</span>
                <p className="text-2xl font-bold font-mono text-slate-900 mt-1">{applications.length}</p>
                <span className="text-[11px] text-teal-700 font-semibold">100% ID Screened</span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs text-slate-500 font-medium">Active Board Jobs</span>
                <p className="text-2xl font-bold font-mono text-slate-900 mt-1">{jobs.length}</p>
                <span className="text-[11px] text-slate-500">Across 8 States</span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs text-slate-500 font-medium">Employer Requests</span>
                <p className="text-2xl font-bold font-mono text-slate-900 mt-1">{employers.length}</p>
                <span className="text-[11px] text-teal-700 font-semibold">In Intake Pipeline</span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs text-slate-500 font-medium">Shortlisted Candidates</span>
                <p className="text-2xl font-bold font-mono text-emerald-700 mt-1">
                  {applications.filter(a => a.status === 'Shortlisted' || a.status === 'Interviewing').length}
                </p>
                <span className="text-[11px] text-slate-500">Ready for Interview</span>
              </div>
            </div>

            {/* Tabs Bar */}
            <div className="flex border-b border-slate-200 gap-2">
              <button
                onClick={() => setActiveTab('applications')}
                className={`py-3 px-5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors ${
                  activeTab === 'applications'
                    ? 'border-teal-600 text-teal-700'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Applications & Candidates ({applications.length})
              </button>
              <button
                onClick={() => setActiveTab('jobs')}
                className={`py-3 px-5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors ${
                  activeTab === 'jobs'
                    ? 'border-teal-600 text-teal-700'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Job Listings Management ({jobs.length})
              </button>
              <button
                onClick={() => setActiveTab('employers')}
                className={`py-3 px-5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors ${
                  activeTab === 'employers'
                    ? 'border-teal-600 text-teal-700'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Employer Intake Inquiries ({employers.length})
              </button>
            </div>

            {/* TAB 1: APPLICATIONS LIST */}
            {activeTab === 'applications' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-5 sm:p-6">
                {/* Search & Filter Header */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="relative flex-grow max-w-md">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={candidateSearch}
                      onChange={(e) => setCandidateSearch(e.target.value)}
                      placeholder="Search candidate name, job title, email, or reference..."
                      className="w-full pl-10 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-medium">Filter Status:</span>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-slate-50 text-slate-800"
                    >
                      <option value="ALL">All Statuses</option>
                      <option value="Pending">Pending</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Interviewing">Interviewing</option>
                      <option value="Placed">Placed</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>
                </div>

                {/* Applications Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 bg-slate-50 font-semibold uppercase tracking-wider">
                        <th className="py-3 px-3">Ref Code</th>
                        <th className="py-3 px-3">Candidate</th>
                        <th className="py-3 px-3">Applied Position</th>
                        <th className="py-3 px-3">Work Rights</th>
                        <th className="py-3 px-3">ID Verification</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredCandidates.map((app) => (
                        <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                            {app.referenceNumber}
                          </td>
                          <td className="py-3.5 px-3 whitespace-nowrap">
                            <span className="font-bold text-slate-900 block">{app.applicantName}</span>
                            <span className="text-slate-400 text-[11px]">{app.email} · {app.phone}</span>
                          </td>
                          <td className="py-3.5 px-3 max-w-[200px] truncate text-slate-700">
                            {app.jobTitle}
                          </td>
                          <td className="py-3.5 px-3 whitespace-nowrap">
                            <span className="text-teal-800 font-medium">{app.rightToWork}</span>
                          </td>
                          <td className="py-3.5 px-3 whitespace-nowrap">
                            {app.idType === 'drivers_licence' ? (
                              <span className="text-slate-600">Driver Licence (Front & Back)</span>
                            ) : (
                              <span className="text-slate-600">Passport Photo Page</span>
                            )}
                          </td>
                          <td className="py-3.5 px-3 whitespace-nowrap">
                            <select
                              value={app.status}
                              onChange={(e) => handleStatusChange(app.id, e.target.value as any)}
                              className={`text-[11px] font-semibold px-2 py-1 rounded border ${
                                app.status === 'Shortlisted'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : app.status === 'Interviewing'
                                  ? 'bg-blue-50 text-blue-800 border-blue-300'
                                  : app.status === 'Placed'
                                  ? 'bg-purple-50 text-purple-800 border-purple-300'
                                  : 'bg-amber-50 text-amber-800 border-amber-300'
                              }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Shortlisted">Shortlisted</option>
                              <option value="Interviewing">Interviewing</option>
                              <option value="Placed">Placed</option>
                              <option value="Archived">Archived</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-3 text-right whitespace-nowrap">
                            <button
                              onClick={() => setViewingCandidate(app)}
                              className="px-3 py-1 bg-slate-100 hover:bg-[#0F2942] hover:text-white rounded text-[11px] font-semibold transition-colors"
                            >
                              Review Dossier
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 2: JOBS MANAGEMENT */}
            {activeTab === 'jobs' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-base font-bold text-slate-900">Active Board Postings</h3>
                  <button
                    onClick={() => setNewJobModalOpen(true)}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Post New Vacancy</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 bg-slate-50 font-semibold uppercase tracking-wider">
                        <th className="py-3 px-3">ID</th>
                        <th className="py-3 px-3">Title</th>
                        <th className="py-3 px-3">Sector</th>
                        <th className="py-3 px-3">Location</th>
                        <th className="py-3 px-3">Salary (+ Super)</th>
                        <th className="py-3 px-3">Type</th>
                        <th className="py-3 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {jobs.map((j) => (
                        <tr key={j.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-3 font-mono font-bold text-slate-800">{j.id}</td>
                          <td className="py-3 px-3 font-semibold text-slate-900">{j.title}</td>
                          <td className="py-3 px-3 text-teal-800">{j.sectorName}</td>
                          <td className="py-3 px-3 text-slate-600">{j.location}</td>
                          <td className="py-3 px-3 font-medium text-slate-900">{j.salary}</td>
                          <td className="py-3 px-3 text-slate-600">{j.workType}</td>
                          <td className="py-3 px-3 text-right">
                            <button
                              onClick={() => handleDeleteJob(j.id)}
                              className="text-rose-600 hover:text-rose-800 p-1"
                              title="Delete Job"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: EMPLOYER INQUIRIES */}
            {activeTab === 'employers' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
                  Incoming Employer Staffing Requests
                </h3>

                <div className="space-y-4">
                  {employers.map((emp) => (
                    <div key={emp.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <span className="font-bold text-sm text-slate-900">{emp.companyName}</span>
                          <span className="text-slate-400 mx-2">·</span>
                          <span className="text-slate-600">{emp.contactName} ({emp.phone} · {emp.email})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={emp.status}
                            onChange={(e) => handleEmployerStatusChange(emp.id, e.target.value as any)}
                            className="px-2 py-1 bg-white border border-slate-300 rounded text-xs font-semibold"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Proposal Sent">Proposal Sent</option>
                            <option value="Archived">Archived</option>
                          </select>
                          <a
                            href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
                              `*${SITE.name} Admin:* Contacting regarding employer request ${emp.id} for ${emp.companyName}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded"
                            title="Direct WhatsApp"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-slate-600">
                        <div><strong>Target Role:</strong> {emp.roleTitle}</div>
                        <div><strong>Sector:</strong> {emp.sector}</div>
                        <div><strong>Budget:</strong> {emp.estimatedSalary}</div>
                      </div>

                      {emp.requirements && (
                        <p className="text-slate-700 bg-white p-2.5 rounded border border-slate-200 italic mt-1">
                          &quot;{emp.requirements}&quot;
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* CANDIDATE DOSSIER MODAL */}
      {viewingCandidate && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
            <div className="bg-[#0F2942] text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-teal-400 font-bold">{viewingCandidate.referenceNumber}</span>
                <h3 className="text-xl font-bold text-white mt-0.5">{viewingCandidate.applicantName}</h3>
                <p className="text-xs text-slate-300">{viewingCandidate.jobTitle}</p>
              </div>
              <button
                onClick={() => setViewingCandidate(null)}
                className="text-slate-300 hover:text-white p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
              {/* Contact info grid */}
              <div className="p-4 bg-slate-50 rounded-xl grid grid-cols-2 gap-3">
                <div>
                  <strong className="block text-slate-400">Email:</strong>
                  <a href={`mailto:${viewingCandidate.email}`} className="text-teal-700 font-semibold hover:underline">
                    {viewingCandidate.email}
                  </a>
                </div>
                <div>
                  <strong className="block text-slate-400">Phone:</strong>
                  <a href={`tel:${viewingCandidate.phone}`} className="text-teal-700 font-semibold hover:underline">
                    {viewingCandidate.phone}
                  </a>
                </div>
                <div>
                  <strong className="block text-slate-400">Location:</strong>
                  <span className="text-slate-900">{viewingCandidate.location}</span>
                </div>
                <div>
                  <strong className="block text-slate-400">Work Rights:</strong>
                  <span className="text-teal-800 font-bold">{viewingCandidate.rightToWork}</span>
                </div>
              </div>

              {/* Screening Question & Answer */}
              <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl space-y-1">
                <span className="font-bold uppercase tracking-wider text-teal-900 text-[10px]">
                  Candidate Screening Answer:
                </span>
                <p className="text-xs text-teal-950 font-medium leading-relaxed">
                  {viewingCandidate.screeningAnswer}
                </p>
              </div>

              {/* Uploaded Documents Preview */}
              <div className="space-y-3">
                <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] block">
                  Candidate Dossier Attachments
                </span>

                <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-5 h-5 text-teal-600" />
                    <div>
                      <p className="font-semibold text-slate-900">{viewingCandidate.cvFileName}</p>
                      <p className="text-[10px] text-slate-400">{viewingCandidate.cvFileSize}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-white border border-slate-300 rounded text-[11px] font-semibold text-slate-700">
                    CV Verified
                  </span>
                </div>

                {/* ID Verification Info */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">
                      Identity Verification: {viewingCandidate.idType === 'drivers_licence' ? 'Australian Driver Licence' : 'Passport'}
                    </span>
                    <span className="text-[10px] text-teal-700 font-semibold">90-Day Retention Active</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                    {viewingCandidate.idType === 'drivers_licence' ? (
                      <>
                        <div className="p-2 bg-white rounded border border-slate-200 flex items-center gap-1.5">
                          <Camera className="w-3.5 h-3.5 text-teal-600" />
                          <span className="truncate">{viewingCandidate.idFrontFileName || 'Front Photo Captured'}</span>
                        </div>
                        <div className="p-2 bg-white rounded border border-slate-200 flex items-center gap-1.5">
                          <Camera className="w-3.5 h-3.5 text-teal-600" />
                          <span className="truncate">{viewingCandidate.idBackFileName || 'Back Photo Captured'}</span>
                        </div>
                      </>
                    ) : (
                      <div className="col-span-2 p-2 bg-white rounded border border-slate-200 flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5 text-teal-600" />
                        <span className="truncate">{viewingCandidate.passportFileName || 'Passport Photo Page Captured'}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Status Update & Contact shortcuts */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700">Change Status:</span>
                  <select
                    value={viewingCandidate.status}
                    onChange={(e) => handleStatusChange(viewingCandidate.id, e.target.value as any)}
                    className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded font-semibold text-xs"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Placed">Placed</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${viewingCandidate.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `*${SITE.name}*: Hello ${viewingCandidate.applicantName}, we are following up on your application (${viewingCandidate.referenceNumber}) for ${viewingCandidate.jobTitle}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold flex items-center gap-1"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>WhatsApp Candidate</span>
                  </a>
                  <a
                    href={`tel:${viewingCandidate.phone}`}
                    className="px-3 py-1.5 bg-[#0F2942] hover:bg-slate-800 text-white rounded text-xs font-semibold flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* POST NEW JOB MODAL */}
      {newJobModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="bg-[#0F2942] text-white p-5 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Post New Australian Job Listing</h3>
              <button onClick={() => setNewJobModalOpen(false)} className="text-slate-300 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  value={newJob.title}
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  placeholder="e.g. Heavy Diesel Fitter - FIFO"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Sector *</label>
                  <select
                    value={newJob.sectorId}
                    onChange={(e) => {
                      const sec = SITE.sectors.find(s => s.id === e.target.value);
                      setNewJob({
                        ...newJob,
                        sectorId: e.target.value,
                        sectorName: sec ? sec.name : ''
                      });
                    }}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  >
                    {SITE.sectors.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">State / Territory *</label>
                  <select
                    value={newJob.state}
                    onChange={(e) => setNewJob({ ...newJob, state: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  >
                    {SITE.states.filter(s => s.code !== 'ALL').map((s) => (
                      <option key={s.code} value={s.code}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Location Details *</label>
                  <input
                    type="text"
                    required
                    value={newJob.location}
                    onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                    placeholder="e.g. Perth / Pilbara 2:1"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Work Type</label>
                  <select
                    value={newJob.workType}
                    onChange={(e) => setNewJob({ ...newJob, workType: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  >
                    {SITE.workTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Remuneration</label>
                  <input
                    type="text"
                    value={newJob.salary}
                    onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                    placeholder="e.g. $140,000 - $165,000"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Superannuation Note</label>
                  <input
                    type="text"
                    value={newJob.superannuation}
                    onChange={(e) => setNewJob({ ...newJob, superannuation: e.target.value })}
                    placeholder="+ 11.5% Superannuation"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Overview Description</label>
                <textarea
                  rows={2}
                  value={newJob.overview}
                  onChange={(e) => setNewJob({ ...newJob, overview: e.target.value })}
                  placeholder="Summary of responsibilities and site roster..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Mandatory Screening Question *</label>
                <input
                  type="text"
                  required
                  value={newJob.screeningQuestion}
                  onChange={(e) => setNewJob({ ...newJob, screeningQuestion: e.target.value })}
                  placeholder="e.g. Do you hold a Certificate III in Mobile Plant Technology?"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setNewJobModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-bold uppercase tracking-wider"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
