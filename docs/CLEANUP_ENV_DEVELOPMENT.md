# Cleanup `.env` and `.env.development`

Current state:

- `.env` and `.env.development` overlap heavily.
- Some values look intentionally development-only, but some Firebase config appears to have drifted.
- Worktrees do not get ignored env files automatically, which caused confusion when this worktree was created.

Follow-up cleanup:

- Decide which values should be shared across all local modes and keep those in one canonical place.
- Keep only true development-only overrides in `.env.development`.
- Clarify whether `.env` and `.env.development` should remain separate or effectively point at the same local config.
- Re-check `VITE_FIREBASE_API_KEY` and `VITE_FIREBASE_AUTH_DOMAIN` so the split is explicit and documented instead of accidental.

Worktree note:

- If env setup changes, keep [scripts/setup-worktree.sh](/Users/kristinnroachgunnarsson/.codex/worktrees/9981/HangVidU/scripts/setup-worktree.sh:1) in sync so new worktrees keep working without manual fixes.
