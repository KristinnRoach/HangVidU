## Development

`pnpm dev` starts Vite and a Cloudflare tunnel together, exposing the dev server at `https://dev.hangvidu.com`. `pnpm preview` does the same for a production build.

Both serve plain HTTP on port 5173 locally; TLS is terminated by Cloudflare. Don't run dev and preview at the same time — they share the port.

The tunnel is configured in `~/.cloudflared/config.yml` (named tunnel `vidu-dev`). One-time setup: `cloudflared tunnel login`, then `cloudflared tunnel create vidu-dev` and `cloudflared tunnel route dns vidu-dev dev.hangvidu.com`.

### Environment configuration

Environment variables are split per environment:

- `.env.development` — local/dev settings
- `.env.production` — production deploys (do not commit real secrets)

To help local testing you can copy the template:

```bash
cp .env.production.example .env.production
# edit .env.production locally — do NOT commit this file
```

For Firebase Hosting deploys, use your local production env values when running the deploy scripts.
