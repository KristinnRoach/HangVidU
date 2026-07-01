# auth-orchestration.js (`wireAuthReactions`) — pending Option A decomposition

> App-level cross-feature wiring, not the auth module. Distinct from
> `auth/auth-setup.js` despite the historical name overlap. `main.tsx` calls
> `wireAuthReactions()` (last, after other setups) to register auth-lifecycle
> listeners and then kick off `initAuth()`.

`auth-orchestration.js` is the only remaining cross-feature orchestrator. The
intent is to push each subscription down into the feature that owns the
reaction, so this file goes away.

## Why it still lives here

It subscribes to auth lifecycle events and triggers reactions across several
features (contacts, referrals, invites, conversations, localStorage
housekeeping). Splitting it is a real refactor, deferred to keep the cleanup
pass tight.

## Target shape (Option A)

Each feature subscribes to the auth events it cares about from its own `setup()`.
`main.tsx` orders setups so subscribers register before `initAuth()` fires.

### Subscriptions still living in `wireAuthReactions` → intended owner

| Current subscription | Reaction | Intended owner |
|---|---|---|
| `evt:auth:session:ready` → `hydrateContacts()` | contacts hydration | `features/contacts` `setup()` |
| `evt:auth:session:logged-in` → `processReferral()`, `hydrateContacts()`, `setupInviteListener()` | contacts + referrals + invites | `features/contacts` `setup()` (invites are a sub-feature; fold for now) |
| `evt:auth:session:logged-out` → invite cleanup, `stopConversationActivity()`, `resetContacts()`, `resetConversationsState()` | contacts + conversations teardown | `features/contacts` + conversations `setup()` |
| `evt:auth:session:logged-out` → `clearLocalStorageOnLogout()` | auth-level housekeeping | `auth/` `setup()` |
| `await initAuth()` (last) | kicks off auth lifecycle | `auth/` `setup()`, after subscribe registration |

**Already migrated — do NOT re-add to the plan:** user-profile sync. As of the
current code, `userProfileStore.ts` (`setupLoggedInUserProfileSync`, runs at
module import) owns its own `logged-in`/`logged-out` subscriptions and
loads/clears the profile itself. The `getLoggedInUserProfile()` call still sitting
in `auth-orchestration.js`'s logged-in handler is therefore a **redundant
duplicate load** — delete it (either now, or as part of the split); do not
"extract" it, the store already owns it.

### main.tsx ordering after the split (illustrative)

```ts
cleanups.push(await setupNotifications());
cleanups.push(await setupPresence());
cleanups.push(await setupPushNotifications());
cleanups.push(await setupContacts());   // registers contacts/referral/invite auth subscribers
cleanups.push(await setupAuth());        // logout housekeeping + initAuth() LAST
cleanups.push(await setupPWA());
```

Auth setup must be last among auth-touching setups so `initAuth()` fires its
initial events after all subscribers are registered. (`auth/` exposes no
`setup()` today — creating one is part of this work; the file is `auth/index.js`.)

### Decisions worth keeping in mind

1. **`captureReferral()` vs `processReferral()`** — `setupContacts` calls `captureReferral` on anonymous boot (URL → localStorage). The logged-in handler calls `processReferral` (apply captured referral now that we have a user). Both kept after the split — capture in `setup()` body, process in logged-in handler.

2. **`inviteCleanup` lifecycle** — two layers today: per-login-scope (replaced on each new login) and outer (on full teardown). Preserve both in the new contacts `setup()`.

3. **`LOCAL_STORAGE_KEYS_TO_PRESERVE_ON_LOGOUT = ['locale']` + `_PREFIXES = ['debug:']`** — mixes auth housekeeping with an i18n concern (`locale`). Lives in `auth/` for now; expose a registry if i18n later wants to own its preservation list. Out of scope for the split.

4. **Test split** — `app/__tests__/auth-orchestration.test.js` currently tests the orchestration end-to-end. When the split lands, replace it with feature-local tests (contacts subscriptions, auth logout/init ordering). Profile no longer needs an orchestration test — it's covered by `userProfileStore`'s own tests.

## Known non-blocking observations

- Logout sequence: invite cleanup → `stopConversationActivity()` → `clearLocalStorageOnLogout()`, then `resetContacts()` + `resetConversationsState()`. `localStorage.clear()` wipes the guest-mode `'contacts'` key as a side effect — intentional today, worth documenting after the split.
- All handlers swallow errors to `console.warn`, which can mask failures in tests. After the split, prefer surfacing (or at least counting) them.

## Why this is safe to defer

- No known correctness bug in the current implementation.
- `app/__tests__/auth-orchestration.test.js` exercises each handler and the localStorage preservation list.
- `wireAuthReactions` is imported only from `main.tsx`.
- Medium blast radius (auth, contacts, user profile, conversations, plus tests) — do it as a focused pass, not bundled with other work.
