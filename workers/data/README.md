# hangvidu-data

Cloudflare Worker for the HangVidU conversation registry: a D1 relational store
for users, conversations, and memberships, all keyed by `conversationId`.
Messages, files, calls, and production contact behavior remain on their current
paths in this slice.

See the deferred decisions note:
[`docs/WIP_Architecture/D1_CONVERSATION_CORE_DEFERRED_DECISIONS.md`](../../docs/WIP_Architecture/D1_CONVERSATION_CORE_DEFERRED_DECISIONS.md).

## Layout

| Path | Responsibility |
|------|----------------|
| `src/index.ts` | Worker router + CORS. Maps HTTPS routes to handlers. |
| `src/auth.ts` | `authenticate(request, env) → Identity \| null`. Firebase ID token (RS256, `Authorization: Bearer`). Provider-agnostic return. |
| `migrations/` | D1 schema migrations (`wrangler d1 migrations`). |

Conventions: D1 table names plural, column names singular. IDs are opaque
UUID v4 (`crypto.randomUUID()`); ordering comes from `created_at` columns.

## Setup (one-time)

Deps are installed standalone — this dir is its own pnpm workspace root (it has
its own `pnpm-workspace.yaml`), so do **not** pass `--ignore-workspace` (that
skips the local `allowBuilds` allowlist and fails on `ERR_PNPM_IGNORED_BUILDS`):

```sh
cd workers/data && pnpm install
```

Create the remote D1 database and paste the returned `database_id` into
`wrangler.jsonc` (replaces `PLACEHOLDER_RUN_wrangler_d1_create`):

```sh
pnpm exec wrangler d1 create hangvidu-data
```

## Local dev

```sh
pnpm dev                 # wrangler dev — local D1 shadow, no remote id needed
pnpm migrate:local       # apply migrations to the local D1
```

Smoke test:

```sh
curl http://localhost:8788/health        # -> { "ok": true }
curl -H "Authorization: Bearer <idToken>" http://localhost:8788/me
```

## Deploy

```sh
pnpm migrate:remote      # apply migrations to remote D1
pnpm deploy
```
