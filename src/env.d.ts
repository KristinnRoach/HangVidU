/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Firebase Configuration
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_DATABASE_URL: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_FIREBASE_MEASUREMENT_ID: string;
  readonly VITE_PUSH_VAPID_KEY: string;

  // Google Services
  readonly VITE_APP_GOOGLE_CLIENT_ID: string;
  readonly VITE_YOUTUBE_API_KEY: string;

  // reCAPTCHA
  readonly VITE_RECAPTCHA_ENTERPRISE_SITE_KEY: string;

  // Application
  readonly VITE_ENABLE_PWA: string;
  readonly VITE_SENTRY_DSN: string;

  // Realtime signaling (Cloudflare Durable Object worker)
  readonly VITE_SIGNALING_URL: string;
  readonly VITE_SIGNALING_BACKEND: 'do' | 'rtdb';

  // R2-backed file storage worker
  readonly VITE_FILES_URL: string;

  // D1-backed message persistence worker
  readonly VITE_DATA_URL: string;
  readonly VITE_MESSAGE_BACKEND: 'd1' | 'rtdb';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
