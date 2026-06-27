## Contacts Current State

- Contact connect/request writes currently go through `stores/userDirectoryStore`.

- `stores/contactsStore` is currently the hydrated contacts read model. It also
  handles small contact metadata updates such as `updateContact()` and
  `handleHangUp()`.

- Conversation-list activity (sort key and unread badge) comes from
  `stores/conversation-activity`, not the contacts store.
