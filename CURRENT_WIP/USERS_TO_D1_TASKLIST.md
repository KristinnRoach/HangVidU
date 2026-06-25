# Users → D1 — Task list to manually-testable e2e

Minimal coarse sequence to a happy-path click-through on **dev**. Not a full
plan — see [`USERS_TO_D1_SLICE.md`](./USERS_TO_D1_SLICE.md) for the why and the
locked decisions. Refine tasks only after the flow is verified working.

**Happy path to reach:**
- profile + contacts served from D1 (adapters flipped)
- search by handle → send request → accept on a 2nd account → both sides
  connected **with a live `conversation_id`** (chat opens immediately)
- referral link → open → sign in → **auto-connected** (no gate)
- handle-claim prompt for accounts with no handle

**Status note:** server + several client pieces were built earlier this session
against the *pre-lock* plan. The legacy contact/request `room_id` field and
client contact `roomId` shape are now removed; server create-on-accept and
`/referrals/connect` are now in place. Remaining **revise** work is mostly
client live-refresh/name fallback. Items marked **build** are net-new; **verify**
is wiring already in place.

---

## 1. Schema — migration `0006`
- [x] Drop `room_id` from `contacts` and `contact_requests`. Keep
  `conversation_id` on `contacts`, nullable.
- 0006 is dev-only / not deployed remotely → edit in place. To re-apply: drop
  ONLY the new (empty) `contacts` + `contact_requests` tables and the added
  `users` columns (`photo_url`, `username`, `email_hash`, `discoverable`,
  `registered_at`) + their indexes, then re-run `migrate:local`. **Never** reset
  the shared `conversations` / `messages` / `users` rows that `pnpm dev:data`
  uses (don't-wipe-dev-D1 rule).

## 2. Server — connect primitive + create-on-accept (revise)
- [x] `repo.ts`: add `connectUsers(db, a, b, now)` = resolve-or-create conversation
  (reuse `resolveOrCreateDirect`) + upsert both contact rows with the real
  `conversation_id` stamped. `ponytail:` comment — eager create now, lazy later.
- [x] **Nudge BOTH parties' mailboxes** after connect (do it in the handler that
  calls `connectUsers`, where `env.USER_MAILBOX` is available): the non-acting
  side needs a live refresh too — after Alice accepts, *Bob's* tab must update to
  see Alice; after a referral auto-connect, the *referrer's* tab must update to
  see the joiner. Without both nudges the 2nd tab only updates on manual reload
  (will read as a bug in the e2e). Reuse the `contact_request` mailbox event as
  the refresh signal.
- [x] Rewrite `acceptRequest` = verify pending request → `connectUsers` → mark
  `accepted`. `room_id` handling is already removed from repo + handlers + wire
  shapes.
- [x] `handlers.ts` + `index.ts`: add `POST /referrals/connect { referrerId }`,
  authorized by the caller's (joiner's) token alone; runs `connectUsers`.
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
  + refresh contacts. Replace `invite-listener.js` / `invitations.js` consumers
  (`auth-orchestration.js`, `send-contact-invite.js`, `manual-contact-invite.js`).

## 7. Referral re-point (build)
- [x] `referral-handler.js`: on sign-in call `/referrals/connect`; retire the
  `syntheticInvite` hack. Keep the `?ref=<uid>` capture as-is for now.

## 8. Handle-claim prompt (build)
- [x] One-time prompt for accounts with no handle; default suggestion from
  name/email; `PUT /users/me/profile`; on 409 re-suggest.

## 9. Smoke e2e on dev (two accounts)
- Not run yet in this session. Current verification is targeted automated checks
  only; do this before calling the slice manually complete.
- Click through the full happy path above end to end.
- **Sequence note:** backfill is deferred, so no dev account has a handle until
  claimed. To test search, the *target* account must claim a handle first (step
  8), then the other account searches it.
- Assert both sides see the other's **name** (not blank), can **open chat
  immediately** (live `conversation_id`), and that the **non-acting tab refreshes
  via the mailbox nudge** without a manual reload.

---

## Deferred until manual e2e verified (do NOT expand)
- Prod D1 backfill script + cutover.
- Tests beyond the worker smoke check (edge cases, client unit tests).
- Decline / request-cleanup / notification polish.
- Edge cases (re-send after decline, self-request, stale nudges, etc.).
- Parked follow-ups: unguessable referral token (replaces forgeable `?ref=<uid>`
  + fixes pre-login banner name); auth-principal/handle decouple.
