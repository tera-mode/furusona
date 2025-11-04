import { NextResponse } from 'next/server';
import { articleData } from '@/app/article/[slug]/page';
import { getAllArticleSettings, saveArticleSetting } from '@/lib/article-settings';

// GET: 記事一覧を取得
export async function GET() {
  try {
    // Firestoreから設定を取得
    const settings = await getAllArticleSettings();

    // articleDataとFirestoreの設定をマージ
    const articles = Object.entries(articleData).map(([slug, data]) => {
      const firestoreSetting = settings[slug];
      return {
        slug,
        ...data,
        // Firestoreに設定がある場合はそれを優先、ない場合はデフォルト値を使用
        published: firestoreSetting?.published ?? data.published,
      };
    });

    return NextResponse.json({ articles });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST: 記事の公開/非公開を切り替え
export async function POST(request: Request) {
  try {
    const { slug, published } = await request.json();

    if (!slug || typeof published !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    // 記事データの検証
    if (!articleData[slug]) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    // Firestoreに保存
    await saveArticleSetting(slug, published);

    return NextResponse.json({
      success: true,
      article: {
        slug,
        ...articleData[slug],
        published, // 更新後の状態を返す
      }
    });
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
