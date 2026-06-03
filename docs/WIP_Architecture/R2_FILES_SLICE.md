# R2 Files Slice — image send/receive (RTDB-based)

Status: IMPLEMENTED except manual two-browser e2e. Branch `feat/r2-images`,
off `main`. First focus: **images**.

## Goal

Send and receive image files in a conversation, with the blob stored in
Cloudflare R2 and the message metadata staying on **RTDB**. No D1 dependency —
this is deliberately decoupled from the paused message migration
(see [D1_R2_MIGRATION.md](./D1_R2_MIGRATION.md) DECISION section).

## Why this is a clean, self-contained slice

The messaging core already supports R2 file payloads on the read/model side —
the schema and RTDB read adapter can already *carry* an R2 reference:

- `FileMessagePayloadSchema` (`src/features/messaging-next/schema.ts`) accepts
  `storage: { provider: 'r2', bucket, key }`.
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
  R2 `storage` metadata in this branch — not inline `data` or persisted URLs.
- Tests for optimistic attachment state and RTDB file-row persistence, rewritten
  to assert R2 `storage` payloads.

Do not carry over:

- Inline base64 `data` persistence in RTDB.
- The “small browser test” data URL cap as a final storage limit. R2 upload
  limits should be explicit binary upload limits and enforced by the worker.

## Design (target for this slice)

- **Blob storage:** R2 object at key
  `conversation-files/{conversationId}/{objectId}` (`objectId` =
  `crypto.randomUUID()` for new uploads). `conversationId` is the existing RTDB
  id (derived `a_b` for DMs today). The full R2 key is the storage identifier;
  there is no separate persisted `fileId`.
- **Message:** normal RTDB file message with
  `payload.storage = { provider: 'r2', bucket, key }` + `fileName`, `mimeType`,
  `fileSize`. No D1 `message_attachments` row (that's the D1 design — out of
  scope here).
- **Worker:** new `workers/files/` (sibling of `workers/data/` /
  `workers/signaling/`), R2 binding. Reuse the Firebase RS256 `authenticate()`
  Bearer seam from `workers/data/src/auth.ts` / `workers/signaling/src/auth.ts`.
  Endpoints:
  - `POST /conversations/:conversationId/files/images` (proxied upload) →
    returns `{ provider, bucket, key }`
  - `GET /conversations/:conversationId/files/object?key=:key` (proxied
    download), content-type set from stored metadata
  - `DELETE /conversations/:conversationId/files/object?key=:key` best-effort
    cleanup
- **Authorization:** one RTDB read for all conversation kinds at
  `conversations/{conversationId}/members/{callerUid}` using the caller's
  Firebase ID token. Missing members are rejected. Members are accepted only
  when `status` is `"active"` or omitted for default data. The Worker must not
  infer DM membership from the derived direct conversation id.

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

- [x] Scaffold `workers/files/` (wrangler.jsonc, R2 binding, auth seam, local dev).
- [x] Upload endpoint + authz (RTDB members read for all conversations).
- [x] Download/serve endpoint + same authz; correct content-type.
- [x] Client: upload-then-send-file-message path (images).
- [x] Client: render R2-backed image messages.
- [ ] Manual e2e: send an image in a DM, other browser receives + renders;
      reload → still renders from R2.
- [x] `pnpm ts` / `lint` / `lint:boundaries` / `build` clean.

## Decisions for v1

- Upload mechanism: proxy through the worker.
- Serve mechanism: proxy through the worker; the browser fetches with
  Authorization and renders a temporary object URL.
- Bucket layout for new writes:
  `conversation-files/{conversationId}/{objectId}`. Deleting a conversation =
  delete that prefix. Earlier migrated keys under
  `conversations/{conversationId}/media/...` have been rewritten into the
  canonical prefix.
- Port assignment for `pnpm dev:files`: `8789` (signaling uses `8787`).
