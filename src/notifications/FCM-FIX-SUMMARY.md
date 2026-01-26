# FCM Push Notifications - Fix Summary

This document summarizes all fixes applied to enable FCM push notifications in production.

---

## Issues Fixed

### 1. ✅ Permissions Not Requested on Page Load (Production)

**Commit:** `9339386` - feat: request notification permissions on page load in production

**Problem:** Users in production were never prompted for notification permissions.

**Solution:** Added automatic permission request on page load in production if permissions are in 'default' state.

**Impact:** Users now see the browser's native notification permission prompt on first visit.

---

### 2. ✅ Permission Request Blocks App Initialization

**Commit:** `64c35bc` - fix: make notification permission request non-blocking

**Problem:** `await notificationController.requestPermission()` blocked the entire app initialization until user responded to the prompt.

**Solution:** Removed `await` and added `.catch()` for graceful error handling. App now loads immediately regardless of permission prompt response.

**Impact:** Faster startup time, better UX - users can interact with app while deciding on permissions.

---

### 3. ✅ Second User Gets No FCM Token (Same Tab Session)

**Commit:** `71bc57b` - fix: enable FCM notifications when user logs in (not just page load)

**Problem:** When User 2 logged in after User 1 (same tab, no reload), no FCM token was obtained. This caused 404 errors when trying to send notifications.

**Root Cause:** FCM initialization only ran during `init()` (page load). When User 2 logged in, `init()` didn't run again.

**Solution:** Added FCM token setup in `onAuthChange` handler for `isActualLogin` event. Now when any user logs in, the app:

1. Checks if notification permission is granted
2. Calls `notificationController.enable()` to get that user's FCM token
3. Stores the token in RTDB under their user ID

**Impact:** Multi-user sessions in same tab now work correctly. Each user gets their own FCM token.

---

### 4. ✅ Duplicate Missed Call Notifications

**Commit:** `c95c396` - fix: prevent duplicate missed call notifications

**Problem:** User B received TWO identical missed call notifications when User A cancelled.

**Root Cause:** When User A cancelled (via Cancel button or hangUp):

1. `RoomService.cancelCall()` wrote cancellation to RTDB
2. User A's own cancellation listener fired (self-triggered)
3. Listener called `cleanupCall()` → missed call notification sent
4. Without fix, cleanup happened twice → two notifications

**Solution:** Cancellation listener now checks if `cancel.by === currentUserId` and ignores self-triggered cancellations.

**Impact:** User B now receives exactly ONE missed call notification per cancelled call.

---

## Testing

### Test Coverage

- **Total Tests:** 229 tests (all passing)
- **New Tests:** 5 tests for cancellation self-trigger prevention
- **Test Files:** 29 test files

### Manual Testing Guides

- `QUICK-BROWSER-TEST.md` - Browser console tests for FCM
- `MULTI-USER-TEST.md` - Multi-user same-tab session test
- `NOTIFICATION-FLOW.md` - Complete flow documentation
- `quick-curl-test.md` - cURL commands for testing Cloud Function

---

## Architecture Changes

### Before

```
Page Load → init() → FCM initialized → Permission requested (if default)
                                    → Token obtained (if granted)

User Login → No FCM action
User Logout → Token deleted

User A Cancels → RoomService.cancelCall() writes cancellation
                → User A's listener fires → cleanupCall() #1
                → (some other path) → cleanupCall() #2
                → TWO missed call notifications
```

### After

```
Page Load → init() → FCM initialized → Permission requested (if default, non-blocking)
                                    → Token obtained (if granted)

User Login → onAuthChange → FCM token obtained for new user
User Logout → Token deleted

User A Cancels → RoomService.cancelCall() writes cancellation
                → User A's listener fires → checks cancel.by === currentUserId
                                          → IGNORES (self-triggered)
                → Only explicit cleanup runs
                → ONE missed call notification
```

---

## Files Modified

### Core Changes

1. `src/main.js`
   - Added non-blocking permission request on page load (production)
   - Added FCM token setup in `onAuthChange` for login events

2. `src/webrtc/call-controller.js`
   - Added self-trigger check in `setupCancellationListener`
   - Prevents duplicate cleanup from own cancellations

### Documentation Added

1. `src/notifications/NOTIFICATION-FLOW.md` - Complete flow explanation
2. `src/notifications/QUICK-BROWSER-TEST.md` - Browser console tests
3. `src/notifications/MULTI-USER-TEST.md` - Multi-user test guide
4. `src/notifications/quick-curl-test.md` - cURL testing commands
5. `src/notifications/FCM-FIX-SUMMARY.md` - This document

### Tests Added

1. `tests/unit/cancellation-self-trigger.test.js` - 5 new tests

---

## Cloud Function

**Status:** ✅ Deployed and working

**URL:** `https://europe-west1-vidu-aae11.cloudfunctions.net/sendCallNotification`

**Verification:**

```bash
firebase functions:list --project vidu-aae11
```

**Logs:**

```bash
firebase functions:log --project vidu-aae11
```

---

## Known Limitations

1. **Browser Compatibility:** FCM requires service worker support (not available in all browsers)
2. **iOS Safari:** Limited notification support (works better as PWA)
3. **Permission Persistence:** Browser-level permission is shared across all users in same browser
4. **Token Expiration:** FCM tokens can expire and need refresh (handled by FCM SDK)

---

## Future Improvements

1. **Custom Pre-Prompt:** Show custom UI before browser's native permission prompt
2. **Permission Timing:** Delay permission request until user performs first action (better UX)
3. **Notification Actions:** Add "Accept" and "Decline" buttons to notifications
4. **Notification Grouping:** Group multiple notifications from same user
5. **Rich Notifications:** Add caller photo, call duration, etc.

---

## Verification Checklist

- [x] Permissions requested on page load (production)
- [x] Permission request doesn't block app init
- [x] User 1 gets FCM token on login
- [x] User 1 can send/receive notifications
- [x] User 1's token deleted on logout
- [x] User 2 gets FCM token on login (same tab, no reload)
- [x] User 2 can send/receive notifications
- [x] No 404 errors for User 2
- [x] Only ONE missed call notification per cancel
- [x] All 229 tests pass
- [x] Cloud Function deployed and working

---

## Rollback Plan

If issues arise, revert commits in reverse order:

```bash
# Revert duplicate notification fix
git revert c95c396

# Revert multi-user FCM token fix
git revert 71bc57b

# Revert non-blocking permission request
git revert 64c35bc

# Revert initial permission request
git revert 9339386
```

---

## Support

For issues or questions:

1. Check Cloud Function logs: `firebase functions:log --project vidu-aae11`
2. Check browser console for FCM errors
3. Verify FCM token exists in RTDB: `/users/{userId}/fcmTokens`
4. Run browser console tests from `QUICK-BROWSER-TEST.md`

---

**Last Updated:** 2026-01-26  
**Status:** ✅ All fixes deployed and tested  
**Test Coverage:** 229/229 tests passing
