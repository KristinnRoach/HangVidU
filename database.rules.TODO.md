# Database Rules Migration TODO

These rules are shared by production and development. Items below are deferred
to subsequent releases — they must not block the Solid cutover deploy.

## After the new call-flow is deployed (legacy clients fully retired)

The Solid deploy keeps `rooms/{roomId}` permissive (`read: true / write: true`)
for one release as a safety net for any cached PWA clients still running
`archive-pre-solid-main` call code. Once those clients are confirmed gone:

- Restore the scoped `rooms/{roomId}` access rules:

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
      }
    }
  }
  ```

  The legacy `watch` and `mediaSyncSignaling` sub-rules can be dropped — the
  Solid code does not use those paths (watch-together has not been re-wired
  onto the new room model yet; add the sub-rule back when it is).

- `users/{uid}/calls/response` `.read` is currently `auth != null`, which lets
  any signed-in user read any other user's call-response signaling (caller/
  callee uids, roomId, response type, timestamps). Scope to call participants
  — either by including `callerId` in the payload and gating `.read` on
  `auth.uid === data.child('callerId').val() || auth.uid === $userId`, or by
  moving the response under `rooms/{roomId}` so room-access gates the read.

- Tighten the remaining `calls/incoming` and `calls/response` `.write`
  validation if any field constraints are still missing once the call flow is
  fully exercised in prod (e.g. require `callerId === auth.uid` on writes,
  bound expiresAt windows, restrict to contacts).

## Conversations: backfill `members/` and drop the substring fallback

Today both `conversations/{id}` `.read` and `messages/{messageId}` `.write`
fall back to `$conversationId.contains(auth.uid + '_')` because neither the
archive code nor the new Solid `messaging-next` adapter writes
`conversations/{id}/members/{uid}`. The fallback is load-bearing: dropping it
without a backfill would break every existing direct conversation. The
substring rule is safe in practice because Firebase Auth UIDs are alphanumeric
(no `_`), but is fragile in principle and ties us to the
`{userA}_{userB}`-sorted direct-id format.

Steps for a future release:

1. Update the messaging RTDB adapter to write `members/{senderId}` and
   `members/{recipientId}` on first send (or on conversation open) for direct
   conversations.
2. Run an admin backfill that derives both participants from the existing
   `{userA}_{userB}` conversation id and writes `members/{uid}: true` for each.
3. Drop both substring fallbacks from `database.rules.json`.
4. While there, fix the direct-id format itself (see top of
   [`src/shared/utils/direct-conversation-id.js`](./src/shared/utils/direct-conversation-id.js))
   — `split('_')` breaks if uids ever contain `_`. Use a safer encoded id or
   pass participant ids from conversation metadata.

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

Before deploying the username + password flow widely, rename the existing
display-name field `userName` (used everywhere as a non-unique display string)
to `displayName` or `appNickname` to disambiguate from the new `username`
(unique login handle). This is a breaking data-shape change that touches:

- `users/{uid}/profile/userName` (RTDB path key)
- `usersByEmail/{hash}.userName` (directory entry)
- `UserProfileSchema` / `DirectoryEntrySchema` in
  `src/storage/user/schema.js`
- All consumers of `getUserName()` / `authState.user.userName`

Plan a one-time migration (read old field, write new, delete old) and ship the
rename and migration in the same release. Do not start until both DEV and PROD
clients have been updated to read both keys during a transition window.

## Minor cleanups (low priority)

- `notifications/{userId}` RTDB node is unused at runtime — only the
  `delete-account-handler` cloud function ever writes to it (with `null`),
  and no client reads or writes it. Rule is also too permissive
  (`.write: "auth != null"` lets any signed-in user write to anyone's node).
  Drop the rule block and the cloud-function cleanup line in the same release.
- `users/{uid}/profile` `.write` has no shape validation. Restrict to known
  keys (`userName`, `photoURL`, `username`, `email`) with `.validate` rules.
- `users/{uid}` parent `.write: "$userId === auth.uid && !newData.exists()"`
  is effectively dead — the account-delete cloud function uses admin SDK,
  which bypasses rules. Can be removed, leaving per-child rules.
