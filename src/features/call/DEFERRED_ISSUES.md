# Deferred Call Module Issues

These issues are intentionally deferred from PR #488 because they belong to the
broader `src/features/call/` refactor, not the minimal Solid dialog migration.

## Incoming Call Flow

- `src/features/call/components/incoming-call.js` still owns imperative
  resolver bookkeeping (`activeIncomingCallResolvers`) to bridge the old call
  workflow into the new Solid dialog host.
- `src/features/call/room-listeners.js` still owns the real incoming-call
  decision flow via an ad hoc `new Promise(...)` wrapper around UI callbacks and
  RTDB listeners.
- During the refactor, move incoming-call visibility and dismiss/update state
  into a small Solid-owned store or controller, and keep async call orchestration
  in the workflow layer rather than the UI adapter.

## Outgoing Call Flow

- `src/features/call/components/outgoing-call.js` still mixes UI entry points
  with non-UI behavior:
  - timeout ownership
  - ringtone lifecycle
  - RTDB outgoing-call state writes/clears
  - fallback room cancellation / leave-room cleanup
  - diagnostic lifecycle logging
- During the refactor, split these concerns so the Solid dialog stays dumb and a
  separate call workflow/controller owns side effects and timing.

## Dialog Host Shape

- `src/components/AppDialogHost.jsx` currently exposes imperative show/dismiss
  functions for call dialogs as a compatibility layer.
- Revisit whether call dialogs should stay inside the shared app dialog host or
  move to a dedicated call-ui state module once the call feature is untangled.
