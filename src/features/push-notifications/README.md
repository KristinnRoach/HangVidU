# Push Notifications

Public app entrypoint:

- import from [index.js](./index.js) only

Supported app-facing operations:

- `registerCurrentClient()`
- `unregisterCurrentClient()`
- `ensureEnabledIfGranted()`
- `requestPermission()`
- `sendIncomingCall({ targetUserId, roomId, callerId, callerName, notificationId? })`
- `sendMissedCall({ targetUserId, roomId, callerId, callerName, notificationId? })`

Current ownership contract:

- app code decides when a call event should trigger push
- backend functions own subscription persistence, request validation, and fan-out delivery
- service worker code under [sw](./sw) owns native notification display and click routing
- message push delivery is backend-driven in V1, not app-driven

Extension rules:

- keep push/system notifications separate from in-app UI notifications
- add new notification kinds through the shared/backend/service-worker path together, not by adding ad hoc client APIs
- keep [index.js](./index.js) as the only public import boundary
- avoid introducing debug-only endpoints or window globals into the production path
