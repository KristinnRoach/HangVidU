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

---

## Next: UI for Sending Invites

Coming next: Simple UI to search users by email and send invites.
