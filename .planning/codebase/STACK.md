# Technology Stack

**Analysis Date:** 2026-01-19

## Languages

**Primary:**
- JavaScript (ES Modules) - All application code in `src/`

**Secondary:**
- TypeScript - Type definitions only (`src/env.d.ts`)
- CSS - Modular styling system in `src/styles/`
- HTML - Entry points (`index.html`, `experiments.html`)

## Runtime

**Environment:**
- Node.js v22.12.0+

**Package Manager:**
- pnpm 10.24.0+
- Lockfile: `pnpm-lock.yaml` present

## Frameworks

**Core:**
- Vite 7.1.12 - Build tool and dev server
- Lit 3.3.1 - Web components (used sparingly, e.g., `src/components/base/button/lit-icon-button.draft.js`)

**Testing:**
- Vitest 4.0.13 - Unit/integration tests (browser mode)
- Playwright 1.56.1 - E2E tests and Vitest browser provider

**Build/Dev:**
- vite-plugin-pwa 1.1.0 - PWA generation with Workbox
- vite-plugin-mkcert 1.17.9 - Local HTTPS certificates
- concurrently 9.0.0 - Parallel dev processes
- ngrok - External tunneling for mobile testing

## Key Dependencies

**Critical:**
- `firebase` 12.8.0 - Authentication, Realtime Database, App Check
- `dexie` 4.2.1 - IndexedDB wrapper for local persistence
- `@sentry/browser` 10.34.0 - Error tracking and monitoring
- `workbox-window` 7.4.0 - Service worker registration for PWA

**UI:**
- `@fortawesome/fontawesome-free` 7.1.0 - Icon library

**Infrastructure:**
- Native WebRTC APIs - Peer-to-peer video connections (no external WebRTC library)
- YouTube IFrame API - Video player for watch-together mode

## Configuration

**Environment:**
- `.env` files for environment-specific config (`.env`, `.env.development`, `.env.production`)
- All environment variables prefixed with `VITE_` for client exposure
- Key required vars:
  - `VITE_FIREBASE_API_KEY`
  - `VITE_FIREBASE_AUTH_DOMAIN`
  - `VITE_FIREBASE_PROJECT_ID`
  - `VITE_FIREBASE_DATABASE_URL`
  - `VITE_APP_GOOGLE_CLIENT_ID`
  - `VITE_RECAPTCHA_ENTERPRISE_SITE_KEY`
  - `VITE_YOUTUBE_API_KEY` (optional, enables search)
  - `VITE_SENTRY_DSN` (optional, enables error tracking)

**Build:**
- `vite.config.js` - Main build configuration
- `vitest.config.js` - Test runner configuration
- `playwright.config.js` - E2E test configuration
- `firebase.json` - Firebase Hosting and Database rules
- `database.rules.json` - Firebase RTDB security rules

**Build Targets:**
- GitHub Pages: Base path `/HangVidU/` (default)
- Firebase Hosting: Base path `/` (set `BUILD_TARGET=hosting`)

## Platform Requirements

**Development:**
- Node.js 22+
- pnpm 10+
- HTTPS required (mkcert provides local certs)
- Camera/microphone permissions for WebRTC testing

**Production:**
- Firebase Hosting (primary)
- GitHub Pages (secondary)
- Modern browser with WebRTC support (Chrome, Firefox, Safari, Edge)
- PWA installable on supported platforms

**Browser Support:**
- Chromium-based browsers (Chrome, Edge)
- Firefox
- WebKit (Safari, iOS Safari)
- Tests run against all three via Vitest browser mode

---

*Stack analysis: 2026-01-19*
