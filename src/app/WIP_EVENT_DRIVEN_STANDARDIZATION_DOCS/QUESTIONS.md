## Decisions needed - Consider converting to clearly defined rules once answered (and remove from here if done)

- Should `appBus` be reserved for cross-module coordination, not normal same-module control flow?
- Should UI code emit through a single wrapper like `dispatchUIEvent()` instead of importing `appBus` directly?
- When should code call a service directly instead of emitting an event?
- Should write-success compatibility events remain module-owned, or move to a more centralized pattern later?
- Should listener setup live beside the module that owns the event names, or in top-level composition code only?
- ~~How should async listener failures be handled consistently?~~ **Resolved** — `emitAsync()` added to EventEmitter. Dispatch site decides: `emit()` for fire-and-forget (sync errors only), `emitAsync()` for awaiting completion with async error logging. `on()` unchanged. See `EMIT_ASYNC_FUTURE.md` for deferred extensions.
- Should event naming distinguish user intent events from post-write state change events?

## Context Notes

- `appBus` is currently used for both user-intent events like `call:init` and compatibility/state events like `room:id:created` and `contact:updated`.
- `emit()` catches sync listener errors. `emitAsync()` catches both sync and async errors via `Promise.allSettled`.
- `contacts-service.js` uses `emitAsync()` for post-write events (`contact:updated`, `room:id:created`, etc.).
- `contacts/listeners.js` subscribes via `on()` — async errors from service methods are handled by the service's own try/catch; listener-side errors are handled by `emitAsync`.
- `dispatchUIEvent()` is a very thin wrapper over `appBus.emit()`, while some modules still import `appBus` directly.
- The storage-layer placement decision should wait until these boundaries are clearer.
