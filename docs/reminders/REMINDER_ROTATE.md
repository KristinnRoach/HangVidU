# Reminder: Rotate API Keys

**First: add a calendar reminder** for the next rotation (suggested cadence: every 6 months).

## Current keys in use (project `vidu-aae11`)

- `HangVidU Browser key 250326` → `VITE_FIREBASE_API_KEY` in `.env.development`, `.env.production`
- `YT hangvidu 1` → `VITE_YOUTUBE_API_KEY` in `.env`, `.env.development`, `.env.production`

## Keys safe to delete (verified unused in codebase + git history)

- `VidU (auto created by Firebase)` — unrestricted, security risk if leaked
- `Google Cloud APIs VidU` — unused
- Legacy rotated key `AIzaSy...FeHA` sitting in `.env` line 12

## Rotation steps (zero-downtime, PWA-safe)

1. **GCP Console** → APIs & Services → Credentials → "Create a copy" on each key (NOT "Rotate" — safer for PWA with cached service worker bundles)
2. Name new keys with date: `vidu-web-firebase-YYMMDD`, `vidu-web-youtube-YYMMDD`
3. Copy restrictions to new keys (referrers: `vidu-aae11.web.app/*`, `vidu-aae11.firebaseapp.com/*`, `http://localhost:5173/*`; API restrictions same as old)
4. Also add referrer restrictions to YouTube key (currently has none)
5. Update `.env.development` and `.env.production` with new key values
6. Remove dead `VITE_FIREBASE_API_KEY` from `.env` (line 12)
7. `pnpm build && pnpm deploy:fb` and verify prod works (login, messaging, YouTube search)
8. Wait 24–48h for PWA service worker bundles to refresh on user devices
9. Delete old keys in GCP

## YouTube quota note

Default is 10k units/day; `search.list` costs 100 units each. If hitting limits, request a free quota increase via GCP Console → YouTube Data API v3 → Quotas → "Request higher quota" (audit form, ~2–4 weeks).
