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
    debug-identity-client.js
    navigation-message-client.js
    __tests__/

  push-notifications/sw/
    push-event-handler.js
    notification-click-handler.js
    notification-presentation.js
    service-worker-message-handler.js

  pwa/sw/
    workbox-runtime.js
    navigation-runtime.js

  sw.js

functions/
  index.js
  push-notifications/
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

`src/push-notifications/debug-identity-client.js`

- temporary debug identity sync only
- should remain isolated so it can be removed easily later

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
- notification presentation
- notification click handling
- push-related message handling

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
2. create `src/push-notifications/` with a single public barrel
3. reduce `src/sw.js` to a thin composition entrypoint
4. split backend notification logic under `functions/push-notifications/`
5. update imports so app code depends only on the stable public barrel
6. remove or rename old paths only after the new structure is in place and tests are green

## Acceptance Criteria

- one clear public push import boundary for app code
- no mixed responsibilities across push, in-app UI, service worker runtime, and backend wiring
- canonical schemas are pure and easy to test
- the structure makes it obvious where APN/FCM adapters would plug in later
- rollback remains easy by returning to the pre-refactor checkpoint branch state
