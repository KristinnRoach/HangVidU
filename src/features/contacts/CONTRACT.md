## Contacts Contract

- `contacts-service.js`
  - owns writes
  - owns backend selection
  - emits contact-domain events on `contactsBus`
  - owns contact-module policy helpers

- `contacts-bus.js`
  - owns contact-module event names
  - carries module-local contact lifecycle events
  - no app-level compatibility knowledge

- `setupContactsAppBusBridge.js`
  - decides which contact-domain events get forwarded to `appBus`
  - owns app-level compatibility mapping for contacts

- `contacts-query.js`
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
