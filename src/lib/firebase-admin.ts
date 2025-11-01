import * as admin from 'firebase-admin';

// Initialize Firebase Admin only if credentials are available
if (!admin.apps.length) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  // Only initialize if all required credentials are present
  if (projectId && clientEmail && privateKey) {
    try {
      // Format private key to handle various input formats
      let formattedPrivateKey = privateKey;

      // Remove surrounding quotes if present
      formattedPrivateKey = formattedPrivateKey.replace(/^["']|["']$/g, '');

      // Replace literal \n with actual newlines
      formattedPrivateKey = formattedPrivateKey.replace(/\\n/g, '\n');

      // Trim any extra whitespace
      formattedPrivateKey = formattedPrivateKey.trim();

      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey: formattedPrivateKey,
        }),
      });
      console.log('✅ Firebase Admin initialized successfully');
    } catch (error) {
      console.error('❌ Firebase admin initialization error:', error);
    }
  } else {
    console.warn('⚠️ Firebase Admin SDK credentials not found - some features will not work');
  }
}

// Lazy initialization - only call when actually needed
let _adminDb: FirebaseFirestore.Firestore | null = null;
let _adminAuth: admin.auth.Auth | null = null;

function getFirestore() {
  if (!_adminDb) {
    if (!admin.apps.length) {
      throw new Error('Firebase Admin is not initialized. Check your environment variables.');
    }
    _adminDb = admin.firestore();
  }
  return _adminDb;
}

function getAuth() {
  if (!_adminAuth) {
    if (!admin.apps.length) {
      throw new Error('Firebase Admin is not initialized. Check your environment variables.');
    }
    _adminAuth = admin.auth();
  }
  return _adminAuth;
}

// Export as property accessors
export const adminDb = new Proxy({} as FirebaseFirestore.Firestore, {
  get: (target, prop) => {
    const db = getFirestore();
    // @ts-expect-error - Proxy magic
    return typeof db[prop] === 'function' ? db[prop].bind(db) : db[prop];
  }
});

export const adminAuth = getAuth;

// Export getFirestore as a named export for email module
export const getFirestoreAdmin = getFirestore;

export default admin;
