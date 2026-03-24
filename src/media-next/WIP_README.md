# Media Next WIP

This directory is an isolated design and prototyping area for a replacement media module.

## Current decisions

- Keep the new work separate from active production code.
- Use a separate lab entrypoint for interactive testing.
- Keep the core module UI-agnostic.
- Split source contracts into `PlayableSource` and `StreamSource`.
- Keep playback and live stream as separate domains with similar app-facing shapes.
- Treat MediaBunny as an implementation detail behind adapters, not a public contract.

## Intended boundaries

- `schemas/`: zod contracts and normalization helpers
- `playback/`: load and control playable media
- `live-stream/`: manage camera, microphone, screen, and audio-share streams
- `convert/`: compatibility analysis and derivative generation
- `storage/`: file, OPFS, blob, and persistence concerns
- `sync/`: shared playback synchronization built on top of playback
- `lab/`: minimal development-only harness

## Rules for this branch

- Do not retrofit the old media architecture.
- Do not add UI concerns to the core module.
- Do not leak MediaBunny-specific types out of adapters.
- Prefer schema-first contracts over informal object shapes.
- Keep the first implementation minimal and reversible.

## Immediate next steps

1. Clarify the source, state, event, and action contracts.
2. Decide which top-level facade, if any, the app should consume.
3. Define compatibility and conversion policies.
4. Decide the storage boundary and lifecycle rules.
5. Only then implement real playback and live stream behavior.
