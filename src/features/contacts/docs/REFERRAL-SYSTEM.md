# Referral System Implementation

## Overview

The referral system allows users to invite friends via email links. When a new user signs up via a referral link, both users are automatically added to each other's contacts.

## How It Works

### 1. Referral Link Generation

When sending email invites to non-users:

```javascript
const referralLink = `${window.location.origin}/?ref=${myUserId}`;
```

### 2. Capture Referral (Contacts Setup)

```javascript
import { captureReferral } from '../features/contacts/referrals/referral-handler.js';
captureReferral(); // Stores referrerId in localStorage
```

### 3. Process Referral (After Sign-in)

```javascript
import { processReferral } from '../features/contacts/referrals/referral-handler.js';
await processReferral(); // Auto-adds both users as contacts
```

## Architecture

### Uses D1 Connect Primitive

The referral system calls the same D1 connect primitive as contact-request
acceptance, without creating a pending request:

1. **Referral link clicked** → `captureReferral()` stores referrer ID
2. **User signs in** → `processReferral()` calls `/referrals/connect`
3. **Mutual contact add** → Worker creates/reuses the direct conversation and
   saves both contact rows

### Why This Approach?

- ✅ **Consistent UX**: Same flow as "Invite Selected" button for contacts already on the app
- ✅ **Code reuse**: One server-side contact-add primitive
- ✅ **Maintainable**: Single source of truth for mutual adds

## Integration Points

```javascript
// src/setup/setupContacts.js
import { captureReferral } from '../features/contacts/referrals/referral-handler.js';
captureReferral();

// src/setup/setupAuth.js
import { processReferral } from '../features/contacts/referrals/referral-handler.js';
await processReferral();
```

## Email Messaging

Consistent description across all invites:

> "HangVidU - an app for text messaging, video calls and video sharing"

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

## Files

- `src/features/contacts/referrals/referral-handler.js` - Core referral logic
