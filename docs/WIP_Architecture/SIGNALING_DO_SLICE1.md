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
- [ ] 6. `src/realtime/signaling-socket.ts` — reconnecting WS client
- [ ] 7. `src/features/signaling/p2p/do-room-signaling.ts` — implement the port
- [ ] 8. Factory/flag in `features/signaling/p2p/index.js` — RTDB default, flag → DO
- [ ] 9. Verify — DO tests (`@cloudflare/vitest-pool-workers`) + Chromium E2E call

## Migration path (preserved, no work now)

RTDB + DO adapters coexist behind the flag → cut over per environment → delete
`firebase-room-signaling.js` once proven. Call-invite mailbox + media-sync are
later slices reusing `src/realtime/` transport and this protocol envelope.
