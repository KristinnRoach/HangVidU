# HangVidU

A simple peer-to-peer video chat app with a watch-together mode.

## Try it now

**Live demo**: [https://kristinnroach.github.io/HangVidU/](https://kristinnroach.github.io/HangVidU/)

## Usage

1. Click the "Call" button to generate a one-time video chat link
2. Share the link with a partner
3. Partner opens the link in a browser to start video chat
4. Search youtube videos or paste direct url to hosted video in search bar
5. Watch in sync with your partner

## Development

The `pnpm dev` command starts both Vite and ngrok for local development with HTTPS tunneling.

To use a custom ngrok domain (optional), set `NGROK_DOMAIN` in your `.env` file:

```bash
NGROK_DOMAIN=your-custom-domain.ngrok-free.dev
```

If not set, ngrok will generate a random domain automatically.

## Stack

- WebRTC for P2P connection, Firebase for signaling

## Limitations

- Only works for 1-to-1 connections for now
- No authentication or room persistence for now
