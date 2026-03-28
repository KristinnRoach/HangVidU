## Contacts Contract

- `contacts-service.js`
  - owns writes
  - owns backend selection
  - owns appBus compatibility events
  - owns contact-module policy helpers

- `contact-query.js`
  - owns read/query helpers built on storage
  - no writes
  - no appBus
  - no backend selection

- Current split
  - service: `saveContact`, `updateContact`, `deleteContact`, `updateLastInteraction`, `handleHangUp`
  - query: `getAllContacts`, `getAllContactsSorted`, `getContactByMostRecentInteraction`, `getContactByRoomId`

- Storage boundary
  - both depend on `contacts/storage/*`
  - storage stays generic
  - contact-specific read helpers stay above storage
