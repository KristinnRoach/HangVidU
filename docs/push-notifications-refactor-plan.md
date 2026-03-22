# Push Notifications Refactor Plan

## Summary

This refactor should make the push notification system easier to reason about, easier to test, and safer to extend without mixing concerns.

The key design goals are:

- a stable, minimal public push API
- strict separation from in-app UI notifications
- explicit ownership boundaries
- no overlapping file responsibilities
- low side effects for easy testing and maintenance
- a straightforward future path for additional delivery adapters such as APN or FCM without creating redundant public APIs

## Current Status

Current active refactor branch:

- `codex/push-notifications-refactor`

Known-good checkpoint branch:

- `codex/notifications-phase-1`

Current refactor checkpoint:

- `faedde6` - `Refactor backend push notification modules`

Already completed and verified:

- shared push contracts were introduced under [shared/push-notifications](/shared/push-notifications)
- a new public app barrel was introduced at [index.js](/src/push-notifications/index.js)
- the app-facing push facade now lives at [push-notifications.js](/src/push-notifications/push-notifications.js)
- compatibility shims remain in the old `src/notifications/*` paths
- the first refactor slice was redeployed and manually tested successfully
- targeted notification tests passed after that refactor slice
- `src/sw.js` was reduced to a thin push wiring entrypoint
- push-specific service-worker logic now lives under [src/push-notifications/sw](/src/push-notifications/sw)
- missed-call notification taps now route to caller context first instead of dropping into the empty-room share-link path
- backend push logic now lives under [functions/push-notifications](/functions/push-notifications), with [index.js](/functions/index.js) reduced to export wiring
- the backend push modules now have minimal inline JSDoc plus a minimal [README.md](/functions/README.md) for orientation
- the service worker now suppresses native notification display when a push arrives while the app already has a visible focused window client
- sensitive sender-side and service-worker push diagnostics were removed from production success paths
- backend delivery still uses one hard-coded `TTL: 60` across notification kinds, which remains a prod-readiness policy gap

Immediate next implementation slices:

1. continue migrating app imports and responsibilities toward the new structure
2. decide the final TTL policy per notification kind
3. remove or dev-gate the remaining temporary debug push hooks
4. revisit the legacy ownership fallback only if that slice includes a deliberate migration or cleanup decision
5. add regression coverage once the remaining structure churn settles

## Stable Public API

The stable app-facing boundary should be push-specific so it is never confused with in-app notifications.

Public app code should import only from:

- `src/push-notifications/index.js`

The stable facade should expose:

- `registerCurrentClient()`
- `unregisterCurrentClient()`
- `ensureEnabledIfGranted()`
- `requestPermission()`
- `sendIncomingCall({ targetUserId, roomId, callerId, callerName, notificationId? })`
- `sendMissedCall({ targetUserId, roomId, callerId, callerName, notificationId? })`

It should not expose:

- a generic `sendNotification()` public API
- a client public `sendMessageNotification()` API just for symmetry
- service worker internals
- provider-specific delivery APIs

## Canonical Naming

Canonical notification kinds:

- `incoming_call`
- `missed_call`
- `message`

Compatibility policy:

- legacy `call` is compatibility-only
- legacy `call` must not appear in canonical public APIs, canonical contracts, or long-term docs
- legacy support should be removed as soon as it is safe to do so

## Folder Structure

```text
shared/
  push-notifications/
    index.js
    notification-types.js
    notification-schemas.js
    request-schemas.js
    response-schemas.js
    storage-schemas.js
    service-worker-message-schemas.js

src/
  push-notifications/
    index.js
    push-notifications.js
    permission-client.js
    subscription-client.js
    delivery-client.js
    function-client.js
    navigation-message-client.js
    __tests__/

  push-notifications/sw/
    push-event-handler.js
    notification-click-handler.js
    notification-presentation.js

  pwa/sw/
    workbox-runtime.js
    navigation-runtime.js

  sw.js

functions/
  index.js
  push-notifications/
    auth.js
    config.js
    health-check-handler.js
    web-push-delivery.js
    subscription-ownership-store.js
    notification-payload-builder.js
    register-push-subscription-handler.js
    remove-push-subscription-handler.js
    send-call-notification-handler.js
    send-message-notification-handler.js
```

