# Messaging Next Handoff

This folder is the replacement path for the legacy messaging core. The legacy messaging implementation is still live and gated behind the feature flag `__msgnext`.

## Feature flag

```js
// Enable
localStorage.setItem('__msgnext', '1');
location.reload();
// Disable
localStorage.removeItem('__msgnext');
location.reload();
```

When enabled: legacy `initMessagesUI()` is skipped, the legacy `cmd:messaging:conversation:select` handler is skipped, `MainContent` registers the Solid messaging-next command adapter, and `<ConversationPanel>` is rendered from Solid selection state.

---

## WIP — 2026-05-16

### Known issues / remaining work

**Runtime composition / drafts**

- `messaging-runtime.ts` now composes the RTDB `MessageRepository` and
  `ConversationRepository` for the feature-flagged panel.
- Runtime drafts are per-user and per-conversation in localStorage, then mirrored
  into in-memory Solid state while the panel is open.
- Drafts are not written to RTDB. The unsafe shared conversation-node draft
  field and repository methods were removed after they leaked one participant's
  unsent text to the other participant.
- `TODO.md` tracks the follow-up privacy/security review for localStorage draft
  persistence.

**Layout**

- `.panel` uses `height: calc(100dvh - 40px)` — self-contained but tied to the `40px` top-bar constant. When the test nav in `MainContent` is replaced with a real tab bar, update this to subtract the tab bar height too. The long-term fix is to establish a proper flex height chain through `.main-wrapper → main → .relative-wrapper → #lobby → .stretch-height wrapper` so `.panel` can use `height: 100%`. The `94%` on `.relative-wrapper` is a known leftover hack.
- `.lobby-fill` / `.stretch-height` utility is in `lobby.css`. The messaging wrapper div in `MainContent` uses `stretch-height` for `align-self: stretch` (overrides `#lobby`'s `align-items: center`). Works for now.

**Selection / history loading**

- Conversation selection is owned by `MainContent` as Solid state. Contact rows call an `onOpenConversation` callback instead of dispatching the messaging command directly.
- `ConversationPanel` receives the selected conversation and authenticated user id as props. It no longer registers `cmd:messaging:conversation:select`.
- Initial message history is loaded with a Solid `createResource`; loaded history is merged without incrementing unread counts, then live message/reaction subscriptions start.
- Scroll-to-end still uses `suppressScroll` plus one `queueMicrotask(scrollToEnd)` after resource load. Verify manually after the layout fix lands.

**RTDB subscription replay**

- `onChildAdded` replays all historical messages when first attached. `receiveMessage` deduplicates by ID, so no double rendering. But the replay callbacks still fire after `loadMessages` resolves, potentially causing unnecessary work. Low priority — add `afterKey` cursor to `MessageRepository.subscribe()` when this becomes a performance concern.

**Conversation IDs**

- Direct conversation IDs currently use `{sortedUserA}_{sortedUserB}` via the
  existing `resolveDirectConversationId()` helper.
- Group conversation IDs use generated `group:{generatedId}` values.
- Do not introduce another direct ID format without a deliberate migration plan.

**Conversation repository**

- `ConversationRepository` is defined in `interfaces.ts` for conversation-node
  metadata: kind, participants, title, delivery policy, and timestamps.
- `adapters/in-memory-conversations.ts` is the first functional adapter and is
  covered by focused tests.
- `adapters/rtdb.ts` includes an RTDB conversation metadata adapter. Runtime
  draft persistence deliberately uses local drafts instead.

**RTDB adapter shape**

- `adapters/rtdb.ts` uses the `MessageEnvelope` repository contract but
  translates to/from the existing RTDB row shape
  `{ from, fromName, text, type, sentAt, read }`.
- This is for feature-flag testing against current data, not a final canonical
  persistence model.

**`evt:call:session:unanswered`**

- `setupMainAppBusListeners` still routes this to `messagingController.sendEventMessage()` even when the flag is on. It won't break but the event won't appear in the new panel. Wire it through `ConversationPanel`'s actions when ready.

**Reactions**

- State shape (`ReactionMap`) and `updateReactions` action exist. UI not implemented. `subscribeReactions` in the RTDB adapter is wired. Nothing renders reactions yet.

**Unread counts**

- `unreadCount` tracked in state but not propagated to `ContactEntry`'s badge. The legacy controller still drives unread counts for the contacts list.

**Private mode**

- Interfaces defined (`PrivateSessionSignaling`, `CallChannelBridge`). Not implemented.

**Group chat**

- Schema supports `group:` IDs. No runtime support yet.

---

## Stable context (pre-WIP)

Current scope:

- `schema.ts` defines direct and group conversation IDs, conversation nodes,
  delivery policy, and first-pass message envelopes.
- `interfaces.ts` defines `ConversationRepository`, `MessageRepository`,
  private transport, private signaling, and call-channel bridge boundaries.
- `adapters/in-memory-conversations.ts` provides the initial functional
  conversation repository adapter.
- `types.ts` exports Zod-inferred TypeScript types.
- `schema.test.js` covers the agreed schema rules.
- `messaging-core-design.html` is the editable design artifact for core rules.

Important context:

- Direct conversation IDs currently use `{sortedUserA}_{sortedUserB}`.
- Group conversation IDs use `group:{generatedId}`.
- Drafts live on conversation nodes, not in the sent message stream.
- Every message envelope carries `conversationId` and `delivery`.
- First-pass payloads are `text`, `event`, and `system`; file payloads are not
  part of the contract yet.
- `evt:call:session:unanswered` represents an unanswered or missed call timeline
  event and may include `details.callId`.

Before committing changes in this folder, check whether
`messaging-core-design.html` or any of the related docs need to be updated to stay accurate. Ask the user questions rather than guessing if the design is unclear.

Related docs:

- [NEXT.md](./NEXT.md) - suggested next slice.
- [QUESTIONS.md](./QUESTIONS.md) - unanswered design questions.
- [DECISIONS.md](./DECISIONS.md) - stable decisions and target public API.
