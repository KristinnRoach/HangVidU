# Dependency maintenance

## Automated updates

- **Dependabot (weekly + security alerts):** Tracks the root pnpm workspace
  (including `backend/cloudflare`), `backend/firebase` (separate npm lockfile),
  and GitHub Actions. Patch/minor PRs queue for squash auto-merge once `Verify`
  passes; major upgrades stay open for review.
- **Vite+ toolchain (Mondays):** Runs `vp migrate` with the latest stable CLI to
  align `vite-plus`, its `vite` alias, `vitest`, and `@vitest/*` packages
  (ignored in `.github/dependabot.yml`). Patch/minor updates queue for squash
  auto-merge; major Vite+ or Vitest upgrades stay open for review.
- **CI coverage:** `Verify` gates every PR. Because `GITHUB_TOKEN` auto-merges
  do not trigger push runs, the daily scheduled CI run covers browser
  compatibility on `main` (see [Development](dev/README.md)). No workflow has
  production credentials or deploys.

## Manual maintenance

- **pnpm (`packageManager` in `package.json`):** Neither Dependabot nor the
  Vite+ workflow updates `packageManager`. Keep it pinned to an exact version so
  Vite+, pnpm, CI, and Dependabot stay aligned (`12.21.0` currently splits
  `backend/cloudflare`'s Vitest across two `@opentelemetry/api` peers and breaks
  `vpr test:cf`).
  - **When to check:** Quarterly, on a pnpm security advisory, or after major
    Vite+/Vitest/Cloudflare upgrades.
  - **How to bump:** Run `vp env pin pnpm@latest --force --no-install && vp install`,
    then verify with `vp check`, `vpr test:node`, `vpr test:cf`, and `vp build`.
- **Toolchain PR approval:** Click **Approve and run** on the Monday Vite+ PR
  when GitHub requests it (avoids storing a PAT; a manual CI dispatch does not
  replace this).
- **Major upgrades:** Review and merge Dependabot `majors` PRs and major
  Vite+/Vitest PRs.
- **Node.js LTS:** Update `engines.node` in `package.json` and `node-version` in
  `.github/workflows/*.yml` when adopting a new LTS.
- **Deploys and D1 migrations:** Run manually via [Operations](dev/OPERATIONS.md).

## Run locally

```sh
vp upgrade
vpr update:toolchain
vp check
vpr test:node
vpr test:cf
vp build
```

`vp upgrade` updates the local CLI; `vpr update:toolchain` aligns the project
toolchain. For a single package, use `vp update <package>` (add `--latest` to
cross the declared range).

## Pausing and reusing

- **Pause auto-merge:** Disable `Dependabot auto-merge` and `Update Vite+
  toolchain` in GitHub Actions, and disable auto-merge on already-queued PRs.
- **Reuse in another repo:** Copy `.github/dependabot.yml`, the three workflows
  in `.github/workflows/`, and the `update:toolchain` script. Adapt workspace
  paths, `Verify` steps, and the catalog version lookup in
  `toolchain-update.yml` if versions live in `package.json`. Enable repository
  auto-merge, allow Actions to create PRs, and protect the default branch with
  required up-to-date `Verify` checks (never drop branch protection while
  auto-merge is enabled).

References: [Vite+ upgrades](https://viteplus.dev/guide/upgrade-project),
[Dependabot automation](https://docs.github.com/en/code-security/tutorials/secure-your-dependencies/automate-dependabot-with-actions),
[Dependabot groups](https://docs.github.com/en/code-security/reference/supply-chain-security/dependabot-options-reference).
