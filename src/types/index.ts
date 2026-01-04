// User Types
export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  isGuest?: boolean; // ゲストユーザーフラグ
  guestId?: string; // ローカルストレージのゲストID（永続化用）
  familyStructure: {
    married?: boolean;
    dependents?: number;
  };
  income: {
    annualIncome?: number;
    socialInsurance?: number;
    mortgageDeduction?: number;
  };
  preferences: {
    categories: string[];
    allergies?: string[];
    favoriteRegions?: string[];
    customRequest?: string; // カスタムリクエスト（自由入力）
    pastSelections?: string[];
    favorites?: string[]; // 気になるリスト (itemCode)
    dislikes?: string[]; // 興味なしリスト (itemCode)
  };
  calculatedLimit?: number;
  limitHistory?: { // 年度別限度額履歴
    [year: string]: number; // { "2025": 150000, "2024": 120000 }
  };
  newsletter?: boolean; // メルマガ購読
  emailPreferences?: { // メール種別ごとの購読設定
    seasonal?: boolean;          // 季節のおすすめ
    limitReminder?: boolean;     // 限度額通知
    yearEnd?: boolean;           // 年末駆け込み
    taxReminder?: boolean;       // 確定申告
  };
  lastEmailSent?: { // メール送信履歴
    [templateId: string]: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Donation History
export interface Donation {
  id?: string;
  userId: string;
  productName: string;
  productPrice: number;
  productUrl: string;
  itemCode?: string;     // 商品コード（任意）
  donatedAt: Date;       // 実際の寄付日（ユーザー指定可能）
  createdAt: Date;       // 記録作成日（システム自動）
  year: number;          // 寄付年度（donatedAtから自動計算）
}

// Viewed Product History
export interface ViewedProduct {
  id?: string;
  userId: string;
  itemCode: string;
  itemName: string;
  itemPrice: number;
  itemUrl: string;
  affiliateUrl: string;
  imageUrl: string;
  shopName: string;
  viewedAt: Date;
}

// Rakuten Product
export interface RakutenProduct {
  itemCode: string;
  itemName: string;
  itemPrice: number;
  itemUrl: string;
  affiliateUrl: string;
  imageUrl: string;
  shopName: string;
  reviewCount: number;
  reviewAverage: number;
}

// Cached Product (Firestore用)
export interface CachedProduct {
  itemCode: string;
  itemName: string;
  itemPrice: number;
  itemUrl: string;
  affiliateUrl: string;
  imageUrl: string;
  shopName: string;
  reviewCount: number;
  reviewAverage: number;
  category: string;
  isNew: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Dashboard Access (アクティブユーザー追跡用)
export interface DashboardAccess {
  id?: string;
  userId: string;
  timestamp: Date;
  isGuest: boolean;
  date: string; // YYYY-MM-DD形式
}

// User Statistics (デバッグ画面用)
export interface UserStats {
  newGuests: { yesterday: number; last7Days: number; thisMonth: number; allTime: number };
  activeGuests: { yesterday: number; last7Days: number; thisMonth: number; allTime: number };
  newMembers: { yesterday: number; last7Days: number; thisMonth: number; allTime: number };
  activeMembers: { yesterday: number; last7Days: number; thisMonth: number; allTime: number };
  lastUpdated: string;
}

// Claude Recommendation
export interface Recommendation {
  itemCode: string;
  reason: string;
  score: number;
  product?: RakutenProduct;
  isDiscovery?: boolean; // 新しい発見フラグ
}

// Product with Score (推薦スコア計算用)
export interface ProductWithScore extends RakutenProduct {
  claudeScore: number;
  totalScore: number;
  isNew: boolean;
  isDiscovery?: boolean;
  scoreBreakdown?: {
    baseScore: number;
    categoryMatchScore: number;
    newProductBonus: number;
    seasonalBonus: number;
    randomBonus: number;
  };
}

// Auth Context
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInAsGuest: () => Promise<void>; // ゲストログイン
  signOut: () => Promise<void>;
  updateUserData: (data: Partial<User>) => Promise<void>;
  refreshUserData: () => Promise<void>;
}
