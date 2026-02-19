# First Contact Roadmap

## Current Status: Core Flow Complete

**Last Updated:** January 2026

The first-contact system is **functional and tested**. Users can:
- Import Google Contacts and see who's on HangVidU
- Send in-app invitations to registered users
- Copy invite links to share with non-registered contacts
- Accept/decline invitations with automatic contact saving

---

## Problem Statement

HangVidU's post-onboarding UX is solid (calling/messaging saved contacts works great), but the **initial connection flow** was painful. Users had to:

1. Generate a random room link
2. Share it via external tool (WhatsApp, email, etc.)
3. Wait for friend to click and join
4. Save each other as contacts

This required out-of-band communication for every new connection.

## Solution

Make initial contact frictionless by:
1. ✅ Importing Google Contacts to find friends already on HangVidU
2. ✅ Enabling in-app invitations for registered users
3. ✅ Providing invite links for non-registered users

---

## Implementation Status

### Phase 1: User Discovery System ✅ COMPLETE

**Files:**
- `src/contacts/user-discovery.js` - Email lookup and registration
- `src/firebase/auth.js` - Auto-registers users on sign-in
- `database.rules.json` - Security rules for `/usersByEmail`

**Functions:**
- `registerUserInDirectory(user)` - Called on sign-in
- `findUserByEmail(email)` - Single email lookup
- `findUsersByEmails(emails[])` - Batch lookup
- `hashEmail(email)` - Firebase-safe email hashing

---

### Phase 2: Google Contacts Import ✅ COMPLETE

**Files:**
- `src/contacts/google-contacts.js` - People API integration
- `src/firebase/auth.js` - `requestContactsAccess()` via GIS Token Model

**Features:**
- Fetches from both "My Contacts" and "Other contacts"
- Uses Google Identity Services (GIS) Token Model for OAuth
- Requires `contacts.readonly` and `contacts.other.readonly` scopes
- People API must be enabled in Google Cloud Console

---

### Phase 3: In-App Invitation System ✅ COMPLETE

**Files:**
- `src/contacts/invitations.js` - Send/receive/accept invitations
- `src/main.js` - Global invite listeners

**Functions:**
- `sendInvite(toUserId, toName)` - Send invitation
- `listenForInvites(callback)` - Listen for incoming invites
- `acceptInvite(fromUserId, inviteData)` - Accept and save contact
- `declineInvite(fromUserId)` - Decline invitation
- `listenForAcceptedInvites(callback)` - Auto-save when your invites are accepted
- `cleanupInviteListeners()` - Cleanup on logout

**Database Structure:**
```
/users/{userId}/
  /incomingInvites/{fromUserId}
  /acceptedInvites/{acceptedByUserId}
```

---

### Phase 4: Deterministic Room IDs ✅ COMPLETE

**Files:**
- `src/utils/room-id.js` - Room ID generation
- `src/components/contacts/contacts.js` - Integration

**Function:**
- `getDeterministicRoomId(userId1, userId2)` - Consistent room IDs for user pairs

---

### Phase 5: Add Contact UI ✅ COMPLETE

**Files:**
- `src/components/contacts/add-contact-modal.js` - Import modal

**Features:**
- "Import from Google Contacts" button
- Manual email search
- Shows contacts "On HangVidU" with Invite buttons
- Shows count of contacts "Not on HangVidU" (collapsed)
- "Copy Invite Link" button for sharing
- Empty state: "None of your contacts are on HangVidU yet. Be the first to invite them!"

---

### Phase 6: First-Time User Onboarding ❌ NOT STARTED

**Goal:** Guide new users through contact import on first sign-in.

**Planned:**
- Detect first-time user (no contacts saved)
- Show onboarding modal after first sign-in
- Streamlined import flow with auto-invite option

---

## Future Improvements

### High Value - Next Up

#### 1. Referral Link System ⭐ PREREQUISITE FOR SHARE FEATURES
Enable shared links to actually connect users by including referrer information.

**Problem:** Current share/copy link just sends generic app URL - no connection logic.

**Solution:** Add `?ref=userId` parameter handling:
```
User A shares: https://hangvidu.app/?ref=USER_A_ID
User B opens link → signs up → app detects ref parameter →
Auto-creates pending invite between User A and User B
```

