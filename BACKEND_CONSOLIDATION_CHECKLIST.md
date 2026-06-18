# Backend Consolidation — Checklist

Implementation tracker for
[`BACKEND_CONSOLIDATION_PLAN.md`](./BACKEND_CONSOLIDATION_PLAN.md).
Deferred/optional work belongs in
[`BACKEND_CONSOLIDATION_POST.md`](./BACKEND_CONSOLIDATION_POST.md).

## 0. Preparatory PR

- [x] Document the consolidation and post-migration work
- [x] Add `FileObjectStore` and `R2FileObjectStore` to the files Worker
- [x] Keep current R2 persistence and browser contract unchanged

## 1. Consolidated Worker

- [ ] Create `backend/cloudflare/src/{index,auth,cors}.ts` and capability folders
- [ ] Keep deployed script name `hangvidu-data`
- [ ] Add production D1/R2 and all three DO bindings
- [ ] Preserve DO migration history v1/v2
- [ ] Append v3 `new_sqlite_classes: ["SignalingRoom"]`; do not transfer it
- [ ] Set compatibility date `2026-06-02`
- [ ] Use top-level config for production and local `wrangler dev`; no named envs

## 2. Data and realtime

- [ ] Move D1 repo and data/call handlers into `data/`
- [ ] Move `ConversationChannel` and `UserMailbox` without namespace changes
- [ ] Move `SignalingRoom` into the fresh v3 namespace
- [ ] Keep pending-invite persistence unchanged

## 3. Files

- [ ] Move existing files handlers, `FileObjectStore`, and `R2FileObjectStore`
- [ ] Preserve `r2_key`/`bucket` persistence and browser contract
- [ ] Preserve auth cache/bound, App Check key, and D1-failure 502
- [ ] Replace only the inner membership query with shared `isMember`

## 4. Router, auth, and CORS

- [ ] Dispatch route family before route-specific auth/CORS/method behavior
- [ ] Match anchored, specific routes before generic `/conversations/:id`
- [ ] Merge auth superset: JWKS timeout/logging + WS token extraction
- [ ] Use `config/origins.json`; exclude dev/localhost origins in production
- [ ] Preserve core auth, membership, origin, and WebSocket tests

## 5. Public API URL

- [ ] Set production to `https://hangvidu-data.kristinnroach.workers.dev`
- [ ] Set local development to `https://localhost:8788`
- [ ] Add/test normalization, HTTP↔WS conversion, and path construction
- [ ] Repoint every `src/storage` and `src/realtime` client
- [ ] Ensure feature code does not read `VITE_HANGVIDU_API_URL` directly
- [ ] Remove old URL variables and verify `rg 'VITE_(DATA|FILES|SIGNALING)_URL' src` is empty

## 6. Tooling and tests

- [ ] Collapse scripts to `dev:cf`, `deploy:cf`, and `test:cf`
- [ ] Update required CI and moved-file path references
- [ ] Port all existing Worker tests
- [ ] Run `pnpm ts`, `test:cf`, and Wrangler config validation/dry run
- [ ] Complete local REST/R2/WebSocket smoke checks
- [ ] Complete production text/image/call smoke checks

## 7. Production cutover

- [ ] Owner verifies resource IDs, bindings, migrations, CORS, URL, tests, and dry run
- [ ] Confirm old files/signaling Workers remain deployed
- [ ] Deploy consolidated `hangvidu-data`; treat post-v3 recovery as forward-fix
- [ ] Smoke-test backend before deploying the client
- [ ] Deploy client and force immediate SW update
- [ ] Keep both old Workers for exactly seven days
- [ ] Repeat smoke test, retire old Workers, and update operations docs
