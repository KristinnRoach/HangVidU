# Referral System Implementation

## Overview

The referral system allows users to invite friends via email links. When a new user signs up via a referral link, both users are automatically added to each other's contacts.

## How It Works

### 1. Referral Link Generation

When sending email invites to non-users:

```javascript
const referralLink = `${window.location.origin}/?ref=${myUserId}`;
```

### 2. Capture Referral (Page Load)

```javascript
// In main.js - before auth
import { captureReferral } from './contacts/referral-handler.js';
captureReferral(); // Stores referrerId in localStorage
```

### 3. Process Referral (After Sign-in)

```javascript
// In main.js - after successful auth
import { processReferral } from './contacts/referral-handler.js';
await processReferral(); // Auto-adds both users as contacts
```

## Architecture

### Reuses Existing Invitation System

The referral system leverages the existing `invitations.js` infrastructure:

1. **Referral link clicked** → `captureReferral()` stores referrer ID
2. **User signs in** → `processReferral()` creates synthetic invite
3. **Synthetic invite accepted** → Uses `acceptInvite()` from invitations.js
4. **Mutual contact add** → Both users get each other via `listenForAcceptedInvites()`

### Why This Approach?

- ✅ **Consistent UX**: Same flow as "Invite Selected" button for contacts already on the app
- ✅ **Code reuse**: No duplicate contact-add logic
- ✅ **Maintainable**: Single source of truth for mutual adds

## Integration Points

### Required in main.js:

```javascript
// 1. On page load (before auth)
import { captureReferral } from './contacts/referral-handler.js';
captureReferral();

// 2. After successful authentication
import { processReferral } from './contacts/referral-handler.js';
onAuthChange(async (user) => {
  if (user) {
    await processReferral();
    // ... rest of auth logic
  }
});

// 3. Start listening for accepted invites (for referrer)
import { listenForAcceptedInvites } from './contacts/invitations.js';
listenForAcceptedInvites((userId, acceptData) => {
  console.log(`${acceptData.acceptedByName} joined via your invite!`);
  // Optional: Show notification, refresh contacts list, etc.
});
```

## Email Messaging

Consistent description across all invites:

> "HangVidU - an app for text messaging, video calls and video sharing"

## Future Enhancements

### 1. Referral Analytics

Track who referred whom:

```javascript
// In processReferral(), before cleanup:
await set(ref(rtdb, `users/${myUserId}/referredBy`), referrerId);
await increment(ref(rtdb, `users/${referrerId}/referralCount`));
```

### 2. Welcome Notification

Show a toast when referral is processed:

```javascript
// After successful processReferral():
showNotification(`Connected with ${referrerName}! 🎉`);
```

### 3. Referral Rewards

Gamification for user growth:

- "You've invited 5 friends!"
- Premium features for X referrals
- Leaderboard of top referrers

### 4. Referral Dashboard

Show referral stats in user profile:

- Total invites sent
- Successful sign-ups
- Active referred users

## Testing

### Manual Test Flow:

1. User A sends email invite to User B (not on app)
2. User B clicks link with `?ref=userA`
3. User B signs up
4. ✅ User A appears in User B's contacts
5. ✅ User B appears in User A's contacts
6. ✅ Both can call each other immediately

### Edge Cases Handled:

- ❌ Self-referral (user refers themselves)
- ❌ Referrer doesn't exist
- ❌ User already has referrer as contact
- ✅ Multiple referral attempts (idempotent)
- ✅ Referral link works after sign-out/sign-in

## Files Modified/Created

### New Files:

- `src/contacts/referral-handler.js` - Core referral logic

### Modified Files:

- `src/ui/components/contacts/add-contact-modal.js` - Fixed email messaging
- `src/main.js` - Integration points (TODO)

### Existing Files (Reused):

- `src/contacts/invitations.js` - Mutual contact-add system
- `src/utils/room-id.js` - Deterministic room ID generation
