## Contacts Contract

- `contacts-service.js`
  - owns writes
  - owns backend selection
  - hydrates contacts state from storage
  - publishes cross-module contact facts when writes succeed
  - owns contact-module policy helpers

- `contacts-state.js`
  - owns synchronous read getters
  - publishes `evt:contacts:state:changed`
  - mirrors the current contacts snapshot for cross-module reads

- Current split
  - service: `saveContact`, `updateContact`, `deleteContact`, `updateLastInteraction`, `handleHangUp`, `ensureContactsHydrated`, `hydrateContactsState`
  - state: `getAllContacts`, `getContactById`, `getContactByRoomId`, `getConversationId`, `getAllContactsSorted`, `getContactByMostRecentInteraction`, `getIsHydrated`

- Published facts
  - `evt:contacts:room:created`
  - `evt:contacts:room:updated`
  - `evt:contacts:contact:deleted`

- Storage boundary
  - service depends on `contacts/storage/*`
  - storage stays generic
  - external reads go through contacts state, not storage
