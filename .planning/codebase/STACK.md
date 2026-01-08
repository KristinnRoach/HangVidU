# Technology Stack

**Analysis Date:** 2026-01-08

## Languages

**Primary:**
- JavaScript (ES6+) - All application code (`src/**/*.js`)

**Secondary:**
- None

## Runtime

**Environment:**
- Node.js - No explicit version constraint (no `.nvmrc` file detected)
- Browser Runtime - Modern browsers with WebRTC, Web Audio, and Media APIs support

**Package Manager:**
- pnpm - Package manager with `pnpm-lock.yaml` lockfile

## Frameworks

**Core:**
- Vanilla JavaScript - Primary application code
- Lit 3.3.1 - Web components library for select UI components (`src/components/base/button/lit-icon-button.draft.js`)

**Testing:**
- Vitest 4.0.13 - Unit and integration tests in browser mode
- @vitest/browser-playwright 4.0.13 - Browser test provider
- Playwright 1.56.1 - End-to-end testing framework

**Build/Dev:**
- Vite 7.1.12 - Build tool and dev server (`vite.config.js`)
- vite-plugin-pwa 1.1.0 - Progressive Web App generation
- vite-plugin-mkcert 1.17.9 - Self-signed certificate generation for HTTPS development

## Key Dependencies

**Critical:**
- Firebase 12.4.0 - Real-time database, authentication, hosting (`src/firebase/firebase.js`, `src/firebase/auth.js`)
- Dexie 4.2.1 - IndexedDB wrapper for local data persistence (`src/storage/idb/idb.js`)

**Infrastructure:**
- @sentry/browser 10.26.0 - Error tracking and monitoring (`src/initSentry.js`)
- workbox-window 7.4.0 - Service Worker client library for PWA updates
- @fortawesome/fontawesome-free 7.1.0 - Icon library

**Development:**
- concurrently 9.0.0 - Run multiple npm scripts (dev + ngrok)
- fkill-cli 9.0.0 - Kill processes on ports for dev cleanup

## Configuration

**Environment:**
- `.env.development` - Development environment variables (Firebase keys, YouTube API key)
- `.env.production` - Production environment variables (Firebase keys, Sentry DSN)
- `.env.example` - Template for required environment variables
- All environment variables prefixed with `VITE_` for client exposure

**Build:**
- `vite.config.js` - Vite configuration with PWA and HTTPS dev settings
- Two build targets: `/HangVidU/` base path (GitHub Pages) or `/` (Firebase Hosting)
- Configured via `BUILD_TARGET` environment variable

## Platform Requirements

**Development:**
- Any platform with Node.js support (macOS, Linux, Windows)
- No external dependencies beyond Node.js and pnpm
- ngrok for HTTPS tunnel in local development (optional custom domain via `NGROK_DOMAIN`)

**Production:**
- Firebase Hosting - Primary deployment target (`vidu-aae11.web.app`)
- GitHub Pages - Secondary deployment target with `/HangVidU/` base path
- Modern browsers with WebRTC support (Chrome, Firefox, Safari, Edge)

---

*Stack analysis: 2026-01-08*
*Update after major dependency changes*
