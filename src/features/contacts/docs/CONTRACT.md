## Contacts Contract

- `src/stores/contactsStore.ts`
  - owns contacts writes
  - owns backend selection
  - hydrates contacts state from storage
  - exposes app-facing read APIs for contacts state

- `src/features/contacts/*`
  - owns contacts workflows and UI
  - imports contacts state through `stores/contactsStore`
  - does not import persistence directly

- Current split
  - writes: `saveContact`, `updateContact`, `deleteContact`, `handleHangUp`
  - reads: `getAllContacts`, `getContactById`, `getContactByRoomId`, `getContactsIsHydrated`
  - per-conversation activity (sort key + unread badge) comes from `MessageRepository.watchConversationActivity`, not the contacts store
  - lifecycle: `hydrateContacts`, `resetContacts`

- Storage boundary
  - `stores/contactsStore` depends on `storage/contacts`
  - contacts feature code depends on `stores`
  - external reads go through contacts store APIs, not storage
