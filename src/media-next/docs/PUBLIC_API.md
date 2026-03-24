# Media Next Public API

This document defines the minimal app-facing public API for `src/media-next/`.

Keep this doc aligned with:

- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [SCHEMAS.md](./SCHEMAS.md)
- [STATE.md](./STATE.md)
- [REQUIREMENTS.md](./REQUIREMENTS.md)

This is a draft for the smallest stable surface we want HangVidU to integrate against first.

## Design goals

- keep the top-level API small and easy to understand
- keep the core module UI-agnostic
- expose domain concepts, not browser or library internals
- make playback and capture available behind one coherent facade
- keep validation utilities public and implementation adapters private

## Public exports

The minimal public exports should be:

- `createMediaModule`
- `parseSource`
- `parsePlayableSource`
- `parseStreamSource`
- `parsePlayerState`
- `parseLiveStreamState`

Non-goal for now:

- do not make DOM runtimes part of the primary public API
- do not expose MediaBunny-specific helpers publicly
- do not expose raw `MediaStream`, `File`, `Blob`, or element references in public state

## Main export

Working proposal:

```js
import {
  createMediaModule,
  parsePlayableSource,
  parseStreamSource,
} from '@/media-next';

const media = createMediaModule();
```

`createMediaModule()` returns a small facade with two stable domains:

- `player`
- `capture`

and one lifecycle method:

- `destroy()`

## `media.player`

Purpose: app-facing playback control for a single active playable source.

Minimal shape:

```js
const media = createMediaModule();

media.player.getState();
media.player.subscribe((state) => {});
await media.player.load(source);
await media.player.play();
media.player.pause();
media.player.stop();
```

Required behavior:

- manages exactly one active playable source at a time
- exposes only `PlayerState` snapshots publicly
- accepts only validated `PlayableSource` input
- treats unsupported source kinds or runtime failures as explicit errors
- owns no UI logic

Notes:

- `load(source)` accepts a `PlayableSource` and moves the player into `loading`
- `play()` and `pause()` control the current loaded source
- `stop()` releases the current playback session and returns to `idle`
- `subscribe(listener)` emits full state snapshots, not patches

## `media.capture`

Purpose: app-facing control for local capture primitives needed by HangVidU.

Minimal shape:

```js
const media = createMediaModule();

media.capture.getState('camera');
media.capture.subscribe((kind, state) => {});
await media.capture.start('camera');
await media.capture.start('microphone');
await media.capture.start('screen');
media.capture.stop('camera');
media.capture.stopAll();
```

Current supported kinds:

- `camera`
- `microphone`
- `screen`
- `system-audio` is reserved but not required for the first stable API

Required behavior:

- each capture kind has its own `LiveStreamState`
- `start(kind)` acquires or replaces that capture source
- `stop(kind)` releases browser resources for that capture kind
- `stopAll()` releases all capture resources owned by the module
- failures surface as explicit `error` state with user-relevant messages

Notes:

- the public API should expose capture by domain kind, not by DOM element
- the public API may return the validated `StreamSource` from `start(kind)`, but state remains the main read model
- preview attachment belongs to adapters, not this top-level contract

## Public state contract

Public state reads should remain small, serializable snapshots:

- player state uses `PlayerState`
- capture state uses `LiveStreamState`

Current rule:

- `getState()` returns snapshots, not mutable internal references
- `subscribe()` emits snapshots, not event objects
- source metadata lives in source contracts, not runtime state

## Public utils

The schema parse helpers stay public because they support:

- app-side validation before calling the module
- adapter validation at internal boundaries
- test fixtures and migration scaffolding

Public utils should stay minimal:

- parse and normalize known contracts
- avoid adding convenience helpers until HangVidU actually needs them

## Deferred from the minimal public API

These are intentionally not part of the first stable app-facing surface:

- composition/session orchestration
- sync/watch-together APIs
- conversion APIs
- storage APIs
- DOM binding helpers
- event buses or action dispatch systems
- direct adapter construction APIs

## Open design questions

These need explicit decisions before the public API is final:

1. Should the top-level export be `createMediaModule()` or a more playback-centered name such as `createMediaPlayer()`?
2. Should `capture.subscribe()` emit `(kind, state)` or one aggregate capture-state object?
3. Should `start(kind)` return only state changes, or also return the validated `StreamSource`?
4. Should preview attachment stay fully internal, or do we want a small public adapter-registration API later?
