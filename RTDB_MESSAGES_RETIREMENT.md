# RTDB messages retirement checklist

Once the D1 message backend (`VITE_MESSAGE_BACKEND=d1`) is proven in production
(live push + files verified, soak period passed, code default flipped to `d1`
per decision 2026-06-15 #8), the legacy RTDB message path becomes deletable.
This is intended as a mechanical follow-up PR — nothing here blocks the current
slice. Delete top-down; run `pnpm ts && pnpm lint:boundaries && pnpm test` after
each group.

## Preconditions (do not start until all true)
- [x] Code default in `messaging-runtime.ts` is `d1` and has shipped.
- [x] No environment still sets `VITE_MESSAGE_BACKEND=rtdb` (prod/dev set `d1`).
- [ ] Prod soak clean (text, files, live push, multi-account).

## Client code to delete
- [x] `src/features/messaging-next/adapters/rtdb.ts` (message path) + `rtdb.test.js`.
      Dropped `createRTDBMessageRepository` + its helpers; kept
      `createRTDBConversationRepository` (conversation metadata is a separate
      migration).
- [x] `messaging-runtime.ts`: removed the `rtdb` branch + `selectMessageRepository`
      indirection; `d1` construction is inlined.
- [x] `src/shared/utils/direct-conversation-id.js` — deleted
      `deriveLegacyDirectConversationId` and its `schema.ts` re-export (nothing
      mints `a_b` ids now). Also dropped the now-unused `VITE_MESSAGE_BACKEND`
      flag (`env.d.ts` + `.env.example`s).
- [x] Legacy fallbacks: `contactsStore.saveContact` no longer derives a stored
      id (opaque id is minted lazily on open); `SWNavigation.tsx` contact-only
      deep links now resolve-or-create the opaque id via `openDirectConversation`
      instead of reading the stored derived id (`getConversationId` getter removed).
- [ ] `resolveContactIdFromDirectConversationId` (reverse `a_b` → contact) is
      **intentionally retained** as a best-effort fallback in `MainContent.tsx`
      for selections that arrive without participant ids. It returns null for
      opaque ids (no `_`), so it is inert under d1; delete once the call-button
      callee path is proven to always carry `remoteParticipantIds`.
- [ ] `group:` prefix handling (`GroupConversationIdSchema` / `createGroupConversationId`)
      is **out of scope** — it discriminates conversation-id shape, not the
      message path. Revisit with the conversation-metadata migration.

## Backend / infra to retire (deferred — prod ops, not in this PR)
- [ ] RTDB `conversations/*` security rules covering `messages` + `members`.
- [ ] RTDB stored message + members data (after any needed export/backup).
- [x] `workers/files` no longer references `FIREBASE_DATABASE_URL` (removed in
      the file sub-slice — authz is D1 now).

## Notes
- Conversation **metadata** (`ConversationNode`) still lives on RTDB via
  `createRTDBConversationRepository`; that is a separate migration, not part of
  this retirement. Do not delete the conversation repository here.
- Old RTDB `a_b` message history is intentionally NOT migrated (decision #2,
  start clean). Retirement deletes it rather than backfilling.
