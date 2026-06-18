# Backend Consolidation Plan — three Workers → one

**Status:** approved · **Branch:** `refactor/storage-boundaries`

Collapse the three Cloudflare Workers into the existing `hangvidu-data` Worker.
The source moves to `backend/cloudflare/`; the deployed script name remains
`hangvidu-data`.

**Progress tracker:** [`BACKEND_CONSOLIDATION_CHECKLIST.md`](./BACKEND_CONSOLIDATION_CHECKLIST.md)

**Post-migration tracker:** [`BACKEND_CONSOLIDATION_POST.md`](./BACKEND_CONSOLIDATION_POST.md)
— source of truth for work deliberately deferred from this cutover.

---

## 1. Goal

- Replace the separately deployed `data`, `files`, and `signaling` Workers with
  one `hangvidu-data` Worker organized as `data/`, `files/`, and `realtime/`.
- Keep one membership predicate, auth implementation, CORS policy, Wrangler
  config, deployment, and local Worker process.
- Preserve the existing client ports in `src/storage` and `src/realtime`; feature
  code must use those ports and must not read the global API URL directly.
- Use one stable `VITE_HANGVIDU_API_URL` for the public HangVidU API entry point.
  It identifies HangVidU's API, not a selected backend provider.
- Put file bytes behind a server-side `FileObjectStore` port with the existing R2
  implementation as its first adapter, so storage is selected behind the API.

Consolidation is justified by the combined auth/CORS/config/deploy duplication
and the tight data/realtime coupling. The duplicated membership predicate alone
could instead be removed through a shared package.

## 2. Non-goals

- No Firebase Functions move. `functions/` remains at the repository root; moving
  it is a separate future change.
- No file-storage provider beyond R2, provider-selection UI, connected-storage
  credential flow, general capability registry, or feature rewrite.
- No D1 schema or attachment metadata migration. Provider-neutral persistence is
  a separate post-consolidation PR tracked in `BACKEND_CONSOLIDATION_POST.md`.
- No RTDB cleanup or changes to deferred contacts/user-profile paths.
- No indefinite compatibility shim for old clients. The project uses
  force-immediate service-worker updates and has a small user base.

## 3. Current system

| Path                                       | Responsibility                                          | Consolidated destination     |
| ------------------------------------------ | ------------------------------------------------------- | ---------------------------- |
| `workers/data/src/index.ts`                | D1 HTTP routes, call routes, live-push/mailbox WS       | `src/index.ts` + `src/data/` |
| `workers/data/src/repo.ts`                 | D1 access and authoritative `isMember` predicate        | `src/data/repo.ts`           |
| `workers/data/src/conversation-channel.ts` | Live message push DO                                    | `src/realtime/`              |
| `workers/data/src/user-mailbox.ts`         | Call mailbox DO with persisted pending invites          | `src/realtime/`              |
| `workers/files/src/index.ts`               | R2 upload/download and membership authorization wrapper | `src/files/`                 |
| `workers/signaling/src/signaling-room.ts`  | WebRTC signaling DO                                     | `src/realtime/`              |
| `workers/*/src/auth.ts`                    | Three related Firebase RS256 implementations            | `src/auth.ts`                |

Membership is delete-based: a row in `conversation_members` means the user is a
member. Migrations `0003_drop_member_status.sql` and
`0004_drop_member_role.sql` removed the unused status and role columns. The data
and files guards are behaviorally consistent today, but duplicate the predicate.

The files authorization wrapper must remain intact: preserve its 30-second GET
cache, bounded cache size, App Check token cache key, and explicit 502 response on
D1 failure. Replace only its inner membership query with the shared predicate.

## 4. Target structure and boundaries