## File Responsibilities

### Shared contracts

`shared/push-notifications/*`

- pure contracts only
- no browser APIs
- no Firebase APIs
- no transport-specific delivery logic
- the source of truth for canonical and runtime-compatible shapes

### App push system

`src/push-notifications/index.js`

- the only public app import path
- re-exports the stable facade only
- no import-time side effects

`src/push-notifications/push-notifications.js`

- implements the stable public facade
- owns high-level push behavior only
- no in-app UI rendering
- no service worker event code

`src/push-notifications/permission-client.js`

- permission reads and permission requests only

`src/push-notifications/subscription-client.js`

- browser push subscription lifecycle only

`src/push-notifications/delivery-client.js`

- app-side push send operations for explicit outgoing push use cases such as calls

`src/push-notifications/function-client.js`

- authenticated HTTP transport to backend functions only

`src/push-notifications/navigation-message-client.js`

- app-side handling of service worker navigation messages only

### Service worker

`src/sw.js`

- root entrypoint only
- thin composition layer
- the only intentional service-worker import-side-effect file in `src/`

`src/push-notifications/sw/*`

- push-specific service worker behavior only
- parsing incoming push payloads
- suppression of native notification display when an app client is already visible and focused
- notification presentation
- notification click handling

`src/pwa/sw/*`

- non-push service worker runtime behavior only
- Workbox setup
- SPA navigation runtime behavior

### Backend

`functions/index.js`

- export and wiring only
- no business logic beyond connecting Firebase handlers

`functions/push-notifications/*`

- small internal modules split by responsibility
- delivery, payload building, ownership store, and handler entrypoints must stay separate

## Boundary Rules

- in-app UI notifications remain under `src/ui/components/notifications/`
- push/system notifications must not reuse the in-app notification manager as their public API
- app code should import push functionality only from `src/push-notifications/index.js`
- shared contracts may be imported by app internals, backend internals, and tests
- message send ownership remains backend-driven unless intentionally changed later
- call send ownership remains app-driven through the stable push facade
- successful production push paths should not log payload contents, user identity, room IDs, or notification metadata
- delivery policy should be explicit per notification kind, including TTL and urgency, rather than relying on one shared default
- future APN/FCM support should arrive as additional delivery adapters behind the same canonical contracts, not as new public APIs

## Naming Rules

- use kebab-case filenames
- use responsibility-based names
- prefer explicit suffixes:
  - `*-client.js`
  - `*-handler.js`
  - `*-schemas.js`
  - `*-store.js`
  - `*-builder.js`
  - `*-runtime.js`

Avoid ambiguous names such as:

- `controller`
- `manager`
- `utils`
- `helpers`
- `common`

## Migration Notes

The current implementation already works and should be preserved as a rollback point.

Refactor sequence:

1. move shared contracts into `shared/push-notifications/`
   - status: done
2. create `src/push-notifications/` with a single public barrel
   - status: done
3. reduce `src/sw.js` to a thin composition entrypoint
   - status: done
4. split backend notification logic under `functions/push-notifications/`
   - status: done
5. remove remaining legacy `call` compatibility from backend/shared runtime paths
   - status: done
6. update imports so app code depends only on the stable public barrel
   - status: in progress
7. remove or rename old paths only after the new structure is in place and tests are green
   - status: pending

The backend split is now a clean handoff boundary. The next slice can start in a fresh session from this plan plus the handoff doc without needing additional backend extraction context.

## Acceptance Criteria

- one clear public push import boundary for app code
- no mixed responsibilities across push, in-app UI, service worker runtime, and backend wiring
- canonical schemas are pure and easy to test
- the structure makes it obvious where APN/FCM adapters would plug in later
- rollback remains easy by returning to the pre-refactor checkpoint branch state
