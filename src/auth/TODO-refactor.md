# Auth Module Refactor

Goal: split auth.js (~600 lines, 5 concerns) into focused files with a barrel export.

## Target structure

```
auth/
  index.js           — barrel re-exports (public API)
  auth-state.js      — state + accessors (already done)
  auth-setup.js      — Firebase init, persistence, onAuthStateChanged, authReady
  auth-actions.js    — signIn, signOut, deleteAccount
  gis-tokens.js      — GIS token cache, requestContactsAccess, requestGmailSendAccess
  onetap.js          — already separate
  guest-user.js      — already separate
```

iOS Safari workarounds (detectIOSStandalone, openInSafariExternal, safariExternalOpenArmed)
stay in auth-actions.js since they're only used by signIn error handling.

## Side effects to decouple

The `onAuthStateChanged` callback in auth.js currently calls:
- `initializePresence()` — move to presence.js subscribing to auth-state
- `saveUserProfile()` — move to profile.js subscribing to auth-state
- `registerUserInDirectory()` — move to user-discovery.js subscribing to auth-state
- `document.body.dataset.loggedIn` + `uiState.setView()` — move to a UI subscriber

None of these modules import from auth.js, so no circular dep risk.

## Decisions needed

1. **deleteAccount accesses `auth.currentUser` directly.** Options:
   - (a) Export the `auth` instance from auth-setup.js, import in auth-actions.js
   - (b) Refactor deleteAccount to accept user as parameter

2. **onetap.js ↔ auth.js circular import** (onetap imports `auth` + `setSafariExternalOpenArmed`,
   auth imports `initOneTap` + `showOneTapSignin`). Works today because calls are deferred.
   After split: onetap.js would import from auth-setup.js (for `auth`) and auth-actions.js
   (for armed state). Verify no eager-evaluation issues.

## No blockers

- `authReady` only imported by main.js — just update one import path
- `clearGISTokenCache` is internal to auth.js — moves cleanly to gis-tokens.js
- No circular deps between side-effect modules and auth-state
- 4 files import from auth.js, 15 from auth-state.js — manageable migration
