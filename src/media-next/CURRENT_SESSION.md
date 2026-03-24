# Current Session

## Goal

Implement the first real end-to-end lab slice for `media-next`:

- load a `PlayableSource` with `playableType: "remote-url"` into a real `<video>` element
- control it through the new playback controller
- start and stop a real camera preview through the new live-stream controller
- surface the resulting runtime state in the media lab UI

## Task list

- [x] define and commit source schemas
- [x] define and commit runtime state
- [x] update session workflow docs to require commit checkpoints after each distinct phase
- [x] add minimal playback runtime for HTML video playback from `PlayableSource`
- [x] add minimal live-stream runtime for camera preview from `StreamSource`
- [x] update `media-lab` UI to manually test both flows
- [x] validate the flow in the lab and document manual test steps
- [ ] commit the implementation phase

## Constraints

- keep implementation minimal
- do not touch production media code
- keep controllers UI-agnostic
- do not leak runtime objects into source or state schemas
- avoid speculative abstractions

## Decisions to review

- If simple DOM runtimes for playback and camera preview prove stable, they may deserve an `ADAPTERS.md` doc later.
- The current goal does not define a session-level aggregate controller yet; keep playback and live-stream separate for now.
- Playback state now listens to real video-element events for metrics and failure reporting; decide later whether that belongs in a formal adapter contract.

## Manual verification

Use `media-lab.html` in the local Vite dev server.

### Playback

1. Open the media lab page.
2. Leave the default remote MP4 URL or enter another direct video URL.
3. Click `Load`.
4. Confirm the playback state moves to `ready` and `duration` is populated.
5. Click `Play`.
6. Confirm the video plays and playback state moves to `playing`.
7. Click `Pause` and `Stop`.
8. Confirm the playback state updates accordingly.

### Camera preview

1. Click `Start camera`.
2. If the browser prompts for permission, allow camera access.
3. Confirm the preview appears in the camera video element.
4. Confirm live-stream state moves to `active` with a non-zero `trackCount`.
5. Click `Stop camera`.
6. Confirm the preview stops and live-stream state returns to `idle`.

## Validation notes

- Production build passes via `pnpm build`.
- Remote playback was verified in a real browser against the media lab page.
- Automated camera verification is limited by browser permission handling, but failure state is now surfaced instead of silently hanging.
