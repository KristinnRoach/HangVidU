# Dependency maintenance

## Automated updates

- **Dependabot (weekly + security alerts):** Tracks the root pnpm workspace
  (including `backend/cloudflare`), `backend/firebase` (separate npm lockfile),
  and GitHub Actions. Patch/minor PRs queue for squash auto-merge once `Verify`
  passes; major upgrades stay open for review.
- **CI coverage:** `Verify` gates every PR. Because `GITHUB_TOKEN` auto-merges
  do not trigger push runs, the daily scheduled CI run covers browser
  compatibility on `main` (see [Development](dev/README.md)). No workflow has
  production credentials or deploys.

## Manual maintenance

- **Vite+ and pnpm:** Run the commands below, then `vp check`, `vpr test:node`,
  `vpr test:cf`, and `vp build`. `vp migrate` pins the version of the global CLI,
  so `vp upgrade` must come first. If `test:cf` fails with "Vitest failed to find
  the runner", run `pnpm dedupe`.

  ```sh
  vp upgrade
  vp migrate --no-interactive --no-agent --no-editor --no-hooks
  pnpm self-update
  vp install
  ```

- **Major upgrades:** Review and merge Dependabot `majors` PRs.
- **Node.js LTS:** Update `engines.node` in `package.json` and `node-version` in
  `.github/workflows/*.yml` when adopting a new LTS.
- **Deploys and D1 migrations:** Run manually via [Operations](dev/OPERATIONS.md).

## Pausing and reusing

- **Pause auto-merge:** Disable `Dependabot auto-merge` in GitHub Actions, and
  disable auto-merge on already-queued PRs.
- **Reuse in another repo:** Copy `.github/dependabot.yml` and the two workflows
  in `.github/workflows/`. Adapt workspace paths and `Verify` steps. Enable
  repository auto-merge and protect the default branch with required up-to-date
  `Verify` checks (never drop branch protection while auto-merge is enabled).

References: [Vite+ upgrades](https://viteplus.dev/guide/upgrade-project),
[Dependabot automation](https://docs.github.com/en/code-security/tutorials/secure-your-dependencies/automate-dependabot-with-actions),
[Dependabot groups](https://docs.github.com/en/code-security/reference/supply-chain-security/dependabot-options-reference).
