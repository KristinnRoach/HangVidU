# Quick cURL Commands for FCM Push Notification Testing

**Goal:** Verify that FCM push notifications work end-to-end in PRODUCTION before debugging app-specific logic.

This guide focuses on **sanity checks first** - confirming notifications are sent, received, and visible to users.

---

## Step 1: Get Your FCM Token (REQUIRED)

Open your app in production, open browser console, and run:

```javascript
// Get your FCM token
console.log('FCM Token:', notificationController.transport.currentToken);

// If null, check permission state
console.log('Permission:', Notification.permission);
console.log('Is enabled:', notificationController.isNotificationEnabled());

// Get your User ID
console.log('My User ID:', getLoggedInUserId());
```

**Copy the FCM token** - you'll need it for testing.

---

## Step 2: Sanity Check - Send Basic FCM Notification

This bypasses ALL app logic and sends a raw FCM notification directly to your device.

### Get OAuth2 Access Token

```bash
# Install gcloud CLI first: https://cloud.google.com/sdk/docs/install
gcloud auth application-default print-access-token
```

Copy the access token (valid for 1 hour).

### Send Test Notification to Yourself

```bash
curl -X POST \
  https://fcm.googleapis.com/v1/projects/vidu-aae11/messages:send \
  -H "Authorization: Bearer YOUR_OAUTH2_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "message": {
      "token": "YOUR_FCM_TOKEN",
      "notification": {
        "title": "FCM Sanity Check",
        "body": "If you see this, FCM is working!"
      },
      "webpush": {
        "fcm_options": {
          "link": "https://vidu-aae11.web.app"
        }
      }
    }
  }'
```

**Expected Response:**

```json
{
  "name": "projects/vidu-aae11/messages/0:1234567890123456%abcdef"
}
```

**What to check:**

- ✅ Did you receive a notification on your device?
- ✅ Does it show "FCM Sanity Check" as the title?
- ✅ Does clicking it open your app?

**If this fails:**

- Check that `YOUR_FCM_TOKEN` is correct (not null, not expired)
- Check that `YOUR_OAUTH2_ACCESS_TOKEN` is valid
- Check browser console for errors
- Verify notification permission is granted: `Notification.permission === 'granted'`

---

## Step 3: Test with Different Notification States

### Test 1: App in Background (Tab Hidden)

1. Send the notification using the cURL command above
2. Switch to a different tab or minimize browser
3. Wait 5 seconds
4. **Expected:** You should see a system notification

### Test 2: App in Foreground (Tab Visible)

1. Keep your app tab active and visible
2. Send the notification using the cURL command above
3. **Expected:** Notification is received but handled by foreground listener (check console logs)

### Test 3: Browser Closed

1. Close your browser completely
2. Send the notification using the cURL command above
3. **Expected:** Service worker should show notification even when browser is closed

---

## Step 4: Verify Service Worker is Active

```javascript
// Run in browser console
navigator.serviceWorker.getRegistrations().then((registrations) => {
  console.log('Service Workers:', registrations);
  registrations.forEach((reg) => {
    console.log('Scope:', reg.scope);
    console.log('Active:', reg.active);
    console.log('State:', reg.active?.state);
  });
});

// Check if FCM service worker is registered
navigator.serviceWorker
  .getRegistration('/firebase-messaging-sw.js')
  .then((reg) => {
    console.log('FCM SW registered:', !!reg);
    console.log('FCM SW active:', reg?.active?.state);
  });
```

**Expected:**

- At least one service worker should be registered
- State should be `'activated'`

---

## Step 5: Test Cloud Function (Once Basic FCM Works)

Only proceed here if Step 2 worked successfully.

### Get Firebase ID Token

```javascript
// Run in browser console while logged in
const { getCurrentUser } = await import('./firebase/auth.js');
const token = await getCurrentUser()?.getIdToken();
console.log('Firebase ID Token:', token);
console.log('My User ID:', getLoggedInUserId());
```

### Send via Cloud Function

```bash
curl -X POST \
  https://europe-west1-vidu-aae11.cloudfunctions.net/sendCallNotification \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_FIREBASE_ID_TOKEN" \
  -d '{
    "targetUserId": "YOUR_USER_ID",
    "callData": {
      "type": "call",
      "roomId": "test-sanity-check",
      "callerId": "test-caller",
      "callerName": "Test Caller",
      "timestamp": "'"$(date +%s)000"'"
    }
  }'
```

**Expected Response:**

```json
{
  "success": true,
  "messageId": "projects/vidu-aae11/messages/..."
}
```

**What to check:**

- ✅ Did you receive a notification?
- ✅ Does it show "Incoming call from Test Caller"?
- ✅ Does clicking it open your app?

---

## Troubleshooting Checklist

If notifications aren't working, check these in order:

### 1. Permission State

```javascript
console.log('Permission:', Notification.permission);
// Should be: "granted"
```

### 2. FCM Token Exists

```javascript
console.log('Token:', notificationController.transport.currentToken);
// Should be: long string starting with "c..." or "d..."
// Should NOT be: null or undefined
```

### 3. Service Worker Registered

```javascript
navigator.serviceWorker
  .getRegistrations()
  .then((r) => console.log('SWs:', r.length));
// Should be: 1 or more
```

### 4. HTTPS or Localhost

```javascript
console.log('Protocol:', window.location.protocol);
// Should be: "https:" or "http:" (only if localhost)
```

### 5. FCM Messaging Initialized

```javascript
console.log('Messaging:', notificationController.transport.messaging);
// Should be: object (not null)
```

### 6. Check RTDB for Stored Token

