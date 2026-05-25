# Add Contact — Deferred Issues

## Contacts follow-up (deferred)

- **Duplicate-invite vs permission-denied ambiguity** — RTDB invite writes can surface `PERMISSION_DENIED` for duplicate writes (`!data.exists()` rule), but that code can also represent true authorization failures. Current client mapping prefers explicit permission status. If duplicate UX regresses, fix at the source by emitting a rule-specific duplicate signal or by changing invite-write/read constraints so duplicate can be identified deterministically.
