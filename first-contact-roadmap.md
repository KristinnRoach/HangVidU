# First Contact Roadmap

## Problem Statement

HangVidU's post-onboarding UX is solid (calling/messaging saved contacts works great), but the **initial connection flow** is painful. Users must:

1. Generate a random room link
2. Share it via external tool (WhatsApp, email, etc.)
3. Wait for friend to click and join
4. Save each other as contacts

This requires out-of-band communication for every new connection.

**Temporary Workaround:** A "Paste & Join" button was added to the lobby (`index.html`, `main.js`) to help PWA users join via copied links. This should be removed or revised once the proper first-contact flow is implemented.

## Goal

Make initial contact as frictionless as possible by:
1. Importing Google Contacts to find friends already on HangVidU
2. Enabling in-app invitations for registered users
3. Streamlining email/link invitations for non-registered users

## Key Insight: Why Deterministic Rooms Alone Don't Work

Deterministic room IDs (derived from `hash(userA_id + userB_id)`) ensure both users always get the same room. However, **the callee has no way to know they're being called** unless they're already listening to that room.

**Current listener model:** Users only listen to rooms they explicitly know about (saved contacts, recent calls).

**Solution:** Add an in-app notification system where users listen globally for incoming invites/calls.

---

## Architecture Overview

### New RTDB Structure

```
/users/{userId}/
  /contacts/{contactId}          # Existing - saved contacts
  /incomingInvites/{fromUserId}  # NEW - pending contact invitations
    - fromName: string
    - fromEmail: string
    - roomId: string
    - timestamp: number
    - status: "pending" | "accepted" | "declined"

/usersByEmail/{emailHash}        # NEW - public directory for discovery
  - uid: string
  - displayName: string
  - photoURL: string
```

### Flow Summary

```
┌─────────────────────────────────────────────────────────────────┐
│                    FIRST CONTACT FLOW                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. User signs in with Google                                   │
│     └─► Register in /usersByEmail/{hash(email)}                 │
│     └─► Start listening to /users/{myId}/incomingInvites        │
│                                                                 │
│  2. User clicks "Add Contact"                                   │
│     ├─► Option A: Import from Google Contacts                   │
│     └─► Option B: Search by email                               │
│                                                                 │
│  3. For REGISTERED contacts (found in usersByEmail):            │
│     └─► Send in-app invite to /users/{theirId}/incomingInvites  │
│     └─► Pre-save contact locally with deterministic roomId      │
│     └─► Start listening to that room                            │
│                                                                 │
│  4. Recipient receives invite notification                      │
│     ├─► Accept: Save contact, start listening to room           │
│     └─► Decline: Remove invite, optionally block                │
│                                                                 │
│  5. For NON-REGISTERED contacts:                                │
│     └─► Show "Invite via Email/WhatsApp" button                 │
│     └─► Generate deterministic room link                        │
│     └─► Pre-save contact, listen to room                        │
│     └─► When they sign up and join, connection established      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Implementation Phases

### Phase 1: User Discovery System

**Goal:** Allow users to find each other by email without sharing links.

**Tasks:**

1. **Register users in public directory on sign-in**
   - File: `src/firebase/auth.js`
   - On successful Google sign-in, write to `/usersByEmail/{hash(email)}`
   - Include: `uid`, `displayName`, `photoURL`

2. **Create user discovery module**
   - New file: `src/contacts/user-discovery.js`
   - Functions:
     - `registerUserInDirectory(user)` - called on sign-in
     - `findUserByEmail(email)` - lookup single email
     - `findUsersByEmails(emails[])` - batch lookup
     - `hashEmail(email)` - consistent hashing for Firebase keys

3. **Update Firebase Security Rules**
   - `/usersByEmail` readable by authenticated users only
   - Users can only write their own entry

**Deliverables:**
- [ ] `src/contacts/user-discovery.js` module
- [ ] Auth.js integration to register on sign-in
- [ ] Firebase security rules for `/usersByEmail`

---

### Phase 2: Google Contacts Import

**Goal:** Fetch user's Google Contacts and identify which are on HangVidU.

**Tasks:**

1. **Add Google Contacts scope to auth**
   - File: `src/firebase/auth.js`
   - Add scope: `https://www.googleapis.com/auth/contacts.readonly`
   - Store access token for API calls

2. **Create Google Contacts fetcher**
   - New file: `src/contacts/google-contacts.js`
   - Functions:
     - `fetchGoogleContacts(accessToken)` - call People API
     - `findRegisteredContacts(contacts[])` - cross-reference with usersByEmail

3. **Handle token storage**
   - Store Google access token in memory (or secure storage)
   - Re-request if expired

**Deliverables:**
- [ ] `src/contacts/google-contacts.js` module
- [ ] Updated auth flow to request contacts scope
- [ ] Access token management

---

### Phase 3: In-App Invitation System

**Goal:** Send and receive contact invitations without leaving the app.

**Tasks:**

