## App-wide EDA Contract

`src/events/index.js` is the public cross-module event API.

Use:

- `dispatchCommand(name, payload)`
  - another module is being asked to do something
  - command names should use imperative verbs
  - example: `messaging:conversation:select`

- `dispatchCommandAndAwait(name, payload)`
  - same as `dispatchCommand`, but waits for the handler to complete
  - use when the caller must know the command finished before proceeding

- `dispatchCommandAndAwaitSequential(commands)`
  - send multiple commands in strict order, awaiting each handler to complete before moving to the next
  - `commands` is an array of `[commandName, payload]` tuples

- `handleCommand(name, handler, options?)`
  - register the single responsible handler for a command
  - returns an `unsubscribe` function to manually clean up the listener
  - accepts an optional `options.signal` (`AbortSignal`) to auto-unsubscribe

- `publish(name, payload)`
  - announce a fact, outcome, or state change that already happened
  - event names should be factual or past-tense
  - examples:
    - `messaging:conversation:selected`
    - `messaging:conversation:unread-count:changed`
    - `room:joinOrCreate:failed`

- `publishAndAwait(name, payload)`
  - publish an event and wait for all subscribers to complete
  - use only when the publisher truly needs confirmation that listeners completed
  - reserved for side effects that must happen before the caller proceeds

- `publishAndAwaitSequential(events)`
  - publish multiple events in strict order, awaiting all listeners for each event before moving to the next
  - `events` is an array of `[eventName, payload]` tuples

- `subscribe(name, handler, options?)`
  - react to events published/broadcasted/announced from other modules
  - returns an `unsubscribe` function to manually clean up the listener
  - accepts an optional `options.signal` (`AbortSignal`) to auto-unsubscribe

Rules:

- Do not import `appBus` outside `src/events/`
- Commands ask for work; published events announce facts
- Prefer one clear command handler per command name
- If async bus behavior is needed, add it to `src/events/index.js` instead of importing `appBus` directly

Contacts -> messaging example:

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
