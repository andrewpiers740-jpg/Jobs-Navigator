'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import { Job, INITIAL_JOBS, ApplicationRecord, INITIAL_APPLICATIONS, EmployerInquiry, INITIAL_EMPLOYER_INQUIRIES } from './data/jobs';
import { SITE } from '@/src/config/site';

const JOBS_STORAGE_KEY = 'jn_jobs_data_v1';
const APPLICATIONS_STORAGE_KEY = 'jn_applications_data_v1';
const EMPLOYERS_STORAGE_KEY = 'jn_employers_data_v1';
const ADMIN_AUTH_KEY = 'jn_admin_auth_v1';

export function getStoredJobs(): Job[] {
  if (typeof window === 'undefined') return INITIAL_JOBS;
  try {
    const raw = localStorage.getItem(JOBS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(INITIAL_JOBS));
      return INITIAL_JOBS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_JOBS;
  }
}

export function saveJob(job: Job): Job[] {
  const current = getStoredJobs();
  const existingIdx = current.findIndex(j => j.id === job.id);
  let updated: Job[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = job;
  } else {
    updated = [job, ...current];
  }
  if (typeof window !== 'undefined') {
    localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('jobs_updated'));
  }
  return updated;
}

export function deleteJob(id: string): Job[] {
  const current = getStoredJobs();
  const updated = current.filter(j => j.id !== id);
  if (typeof window !== 'undefined') {
    localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('jobs_updated'));
  }
  return updated;
}

export function getStoredApplications(): ApplicationRecord[] {
  if (typeof window === 'undefined') return INITIAL_APPLICATIONS;
  try {
    const raw = localStorage.getItem(APPLICATIONS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(INITIAL_APPLICATIONS));
      return INITIAL_APPLICATIONS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_APPLICATIONS;
  }
}

export function saveApplication(app: ApplicationRecord): ApplicationRecord[] {
  const current = getStoredApplications();
  const updated = [app, ...current];
  if (typeof window !== 'undefined') {
    localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('applications_updated'));
  }
  return updated;
}

export function updateApplicationStatus(id: string, status: ApplicationRecord['status']): ApplicationRecord[] {
  const current = getStoredApplications();
  const updated = current.map(a => a.id === id ? { ...a, status } : a);
  if (typeof window !== 'undefined') {
    localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('applications_updated'));
  }
  return updated;
}

export function getStoredEmployerInquiries(): EmployerInquiry[] {
  if (typeof window === 'undefined') return INITIAL_EMPLOYER_INQUIRIES;
  try {
    const raw = localStorage.getItem(EMPLOYERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(EMPLOYERS_STORAGE_KEY, JSON.stringify(INITIAL_EMPLOYER_INQUIRIES));
      return INITIAL_EMPLOYER_INQUIRIES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_EMPLOYER_INQUIRIES;
  }
}

export function saveEmployerInquiry(inquiry: EmployerInquiry): EmployerInquiry[] {
  const current = getStoredEmployerInquiries();
  const updated = [inquiry, ...current];
  if (typeof window !== 'undefined') {
    localStorage.setItem(EMPLOYERS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('employers_updated'));
  }
  return updated;
}

export function updateEmployerInquiryStatus(id: string, status: EmployerInquiry['status']): EmployerInquiry[] {
  const current = getStoredEmployerInquiries();
  const updated = current.map(e => e.id === id ? { ...e, status } : e);
  if (typeof window !== 'undefined') {
    localStorage.setItem(EMPLOYERS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('employers_updated'));
  }
  return updated;
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
}

export function verifyAdminPasscode(input: string): boolean {
  if (input === SITE.adminPasscode) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
    }
    return true;
  }
  return false;
}

export function adminSignOut(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
  }
}

const SAVED_JOBS_KEY = 'jn_saved_jobs_v1';
const EMPTY_SAVED_JOBS: string[] = [];

let cachedSavedJobIds: string[] = EMPTY_SAVED_JOBS;
let lastRawSavedJobs: string | null = null;

export function getSavedJobIds(): string[] {
  if (typeof window === 'undefined') return EMPTY_SAVED_JOBS;
  try {
    const raw = localStorage.getItem(SAVED_JOBS_KEY);
    if (raw === lastRawSavedJobs) {
      return cachedSavedJobIds;
    }
    lastRawSavedJobs = raw;
    if (!raw) {
      cachedSavedJobIds = EMPTY_SAVED_JOBS;
      return EMPTY_SAVED_JOBS;
    }
    const parsed = JSON.parse(raw);
    cachedSavedJobIds = Array.isArray(parsed) ? parsed : EMPTY_SAVED_JOBS;
    return cachedSavedJobIds;
  } catch {
    cachedSavedJobIds = EMPTY_SAVED_JOBS;
    return EMPTY_SAVED_JOBS;
  }
}

export function toggleSaveJob(id: string): string[] {
  if (typeof window === 'undefined') return EMPTY_SAVED_JOBS;
  const current = getSavedJobIds();
  const exists = current.includes(id);
  const updated = exists ? current.filter(item => item !== id) : [...current, id];
  try {
    const serialized = JSON.stringify(updated);
    localStorage.setItem(SAVED_JOBS_KEY, serialized);
    lastRawSavedJobs = serialized;
    cachedSavedJobIds = updated;
    window.dispatchEvent(new Event('saved_jobs_updated'));
  } catch {}
  return updated;
}

export function isJobSaved(id: string): boolean {
  if (typeof window === 'undefined') return false;
  return getSavedJobIds().includes(id);
}

function subscribeSavedJobs(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const handler = () => {
    const raw = localStorage.getItem(SAVED_JOBS_KEY);
    if (raw !== lastRawSavedJobs) {
      lastRawSavedJobs = raw;
      try {
        const parsed = raw ? JSON.parse(raw) : EMPTY_SAVED_JOBS;
        cachedSavedJobIds = Array.isArray(parsed) ? parsed : EMPTY_SAVED_JOBS;
      } catch {
        cachedSavedJobIds = EMPTY_SAVED_JOBS;
      }
    }
    callback();
  };
  window.addEventListener('saved_jobs_updated', handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener('saved_jobs_updated', handler);
    window.removeEventListener('storage', handler);
  };
}

const getServerSnapshot = (): string[] => EMPTY_SAVED_JOBS;

export function useSavedJobIds(): string[] {
  return useSyncExternalStore(
    subscribeSavedJobs,
    getSavedJobIds,
    getServerSnapshot
  );
}