1. **Create invitation module**
   - New file: `src/contacts/invitations.js`
   - Functions:
     - `sendInvite(toUserId, roomId)` - write to their `/incomingInvites`
     - `listenForInvites()` - subscribe to my `/incomingInvites`
     - `acceptInvite(invite)` - save contact, update status
     - `declineInvite(invite)` - update status, optionally block
     - `cleanupInviteListeners()` - unsubscribe

2. **Add global invite listener on app start**
   - File: `src/main.js`
   - Call `listenForInvites()` after auth ready
   - Show notification UI when invite received

3. **Create invitation notification UI**
   - New file: `src/components/contacts/invite-notification.js`
   - Show: "{Name} wants to connect" with Accept/Decline buttons
   - Play notification sound (optional)

**Deliverables:**
- [ ] `src/contacts/invitations.js` module
- [ ] Invite listener integration in main.js
- [ ] Invite notification UI component

---

### Phase 4: Deterministic Room IDs

**Goal:** Ensure consistent room IDs for user pairs.

**Tasks:**

1. **Create deterministic room ID utility**
   - New file: `src/utils/room-id.js`
   - Function: `getDeterministicRoomId(userId1, userId2)`
   - Algorithm: Sort IDs alphabetically, concatenate, hash to fixed length

2. **Update contact calling logic**
   - File: `src/components/contacts/contacts.js`
   - When calling contact without `roomId`, derive it
   - Backwards compatible with legacy contacts that have explicit `roomId`

3. **Update contact save logic**
   - For new contacts (from import/invite), optionally omit `roomId`
   - Room ID derived on-demand when calling

**Deliverables:**
- [ ] `src/utils/room-id.js` utility
- [ ] Updated contacts.js with fallback to deterministic room
- [ ] Tests for deterministic room generation

---

### Phase 5: Contact Import UI

**Goal:** User-facing UI for importing and inviting contacts.

**Tasks:**

1. **Create "Add Contact" modal**
   - New file: `src/components/contacts/add-contact-modal.js`
   - Tabs/options:
     - "Import from Google" - shows Google Contacts
     - "Search by email" - manual email input
   - Show registered vs non-registered status

2. **Create contact list with checkboxes**
   - Show Google Contacts with indicators:
     - ✅ "On HangVidU" - can send in-app invite
     - ❌ "Not on HangVidU" - can send email invite
   - Multi-select for batch operations

3. **Add "Add Contact" button to lobby**
   - File: `src/components/lobby/` or `index.html`
   - Opens the add contact modal

4. **Email invite fallback**
   - For non-registered contacts, generate invite link
   - Open mailto: or show copy button
   - Pre-save contact and start listening to room

**Deliverables:**
- [ ] `src/components/contacts/add-contact-modal.js`
- [ ] Updated lobby UI with "Add Contact" button
- [ ] Email invite generation

---

### Phase 6: First-Time User Onboarding

**Goal:** Guide new users through contact import on first sign-in.

**Tasks:**

1. **Detect first-time user**
   - Check if user has any contacts saved
   - Or use a flag in user profile: `onboardingComplete: boolean`

2. **Show onboarding prompt**
   - After first Google sign-in, show modal:
     - "Find friends on HangVidU"
     - [Import Google Contacts] [Skip for now]

3. **Streamlined import flow**
   - If user chooses import, show contact picker
   - Auto-send invites to registered contacts
   - Show summary: "Invited 3 friends, 5 not on HangVidU yet"

**Deliverables:**
- [ ] First-time user detection logic
- [ ] Onboarding modal component
- [ ] Streamlined import flow

---

## File Structure (New Files)

```
src/
├── contacts/
│   ├── user-discovery.js      # Phase 1: Email-based lookup
│   ├── google-contacts.js     # Phase 2: Google People API
│   └── invitations.js         # Phase 3: In-app invites
├── components/
│   └── contacts/
│       ├── add-contact-modal.js     # Phase 5: Import UI
│       └── invite-notification.js   # Phase 3: Invite popup
└── utils/
    └── room-id.js             # Phase 4: Deterministic IDs
```

---

## Security Considerations

1. **Rate limiting on usersByEmail lookups**
   - Prevent email enumeration attacks
   - Firebase Security Rules + Cloud Functions for throttling

2. **Invite spam prevention**
   - Limit pending invites per user (e.g., max 10)
   - Allow blocking users

3. **Privacy of email directory**
   - Only authenticated users can search
   - Consider opt-out mechanism for users who don't want to be discoverable

4. **Google Contacts scope**
   - Read-only scope (contacts.readonly)
   - Explain why permission is needed
   - Allow skipping if user declines

---

## Success Metrics

1. **Reduced time to first call** - From "share link externally" to "click invite"
2. **Increased contact save rate** - More users building contact lists
3. **Decreased bounce rate** - New users find friends instead of seeing empty lobby

---

## Dependencies

- Google People API (contacts.readonly scope)
- Firebase RTDB (new paths for invites and user directory)
- Optional: Email service for sending invites (or use mailto: links)

---

## Open Questions

1. Should we show online/offline status in the contact import list?
2. Should invites expire after X hours/days?
3. Should we support batch invite via email for non-registered contacts?
4. Do we need push notifications for invites when app is closed?