```bash
curl "https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app/users/YOUR_USER_ID/fcmTokens.json?auth=YOUR_FIREBASE_ID_TOKEN"
```

Should return your FCM token(s).

---

## Common Issues & Fixes

### Issue: "No registration token available"

**Cause:** Permission not granted or service worker not registered  
**Fix:**

```javascript
// Check permission
console.log(Notification.permission);
// If "default", request permission
await notificationController.requestPermission();
```

### Issue: Notification received but not visible

**Cause:** Browser notification settings disabled  
**Fix:** Check browser settings → Notifications → Allow for your site

### Issue: Token is null

**Cause:** Service worker not registered before calling getToken()  
**Fix:** Reload page and wait for service worker to activate

### Issue: 401 Unauthorized

**Cause:** Firebase ID token or OAuth2 token expired  
**Fix:** Get a fresh token (tokens expire after 1 hour)

### Issue: 404 Not Found (Cloud Function)

**Cause:** User has no FCM tokens in RTDB  
**Fix:** Ensure `notificationController.enable()` was called after permission granted

---

## Quick Sanity Check Script

Save as `test-fcm-sanity.sh`:

```bash
#!/bin/bash

echo "FCM Sanity Check Script"
echo "======================="
echo ""
echo "Prerequisites:"
echo "1. Get OAuth2 token: gcloud auth application-default print-access-token"
echo "2. Get FCM token from browser console: notificationController.transport.currentToken"
echo ""

read -p "Enter OAuth2 Access Token: " OAUTH_TOKEN
read -p "Enter FCM Token: " FCM_TOKEN

echo ""
echo "Sending test notification..."
echo ""

curl -X POST \
  https://fcm.googleapis.com/v1/projects/vidu-aae11/messages:send \
  -H "Authorization: Bearer $OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"message\": {
      \"token\": \"$FCM_TOKEN\",
      \"notification\": {
        \"title\": \"FCM Sanity Check $(date +%H:%M:%S)\",
        \"body\": \"If you see this, FCM is working!\"
      },
      \"webpush\": {
        \"fcm_options\": {
          \"link\": \"https://vidu-aae11.web.app\"
        }
      }
    }
  }"

echo ""
echo ""
echo "Check your device for the notification!"
```

Make executable and run:

```bash
chmod +x test-fcm-sanity.sh
./test-fcm-sanity.sh
```

---

## Advanced Testing (After Sanity Checks Pass)

Once basic FCM works, you can test app-specific features:

### Test Call Notification

```bash
curl -X POST \
  https://europe-west1-vidu-aae11.cloudfunctions.net/sendCallNotification \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_FIREBASE_ID_TOKEN" \
  -d '{
    "targetUserId": "TARGET_USER_ID",
    "callData": {
      "type": "call",
      "roomId": "test-room-123",
      "callerId": "YOUR_USER_ID",
      "callerName": "Test Caller",
      "timestamp": "'"$(date +%s)000"'"
    }
  }'
```

### Test Missed Call Notification

```bash
curl -X POST \
  https://europe-west1-vidu-aae11.cloudfunctions.net/sendCallNotification \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_FIREBASE_ID_TOKEN" \
  -d '{
    "targetUserId": "TARGET_USER_ID",
    "callData": {
      "type": "missed_call",
      "roomId": "test-room-456",
      "callerId": "YOUR_USER_ID",
      "callerName": "Test Caller",
      "timestamp": "'"$(date +%s)000"'"
    }
  }'
```

### Test Message Notification

```bash
curl -X POST \
  https://europe-west1-vidu-aae11.cloudfunctions.net/sendCallNotification \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_FIREBASE_ID_TOKEN" \
  -d '{
    "targetUserId": "TARGET_USER_ID",
    "callData": {
      "type": "message",
      "senderId": "YOUR_USER_ID",
      "senderName": "Test Sender",
      "messagePreview": "Hey, this is a test message!",
      "timestamp": "'"$(date +%s)000"'"
    }
  }'
```

---

## Browser Console Quick Tests

### Send Test Notification to Self

```javascript
// Get your own user ID
const myUserId = getLoggedInUserId();

// Send call notification to yourself
await notificationController.sendCallNotification(myUserId, {
  roomId: 'test-room-' + Date.now(),
  callerId: myUserId,
  callerName: 'Test Caller',
});
```

---

## Monitoring & Debugging

### Firebase Console Logs

View Cloud Function logs:

```bash
# Install Firebase CLI
npm install -g firebase-tools

# View logs
firebase functions:log --project vidu-aae11
```

### Real-time RTDB Monitoring

Monitor notification queue in real-time:

```bash
firebase database:get /notifications/USER_ID --project vidu-aae11
```

---

## Notes

- Replace `YOUR_OAUTH2_ACCESS_TOKEN` with OAuth2 token from gcloud (expires after 1 hour)
- Replace `YOUR_FCM_TOKEN` with your device's FCM token from browser console
- Replace `YOUR_FIREBASE_ID_TOKEN` with Firebase ID token (expires after 1 hour)
- Replace `YOUR_USER_ID` with your Firebase user ID
- Replace `TARGET_USER_ID` with the recipient's Firebase user ID
- Timestamps should be in milliseconds (13 digits)
- All commands assume production environment (`vidu-aae11`)

---

## See Also

- [FCM REST API Documentation](https://firebase.google.com/docs/cloud-messaging/send-message)
- [Firebase Cloud Functions Logs](https://console.firebase.google.com/project/vidu-aae11/functions/logs)
- [RTDB Console](https://console.firebase.google.com/project/vidu-aae11/database)
