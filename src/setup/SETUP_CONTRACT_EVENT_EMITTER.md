# Setup Contract (EventEmitter + AbortController) [TODO]

TODO: Define the target contract for setup modules that use the app's EventEmitter pattern.

Intended purpose:

- lock a single listener-wiring contract when setup modules migrate to EventEmitter
- enforce: if using emitter listeners, use the project EventEmitter class and `AbortController`
- document how emitter subscriptions bind to `signal` and teardown
- keep compatibility with current `setupX()` external contract (`Promise<cleanupFn>`)
