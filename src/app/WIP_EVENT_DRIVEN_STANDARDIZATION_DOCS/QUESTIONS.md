## Decisions needed - Consider converting to clearly defined rules once answered (and remove from here if done)

- Should `appBus` be reserved for cross-module coordination, not normal same-module control flow?
- Should UI code emit through a single wrapper like `dispatchUIEvent()` instead of importing `appBus` directly?
- When should code call a service directly instead of emitting an event?
- Should write-success compatibility events remain module-owned, or move to a more centralized pattern later?
- Should listener setup live beside the module that owns the event names, or in top-level composition code only?
- How should async listener failures be handled consistently?
- Should event naming distinguish user intent events from post-write state change events?

## Context Notes

- `appBus` is currently used for both user-intent events like `call:init` and compatibility/state events like `room:id:created` and `contact:updated`.
- `EventEmitter.emit()` catches sync listener errors internally, but async listener failures are not surfaced by the emitter itself.
- `dispatchUIEvent()` is a very thin wrapper over `appBus.emit()`, while some modules still import `appBus` directly.
- `contacts/listeners.js` currently uses fire-and-forget async service calls from event handlers, and the ownership of async error handling is still unresolved.
- The storage-layer placement decision should wait until these boundaries are clearer.
