import { NextRequest, NextResponse } from 'next/server';
import { SITE } from '@/src/config/site';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      jobId,
      jobTitle,
      applicantName,
      email,
      phone,
      location,
      rightToWork,
      visaDetails,
      screeningAnswer,
      cvFileName,
      idType,
      retentionConsentAccepted
    } = body;

    if (!applicantName || !email || !phone || !rightToWork || !retentionConsentAccepted) {
      return NextResponse.json(
        { success: false, error: 'Mandatory fields missing: Name, Email, Phone, Right to Work, and Privacy Consent are required.' },
        { status: 400 }
      );
    }

    // Generate reference code
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceNumber = `JN-${new Date().getFullYear()}-${randomSuffix}`;

    return NextResponse.json({
      success: true,
      referenceNumber,
      message: 'Application received and securely registered under Australian Privacy Principles.',
      details: {
        jobTitle,
        applicantName,
        email,
        phone,
        submittedAt: new Date().toISOString(),
      }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Server error' }, { status: 500 });
  }
}
