# Database Rules Migration TODO

These rules are shared by production and development. Do not remove legacy paths
until the Solid/p2p call-flow branch has been merged, deployed, and production
clients are no longer running the `main` branch call code.

## After the new call-flow is deployed

- Restore the scoped `rooms/{roomId}` access rules that were temporarily rolled
  back for production legacy call compatibility:

  ```json
  "rooms": {
    "$roomId": {
      ".read": "auth != null && data.child('participants').child(auth.uid).exists()",
      ".write": "auth != null && !newData.exists() && data.child('meta').child('createdBy').val() === auth.uid",
      "meta": {
        ".write": "auth != null && !data.exists() && newData.hasChildren(['createdBy', 'createdAt', 'expiresAt']) && newData.child('createdBy').val() === auth.uid && newData.child('createdAt').isNumber() && newData.child('expiresAt').isNumber()"
      },
      "participants": {
        "$uid": {
          ".write": "auth != null && root.child('rooms').child($roomId).child('meta').child('createdBy').val() === auth.uid && newData.val() === true"
        }
      },
      "p2pSignaling": {
        ".write": "auth != null && root.child('rooms').child($roomId).child('participants').child(auth.uid).exists()"
      },
      "watch": {
        ".write": "auth != null && root.child('rooms').child($roomId).child('participants').child(auth.uid).exists()"
      },
      "mediaSyncSignaling": {
        ".write": "auth != null && root.child('rooms').child($roomId).child('participants').child(auth.uid).exists()"
      }
    }
  }
  ```
- Review whether `users/{userId}/recentCalls` is still used. It is required by
  the current production `main` branch call listeners, so it must stay until the
  legacy call module is fully retired in production.
- Review whether `users/{userId}/outgoingCall` is still used. It belongs to the
  legacy outgoing-call UI state and may be removable after the new call-flow owns
  all outgoing call state.
- Review whether `users/{userId}/calls/*` can replace any legacy call lifecycle
  paths, and tighten validation for:
  - `calls/incoming`: require the invite writer to match `callerId`, validate
    required fields, and define whether only contacts may create call invites.
  - `calls/response`: require response payloads to match the expected room and
    sender, and define who can clear the response.
  - `calls/response` `.read` is currently `auth != null`, so any signed-in user
    can read any other user's call-response signaling (caller/callee uids,
    roomId, response type, timestamps). Scope to the participants of the call
    — either by including `callerId` in the payload and gating
    `.read` on `auth.uid === data.child('callerId').val()`, or by moving the
    response under `rooms/{roomId}` so room-access gates the read.
- Once all active clients are migrated, remove obsolete call rules and matching
  storage helpers in the same release.

## Password / username sign-in (deferred until verified or BetterAuth migration)

The username + password sign-in flow uses Firebase Auth's built-in email
uniqueness via a synthetic `{username}@hangvidu.invalid` principal, so it
required **no rules change**. The following follow-ups are deferred so they do
not affect production before the new flow is verified:

- **Username change flow** — deferred until core functionality is manually
  verified. When added, it needs either a `usernames/{username}` claim node
  (with `.read: true` for availability checks and write rules that prevent
  hijacking) or an Admin-SDK Cloud Function. Don't introduce until after the
  basic sign-up/sign-in is working in DEV.

- **Password reset for username-only accounts** — deferred. Firebase's reset
  flow needs a real email. Punting on this until we decide whether to migrate
  to BetterAuth; username-only users currently have no recovery path and the
  sign-up UI should communicate that.

- **`usersByEmail/{hash}` validation tightening** — current write rule is
  permissive about value shape. Consider adding `.validate` to require
  `uid`/`userName`/`registeredAt` and to allow the optional `username` field
  introduced for email→handle lookup during password sign-in by email.

## Field rename: `userName` → `displayName` (or `appNickname`)

Before deploying the username + password flow, rename the existing display-name
field `userName` (used everywhere as a non-unique display string) to
`displayName` or `appNickname` to disambiguate from the new `username` (unique
login handle). This is a breaking data-shape change that touches:

- `users/{uid}/profile/userName` (RTDB path key)
- `usersByEmail/{hash}.userName` (directory entry)
- `UserProfileSchema` / `DirectoryEntrySchema` in
  `src/storage/user/schema.js`
- All consumers of `getUserName()` / `authState.user.userName`

Plan a one-time migration (read old field, write new, delete old) and ship the
rename and migration in the same release. Do not start until both DEV and PROD
clients have been updated to read both keys during a transition window.
