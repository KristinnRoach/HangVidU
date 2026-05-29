# hangvidu-signaling

Cloudflare Worker + Durable Object for **realtime WebRTC room signaling**
(SDP / ICE / presence). Standalone deploy artifact — not part of the root pnpm
workspace (mirrors `functions/`). The realtime counterpart to RTDB persistence.

See `docs/WIP_Architecture/SIGNALING_DO_SLICE1.md` for the slice plan and boundaries.

## Architecture

```
client                         worker (this package)
──────                         ─────────────────────
src/realtime/signaling-socket  ──WS──►  src/index.ts        (auth + route by roomId)
src/features/signaling/p2p/                  │ getByName(roomId)
  do-room-signaling.ts                       ▼
                                        src/signaling-room.ts (SignalingRoom DO)
                                          presence + relay fan-out
```

- **DO is a relay**: holds only presence; forwards `relay` messages to the
  addressed peer; never inspects SDP/ICE. No persistence — empty rooms evict.
- **Wire contract**: `shared/signaling/protocol.ts` (shared with the client).
- **Auth**: `src/auth.ts`, provider-agnostic `{ userId }`. Verifies the Firebase
  ID token's RS256 signature (Google JWKS, WebCrypto) + claims. Swapping auth
  provider later touches only this file's internals.

## Endpoint

`GET /rooms/:roomId/signal` — WebSocket upgrade. Auth token passed as the
`Sec-WebSocket-Protocol: bearer, <idToken>` subprotocol.

## Commands

```sh
pnpm install              # first time (own lockfile, like functions/)
pnpm dev                  # wrangler dev (local DO)
pnpm typecheck
pnpm test                 # vitest + @cloudflare/vitest-pool-workers
pnpm deploy               # wrangler deploy

# set the project id (vars in wrangler.jsonc, or per-env):
# wrangler secret put / vars override — FIREBASE_PROJECT_ID
```