**Implementation:**
- On app load, check for `?ref=` URL parameter
- If present and user signs up, store referrer ID
- After signup, auto-send invite from referrer to new user (or vice versa)
- Clear the parameter from URL after processing

**Enables:** Web Share API, mailto: invites, QR codes - all become useful once referral links work.

#### 2. Invite via Email (mailto:)
Select specific contacts → generate mailto: link with pre-filled message containing referral link.

**Implementation:**
- Add checkboxes to "Not on HangVidU" list
- "Invite Selected" button
- Generate `mailto:` URL with recipient emails and referral link
- Requires: Referral Link System (#1)

#### 3. Web Share API Integration
Use native share sheet on mobile devices to share referral link.

**Implementation:**
```javascript
if (navigator.share) {
  await navigator.share({
    title: 'Join me on HangVidU',
    text: 'Video chat with me on HangVidU!',
    url: getReferralLink(), // includes ?ref=myUserId
  });
}
```
- Requires: Referral Link System (#1)

#### 4. Batch Invite for Registered Contacts
"Invite All" button to send invitations to all contacts on HangVidU at once.

**Status:** Infrastructure ready (`sendInvites()` function exists), needs UI integration.

---

### Medium Value

#### 5. Invite Expiration
Auto-expire pending invites after X days to prevent stale data.

#### 6. Block/Spam Prevention
- Allow users to block senders
- Rate limit invite sending
- Limit pending invites per user

#### 7. Online Status in Import List
Show which contacts are currently online when importing.

---

### Lower Priority

#### 8. Push Notifications for Invites
Notify users of new invites when app is closed (requires FCM setup).

#### 9. QR Code Invite
Generate QR code containing referral link for in-person sharing.
- Requires: Referral Link System (#1)

#### 10. Discoverable Profile Toggle
Let users opt out of being found via email lookup.

---

## Architecture

### Data Flow

```
User clicks "Import from Google"
         │
         ▼
┌─────────────────────────────┐
│ auth.js                     │
│ requestContactsAccess()     │──► Google OAuth (GIS Token Model)
│ returns: accessToken        │
└─────────────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│ google-contacts.js          │
│ fetchGoogleContacts(token)  │──► Google People API
│ returns: [{email, name}]    │
└─────────────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│ user-discovery.js           │
│ findUsersByEmails(emails)   │──► Firebase RTDB lookup
│ returns: {email: user|null} │
└─────────────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│ add-contact-modal.js        │
│ renderImportResults()       │──► UI with Invite buttons
└─────────────────────────────┘
```

### Firebase RTDB Structure

```
/usersByEmail/{emailHash}
  - uid: string
  - displayName: string
  - photoURL: string
  - registeredAt: number

/users/{userId}/
  /contacts/{contactId}
    - contactId: string
    - contactName: string
    - roomId: string
    - savedAt: number

  /incomingInvites/{fromUserId}
    - fromUserId: string
    - fromName: string
    - fromEmail: string
    - fromPhotoURL: string
    - roomId: string
    - timestamp: number
    - status: "pending"

  /acceptedInvites/{acceptedByUserId}
    - acceptedByUserId: string
    - acceptedByName: string
    - acceptedByEmail: string
    - acceptedByPhotoURL: string
    - roomId: string
    - timestamp: number
```

---

## Security Considerations

1. **Email directory privacy** - Only authenticated users can search
2. **Invite spam** - Consider rate limiting (not yet implemented)
3. **Google Contacts scope** - Read-only, user can skip if desired
4. **OAuth verification** - App shows "unverified" warning until Google verification complete

---

## Setup Requirements

### Google Cloud Console
1. Enable **People API**
2. OAuth consent screen configured
3. `contacts.readonly` and `contacts.other.readonly` scopes added

### Firebase
1. Security rules deployed for `/usersByEmail`, `/incomingInvites`, `/acceptedInvites`
2. Realtime Database enabled

---

## File Structure

```
src/
├── contacts/
│   ├── user-discovery.js      # Phase 1: Email-based lookup
│   ├── google-contacts.js     # Phase 2: Google People API
│   └── invitations.js         # Phase 3: In-app invites
├── components/
│   └── contacts/
│       └── add-contact-modal.js  # Phase 5: Import UI
├── utils/
│   └── room-id.js             # Phase 4: Deterministic IDs
└── firebase/
    └── auth.js                # requestContactsAccess()
```
