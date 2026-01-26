# Quick Browser Console Test - FCM Notifications

Run these commands in your browser console to test FCM notifications end-to-end.

---

## Prerequisites

1. Open your app in production: https://vidu-aae11.web.app
2. Make sure you're logged in
3. Make sure notification permissions are granted
4. Open browser console (F12 → Console tab)

---

## Test 1: Verify Your Setup

```javascript
// Check if everything is initialized
console.log('=== FCM Setup Check ===');
console.log('User ID:', getLoggedInUserId());
console.log('FCM Token:', notificationController.transport.currentToken);
console.log('Permission:', Notification.permission);
console.log('Is Enabled:', notificationController.isNotificationEnabled());
console.log(
  'Transport:',
  notificationController.transport.messaging ? 'OK' : 'NOT INITIALIZED',
);
```

**Expected Output:**

```
=== FCM Setup Check ===
User ID: iTAqv24EaybY6DB5DKG32zp5my42
FCM Token: ec_8zqmRzCZxvFzL5yEAbv:APA91b...
Permission: granted
Is Enabled: true
Transport: OK
```

**If any value is wrong:**

- User ID is null → You're not logged in
- FCM Token is null → Permissions not granted or service worker not registered
- Permission is "default" → Run `await notificationController.requestPermission()`
- Permission is "denied" → Enable in browser settings
- Is Enabled is false → Run `await notificationController.enable()`

---

## Test 2: Send Notification to Yourself (Background Test)

This tests the full flow: app → Cloud Function → FCM → your device

```javascript
// Get your user ID
const myUserId = getLoggedInUserId();

// Send a call notification to yourself
console.log('Sending notification to:', myUserId);

await notificationController.sendCallNotification(myUserId, {
  roomId: 'test-room-' + Date.now(),
  callerId: myUserId,
  callerName: 'Test Caller',
});

console.log('Notification sent! Check if you received it.');
```

**What to expect:**

- If app is in **foreground** (tab visible): You'll see a console log saying "Not sending call notification (app in foreground)"
- If app is in **background** (switch to another tab): You should receive a system notification

**To test background:**

1. Run the command above
2. Immediately switch to another tab
3. Wait 2-3 seconds
4. You should see a notification: "Incoming call from Test Caller"

---

## Test 3: Check Cloud Function Response

```javascript
// Get your Firebase ID token
const { getCurrentUser } = await import('./firebase/auth.js');
const idToken = await getCurrentUser()?.getIdToken();
const myUserId = getLoggedInUserId();

// Call Cloud Function directly
const response = await fetch(
  'https://europe-west1-vidu-aae11.cloudfunctions.net/sendCallNotification',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({
      targetUserId: myUserId,
      callData: {
        type: 'call',
        roomId: 'test-' + Date.now(),
        callerId: myUserId,
        callerName: 'Direct Test',
        timestamp: Date.now().toString(),
      },
    }),
  },
);

const result = await response.json();
console.log('Cloud Function Response:', result);
```

**Expected Response:**

```javascript
{
  success: true,
  successCount: 1,  // or more if you have multiple devices
  failureCount: 0,
  totalTokens: 1
}
```

**If you get an error:**

- `401 Unauthorized` → Your ID token expired, run the command again
- `404 Not Found` → User has no FCM tokens (check Test 1)
- `500 Internal Server Error` → Check Cloud Function logs

---

## Test 4: Check Your FCM Tokens in RTDB

```javascript
// Get your Firebase ID token
const { getCurrentUser } = await import('./firebase/auth.js');
const idToken = await getCurrentUser()?.getIdToken();
const myUserId = getLoggedInUserId();

// Fetch your tokens from RTDB
const response = await fetch(
  `https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app/users/${myUserId}/fcmTokens.json?auth=${idToken}`,
);

const tokens = await response.json();
console.log('My FCM Tokens:', tokens);
console.log('Token Count:', Object.keys(tokens || {}).length);
```

**Expected Output:**

```javascript
My FCM Tokens: {
  "ec8zqmRzCZxvFzL5yEA": {
    token: "ec_8zqmRzCZxvFzL5yEAbv:APA91b...",
    deviceInfo: {
      platform: "macos",
      timestamp: 1737907167881
    },
    createdAt: 1737907167881,
    lastUsed: 1737907167881
  }
}
Token Count: 1
```

