# FCM Push Notifications - Handoff

## Current State (FCM-push branch)

### ✅ Done
- FCM infrastructure: `notification-controller.js`, `fcm-transport.js`
- Cloud Function deployed: `sendCallNotification` at `europe-west1`
- VAPID key configured in `.env.production` and `.env.development`
- Service worker FCM handling in `src/sw.js`
- Workbox deps added for SW build
- Node 20 upgrade for functions

### ⚠️ Fixed but needs CI verification
- **SW Firebase config injection** (`vite.config.js`): Fixed regex to match minified output (double quotes). Will work when GitHub Actions runs with secrets in `process.env`.

### ❌ Not Implemented - Required for "Missed Call" to work

**Issue: No trigger sends the notification**

Current code in `main.js:726-744` only logs:
```javascript
console.log('[MAIN] Would send call notification:', callData);
```

**Fix needed:** When a call ends unanswered, call the Cloud Function.

**Where to add trigger:**
1. `CallController.on('cleanup', ...)` in `main.js:1555` - fires when call ends
2. Check if call was answered (partnerId exists but connection never established)
3. Call `notificationController.sendCallNotification(targetUserId, callData)`

**Key question:** Who is the `targetUserId`?
- For missed call: the callee (person who didn't answer)
- The caller knows the callee's ID from the room or contact

### 🧹 Cleanup (minor)
- Delete `functions/sendNotification.js` (duplicate of `functions/index.js`)

## To Test After Deploy
1. Sign in, click "Test Notifications" button
2. Check console for `[FCMTransport] Token obtained: ...`
3. Check RTDB at `users/{userId}/fcmTokens/` for token entry
4. Check SW console for `[SW] HangVidU Service Worker with FCM support loaded`

## GitHub Secrets Needed
Ensure `VITE_FCM_VAPID_KEY` is added to repository secrets.
