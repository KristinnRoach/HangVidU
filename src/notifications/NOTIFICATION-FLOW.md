# Push Notification Flow - User A calls User B

This document clarifies the order of operations when User A calls User B and when push notifications are sent.

---

## Scenario: User A Calls User B

### Initial State

- **User A**: In app, wants to call User B (a saved contact)
- **User B**: App closed or in background

---

## Flow Diagram

```
User A (Caller)                    RTDB                    User B (Callee)
     |                              |                            |
     |--[1] Click "Call Contact"--->|                            |
     |                              |                            |
     |--[2] createCall()----------->|                            |
     |    (creates room + offer)    |                            |
     |                              |                            |
     |--[3] Send push notification->|                            |
     |    via Cloud Function        |                            |
     |                              |                            |
     |                              |--[4] FCM delivers-------->|
     |                              |    notification            |
     |                              |                            |
     |                              |                     [5] User B sees
     |                              |                         notification
     |                              |                            |
     |                              |                     [6] User B clicks
     |                              |                         notification
     |                              |                            |
     |                              |                     [7] App opens
     |                              |                            |
     |                              |<--[8] answerCall()---------|
     |                              |    (joins room + answer)   |
     |                              |                            |
     |<--[9] memberJoined event-----|                            |
     |                              |                            |
     |--[10] WebRTC connection established------------------>|
     |                              |                            |
     |<--[11] Call connected (audio/video flows)------------>|
```

---

## Detailed Step-by-Step

### Step 1-2: User A Initiates Call

**Location:** `src/main.js` → `joinOrCreateRoomWithId()` with `forceInitiator: true`

```javascript
// User A clicks on saved contact "Töggur"
await joinOrCreateRoomWithId(roomId, { forceInitiator: true });
```

**What happens:**

1. `CallController.createCall()` is called
2. Room is created in RTDB at `/rooms/{roomId}`
3. WebRTC offer is generated and stored
4. User A's member data is written to `/rooms/{roomId}/members/{userA_id}`

**RTDB State:**

```json
{
  "rooms": {
    "ud07m46983hmf000": {
      "createdBy": "iTAqv24EaybY6DB5DKG32zp5my42",
      "createdAt": 1234567890000,
      "offer": { "type": "offer", "sdp": "..." },
      "members": {
        "iTAqv24EaybY6DB5DKG32zp5my42": {
          "joinedAt": 1234567890000
        }
      }
    }
  }
}
```

---

### Step 3: Send Push Notification to User B

**Location:** `src/components/contacts/contacts.js` → `callContact()`

```javascript
// After creating call, send notification to User B
if (notificationController.isNotificationEnabled()) {
  await notificationController.sendCallNotification(contact.contactId, {
    roomId,
    callerId: getUserId(),
    callerName: getCurrentUser()?.displayName || 'Friend',
  });
}
```

**What happens:**

1. `notificationController.sendCallNotification()` is called
2. Checks if app is in foreground (if yes, skip - User B would see in-app notification)
3. Calls `FCMTransport.sendCallNotification()`
4. Makes HTTP POST to Cloud Function:
   ```
   POST https://europe-west1-vidu-aae11.cloudfunctions.net/sendCallNotification
   ```

**Cloud Function Flow:**

1. Verifies User A's Firebase ID token (authentication)
2. Looks up User B's FCM tokens in RTDB at `/users/{userB_id}/fcmTokens`
3. Sends FCM message to all of User B's devices
4. Returns success/failure count

---

### Step 4-5: User B Receives Notification

**Location:** Service Worker (`public/firebase-messaging-sw.js`)

**What happens:**

1. FCM delivers message to User B's device(s)
2. Service worker receives the message
3. If app is closed/background: Service worker shows system notification
4. If app is open: Foreground message handler receives it

**Notification Content:**

```
Title: "Incoming call from Kristinn"
Body: "Tap to answer or decline"
Actions: [Accept] [Decline]
```

---

### Step 6-7: User B Clicks Notification

**What happens:**

1. Browser opens/focuses the app
2. App navigates to the room URL (if configured in FCM payload)
3. App detects room parameter in URL

---

### Step 8: User B Answers Call

**Location:** `src/main.js` → `autoJoinFromUrl()` or manual join

```javascript
// App detects ?room=ud07m46983hmf000 in URL
await joinOrCreateRoomWithId(urlRoomId);
```

**What happens:**

1. `CallController.answerCall()` is called
2. User B joins the room
3. WebRTC answer is generated and stored
4. User B's member data is written to `/rooms/{roomId}/members/{userB_id}`

**RTDB State:**

```json
{
  "rooms": {
    "ud07m46983hmf000": {
      "createdBy": "iTAqv24EaybY6DB5DKG32zp5my42",
      "createdAt": 1234567890000,
      "offer": { "type": "offer", "sdp": "..." },
      "answer": { "type": "answer", "sdp": "..." },
      "members": {
        "iTAqv24EaybY6DB5DKG32zp5my42": { "joinedAt": 1234567890000 },
        "MxUu08Lpb6alrqKsY7fQQtgcEZ72": { "joinedAt": 1234567891000 }
      }
    }
  }
}
```

---

### Step 9-11: Call Connected

**What happens:**

