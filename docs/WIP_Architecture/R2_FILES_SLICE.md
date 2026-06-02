# R2 Files Slice — image send/receive (RTDB-based)

Status: PLANNING. Branch `feat/r2-images`, off `main`. First focus: **images**.

## Goal

Send and receive image files in a conversation, with the blob stored in
Cloudflare R2 and the message metadata staying on **RTDB**. No D1 dependency —
this is deliberately decoupled from the paused message migration
(see [D1_R2_MIGRATION.md](./D1_R2_MIGRATION.md) DECISION section).

## Why this is a clean, self-contained slice

The messaging core already supports R2 file payloads on the read/model side —
the schema and RTDB read adapter can already *carry* an R2 reference:

- `FileMessagePayloadSchema` (`src/features/messaging-next/schema.ts`) already
  accepts `storage: { provider: 'r2', bucket, key }` (alongside `url` / inline
  `data`).
- The RTDB adapter read path (`src/features/messaging-next/adapters/rtdb.ts`,
  the `raw.type === 'file'` branch ~line 79) already parses that `storage`
  descriptor.

So an image message is just a normal RTDB file message that carries an R2 key.
The genuinely new pieces are a worker that stores/serves the blob and
authorizes access, plus a client/repository send path that writes file-message
metadata with `storage` rather than inline `data`.

## Reference spike: PR #532

PR [#532](https://github.com/KristinnRoach/HangVidU/pull/532) is a
reference-only browser image-message spike. It should be closed/deleted once
this R2-backed PR lands. Do **not** merge it as the production files path,
because it stores image bytes inline in RTDB as base64 `data`.

Useful pieces to port from #532:

- Composer image picker UI (`accept="image/*"`), optional caption flow, and
  `imagePreparing` guards.
- Client-side image validation/compression scaffolding, with the encoded
  data-URL size check adapted to an upload-size check for R2.
- `useConversation.send(payloadOverride)` / outgoing text-or-file contract so a
  caller can send prepared file metadata instead of only draft text.
- RTDB `MessageRepository.send` support for `type: 'file'` rows, but only for
  `storage`/`url` metadata in this branch — not inline `data`.
- Tests for optimistic attachment state and RTDB file-row persistence, rewritten
  to assert R2 `storage` payloads.

Do not carry over:

- Inline base64 `data` persistence in RTDB.
- The “small browser test” data URL cap as a final storage limit. R2 upload
  limits should be explicit binary upload limits and enforced by the worker.

## Design (target for this slice)

- **Blob storage:** R2 object at key `{conversationId}/{fileId}` (`fileId` =
  `crypto.randomUUID()`). `conversationId` is the existing RTDB id (derived `a_b`
  for DMs today).
- **Message:** normal RTDB file message with
  `payload.storage = { provider: 'r2', bucket, key }` + `fileName`, `mimeType`,
  `fileSize`. No D1 `message_attachments` row (that's the D1 design — out of
  scope here).
- **Worker:** new `workers/files/` (sibling of `workers/data/` /
  `workers/signaling/`), R2 binding. Reuse the Firebase RS256 `authenticate()`
  Bearer seam from `workers/data/src/auth.ts` / `workers/signaling/src/auth.ts`.
  Endpoints (shape TBD in implementation):
  - upload (proxied through the worker, or presigned PUT) → returns `{ bucket, key }`
  - download/serve, content-type set from stored metadata
- **Authorization (hybrid, confirmed feasible & not scattered):**
  - DM (id is derived `a_b`, no `group:` prefix): authorize if caller's uid is in
    `conversationId.split('_')`. No DB read.
  - Group (`group:` prefix): one RTDB existence read at
    `conversations/{conversationId}/members/{callerUid}` (the adapter already
    uses this path — `adapters/rtdb.ts` ~line 47).

## Client wiring

- A send path that: uploads the image to the worker → gets `{ bucket, key }` →
  sends a file message via the existing `MessageRepository.send` with the
  `storage` payload.
- A render path that resolves an R2 `storage` descriptor to a displayable URL
  (via the worker's serve/download endpoint) and shows the image.
- Boundary-clean wiring through `stores/` (the only layer allowed both auth +
  storage), mirroring how the data-worker client is injected.

## Explicitly out of scope (this slice)

- D1 `message_attachments` table / any D1 coupling.
- Non-image files, video (existing watch-together path is separate), thumbnails,
  resizing, EXIF stripping — revisit after images work end-to-end.
- Live push (unrelated; messages remain on RTDB which already pushes).
- Remote R2 provisioning/deploy tuning until local e2e is verified.

## Checklist (fill in during implementation)

- [ ] Scaffold `workers/files/` (wrangler.jsonc, R2 binding, auth seam, local dev).
- [ ] Upload endpoint + authz (DM derived-id; group RTDB members read).
- [ ] Download/serve endpoint + same authz; correct content-type.
- [ ] Client: upload-then-send-file-message path (images).
- [ ] Client: render R2-backed image messages.
- [ ] Manual e2e: send an image in a DM, other browser receives + renders;
      reload → still renders from R2.
- [ ] `pnpm ts` / `lint` / `lint:boundaries` / `build` clean.

## Open questions (decide in-session)

- Upload mechanism: proxy through worker vs presigned PUT (presigned avoids
  Worker egress for the body, but adds a sign step + CORS on the bucket).
- Serve mechanism: short-lived signed GET URL vs always-proxy through the worker
  (proxy keeps authz centralized; signed URL is cheaper but leaks time-boxed
  access).
- Bucket layout already fixed: `{conversationId}/{fileId}` (per migration doc;
  deleting a conversation = delete the prefix).
- Port assignment for `pnpm dev:files` (data `:8788`, signaling `:8787`).
