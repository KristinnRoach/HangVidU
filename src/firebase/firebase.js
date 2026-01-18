import { initializeApp } from 'firebase/app';
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
  CustomProvider,
} from 'firebase/app-check';

// ============================================================================
// APP CHECK DEBUG TOKEN SETUP (MUST BE BEFORE FIREBASE INIT)
// ============================================================================

// CRITICAL: Set debug token BEFORE initializing Firebase or any providers
// This prevents reCAPTCHA from showing "localhost not in allowed domains" error
const appCheckExplicitDebugToken = import.meta.env
  .VITE_FIREBASE_APP_CHECK_DEBUG_TOKEN;

if (import.meta.env.MODE === 'development' && typeof self !== 'undefined') {
  if (
    typeof appCheckExplicitDebugToken === 'string' &&
    appCheckExplicitDebugToken.trim() !== ''
  ) {
    // If an explicit debug token is provided in .env.development, use it.
    // This tells App Check to use this specific token for debugging.
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = appCheckExplicitDebugToken;
    console.info(
      `[Firebase App Check: DEV] Using explicit debug token from .env: ${appCheckExplicitDebugToken}`,
    );
  } else {
    // If no explicit token, allow App Check to auto-generate and log a new one.
    // This is useful for first-time setup or if local storage is cleared.
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    console.warn(
      '[Firebase App Check: DEV] No explicit debug token (VITE_FIREBASE_APPCHECK_DEBUG_TOKEN) found in .env. App Check will auto-generate one. Copy and register this token in Firebase Console. Consider adding it to your .env.development for stable reuse.',
    );
  }
}

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

export const app = initializeApp(firebaseConfig);

// ============================================================================
// APP CHECK INIT
// ============================================================================

const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_ENTERPRISE_SITE_KEY;
let appCheckProvider;

// --- DEVELOPMENT ENVIRONMENT LOGIC ---
if (import.meta.env.MODE === 'development') {
  // In development, we always try to initialize App Check with *a* provider.
  // The self.FIREBASE_APPCHECK_DEBUG_TOKEN setting will make it use the debug token
  // regardless of what the actual provider does for real attestation.
  if (typeof recaptchaSiteKey === 'string' && recaptchaSiteKey.trim() !== '') {
    appCheckProvider = new ReCaptchaEnterpriseProvider(recaptchaSiteKey);
    console.info(
      '[Firebase App Check: DEV] Initializing with ReCAPTCHA Enterprise Provider (debug mode enabled).',
    );
  } else {
    // If reCAPTCHA key is missing in development, use a CustomProvider as a placeholder.
    // This ensures initializeAppCheck is called, and the debug token will take effect.
    appCheckProvider = new CustomProvider({
      getToken: async () => {
        // This provider won't actually be used for real attestation in debug mode.
        // It just needs to return a valid-looking object.
        console.warn(
          '[Firebase App Check: DEV] No VITE_RECAPTCHA_ENTERPRISE_SITE_KEY found. Using CustomProvider as fallback for debug mode.',
        );
        return {
          token: 'fake-token-for-dev-init',
          expireTimeMillis: Date.now() + 3600 * 1000,
        };
      },
    });
  }
}
// --- PRODUCTION ENVIRONMENT LOGIC ---
else {
  // production
  if (typeof recaptchaSiteKey === 'string' && recaptchaSiteKey.trim() !== '') {
    // Note: ReCaptchaEnterpriseProvider automatically works in invisible mode
    // It will show a challenge only when needed (based on risk analysis)
    appCheckProvider = new ReCaptchaEnterpriseProvider(recaptchaSiteKey);
    console.info(
      '[Firebase App Check: PROD] Initializing with ReCAPTCHA Enterprise (invisible mode).',
    );
  } else {
    console.error(
      '[Firebase App Check: PROD] VITE_RECAPTCHA_ENTERPRISE_SITE_KEY is missing or empty. App Check will NOT be initialized, leaving Firebase services unprotected!',
    );
    // In production, if the essential key is missing, App Check cannot be set up.
    throw new Error('Firebase App Check configuration missing in production.');
  }
}

// Initialize App Check if a provider was successfully determined
if (appCheckProvider) {
  try {
    initializeAppCheck(app, {
      provider: appCheckProvider,
      isTokenAutoRefreshEnabled: true, // Recommended for a smooth user experience
    });
  } catch (err) {
    console.error('[Firebase App Check] initializeAppCheck call failed:', err);
  }
}
