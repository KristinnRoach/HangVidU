# External Integrations

**Analysis Date:** 2025-12-26

## APIs & External Services

**Firebase (Google Cloud) - Backend Infrastructure:**
- Firebase Authentication with Google OAuth
  - Google One Tap integration - `src/firebase/onetap.js`
  - Client ID: `VITE_APP_GOOGLE_CLIENT_ID`
  - SDK: firebase/auth from firebase 12.4.0
  - Session persistence: IDB → localStorage → in-memory fallback chain

- Firebase Realtime Database (RTDB) - WebRTC signaling and synchronization
  - Database URL: `VITE_FIREBASE_DATABASE_URL`
  - Configuration: `src/firebase/firebase.js`, `src/storage/fb-rtdb/rtdb.js`
  - Usage: Room management, ICE candidates, watch-together video sync
  - Listener tracking: Scoped cleanup to prevent memory leaks

- Firebase App Check with ReCAPTCHA Enterprise - Security
  - Site Key: `VITE_RECAPTCHA_ENTERPRISE_SITE_KEY`
  - Debug Token: `VITE_FIREBASE_APP_CHECK_DEBUG_TOKEN` (development only)

- Firebase Hosting - Primary deployment platform
  - Project: `vidu-aae11` (`.firebaserc`)
  - Deploy command: `pnpm fb-deploy`

**YouTube Integration:**
- YouTube Data API v3 - Video search
  - API Key: `VITE_YOUTUBE_API_KEY`
  - Endpoint: `https://www.googleapis.com/youtube/v3`
  - Module: `src/media/youtube/youtube-search.js`

- YouTube Player IFrame API - Embedded playback
  - Module: `src/media/youtube/youtube-player.js`
  - Watch-together sync: `src/firebase/watch-sync.js`
  - Bidirectional state synchronization via Firebase RTDB

**Error Tracking & Monitoring:**
- Sentry Browser SDK - Error reporting and performance
  - DSN: `VITE_SENTRY_DSN`
  - Configuration: `src/initSentry.js`
  - Captures unhandled errors and WebRTC failures

## Data Storage

**Databases:**
- Firebase Realtime Database - Cloud synchronization
  - Connection: `VITE_FIREBASE_DATABASE_URL`
  - SDK: firebase/database
  - Usage: Room signaling, watch state, user presence

**Local Storage:**
- IndexedDB via Dexie 4.2.1 - Persistent contacts
  - Module: `src/storage/idb/idb.js`
  - Database: Contacts table
  - Fallback: localStorage (`src/storage/local/`)

**Caching:**
- Service Worker cache (Workbox) - PWA offline assets
  - Configuration: `vite.config.js` (vite-plugin-pwa)
  - Module: `src/pwa/PWA.js`

## Authentication & Identity

**Auth Provider:**
- Firebase Authentication - Email/password + OAuth
  - Implementation: `src/firebase/auth.js`
  - Google One Tap: `src/firebase/onetap.js`
  - Token storage: httpOnly persistence via Firebase SDK
  - Session management: Auto-refresh with Firebase
  - Guest mode: Random ID generation with session caching

**OAuth Integrations:**
- Google OAuth - Social sign-in
  - Credentials: `VITE_APP_GOOGLE_CLIENT_ID`
  - Scopes: email, profile
  - One Tap enabled for streamlined login

## Monitoring & Observability

**Error Tracking:**
- Sentry - Client-side error monitoring
  - DSN: `VITE_SENTRY_DSN`
  - PII tracking enabled: sendDefaultPii

**Analytics:**
- Not detected (no analytics service integrated)

**Logs:**
- Browser console only
  - Development: Debug logger (`src/utils/dev/diagnostic-logger.js`)
  - Production: Sentry captures errors

## CI/CD & Deployment

**Hosting:**
- Firebase Hosting - Primary deployment
  - Deployment: `pnpm fb-deploy` (build:hosting + firebase deploy)
  - Environment vars: Firebase project config
  - Custom domain supported

- GitHub Pages - Secondary deployment
  - Deployment: `pnpm gh-deploy` (npx gh-pages -d dist)
  - Base path: `/HangVidU/`

**CI Pipeline:**
- Not detected (manual deployment)

## Environment Configuration

**Development:**
- Required env vars: Firebase config, YouTube API key, Sentry DSN, ReCAPTCHA key
- Secrets location: `.env.development` (gitignored)
- HTTPS: Self-signed cert via vite-plugin-mkcert
- Mobile testing: ngrok tunnel (via `pnpm ngrok`)
  - Port: `NGROK_PORT`
  - Optional custom domain: `NGROK_DOMAIN`

**Production:**
- Secrets management: Environment variables in Firebase Hosting config
- Build targets: GitHub Pages (base: `/HangVidU/`) or Firebase Hosting (base: `/`)
- Switch via: BUILD_TARGET environment variable

## WebRTC Infrastructure

**STUN/TURN Servers:**
- Google STUN server for NAT traversal
  - Server: `stun:stun.l.google.com:19302`
  - Configuration: `src/webrtc/webrtc-utils.js`
  - No commercial TURN service (restrictive NATs may fail)

## Browser APIs (Native)

**WebRTC:**
- RTCPeerConnection - P2P video connections
- getUserMedia - Camera/microphone access
- DataChannel - In-call messaging

**Storage:**
- IndexedDB - Contact persistence (via Dexie)
- localStorage - Session preferences and fallback storage

**PWA:**
- Service Workers - Offline support (via Workbox)
- Web App Manifest - Installation on mobile/desktop

## Webhooks & Callbacks

**Incoming:**
- None detected

**Outgoing:**
- None detected

---

*Integration audit: 2025-12-26*
*Update when adding/removing external services*
