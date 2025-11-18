import { initializeApp } from 'firebase/app';

// ============================================================================
// FIREBASE CONFIG + INIT
// ============================================================================

// Use the current domain as authDomain to ensure OAuth redirects back to the correct URL
// In dev: use ngrok (with Vite proxy for /__/auth)
// In prod: use Firebase auth domain (it handles /__/auth/handler)
const authDomain = import.meta.env.DEV
  ? '29539478b6f7.ngrok-free.app'
  : import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: authDomain, // Use ngrok in dev, Firebase domain in prod
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
