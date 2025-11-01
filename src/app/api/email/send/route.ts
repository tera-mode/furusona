import { NextRequest, NextResponse } from 'next/server';
import { sendEmailToUser } from '@/lib/email/send-email-to-user';

/**
 * POST /api/email/send
 * メールを送信
 *
 * Body:
 * {
 *   templateId: string;
 *   userId: string;
 *   testMode?: boolean; // trueの場合、管理者メールに送信
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { templateId, userId, testMode = false } = body;

    if (!templateId || !userId) {
      return NextResponse.json(
        { error: 'templateId and userId are required' },
        { status: 400 }
      );
    }

    const result = await sendEmailToUser({
      templateId,
      userId,
      testMode,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: testMode ? 'Test email sent successfully' : 'Email sent successfully',
      emailId: result.messageId,
    });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
