Summary: Refactor plan to consolidate scattered call logic into a single, minimal controller

Goal

Create a single, tiny, well-tested controller that is the canonical public API for call lifecycle in the app. The controller centralizes orchestration (offer/answer, member management, cancellations, cleanup), delegates storage to RoomService and low-level WebRTC plumbing to the existing webrtc/\* utilities, and emits events for the UI.

Why now

Call state and actions are currently scattered across `main.js`, `webrtc/call-flow.js`, `room.js` (RoomService), and components. That causes duplication, race conditions, and makes reasoning, testing and evolving behavior harder. A small controller removes duplication and provides a single place to harden race handling.

Design principles (KISS)

- Single public API: one small module (CallController) exposing create, answer, hangUp, cleanup, getState, on/off.
- Minimal surface area: only what's needed by the UI. No extra complexity or premature optimization.
- Composition, not merging responsibilities: keep `RoomService` as the RTDB/storage layer; keep `webrtc/*` as low-level helpers. CallController composes them.
- No duplicate state: controller is the single source of truth for call state; remove redundant globals in `main.js` as tasks complete.
- Idempotent actions: all lifecycle operations are safe to call multiple times.
- Event-first: controller emits events for UI instead of the UI querying internals.

Safety & migration approach

- Incremental, low-risk steps: implement a thin CallController wrapper first that delegates to existing `webrtc/call-flow.js` functions. Add tests and switch `main.js` to call the new API for one path (e.g., hangUp). Verify behavior.
- Gradually move listener ownership and cleanup into the controller in steps — do not simultaneously refactor multiple modules.
- Leave `RoomService` unchanged; do not add PC/DOM responsibilities to it.
- Keep backwards-compatible event dispatch (DOM CustomEvent) only during transition; remove after migration.

Success criteria

- One small module (`src/webrtc/call-controller.js`) provides a clean public API.
- `main.js` uses the new API for hang up and cleanup flows and no longer contains duplicated cleanup logic (once migrated for that flow).
- Remote hangup/cancellation no longer causes frozen video frames; behavior is idempotent.
- Tests (unit + one E2E) exist for the new edge: remote cancellation triggers cleanup without prompting to save contact and without writing cancel back.

Risks & mitigations

- Risk: subtle timing changes. Mitigate by running the existing E2E suite + focused Playwright test for the hangup flow.
- Risk: circular imports. Mitigate by strict dependency direction: UI -> CallController -> (RoomService, webrtc utils).

Next steps

See task list for a small, ordered plan that we can run and verify after each task.
