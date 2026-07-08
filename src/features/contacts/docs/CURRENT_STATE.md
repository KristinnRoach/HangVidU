## Contacts Current State

- Contact connect/request writes currently go through `stores/user-profile-store`.

- `stores/contacts-store` is currently the hydrated contacts read model. It also
  handles small contact metadata updates such as `updateContact()` and
  `handleHangUp()`.

- Conversation-list state (sort key and unread badge) comes from
  `stores/conversation/conversation-list-state`, not the contacts store.
