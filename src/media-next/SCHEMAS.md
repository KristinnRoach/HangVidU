# Media Next Schemas

This document defines the first contract layer for `src/media-next/`.

Keep this doc aligned with [source-schema.js](./schemas/source-schema.js). Update both in the same session when source contracts change.

## Scope

For now, this doc only covers source schemas:

- `PlayableSource`
- `StreamSource`

State, events, and public API contracts should get their own focused docs when they become concrete enough.

## Design rules

- Schemas should describe stable domain contracts, not implementation details.
- Schemas should be minimal: only fields required for core behavior or policy decisions belong here.
- Runtime instances such as `File`, `Blob`, `MediaStream`, and MediaBunny objects do not belong in these base source schemas.
- Source schemas identify and describe a source; controllers and adapters resolve them into runtime behavior.
- If a field can be derived reliably from another field, do not add it yet.

## Shared rules

All source contracts should:

- have a stable `id`
- use a discriminant `kind`
- use human-readable `label`
- declare `mediaType`
- carry `mimeType` only when known
- carry `codecHints` only when known
- use small, explicit enums for current supported variants

## PlayableSource

Purpose: identify something that can be loaded by the playback domain.

Current required fields:

- `id`
- `kind = "playable"`
- `label`
- `origin`
- `mediaType`
- `mimeType`
- `codecHints`
- `playableType`
- `handle`

Current `mediaType` variants:

- `video`
- `audio`
- `av`

Current `playableType` variants:

- `file`
- `blob-url`
- `sw-url`
- `remote-url`

Current handle rules:

- `remote-url`, `blob-url`, and `sw-url` require `handle.url`
- `file` requires at least one file-oriented identifier:
  `handle.fileId` or `handle.fileName`

## StreamSource

Purpose: identify a live capture source managed by the live-stream domain.

Current required fields:

- `id`
- `kind = "stream"`
- `label`
- `origin = "capture"`
- `mediaType`
- `mimeType`
- `codecHints`
- `streamType`
- `handle`

Current `streamType` variants:

- `camera`
- `microphone`
- `screen`
- `system-audio`

Current handle rules:

- `handle.trackIds` defaults to an empty array
- `handle.streamId` is optional descriptive metadata for now

Suggested current `mediaType` usage:

- `camera` -> `video`
- `microphone` -> `audio`
- `screen` -> `video` or `av`
- `system-audio` -> `audio`

## Extension policy

When adding fields:

- prefer extending `handle` before widening the top-level object
- add only fields with clear ownership and immediate use
- document invariants here when adding validation rules
- update sample data in the lab if the contract changes

## Known omissions

These are intentionally not defined yet:

- resolved runtime objects
- playback state
- live-stream state
- event payloads
- compatibility reports
- conversion plans and results
