# Multi-User FCM Test - Same Tab Session

This test verifies that FCM tokens are properly obtained when multiple users log in/out in the same browser tab.

---

## The Problem (Now Fixed)

**Before the fix:**

- User 1 logs in → Gets FCM token ✅
- User 1 logs out
- User 2 logs in → **No FCM token** ❌ (404 error when sending notifications)

**Why it happened:**

- FCM initialization only ran during `init()` (page load)
- When User 2 logged in, `init()` didn't run again
- Permission was already `'granted'` (browser-level), but no token was obtained for User 2

**The fix:**

- Added FCM token setup in `onAuthChange` handler
- When a user logs in, we now call `notificationController.enable()` to get their FCM token
- Each user gets their own FCM token stored in RTDB

---

## Test Procedure

### Step 1: User 1 Logs In

1. Open production app: https://vidu-aae11.web.app
2. Log in as User 1 (e.g., kristinnroach@gmail.com)
3. Grant notification permissions when prompted
4. Open browser console and verify:

```javascript
console.log('User 1 ID:', getLoggedInUserId());
console.log('User 1 FCM Token:', notificationController.transport.currentToken);
console.log('Is Enabled:', notificationController.isNotificationEnabled());
```

**Expected:**

```
User 1 ID: iTAqv24EaybY6DB5DKG32zp5my42
User 1 FCM Token: ec_8zqmRzCZxvFzL5yEAbv:APA91b...
Is Enabled: true
```

### Step 2: Test User 1 Notification

```javascript
const user1Id = getLoggedInUserId();
await notificationController.sendCallNotification(user1Id, {
  roomId: 'test-user1-' + Date.now(),
  callerId: user1Id,
  callerName: 'Test for User 1',
});
console.log('✅ Notification sent to User 1');
```

Switch to another tab and verify you receive the notification.

### Step 3: User 1 Logs Out

1. Click "Sign Out" in the app
2. Verify in console:

```javascript
console.log('User ID after logout:', getLoggedInUserId());
console.log(
  'FCM Token after logout:',
  notificationController.transport.currentToken,
);
console.log(
  'Is Enabled after logout:',
  notificationController.isNotificationEnabled(),
);
```

**Expected:**

```
User ID after logout: <guest-id>
FCM Token after logout: null
Is Enabled after logout: false
```

**Console logs should show:**

```
[AUTH] User logged out - cleaning up messaging and listeners
[FCMTransport] Token deleted successfully
[NotificationController] Notifications disabled
```

### Step 4: User 2 Logs In (Critical Test)

1. **Without reloading the page**, log in as User 2 (e.g., toggurroach@gmail.com)
2. Watch the console logs carefully

**Expected logs:**

```
[AUTH] User logged in - re-attaching incoming listeners
[AUTH] Enabling notifications for logged-in user
[FCMTransport] Requesting FCM token...
[FCMTransport] Token obtained successfully
[FCMTransport] Token stored in RTDB
[NotificationController] Notifications enabled
```

3. Verify in console:

```javascript
console.log('User 2 ID:', getLoggedInUserId());
console.log('User 2 FCM Token:', notificationController.transport.currentToken);
console.log('Is Enabled:', notificationController.isNotificationEnabled());
```

**Expected:**

```
User 2 ID: MxUu08Lpb6alrqKsY7fQQtgcEZ72
User 2 FCM Token: <different-token-from-user-1>
Is Enabled: true
```

**Critical:** User 2's FCM token should be **different** from User 1's token!

### Step 5: Test User 2 Notification

```javascript
const user2Id = getLoggedInUserId();
await notificationController.sendCallNotification(user2Id, {
  roomId: 'test-user2-' + Date.now(),
  callerId: user2Id,
  callerName: 'Test for User 2',
});
console.log('✅ Notification sent to User 2');
```

**Expected:**

- ✅ No 404 error
- ✅ Cloud Function returns success
- ✅ Notification is received (if in background)

**Check Cloud Function logs:**

```bash
firebase functions:log --project vidu-aae11
```

Should show:

```
[FCM] Sending call notification to MxUu08Lpb6alrqKsY7fQQtgcEZ72
[FCM] Found 1 tokens for user MxUu08Lpb6alrqKsY7fQQtgcEZ72
[FCM] Notification sent - Success: 1, Failed: 0
```

---

## Verify RTDB State

### Check User 1's Tokens (Should be deleted)

```javascript
const { getCurrentUser } = await import('./firebase/auth.js');
const idToken = await getCurrentUser()?.getIdToken();

const response = await fetch(
  'https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app/users/iTAqv24EaybY6DB5DKG32zp5my42/fcmTokens.json?auth=' +
    idToken,
);
const user1Tokens = await response.json();
console.log('User 1 tokens:', user1Tokens);
```

**Expected:** `null` or empty (tokens deleted on logout)

### Check User 2's Tokens (Should exist)

```javascript
const { getCurrentUser } = await import('./firebase/auth.js');
const idToken = await getCurrentUser()?.getIdToken();
const user2Id = getLoggedInUserId();

const response = await fetch(
  `https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app/users/${user2Id}/fcmTokens.json?auth=${idToken}`,
);
const user2Tokens = await response.json();
console.log('User 2 tokens:', user2Tokens);
console.log('Token count:', Object.keys(user2Tokens || {}).length);
```

**Expected:** At least 1 token for User 2

---

## Common Issues

### Issue: User 2 still gets 404 error

**Check:**

1. Did you see the logs `[FCMTransport] Token obtained successfully`?
2. Run the RTDB check above to verify User 2's token exists
3. Check Cloud Function logs to see what error it's returning

**If token is null:**

- The fix didn't apply (old code still running)
- Hard refresh the page (Cmd+Shift+R / Ctrl+Shift+R)
- Clear cache and reload

### Issue: User 2 gets User 1's old token

**This should NOT happen.** If it does:

- The `disable()` call on logout didn't work
- Check console for errors during logout
- Manually delete the token:
  ```javascript
  await notificationController.disable();
  ```

### Issue: Permission prompt shows for User 2

**This is OK!** If User 2 is logging in for the first time on this browser, they need to grant permission.

The fix handles both cases:

- Permission already granted → Just get token
- Permission not granted → Request permission, then get token

---

## Success Criteria

✅ User 1 gets FCM token on login  
✅ User 1 can send/receive notifications  
✅ User 1's token is deleted on logout  
✅ User 2 gets **different** FCM token on login (same tab, no reload)  
✅ User 2 can send/receive notifications  
✅ No 404 errors for User 2  
✅ Cloud Function logs show success for both users

---

## Next Steps

Once this test passes:

1. Test with actual two-device call (User A calls User B)
2. Test missed call notifications
3. Test with app completely closed
4. Test on mobile devices (iOS/Android)

See `NOTIFICATION-FLOW.md` for detailed call flow documentation.
