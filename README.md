# HangVidU

A simple peer-to-peer video chat app with a watch-together mode.

## Try it now

**Live demo**: [https://vidu-aae11.web.app/](https://vidu-aae11.web.app/)

## Usage

1. Click the "Call" button to generate a one-time video chat link
2. Share the link with a partner
3. Partner opens the link in a browser to start video chat
4. Search youtube videos or paste direct url to hosted video in search bar
5. Watch in sync with your partner

## Stack

- WebRTC for P2P connection, Firebase for signaling

## Limitations

- Only works for 1-to-1 connections

## Development

The `pnpm dev` command starts both Vite and ngrok for local development with HTTPS tunneling.

### Environment configuration

Your environment variables are now managed in two files:

- `.env.development` for local/dev settings
- `.env.production` for production deploys

For custom ngrok domains (optional), set `NGROK_DOMAIN` in your `.env.development` file:

```bash
NGROK_DOMAIN=your-custom-domain.ngrok-free.dev
```

If not set, ngrok will generate a random domain automatically.
