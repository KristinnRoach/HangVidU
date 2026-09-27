## Development

`vp run dev` starts Vite over HTTPS on port 5173 and the local API together. Use `vp run dev:mobile` to expose the frontend at `https://dev.hangvidu.com` through the Cloudflare tunnel, using the production API.

`vp run preview` builds the app and starts a production preview on port 4173 with the tunnel. Use `vp run preview:local` for a preview without the tunnel.

The dev server uses a trusted mkcert certificate locally. The mobile dev tunnel connects to that HTTPS origin and disables origin certificate verification because the certificate is local-only.

The tunnel uses the named tunnel `vidu-dev`. One-time setup: `cloudflared tunnel login`, then `cloudflared tunnel create vidu-dev` and `cloudflared tunnel route dns vidu-dev dev.hangvidu.com`. The mobile dev script points directly at `https://localhost:5173`; preview uses local tunnel ingress configured for `http://localhost:4173`. Run only one tunnel command at a time.

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

Install Vite+ once using the [official setup instructions](https://viteplus.dev/guide/). Vite+ manages Node.js and downloads pnpm within the 12.x range declared in `package.json`; no separate pnpm installation or patch-version pin is needed. On a fresh checkout, or after pulling dependency changes, run `vp install --frozen-lockfile`. Use `vp install` when intentionally updating dependencies, then commit the lockfile.

For source or config changes, run `vp check` and tests covering the changed behavior. Docs-only edits do not need the full test suite. Check `vite.config.js` and `package.json` for relevant scripts; run them with `vp run <script>`.

`vp run test:compat` ensures the required Playwright browsers are installed, then runs Node tests and browser tests across Chromium, Firefox, and WebKit. Existing browser installations are reused; Playwright upgrades are handled on the next run. For other browser test commands on a fresh checkout or after a Playwright upgrade, run `vp run setup:browsers` first.

`vp run deploy:fb` builds the client, runs `vp check` and compatibility tests, deploys Firebase Hosting, and marks the Sentry release. Run it from a clean commit with the production environment configured. Its checks do not need a separate full preflight run. Firebase Functions are deployed separately with `vp run deploy:fb:functions`.

Dependabot opens weekly dependency update PRs. There is no separate outdated-dependency report to review. When adding CI, use `voidzero-dev/setup-vp` for Node.js, pnpm, and dependency caching, followed by `vp install --frozen-lockfile` and the checks needed by that job.
