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

- Canonical format (4-part): `<kind>:<domain>:<entity>:<action>`
- `kind` is `cmd` or `evt`
- Recommended regex: `^(cmd|evt):[a-z][a-z0-9-]*:[a-z][a-z0-9-]*:[a-z][a-z0-9-]*$`
- For commands, `domain` is the target domain that owns the handler.
- For events, `domain` is the domain the fact is about, not the module that published it.
- See [DOMAINS.md](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/src/shared/events/DOMAINS.md) for the current domain inventory.
- Command names: imperative verb phrases.
- Event names: facts/outcomes (typically past tense).

Examples:

- Command: `cmd:messaging:conversation:select`
- Events:
  - `evt:messaging:conversation:selected`
  - `evt:messaging:conversation:unread-count-changed`
  - `evt:room:lifecycle:join-or-create-failed`

## Example (Contacts -> Messaging)

```js
dispatchCommand('cmd:messaging:conversation:select', {
  conversationId,
  remoteParticipantIds: [contactId],
  displayUI: true,
});
```

```js
handleCommand('cmd:messaging:conversation:select', async (payload) => {
  await messagingController.selectConversation(payload.conversationId, {
    remoteParticipantIds: payload.remoteParticipantIds,
    displayUI: payload.displayUI,
  });
});
```

```js
publish('evt:messaging:conversation:unread-count-changed', {
  conversationId,
  unreadCount,
  newlyReadMsgIds,
});
```

```js
subscribe(
  'evt:messaging:conversation:unread-count-changed',
  ({ conversationId }) => {
    // update badge
  },
);
```
