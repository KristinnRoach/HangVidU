# External Integrations

**Analysis Date:** 2026-01-08

## APIs & External Services

**Authentication:**
- Google OAuth 2.0 - Via Google Identity Services library (loaded from Google CDN)
  - Google One Tap integration - `src/firebase/onetap.js`
  - Popup/Redirect OAuth flow - `src/firebase/auth.js`
  - Client ID: `VITE_APP_GOOGLE_CLIENT_ID` (environment variable)
  - Handles both authenticated and guest users

**Real-time Synchronization & Signaling:**
- Firebase Realtime Database (RTDB) - WebRTC signaling, watch-together state sync, contact messaging
  - Project: `vidu-aae11` (from `.env.production`)
  - Database URL: `https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app`
  - Implementation: `src/storage/fb-rtdb/rtdb.js`, `src/room.js`, `src/firebase/watch-sync.js`, `src/firebase/messaging.js`
  - Data stored: Room offers/answers, ICE candidates, watch state, messages, presence

**Security & Bot Prevention:**
- Firebase App Check with reCAPTCHA Enterprise - Protects Firebase services from abuse
  - Provider: ReCaptchaEnterpriseProvider (invisible mode in production)
  - Implementation: `src/firebase/firebase.js`
  - Config: `VITE_RECAPTCHA_ENTERPRISE_SITE_KEY` (environment variable)

**Media & Content:**
- YouTube Data API v3 - Video search functionality
  - Endpoint: `https://www.googleapis.com/youtube/v3`
  - API Key: `VITE_YOUTUBE_API_KEY` (environment variable)
  - Implementation: `src/media/youtube/youtube-search.js`

**Error Tracking & Monitoring:**
- Sentry - Error reporting, performance monitoring
  - DSN: `VITE_SENTRY_DSN` (environment variable, from `.env.production`)
  - Client: @sentry/browser 10.26.0
  - Implementation: `src/initSentry.js`

**Hosting & Deployment:**
- Firebase Hosting - Production hosting with HTTPS
  - Host URL: `https://vidu-aae11.web.app`
  - Deployment: `pnpm deploy:fb` → Firebase CLI
- GitHub Pages - Alternative deployment target
  - Deployment: `pnpm deploy:gh` → gh-pages CLI

**Development Tools:**
- ngrok - HTTPS tunnel for local development with remote testing
  - Config: `NGROK_DOMAIN` (optional custom domain)
  - Implementation: `package.json` scripts, `scripts/show-ngrok-url.sh`

## Data Storage

**Databases:**
- Firebase Realtime Database - Primary real-time data store
  - Connection: via Firebase SDK initialized in `src/firebase/firebase.js`
  - Client: Firebase 12.4.0
  - Data: Rooms, signaling, watch state, messages, contacts, presence

**File Storage:**
- Not currently used (Firebase Storage configured but inactive)

**Caching:**
- None - No Redis or external caching layer

**Local Storage:**
- IndexedDB (Dexie 4.2.1) - Local contact management and call history (`src/storage/idb/idb.js`)
- LocalStorage - Guest user IDs, recent calls (fallback), UI preferences (`src/storage/local/`)
- Browser Memory - Active call state, streams, peer connection

## Authentication & Identity

**Auth Provider:**
- Firebase Auth - Email/password + OAuth
  - Implementation: Firebase SDK with Google provider
  - Token storage: IndexedDB (primary), LocalStorage (fallback), in-memory (last resort)
  - Session management: Firebase handles token refresh automatically
  - Guest support: Random IDs cached for session (`src/firebase/auth.js`)

**OAuth Integrations:**
- Google OAuth - Social sign-in with One Tap
  - Credentials: `VITE_APP_GOOGLE_CLIENT_ID` (Supabase dashboard)
  - Scopes: email, profile
  - Special handling for iOS PWA mode (`src/utils/env/redirectIOSPWA.js`)

## Monitoring & Observability

**Error Tracking:**
- Sentry - Server and client errors
  - DSN: `VITE_SENTRY_DSN` environment variable
  - Implementation: `src/initSentry.js`

**Analytics:**
- None (Firebase Analytics configured but not actively used)

**Logs:**
- Browser console only - No external logging service
  - Dev logging via `src/utils/dev/dev-utils.js` and `src/utils/dev/diagnostic-logger.js`

## CI/CD & Deployment

**Hosting:**
- Firebase Hosting - Primary target
  - Deployment: Automatic via `pnpm deploy:fb`
  - Environment vars: Configured in `.env.production`
- GitHub Pages - Secondary target
  - Deployment: Manual via `pnpm deploy:gh`
  - Base path: `/HangVidU/`

**CI Pipeline:**
- None detected - Manual deployment only

## Environment Configuration

**Development:**
- Required env vars: Firebase config, YouTube API key, reCAPTCHA key
- Secrets location: `.env.development` (gitignored)
- Mock/stub services: Firebase Auth test mode, test API keys

**Production:**
- Secrets management: Environment variables in Firebase Hosting config
- Data: Firebase Realtime Database with production rules

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

## Third-Party Integrations

**WebRTC Infrastructure:**
- Browser native WebRTC APIs (no third-party WebRTC server)
  - RTCPeerConnection, MediaDevices.getUserMedia, DataChannel
  - STUN/TURN servers configured via Firebase/environment
  - Implementation: `src/webrtc/call-flow.js`, `src/media/stream.js`

**Service Worker & PWA:**
- Workbox (via vite-plugin-pwa) - Service Worker generation and caching
  - Cache strategies, offline support
  - Implementation: `vite.config.js` VitePWA plugin configuration
  - Update handling: `src/pwa/PWA.js`, `src/components/notifications/pwa-update-toast.js`

**Font & Icons:**
- Font Awesome 7.1.0 - UI icons via CSS
  - Implementation: `src/main.js` (imports `@fortawesome/fontawesome-free/css/all.min.css`)

## Environment Variables (Reference)

Located in `.env.development` and `.env.production`:

| Variable | Service | Purpose |
|----------|---------|---------|
| `VITE_APP_GOOGLE_CLIENT_ID` | Google OAuth | Authentication |
| `VITE_FIREBASE_API_KEY` | Firebase | SDK initialization |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth | OAuth redirect domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase | Project identification |
| `VITE_FIREBASE_DATABASE_URL` | Firebase RTDB | Real-time database connection |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Storage | Optional media storage |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase | Cloud messaging (optional) |
| `VITE_FIREBASE_MEASUREMENT_ID` | Firebase Analytics | Usage tracking (optional) |
| `VITE_FIREBASE_APP_ID` | Firebase | App identification |
| `VITE_RECAPTCHA_ENTERPRISE_SITE_KEY` | reCAPTCHA Enterprise | Bot prevention |
| `VITE_YOUTUBE_API_KEY` | YouTube API | Video search |
| `VITE_SENTRY_DSN` | Sentry | Error reporting endpoint |
| `VITE_APP_HOSTING_URL` | Firebase Hosting | Canonical app URL |
| `NGROK_DOMAIN` | ngrok (dev only) | Custom tunnel domain |

**Note:** All values must be kept secret. Never commit `.env` files to version control.

---

*Integration audit: 2026-01-08*
*Update when adding/removing external services*
