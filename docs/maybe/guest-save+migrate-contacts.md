# Guest Contact Save + Migrate to RTDB on Login

## Status: idea / not started

## NOTE: Storage / Controller layer refactor is WIP so exact implementation is likely to change

## Context

- `contacts-store.js` already has localStorage branches for save/delete/get
- Only gap: `updateLastInteraction` is a no-op for guests (line 86)
- `handleHangUp` in controller currently gates guests out — remove that guard
- `startListeningForSavedRooms` guest branch already reads `localStorage['contacts']`

## Implementation (4 changes)

### 1. Enable guest save prompt

Remove auth guard in `contacts-controller.js:handleHangUp` (lines 22-23).

### 2. Fix `updateLastInteraction` for guests

In `contacts-store.js`, add localStorage branch:

```js
if (!loggedInUid) {
  const obj = JSON.parse(localStorage.getItem('contacts') || '{}');
  if (obj[contactId]) {
    obj[contactId].lastInteractionAt = Date.now();
    localStorage.setItem('contacts', JSON.stringify(obj));
  }
  return;
}
```

### 3. Migrate guest contacts on login

In auth state change handler (after Firebase Auth confirms sign-in):

```js
const raw = localStorage.getItem('contacts');
if (raw) {
  const guestContacts = JSON.parse(raw);
  for (const [id, c] of Object.entries(guestContacts)) {
    await contactsStore.saveContact(id, c.contactName, c.roomId); // writes to RTDB (user is now logged in)
  }
  localStorage.removeItem('contacts');
}
```

Best place: `auth-state.js` `setUser()` or the `onAuthStateChanged` callback.

### 4. Clear stale guest listeners on login

`startListeningForSavedRooms` is called after auth resolves, so if migration (step 3) runs before it, the guest localStorage is already cleared. No extra cleanup needed — just ensure migration runs before `startListeningForSavedRooms`.

## Risk

- Guest IDs are ephemeral (48h TTL) — contacts saved as guest reference those IDs as contactId keys. After migration, the partner's roomId still works but the contactId key in RTDB will be the old guest UUID of the partner, not their Firebase UID. This is fine if they always had a roomId, but deterministic room ID generation would use the wrong ID pair. Mitigation: always store explicit roomId on save (already done).
