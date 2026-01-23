# Testing Guide for First Contact System

## Quick Testing Steps

### Phase 1: User Discovery System

**What to test:** User registration in Firebase directory after sign-in

**Steps:**

1. Run `pnpm dev` locally
2. Sign in with Google
3. Open Firebase Console → Realtime Database
4. Navigate to `/usersByEmail/`
5. ✅ Verify you see an entry with a hashed key (e.g., `dGVzdEBleGFtcGxlLmNvbQ--`)
6. ✅ Verify the entry contains: `uid`, `displayName`, `photoURL`, `registeredAt`

**Console check:**

- Look for: `[USER DISCOVERY] Registered user in directory: your@email.com`

---

### Phase 4: Deterministic Room IDs

**What to test:** Contacts can connect without pre-defined room IDs

**Setup:**

1. Create a test contact in Firebase Console:
   - Navigate to `/users/{yourUserId}/contacts/`
   - Add a new contact: `testContact123`
   - Set: `{ contactName: "Test User", contactId: "testContact123" }`
   - **Important:** Do NOT add a `roomId` field

**Steps:**

1. Refresh the app (you should see "Test User" in your contacts)
2. Click on "Test User" to call them
3. Check browser console for: `[CONTACTS] Generated deterministic room ID: {16-char-id}`
4. ✅ Verify call initiates without errors

**To verify deterministic behavior:**

1. Have a friend sign in as the test user (uid: `testContact123`)
2. They should save you as a contact (with your uid, no roomId)
3. When either of you calls the other, both should connect to the same room

---

### Phase 3: In-App Invitations

**What to test:** Send and receive contact invitations without leaving the app

**Setup - Send an invite:**

1. Open browser console
2. Find another user's UID from `/usersByEmail/` in Firebase
3. Run this in console:
   ```javascript
   import { sendInvite } from './contacts/invitations.js';
   sendInvite('THEIR_USER_ID', 'Their Name');
   ```

**Alternative - Manual Firebase entry:**

1. Go to Firebase Console → Realtime Database
2. Navigate to `/users/{THEIR_USER_ID}/incomingInvites/`
3. Add a child node with your UID as the key
4. Set value:
   ```json
   {
     "fromUserId": "YOUR_USER_ID",
     "fromName": "Your Name",
     "fromEmail": "your@email.com",
     "roomId": "test1234567890ab",
     "timestamp": 1234567890000,
     "status": "pending"
   }
   ```

**Steps:**

1. The recipient should see a popup: "{Your Name} wants to connect. Accept contact invitation?"
2. Click "Confirm" to accept OR "Cancel" to decline
3. ✅ If accepted: Contact appears in their contacts list
4. ✅ If declined: Invite is removed, no contact saved

**Console checks:**

- Sender: `[INVITATIONS] Sent invite to {Name}`
- Recipient: `[INVITATIONS] New invite from {Name}`
- On accept: `[INVITATIONS] Contact added: {Name}`
- On decline: `[INVITATIONS] Invite declined`

---

### Phase 5: Add Contact UI

**What to test:** Simple UI for adding contacts by email

**Steps:**

1. Click the "Add Contact" button (user-plus icon) in the lobby
2. Enter an email address of someone registered on HangVidU
3. Click "Search"
4. ✅ Should show "Found {Name}! Sending invitation..."
5. ✅ Should show "✓ Invitation sent to {Name}!"
6. Modal closes automatically

**Test edge cases:**

1. Enter your own email → Should show "That's your own email address!"
2. Enter non-existent email → Should show "{email} is not on HangVidU yet"
3. Cancel → Modal closes without sending

**Console checks:**

- On found: `[INVITATIONS] Sent invite to {Name}`
- On not found: No invite sent

---

## Current Features Implemented

✅ **Phase 1:** User Discovery System

- Users auto-register in `/usersByEmail/` on sign-in
- Email hashing for Firebase-safe keys
- Lookup functions ready for contact import

✅ **Phase 4:** Deterministic Room IDs

- Automatic room ID generation for contact pairs
- Backwards compatible with existing contacts
- Same room ID regardless of who initiates

✅ **Phase 3:** In-App Invitations

- Send contact invites to other users
- Receive real-time invite notifications
- Accept/decline invites with confirmation dialog
- Auto-saves contacts and generates room IDs

✅ **Phase 5:** Add Contact UI (Minimal)

- Simple "Add Contact" button in lobby
- Search users by email address
- Send invites directly from UI
- Real-time search feedback

---

## Next: Google Contacts Import (Phase 2)

Coming next:
Import contacts from Google People API to auto-discover friends already on HangVidU.
