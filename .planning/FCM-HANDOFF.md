# FCM Push Notifications - Handoff

## Current State (FCM-push branch)

### ✅ Done

- FCM infrastructure: `notification-controller.js`, `fcm-transport.js`
- Cloud Function deployed: `sendCallNotification` at `europe-west1`
- VAPID key configured in `.env.production` and `.env.development`
- Service worker FCM handling in `src/sw.js`
- Workbox deps added for SW build
- Node 20 upgrade for functions
- Missed call trigger implemented in `main.js` cleanup handler
- `CallController` tracks `wasConnected` and `role`
- `notificationController` & `fcmTransport` support `sendMissedCallNotification`
- Cloud function updated to handle 'missed_call' type dynamically

### ⚠️ Fixed but needs CI verification

- **SW Firebase config injection** (`vite.config.js`): Fixed regex to match minified output (double quotes). Will work when GitHub Actions runs with secrets in `process.env`.

### ❌ Not Implemented

- (None - Missed call logic implemented)

### 🧹 Cleanup (minor)

- Delete `functions/sendNotification.js` (Completed)

## To Test After Deploy

1. Sign in, click "Test Notifications" button
2. Check console for `[FCMTransport] Token obtained: ...`
3. Check RTDB at `users/{userId}/fcmTokens/` for token entry
4. Check SW console for `[SW] HangVidU Service Worker with FCM support loaded`

## GitHub Secrets Needed

Ensure `VITE_FCM_VAPID_KEY` is added to repository secrets.
