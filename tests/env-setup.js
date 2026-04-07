// tests/setup.js
// Stub import.meta.env for tests so Firebase config does not throw
try {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    Object.assign(import.meta.env, {
      VITE_FIREBASE_API_KEY: 'dummy',
      VITE_FIREBASE_AUTH_DOMAIN: 'dummy',
      VITE_FIREBASE_PROJECT_ID: 'dummy',
      VITE_APP_GOOGLE_CLIENT_ID: 'dummy',
    });
  }
} catch {}

// Browser mode provides native WebRTC APIs - no mocking needed
