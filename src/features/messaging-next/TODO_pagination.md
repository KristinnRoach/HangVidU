# TODO: Scroll-Back Message Pagination (+ tail-only subscribe)

## Goal

Two changes bundled in one phase because they share the same `MessageRepository` interface change:

1. **Pagination** — scroll up past `RECENT_MESSAGES_WINDOW` (currently 20) to load older history on demand.
2. **Switch realtime listener from `limitToLast(N)` sliding window → tail-only `startAfter(latestKey)`** — fixes a silent-gap bug and removes the redundant replay-on-attach cost.

Stay event-driven and minimise RTDB bandwidth — historical pages are one-shot `get()` reads, not new listeners.

## Architecture fit

The existing store is already pagination-friendly:
- `mergeLoadedMessages` in `conversation.actions.ts` is a dedup-by-id merge — designed for this.
- `receiveMessage` also dedupes by id, so loaded-page + listener overlap is already harmless.
- `loadMessages` (one-shot) and `subscribe` (realtime) are already decoupled in the repository interface.

## Why bundle the tail-only switch here

Both changes need `loadMessages` to surface the key bounds of what it loaded (newest + oldest key). Doing them separately means changing the same interface twice. Doing them together means one coherent interface change.

### Current state (after `e6d963da`)
- `subscribe` uses `query(msgsRef, limitToLast(20))` + `onChildAdded`
- On attach, RTDB replays the last 20 children — redundant work because `loadMessages` already populated them. Dedup-by-id in `receiveMessage` makes it harmless but wasted bytes.
- **Silent bug**: on WebSocket reconnect after a long offline period, RTDB syncs the window to "current last 20." If 50 messages arrived while offline, you receive 20 `child_added` events for the new window — and the 30 messages between your old state and the new window are **silently dropped**. Client ends up with a hidden gap.

### Target state (tail-only)
- `subscribe` uses `query(msgsRef, orderByKey(), startAfter(latestKnownKey))` + `onChildAdded`
- On attach, zero replay (no existing children match `startAfter(latestKnownKey)`).
- On reconnect after offline, RTDB delivers **every** message added after `latestKnownKey` — no silent gap, correct chat semantics.

### Tradeoff to acknowledge
- Long offline reconnect with many missed messages → bigger sync burst (delivers all of them instead of capping at 20). For a chat app this is the right trade — users want missed messages, not silent gaps.
- For the redeploy-spike use case that motivated this work, both patterns behave identically on fresh page reload (no existing listener to resume). So this change doesn't affect the redeploy bandwidth profile either way.

### Edge case: empty initial load
New conversation → `loadMessages` returns `[]` → no key to `startAfter`. Use `startAfter('')` — empty string sorts before any RTDB push id, so the query is effectively "all children." On a fresh conversation that's 0 children = 0 cost. Once messages exist, next reload's `loadMessages` returns the latest set and the real `latestKey` is used.

## Implementation steps

### 1. Extend `MessageRepository` interface
`src/features/messaging-next/interfaces.ts`

```ts
loadMessages(
  conversationId: ConversationId,
  opts?: { before?: string; limit?: number },
): Promise<IncomingMessage[]>;

subscribe(
  conversationId: ConversationId,
  myUserId: UserId,
  fromKey: string,           // NEW — RTDB key to start after; '' = from beginning
  onMessage: (msg: IncomingMessage) => void,
): Unsubscribe | Promise<Unsubscribe>;
```

`before` = message key to load older than. `limit` defaults to `RECENT_MESSAGES_WINDOW`.
`fromKey` = the newest key the caller has already loaded; subscribe delivers messages strictly after it.

### 2. Implement in RTDB adapter
`src/features/messaging-next/adapters/rtdb.ts`

