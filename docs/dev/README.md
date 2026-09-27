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

### Tooling and validation

Vite+ manages Node.js and the pnpm version pinned in `package.json`. On a fresh checkout, or after pulling dependency changes, run `vp install --frozen-lockfile`. Use `vp install` when intentionally updating dependencies, then commit the lockfile.

For source or config changes, run `vp check` and tests covering the changed behavior. Docs-only edits do not need the full test suite. Check `vite.config.js` and `package.json` for relevant scripts; run them with `vp run <script>`.

Run `vp run setup:browsers` once on each machine or fresh CI runner before browser tests. `pnpm test:compat` runs Node tests and browser tests across Chromium, Firefox, and WebKit; it assumes the browsers are installed.

`pnpm deploy:fb` builds the client, runs `vp check` and compatibility tests, deploys Firebase Hosting, and marks the Sentry release. Run it from a clean commit with the production environment configured. Its checks do not need a separate full preflight run. Firebase Functions are deployed separately with `pnpm deploy:fb:functions`.
