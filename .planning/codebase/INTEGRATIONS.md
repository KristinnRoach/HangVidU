# External Integrations

**Analysis Date:** 2026-01-19

## APIs & External Services

**Google Identity Services:**
- Google One Tap Sign-In - Frictionless authentication
  - SDK: Google Identity Services (GIS) library loaded via script tag
  - Client: `src/firebase/onetap.js`
  - Auth: `VITE_APP_GOOGLE_CLIENT_ID`
  - Features: One Tap, FedCM support, automatic account selection

**Google Contacts API:**
- Contacts read access for contact import
  - SDK: GIS Token Model (OAuth2)
  - Client: `requestContactsAccess()` in `src/firebase/auth.js`
  - Scope: `contacts.readonly`, `contacts.other.readonly`
  - Auth: Uses same `VITE_APP_GOOGLE_CLIENT_ID`

**YouTube Data API v3:**
- Video search functionality
  - SDK: Direct REST API calls
  - Client: `src/media/youtube/youtube-search.js`
  - Auth: `VITE_YOUTUBE_API_KEY`
  - Endpoints used: `/search` for video discovery

**YouTube IFrame Player API:**
- Embedded video playback for watch-together
  - SDK: YouTube IFrame API (loaded dynamically)
  - Client: `src/media/youtube/youtube-player.js`
  - Auth: None required (public API)
  - Features: Play/pause/seek control, state synchronization

**Sentry:**
- Error tracking and monitoring
  - SDK: `@sentry/browser` 10.34.0
  - Client: `src/initSentry.js`
  - Auth: `VITE_SENTRY_DSN`
  - Features: Exception capture, optional PII collection

## Data Storage

**Firebase Realtime Database:**
- WebRTC signaling and real-time synchronization
  - Connection: `VITE_FIREBASE_DATABASE_URL`
  - Client: `src/storage/fb-rtdb/rtdb.js`
  - Features: Room management, ICE candidates, watch state sync, presence
  - Security: `database.rules.json` with auth-based access control

**Data Paths:**
```
rooms/{roomId}/           # WebRTC signaling data
  offer                   # SDP offer
  answer                  # SDP answer
  offerCandidates/        # ICE candidates from initiator
  answerCandidates/       # ICE candidates from joiner
  members/                # Connected participants
  watch/                  # Watch-together sync state
  cancellation            # Call cancellation signal

users/{userId}/           # User-specific data
  contacts/               # Saved contacts
  incomingInvites/        # Pending contact invitations
  acceptedInvites/        # Accepted invitations
  recentCalls/            # Call history
  outgoingCall            # Active outgoing call
  presence/               # Online/offline status

usersByEmail/{emailHash}/ # Email-based user lookup

conversations/{id}/       # Direct messages
  messages/               # Message content
```

**IndexedDB (Dexie):**
- Local persistent storage
  - Client: `src/storage/idb/idb.js`
  - Database: `HangVidU:Contacts`
  - Tables: `contacts` (roomId, lastConnected)
  - Purpose: Offline-capable contact storage

**LocalStorage:**
- Simple key-value preferences
  - Client: `src/storage/local/recent-rooms-local.js`
  - Purpose: Guest user ID persistence, recent rooms

## Authentication & Identity

**Firebase Authentication:**
- Primary auth provider
  - SDK: `firebase/auth` from Firebase SDK
  - Client: `src/firebase/auth.js`
  - Providers: Google (via popup or One Tap)
  - Persistence: IndexedDB (primary), LocalStorage (fallback), in-memory (last resort)
  - Features:
    - `signInWithPopup` for explicit sign-in
    - `signInWithCredential` for One Tap
    - iOS PWA Safari fallback handling
    - Guest user support with TTL-based IDs

**Firebase App Check:**
- App attestation to protect backend resources
  - SDK: `firebase/app-check`
  - Client: `src/firebase/firebase.js`
  - Provider: reCAPTCHA Enterprise (invisible mode)
  - Auth: `VITE_RECAPTCHA_ENTERPRISE_SITE_KEY`
  - Development: Debug token support via `VITE_FIREBASE_APP_CHECK_DEBUG_TOKEN`

## Monitoring & Observability

**Error Tracking:**
- Sentry (optional)
  - Initialization: `src/initSentry.js`
  - Config: `VITE_SENTRY_DSN` env var
  - Features: Exception capture, default PII enabled

**Logs:**
- Console logging with dev-only helpers
  - `devDebug()` from `src/utils/dev/dev-utils.js` - Development-only logging
  - Production logs use `console.info/warn/error` with PII redaction

**Presence Tracking:**
- Firebase RTDB presence system
  - Client: `src/firebase/presence.js`
  - Features: Online/offline status, last seen timestamp
  - Implementation: `onDisconnect()` for automatic offline on disconnect

## CI/CD & Deployment

**Firebase Hosting:**
- Primary production deployment
  - Config: `firebase.json`
  - Deploy: `pnpm deploy:fb`
  - Features: SPA rewrites, static asset hosting

**GitHub Pages:**
- Secondary deployment
  - Deploy: `pnpm deploy:gh` (uses gh-pages package)
  - Base path: `/HangVidU/`

**Development Tunneling:**
- ngrok for external access during development
  - Config: `NGROK_DOMAIN` env var (optional)
  - Purpose: Mobile device testing, webhook testing

## Environment Configuration

**Required env vars:**
```bash
# Firebase Core
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_DATABASE_URL=
VITE_FIREBASE_APP_ID=

# Google Auth
VITE_APP_GOOGLE_CLIENT_ID=

# Firebase App Check
VITE_RECAPTCHA_ENTERPRISE_SITE_KEY=
```

**Optional env vars:**
```bash
# YouTube (enables search)
VITE_YOUTUBE_API_KEY=

# Sentry (enables error tracking)
VITE_SENTRY_DSN=

# Firebase Optional
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_MEASUREMENT_ID=

# Development
VITE_FIREBASE_APP_CHECK_DEBUG_TOKEN=
NGROK_DOMAIN=
VITE_PORT=5173
```

**Secrets location:**
- Local: `.env`, `.env.development`, `.env.production` (not committed)
- Production: Firebase environment or hosting platform secrets

## Webhooks & Callbacks

**Incoming:**
- Firebase Auth handler: `/__/auth/handler` (proxied in dev)
- Firebase init.json: `/__/firebase/init.json` (proxied in dev)

**Outgoing:**
- None (all integrations use client-side SDKs)

## WebRTC Configuration

**STUN/TURN Servers:**
- Uses Google's public STUN servers (default in browser)
- ICE candidate exchange via Firebase RTDB
- Implementation: `src/webrtc/ice.js`, `src/webrtc/call-flow.js`

**Signaling:**
- Firebase RTDB for SDP offer/answer exchange
- Room-based signaling model
- Automatic ICE restart on connection failure

---

*Integration audit: 2026-01-19*
