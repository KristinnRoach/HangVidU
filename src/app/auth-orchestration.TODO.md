# auth-orchestration.js (`wireAuthReactions`) — pending Option A decomposition

> Renamed from `setupAuth.js` / `setupAuth()` to remove the name collision with
> the `auth/auth-setup.js` module. This file is app-level cross-feature wiring,
> not the auth module.

`auth-orchestration.js` was relocated wholesale from `src/setup/` into
`src/app/` as the last step of eliminating `src/setup/`. It is the only
remaining cross-feature orchestrator in the codebase. The intent is to push each
subscription down into the feature that owns the reaction, so this file goes
away too.

## Why it still lives here

The other former `setup/*` files were pure single-feature wrappers (PWA, notifications, push, presence, contacts) and moved cleanly. This one subscribes to auth lifecycle events and triggers reactions across four different features. Splitting it is a bigger refactor than mechanical relocation, so it was deferred to keep the cleanup pass tight.

## Target shape (Option A)

Each feature subscribes to the auth events it cares about from its own `setup()`. `main.tsx` orders setups so subscribers register before `initAuth()` fires.

### Subscription → new owner

| Current subscription | Reaction | New owner |
|---|---|---|
| `evt:auth:session:ready` → `hydrateContacts()` | contacts hydration | `features/contacts/index.ts` `setup()` |
| `evt:auth:session:logged-in` → `processReferral()`, `hydrateContacts()`, `setupInviteListener()` | contacts + referrals + invites | `features/contacts/index.ts` `setup()` (invites are a sub-feature; fold for now) |
| `evt:auth:session:logged-in` → `getLoggedInUserProfile()` (hydrates D1 profile, ensures handle, syncs discovery) | user profile write | `stores/userProfileStore.ts` `setup()` |
| `evt:auth:session:logged-out` → contact request listener cleanup, `resetContacts()` | contacts teardown | `features/contacts/index.ts` `setup()` |
| `evt:auth:session:logged-out` → `clearLocalStorageOnLogout()` | auth-level housekeeping | `auth/index.ts` `setup()` |
| `await initAuth()` (last) | kicks off auth lifecycle | `auth/index.ts` `setup()`, after subscribe registration |

### main.tsx ordering after split

```ts
cleanups.push(await setupNotifications());
cleanups.push(await setupPresence());
cleanups.push(await setupPushNotifications());
cleanups.push(await setupContacts());      // registers auth subscribers
cleanups.push(await setupUserProfile());   // registers auth subscriber
cleanups.push(await setupAuth());          // logout housekeeping + initAuth() LAST
cleanups.push(await setupPWA());
initPushNotifications().catch(...);
```

Auth must be last among auth-touching setups so `initAuth()` fires its initial
events after all subscribers are registered.

### Decisions worth keeping in mind

1. **`captureReferral()` vs `processReferral()`** — `setupContacts` calls `captureReferral` on anonymous boot (URL → localStorage). `setupAuth` logged-in handler calls `processReferral` (apply captured referral now that we have a user). Both are kept after the split — capture in `setup()` body, process in logged-in handler.

2. **`inviteCleanup` lifecycle** — today there are two layers: per-login-scope (replaced on each new login) and outer (on full teardown). Preserve both in the new contacts `setup()`: module-level `inviteCleanup` mutates on login; outer cleanup runs the latest `inviteCleanup` and aborts subscribers.

3. **`LOCAL_STORAGE_KEYS_TO_PRESERVE_ON_LOGOUT = ['locale']` + `_PREFIXES = ['debug:']`** — these mix auth concern (housekeeping) with feature concerns (i18n owns `locale`). Lives in `auth/` for now. If i18n later wants to own its own preservation list, expose a registry. Out of scope for the split.

4. **Test split** — current `app/__tests__/auth-orchestration.test.js` tests cross-cutting orchestration end-to-end. Replace with three smaller tests:
   - `auth/__tests__/setup.test.js` — logout localStorage clearing + initAuth ordering
   - extend `features/contacts/__tests__/setup.test.js` — auth event subscriptions
   - new `stores/__tests__/userProfileStore.setup.test.js` — logged-in writes

## Known non-blocking observations (do not fix in isolation)

These are visible while reading `auth-orchestration.js`. None are blocking. Capture them so the rewrite addresses them deliberately.

- `getLoggedInUserProfile()` is still fire-and-forget from the logged-in handler. The profile store owns the D1 writes now, including stale-session guards. When extracting profile setup, keep that ownership in `userProfileStore` rather than reintroducing profile writes into auth orchestration.
- Logout sequence: invite cleanup → `clearLocalStorageOnLogout()` → `resetContacts()`. `localStorage.clear()` wipes the guest-mode `'contacts'` key as a side effect; intentional today but a coupling worth documenting after the split.
- All three handlers swallow errors to `console.warn`. Masks bugs in tests where the handler silently fails but the assertion still passes. After the split, prefer surfacing or at least incrementing a counter.

## Why this is safe to defer

- No correctness bug in the current implementation. It is the same code that was running in `src/setup/`, only relocated.
- Existing test coverage at `app/__tests__/auth-orchestration.test.js` exercises each handler and the localStorage preservation list.
- No external caller of `src/setup/` survives — `setupAuth` is imported only from `main.tsx`.
- The split has medium blast radius (auth, contacts, user profile, plus tests). Worth doing as a focused pass, not bundled with other work.
