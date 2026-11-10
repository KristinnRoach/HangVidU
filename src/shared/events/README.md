# App events API

Use [index.js](index.js) for app-wide facts and existing bus commands. Direct
function calls are the default for actions; see [AGENTS.md](../../../AGENTS.md).
The generic emitter lives in [src/lib/event-emitter](../../lib/event-emitter/README.md).
Do not import the private `appBus` or create another app-wide bus.

- `publish(name, payload)` / `subscribe(name, handler, options?)`: announce and observe facts.
- `publishAndAwait` / `publishAndAwaitSequential`: await fact listeners when completion is needed.
- `dispatchCommand` / `handleCommand`: existing single-owner command paths.
- `dispatchCommandAndAwait` returns the one handler's result and rejects on handler failure.
- `dispatchCommandAndAwaitSequential` executes commands in order.

Commands require exactly one handler; missing or duplicate handlers throw.
Use an abort signal or the returned unsubscribe function to release subscriptions.
Keep bus commands for flows that need them, not wrappers around normal imports.

Names have four parts: `<cmd|evt>:<domain>:<entity>:<action>`, enforced by
[naming.js](naming.js) and the local lint rule. Command domains name the owner;
event domains name the fact. Use `app-notifications` for in-app UI and `push` for
web-push delivery. Search existing call sites for vocabulary rather than maintaining
a second inventory of names.

For example, calls and conversations publish sent-message/invite facts; `src/push`
subscribes to deliver notifications without those features importing delivery code.
