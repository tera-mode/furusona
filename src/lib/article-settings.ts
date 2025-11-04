import { adminDb } from './firebase-admin';

const COLLECTION_NAME = 'articleSettings';

export interface ArticleSetting {
  slug: string;
  published: boolean;
  updatedAt: Date;
}

/**
 * Firestoreから記事設定を取得
 */
export async function getArticleSetting(slug: string): Promise<ArticleSetting | null> {
  try {
    const doc = await adminDb.collection(COLLECTION_NAME).doc(slug).get();

    if (!doc.exists) {
      return null;
    }

    const data = doc.data();
    return {
      slug,
      published: data?.published ?? true,
      updatedAt: data?.updatedAt?.toDate() ?? new Date(),
    };
  } catch (error) {
    console.error(`Error fetching article setting for ${slug}:`, error);
    return null;
  }
}

/**
 * Firestoreから全記事設定を取得
 */
export async function getAllArticleSettings(): Promise<Record<string, ArticleSetting>> {
  try {
    const snapshot = await adminDb.collection(COLLECTION_NAME).get();

    const settings: Record<string, ArticleSetting> = {};
    snapshot.forEach((doc) => {
      const data = doc.data();
      settings[doc.id] = {
        slug: doc.id,
        published: data?.published ?? true,
        updatedAt: data?.updatedAt?.toDate() ?? new Date(),
      };
    });

    return settings;
  } catch (error) {
    console.error('Error fetching all article settings:', error);
    return {};
  }
}

/**
 * Firestoreに記事設定を保存
 */
export async function saveArticleSetting(slug: string, published: boolean): Promise<void> {
  try {
    await adminDb.collection(COLLECTION_NAME).doc(slug).set({
      published,
      updatedAt: new Date(),
    }, { merge: true });

    console.log(`Article setting saved: ${slug} -> published: ${published}`);
  } catch (error) {
    console.error(`Error saving article setting for ${slug}:`, error);
    throw error;
  }
}

/**
 * Firestoreから記事設定を削除
 */
export async function deleteArticleSetting(slug: string): Promise<void> {
  try {
    await adminDb.collection(COLLECTION_NAME).doc(slug).delete();
    console.log(`Article setting deleted: ${slug}`);
  } catch (error) {
    console.error(`Error deleting article setting for ${slug}:`, error);
    throw error;
  }
}
