'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Menu, X, ShieldCheck, Lock, Calculator } from 'lucide-react';
import { SITE } from '@/src/config/site';
import SuperCalculatorModal from '@/components/SuperCalculatorModal';

interface NavbarProps {
  onOpenTalentModal?: () => void;
  onOpenSuperModal?: () => void;
}

export default function Navbar({ onOpenTalentModal, onOpenSuperModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [superModalOpen, setSuperModalOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Browse Jobs', href: '/jobs' },
    { label: 'Sectors', href: '/sectors' },
    { label: 'Employers', href: '/employers' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#0F2942] border-b border-[#1E3A5F] text-white">
        {/* Top micro-bar for trust markers */}
        <div className="bg-[#0A1C2E] text-slate-300 text-xs py-1.5 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-teal-400" />
              <span>Australian Recruitment & Talent Matching</span>
              <span className="text-slate-500">·</span>
              <span className="hidden sm:inline">VEVO Verified Work Rights · 11.5% Superannuation Guarantee</span>
            </div>
            <div className="flex items-center gap-4 text-slate-300">
              <a
                href={SITE.abnLookupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex items-center gap-1 text-slate-300 hover:text-teal-300 transition-colors"
                title="Verify Jobs Navigator on the Australian Business Register"
              >
                <span className="text-teal-400 font-semibold">ABN:</span>
                <span className="underline decoration-slate-600 underline-offset-2">{SITE.abn}</span>
              </a>
              <span className="text-slate-600 hidden lg:inline">·</span>
              <button
                onClick={() => (onOpenSuperModal ? onOpenSuperModal() : setSuperModalOpen(true))}
                className="hidden md:inline-flex items-center gap-1 text-teal-300 hover:text-white transition-colors"
              >
                <Calculator className="w-3 h-3" />
                <span>Pay & Super Calculator</span>
              </button>
              <span className="text-slate-600 hidden md:inline">·</span>
              <span className="hidden sm:inline">Adelaide HQ: {SITE.phoneFormatted}</span>
              <Link 
                href="/admin" 
                className="inline-flex items-center gap-1 hover:text-teal-300 transition-colors"
              >
                <Lock className="w-3 h-3" />
                <span>Admin Hub</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Top Bar Contract: Zone 1 (Brand) - Zone 2 (4-5 Nav links) - Zone 3 (1 Primary action) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single text element with icon mark) */}
          <Link 
            href="/" 
            className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
          >
            <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center text-white shadow-sm">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span>Jobs Navigator</span>
          </Link>

          {/* Zone 2: Single-line clean navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-200">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b-2 ${
                    isActive
                      ? 'text-teal-400 border-teal-400 font-semibold'
                      : 'text-slate-200 hover:text-white border-transparent'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <Link
              href="/employers"
              className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-teal-300 hover:text-white border border-teal-500/40 rounded-lg hover:border-teal-400 transition-colors whitespace-nowrap shrink-0"
            >
              Post a Vacancy
            </Link>
            <button
              onClick={onOpenTalentModal}
              className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-teal-600 hover:bg-teal-500 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0"
            >
              Submit CV
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0A1C2E] border-t border-[#1E3A5F] px-4 py-5 space-y-3">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === item.href ? 'bg-teal-700/40 text-teal-300' : 'text-slate-200 hover:bg-[#1E3A5F]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="pt-3 border-t border-slate-700/60 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSuperModalOpen(true);
                }}
                className="w-full text-center py-2 px-3 text-xs font-medium text-teal-300 bg-slate-800/80 rounded-lg flex items-center justify-center gap-1.5"
              >
                <Calculator className="w-4 h-4" />
                <span>Superannuation & Pay Calculator</span>
              </button>
              <Link
                href="/employers"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-teal-300 border border-teal-500/40 rounded-lg"
              >
                For Employers: Post Vacancy
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenTalentModal) onOpenTalentModal();
                }}
                className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-teal-600 rounded-lg"
              >
                Submit CV to Talent Pool
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Pay & Super Calculator Modal */}
      <SuperCalculatorModal
        isOpen={superModalOpen}
        onClose={() => setSuperModalOpen(false)}
      />
    </>
  );
}
