import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { companyName, contactName, email, phone, roleTitle, sector } = body;

    if (!companyName || !contactName || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Company Name, Contact Name, Email, and Phone are required.' },
        { status: 400 }
      );
    }

    const inquiryId = `EMP-${Date.now().toString().slice(-6)}`;

    return NextResponse.json({
      success: true,
      inquiryId,
      message: 'Employer intake successfully lodged. An Australian talent consultant will be in touch within 24 hours.'
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Server error' }, { status: 500 });
  }
}
