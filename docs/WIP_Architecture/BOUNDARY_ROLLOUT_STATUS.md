# Boundary Rollout Status

## Current default run

Command: `pnpm lint:boundaries`

Status: passing

### Currently active rules (in default mode)

#### Auth: Off

TODO Add:

- auth -> auth
- auth -> shared

#### App: Off

TODO Add:

- app -> app
- app -> auth
- app -> shared
- app -> feature(\*)

#### Setup: Off

TODO Add:

- setup -> setup
- setup -> app
- setup -> auth
- setup -> shared
- setup -> feature(\*)

#### Shared:

- `shared -> shared`

TODO REMOVE:

- `shared -> feature(call|messaging|watch|notifications)`

#### Features:

- `feature(contacts) -> feature(contacts) | auth | shared`

TODO Add:

- `For each feature(x): feature(x) -> feature(x) | auth | shared`

## Full hotspot scan

Command: `BOUNDARIES_ENFORCE_ALL=1 pnpm lint:boundaries`

Snapshot: 2026-04-10

Total failures: `17`

### Failure categories

- `feature -> feature`: `16`
- `feature -> app`: `1`
- `auth -> feature`: `0`
- `setup/*` failures: `0`

### `feature -> feature` by importing feature

- `call`: `10`
- `messaging`: `2`
- `watch`: `2`
- `notifications`: `1`

### Current failing files

- `src/features/call/WIP-start-call-refactor.js` (3)
- `src/features/call/call-controller.js` (3)
- `src/features/call/call-event-wiring.js` (3)
- `src/features/call/room-listeners.js` (2)
- `src/features/messaging/components/messages-ui.js` (1)
- `src/features/messaging/handle-appbus-events.js` (1)
- `src/features/messaging/messaging-controller.js` (1)
- `src/features/notifications/components/enable-notifications-prompt.js` (1)
- `src/features/watch/watch-file-handler.js` (1)
- `src/features/watch/watch-sync.js` (1)
