import { NextRequest, NextResponse } from 'next/server';
import { SITE } from '@/src/config/site';

export async function POST(request: NextRequest) {
  try {
    const { passcode } = await request.json();

    if (passcode === SITE.adminPasscode) {
      return NextResponse.json({
        success: true,
        authenticated: true,
        message: 'Passcode verified.'
      });
    }

    return NextResponse.json(
      { success: false, authenticated: false, error: 'Invalid admin passcode.' },
      { status: 401 }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
