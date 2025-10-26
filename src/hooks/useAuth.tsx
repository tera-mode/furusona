'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User as FirebaseUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { User, AuthContextType } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const createUserDocument = async (firebaseUser: FirebaseUser): Promise<User> => {
    const userRef = doc(db, 'users', firebaseUser.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      return {
        ...userData,
        createdAt: userData.createdAt?.toDate?.() || new Date(),
        updatedAt: userData.updatedAt?.toDate?.() || new Date()
      } as User;
    }

    const newUser: User = {
      uid: firebaseUser.uid,
      email: firebaseUser.email!,
      displayName: firebaseUser.displayName || undefined,
      photoURL: firebaseUser.photoURL || undefined,
      familyStructure: {},
      income: {},
      preferences: {
        categories: [],
        allergies: [],
        favoriteRegions: [],
        pastSelections: [],
        favorites: [],
        dislikes: []
      },
      newsletter: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // undefinedフィールドを除去してFirestoreに保存
    const userData: Record<string, unknown> = {
      uid: firebaseUser.uid,
      email: firebaseUser.email!,
      familyStructure: {},
      income: {},
      preferences: {
        categories: [],
        allergies: [],
        favoriteRegions: [],
        pastSelections: [],
        favorites: [],
        dislikes: []
      },
      newsletter: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    if (firebaseUser.displayName) {
      userData.displayName = firebaseUser.displayName;
    }

    if (firebaseUser.photoURL) {
      userData.photoURL = firebaseUser.photoURL;
    }

    await setDoc(userRef, userData);

    return newUser;
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const userData = await createUserDocument(result.user);
      setUser(userData);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const userData = await createUserDocument(result.user);
      setUser(userData);
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const userData = await createUserDocument(result.user);
      setUser(userData);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const updateUserData = async (data: Partial<User>) => {
    if (!user) return;

    try {
      const userRef = doc(db, 'users', user.uid);

      // undefinedフィールドを再帰的に除去
      const cleanData = removeUndefinedFields(data);

      await updateDoc(userRef, {
        ...cleanData,
        updatedAt: serverTimestamp()
      });

      setUser(prev => prev ? { ...prev, ...data, updatedAt: new Date() } : null);
    } catch (error) {
      console.error('Error updating user data:', error);
      throw error;
    }
  };

  // undefinedフィールドを再帰的に除去するヘルパー関数
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const removeUndefinedFields = (obj: any): any => {
    if (obj === null || obj === undefined) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(removeUndefinedFields);
    }

    if (typeof obj === 'object' && !(obj instanceof Date)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cleaned: Record<string, any> = {};
      Object.entries(obj).forEach(([key, value]) => {
        if (value !== undefined) {
          cleaned[key] = removeUndefinedFields(value);
        }
      });
      return cleaned;
    }

    return obj;
  };

  const refreshUserData = async () => {
    if (!user) return;

    try {
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUser(prev => prev ? {
          ...prev,
          ...userData,
          createdAt: userData.createdAt?.toDate?.() || new Date(),
          updatedAt: userData.updatedAt?.toDate?.() || new Date()
        } as User : null);
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userData = await createUserDocument(firebaseUser);
          setUser(userData);
        } catch (error) {
          console.error('Error getting user data:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOut,
    updateUserData,
    refreshUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
