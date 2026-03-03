import { ApiError } from '@/lib/apiError';
import { requireAuth } from '@/lib/requireAuth';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const user = await requireAuth();

    return NextResponse.json({
      success: true,
      data: { user },
    });
  } catch (error: any) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode },
      );
    }

    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 },
    );
  }
}
