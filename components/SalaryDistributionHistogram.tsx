'use client';

import React, { useMemo, useState } from 'react';
import * as d3 from 'd3';
import { Job, INITIAL_JOBS } from '@/lib/data/jobs';
import { TrendingUp, DollarSign, Award, HelpCircle, ArrowUpRight } from 'lucide-react';

interface SalaryDistributionHistogramProps {
  job: Job;
  className?: string;
  onOpenSuperCalculator?: () => void;
}

export default function SalaryDistributionHistogram({
  job,
  className = '',
  onOpenSuperCalculator
}: SalaryDistributionHistogramProps) {
  // Mode: 'YEAR' or 'HOUR'
  const defaultMode = job.salaryPeriod === 'HOUR' ? 'HOUR' : 'YEAR';
  const [viewMode, setViewMode] = useState<'YEAR' | 'HOUR'>(defaultMode);
  const [hoveredBin, setHoveredBin] = useState<{
    x0: number;
    x1: number;
    count: number;
    percentage: number;
  } | null>(null);

  // Extract similar jobs from the same sector
  const sectorJobs = useMemo(() => {
    const list = INITIAL_JOBS.filter(j => j.sectorId === job.sectorId || j.sectorName === job.sectorName);
    return list.length >= 5 ? list : INITIAL_JOBS;
  }, [job.sectorId, job.sectorName]);

  // Extract salaries converted according to viewMode
  const { salaries, thisJobSalary, minVal, maxVal, medianVal, p25Val, p75Val, percentile } = useMemo(() => {
    const rawSalaries: number[] = [];

    sectorJobs.forEach(j => {
      let min = j.salaryMin;
      let max = j.salaryMax || j.salaryMin;

      // Fallback: try parsing from salary string if missing
      if (!min) {
        const matches = j.salary.match(/\$?([0-9,]+)/g);
        if (matches && matches.length > 0) {
          const parsed = matches.map(m => parseInt(m.replace(/[$,]/g, ''), 10)).filter(n => !isNaN(n));
          if (parsed.length >= 2) {
            min = parsed[0];
            max = parsed[1];
          } else if (parsed.length === 1) {
            min = parsed[0];
            max = parsed[0];
          }
        }
      }

      if (min && max) {
        const mid = (min + max) / 2;
        const jobPeriod = j.salaryPeriod || (j.salary.includes('/hr') || j.salary.includes('per hour') ? 'HOUR' : 'YEAR');

        if (viewMode === 'YEAR') {
          // If hourly, convert to annual assuming 38 hrs/week * 52 weeks
          const annualMid = jobPeriod === 'HOUR' ? mid * 38 * 52 : mid;
          if (annualMid > 30000 && annualMid < 400000) {
            rawSalaries.push(annualMid);
          }
        } else {
          // If annual, convert to hourly
          const hourlyMid = jobPeriod === 'HOUR' ? mid : mid / (38 * 52);
          if (hourlyMid > 15 && hourlyMid < 200) {
            rawSalaries.push(hourlyMid);
          }
        }
      }
    });

    // Calculate this job's value in current mode
    let currentJobMid = ((job.salaryMin || 0) + (job.salaryMax || job.salaryMin || 0)) / 2;
    if (!currentJobMid) {
      const matches = job.salary.match(/\$?([0-9,]+)/g);
      if (matches && matches.length > 0) {
        const parsed = matches.map(m => parseInt(m.replace(/[$,]/g, ''), 10)).filter(n => !isNaN(n));
        currentJobMid = parsed.length >= 2 ? (parsed[0] + parsed[1]) / 2 : parsed[0] || 90000;
      } else {
        currentJobMid = 90000;
      }
    }

    const currentPeriod = job.salaryPeriod || (job.salary.includes('/hr') || job.salary.includes('per hour') ? 'HOUR' : 'YEAR');
    let thisVal = currentJobMid;
    if (viewMode === 'YEAR' && currentPeriod === 'HOUR') {
      thisVal = currentJobMid * 38 * 52;
    } else if (viewMode === 'HOUR' && currentPeriod === 'YEAR') {
      thisVal = currentJobMid / (38 * 52);
    }

    rawSalaries.sort((a, b) => a - b);
    const count = rawSalaries.length;
    const minVal = rawSalaries[0] || (viewMode === 'YEAR' ? 60000 : 30);
    const maxVal = rawSalaries[count - 1] || (viewMode === 'YEAR' ? 200000 : 100);
    const medianVal = rawSalaries[Math.floor(count * 0.5)] || (viewMode === 'YEAR' ? 120000 : 60);
    const p25Val = rawSalaries[Math.floor(count * 0.25)] || (viewMode === 'YEAR' ? 90000 : 45);
    const p75Val = rawSalaries[Math.floor(count * 0.75)] || (viewMode === 'YEAR' ? 150000 : 75);

    // Calculate this role percentile
    const belowCount = rawSalaries.filter(s => s <= thisVal).length;
    const pct = Math.min(99, Math.max(1, Math.round((belowCount / count) * 100)));

    return {
      salaries: rawSalaries,
      thisJobSalary: thisVal,
      minVal,
      maxVal,
      medianVal,
      p25Val,
      p75Val,
      percentile: pct
    };
  }, [sectorJobs, job, viewMode]);

  // Chart dimensions
  const width = 640;
  const height = 240;
  const margin = { top: 32, right: 24, bottom: 44, left: 42 };

  // D3 Scales & Bins
  const { bins, xScale, yScale, currentBinIndex } = useMemo(() => {
    // Determine domain slightly expanded for pleasant margins
    const domainMin = Math.max(0, minVal * 0.95);
    const domainMax = maxVal * 1.05;

    const x = d3.scaleLinear()
      .domain([domainMin, domainMax])
      .range([margin.left, width - margin.right]);

    const thresholdCount = viewMode === 'YEAR' ? 10 : 8;
    const binner = d3.bin()
      .domain(x.domain() as [number, number])
      .thresholds(x.ticks(thresholdCount));

    const computedBins = binner(salaries);

    const maxBinCount = d3.max(computedBins, b => b.length) || 1;
    const y = d3.scaleLinear()
      .domain([0, maxBinCount * 1.15])
      .range([height - margin.bottom, margin.top]);

    // Find which bin contains this job's salary
    let targetIndex = -1;
    computedBins.forEach((b, idx) => {
      const x0 = b.x0 ?? 0;
      const x1 = b.x1 ?? 0;
      if (thisJobSalary >= x0 && (thisJobSalary < x1 || idx === computedBins.length - 1)) {
        targetIndex = idx;
      }
    });

    return {
      bins: computedBins,
      xScale: x,
      yScale: y,
      currentBinIndex: targetIndex
    };
  }, [salaries, minVal, maxVal, thisJobSalary, viewMode, width, height, margin.left, margin.right, margin.bottom, margin.top]);

  // Format currency helpers
  const formatCurrency = (val: number) => {
    if (viewMode === 'YEAR') {
      return `$${Math.round(val / 1000)}k`;
    }
    return `$${val.toFixed(0)}/hr`;
  };

  const formatFullCurrency = (val: number) => {
    if (viewMode === 'YEAR') {
      return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(val);
    }
    return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 2 }).format(val) + '/hr';
  };

  // Percentile Badge styling
  const getPercentileBadge = (pct: number) => {
    if (pct >= 75) {
      return {
        label: `Top ${100 - pct}% of Market`,
        sub: 'Upper Tier Remuneration',
        bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        ring: 'text-emerald-600'
      };
    }
    if (pct >= 45) {
      return {
        label: `Median Benchmark (${pct}th Pct)`,
        sub: 'Competitive Market Rate',
        bg: 'bg-teal-50 text-teal-800 border-teal-200',
        ring: 'text-teal-600'
      };
    }
    return {
      label: `Entry-to-Mid Band (${pct}th Pct)`,
      sub: 'Standard Award / Baseline Rate',
      bg: 'bg-slate-50 text-slate-800 border-slate-200',
      ring: 'text-slate-600'
    };
  };

  const badge = getPercentileBadge(percentile);
  const xTargetPos = Math.max(margin.left + 15, Math.min(width - margin.right - 15, xScale(thisJobSalary)));

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-sm ${className}`}>
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700 mb-1">
            <TrendingUp className="w-4 h-4 text-teal-600" />
            <span>Market Remuneration Intelligence (D3 Analytics)</span>
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
            Sector Salary Distribution
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Benchmarked against <span className="font-semibold text-slate-700">{salaries.length} verified Australian roles</span> in {job.sectorName}.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl shrink-0 self-start sm:self-auto border border-slate-200/70">
          <button
            type="button"
            onClick={() => setViewMode('YEAR')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              viewMode === 'YEAR'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Annual Package ($/yr)
          </button>
          <button
            type="button"
            onClick={() => setViewMode('HOUR')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              viewMode === 'HOUR'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Hourly Rate ($/hr)
          </button>
        </div>
      </div>

      {/* KPI Benchmark Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
        <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
          <span className="text-[11px] font-medium text-slate-500 block">25th Percentile</span>
          <span className="text-base sm:text-lg font-bold text-slate-800">{formatCurrency(p25Val)}</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Entry to Junior</span>
        </div>

        <div className="p-3 bg-teal-50/60 border border-teal-200/80 rounded-xl">
          <span className="text-[11px] font-medium text-teal-800 block">Sector Median</span>
          <span className="text-base sm:text-lg font-extrabold text-teal-950">{formatCurrency(medianVal)}</span>
          <span className="text-[10px] text-teal-700 block mt-0.5">Market Average</span>
        </div>

        <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
          <span className="text-[11px] font-medium text-slate-500 block">75th Percentile</span>
          <span className="text-base sm:text-lg font-bold text-slate-800">{formatCurrency(p75Val)}</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Senior / Specialized</span>
        </div>

        <div className={`p-3 border rounded-xl ${badge.bg}`}>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold block">This Role</span>
            <Award className={`w-3.5 h-3.5 ${badge.ring}`} />
          </div>
          <span className="text-base sm:text-lg font-extrabold block text-slate-900">
            {formatCurrency(thisJobSalary)}
          </span>
          <span className="text-[10px] font-medium block truncate mt-0.5">
            {badge.label}
          </span>
        </div>
      </div>

      {/* D3 Histogram Chart Container */}
      <div className="relative w-full bg-slate-50/70 border border-slate-200/80 rounded-xl p-3 sm:p-4 my-4">
        {/* Hover Tooltip Overlay */}
        {hoveredBin && (
          <div className="absolute top-4 right-4 z-10 bg-slate-900/95 text-white text-xs rounded-lg py-2 px-3 shadow-lg border border-slate-700 backdrop-blur-sm pointer-events-none transition-all">
            <div className="font-semibold text-teal-300">
              {formatFullCurrency(hoveredBin.x0)} – {formatFullCurrency(hoveredBin.x1)}
            </div>
            <div className="text-slate-300 text-[11px] mt-0.5">
              <span className="font-bold text-white">{hoveredBin.count} verified jobs</span> ({hoveredBin.percentage}% of sector)
            </div>
          </div>
        )}

        {/* SVG Visualization */}
        <div className="w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-auto max-h-[260px] select-none"
            role="img"
            aria-label={`Salary distribution histogram for ${job.sectorName}`}
          >
            <defs>
              {/* Highlight gradient for current job's bin */}
              <linearGradient id="highlightBarGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0D9488" />
                <stop offset="100%" stopColor="#0F766E" />
              </linearGradient>
              {/* Standard bar gradient */}
              <linearGradient id="standardBarGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#94A3B8" />
                <stop offset="100%" stopColor="#64748B" />
              </linearGradient>
            </defs>

            {/* Background Horizontal Grid Lines */}
            {yScale.ticks(4).map((tickVal) => {
              const y = yScale(tickVal);
              return (
                <g key={`grid-${tickVal}`}>
                  <line
                    x1={margin.left}
                    x2={width - margin.right}
                    y1={y}
                    y2={y}
                    stroke="#E2E8F0"
                    strokeDasharray="3 3"
                    strokeWidth="1"
                  />
                  <text
                    x={margin.left - 6}
                    y={y + 3}
                    textAnchor="end"
                    className="text-[10px] fill-slate-400 font-sans"
                  >
                    {tickVal}
                  </text>
                </g>
              );
            })}

            {/* Histogram Bars */}
            {bins.map((bin, i) => {
              const x0 = bin.x0 ?? 0;
              const x1 = bin.x1 ?? 0;
              const barX = xScale(x0) + 1.5;
              const barWidth = Math.max(2, xScale(x1) - xScale(x0) - 3);
              const barY = yScale(bin.length);
              const barHeight = Math.max(0, height - margin.bottom - barY);
              const isCurrent = i === currentBinIndex;

              return (
                <g
                  key={`bin-${i}`}
                  className="cursor-pointer group"
                  onMouseEnter={() => {
                    const pct = Math.round((bin.length / salaries.length) * 100);
                    setHoveredBin({
                      x0,
                      x1,
                      count: bin.length,
                      percentage: pct
                    });
                  }}
                  onMouseLeave={() => setHoveredBin(null)}
                >
                  <rect
                    x={barX}
                    y={barY}
                    width={barWidth}
                    height={barHeight}
                    rx="4"
                    fill={isCurrent ? 'url(#highlightBarGrad)' : 'url(#standardBarGrad)'}
                    className={`transition-all duration-150 ${
                      isCurrent
                        ? 'opacity-95 filter drop-shadow-sm stroke-teal-900 stroke-1'
                        : 'opacity-70 group-hover:opacity-100 group-hover:fill-teal-700'
                    }`}
                  />
                  {/* Bin Count Label above tall bars */}
                  {bin.length > 0 && barHeight > 18 && (
                    <text
                      x={barX + barWidth / 2}
                      y={barY - 5}
                      textAnchor="middle"
                      className={`text-[9px] font-bold ${
                        isCurrent ? 'fill-teal-800' : 'fill-slate-400 group-hover:fill-slate-700'
                      }`}
                    >
                      {bin.length}
                    </text>
                  )}
                </g>
              );
            })}

            {/* X-Axis Horizontal Base Line */}
            <line
              x1={margin.left}
              x2={width - margin.right}
              y1={height - margin.bottom}
              y2={height - margin.bottom}
              stroke="#CBD5E1"
              strokeWidth="1.5"
            />

            {/* X-Axis Ticks & Labels */}
            {xScale.ticks(6).map((tickVal) => {
              const x = xScale(tickVal);
              return (
                <g key={`x-tick-${tickVal}`}>
                  <line
                    x1={x}
                    x2={x}
                    y1={height - margin.bottom}
                    y2={height - margin.bottom + 5}
                    stroke="#94A3B8"
                    strokeWidth="1"
                  />
                  <text
                    x={x}
                    y={height - margin.bottom + 18}
                    textAnchor="middle"
                    className="text-[10px] fill-slate-500 font-medium"
                  >
                    {formatCurrency(tickVal)}
                  </text>
                </g>
              );
            })}

            {/* Current Job Midpoint Indicator Pin / Line */}
            <g>
              {/* Vertical Dashed Target Line */}
              <line
                x1={xTargetPos}
                x2={xTargetPos}
                y1={margin.top - 8}
                y2={height - margin.bottom}
                stroke="#0F2942"
                strokeWidth="2"
                strokeDasharray="4 3"
              />

              {/* Marker Badge Head at top */}
              <rect
                x={xTargetPos - 52}
                y={margin.top - 24}
                width="104"
                height="20"
                rx="5"
                fill="#0F2942"
                className="filter drop-shadow"
              />
              <text
                x={xTargetPos}
                y={margin.top - 10}
                textAnchor="middle"
                className="text-[10px] font-bold fill-white"
              >
                ★ This Role ({formatCurrency(thisJobSalary)})
              </text>

              {/* Bottom Target Circle Pin */}
              <circle
                cx={xTargetPos}
                cy={height - margin.bottom}
                r="4.5"
                fill="#0F2942"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
            </g>
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200/60 text-[11px] text-slate-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-gradient-to-b from-[#0D9488] to-[#0F766E] border border-teal-800 inline-block" />
              <span className="font-semibold text-slate-700">Target Role Bracket</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-gradient-to-b from-[#94A3B8] to-[#64748B] inline-block" />
              <span>Other Market Listings</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-slate-400 italic">
            <span>Hover over any bar to view exact counts & percentages</span>
          </div>
        </div>
      </div>

      {/* Market Rate Insights & Superannuation Note */}
      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-2">
          <DollarSign className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-900 block">Australian Superannuation Transparency</strong>
            <span>
              All advertised salaries in this distribution are subject to statutory{' '}
              <strong className="text-slate-800">+ 11.5% Superannuation Guarantee</strong> (rising to 12% from 1 July 2025).
            </span>
          </div>
        </div>

        {onOpenSuperCalculator && (
          <button
            type="button"
            onClick={onOpenSuperCalculator}
            className="inline-flex items-center gap-1 text-teal-700 hover:text-teal-900 font-bold whitespace-nowrap shrink-0 hover:underline text-xs"
          >
            <span>Launch Pay & Super Calculator</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
