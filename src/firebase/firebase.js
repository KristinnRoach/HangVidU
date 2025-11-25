import { initializeApp } from 'firebase/app';
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from 'firebase/app-check';

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
export const app = initializeApp(firebaseConfig);

// ============================================================================
// APP CHECK INIT
// ============================================================================

// Optional: For local development, enable debug token generation
// When set to true, Firebase will log a debug token to the console.
// Copy that token and register it in Firebase Console > App Check > Debug tokens
if (import.meta.env.MODE === 'development') {
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

// Validate reCAPTCHA site key before initializing App Check
const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_ENTERPRISE_SITE_KEY;

if (typeof recaptchaSiteKey === 'string' && recaptchaSiteKey.trim() !== '') {
  // Initialize App Check with the reCAPTCHA Enterprise provider
  try {
    initializeAppCheck(app, {
      provider: new ReCaptchaEnterpriseProvider(recaptchaSiteKey),
      isTokenAutoRefreshEnabled: true,
    });
  } catch (err) {
    console.error('[Firebase App Check] Initialization failed:', err);
  }
} else {
  if (import.meta.env.MODE === 'production') {
    console.error(
      '[Firebase App Check: PROD] VITE_RECAPTCHA_ENTERPRISE_SITE_KEY is missing or empty. App Check initialization skipped.'
    );
  } else {
    // Use debug provider in non-production as a safe fallback
    console.warn(
      '[Firebase App Check: DEV] VITE_RECAPTCHA_ENTERPRISE_SITE_KEY is missing or empty.'
    );
    // Optionally, you could initialize with a debug provider here if needed
    // initializeAppCheck(app, { provider: new DebugAppCheckProvider(), isTokenAutoRefreshEnabled: true });
  }
}
