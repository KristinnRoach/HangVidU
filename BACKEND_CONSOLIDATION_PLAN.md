# Backend Consolidation Plan — three Workers → one

**Status:** approved · **Branch:** `refactor/storage-boundaries`

Collapse the three Cloudflare Workers into the existing `hangvidu-data` Worker.
The source moves to `backend/cloudflare/`; the deployed script name remains
`hangvidu-data`.

**Implementation tracker:** [`BACKEND_CONSOLIDATION_CHECKLIST.md`](./BACKEND_CONSOLIDATION_CHECKLIST.md)

**Post-migration tracker:** [`BACKEND_CONSOLIDATION_POST.md`](./BACKEND_CONSOLIDATION_POST.md)
— source of truth for deferred and optional work.

## 1. Current PR scope

This first PR contains the consolidation documents and small preparatory changes
that reduce later implementation work. It does not perform the Worker cutover.

Completed preparatory change:

- The files Worker now uses a narrow `FileObjectStore` with an
  `R2FileObjectStore` adapter. Consolidation moves these unchanged.

## 2. Goal

- Replace separately deployed `data`, `files`, and `signaling` Workers with one
  `hangvidu-data` Worker organized as `data/`, `files/`, and `realtime/`.
- Keep one membership predicate, auth implementation, CORS policy, Wrangler
  config, deployment command, and local Worker process.
- Preserve existing client ports in `src/storage` and `src/realtime`.
- Use one stable `VITE_HANGVIDU_API_URL` for the HangVidU-owned API entry point.
- Preserve current D1, R2, file, message, call, and RTDB behavior.

The consolidation is justified by the combined auth/CORS/config/deploy
duplication and tight data/realtime coupling. Membership duplication alone would
not justify the migration.

## 3. Non-goals

- No Firebase Functions move.
- No D1 schema or attachment metadata migration.
- No storage provider beyond R2 or provider-selection UI.
- No RTDB cleanup or deferred contacts/user-profile work.
- No custom API domain, named staging environment, or transfer of the existing
  signaling namespace.
- No expanded architecture lint rules, structured route logging, or exhaustive
  header-level auth/CORS parity matrix.

Deferred and optional work belongs in `BACKEND_CONSOLIDATION_POST.md`.

## 4. Current system

| Path | Responsibility | Destination |
|---|---|---|
| `workers/data/src/index.ts` | D1 HTTP, call routes, live-push/mailbox WS | `src/index.ts` + `src/data/` |
| `workers/data/src/repo.ts` | D1 access and `isMember` | `src/data/repo.ts` |
| `workers/data/src/conversation-channel.ts` | Live message push DO | `src/realtime/` |
| `workers/data/src/user-mailbox.ts` | Mailbox DO with persisted pending invites | `src/realtime/` |
| `workers/files/src/index.ts` | R2 HTTP and membership authorization | `src/files/` |
| `workers/files/src/file-object-store.ts` | Object-storage port | `src/files/` |
| `workers/files/src/r2-file-object-store.ts` | R2 adapter | `src/files/` |
| `workers/signaling/src/signaling-room.ts` | WebRTC signaling DO | `src/realtime/` |
| `workers/*/src/auth.ts` | Three related Firebase RS256 implementations | `src/auth.ts` |

Membership is delete-based: a `conversation_members` row means the user is a
member. Data and files implement the same correct rule but duplicate it.

The files authorization wrapper remains intact: preserve its 30-second GET cache,
bounded cache, App Check token cache key, and explicit 502 on D1 failure. Replace
only its inner membership query with the shared predicate.

## 5. Target structure and routing

```text
backend/cloudflare/
  src/
    index.ts                  # route-family dispatch
    auth.ts                   # canonical Firebase RS256 implementation
    cors.ts                   # shared environment-aware origin policy
    data/                     # D1 repo and data/call handlers
    files/
      handlers.ts
      file-object-store.ts
      r2-file-object-store.ts
    realtime/                 # three DO classes and WS handlers
  migrations/                # existing D1 history, unchanged
  wrangler.jsonc              # deployed name: hangvidu-data
```

The router dispatches by route family before route-specific auth, CORS, method,
or error behavior. Matching is anchored and most-specific-first: files/messages
subpaths are checked before generic `^/conversations/([^/]+)$`. Unknown paths
return 404.

Allowed cross-capability dependency: files may call the narrow membership
predicate in `data/repo.ts`. Feature code uses `src/storage` or `src/realtime` and
does not read the API environment variable directly.

## 6. Public API endpoint and environments

Production and the default frontend development workflow use the existing
automatically provisioned Workers endpoint:

```env
VITE_HANGVIDU_API_URL=https://hangvidu-data.kristinnroach.workers.dev
```

This lets `pnpm dev` run only Vite while exercising the deployed D1, R2, and
Durable Object backend. It is the normal production-like UX workflow and writes
to production backend state.

The opt-in local-persistence workflow overrides the URL with:

```env
VITE_HANGVIDU_API_URL=https://localhost:8788
```

`pnpm dev:local` starts Vite and the consolidated local Worker together with
`concurrently`. The Worker uses HTTPS with the existing localhost certificate
flags and persists local D1, R2, and Durable Object state. `pnpm dev:cf` remains
available for running only that local Worker when backend-focused debugging
needs separate process control.

Rename the current tunnel-backed `dev` script unchanged to `dev:mobile`. Mobile
tunnel performance is outside this migration; the workflow remains available
without being part of normal desktop development.

