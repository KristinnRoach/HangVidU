# Boundary Rollout Status

## Current default run

Command: `pnpm lint:boundaries`

Snapshot: `2026-04-15`

Status: failing (`13` errors)

### Currently active rules (in default mode)

#### Auth

- `auth -> auth | shared`

#### App

- no `app` boundary rule is currently configured

#### Setup

- `setup -> setup | auth | feature(*) | shared`

#### Shared:

- `shared -> shared`

TODO REMOVE:

- `shared -> feature(watch|notifications)`

#### Features:

- `feature(contacts) -> feature(contacts) | auth | shared`
- `feature(push-notifications) -> feature(push-notifications) | auth | shared`
- `feature(messaging) -> feature(messaging) | auth | shared`
- `feature(call) -> feature(call) | auth | shared`

TODO Add:

- `For each feature(x): feature(x) -> feature(x) | auth | shared`

## Full hotspot scan

Command: `BOUNDARIES_ENFORCE_ALL=1 pnpm lint:boundaries`

Snapshot: `2026-04-15`

Total failures: `16`

### Failure categories

- `feature -> feature`: `13`
- `shared -> feature`: `3`
- `auth -> feature`: `0`
- `setup/*` failures: `0`

### `feature -> feature` by importing feature

- `call`: `10`
- `notifications`: `1`
- `watch`: `2`

### Current failing files

- `src/features/call/WIP-start-call-refactor.js` (3)
- `src/features/call/call-controller.js` (3)
- `src/features/call/call-event-wiring.js` (3)
- `src/features/call/room-listeners.js` (2)
- `src/features/notifications/components/enable-notifications-prompt.js` (1)
- `src/features/watch/watch-file-handler.js` (1)
- `src/features/watch/watch-sync.js` (1)
- `src/shared/media/WIP-init-local-media.js` (1)
- `src/shared/media/audio-input-recovery.js` (1)
- `src/shared/pwa/update-handlers.js` (1)
