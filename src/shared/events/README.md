## App-Wide EDA Contract

`src/shared/events/index.js` is the app-level cross-module API.

The generic emitter primitives now live in:

- `src/lib/event-emitter/`
- module docs: `src/lib/event-emitter/README.md`

Use this `src/shared/events/` layer to define app semantics (`command` vs `event`) and naming contracts. Keep low-level emitter behavior in `src/lib/event-emitter`.

## Public API

- `dispatchCommand(name, payload)`
- `dispatchCommandAndAwait(name, payload)`
- `dispatchCommandAndAwaitSequential(commands)`
- `handleCommand(name, handler, options?)`
- `publish(name, payload)`
- `publishAndAwait(name, payload)`
- `publishAndAwaitSequential(events)`
- `subscribe(name, handler, options?)`

## Rules

- Do not import `appBus` outside `src/shared/events/`.
- Commands ask for work; published events announce facts.
- Commands must have exactly one handler per command name.
- `dispatchCommandAndAwait()` is command-RPC:
  - throws when there is no handler
  - throws when there is more than one handler
  - throws when the handler throws/rejects
  - returns the single handler result
- If async bus behavior is needed, add it to `src/shared/events/index.js` instead of importing `appBus` directly.

## Naming Guidance

- Command names: imperative verb phrases.
- Event names: facts/outcomes (typically past tense).

Examples:

- Command: `messaging:conversation:select`
- Events:
  - `messaging:conversation:selected`
  - `messaging:conversation:unread-count:changed`
  - `room:joinOrCreate:failed`

## Example (Contacts -> Messaging)

```js
dispatchCommand('messaging:conversation:select', {
  conversationId,
  remoteParticipantIds: [contactId],
  displayUI: true,
});
```

```js
handleCommand('messaging:conversation:select', async (payload) => {
  await messagingController.selectConversation(payload.conversationId, {
    remoteParticipantIds: payload.remoteParticipantIds,
    displayUI: payload.displayUI,
  });
});
```

```js
publish('messaging:conversation:unread-count:changed', {
  conversationId,
  unreadCount,
  newlyReadMsgIds,
});
```

```js
subscribe(
  'messaging:conversation:unread-count:changed',
  ({ conversationId }) => {
    // update badge
  },
);
```
