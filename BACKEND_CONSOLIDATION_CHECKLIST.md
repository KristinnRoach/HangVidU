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

- [ ] Create `backend/cloudflare/src/{index,auth,cors}.ts` and capability folders
- [ ] Keep deployed script name `hangvidu-data`
- [ ] Add production D1/R2 and all three DO bindings
- [ ] Preserve DO migration history v1/v2
- [ ] Append v3 `transferred_classes` from `hangvidu-signaling` to
  `hangvidu-data`; do not list `SignalingRoom` under `new_sqlite_classes`
- [ ] Set compatibility date `2026-06-02`
- [ ] Use top-level config for production and local `wrangler dev`; no named envs
- [ ] Add `backend/cloudflare` to root `packages` and use the root lockfile only
- [ ] Set all four root `allowBuilds` entries to `true`
- [ ] Add backend package scripts, tsconfig, Vitest config, and D1 migration commands

## 2. Data and realtime

- [ ] Move D1 repo and data/call handlers into `data/`
- [ ] Move `ConversationChannel` and `UserMailbox` without namespace changes
- [ ] Move `SignalingRoom` unchanged through the v3 transfer
- [ ] Keep pending-invite persistence unchanged

## 3. Files

- [ ] Move existing files handlers, `FileObjectStore`, and `R2FileObjectStore`
- [ ] Preserve `r2_key`/`bucket` persistence and browser contract
- [ ] Preserve auth cache/bound, App Check key, and D1-failure 502
- [ ] Move the `isMember` export from `workers/data/src/repo.ts` to the
  consolidated `data/repo.ts`, import it from the files handler originating at
  `workers/files/src/index.ts`, and replace only that handler's inline
  `conversation_members` SQL query; keep its cache and 502 error handling

## 4. Router, auth, and CORS

- [ ] Dispatch route family before route-specific auth/CORS/method behavior
- [ ] Match anchored, specific routes before generic `/conversations/:id`
- [ ] Merge auth superset: JWKS timeout/logging + WS token extraction
- [ ] Retain the raw Firebase token on canonical `Identity` for the files cache key
- [ ] Use `config/origins.json`; exclude dev/localhost origins in production
- [ ] Add `APP_ENV`; set production in Wrangler and development in `dev:cf`
- [ ] Preserve core auth, membership, origin, and WebSocket tests

## 5. Public API URL

- [ ] Set production to `https://hangvidu-data.kristinnroach.workers.dev`
- [ ] Make default frontend scripts explicitly set the deployed production endpoint
- [ ] Make the local-persistence Vite process explicitly set
  `https://localhost:8788`
- [ ] Make `dev:mobile` explicitly set the deployed endpoint while preserving its tunnel
- [ ] Make `build` explicitly set the deployed endpoint, covering all
  `deploy:fb*` and `deploy:all*` scripts
- [ ] Make `preview` and `preview:local` run that deterministic build before preview
- [ ] Do not depend on editing gitignored `.env.development.local`; script/process
  values must take precedence
- [ ] Add/test normalization, HTTP↔WS conversion, and path construction
- [ ] Repoint every `src/storage` and `src/realtime` client
- [ ] Ensure feature code does not read `VITE_HANGVIDU_API_URL` directly
- [ ] Replace and remove `VITE_DATA_URL`, `VITE_FILES_URL`, and
  `VITE_SIGNALING_URL` in all current locations:
  - `src/stores/message-repository.ts`
  - `src/stores/conversations-client.ts`
  - `src/stores/filesStore.ts`
  - `src/realtime/signaling/do-room-signaling.ts`
  - `src/features/call/call-handshake-controller.ts`
  - declarations in `src/env.d.ts`
  - `.env.development`
  - `.env.example`
  - `.env.production.example`
- [ ] Update documentation/comment references, including the `VITE_DATA_URL`
  reference in `src/features/call/call-service.ts`
- [ ] Verify `rg 'VITE_(DATA|FILES|SIGNALING)_URL' src .env.development
  .env.example .env.production.example` returns no matches

## 6. Tooling and tests

- [ ] Collapse Worker scripts to `dev:cf`, `deploy:cf`, and `test:cf`
- [ ] Set `dev` to Vite-only against the deployed Worker
- [ ] Set `dev:local` to run Vite and `dev:cf` together with persistent local
  D1, R2, and Durable Object state
- [ ] Rename the current tunnel-backed `dev` workflow to `dev:mobile` without
  changing tunnel behavior
- [ ] Preserve the existing Wrangler HTTPS certificate flags in `dev:cf`
- [ ] Update required CI and moved-file path references
- [ ] Port all existing Worker tests
- [ ] Run `pnpm ts`, `test:cf`, and Wrangler config validation/dry run
- [ ] Complete local REST/R2/WebSocket smoke checks

## 7. Implementation handoff

- [ ] Confirm implementation diff follows the minimal-churn constraints
- [ ] Confirm the merged code is ready for `BACKEND_CONSOLIDATION_RUNBOOK.md`
