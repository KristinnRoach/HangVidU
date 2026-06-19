# Backend Consolidation — Checklist

Implementation tracker for
[`BACKEND_CONSOLIDATION_PLAN.md`](./BACKEND_CONSOLIDATION_PLAN.md).
Deferred/optional work belongs in
[`BACKEND_CONSOLIDATION_POST.md`](./BACKEND_CONSOLIDATION_POST.md).
Production operations belong in
[`BACKEND_CONSOLIDATION_RUNBOOK.md`](./BACKEND_CONSOLIDATION_RUNBOOK.md) and are
not implementation-PR completion gates.

## 0. Preparatory PR

- [x] Document the consolidation and post-migration work
- [x] Add `FileObjectStore` and `R2FileObjectStore` to the files Worker
- [x] Keep current R2 persistence and browser contract unchanged

## 1. Consolidated Worker

- [x] Create `backend/cloudflare/src/{index,auth,cors}.ts` and capability folders
- [x] Keep deployed script name `hangvidu-data`
- [x] Add production D1/R2 and all three DO bindings
- [x] Preserve DO migration history v1/v2
- [x] Append v3 `transferred_classes` from `hangvidu-signaling` to
  `hangvidu-data`; do not list `SignalingRoom` under `new_sqlite_classes`
- [x] Set compatibility date `2026-06-02`
- [x] Use top-level config for production and local `wrangler dev`; no named envs
- [x] Add `backend/cloudflare` to root `packages` and use the root lockfile only
- [x] Set all four existing root `allowBuilds` entries to `true`; allow the
  required `sharp` and `workerd` install scripts
- [x] Add backend package scripts, tsconfig, Vitest config, and D1 migration commands

## 2. Data and realtime

- [x] Move D1 repo and data/call handlers into `data/`
- [x] Move `ConversationChannel` and `UserMailbox` without namespace changes
- [x] Move `SignalingRoom` unchanged through the v3 transfer
- [x] Keep pending-invite persistence unchanged

## 3. Files

- [x] Move existing files handlers, `FileObjectStore`, and `R2FileObjectStore`
- [x] Preserve `r2_key`/`bucket` persistence and browser contract
- [x] Preserve auth cache/bound, App Check key, and D1-failure 502
- [x] Move the `isMember` export from `workers/data/src/repo.ts` to the
  consolidated `data/repo.ts`, import it from the files handler originating at
  `workers/files/src/index.ts`, and replace only that handler's inline
  `conversation_members` SQL query; keep its cache and 502 error handling

## 4. Router, auth, and CORS

- [x] Dispatch route family before route-specific auth/CORS/method behavior
- [x] Match anchored, specific routes before generic `/conversations/:id`
- [x] Merge auth superset: JWKS timeout/logging + WS token extraction
- [x] Retain the raw Firebase token on canonical `Identity` for the files cache key
- [x] Use `config/origins.json`; exclude dev/localhost origins in production
- [x] Add `APP_ENV`; set production in Wrangler and development in `dev:cf`
- [x] Preserve core auth, membership, origin, and WebSocket tests

## 5. Public API URL

- [x] Set production to `https://hangvidu-data.kristinnroach.workers.dev`
- [x] Make default frontend scripts explicitly set the deployed production endpoint
- [x] Make the local-persistence Vite process explicitly set
  `https://localhost:8788`
- [x] Make `dev:mobile` explicitly set the deployed endpoint while preserving its tunnel
- [x] Make `build` explicitly set the deployed endpoint, covering all
  `deploy:fb*` and `deploy:all*` scripts
- [x] Make `preview` and `preview:local` run that deterministic build before preview
- [x] Do not depend on editing gitignored `.env.development.local`; script/process
  values must take precedence
- [x] Add/test normalization, HTTP↔WS conversion, and path construction
- [x] Repoint every `src/storage` and `src/realtime` client
- [x] Ensure feature code does not read `VITE_HANGVIDU_API_URL` directly
- [x] Replace and remove `VITE_DATA_URL`, `VITE_FILES_URL`, and
  `VITE_SIGNALING_URL` in all current locations:
  - `src/stores/message-repository.ts`
  - `src/stores/conversations-client.ts`
  - `src/stores/filesStore.ts`
  - `src/realtime/signaling/do-room-signaling.ts`
  - `src/features/call/call-handshake-controller.ts`
  - declarations in `src/env.d.ts`
  - `.env.example`
  - `.env.production.example`
- [x] Update documentation/comment references, including the `VITE_DATA_URL`
  reference in `src/features/call/call-service.ts`
- [x] Verify `rg 'VITE_(DATA|FILES|SIGNALING)_URL' src .env.example
  .env.production.example` returns no matches

## 6. Tooling and tests

- [x] Collapse Worker scripts to `dev:cf`, `deploy:cf`, and `test:cf`
- [x] Set `dev` to Vite-only against the deployed Worker
- [x] Set `dev:local` to run Vite and `dev:cf` together with persistent local
  D1, R2, and Durable Object state
- [x] Rename the current tunnel-backed `dev` workflow to `dev:mobile` without
  changing tunnel behavior
- [x] Preserve the existing Wrangler HTTPS certificate flags in `dev:cf`
- [x] Update required CI and moved-file path references
- [x] Port all existing Worker tests
- [x] Run `pnpm ts`, `test:cf`, and Wrangler config validation/dry run
- [x] Complete local REST/R2/WebSocket smoke checks

## 7. Implementation handoff

- [x] Confirm implementation diff follows the minimal-churn constraints
- [x] Confirm the implementation diff is ready for
  `BACKEND_CONSOLIDATION_RUNBOOK.md`
