# Files Worker

Authenticated Cloudflare Worker for R2-backed image message upload and download.

## Local Development

Create an untracked local env file before running Wrangler:

```sh
cp .dev.vars.example .dev.vars
pnpm run dev
```

Use `pnpm run test` for Worker tests and `pnpm run lint` for the Worker type/lint check.
