# Backend Consolidation — Checklist

Tracker for [`BACKEND_CONSOLIDATION_PLAN.md`](./BACKEND_CONSOLIDATION_PLAN.md).
Deferred work is tracked separately in
[`BACKEND_CONSOLIDATION_POST.md`](./BACKEND_CONSOLIDATION_POST.md).

## 1. Consolidated Worker config

- [ ] Create `backend/cloudflare/src/{index,auth,cors}.ts` and `data/ files/ realtime/`
- [ ] Keep deployed script name `hangvidu-data`
- [ ] Preserve D1 binding/migrations and DO migration history v1/v2
- [ ] Add R2 binding and all three DO bindings
- [ ] Set and test compatibility date `2026-06-02`

## 2. Data and in-place Durable Objects

- [ ] Move D1 repo and data/call handlers into `data/`
- [ ] Move `ConversationChannel` and `UserMailbox` into `realtime/`
- [ ] Port data/repo/DO tests
- [ ] Verify pending mailbox invites survive a normal `hangvidu-data` deploy

## 3. Signaling transfer

- [ ] Move signaling routes and `SignalingRoom` into `realtime/`
- [ ] Append v3 `transferred_classes` from `hangvidu-signaling`
- [ ] Do not list `SignalingRoom` under `new_sqlite_classes`
- [ ] Rehearse transfer with disposable Workers
- [ ] Verify source-binding forwarding and WebSocket reconnect

## 4. Files

- [ ] Define narrow server-side `FileObjectStore` port
- [ ] Implement only `R2FileObjectStore`; handlers must not use `FILES_BUCKET` directly
- [ ] Add the provider resolver seam with R2 as the only current selection
- [ ] Keep existing `r2_key`/`bucket` persistence and browser contract unchanged
- [ ] Preserve GET auth cache, bound, App Check cache key, and D1-failure 502
- [ ] Replace only the wrapper's inner membership query with shared `isMember`
- [ ] Test handlers against a fake store and add R2 adapter contract tests
- [ ] Port upload/download/delete and authorization tests

## 5. Router, auth, and CORS

- [ ] Dispatch route family before route-specific auth/CORS/method behavior
- [ ] Match anchored, most-specific routes before generic `/conversations/:id`
- [ ] Merge auth as tested superset: JWKS timeout/logging + WS token extraction
- [ ] Bundle `config/origins.json` and select origins by environment
- [ ] Exclude development/localhost origins in production
- [ ] Add auth/CORS parity tests for REST, files, and WebSockets

## 6. Stable HangVidU API URL

- [ ] Add `VITE_HANGVIDU_API_URL` to typings and environment files
- [ ] Document it as the stable HangVidU API entry point, not a provider selector
- [ ] Add tested URL normalization, HTTP↔WS conversion, and path construction
- [ ] Repoint existing `src/storage` and `src/realtime` clients
- [ ] Enforce that feature code does not read `VITE_HANGVIDU_API_URL` directly
- [ ] Keep provider choice and credentials server-side/runtime; never in `VITE_*`
- [ ] Remove per-worker URL variables after cutover

## 7. Boundaries, tooling, and observability

- [ ] Extend boundary linting to `backend/cloudflare`
- [ ] Allow only the documented files→membership cross-capability import
- [ ] Add route-family fields to logs
- [ ] Collapse scripts to `dev:cf`, `deploy:cf`, and `test:cf`
- [ ] Update CI and old Worker path references

## 8. Verification gates

- [ ] `pnpm ts`, boundary lint, and `test:cf`
- [ ] Wrangler config validation/dry run
- [ ] Auth/CORS parity, files cache/502, and store contract tests
- [ ] Disposable `SignalingRoom` transfer rehearsal
- [ ] Local REST, R2, mailbox/live-push/signaling WS smoke checks
- [ ] Browser smoke: text, image, and call flows

## 9. Production cutover

- [ ] Verify bindings, resource IDs, v1/v2 history, routes, and source script name
- [ ] Deploy consolidated `hangvidu-data` and accept forward-fix-only boundary
- [ ] Verify all route families and `hangvidu-signaling` binding forwarding
- [ ] Deploy `VITE_HANGVIDU_API_URL` client and force immediate SW update
- [ ] Keep `hangvidu-files` and `hangvidu-signaling` live through short verification window
- [ ] Confirm smoke checks and no material legacy endpoint traffic
- [ ] Retire old services and source directories
- [ ] Update architecture and operations documentation

## Deferred explicitly

See `BACKEND_CONSOLIDATION_POST.md`; deferred work is not part of this checklist.
