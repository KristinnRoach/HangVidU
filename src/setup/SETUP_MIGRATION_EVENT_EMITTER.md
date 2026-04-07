# Setup Migration to EventEmitter [TODO]

TODO: Define the migration guide from the current setup pattern to EventEmitter-based listener wiring.

Intended purpose:

- provide a low-risk migration path for existing `setupX()` modules
- map current listener/disposer patterns to EventEmitter + `AbortController`
- define incremental rollout steps, validation checks, and rollback strategy
- minimize refactor churn by keeping external `setupX()` contracts stable during migration
