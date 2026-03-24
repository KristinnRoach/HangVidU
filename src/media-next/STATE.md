# Media Next State

This document defines the first runtime state layer for `src/media-next/`.

Keep this doc aligned with:

- [state-schema.js](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/src/media-next/schemas/state-schema.js)
- [playback/index.js](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/src/media-next/playback/index.js)
- [live-stream/index.js](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/src/media-next/live-stream/index.js)

## Scope

For now, this doc only covers:

- `PlaybackState`
- `LiveStreamState`

This is intentionally the minimum UI-facing runtime state needed for the lab and core controllers.

## Design rules

- State should describe current runtime status, not source metadata.
- State should be serializable and inspectable.
- State should expose what the UI can depend on directly.
- State should not contain raw runtime objects such as `File`, `Blob`, `MediaStream`, DOM nodes, or adapter instances.
- State should reference sources by `currentSourceId`, not embed full source objects.

## PlaybackState

Purpose: represent the current runtime status of the playback domain.

Current fields:

- `status`
- `currentSourceId`
- `isPlaying`
- `currentTime`
- `duration`
- `error`

Current `status` variants:

- `idle`
- `loading`
- `ready`
- `playing`
- `paused`
- `error`

Rules:

- `currentSourceId` is `null` when nothing is loaded
- `loading` means a source has been accepted but playback metadata is not ready yet
- `duration` is nullable because it may be unknown before metadata loads
- `error` is nullable and should only contain user-relevant failure text
- `isPlaying` is explicit instead of being derived only from `status`

## LiveStreamState

Purpose: represent the current runtime status of the live-stream domain.

Current fields:

- `status`
- `currentSourceId`
- `trackCount`
- `error`

Current `status` variants:

- `idle`
- `attached`
- `active`
- `error`

Rules:

- `currentSourceId` is `null` when nothing is attached
- `trackCount` is numeric and defaults to `0`
- `error` is nullable and should only contain user-relevant failure text

## Source versus state

Use source schemas for:

- identity
- origin
- source type
- stable descriptive metadata

Use state schemas for:

- current runtime status
- selected source reference
- current progress or position
- active track counts
- current user-visible error state

## Known omissions

These are intentionally not defined yet:

- session-level aggregate state
- syncing state
- buffering state
- compatibility status
- conversion progress
- mute, pause, and track enablement detail