Environment selection must be explicit and deterministic: normal `pnpm dev`
targets the deployed endpoint, while only `pnpm dev:local` overrides it with the
localhost endpoint. Remove the current `.env.development.local` URL overrides
so they cannot silently redirect the default workflow.

Wrangler itself still has only two resource modes in this plan:

- top-level Wrangler configuration = production;
- local `wrangler dev` bindings/state = development.

Do not add named Wrangler environments or staging resources. The consolidated
Wrangler config explicitly contains the production D1, R2, DO, vars, and migration
history. Local development uses the same binding names with local resources.

The shared client URL helper trims trailing slashes, converts `http → ws` and
`https → wss`, and constructs data/files/realtime paths. All existing consumers
of `VITE_DATA_URL`, `VITE_FILES_URL`, and `VITE_SIGNALING_URL` move to that helper.
Completion requires this command to return no client matches:

```sh
rg 'VITE_(DATA|FILES|SIGNALING)_URL' src
```

Changing the public endpoint later is straightforward: configure a Worker custom
domain/route, update CORS, change `VITE_HANGVIDU_API_URL`, and deploy the client.
That optional task is tracked in `BACKEND_CONSOLIDATION_POST.md`.

## 7. Shared auth, CORS, and compatibility date

- Canonical auth is the tested superset: files' JWKS timeout/error logging plus
  data's WebSocket token extraction.
- `config/origins.json` remains the source of truth. Production permits only its
  production origins; local development additionally permits development origins.
- Preserve core tests: valid/invalid authentication, member/non-member access,
  allowed/rejected origin, and WebSocket authentication.
- Use compatibility date `2026-06-02`. Run all existing Worker tests plus the core
  smoke tests; do not add a separate exhaustive compatibility matrix.

## 8. Durable Object strategy

The destination remains the existing `hangvidu-data` script:

- `ConversationChannel` stays in its existing namespace.
- `UserMailbox` stays in its existing namespace and retains pending invites.
- `SignalingRoom` is created as a fresh namespace in `hangvidu-data`; the old
  namespace is not transferred.

Keep v1/v2 and append:

```jsonc
"migrations": [
  { "tag": "v1", "new_sqlite_classes": ["ConversationChannel"] },
  { "tag": "v2", "new_sqlite_classes": ["UserMailbox"] },
  { "tag": "v3", "new_sqlite_classes": ["SignalingRoom"] }
]
```

This avoids transfer rehearsal and namespace-forwarding complexity. It still is
an atomic DO migration and creates a rollback boundary: after v3 deploys, backend
recovery is forward-fix rather than rollback to pre-v3.

During the seven-day transition, old clients signal through
`hangvidu-signaling`; updated clients use the fresh namespace in `hangvidu-data`.
Old/new client versions cannot signal each other, and forced updates may drop an
active call. This is accepted for the current small friends-and-family user base.

## 9. Implementation sequence

1. Create `backend/cloudflare/` with production D1/R2 bindings, existing DO
   bindings/migrations v1/v2, fresh `SignalingRoom` v3, and compatibility date
   `2026-06-02`.
2. Move data handlers/repo and the two existing data DO classes; keep their
   behavior and migration history.
3. Move signaling routes/class and use the fresh namespace—no transfer config or
   disposable rehearsal infrastructure.
4. Move files handlers, `FileObjectStore`, and `R2FileObjectStore`; preserve the
   authorization wrapper and attachment persistence.
5. Unify auth/CORS and preserve the core tests in §7.
6. Add the shared URL helper, repoint every old client URL consumer, and remove
   the old URL variables.
7. Collapse Worker scripts to `dev:cf`, `deploy:cf`, and `test:cf`; make `dev`
   Vite-only against the deployed Worker, make `dev:local` run Vite plus
   `dev:cf`, and rename the existing tunnel-backed `dev` script unchanged to
   `dev:mobile`. Update CI/path references required by moved files.
8. Run verification and execute the production cutover in §11.

## 10. Verification gates

- `pnpm ts` and `test:cf`; port all existing Worker tests into the consolidated suite.
- Wrangler config validation/dry run.
- Core auth, membership, CORS, and WebSocket tests.
- Existing file upload/download/delete and cache/502 tests through
  `R2FileObjectStore`.
- Local smoke: health, resolve-direct, member/non-member reads, image operations,
  live push, mailbox, and signaling.
- Production smoke: send/receive text and image, place/receive/cancel a call.
- No old Worker URL variable reads remain under `src/`.

## 11. Production cutover

The project owner performs the deployment.

Before deploy, abort if any check fails:

- Wrangler config/dry run and all tests are green.
- Production D1/R2 IDs, DO bindings, v1/v2 history, and v3 fresh-class migration
  match this plan.
- `hangvidu-files` and `hangvidu-signaling` remain deployed.
- Production CORS origins and `VITE_HANGVIDU_API_URL` are correct.

Then:

1. Deploy consolidated `hangvidu-data`; after v3, recovery is forward-fix only.
2. Smoke-test all REST, file, mailbox/live-push, and signaling paths. Forward-fix
   the Worker before deploying the client if any check fails.
3. Deploy the client and force the immediate service-worker update.
4. Keep `hangvidu-files` and `hangvidu-signaling` deployed for exactly seven days.
5. After seven days, repeat the production smoke test, retire both old Workers,
   and update architecture/operations documentation. Dormant clients may require
   a refresh; indefinite compatibility is explicitly out of scope.

## 12. Accepted tradeoff

One Worker increases deployment and security blast radius and removes independent
release cadence. Fresh signaling temporarily splits old/new clients. At this
project's scale, simpler configuration, one public endpoint, and removal of
auth/CORS/membership drift outweigh those costs.
