# Conversation ID Contract Handoff

Branch: `codex/conversation-id-contract`

Base: `main` at merge commit `22fea33` (`Merge pull request #423 from KristinnRoach/conv-members-db`)

Date: `2026-03-31`

## Why this branch exists

PR `#423` was merged and deployed. It added conversation membership and reverse indexes:

- `conversations/{conversationId}/members/{uid}: true`
- `users/{uid}/conversations/{conversationId}: true`

That was an important compatibility step, but the app still treats `conversationId` as a meaningful, parseable string in several places. This new branch is for defining and implementing a clean, documented ID contract so future group chat work is not blocked by legacy `uid1_uid2` assumptions.

This branch should stay focused on IDs and their contract, not on full group chat UX.

## Current production reality

- Existing direct-message conversation IDs are still generated as sorted participant IDs joined with `'_'`.
- Current code still contains logic that parses or pattern-matches `conversationId`.
- Membership and reverse indexes are now live in production and should become the long-term authority.
- Existing conversations must continue to work without data loss or broken history.

## Core problem

The app currently mixes two different ideas:

1. `conversationId` as an opaque identifier
2. `conversationId` as an encoded participant list

That ambiguity leaks into rules, notifications, deletion fallbacks, migration scripts, and controller helpers. Future group chat needs `conversationId` to be opaque and stable.

## High-level goal

Create a clearly documented contract for IDs across the app, with special focus on `conversationId`, so that:

- new conversations can use opaque IDs
- existing legacy 1:1 conversations keep working
- authorization and routing stop depending on parsing `conversationId`
- future group chat can build on explicit membership and metadata rather than ID structure

## Non-goals

- Do not ship full group chat UI in this branch.
- Do not do a one-shot rename of all existing conversation IDs unless the work proves it is necessary and safe.
- Do not leave behind multiple conflicting ID creation paths.

## Files and codepaths currently coupled to legacy conversation IDs

### ID creation

- `src/messaging/storage/rtdb-message-store.js`
  - `resolveConversationId(participantIds)` currently sorts and joins with `'_'`
  - `_ensureMembers()` currently derives participants via `conversationId.split('_')`
- `src/messaging/messaging-controller.js`
  - `resolveConversationIdFromContactId(...)` and related controller flows assume deterministic 1:1 IDs
- `src/contacts/components/contacts.js`
- `src/main.js`
- `src/app/setupMainAppBusListeners.js`
- `src/messaging/handle-appbus-events.js`

### Rules and authorization fallback

- `database.rules.json`
  - temporary fallback still uses `conversationId.contains(...)`

### Notifications and server logic

- `functions/push-notifications/send-message-notification-handler.js`
  - derives recipient by splitting `conversationId`
- `functions/account/delete-account-handler.js`
  - fallback still scans by parsing IDs when reverse index is missing
- `scripts/delete-user-account.js`
  - same legacy fallback

### Migration and admin scripts

- `scripts/migrate-conversation-members.js`
  - assumes legacy `uid1_uid2` IDs

### Documentation that should be updated when the contract changes

- `src/messaging/schema.js`
- `docs/misc/session_vs_conversation.md`

## Desired end-state contract

The next Codex session should drive toward an explicit contract like this:

### 1. Conversation IDs

- `conversationId` is an opaque stable identifier.
- No app code should infer participants from it.
- No rules should authorize by pattern-matching it.

### 2. Membership

- Membership is authoritative at `conversations/{conversationId}/members`.
- Reverse lookup is authoritative at `users/{uid}/conversations/{conversationId}`.
- Notification fanout and cleanup flows should use explicit membership, not ID parsing.

### 3. Conversation metadata

- Direct vs group semantics should come from explicit metadata, not the ID format.
- The system should have a documented place for conversation type and creation metadata.

### 4. Legacy compatibility

- Existing legacy 1:1 IDs must remain readable.
- New opaque-ID conversations must coexist safely with old ones during migration.
- Temporary fallback code must be clearly marked and removable.

## Recommended implementation shape

The next session should probably aim for this shape:

1. Define the contract first in code comments and docs.
2. Introduce a single canonical conversation creation path.
3. Separate:
   - `createConversationId()` or equivalent opaque ID generation
   - direct-chat dedupe / lookup logic
4. Stop deriving participants from `conversationId` in runtime logic.
5. Update rules to rely on membership only, once compatibility is ready.
6. Decide whether old conversations:
   - remain on legacy IDs forever with compatibility handling, or
   - get a mapping layer / canonical ID migration

## Important design decisions to make explicitly

The next session should not proceed without deciding these:

1. For direct 1:1 chats, how do we prevent duplicate conversations once IDs are opaque?
   Options:
   - dedicated direct-conversation lookup key
   - transactional server-side creator
   - deterministic secondary index

2. Do we keep legacy 1:1 conversation IDs permanently, or only during a safety period?

3. Should new conversation creation move to trusted backend code so that membership, reverse indexes, and metadata are created atomically?

4. Do we need a legacy-to-canonical mapping layer, or is “legacy stays legacy, new stays opaque” enough?

## Suggested phased plan

### Phase 1: Contract and inventory

- Document the ID contract in code and docs.
- Inventory all `conversationId` parsing/pattern-matching callsites.
- Pick the canonical conversation creation flow.

### Phase 2: New opaque ID path

- Add opaque ID creation for new conversations.
- Add explicit conversation metadata required for direct/group behavior.
- Add or update direct-chat dedupe/index logic.

### Phase 3: Runtime decoupling

- Remove `split('_')` or `contains(...)` dependencies from:
  - notifications
  - deletion fallbacks
  - runtime membership creation
  - rules

### Phase 4: Compatibility cleanup

- Decide legacy support model.
- Remove temporary fallback paths after a safety period.
- Update docs and tests to the final contract.

## Acceptance criteria for this branch

- There is one documented source of truth for how conversation IDs are created and used.
- New work can add group chat without needing to parse `conversationId`.
- Existing legacy conversations continue to work.
- Rules and server flows no longer depend on ID structure, or remaining fallback is clearly isolated and documented.
- The repo docs explain the migration/compat story clearly enough that a future contributor does not need oral history.

## Things that are easy to get wrong

- Quietly leaving multiple ID creation paths in place
- Solving ID opacity without solving 1:1 dedupe
- Updating client code but leaving rules / notifications / admin scripts coupled to old IDs
- Attempting a risky full rename of existing conversation IDs without a compatibility plan

## Suggested first tasks for the next session

1. Read this document.
2. Inventory and categorize all `conversationId` parsing and generation callsites.
3. Propose the final ID contract in a short design note before implementing.
4. Decide the legacy compatibility model.
5. Implement only the foundation needed for the contract, not group chat UI.

## Paste into the next Codex session

```text
Use branch `codex/conversation-id-contract` as the starting point.

Read `/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/docs/dev/conversation-id-contract-handoff.md` first and treat it as the source of truth for scope and context.

Goal: make `conversationId` a clearly documented, consistent contract across the app so future group chat support is not blocked by legacy `uid1_uid2` assumptions. Focus on ID creation, membership authority, reverse indexes, notification/deletion/rules decoupling, and legacy compatibility. Do not implement full group chat UI in this branch.

Before coding, inventory all `conversationId` creation/parsing callsites and propose the concrete contract plus migration/compat approach.
```