```text
backend/cloudflare/
  src/
    index.ts                 # path-family dispatch only
    auth.ts                  # canonical Firebase RS256 implementation
    cors.ts                  # environment-selected shared origin policy
    data/                    # D1 repo and data/call handlers
    files/
      handlers.ts            # provider-neutral HTTP/auth behavior
      file-object-store.ts   # narrow blob-storage port + provider resolver seam
      adapters/r2.ts         # only provider implemented in this pass
    realtime/                # all three Durable Object classes and WS handlers
  migrations/               # existing D1 migration history, unchanged
  wrangler.jsonc             # deployed name remains hangvidu-data
```

The client owns one shared HangVidU API URL helper under `src/infra/`; storage and
realtime adapters use it for REST/WS URL construction.

`src/index.ts` dispatches by route family before route-specific auth, CORS, method,
or error handling runs. Route matching is anchored and most-specific-first:
files/messages subpaths are checked before generic `^/conversations/([^/]+)$`, so
the generic conversation route cannot shadow them. Unknown paths return 404.

Backend boundary linting enforces:

- `data`, `files`, and `realtime` handlers may use shared root modules.
- `files` may use the narrow membership predicate from `data/repo.ts`; no other
  cross-capability imports are allowed without updating this plan.
- Feature code uses `src/storage` or `src/realtime`, never
  `VITE_HANGVIDU_API_URL` directly.

## 5. Stable public API and composable file storage

`VITE_HANGVIDU_API_URL` is the stable browser entry point for the consolidated
HangVidU-owned API, for example `https://api.hangvidu.com`. It is expected to
change only when selecting an environment or moving the public API domain:

```text
local       https://localhost:8788
staging     https://api-staging.hangvidu.com
production  https://api.hangvidu.com
```

It is used by the adapters for:

- conversations, messages, calls, and file authorization/coordination over HTTP;
- live conversation push, mailbox, and signaling over WebSockets;
- initiating file upload/download, even when the API later returns a short-lived
  direct provider URL.

Firebase Auth, RTDB contacts/user profiles, and storage-provider credentials do
not use or live in this variable. Changing R2 to S3 or user-connected storage does
not change it. `VITE_*` values are public build-time configuration and cannot hold
provider credentials or express a per-user provider choice.

The files HTTP handlers depend on a narrow server-side `FileObjectStore`, never
directly on `env.FILES_BUCKET`. The initial provider resolver always returns
`R2FileObjectStore`; future policy may resolve by user, conversation, or file
without changing the client API. Provider credentials remain server-side. This
pass keeps the existing `r2_key`/`bucket` persistence unchanged behind the adapter.
Generalizing those fields is intentionally deferred until the consolidated Worker
is stable; see `BACKEND_CONSOLIDATION_POST.md`.

## 6. Shared auth, CORS, and compatibility

- The canonical `auth.ts` is the tested superset: files' JWKS timeout/error
  logging plus data's WebSocket token extraction. Port auth parity tests before
  deleting the old implementations.
- `config/origins.json` remains the source of truth and is bundled into `cors.ts`.
  Wrangler sets an environment selector: production uses only `production`;
  local/dev uses `production + development`. Production does not accept localhost.
- REST, files, and WebSocket tests cover allowed, missing, and rejected origins,
  including their existing response/header behavior.
- Use compatibility date `2026-06-02`. Advancing data/signaling from `2025-05-01`
  is treated as behavior-affecting and all three route families are tested against it.

## 7. Durable Object migration

The destination is the existing `hangvidu-data` script:

- `ConversationChannel` stays in its existing namespace.
- `UserMailbox` stays in its existing namespace and retains pending-invite storage.
- Only `SignalingRoom` transfers from `hangvidu-signaling`.

Keep the existing `hangvidu-data` migration history and append:

```jsonc
"migrations": [
  { "tag": "v1", "new_sqlite_classes": ["ConversationChannel"] },
  { "tag": "v2", "new_sqlite_classes": ["UserMailbox"] },
  {
    "tag": "v3",
    "transferred_classes": [
      {
        "from": "SignalingRoom",
        "from_script": "hangvidu-signaling",
        "to": "SignalingRoom"
      }
    ]
  }
]
```

