# App reload gate

Coordinates app-initiated reloads with work that should not be interrupted.
The module stores a count of active holds: reloads are allowed when it is zero.
It has no call-specific or Solid dependencies and does not reload the page itself.

Current uses:

- The call handshake holds the gate during incoming/outgoing calls and while
  the P2P session is not idle, releasing it when the call ends or on cleanup.
- PWA updates wait for the gate before reloading; the PWA wrapper also deduplicates
  pending reload requests.
- AppLogo disables its reload button while the gate is held and checks it again
  on click. Blocked clicks are discarded, not queued.

## API

Import from `@shared/app-reload`.

| Function                 | Behavior                                                                       |
| ------------------------ | ------------------------------------------------------------------------------ |
| `holdAppReload()`        | Adds a hold and returns an idempotent release function.                        |
| `getAppReloadAllowed()`  | Returns whether there are no active holds.                                     |
| `whenAppReloadAllowed()` | Resolves immediately if allowed, otherwise waits until all holds are released. |

Always release a hold when the work finishes, including errors and component
cleanup. Independent operations can each hold the gate.

```ts
const release = holdAppReload();
try {
  await workThatMustFinish();
} finally {
  release();
}
```

For UI updates, subscribe through `@shared/events` to
`evt:app-reload:state:changed` and re-read `getAppReloadAllowed()`. The event
contains `{ state, prev }`, each with a `blockerCount`; unsubscribe on cleanup.

This is a cooperative gate: callers must check or wait for it. It does not
prevent browser refresh, closing the app, or direct calls to `location.reload()`.
Waiting is a readiness signal, not a lock; it does not reserve permission against
new holds or provide cancellation.
