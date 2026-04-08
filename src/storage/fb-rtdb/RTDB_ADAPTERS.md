# RTDB Adapter Usage Rules

This document defines usage rules for Firebase RTDB adapter code across the codebase.

When new RTDB behavior, edge cases, or safe patterns are discovered, add them here and align existing adapters to this standard.

## Core Rule: Transaction Callback Return Values

In `runTransaction(ref, updateFn, options)`, the callback return value has control-flow meaning:

- Returning `undefined` (including bare `return;`) aborts the transaction.
- Returning a value writes that value.

Because of this:

- Do not use `return;` / `undefined` in transaction callbacks as normal branching unless abort is explicitly intended.
- If abort is intended, make it explicit in code comments.

## Required Handling for Uncommitted Transactions

Treat `result.committed === false` as a first-class outcome, not a silent no-op.

Each adapter must define and test one of:

1. Explicit fallback behavior (for example `get -> merge -> set`), or
2. Explicit contract that uncommitted means no write and why.

The chosen behavior must be documented in the adapter module and covered by tests.

## Consistency Requirement

Aim for consistent RTDB adapter semantics throughout the codebase:

- Same input/output contract style (`record | null`, throws vs returns).
- Same transaction edge-case handling expectations.
- Same test coverage for retry, stale/null callback state, and uncommitted paths.

## Test Guidance

At minimum, adapter tests should cover:

- Transaction callback receives `null` at least once.
- Transaction result `committed === false`.
- Behavior when record exists after uncommitted transaction.
- Behavior when record does not exist after uncommitted transaction.
