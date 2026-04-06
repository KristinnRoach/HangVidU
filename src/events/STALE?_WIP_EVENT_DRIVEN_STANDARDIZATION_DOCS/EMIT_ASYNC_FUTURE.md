# emitAsync — future extensions (parked)

These were evaluated and deferred when adding `emitAsync()`. None have a current use case.
Revisit when a concrete caller needs them — each is a small addition at that point.

## Sequential mode (`options.mode = 'sequential'`)

Run listeners one-at-a-time in registration order instead of concurrently.

**When to consider**: If a listener depends on a previous listener's side effects completing first (e.g., write-then-read ordering). Currently all listeners are independent.

## throwOnError (`options.throwOnError`)

Collect all rejections into an `AggregateError` and throw instead of logging.

**When to consider**: If a caller needs to act on failure (show UI error, retry, rollback). Currently all callers just want errors logged.

## Return settled results

Return `PromiseSettledResult[]` so callers can inspect individual outcomes.

**When to consider**: If a caller needs to know which specific listener failed or extract return values. Creates a contract to maintain — don't add speculatively.

## AbortSignal (`options.signal`)

Abort before dispatch starts.

**When to consider**: Probably never inside the emitter. Aborting before emit is a one-liner the caller already controls: `if (signal.aborted) return`.
