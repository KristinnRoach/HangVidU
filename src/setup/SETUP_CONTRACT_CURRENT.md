# Setup Contract (Current Pattern)

This is the contract for current `setupX()` modules.

Scope:

- applies to setup modules in `src/setup/` that own app bootstrap/runtime wiring
- does not yet require EventEmitter-only listener wiring (that is tracked separately)

## Required Contract

1. Function shape
- each module exposes `setupX(options?)`
- returns `Promise<cleanupFn>`

2. Module state
- module-scoped names:
  - `isReady` (`boolean`)
  - `initPromise` (`Promise<cleanupFn> | null`)
  - `cleanup` (`() => void`)

3. Idempotency + single-flight
- if `isReady` is `true`, return existing `cleanup`
- if `initPromise` exists, return `initPromise`
- otherwise run setup once and set `initPromise` until completion

4. Ownership rule
- who creates/registers a resource owns its disposal
- setup module must own teardown for all listeners/subscriptions/timers it starts

5. Cleanup semantics
- cleanup must be safe if called more than once
- cleanup should not throw; guard/log per-step failures when needed
- cleanup should reset `isReady = false`

6. Failure semantics
- on setup failure:
  - release partial resources owned by the module
  - reset readiness state
  - rethrow (or call explicitly documented failure callback at orchestrator level)

## Allowed Implementation Styles

Use whichever is supported by the API, but preserve a single cleanup return:

- `AbortController` + `{ signal }` listener registration
- explicit disposer functions returned by helpers
- mixed model when integrations are heterogeneous

## Composition Rule (`setupApp`)

- `setupApp` composes setup modules via returned cleanup functions only
- it should not require module internals or global side-effect cleanup APIs

## Review Checklist

- Does `setupX()` return one cleanup function?
- Are `isReady/initPromise/cleanup` used consistently?
- Are all resources started in setup cleaned by setup-owned cleanup?
- Is retry behavior deterministic after failure?
- Is cleanup order safe (typically reverse-order for composed teardown)?
