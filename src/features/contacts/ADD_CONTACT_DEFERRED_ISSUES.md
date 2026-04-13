# Add Contact — Deferred Issues

From PR #465 review comments. None are merge-blocking.

## Error handling

- **PERMISSION_DENIED string matching** — Duplicate-invite detection uses `err.message.includes('PERMISSION_DENIED')` which is brittle. Should check `err.code` or do a read-before-write. Existing TODO in code.
- **Centralize duplicate-invite handling** — The PERMISSION_DENIED mapping only exists in the manual email path. Bulk invite and per-contact invite paths surface generic errors for the same condition. Should live in `sendInvite` or a shared wrapper.
- **findUserByEmail null ambiguity** — Returns `null` for both "not found" and "lookup failed", so a network error can trigger the email-compose fallback for an already-registered user. Needs explicit result types.

## URL construction

- **APP_ORIGIN trailing slash** — If `VITE_APP_URL` has a trailing slash, referral links get `//`. Affects `add-contact-modal.js` and `call-flow.js`. Should normalize or use `new URL()`.

## Tests

- **Stale test selectors** — Modal restructure moved share-invite from `[data-platform="share"]` to `#share-invite-btn` and status from `#import-status` to `#manual-email-status`. Tests in `add-contact-modal.test.js` need updating. Mock for `user-discovery` also needs `findUserByEmail`.
