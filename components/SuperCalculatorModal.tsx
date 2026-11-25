'use client';

import { useState } from 'react';
import { Calculator, X, DollarSign, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface SuperCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSalary?: number;
}

export default function SuperCalculatorModal({ isOpen, onClose, initialSalary = 100000 }: SuperCalculatorModalProps) {
  const [baseSalary, setBaseSalary] = useState(initialSalary);
  const [payPeriod, setPayPeriod] = useState<'ANNUAL' | 'FORTNIGHTLY' | 'WEEKLY' | 'MONTHLY'>('FORTNIGHTLY');

  if (!isOpen) return null;

  // Australian Statutory Superannuation Guarantee (11.5% for 2024-2026, 12% from July 2025)
  const superRate = 0.115;
  const superAmount = baseSalary * superRate;
  const totalPackage = baseSalary + superAmount;

  // Approximate Australian Resident Income Tax + Medicare Levy (2%)
  const calculateAnnualTax = (income: number) => {
    let tax = 0;
    if (income <= 18200) {
      tax = 0;
    } else if (income <= 45000) {
      tax = (income - 18200) * 0.16;
    } else if (income <= 135000) {
      tax = 4288 + (income - 45000) * 0.30;
    } else if (income <= 190000) {
      tax = 31288 + (income - 135000) * 0.37;
    } else {
      tax = 51638 + (income - 190000) * 0.45;
    }
    // Medicare levy 2% above low income threshold
    const medicare = income > 26000 ? income * 0.02 : 0;
    return tax + medicare;
  };

  const annualTax = calculateAnnualTax(baseSalary);
  const annualNet = Math.max(0, baseSalary - annualTax);

  const getPeriodValues = () => {
    switch (payPeriod) {
      case 'WEEKLY':
        return {
          gross: baseSalary / 52,
          tax: annualTax / 52,
          net: annualNet / 52,
          super: superAmount / 52,
          label: 'Weekly'
        };
      case 'FORTNIGHTLY':
        return {
          gross: baseSalary / 26,
          tax: annualTax / 26,
          net: annualNet / 26,
          super: superAmount / 26,
          label: 'Fortnightly'
        };
      case 'MONTHLY':
        return {
          gross: baseSalary / 12,
          tax: annualTax / 12,
          net: annualNet / 12,
          super: superAmount / 12,
          label: 'Monthly'
        };
      case 'ANNUAL':
      default:
        return {
          gross: baseSalary,
          tax: annualTax,
          net: annualNet,
          super: superAmount,
          label: 'Annual'
        };
    }
  };

  const currentPeriod = getPeriodValues();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-[#0F2942] text-white p-5 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-teal-400">
              <Calculator className="w-4 h-4" />
              <span>Australian Remuneration Tool</span>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-white mt-1">
              Superannuation & Take-Home Pay Estimator
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Current ATO resident tax rates & statutory 11.5% Super Guarantee
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
            aria-label="Close calculator"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6 text-slate-800">
          {/* Base Salary Input */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Annual Base Salary (excluding Super)
              </label>
              <span className="text-xs font-mono font-bold text-teal-700">
                ${baseSalary.toLocaleString()} AUD
              </span>
            </div>
            <input
              type="range"
              min={40000}
              max={250000}
              step={5000}
              value={baseSalary}
              onChange={(e) => setBaseSalary(Number(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
              <span>$40,000</span>
              <span>$100,000</span>
              <span>$180,000</span>
              <span>$250,000+</span>
            </div>
          </div>

          {/* Pay Frequency Tabs */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
              Display Breakdown By
            </label>
            <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
              {(['WEEKLY', 'FORTNIGHTLY', 'MONTHLY', 'ANNUAL'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setPayPeriod(period)}
                  className={`py-1.5 rounded-lg transition-colors ${
                    payPeriod === period
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {period === 'WEEKLY' ? 'Weekly' : period === 'FORTNIGHTLY' ? 'Fortnightly' : period === 'MONTHLY' ? 'Monthly' : 'Annual'}
                </button>
              ))}
            </div>
          </div>

          {/* Key Breakdown Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl space-y-1">
              <span className="text-[11px] font-semibold text-teal-900 uppercase tracking-wider block">
                Estimated Net In-Pocket
              </span>
              <p className="text-2xl font-black font-mono text-teal-950">
                ${Math.round(currentPeriod.net).toLocaleString()}
              </p>
              <span className="text-[10px] text-teal-700 block">
                After tax & Medicare levy
              </span>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider block">
                Employer Super (11.5%)
              </span>
              <p className="text-2xl font-black font-mono text-slate-900">
                ${Math.round(currentPeriod.super).toLocaleString()}
              </p>
              <span className="text-[10px] text-slate-500 block">
                Paid into nominated superfund
              </span>
            </div>
          </div>

          {/* Full Breakdown Table */}
          <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-2 border border-slate-200/80">
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-600">Base Remuneration ({currentPeriod.label}):</span>
              <span className="font-mono font-bold text-slate-900">${Math.round(currentPeriod.gross).toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200 text-rose-700">
              <span>Estimated Income Tax + Medicare (2%):</span>
              <span className="font-mono font-bold">-${Math.round(currentPeriod.tax).toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200 text-teal-800">
              <span>Superannuation Guarantee (+ 11.5%):</span>
              <span className="font-mono font-bold">+${Math.round(currentPeriod.super).toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1 text-slate-900 font-bold">
              <span>Total Remuneration Package (TRP):</span>
              <span className="font-mono text-slate-900">${Math.round(baseSalary + superAmount).toLocaleString()} / yr</span>
            </div>
          </div>

          <div className="flex items-start gap-2 text-[11px] text-slate-500 leading-tight">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <span>
              Estimates are based on Australian resident tax scales for 2024–2026. Actual net pay may vary depending on HECS/HELP debt, salary packaging, private health insurance, and super contribution caps.
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#0F2942] hover:bg-[#0A1C2E] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
          >
            Close Calculator
          </button>
        </div>
      </div>
    </div>
  );
}
