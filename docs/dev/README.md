## Development

`pnpm dev` starts Vite over HTTPS and a Cloudflare tunnel together, exposing the dev server at `https://localhost:5173` and `https://dev.hangvidu.com`. `pnpm preview` starts a production build preview on the same port.

The dev server uses a trusted mkcert certificate locally. The tunnel connects to that HTTPS origin and disables origin certificate verification because the certificate is local-only. Don't run dev and preview at the same time — they share the port.

The tunnel uses the named tunnel `vidu-dev`, but the dev script bypasses local ingress config and points Cloudflare at `https://localhost:5173` directly. One-time setup: `cloudflared tunnel login`, then `cloudflared tunnel create vidu-dev` and `cloudflared tunnel route dns vidu-dev dev.hangvidu.com`.

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