```ts
async loadMessages(conversationId, opts) {
  const limit = opts?.limit ?? RECENT_MESSAGES_WINDOW;
  const q = opts?.before
    ? query(msgsRef(conversationId), orderByKey(), endBefore(opts.before), limitToLast(limit))
    : query(msgsRef(conversationId), limitToLast(limit));
  const snapshot = await get(q);
  // ... existing iteration
}

subscribe(conversationId, myUserId, fromKey, onMessage) {
  // fromKey '' sorts before any push id → delivers all children (empty conversation case)
  const q = query(msgsRef(conversationId), orderByKey(), startAfter(fromKey));

  const handler = (snapshot: DataSnapshot) => {
    const raw = snapshot.val() as Record<string, unknown>;
    if (!raw || raw.from === myUserId) return;
    const msg = toIncoming(raw, snapshot.key!, conversationId);
    if (msg) onMessage(msg);
  };

  onChildAdded(q, handler);
  return () => off(q, 'child_added', handler);
}
```

Push ids are lexicographically chronological — `orderByKey` + `endBefore`/`startAfter` is the canonical pattern. Remove `RECENT_MESSAGES_WINDOW` import from `subscribe` (only `loadMessages` uses it now).

### 2b. Wire `fromKey` through `use-conversation.ts`

Currently `useConversation` calls `loadConversationHistory` then attaches `subscribe` in a separate `createEffect`. Need to:
- Have `loadConversationHistory` return the loaded messages so caller can compute `latestKey = messages[messages.length - 1]?.id ?? ''`.
- Pass that `latestKey` into the `subscribe` effect.
- Ensure subscribe doesn't attach until history load completes (the existing `historyReady()` gate already handles this).

### 3. Track pagination state in the store
`src/features/messaging-next/conversation.state.ts`

Add two fields:
```ts
oldestLoadedKey: string | null;
hasMoreHistory: boolean;
loadingOlder: boolean;
```

Reset in `resetConversation` / `startConversation`.

### 4. Add `loadOlder` action
`src/features/messaging-next/conversation.actions.ts`

```ts
async function loadOlder(repository: MessageRepository) {
  if (state.loadingOlder || !state.hasMoreHistory || !state.conversationId) return;
  if (!state.oldestLoadedKey) return;
  setState('loadingOlder', true);
  const older = await repository.loadMessages(state.conversationId, {
    before: state.oldestLoadedKey,
    limit: RECENT_MESSAGES_WINDOW,
  });
  if (older.length < RECENT_MESSAGES_WINDOW) setState('hasMoreHistory', false);
  if (older.length > 0) setState('oldestLoadedKey', older[0].messageId);
  actions.mergeLoadedMessages(older.map(envelopeToChatMessage));
  setState('loadingOlder', false);
}
```

Also update `mergeLoadedMessages` (or the initial `loadConversationHistory`) to populate `oldestLoadedKey` and `hasMoreHistory` on first load — if first load returns exactly `RECENT_MESSAGES_WINDOW` rows, assume there might be more; if fewer, set `hasMoreHistory = false`.

### 5. UI trigger
`src/features/messaging-next/ConversationPanel.tsx`

On the messages scroll container, watch `scrollTop`. When near 0 (e.g. < 100px) and `hasMoreHistory && !loadingOlder`, call `loadOlder()`. After loaded, restore scroll position (`scrollHeight` diff) so the user's viewport stays put.

Show a small spinner at the top while loading. Show nothing (or "Start of conversation") when `hasMoreHistory === false`.

## Out of scope

- Listening to older message edits/reactions live. With the tail-only subscribe + pagination, paginated history is loaded but not live-subscribed. Reactions on messages older than the initial load window won't update in real time. `subscribeReactions` (which uses `onChildChanged` on the unbounded parent) currently covers this for cheap — leave it alone unless reactions bandwidth becomes a concern.
- Virtualised list rendering — only relevant if message counts grow huge.
- Caching pages across conversation switches — current pattern clears on switch.

## Verification after merge

- Reload the deployed app, watch `firebase database:profile -d 60 -o profile.json --project vidu-aae11`. Confirm `conversations/{id}/messages` download bytes drop sharply per fresh reload (target: roughly `RECENT_MESSAGES_WINDOW` × avg-msg-size, not full history × N).
- Manually test long-disconnect-then-reconnect: leave a tab open, send N>20 messages from another client, close the laptop lid for 5 min, reopen. The original tab should display all N missed messages, not just the latest 20 with a gap.

## Estimated effort

~80-120 LoC across 5 files (slightly more than pagination alone because of the interface + use-conversation rewiring). One focused phase. No new dependencies, no schema changes.
