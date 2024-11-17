import * as admin from 'firebase-admin';

// Build the service account object from individual environment variables
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)


if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('Firebase Admin SDK initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Firebase Admin SDK:', error);
  }
}

export const firestore = admin.firestore();