1. User A receives `memberJoined` event from RTDB
2. WebRTC connection is established (ICE candidates exchanged)
3. Audio/video streams start flowing
4. Both users see each other's video

---

## Missed Call Scenario

If User B doesn't answer:

### User A Hangs Up Before User B Answers

**Location:** `src/main.js` → `CallController.on('cleanup')`

```javascript
CallController.on(
  'cleanup',
  async ({ roomId, partnerId, reason, role, wasConnected }) => {
    // Detect missed call
    const isMissedCall =
      role === 'initiator' && !partnerId && !wasConnected && roomId;

    if (isMissedCall) {
      // Send missed call notification to User B
      await notificationController.sendMissedCallNotification(
        contact.contactId,
        {
          roomId,
          callerId: getUserId(),
          callerName: getCurrentUser()?.displayName || 'Friend',
        },
      );
    }
  },
);
```

**Conditions for Missed Call:**

- User A was the initiator (`role === 'initiator'`)
- No partner joined (`!partnerId`)
- Never established connection (`!wasConnected`)
- Valid room exists (`roomId`)

**Notification Content:**

```
Title: "Missed call from Kristinn"
Body: "Tap to call back"
```

---

## Key Timing Points

### When Push Notifications Are Sent

1. **Incoming Call Notification**: Immediately after User A creates the call (Step 3)
   - Sent BEFORE User B joins
   - Purpose: Wake up User B's device and show notification

2. **Missed Call Notification**: When User A hangs up and no one answered
   - Sent AFTER User A cancels the call
   - Purpose: Let User B know they missed a call

### When Push Notifications Are NOT Sent

1. **App in Foreground**: If User B already has the app open and visible

   ```javascript
   shouldSendNotification() {
     return document.hidden || !document.hasFocus();
   }
   ```

2. **No FCM Token**: If User B hasn't granted notification permissions

3. **Development Mode**: Falls back to RTDB queue instead of FCM

---

## Current Issue (404 Error)

From your logs:

```
POST https://europe-west1-vidu-aae11.cloudfunctions.net/sendCallNotification 404 (Not Found)
```

**Diagnosis:**
The function IS deployed (confirmed via `firebase functions:list`), but the 404 suggests:

1. **Possible cause**: Function URL mismatch
   - Check if the function name in code matches deployed name
   - Verify region matches (europe-west1)

2. **Possible cause**: CORS or authentication issue masquerading as 404

Let's test with curl to diagnose...

---

## Sanity Check Commands

### 1. Get Your Tokens

```javascript
// Run in browser console (User A)
const { getCurrentUser } = await import('./firebase/auth.js');
const myUser = getCurrentUser();
const myUserId = myUser?.uid;
const myToken = await myUser?.getIdToken();
const myFcmToken = notificationController.transport.currentToken;

console.log('My User ID:', myUserId);
console.log('My Firebase Token:', myToken);
console.log('My FCM Token:', myFcmToken);
console.log('Is enabled:', notificationController.isNotificationEnabled());
```

**Or simpler:**

```javascript
// Get User ID
console.log('My User ID:', getLoggedInUserId());

// Get Firebase ID Token
const token = await (await import('./firebase/auth.js'))
  .getCurrentUser()
  ?.getIdToken();
console.log('My Firebase Token:', token);

// Get FCM Token
console.log('My FCM Token:', notificationController.transport.currentToken);
console.log('Is enabled:', notificationController.isNotificationEnabled());
```

### 2. Test Cloud Function Directly

```bash
# Replace with your actual tokens
curl -X POST \
  https://europe-west1-vidu-aae11.cloudfunctions.net/sendCallNotification \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_FIREBASE_ID_TOKEN" \
  -d '{
    "targetUserId": "YOUR_USER_ID",
    "callData": {
      "type": "call",
      "roomId": "test-sanity-'"$(date +%s)"'",
      "callerId": "test-caller",
      "callerName": "Test Caller",
      "timestamp": "'"$(date +%s)"000'"
    }
  }'
```

**Expected Response:**

```json
{
  "success": true,
  "successCount": 1,
  "failureCount": 0,
  "totalTokens": 1
}
```

### 3. Check Cloud Function Logs

```bash
firebase functions:log --project vidu-aae11 --only sendCallNotification
```

### 4. Test Health Check Endpoint

```bash
curl https://us-central1-vidu-aae11.cloudfunctions.net/healthCheck
```

---

## Debugging Checklist

- [ ] Cloud function is deployed (`firebase functions:list`)
- [ ] Function URL matches code (region + name)
- [ ] User B has FCM token stored in RTDB (`/users/{userB_id}/fcmTokens`)
- [ ] User A has valid Firebase ID token (not expired)
- [ ] CORS is enabled in Cloud Function (already set: `cors: true`)
- [ ] Cloud Function logs show the request arriving
- [ ] FCM tokens are valid (not expired/revoked)

---

## Next Steps

1. **Run the curl sanity check** to test the Cloud Function directly
2. **Check Cloud Function logs** to see if requests are arriving
3. **Verify FCM tokens** exist for User B in RTDB
4. **Test with two devices** (or two browser profiles) to see end-to-end flow

See `quick-curl-test.md` for detailed testing commands.
