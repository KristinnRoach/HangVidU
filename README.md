# HangVidU

A web app for video calls and messaging. [Try HangVidU](https://hangvidu.com/).

## Current capabilities

- One-to-one audio/video calls, guest room links, and desktop screen sharing.
- Contact invitations, persistent text messages and attachments, and push notifications.
- English/Icelandic UI and an installable web app.

Next up: group calls.
See the [roadmap](docs/ROADMAP.md) for planned work and current limitations.

## How it's built

Solid + TypeScript frontend and peer-to-peer WebRTC calls. The backend runs on Cloudflare:
Durable Objects for call signaling and realtime chat, D1 for persisted messages
and contacts, R2 for file attachments, and TURN as a relay when a direct
connection fails. Firebase handles sign-in and push notifications; Sentry tracks
errors and releases.

- Connection handling lives in [`@kidlib/p2p`](https://github.com/KristinnRoach/p2p),
  my signaling-agnostic WebRTC library, [`published on npm`](https://www.npmjs.com/package/@kidlib/p2p).
- Reconnect handling: peers rejoin signaling before queued offers are replayed,
  so a dropped connection recovers without restarting the call.
- CI runs unit tests and browser tests across Chromium, Firefox and WebKit.

## Development

See the [development guide](docs/dev/README.md) for local setup and the
[code map](docs/architecture/README.md) for how the code is organised.
Conventions are in [AGENTS.md](AGENTS.md).
