# Development

Start with [AGENTS.md](../../AGENTS.md) for conventions and the
[roadmap](../ROADMAP.md) for priorities. Deployment and Sentry instructions live in
[Operations](OPERATIONS.md).

`vpr dev` starts Vite over HTTPS on port 5173 and the local API together. Use `vpr dev:mobile` to expose the frontend at `https://dev.hangvidu.com` through the Cloudflare tunnel, using the production API.

`vpr preview` builds the app and starts a production preview on port 4173 with the tunnel. Use `vpr preview:local` for a preview without the tunnel.

Local HTTPS needs a trusted certificate. Install [mkcert](https://github.com/FiloSottile/mkcert#installation), then run once from the repository root:

```bash
mkdir -p .certs
vpr setup:dev-certs
```

The mobile dev tunnel connects to that HTTPS origin and disables origin certificate verification because the certificate is local-only.

The tunnel uses the named tunnel `vidu-dev`. One-time setup: `cloudflared tunnel login`, then `cloudflared tunnel create vidu-dev` and `cloudflared tunnel route dns vidu-dev dev.hangvidu.com`. The mobile dev script points directly at `https://localhost:5173`; preview uses local tunnel ingress configured for `http://localhost:4173`. Run only one tunnel command at a time.

### Environment configuration

Environment variables are split per environment:

- `.env.development` — local/dev settings
- `.env.production` — production deploys (do not commit real secrets)

For local development, copy `.env.example` to `.env.development` and supply your
project values. The Worker reads `backend/cloudflare/.dev.vars`; obtain the
required local credentials rather than copying production secrets into source.

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

Run `vp check` and focused tests while iterating; `vpr test:node` runs the fast Node suite without browsers. For documentation cleanup, also check local links and references to deleted files. No new tests are needed for prose changes. Check `vite.config.js` and `package.json` for relevant scripts; run them with `vpr <script>`.

`vpr test:compat` ensures the required Playwright browsers are installed, then runs Node tests and browser tests across Chromium, Firefox, and WebKit. Existing browser installations are reused; Playwright upgrades are handled on the next run. For other browser test commands on a fresh checkout or after a Playwright upgrade, run `vpr setup:browsers` first.

For Worker changes, also run `vpr lint:cf` and `vpr test:cf`. The test runner split
and browser setup are described in [tests/README.md](../../tests/README.md).
Routine PR and main-push CI runs checks, Node and Worker tests, the Firebase
Functions install/module-load smoke check, and the production build. Browser
setup and compatibility tests run only on manual CI dispatch. Once a PR is final
and the decision to merge is made, dispatch **CI** from GitHub Actions using the
PR branch and confirm success before merging, as required by `AGENTS.md`. Repeat
that guard if the branch changes afterward; avoid full-suite runs for trivial
edits. Existing frontend deployment scripts still run `test:compat`.

Dependency automation is documented in
[Dependency maintenance](../dependency-maintenance.md).
