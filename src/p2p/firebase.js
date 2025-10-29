import { initializeApp } from 'firebase/app';
import { getDatabase, off } from 'firebase/database';

// ============================================================================
// FIREBASE CONFIG + INIT
// ============================================================================

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const rtdb = getDatabase(app);

// ============================================================================
// FB LISTENER TRACKING
// ============================================================================

const firebaseListeners = [];

export function trackFirebaseListener(fbRef, type, callback) {
  firebaseListeners.push({ ref: fbRef, type, callback });
}

export function removeAllFirebaseListeners() {
  firebaseListeners.forEach(({ ref, type, callback }) => {
    off(ref, type, callback);
  });
  firebaseListeners.length = 0;
}
