# RTDB → Cloudflare migration — status

**The migration is done in code and deployed.** Last updated: 2026-06-28.

Everything conversation-shaped hangs off the opaque `conversationId` spine:
D1 (relational), R2 (blobs), Durable Objects (`ConversationChannel` live push,
`UserMailbox` call/activity, `SignalingRoom` WebRTC). All on the single
`hangvidu-data` Worker (`backend/cloudflare/`, folders `data/ files/ realtime/`).

Shipped: messages+files+reactions (#536), call-room handle (#535), call mailbox
(#553/#565), live message push (#536), conversation metadata → D1 (Slice C),
and contacts/profile/directory/contact-requests → D1 (#575).

## Still on RTDB — keep (live, by design)

- **Presence** (`users/{uid}/presence`) — `onDisconnect` has no D1 equivalent;
  belongs on a DO if ever moved, not D1.
- **Push subscriptions** (`users/{uid}/pushSubscriptions`) + `pushSubscriptionOwners`
  — coupled to the Firebase Functions / Web-Push path (the one capability not on
  Cloudflare; admin-SDK writes, no client rules needed for `pushSubscriptionOwners`).
- **`usersByEmail/{hash}`** — load-bearing: `signInWithUsernameOrEmail` reads it
  **pre-auth** (no token) to resolve email→handle for password accounts (whose
  Firebase principal is a synthetic email, so D1's token-gated `/users/lookup`
  can't be used). Written by `password-auth.js` + `userDirectoryStore.js`
  (dual-write alongside D1). **Blocked on** a public, token-less
  resolve-by-email-hash worker endpoint before it can move to D1. See the
  `ponytail:` note at `userDirectoryStore.js:115`.

Firebase **Auth** stays (workers verify ID tokens via the `auth.ts` seam).

`rooms/{roomId}/p2pSignaling` is no longer written by the app — the RTDB signaling
setup was unwired (2026-06-28; DO is the only path). `firebase-room-signaling.js`
is kept in-tree as a dormant, self-contained reference. Its `rooms` rules can stay
as a re-wire affordance or be pruned with the rest.

## Remaining cleanup

### 1. Prune dead RTDB prod data + security rules (destructive — needs backup)
The 2026-06-28 audit confirmed D1 is complete (34 users, all named). These nodes
have **zero live readers/writers** (verified) and are safe to delete after a
full RTDB backup:

- Top-level: `notifications`, `conversations`.
- Under each `users/{uid}`: `contacts`, `incomingInvites`, `acceptedInvites`, `calls`.
- Optional: `rooms` (now unwired — see above).

`users/{uid}/profile` is **write-only-dead**: only `password-auth.js` still writes
`profile/{username,email}` and nothing reads them. Remove those two `set()` calls
first, then it joins the deletable set.

Trim `database.rules.json` to keep only `usersByEmail`, `rooms` (optional), and
`users/{uid}/{presence, pushSubscriptions, profile}` + the user create/delete rule;
`deploy:fb`. Old `a_b` message history is intentionally not backfilled (decision #2).

### 2. Dead client residue
- `resolveContactIdFromDirectConversationId` (`src/shared/utils/direct-conversation-id.js`)
  is still imported by `MainContent.tsx:204` as a best-effort fallback; returns
  null for opaque ids (dead under d1). Delete once the call-button callee path
  always carries `remoteParticipantIds`.
- Orphaned-but-kept RTDB adapter seams (de-wired from their barrels 2026-06-28,
  zero importers): `contacts-rtdb-adapter.js`, `user-profile-rtdb-adapter.js`,
  `firebase-room-signaling.js`. Kept as dormant swap references; delete outright
  if no RTDB rollback is ever wanted. (`invite-listener.js` is NOT dead — it was
  rewritten onto the `UserMailbox` DO + D1.)

### 3. Account deletion (re-implement, later)
The old RTDB-based `delete-account-handler` (Firebase Function) + its dormant
client command were removed 2026-06-28 — account deletion was never wired into the
UI and the logic only cleaned RTDB. When it's reimplemented, it must delete from
**D1** (users, contacts, members, reactions; conversations cascade) and **R2**
(attachments), plus RTDB `presence`/`pushSubscriptions`/`usersByEmail`.
