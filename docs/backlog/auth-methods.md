# Backlog: additional auth methods

Relocated from `src/auth/TODO.md` to keep `src/auth/` code-only. Product/roadmap
notes, not a code TODO.

## Add auth options (currently Google + username/password)

### Basic login without third-party

Username + password exists. Decide whether to require email. Privacy is a
selling point, so email-optional is worth keeping.

### Third-party providers

Facebook (valuable if it allows importing contacts to invite them), plus
GitHub, Instagram, WhatsApp, Telegram, etc.

> Auth stays on Firebase Auth for now (decided 2026-07). If provider needs grow,
> keep the vendor boundary in `src/auth/adapters/firebase-auth-adapter.js` clean
> so a migration path stays open.
