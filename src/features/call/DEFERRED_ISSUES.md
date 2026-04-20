# Deferred Call Module Issues

These issues are intentionally deferred from PR #488 because they belong to the
broader `src/features/call/` refactor, not the minimal Solid dialog migration.

## Incoming Call Flow

- `src/features/call/room-listeners.js` still owns the real incoming-call
  decision flow via an ad hoc `new Promise(...)` wrapper around dialog-bus
  callbacks and RTDB listeners.
- During the refactor, move incoming-call visibility and dismiss/update state
  into a small Solid-owned store or controller, and keep async call orchestration
  in the workflow layer rather than `room-listeners.js`.

## Outgoing Call Flow

- `src/features/call/outgoing-call-session.js` still mixes dialog entry points
  with non-UI behavior:
  - timeout ownership
  - ringtone lifecycle
  - RTDB outgoing-call state writes/clears
  - fallback room cancellation / leave-room cleanup
  - diagnostic lifecycle logging
- During the refactor, split these concerns so the Solid dialog stays dumb and a
  separate call workflow/controller owns side effects and timing.

## Dialog Host Shape

- `src/components/DialogProvider.jsx` now owns dialog rendering and command
  handlers for call dialogs.
- Revisit whether call dialogs should stay inside the shared dialog provider or
  move to a dedicated call-ui state module once the call feature is untangled.
