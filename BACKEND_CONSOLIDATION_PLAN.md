# Backend Consolidation Plan — three Workers → one

**Status:** approved

Collapse the three Cloudflare Workers into the existing `hangvidu-data` Worker.
The source moves to `backend/cloudflare/`; the deployed script name remains
`hangvidu-data`.

**Implementation tracker:** [`BACKEND_CONSOLIDATION_CHECKLIST.md`](./BACKEND_CONSOLIDATION_CHECKLIST.md)

**Post-migration tracker:** [`BACKEND_CONSOLIDATION_POST.md`](./BACKEND_CONSOLIDATION_POST.md)
— source of truth for deferred and optional work.

**Post-merge operations:** [`BACKEND_CONSOLIDATION_RUNBOOK.md`](./BACKEND_CONSOLIDATION_RUNBOOK.md)
— deployment, production verification, compatibility window, and retirement.

## 1. Current PR scope

Preparatory PR #554 contains the consolidation documents and small changes that
reduce later implementation work. The implementation PR prepares deployable code
but does not perform the Worker cutover; operations happen after merge via the
runbook.

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
- No custom API domain or named staging environment.
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
  package.json               # Cloudflare package scripts/dependencies
  tsconfig.json
  vitest.config.ts
  wrangler.jsonc              # deployed name: hangvidu-data
```

The router dispatches by route family before route-specific auth, CORS, method,
or error behavior. Matching is anchored and most-specific-first: files/messages
subpaths are checked before generic `^/conversations/([^/]+)$`. Unknown paths
return 404.

Allowed cross-capability dependency: files may call the narrow membership
predicate in `data/repo.ts`. Feature code uses `src/storage` or `src/realtime` and
does not read the API environment variable directly.

### Package/workspace contract

`backend/cloudflare` is a package in the root pnpm workspace and uses the root
`pnpm-lock.yaml`; do not create another lockfile or nested workspace file.

Add this root workspace entry:

```yaml
packages:
  - backend/cloudflare
```

Replace all four placeholder `allowBuilds` values with `true`, matching the
existing `onlyBuiltDependencies` intent:

```yaml
allowBuilds:
  '@firebase/util': true
  esbuild: true
  protobufjs: true
  unrs-resolver: true
```

The package provides `dev`, `deploy`, `typecheck`, `test`, `migrate:local`, and
`migrate:remote` scripts, plus the TypeScript and Workers Vitest configuration
currently duplicated across the Workers. Root scripts call it with
`pnpm -C backend/cloudflare`. Avoid unrelated dependency or lockfile cleanup.

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

Environment selection must be explicit and deterministic. Set
`VITE_HANGVIDU_API_URL` in the package scripts/process environment so it overrides
gitignored Vite env files: normal `pnpm dev` targets the deployed endpoint, while
the Vite process launched by `pnpm dev:local` explicitly uses localhost. The PR
must not depend on editing or deleting `.env.development.local`.

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
- Canonical `Identity` retains the raw Firebase token. The files authorization
  cache hashes that token together with the App Check token; unification must not
  weaken or silently change its cache key.
- `config/origins.json` remains the source of truth. Production permits only its
  production origins; local development additionally permits development origins.
- Add `APP_ENV: 'production' | 'development'` to the Worker environment.
  Top-level Wrangler vars set `APP_ENV=production`; `dev:cf` passes
  `APP_ENV=development`. `cors.ts` selects only production origins in production
  and the production + development union locally. No named Wrangler environment
  is required.
- Preserve core tests: valid/invalid authentication, member/non-member access,
  allowed/rejected origin, and WebSocket authentication.
- Use compatibility date `2026-06-02`. Run all existing Worker tests plus the core
  smoke tests; do not add a separate exhaustive compatibility matrix.

## 8. Durable Object strategy

The destination remains the existing `hangvidu-data` script:

- `ConversationChannel` stays in its existing namespace.
- `UserMailbox` stays in its existing namespace and retains pending invites.
- `SignalingRoom` transfers from `hangvidu-signaling` into `hangvidu-data` with
  the existing class name and implementation.

Keep v1/v2 and append:

```jsonc
"migrations": [
  { "tag": "v1", "new_sqlite_classes": ["ConversationChannel"] },
  { "tag": "v2", "new_sqlite_classes": ["UserMailbox"] },
  {
    "tag": "v3",
    "transferred_classes": [{
      "from": "SignalingRoom",
      "from_script": "hangvidu-signaling",
      "to": "SignalingRoom"
    }]
  }
]
```

Do not also list `SignalingRoom` under `new_sqlite_classes`. The transfer is
atomic and creates the v3 rollback boundary, but preserves one namespace so old
and new clients can signal each other. Existing source bindings forward after
the transfer. Freeze `hangvidu-signaling` during the compatibility window; if it
must be redeployed, its binding must explicitly set `script_name: "hangvidu-data"`
as documented in the runbook.

## 9. Implementation sequence

1. Scaffold the root-workspace package described in §5, then create its production
   D1/R2 bindings, existing DO migrations v1/v2, transferred `SignalingRoom` v3,
   and compatibility date `2026-06-02`.
2. Move data handlers/repo and the two existing data DO classes; keep their
   behavior and migration history.
3. Move signaling routes/class unchanged and configure only the v3 namespace
   transfer required by §8.
4. Move files handlers, `FileObjectStore`, and `R2FileObjectStore`; preserve the
   authorization wrapper and attachment persistence.
5. Unify auth/CORS and preserve the core tests in §7.
6. Add the shared URL helper, repoint every old client URL consumer, and remove
   the old URL variables.
7. Collapse Worker scripts to `dev:cf`, `deploy:cf`, and `test:cf`; make `dev`
   Vite-only against the deployed Worker, make `dev:local` run Vite plus
   `dev:cf`, and rename the existing tunnel-backed `dev` script unchanged to
   `dev:mobile`. Update CI/path references required by moved files.
8. Run verification and hand the merged implementation to
   `BACKEND_CONSOLIDATION_RUNBOOK.md`.

## 10. Verification gates

- `pnpm ts` and `test:cf`; port all existing Worker tests into the consolidated suite.
- Wrangler config validation/dry run.
- Core auth, membership, CORS, and WebSocket tests.
- Existing file upload/download/delete and cache/502 tests through
  `R2FileObjectStore`.
- Local smoke: health, resolve-direct, member/non-member reads, image operations,
  live push, mailbox, and signaling.
- No old Worker URL variable reads remain under `src/`.

## 11. Minimal-churn constraint

- Move handlers, protocols, tests, and modules largely unchanged.
- Extract only shared auth, CORS, membership, and URL logic required by the plan.
- Preserve class names, routes, wire formats, persistence, and existing test intent.
- Do not combine formatting, renaming, dependency cleanup, or speculative
  abstractions with the consolidation.
- Move operational instructions into the runbook instead of duplicating them.

## 12. Accepted tradeoff

One Worker increases deployment and security blast radius and removes independent
release cadence. The signaling transfer adds an atomic migration and forward-fix
boundary, but prevents prolonged old/new client incompatibility. At this project's
scale, simpler configuration, one public endpoint, and removal of
auth/CORS/membership drift outweigh those costs.
