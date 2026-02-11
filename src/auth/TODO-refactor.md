# Auth Module Refactor

Goal: split auth.js (~600 lines, 5 concerns) into focused files with a barrel export.

## Done

### Immutable auth-state (auth-state.js)
- `snapshot()` helper returns defensive copy (spreads both state and user)
- `getAuthState()`, `getUser()`, and all subscriber calls use `snapshot()`
- Primitives-only accessors (`getIsLoggedIn`, `getUserId`, etc.) unchanged — already immutable

### Side effects decoupled from onAuthStateChanged
- `initializePresence()` — now self-subscribes in presence.js (no longer exported)
- `saveUserProfile()` — now self-subscribes in profile.js (no longer exported)
- `registerUserInDirectory()` — now self-subscribes in user-discovery.js
- DOM dataset + uiState — now a `subscribe()` call in auth.js
- `clearGISTokenCache()` — stays in onAuthStateChanged (auth-internal)
- All tests updated and passing (253 tests, 32 files)

## Remaining: file split

### Target structure
```
auth/
  index.js           — barrel re-exports (public API)
  auth-state.js      — state + accessors (done)
  auth-setup.js      — Firebase init, persistence, onAuthStateChanged, authReady
  auth-actions.js    — signIn, signOut, deleteAccount
  gis-tokens.js      — GIS token cache, requestContactsAccess, requestGmailSendAccess
  onetap.js          — already separate
  guest-user.js      — already separate
```

iOS Safari workarounds (detectIOSStandalone, openInSafariExternal, safariExternalOpenArmed)
stay in auth-actions.js since they're only used by signIn error handling.

### Decisions needed

1. **deleteAccount accesses `auth.currentUser` directly.** Options:
   - (a) Export the `auth` instance from auth-setup.js, import in auth-actions.js
   - (b) Refactor deleteAccount to accept user as parameter

2. **onetap.js <-> auth.js circular import** (onetap imports `auth` + `setSafariExternalOpenArmed`,
   auth imports `initOneTap` + `showOneTapSignin`). Works today because calls are deferred.
   After split: onetap.js would import from auth-setup.js (for `auth`) and auth-actions.js
   (for armed state). Verify no eager-evaluation issues.

### No blockers

- `authReady` only imported by main.js — just update one import path
- `clearGISTokenCache` is internal to auth.js — moves cleanly to gis-tokens.js
- No circular deps between side-effect modules and auth-state
- 4 files import from auth.js, 15 from auth-state.js — manageable migration
