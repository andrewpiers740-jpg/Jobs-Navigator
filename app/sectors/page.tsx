'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Pickaxe, 
  Stethoscope, 
  HardHat, 
  Laptop, 
  Truck, 
  TrendingUp, 
  Coffee, 
  FileText, 
  GraduationCap, 
  Megaphone, 
  Wheat, 
  Scale, 
  ArrowRight, 
  DollarSign, 
  ShieldCheck, 
  Users 
} from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatHub from '@/components/ChatHub';
import PrivacyBanner from '@/components/PrivacyBanner';
import GeneralTalentModal from '@/components/GeneralTalentModal';

import { SITE } from '@/src/config/site';

export default function SectorsPage() {
  const [talentModalOpen, setTalentModalOpen] = useState(false);

  const sectorDetails = [
    {
      id: 'mining-resources',
      name: 'Mining, Resources & Energy',
      icon: Pickaxe,
      avgSalary: '$130,000 - $185,000 + Super',
      inDemand: ['Heavy Diesel Fitters', 'Boilermakers / Welders', 'Mining Engineers', 'Auto Electricians', 'Plant Operators'],
      description: 'Major open-cut, underground, and regional operations across Western Australia (Pilbara/Goldfields), Queensland (Bowen Basin), and South Australia (Olympic Dam).',
      hotspots: 'Perth, Karratha, Newman, Mackay, Roxby Downs',
      domesticFocus: 'Immediate local placement for trade-qualified Australian residents.'
    },
    {
      id: 'healthcare-medical',
      name: 'Healthcare & Medical',
      icon: Stethoscope,
      avgSalary: '$85,000 - $140,000 + Super',
      inDemand: ['Registered Nurses (RN)', 'Aged Care Nurses', 'General Practitioners', 'Sonographers & Radiographers', 'Occupational Therapists'],
      description: 'Direct placements in Australian metropolitan tertiary hospitals, regional community clinics, and accredited residential aged care providers.',
      hotspots: 'Melbourne, Sydney, Brisbane, Adelaide, Regional Victoria/NSW',
      domesticFocus: 'High domestic demand for AHPRA-registered Australian nurses and clinicians.'
    },
    {
      id: 'trades-construction',
      name: 'Trades, Construction & Engineering',
      icon: HardHat,
      avgSalary: '$90,000 - $145,000 + Super',
      inDemand: ['A-Grade Electricians', 'Commercial Plumbers', 'Carpenters & Joiners', 'Civil Project Managers', 'Site Supervisors'],
      description: 'Infrastructure and commercial construction projects fueled by state transport upgrades, renewable energy zones, and housing developments.',
      hotspots: 'Sydney, Brisbane, Melbourne, Perth, Canberra',
      domesticFocus: 'Strong local hiring across major state infrastructure and domestic projects.'
    },
    {
      id: 'it-digital',
      name: 'Information Technology & Digital',
      icon: Laptop,
      avgSalary: '$110,000 - $170,000 + Super',
      inDemand: ['Full-Stack Engineers (React/Node)', 'Cloud DevOps (AWS/Azure)', 'Cybersecurity Specialists', 'Data Engineers', 'Product Managers'],
      description: 'Dynamic Australian tech hubs powering enterprise SaaS, financial technologies, government digital services, and healthtech innovation.',
      hotspots: 'Sydney, Melbourne, Brisbane, Adelaide Tech precincts',
      domesticFocus: 'Direct hiring for Australian onshore software and cloud professionals.'
    },
    {
      id: 'transport-logistics',
      name: 'Transport, Logistics & Warehousing',
      icon: Truck,
      avgSalary: '$75,000 - $115,000 + Super',
      inDemand: ['HC & MC Truck Drivers', 'Forklift Operators (LF/LO)', 'Warehouse Shift Managers', 'Supply Chain Planners'],
      description: 'National freight routes, intermodal hubs, cold-chain distribution, and port operations supporting the Australian retail and industrial supply chain.',
      hotspots: 'Melbourne West, Western Sydney, Brisbane South, Adelaide Outer',
      domesticFocus: 'Continuous domestic driver demand across interstate and metropolitan networks.'
    },
    {
      id: 'accounting-finance',
      name: 'Accounting, Finance & Banking',
      icon: TrendingUp,
      avgSalary: '$85,000 - $155,000 + Super',
      inDemand: ['Senior Bookkeepers (STP/BAS)', 'Chartered Accountants (CA/CPA)', 'Commercial Analysts', 'Credit Assessors'],
      description: 'Boutique advisory firms, ASX-listed corporations, and mid-tier accountancies delivering financial governance and wealth management.',
      hotspots: 'Sydney CBD, Melbourne CBD, Perth, Brisbane',
      domesticFocus: 'Excellent career mobility for local CA/CPA qualified professionals.'
    },
    {
      id: 'retail-hospitality',
      name: 'Retail, Hospitality & Tourism',
      icon: Coffee,
      avgSalary: '$65,000 - $95,000 + Super',
      inDemand: ['Duty Managers / Venue Managers', 'Executive & Head Chefs', 'Hotel Operations Supervisors', 'Retail Store Managers'],
      description: 'Vibrant Australian dining, coastal resort tourism, and premier retail establishments from tropical Queensland to regional wine regions.',
      hotspots: 'Gold Coast, Sydney, Melbourne, Whitsundays, Barossa Valley',
      domesticFocus: 'High local demand for Australian chefs, venue managers, and supervisors.'
    },
    {
      id: 'education-training',
      name: 'Education & Training',
      icon: GraduationCap,
      avgSalary: '$80,000 - $115,000 + Super',
      inDemand: ['Secondary STEM Teachers', 'Early Childhood Educators (ECT)', 'Special Education Teachers', 'VET Trainers'],
      description: 'Government, Catholic, and independent school networks, alongside early learning centres with high staff-to-child ratios.',
      hotspots: 'All Australian States (Metro and Regional incentive zones)',
      domesticFocus: 'State-backed incentives and retention bonuses for Australian registered teachers.'
    },
    {
      id: 'manufacturing-agri',
      name: 'Manufacturing & Agribusiness',
      icon: Wheat,
      avgSalary: '$80,000 - $130,000 + Super',
      inDemand: ['Agronomists', 'Food Production Managers', 'Automation Technicians', 'Station Hand Supervisors', 'Maintenance Fitters'],
      description: 'High-tech Australian manufacturing, grain cropping, horticulture, and livestock operations across regional Australia.',
      hotspots: 'Regional NSW, Riverland SA, Darling Downs QLD, Regional WA',
      domesticFocus: 'Direct residential and seasonal career opportunities for local Australians.'
    },
    {
      id: 'sales-marketing',
      name: 'Sales, Marketing & Communications',
      icon: Megaphone,
      avgSalary: '$85,000 - $140,000 + Super',
      inDemand: ['Performance Marketing Leads', 'B2B Business Development Managers', 'Content & Brand Strategists', 'Account Directors'],
      description: 'Driving growth for Australian national brands, technology ventures, and commercial service providers.',
      hotspots: 'Sydney, Melbourne, Brisbane',
      domesticFocus: 'Expanding national accounts for onshore commercial representatives.'
    },
    {
      id: 'admin-office',
      name: 'Administration & Office Support',
      icon: FileText,
      avgSalary: '$65,000 - $90,000 + Super',
      inDemand: ['Executive Assistants', 'Office Managers', 'Legal Secretaries', 'Customer Experience Coordinators'],
      description: 'Essential operational support across legal, medical, corporate, and government institutions.',
      hotspots: 'All Capital Cities',
      domesticFocus: 'Stable corporate and public sector opportunities for Australian residents.'
    },
    {
      id: 'legal-community',
      name: 'Legal, Government & Community',
      icon: Scale,
      avgSalary: '$90,000 - $175,000 + Super',
      inDemand: ['Commercial Solicitors', 'Social Workers', 'NDIS Support Coordinators', 'Policy Officers'],
      description: 'Community services, non-profit human services organizations, and commercial law practices throughout Australia.',
      hotspots: 'Canberra, Sydney, Melbourne, Brisbane',
      domesticFocus: 'Essential disability and casework demand across Australian communities.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar onOpenTalentModal={() => setTalentModalOpen(true)} />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 w-full">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 mb-2">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Australian Industry Taxonomy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            The 12 Core Australian Employment Sectors
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            From remote mining fleets in Western Australia to high-tech medical centres in Melbourne, explore key hiring demands, statutory salary bands (+ 11.5% Super), and domestic career opportunities for Australian residents.
          </p>
        </div>

        {/* Sectors Detailed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectorDetails.map((sec) => {
            const Icon = sec.icon;
            return (
              <div
                key={sec.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-teal-500/60 p-6 flex flex-col justify-between transition-all hover:shadow-md group"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-semibold text-slate-400 block">Typical Range</span>
                      <span className="text-xs font-bold text-slate-900">{sec.avgSalary}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {sec.name}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {sec.description}
                  </p>

                  {/* In-Demand Roles */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                      Key Skill Shortages:
                    </span>
                    <ul className="space-y-1">
                      {sec.inDemand.map((role, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-teal-500" />
                          <span>{role}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Hotspots & Domestic Focus */}
                  <div className="mt-4 p-3 bg-slate-50 rounded-xl space-y-1.5 text-[11px] text-slate-600">
                    <div>
                      <strong className="text-slate-800">Primary Hubs: </strong>
                      <span>{sec.hotspots}</span>
                    </div>
                    <div>
                      <strong className="text-teal-800">Domestic Outlook: </strong>
                      <span>{sec.domesticFocus}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/jobs?sector=${sec.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 hover:text-teal-900 transition-colors"
                  >
                    <span>Browse Openings</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => setTalentModalOpen(true)}
                    className="text-xs text-slate-500 hover:text-slate-800 underline underline-offset-2"
                  >
                    Submit Sector CV
                  </button>
                </div>
              </div>
            );
          })}
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
