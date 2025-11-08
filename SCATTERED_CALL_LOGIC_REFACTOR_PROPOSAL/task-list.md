Task list: incremental refactor to CallController (safe, testable steps)

Guidelines

- KISS: Keep each task minimal. Do not add or preserve redundant code.
- After each task: run tests, run manual scenario (two browsers), and remove redundant code introduced earlier.
- Public API: `CallController` will expose: createCall(opts), answerCall(roomId, opts), hangUp({ emitCancel = true }), cleanupCall({ reason }), getState(), on(event, handler), off(event, handler).

Tasks

1. Create CallController skeleton (thin wrapper)

   - Files: `src/webrtc/call-controller.js`
   - Implement the public API but internally call existing `createCall` and `answerCall` from `webrtc/call-flow.js`.
   - Expose an EventEmitter-style `on/off` and dispatch DOM `remoteHangup` for compatibility.
   - Add basic unit tests that mock `webrtc/call-flow.js` to assert the controller returns the same artifacts.
   - Smoke test: ensure app still makes calls and hangs up.

2. Migrate hangUp/cleanup to CallController (UI wiring)

   - Change `main.js` to call `CallController.hangUp()` for user button and `CallController.cleanupCall()` when remote hangup happens (instead of direct RoomService calls).
   - Smoke test: two browsers: B hangs up → A clears video and returns to lobby (no frozen frame), B saved contact prompt still appears only for B.
   - Remove redundant `cancelCall`/cleanup code from `main.js` once verified.

3. Centralize cancellation & member-left handling

   - Move cancellation listeners and member-left fallback logic into CallController. Ensure it tracks and removes RTDB listeners on cleanup.
   - Ensure idempotent handling (guard flags).
   - Remove similar listeners from `webrtc/call-flow.js` and `main.js` (or make them thin shims to the controller).
   - Tests: simulate cancellation and member-left and ensure only one cleanup path runs and no duplicate leaves/writes.

4. Move offer/answer storage wiring (optional cleanup)

   - Consider moving `createNewRoom`, `saveAnswer` calls into the controller (currently in call-flow). This consolidates all RTDB writes to the controller which orchestrates webrtc utils.
   - Run tests and E2E.

5. Clean up public surface & remove compatibility shims

   - Once controller is fully authoritative and `main.js` is slim, remove DOM CustomEvent dispatches and any leftover duplicated code.
   - Update docs and README.

6. Add UX hook and tests (Option B)

   - Add a small transient toast for "Partner disconnected" in `components/calling/calling-ui.js` or a small `ui/notification` helper. Call from controller event handler when remote hangup occurs.
   - Add a Playwright E2E test to confirm notification appears and remote video cleared.

7. Final polish & remove dead code
   - Remove old call-flow code that is now fully migrated (or keep it minimal if still used by other modules).
   - Run full test suite and lint.

Rollback plan

- Each task is reversible: restore previous branch or revert commit if tests fail.
- Keep changes small per commit.

Estimated timeline

- Tasks 1-2: 1-2 days of work with testing.
- Tasks 3-5: another 1-3 days depending on complexity.
- UX & E2E: 1 day.

Acceptance criteria

- One module (`CallController`) is the single public API for calls.
- No frozen remote video on remote hangup.
- HangUp only called for user-initiated hangups; cleanupCall handles remote events.
- All tests and key E2E scenarios pass.
