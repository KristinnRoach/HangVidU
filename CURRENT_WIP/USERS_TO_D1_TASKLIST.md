# Users → D1 — Task list to manually-testable e2e

Minimal coarse sequence to a happy-path click-through on **dev**. Not a full
plan — see [`USERS_TO_D1_SLICE.md`](./USERS_TO_D1_SLICE.md) for the why and the
locked decisions. Refine tasks only after the flow is verified working.

**Happy path to reach:**

- profile + contacts served from D1 (adapters flipped)
- search by handle → send request → accept on a 2nd account → both sides
  connected **with a live `conversation_id`** (chat opens immediately)
- referral link → open → sign in → **auto-connected** (no gate)
- auto-claimed handles on login

**Status note (2026-06-26):** request and referral flows were manually verified
with `dev:local`. The slice is ready for PR review, but remote cutover still
requires applying D1 migration `0006`, backfilling RTDB users/contacts into remote
D1, then running `deploy:cf` and `deploy:fb`.

**Review (2026-06-25):** codepath traced for both scenarios. Server verified
correct (connectUsers + create-on-accept + both-party nudge + `/referrals/connect`).
**Bug found & fixed:** the client live-refresh (step 6) funneled through
`hydrateContacts()`, which short-circuits when already `ready` — so a
newly-connected contact never appeared on an already-loaded tab (both-party live
update was broken on every path: accept, post-accept nudge, referral). Added
`reloadContacts()` (guard-bypassing force re-list) and repointed `invite-listener`
(accept + nudge-sync) and `referral-handler`.

---

## 1. Schema — migration `0006`

- [x] Drop `room_id` from `contacts` and `contact_requests`. Keep
      `conversation_id` on `contacts`, nullable.
- 0006 has not been applied to remote D1 yet, so it can still be revised in
  place for this PR. For local D1, use `pnpm migrate:clean:local` to reset the
  local D1 files and reapply the current migrations.

## 2. Server — connect primitive + create-on-accept (revise)

- [x] `repo.ts`: add `connectUsers(db, a, b, now)` = resolve-or-create conversation
      (reuse `resolveOrCreateDirect`) + upsert both contact rows with the real
      `conversation_id` stamped. `ponytail:` comment — eager create now, lazy later.
- [x] **Nudge BOTH parties' mailboxes** after connect (do it in the handler that
      calls `connectUsers`, where `env.USER_MAILBOX` is available): the non-acting
      side needs a live refresh too — after Alice accepts, _Bob's_ tab must update to
      see Alice; after a referral auto-connect, the _referrer's_ tab must update to
      see the joiner. Without both nudges the 2nd tab only updates on manual reload
      (will read as a bug in the e2e). Reuse the `contact_request` mailbox event as
      the refresh signal.
- [x] Rewrite `acceptRequest` = verify pending request → `connectUsers` → mark
      `accepted`. `room_id` handling is already removed from repo + handlers + wire
      shapes.
- [x] `handlers.ts` + `index.ts`: add `POST /referrals/connect { referrerId }`;
      current raw-referrer-id flow runs `connectUsers`.
- [x] Update the worker smoke test: accept yields a `conversation_id` on both sides.

## 3. Client — contacts on D1 (verify + remaining revise)

- Adapter + `createContactsD1Repository` + `contactsStore` flip already in place
  — **verify**.
- [x] Drop `roomId` from the contact shape (`contact-transform`,
      `contact-schema`); rename `getContactByRoomId` → `getContactByConversationId`;
      re-point its one consumer (`push-notifications.js`).
- [x] Apply the UUID-shape guard on `conversation_id` reads (non-UUID → `null`).
- [x] **Name fallback:** auto-connected contacts have a blank nickname. The contact
      list must fall back to the other user's profile `display_name` (now in D1) so
      neither side shows a blank / "No name" contact after auto-connect.

## 4. Client — profile on D1 (verify)

- [x] Profile D1 adapter + `userDirectoryStore` wiring already in place — **verify**.
- [x] Add `discoverable` + `username` to `UserProfileSchema`.

## 5. Discovery + search UI (build)

- [x] Discovery client ported to `/users/lookup` already in place — **verify**.
- [x] **Build:** a search box — handle in → result → "send request" button.

## 6. Contact requests — client + live nudge (build)

- [x] Contact-requests client (send / list-incoming / accept) over `/contact-requests*`.
- [x] Subscribe the `UserMailbox` `contact_request` event; on nudge, refetch incoming
  - refresh contacts. Replace `invite-listener.js` / `invitations.js` consumers
    (`auth-orchestration.js`, `send-contact-invite.js`, `manual-contact-invite.js`).
  * [x] **(review fix)** the "refresh contacts" half must use `reloadContacts()`,
        not `hydrateContacts()` — the latter no-ops when already `ready`, so the new
        contact wouldn't appear without a manual reload.

## 7. Referral re-point (build)

- [x] `referral-handler.js`: on sign-in call `/referrals/connect`; retire the
      `syntheticInvite` hack. Keep the `?ref=<uid>` capture as-is for now.

## 8. Handle auto-claim (build)

- [x] Accounts auto-claim a valid handle on login when missing one.
      Handle customization/privacy is deferred to the settings slice.

## 9. Smoke e2e on dev (two accounts)

- [x] Clicked through request and referral flows on `dev:local`.
- **Sequence note:** backfill is deferred, so existing accounts get a handle on
  next login if they do not already have one. To test search, the _target_
  account must have completed that login/claim path first.
- Verified both sides see the other's **name** (not blank), can **open chat
  immediately** (live `conversation_id`), and that the **non-acting tab refreshes
  via the mailbox nudge** without a manual reload.

---

## Remaining before merge/deploy

- Remote D1 migration `0006_users_profile.sql` has **not** been applied yet.
- Prod D1 backfill from RTDB users/profiles/contacts is still required.
- Deploy order after merge/backfill: `deploy:cf`, then `deploy:fb`.

## Deferred follow-ups

- Profile/account settings UI for editing profile, handle, and discoverability.
- Contact delete/edit UI polish.
- Broader edge-case and client test coverage.
- Decline / request-cleanup / notification polish.
- Parked follow-ups: unguessable referral token (replaces forgeable `?ref=<uid>`
  - fixes pre-login banner name); auth-principal/handle decouple.
