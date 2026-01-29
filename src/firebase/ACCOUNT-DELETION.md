# Account Deletion

## Overview

Users can permanently delete their account and all associated data through the UI.

## What Gets Deleted

When a user deletes their account, the following data is removed:

### Firebase Auth

- User authentication account

### Firebase RTDB

- `users/{userId}/fcmTokens` - FCM notification tokens
- `users/{userId}/presence` - Online/offline status
- `users/{userId}/contacts` - Saved contacts
- `users/{userId}/recentCalls` - Call history
- `users/{userId}/outgoingCall` - Outgoing call state
- `users/{userId}/incomingInvites` - Pending invitations
- `users/{userId}/acceptedInvites` - Accepted invitation notifications
- `users/{userId}` - Entire user node (catch-all)
- `usersByEmail/{emailHash}` - **User discovery directory entry** (prevents showing as "On HangVidU")

### FCM Tokens

- Device FCM tokens are deleted from Firebase Cloud Messaging

## User Flow

1. User clicks "Delete Account" button (only visible when logged in)
2. Confirmation dialog appears with warning about permanent deletion
3. If confirmed:
   - User is set offline
   - All RTDB data is cleaned up (including discovery directory)
   - FCM tokens are deleted
   - Firebase Auth account is deleted
   - User is signed out
   - One-tap sign-in is shown after 1.5s

## Error Handling

### Requires Recent Login

If the user's session is too old, Firebase requires re-authentication:

- Error: `auth/requires-recent-login`
- User-friendly message: "For security, please sign out and sign in again before deleting your account."

### Partial Cleanup Failures

If individual RTDB path deletions fail, the process continues with other deletions. Errors are logged but don't block the account deletion.

## Security

- Only authenticated users can delete their account
- Confirmation dialog prevents accidental deletion
- Firebase Auth requires recent login for sensitive operations
- RTDB security rules enforce user can only delete their own data

## UI Integration

The delete account button is integrated into `AuthComponent`:

- Located in the top bar next to Login/Logout
- Styled with warning color (red)
- Disabled when user is not logged in
- Shows confirmation dialog before proceeding

## Testing

Manual testing steps:

1. Sign in with Google
2. Create some data (contacts, make calls)
3. Click "Delete Account"
4. Confirm deletion
5. Verify account is deleted and data is removed from RTDB
6. **Important**: Have another user import Google contacts - deleted user should NOT show as "On HangVidU"

## Code Location

- **Function**: `src/firebase/auth.js` - `deleteAccount()`
- **Discovery cleanup**: `src/contacts/user-discovery.js` - `removeUserFromDirectory()`
- **UI**: `src/components/auth/AuthComponent.js`
- **Styles**: `src/styles/components/top-bar.css`
- **Tests**: `src/firebase/auth.test.js`
