# Development

Start with [AGENTS.md](../../AGENTS.md) for conventions and the
[roadmap](../ROADMAP.md) for priorities. Deployment and Sentry instructions live in
[Operations](OPERATIONS.md).

`vpr dev` starts Vite over HTTPS on port 5173 and the local API together. Use `vpr dev:mobile` to expose the frontend at `https://dev.hangvidu.com` through the Cloudflare tunnel, using the production API.

`vpr preview` builds the app and starts a production preview on port 4173 with the tunnel. Use `vpr preview:local` for a preview without the tunnel.

The dev server uses a trusted mkcert certificate locally. The mobile dev tunnel connects to that HTTPS origin and disables origin certificate verification because the certificate is local-only.

The tunnel uses the named tunnel `vidu-dev`. One-time setup: `cloudflared tunnel login`, then `cloudflared tunnel create vidu-dev` and `cloudflared tunnel route dns vidu-dev dev.hangvidu.com`. The mobile dev script points directly at `https://localhost:5173`; preview uses local tunnel ingress configured for `http://localhost:4173`. Run only one tunnel command at a time.

### Environment configuration

Environment variables are split per environment:

- `.env.development` — local/dev settings
- `.env.production` — production deploys (do not commit real secrets)

For local development, copy `.env.example` to `.env.development` and supply your
project values. The Worker reads `backend/cloudflare/.dev.vars`; obtain the
required local credentials rather than copying production secrets into source.

<!-- coderabbit-ai-generated:v1 -->

<!-- coderabbit-ai-generated-section:v1:066e27080c4339b1f1d6b15808f85bd02c3fc2af33722b0cc66c135e1375a221 -->

Install the [mkcert executable](https://github.com/FiloSottile/mkcert#installation) using its installation instructions. From the repository root, create the certificate directory and run the setup command once:

```bash
mkdir -p .certs
vpr setup:dev-certs
```

This creates the certificates used by the local Worker.

<!-- /coderabbit-ai-generated:v1 -->

`vpr dev` applies local D1 migrations before starting the API.

For production builds, copy the production template:

```bash
cp .env.production.example .env.production
# edit .env.production locally — do NOT commit this file
```

For Firebase Hosting deploys, use your local production env values when running the deploy scripts.

### Tooling and validation

Install Vite+ once using the [official setup instructions](https://viteplus.dev/guide/). Vite+ manages Node.js and downloads pnpm within the 12.x range declared in `package.json`; no separate pnpm installation or patch-version pin is needed. On a fresh checkout, or after pulling dependency changes, run `vp install --frozen-lockfile`. Use `vp install` when intentionally updating dependencies, then commit the lockfile.

Use `vpr <script>` for every `package.json` script (`vpr` is shorthand for `vp run`). Use `vp` for built-in operations such as `vp install`, `vp add`, `vp update`, and `vp check`. Existing `pnpm` script and package commands still work.

Run `vp check` and `vp test` before submitting changes, as required by `AGENTS.md`. For documentation cleanup, also check local links and references to deleted files. No new tests are needed for prose changes. Check `vite.config.js` and `package.json` for relevant scripts; run them with `vpr <script>`.

`vpr test:compat` ensures the required Playwright browsers are installed, then runs Node tests and browser tests across Chromium, Firefox, and WebKit. Existing browser installations are reused; Playwright upgrades are handled on the next run. For other browser test commands on a fresh checkout or after a Playwright upgrade, run `vpr setup:browsers` first.

For Worker changes, also run `vpr lint:cf` and `vpr test:cf`. The test runner split
and browser setup are described in [tests/README.md](../../tests/README.md).
CI runs the broader verification suite; dependency automation is documented in
[Dependency maintenance](../dependency-maintenance.md).
