# Add Contact — Deferred Issues

Reviewed against PR #467 and current branch.

No active deferred issues in this file right now.

## Cross-feature follow-up (not contacts merge-blocking)

- **call-flow URL normalization** — `src/features/call/call-flow.js` still builds room links via string concatenation (`${APP_ORIGIN}${window.location.pathname}?...`). If `VITE_APP_URL` includes a trailing slash and pathname begins with `/`, this can yield `//` in the path. Prefer `new URL(window.location.pathname, APP_ORIGIN)` or equivalent normalization.
