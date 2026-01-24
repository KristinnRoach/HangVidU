# FCM Push Notifications - Manual Testing Guide

## Quick Start

Run `pnpm dev` and follow this checklist to validate notification functionality locally before deployment.

## Prerequisites

- Two browser windows/tabs (or two devices)
- Chrome/Edge recommended (best notification support)
- Allow notifications when prompted

## Test Scenarios

### 1. Permission Request Flow ✅

**Goal**: Verify permission request UX works correctly

1. Open app in fresh browser (incognito/private mode)
2. Click the bell icon (🔔) in top bar
3. **Expected**: Browser shows permission prompt
4. Click "Allow"
5. **Expected**: Bell icon shows enabled state
6. Check console for: `[NotificationController] Notifications enabled`
7. Check console for FCM token: `[FCMTransport] Token obtained`

**Pass Criteria**:

- [ ] Permission prompt appears
- [ ] Bell icon updates after granting
- [ ] No console errors
- [ ] FCM token logged

---

### 2. Token Storage in RTDB ✅

**Goal**: Verify FCM token is stored in Firebase

1. Grant notification permission (see Test 1)
2. Open Firebase Console → Realtime Database
3. Navigate to: `users/{your-user-id}/fcmTokens/`
4. **Expected**: See token entry with:
   - `token`: FCM token string
   - `deviceInfo.platform`: Your OS (macos/windows/etc)
   - `createdAt`: Timestamp
   - `lastUsed`: Timestamp

**Pass Criteria**:

- [ ] Token exists in RTDB
- [ ] Platform detected correctly
- [ ] Timestamps are recent

---

### 3. Incoming Call Notification (Dev Mode) ✅

**Goal**: Verify call notifications work in development

**Setup**:

- Window A: Logged in as User A (caller)
- Window B: Logged in as User B (receiver)
- User B has granted notification permission

**Steps**:

1. In Window B: Minimize or switch to another tab (app must be backgrounded)
2. In Window A: Call User B (use saved contact or room link)
3. **Expected in Window B**:
   - Notification appears: "Incoming call from [User A]"
   - Notification body: "Tap to answer or decline"
   - App icon visible in notification

**Pass Criteria**:

- [ ] Notification appears when app is backgrounded
- [ ] Caller name is correct
- [ ] Notification has app icon
- [ ] No notification if app is in foreground

**Debug**:

- Check Window A console: `[NotificationController] Call notification sent to {userId}`
- Check Firebase RTDB: `notifications/{user-b-id}/` should have entry
- Check Window B console for FCM message logs

---

### 4. Missed Call Notification ✅

**Goal**: Verify missed call notifications work

**Setup**: Same as Test 3

**Steps**:

1. In Window B: Keep app backgrounded
2. In Window A: Call User B
3. In Window A: Cancel call after 5 seconds (hang up)
4. **Expected in Window B**:
   - Notification appears: "Missed call from [User A]"
   - Notification body: "Tap to call back"

**Pass Criteria**:

- [ ] Missed call notification appears
- [ ] Caller name is correct
- [ ] Different from incoming call notification

---

### 5. Notification Click Handling ⚠️

**Goal**: Verify clicking notification opens app

**Note**: This requires service worker to be active (may not work in dev mode)

**Steps**:

1. Receive a call notification (see Test 3)
2. Click the notification
3. **Expected**:
   - App window opens/focuses
   - App navigates to call screen (if implemented)

**Pass Criteria**:

- [ ] Clicking notification opens app
- [ ] App focuses if already open

**Known Limitation**: Full click handling requires production build with service worker

---

### 6. Permission Denial Handling ✅

**Goal**: Verify app handles denied permissions gracefully

1. Open app in fresh browser
2. Click bell icon
3. Click "Block" or "Don't Allow" in permission prompt
4. **Expected**:
   - Bell icon shows disabled state
   - No errors in console
   - App continues to work normally

**Pass Criteria**:

- [ ] No errors when permission denied
- [ ] UI reflects denied state
- [ ] App remains functional

---

