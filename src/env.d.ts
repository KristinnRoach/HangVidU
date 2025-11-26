/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Firebase Configuration
  readonly VITE_FIREBASE_API_KEY: string
  readonly VITE_FIREBASE_AUTH_DOMAIN: string
  readonly VITE_FIREBASE_DATABASE_URL: string
  readonly VITE_FIREBASE_PROJECT_ID: string
  readonly VITE_FIREBASE_STORAGE_BUCKET: string
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string
  readonly VITE_FIREBASE_APP_ID: string
  readonly VITE_FIREBASE_MEASUREMENT_ID: string

  // Google Services
  readonly VITE_APP_GOOGLE_CLIENT_ID: string
  readonly VITE_YOUTUBE_API_KEY: string

  // reCAPTCHA
  readonly VITE_RECAPTCHA_ENTERPRISE_SITE_KEY: string
  readonly VITE_RECAPTCHA_ENTERPRISE_SECRET_KEY: string

  // Application
  readonly VITE_APP_HOSTING_URL: string
  readonly VITE_SENTRY_DSN: string

  // Development
  readonly NGROK_DOMAIN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
