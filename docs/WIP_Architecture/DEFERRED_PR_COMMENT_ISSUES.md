# Deferred PR Comment Issues

Temporary log of real issues surfaced in PR review that were intentionally **not** fixed before merge. Each PR gets its own dated section. Delete entries once addressed in a follow-up.

Scope: real issues only. Stale / already-fixed review comments do not belong here.

---

## PR #477 — SolidJS contacts list PoC (2026-04-18)

Link: https://github.com/KristinnRoach/HangVidU/pull/477

- **Unread badge initial hydration.** `src/setup/setupAppRoot.js:27` seeds rows at `unreadCount: 0`. `cmd:messaging:conversation:unread-count-listen` doesn't emit an initial snapshot, so pre-existing unread counts only surface after the next `evt:messaging:conversation:unread-count-changed`. Fix: have the listen command publish current count, or read it synchronously in `addUnreadListener`.
- **Mount rollback on render failure.** `src/mount-app.jsx:28-29` runs `setupAppRoot()` before `render()`. If `render()` throws, the bridges stay wired because nothing calls `teardownAppRoot`. Wrap in try/catch and tear down on failure.
- **Multi-subscription mock limitation.** `src/components/contacts/ContactsList.test.jsx:30` mock stores one handler per event name; second contact overwrites the first, so the unread-bridge test can't cover multiple conversations. Change mock to a list of handlers.
- **Skipped unread-badge DOM test.** `reflects unread count via the messaging event bridge` — store update passes in isolation but DOM badge query returns undefined in same microtask. Likely jsdom scheduler interaction. Marked `it.skip`.
- **Defensive payload destructuring.** `src/setup/setupContactsAppBusHandlers.js:31` — `handleCommand('cmd:contacts:contact:edit', async ({ contactId }) => …)` throws if payload is undefined. Default to `{}`.
- **`initialName` normalization.** `src/components/contacts/SaveContactNameDialog.jsx:9` calls `.trim()` on a signal whose initial value comes from props — throws if non-string. Coerce to string before use.