### 7. Multi-Device Token Management ✅

**Goal**: Verify multiple devices can receive notifications

**Setup**: Same user logged in on 2+ devices

**Steps**:

1. Grant notification permission on Device A
2. Grant notification permission on Device B
3. Check Firebase RTDB: `users/{user-id}/fcmTokens/`
4. **Expected**: See 2+ token entries with different `deviceInfo.platform`

**Pass Criteria**:

- [ ] Multiple tokens stored per user
- [ ] Each token has unique ID
- [ ] Platform info correct for each device

---

### 8. Token Cleanup on Logout ✅

**Goal**: Verify token is removed when user logs out

1. Grant notification permission
2. Verify token exists in RTDB (see Test 2)
3. Log out
4. Check RTDB: `users/{user-id}/fcmTokens/`
5. **Expected**: Token entry removed

**Pass Criteria**:

- [ ] Token removed from RTDB on logout
- [ ] No errors during cleanup

---

### 9. Foreground vs Background Behavior ✅

**Goal**: Verify notifications only sent when app is backgrounded

**Setup**: Two windows, both logged in

**Steps**:

1. Window A: Call Window B
2. Window B: Keep app in foreground (visible and focused)
3. **Expected**: NO notification appears (call UI shows instead)
4. Window A: Hang up
5. Window A: Call Window B again
6. Window B: Switch to another tab (background app)
7. **Expected**: Notification DOES appear

**Pass Criteria**:

- [ ] No notification when app in foreground
- [ ] Notification appears when app backgrounded
- [ ] Console logs explain behavior

---

### 10. Privacy Mode (Future Feature) 🔮

**Goal**: Verify privacy mode hides caller details

**Note**: Privacy mode is implemented but not yet exposed in UI

**Manual Test**:

1. Open browser console
2. Run: `window.notificationController.updateOptions({ privacyMode: true })`
3. Receive a call notification
4. **Expected**: Notification shows "Someone" instead of caller name

**Pass Criteria**:

- [ ] Privacy mode masks caller name
- [ ] Privacy mode masks message previews

---

## Common Issues & Solutions

### Issue: No notification appears

**Check**:

- Is app backgrounded? (must be in another tab or minimized)
- Is permission granted? (check bell icon)
- Check console for errors
- Check RTDB for notification entry

### Issue: "VAPID key not configured"

**Solution**: Check `.env` file has `VITE_FIREBASE_VAPID_KEY`

### Issue: Token not stored in RTDB

**Check**:

- User is logged in (not guest)
- Firebase RTDB rules allow writes to `users/{userId}/fcmTokens/`
- Check console for RTDB errors

### Issue: Notification shows "undefined" for caller name

**Check**:

- Caller has display name set
- Contact exists in receiver's contact list
- Check `resolveCallerName()` logic in `contacts.js`

---

## Production Testing Checklist

After deploying to production, test these additional scenarios:

- [ ] Notifications work on iOS Safari (PWA installed)
- [ ] Notifications work on Android Chrome (PWA installed)
- [ ] Notifications work on desktop (Chrome, Edge, Firefox)
- [ ] Cloud Function sends notifications (check Firebase Functions logs)
- [ ] Service worker handles notification clicks correctly
- [ ] Notifications persist after app closed
- [ ] Notifications cleared when call answered/declined

---

## Test Coverage Summary

**What's Tested Locally** ✅:

- Permission request flow
- Token generation and storage
- Notification sending logic
- Foreground/background detection
- Privacy controls
- Multi-device support
- Token cleanup

**What Requires Deployment** 🚀:

- Real FCM delivery (Cloud Function)
- Service worker notification display
- Notification click handling
- iOS/Android PWA behavior
- Background notification persistence

---

## Quick Smoke Test (2 minutes)

Minimal test to verify basic functionality:

1. ✅ Open app, grant notification permission
2. ✅ Check RTDB for token
3. ✅ Open second window, background it
4. ✅ Call from first window
5. ✅ Verify notification appears in second window

If all 5 steps pass, core functionality is working!
