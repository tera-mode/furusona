// User Types
export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  familyStructure: {
    married: boolean;
    dependents: number;
  };
  income: {
    annualIncome: number;
    socialInsurance?: number;
    mortgageDeduction?: number;
  };
  preferences: {
    categories: string[];
    allergies?: string[];
    favoriteRegions?: string[];
    pastSelections?: string[];
  };
  calculatedLimit: number;
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
  donatedAt: Date;
  year: number;
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

// Claude Recommendation
export interface Recommendation {
  itemCode: string;
  reason: string;
  score: number;
  product?: RakutenProduct;
}

// Auth Context
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUserData: (data: Partial<User>) => Promise<void>;
  refreshUserData: () => Promise<void>;
}
