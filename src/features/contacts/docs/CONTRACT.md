## Contacts Contract

- `contacts-service.js`
  - owns writes
  - owns backend selection
  - publishes cross-module contact facts when writes succeed
  - owns contact-module policy helpers

- `contacts-query.js`
  - owns read/query helpers built on storage
  - no writes
  - no appBus
  - no backend selection

- Current split
  - service: `saveContact`, `updateContact`, `deleteContact`, `updateLastInteraction`, `handleHangUp`
  - query: `getAllContacts`, `getAllContactsSorted`, `getContactByMostRecentInteraction`, `getContactByRoomId`

- Published facts
  - `evt:room:id:created`
  - `evt:room:id:updated`
  - `evt:contacts:contact:deleted`

- Storage boundary
  - both depend on `contacts/storage/*`
  - storage stays generic
  - contact-specific read helpers stay above storage
