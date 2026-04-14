# Add Contact — Deferred Issues

Reviewed against PR #467 and current branch.

## Contacts follow-up (deferred)

- **Duplicate-invite vs permission-denied ambiguity** — RTDB invite writes can surface `PERMISSION_DENIED` for duplicate writes (`!data.exists()` rule), but that code can also represent true authorization failures. Current client mapping prefers explicit permission status. If duplicate UX regresses, fix at the source by emitting a rule-specific duplicate signal or by changing invite-write/read constraints so duplicate can be identified deterministically.

- **Telemetry event naming convention** — `evt:contacts:invite:share-result` and `evt:contacts:invite:share-attempted` use present-tense names. Convention calls for past-tense outcome names (e.g. `invite-shared`, `invite-share-attempted`). Affects `src/features/contacts/share-invite.js` and `src/features/contacts/share-invite-presets.js`. Cosmetic; no functional impact.

## Cross-feature follow-up (not contacts merge-blocking)

- **call-flow URL normalization** — `src/features/call/call-flow.js` still builds room links via string concatenation (`${APP_ORIGIN}${window.location.pathname}?...`). If `VITE_APP_URL` includes a trailing slash and pathname begins with `/`, this can yield `//` in the path. Prefer `new URL(window.location.pathname, APP_ORIGIN)` or equivalent normalization.
