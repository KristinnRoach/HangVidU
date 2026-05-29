# Slice 1 — WebRTC Room Signaling on a Durable Object

## Goal

Move realtime room signaling (SDP / ICE / presence) off RTDB onto a Cloudflare
Durable Object, swappable behind the existing `P2PRoomSignaling` port. RTDB
adapter stays as the fallback. Persistence (contacts, messages, user) stays on
RTDB — this slice touches realtime only.

This establishes the **realtime vs persistence** split:
- `src/infra/firebase-rtdb.js` + `src/storage/**` → persistence (RTDB)
- `workers/signaling/` + `src/realtime/**` → ephemeral coordination (Durable Objects)

## Boundaries

| Layer | Path | Responsibility | Must NOT |
|-------|------|----------------|----------|
| Contract | `shared/signaling/protocol.ts` | Wire message types, shared by client + worker | depend on RTDB, Firebase, or DOM |
| Worker router | `workers/signaling/src/index.ts` | Authenticate, map `roomId → DO`, hand off WS | hold signaling logic |
| Auth seam | `workers/signaling/src/auth.ts` | `authenticate(request, env) → { userId }` | leak provider choice past return type |
| Durable Object | `workers/signaling/src/signaling-room.ts` | Presence + relay fan-out | parse SDP, persist, know channels |
| Transport | `src/realtime/signaling-socket.ts` | Connect / reconnect / heartbeat | hold signaling semantics |
| Adapter | `src/features/signaling/p2p/do-room-signaling.ts` | Map `P2PRoomSignaling` ↔ protocol | know transport internals |

The DO is a **relay**: it holds only presence (who's joined). SDP/ICE are
forwarded peer-to-peer and discarded. `media-sync` later = a new `channel`
value in the protocol — no DO or structural change.

## Stable contracts (do not churn)

- Client: `P2PRoomSignaling` (`@kidlib/p2p`) — unchanged.
- Wire: `protocol.ts` envelope — `join` / `leave` / `relay` ↔ `peers` / `relay` / `error`.

## Auth

Slice 1 verifies a Firebase ID token in `authenticate()`. The return type is
provider-agnostic (`{ userId }`), so migrating off Firebase later replaces one
file. Signature verification is a documented TODO (see auth.ts) — acceptable
for the prototype, must be closed before real users.

## Checklist

- [x] 1. Scaffold `workers/signaling/` (package.json, wrangler.jsonc, tsconfig, .gitignore) — deps installed standalone (`--ignore-workspace`), `pnpm typecheck` clean
- [x] 2. `shared/signaling/protocol.ts` — wire types
- [x] 3. `SignalingRoom` DO — presence + relay over hibernatable WebSockets
- [x] 4. `authenticate()` seam — Firebase ID token (claims-only; signature TODO), provider-agnostic return
- [x] 5. Worker `index.ts` — auth → `getByName(roomId)` → WS handoff
- [x] 6. `src/realtime/signaling-socket.ts` — reconnecting WS client (+ `src/realtime/protocol.ts` re-export)
- [x] 7. `src/features/signaling/p2p/do-room-signaling.ts` — implements `P2PRoomSignaling` over the socket
- [x] 8. Factory in `features/signaling/index.js` (`createRoomSignaling`) — `VITE_SIGNALING_BACKEND` flag, **default `do`**; wired into `call-handshake.tsx`. Client `pnpm ts` clean.
- [x] 9. Verify — manual browser call ✅ (real 2-peer call through the DO). Automated guards:
  - DO relay/presence test (`test/signaling-room.test.ts`)
  - Worker routing + auth test (`test/worker.test.ts`): 404 / 426 / 401 (missing, expired, bad-aud) / 101 valid
  - Client adapter mapping test (`do-room-signaling.test.js`): join/re-join, presence, offer/answer/ICE relay, peer+channel routing, cleanup
  - Deferred: full Chromium 2-peer E2E (covered manually for now)

**Auth refactor:** `authenticate()` now returns `Identity | null` (no throwing) —
cleaner request-path guard and avoids async-throw noise in the test runner.

## Manual verification (run locally)

1. `cd workers/signaling && pnpm dev` — wrangler dev serves the DO at `ws://localhost:8787`.
2. In repo root: `pnpm dev:local` (https://localhost:5173).
3. `VITE_SIGNALING_BACKEND=do` and `VITE_SIGNALING_URL=ws://localhost:8787` are already in `.env.development`.
4. Start a call between two logged-in sessions → signaling now flows through the DO, not RTDB.

Flip `VITE_SIGNALING_BACKEND=rtdb` to fall back instantly if needed.

Notes:
- Auth: client sends its real Firebase ID token as the `bearer` subprotocol; the
  worker validates `aud`/`iss`/`exp` against `vidu-aae11` (signature still TODO).
- `localhost` is mixed-content exempt, so `ws://` works from the https dev page.
- Client changes left uncommitted pending your manual pass.

## Migration path (preserved, no work now)

RTDB + DO adapters coexist behind the flag → cut over per environment → delete
`firebase-room-signaling.js` once proven. Call-invite mailbox + media-sync are
later slices reusing `src/realtime/` transport and this protocol envelope.
