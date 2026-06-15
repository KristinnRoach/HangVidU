# Files Worker

Authenticated Cloudflare Worker for R2-backed image message upload and download.

## Local Development

Create an untracked local env file before running Wrangler:

```sh
cp .dev.vars.example .dev.vars
pnpm run dev
```

Local dev uses `../data/.wrangler/state` for Wrangler persistence so this worker
authorizes uploads against the same local D1 database that `workers/data` writes.
Run `pnpm -C ../data migrate:local` before starting the workers if the local D1
schema has not been created yet.

Use `pnpm run test` for Worker tests and `pnpm run lint` for the Worker type/lint check.
