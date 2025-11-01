import { NextRequest, NextResponse } from 'next/server';
import { getFirestoreAdmin } from '@/lib/firebase-admin';
import { EMAIL_TEMPLATES, getAllTemplates } from '@/lib/email-templates';
import { EmailTemplate } from '@/types/email';

/**
 * GET /api/email/templates
 * テンプレート一覧を取得
 */
export async function GET(request: NextRequest) {
  try {
    const db = getFirestoreAdmin();

    // Firestoreからテンプレートを取得
    const templatesSnapshot = await db.collection('emailTemplates').get();

    if (templatesSnapshot.empty) {
      // Firestoreにテンプレートがない場合、デフォルトテンプレートを返す
      const defaultTemplates = getAllTemplates().map(template => ({
        ...template,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      return NextResponse.json({
        templates: defaultTemplates,
        source: 'default',
      });
    }

    // Firestoreから取得したテンプレートを整形
    const templates = templatesSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      } as EmailTemplate;
    });

    return NextResponse.json({
      templates,
      source: 'firestore',
    });
  } catch (error) {
    console.error('Failed to get email templates:', error);
    return NextResponse.json(
      { error: 'Failed to get email templates' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/email/templates
 * テンプレートを更新（または作成）
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { templateId, subject, htmlBody, textBody, active } = body;

    if (!templateId) {
      return NextResponse.json(
        { error: 'templateId is required' },
        { status: 400 }
      );
    }

    const db = getFirestoreAdmin();
    const templateRef = db.collection('emailTemplates').doc(templateId);

    // 既存のテンプレートを取得
    const templateDoc = await templateRef.get();

    if (templateDoc.exists) {
      // 更新
      await templateRef.update({
        subject: subject || templateDoc.data()?.subject,
        htmlBody: htmlBody || templateDoc.data()?.htmlBody,
        textBody: textBody || templateDoc.data()?.textBody,
        active: active !== undefined ? active : templateDoc.data()?.active,
        updatedAt: new Date(),
      });

      const updated = await templateRef.get();
      return NextResponse.json({
        template: {
          ...updated.data(),
          createdAt: updated.data()?.createdAt?.toDate(),
          updatedAt: updated.data()?.updatedAt?.toDate(),
        },
        message: 'Template updated successfully',
      });
    } else {
      // 新規作成（デフォルトテンプレートから）
      const defaultTemplate = EMAIL_TEMPLATES[templateId];

      if (!defaultTemplate) {
        return NextResponse.json(
          { error: 'Template not found' },
          { status: 404 }
        );
      }

      const newTemplate: EmailTemplate = {
        ...defaultTemplate,
        subject: subject || defaultTemplate.subject,
        htmlBody: htmlBody || defaultTemplate.htmlBody,
        textBody: textBody || defaultTemplate.textBody,
        active: active !== undefined ? active : defaultTemplate.active,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await templateRef.set(newTemplate);

      return NextResponse.json({
        template: newTemplate,
        message: 'Template created successfully',
      });
    }
  } catch (error) {
    console.error('Failed to update email template:', error);
    return NextResponse.json(
      { error: 'Failed to update email template' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/email/templates/init
 * デフォルトテンプレートをFirestoreに初期化
 */
export async function POST(request: NextRequest) {
  try {
    const db = getFirestoreAdmin();
    const batch = db.batch();

    const defaultTemplates = getAllTemplates();

    for (const template of defaultTemplates) {
      const templateRef = db.collection('emailTemplates').doc(template.id);
      batch.set(templateRef, {
        ...template,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await batch.commit();

    return NextResponse.json({
      message: 'Templates initialized successfully',
      count: defaultTemplates.length,
    });
  } catch (error) {
    console.error('Failed to initialize email templates:', error);
    return NextResponse.json(
      { error: 'Failed to initialize email templates' },
      { status: 500 }
    );
  }
}
