# Technology Stack

**Analysis Date:** 2025-12-26

## Languages

**Primary:**
- JavaScript (ES6+) - All application code (`src/**/*.js`)

**Secondary:**
- HTML5 - Entry points (`index.html`, `experiments.html`)
- CSS3 - Modular styling (`src/styles/**/*.css`)

## Runtime

**Environment:**
- Browser runtime: Chrome/Chromium, Firefox, WebKit/Safari (WebRTC and PWA support required)
- Node.js (for development tooling only)

**Package Manager:**
- pnpm - Primary package manager
- Lockfile: `pnpm-lock.yaml`

## Frameworks

**Core:**
- Lit 3.3.1 - Web components framework for base components (`src/components/base/`)

**Testing:**
- Vitest 4.0.13 - Unit/Integration testing with browser mode
- @vitest/browser-playwright 4.0.13 - Browser testing provider for native WebRTC APIs
- Playwright 1.56.1 - E2E testing framework

**Build/Dev:**
- Vite 7.1.12 - Build tool and dev server (`vite.config.js`)
- vite-plugin-pwa 1.1.0 - Progressive Web App support with Workbox
- vite-plugin-mkcert 1.17.9 - Self-signed certificates for HTTPS development
- workbox-window 7.4.0 - Service Worker client library
- concurrently 9.0.0 - Run multiple processes (dev server + ngrok)

## Key Dependencies

**Critical:**
- firebase 12.4.0 - Backend services (`src/firebase/firebase.js`)
  - firebase/auth - Authentication with Google OAuth
  - firebase/database - Realtime Database for signaling and watch sync
  - firebase/app-check - ReCAPTCHA Enterprise security
- dexie 4.2.1 - IndexedDB wrapper for persistent local data (`src/storage/idb/idb.js`)
- @fortawesome/fontawesome-free 7.1.0 - Icon library

**Infrastructure:**
- @sentry/browser 10.26.0 - Error tracking and monitoring (`src/initSentry.js`)
- fkill-cli 9.0.0 - Port cleanup utility (development)

## Configuration

**Environment:**
- `.env` files with VITE_ prefix - `.env.example`, `.env.development`, `.env.production`
- Required variables:
  - Firebase config (VITE_FIREBASE_*)
  - YouTube API key (VITE_YOUTUBE_API_KEY)
  - Sentry DSN (VITE_SENTRY_DSN)
  - ReCAPTCHA Enterprise site key (VITE_RECAPTCHA_ENTERPRISE_SITE_KEY)

**Build:**
- `vite.config.js` - Build configuration with dual deployment targets
- `vitest.config.js` - Test configuration with browser mode
- `playwright.config.js` - E2E test configuration
- `firebase.json` - Firebase Hosting deployment config
- `.firebaserc` - Firebase project association

## Platform Requirements

**Development:**
- Any platform with Node.js (macOS/Linux/Windows)
- HTTPS required for WebRTC (handled by vite-plugin-mkcert)
- ngrok for mobile device testing (optional, via `pnpm ngrok`)

**Production:**
- Deployment targets:
  - Firebase Hosting (primary, base path: `/`)
  - GitHub Pages (secondary, base path: `/HangVidU/`)
- Browser requirements:
  - WebRTC support (Chrome 74+, Firefox 66+, Safari 12.1+)
  - Service Worker support for PWA features
  - IndexedDB for local persistence

---

*Stack analysis: 2025-12-26*
*Update after major dependency changes*
