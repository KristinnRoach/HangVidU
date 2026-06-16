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
- [ ] `src/features/messaging-next/adapters/rtdb.ts` (message path) + `rtdb.test.js`.
      Keep only if the conversation-metadata repository is still RTDB-backed —
      `createRTDBConversationRepository` is separate; split the file or drop only
      `createRTDBMessageRepository` and its helpers.
- [ ] `messaging-runtime.ts`: remove the `rtdb` branch + `selectMessageRepository`
      indirection once there is a single backend; inline the `d1` construction.
- [ ] `src/shared/utils/direct-conversation-id.js` + `deriveLegacyDirectConversationId`
      (re-export in `messaging-next/schema.ts`) once nothing derives `a_b` ids.
- [ ] `resolveContactIdFromDirectConversationId` and any `group:` prefix handling.
- [ ] Legacy fallbacks in `MainContent.tsx` (legacy pair-id derivation) and
      `contactsStore.ts`.
- [ ] `SWNavigation.tsx` raw-id deep-link `open()` — must resolve an opaque id.

## Backend / infra to retire
- [ ] RTDB `conversations/*` security rules covering `messages` + `members`.
- [ ] RTDB stored message + members data (after any needed export/backup).
- [ ] Confirm `workers/files` no longer references `FIREBASE_DATABASE_URL`
      (already removed in the file sub-slice — authz is D1 now).

## Notes
- Conversation **metadata** (`ConversationNode`) still lives on RTDB via
  `createRTDBConversationRepository`; that is a separate migration, not part of
  this retirement. Do not delete the conversation repository here.
- Old RTDB `a_b` message history is intentionally NOT migrated (decision #2,
  start clean). Retirement deletes it rather than backfilling.
