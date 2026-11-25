import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_JOBS } from '@/lib/data/jobs';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.toLowerCase() || '';
  const sector = searchParams.get('sector') || '';
  const state = searchParams.get('state') || '';
  const workType = searchParams.get('workType') || '';
  const visa = searchParams.get('visa') === 'true';
  const remote = searchParams.get('remote') === 'true';

  let results = [...INITIAL_JOBS];

  if (q) {
    results = results.filter(
      j =>
        j.title.toLowerCase().includes(q) ||
        j.overview.toLowerCase().includes(q) ||
        j.sectorName.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q)
    );
  }

  if (sector && sector !== 'all') {
    results = results.filter(j => j.sectorId === sector);
  }

  if (state && state !== 'ALL') {
    results = results.filter(j => j.state === state);
  }

  if (workType && workType !== 'all') {
    results = results.filter(j => j.workType === workType);
  }

  if (visa) {
    results = results.filter(j => j.visaSponsorshipEligible);
  }

  if (remote) {
    results = results.filter(j => j.isRemote);
  }

  return NextResponse.json({
    success: true,
    count: results.length,
    jobs: results,
  });
}
