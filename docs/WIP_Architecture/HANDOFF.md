# Handoff

Current checkpoint is focused on incremental architecture enforcement without blocking unrelated work.

Completed in this branch:
- moved auth from `src/features/auth/` to `src/auth/`
- added auth intent events and auth intent listeners
- made `AuthComponent` emit auth intent events instead of calling auth actions directly
- narrowed boundary enforcement to the `contacts` module
- enforced `src/features/contacts/index.js` as the only public contacts entry
- standardized external auth imports on `src/auth/index.js`
- exposed `onAuthStateChange()` as the public auth subscription API
- added boundary enforcement so external code must import auth through `src/auth/index.js`

Current intended standards:
- `src/features/<module>/index.js` is the public entry for a feature module
- `src/auth/index.js` is the public entry for auth
- state subscriptions stay inside state modules, but public consumers use exported aliases from the module public API

Verified at this checkpoint:
- `pnpm lint:boundaries`
- `pnpm test`

Next goal:
- start by simplifying and clarifying how these ESLint boundary rules are defined
- reassess whether `eslint-plugin-boundaries` is actually helping enough to justify the current complexity
- the current rule setup appears more convoluted than the intended architectural rule, so simplify the rule expression before expanding enforcement further
- satisfy the existing `contacts` rule: no direct imports from sibling features
- keep the rollout incremental so one module can be completed, merged, and stabilized before moving to the next

Notes:
- `src/auth/auth-state.js` still owns the canonical auth snapshot and the internal `subscribe()` implementation
- `src/auth/index.js` is now the intended public auth surface for external consumers
- `contacts` is the only feature currently under active sibling-boundary enforcement
