# Media Next Requirements

This document defines the minimal requirements for the first stable `media-next` module.

Keep this doc aligned with:

- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [PUBLIC_API.md](./PUBLIC_API.md)
- [ROADMAP.md](./ROADMAP.md)

This requirement set is HangVidU-first. The module should still be reusable elsewhere, but only HangVidU needs must shape the first stable version.

## Primary goal

Provide a stable, maintainable, UI-agnostic media module with:

- one small app-facing facade
- clear domain boundaries
- explicit validated contracts
- simple incremental integration into HangVidU

## In scope for the first stable version

The first stable version must support:

1. Playable media
   - load one playable source at a time
   - play, pause, and stop it
   - expose explicit player state

2. Local capture primitives
   - start and stop camera capture
   - start and stop microphone capture
   - start and stop screen capture
   - expose explicit per-kind capture state

3. Contract validation
   - validate public source inputs
   - validate public state shapes
   - keep contracts schema-first and serializable

4. Predictable lifecycle
   - release acquired browser resources on stop, destroy, and startup failure
   - surface user-relevant errors explicitly
   - avoid hidden global state

5. Incremental HangVidU integration
   - fit behind a small facade that can be adopted feature-by-feature
   - avoid forcing a large rewrite of legacy media code up front

## Must-have boundary rules

The module must:

- keep core logic separate from DOM and browser-device runtimes
- keep playback and capture as separate internal domains
- avoid leaking MediaBunny-specific types into the public API
- avoid exposing mutable internal state directly
- avoid mixing source metadata into runtime state

## HangVidU-specific minimum needs

For HangVidU, the first stable API must be good enough for:

- watch-style playback of a selected media source
- local preview and acquisition of camera, microphone, and screen share
- explicit UI state rendering driven by subscriptions
- progressive migration from the current `src/media/` module

The first stable API does not need to solve every future media scenario yet.

## Non-functional requirements

The module must be:

- easy to integrate
- easy to reason about
- easy to test in isolation
- easy to extend without breaking the top-level API
- explicit about failure states and ownership of resources

## Out of scope for the first stable version

These are intentionally deferred:

- shared session/composition orchestration
- watch synchronization protocols
- conversion planning and derived media generation
- persistent media storage management
- background transcoding workflows
- public DOM helper APIs
- a broad “utility kitchen sink”

## Acceptance criteria for the minimal core

We should consider the minimal core ready only when:

1. The app can integrate through the documented top-level facade without importing internal runtimes.
2. The module can represent playback and capture state entirely through documented public contracts.
3. Playback and capture lifecycles are covered by automated tests for the agreed contract.
4. Browser-resource cleanup rules are documented and verified.
5. The first migration seam into HangVidU is identified and narrow enough to implement incrementally.

## Current assumptions in this draft

This draft assumes:

- one top-level facade is better than many loosely related exports
- playback and capture both belong in the first stable module
- schema parse helpers remain public
- adapters remain internal until their contract is explicitly documented

## Decisions still required

These decisions are still open and block a final public API:

1. Whether the top-level product concept is “module”, “player”, or something else.
2. Whether capture state is exposed per kind or as one aggregate object.
3. Whether audio-only playback is required in the first stable HangVidU-facing release.
4. Whether system-audio capture is required in the first stable HangVidU-facing release.
5. Which legacy HangVidU integration seam should be the first real adopter.