---

## Test 5: Send to Another User (Two-Device Test)

If you have access to another user's ID (e.g., a test account):

```javascript
// Replace with the other user's ID
const targetUserId = 'MxUu08Lpb6alrqKsY7fQQtgcEZ72'; // Example: Töggur
const myUserId = getLoggedInUserId();

// Send notification
await notificationController.sendCallNotification(targetUserId, {
  roomId: 'test-room-' + Date.now(),
  callerId: myUserId,
  callerName: 'Test from Console',
});

console.log('Notification sent to:', targetUserId);
```

**What to check:**

- Open the other user's device/browser
- They should receive a notification (if app is in background)
- Check Cloud Function logs to see if it succeeded

---

## Test 6: Force Foreground Message (Advanced)

Test the foreground message handler:

```javascript
// Simulate receiving a foreground message
const testPayload = {
  notification: {
    title: 'Test Foreground Notification',
    body: 'This is a test',
  },
  data: {
    type: 'call',
    roomId: 'test-123',
    callerId: 'test-caller',
    callerName: 'Test Caller',
  },
};

// Trigger the foreground handler
notificationController.handleForegroundMessage(testPayload);

console.log('Foreground message handled. Check console for logs.');
```

---

## Troubleshooting

### Issue: "getLoggedInUserId is not defined"

```javascript
// Import it first
const { getLoggedInUserId } = await import('./firebase/auth.js');
console.log('User ID:', getLoggedInUserId());
```

### Issue: "notificationController is not defined"

The controller should be exposed globally. Check:

```javascript
console.log('Controller:', window.notificationController);
```

If undefined, the app didn't initialize properly. Reload the page.

### Issue: FCM Token is null

```javascript
// Check permission
console.log('Permission:', Notification.permission);

// If "default", request permission
if (Notification.permission === 'default') {
  await notificationController.requestPermission();
}

// If "granted", try to get token
if (Notification.permission === 'granted') {
  await notificationController.enable();
  console.log('Token:', notificationController.transport.currentToken);
}
```

### Issue: Notification not received

1. **Check if app is in background:**

   ```javascript
   console.log('Hidden:', document.hidden);
   console.log('Has Focus:', document.hasFocus());
   ```

   Notifications only show when `document.hidden === true` or `document.hasFocus() === false`

2. **Check browser notification settings:**
   - Chrome: Settings → Privacy and security → Site Settings → Notifications
   - Make sure your site is allowed

3. **Check Cloud Function logs:**
   ```bash
   firebase functions:log --project vidu-aae11
   ```

---

## Quick Copy-Paste Test

Run this all at once:

```javascript
(async () => {
  console.log('=== FCM Quick Test ===');

  // Check setup
  const myUserId = getLoggedInUserId();
  const fcmToken = notificationController.transport.currentToken;
  const isEnabled = notificationController.isNotificationEnabled();

  console.log('User ID:', myUserId);
  console.log(
    'FCM Token:',
    fcmToken ? fcmToken.substring(0, 20) + '...' : 'NULL',
  );
  console.log('Is Enabled:', isEnabled);

  if (!myUserId) {
    console.error('❌ Not logged in');
    return;
  }

  if (!fcmToken) {
    console.error('❌ No FCM token - permissions not granted');
    return;
  }

  if (!isEnabled) {
    console.error('❌ Notifications not enabled');
    return;
  }

  console.log('✅ Setup OK');
  console.log('');
  console.log('Sending test notification...');
  console.log('(Switch to another tab to see it!)');

  // Send notification
  await notificationController.sendCallNotification(myUserId, {
    roomId: 'test-room-' + Date.now(),
    callerId: myUserId,
    callerName: 'Console Test',
  });

  console.log('✅ Notification sent!');
  console.log('Switch to another tab and wait 2-3 seconds.');
})();
```

---

## Next Steps

Once these tests pass:

1. Test with two real users (User A calls User B)
2. Test missed call notifications
3. Test message notifications
4. Test with app completely closed

See `NOTIFICATION-FLOW.md` for detailed flow documentation.
