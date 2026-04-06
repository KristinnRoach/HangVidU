## Events Contract

`src/events/index.js` is the public cross-module event API.

Use:

- `dispatchCommand(name, payload)`
  - another module is being asked to do something
  - command names should use imperative verbs
  - example: `messaging:conversation:select`

- `handleCommand(name, handler)`
  - register the single responsible handler for a command

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

- `subscribe(name, handler)`
  - react to events published/broadcasted/announced from other modules

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
