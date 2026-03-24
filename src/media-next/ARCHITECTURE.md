# Media Next Architecture

This directory is an isolated design and prototyping area for a replacement media module.

Start each session with [SESSION_GUIDE.md](./SESSION_GUIDE.md).

## Purpose

- design and validate a replacement media module in isolation
- avoid contaminating the production architecture while contracts are still unstable
- establish clear boundaries before migration work begins

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

## Documentation structure

This file is the top-level architecture hub for `src/media-next/`.

Focused docs should be created as concepts become concrete enough to deserve their own source of truth. Do not create them preemptively. Create them in the same session that introduces or substantially refines the relevant concept, and keep them updated alongside code changes.

Likely focused docs include:

- `SCHEMAS.md`
- `PUBLIC_API.md`
- `STATE.md`
- `EVENTS.md`
- `ADAPTERS.md`
- `STORAGE.md`
- `CONVERSION.md`
- `MIGRATION.md`

When a focused doc exists:

- link it from this file
- keep it internally consistent with the current implementation
- update it in the same commit or session when the concept changes materially
- use repo-relative Markdown links only

Runtime and adapter rule:

- if a runtime acquires browser resources, it must release them on both `destroy()` and startup-failure paths

## Current linked docs

- [SESSION_GUIDE.md](./SESSION_GUIDE.md)
- [SCHEMAS.md](./SCHEMAS.md)
- [STATE.md](./STATE.md)
- [ROADMAP.md](./ROADMAP.md)
- [WIP_DIAGRAM.md](./WIP_DIAGRAM.md)

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