Do not add `SignalingRoom` to `new_sqlite_classes`; the transfer creates the
destination namespace. Rehearse the cross-script transfer with disposable Worker
names before production. See Cloudflare's
[Durable Object migration reference](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/).

The migration is the rollback boundary: after production transfer, the backend
cannot roll back to a pre-v3 Worker version. Recovery is forward-fix only.

## 8. Implementation sequence

1. Scaffold `backend/cloudflare/` with deployed name `hangvidu-data`, existing D1
   migrations/bindings, the R2 binding, all three DO bindings, compatibility date
   `2026-06-02`, and the unchanged v1/v2 migration history.
2. Move data handlers/repo and the two in-place data DO classes. Port tests and
   verify pending mailbox invites survive a normal `hangvidu-data` deployment.
3. Move signaling code and add the v3 `SignalingRoom` transfer. Rehearse the
   transfer, source-binding forwarding, and WebSocket reconnect behavior.
4. Move files code behind `FileObjectStore`; implement only `R2FileObjectStore`.
   Preserve the authorization wrapper and replace only its inner D1 membership
   query with the shared predicate. Keep attachment persistence unchanged.
5. Unify auth and environment-split CORS behind parity tests. Route-family
   dispatch remains outside global auth/CORS behavior.
6. Add a tested HangVidU API URL helper: trim trailing slashes, convert
   `http → ws` / `https → wss`, and construct data/files/realtime paths.
   Repoint existing storage/realtime clients to `VITE_HANGVIDU_API_URL`; remove
   per-worker URL variables after the cutover.
7. Extend backend boundary linting, add route-family log fields, and collapse
   root dev/deploy/test scripts to `dev:cf`, `deploy:cf`, and `test:cf`.
8. Execute the cutover runbook in §10; retire old source directories only after
   production verification.

## 9. Verification gates

- `pnpm ts`, boundary lint, and `test:cf` with all existing Worker suites ported.
- Auth and CORS parity across all route families.
- Files authorization cache behavior and D1-failure 502 behavior.
- File handlers tested against a fake `FileObjectStore` and R2 adapter contract tests.
- Wrangler config validation/dry run.
- Disposable cross-script `SignalingRoom` transfer rehearsal: destination works,
  source binding forwards, and clients reconnect after active sockets reset.
- Normal `hangvidu-data` deployment preserves pending `UserMailbox` invites.
- Local smoke: health, resolve-direct dedup, member/non-member reads, image
  upload/download/delete, live message WS, mailbox WS, and signaling WS.
- Browser smoke: send/receive text and image, place/receive/cancel a call.

## 10. Production cutover and retirement

1. Confirm production bindings, routes, bucket/database IDs, compatibility date,
   v1/v2 history, and the exact source script name `hangvidu-signaling`.
2. Deploy consolidated `hangvidu-data`. This performs the v3 transfer. From this
   point backend recovery is forward-fix only.
3. Verify every route family, structured logs, pending-invite persistence, and
   that the still-deployed `hangvidu-signaling` binding forwards correctly.
4. Deploy the client with `VITE_HANGVIDU_API_URL` pointing to `hangvidu-data` and
   force the immediate service-worker update.
5. Keep `hangvidu-files` live for old clients and keep `hangvidu-signaling` live
   for source-binding forwarding during a short verification window. This is not
   a long-term compatibility commitment.
6. Retire the old services only after the forced-update cycle succeeds, smoke
   checks pass, and route-family logs show no material legacy endpoint traffic.
   `hangvidu-files` requires explicit retention because ordinary Worker requests
   do not auto-forward after consolidation.
7. Update architecture/operations documentation to the as-built layout.

## 11. Accepted tradeoff

One Worker has a larger blast radius and merges deploy cadence and observability.
At the current scale, simpler configuration and removal of version skew outweigh
that cost. Route-family logs, boundary linting, and per-capability smoke checks
are required controls. Files remains the first candidate to split out later if
upload load or its security profile warrants a separate deploy boundary.
