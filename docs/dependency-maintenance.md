# Dependency maintenance

Dependabot checks weekly and batches patch/minor updates separately from major
upgrades. Security updates have their own groups and can arrive between weekly
runs. The root pnpm workspace includes the Cloudflare package; Firebase Functions
uses its separate npm lockfile. GitHub Actions versions are tracked too.

Patch/minor Dependabot PRs queue for squash merge. The required `Verify` check
runs formatting, lint, types, Node and Worker tests, a clean Functions install
and module load, and the production build. Chromium/Firefox/WebKit compatibility
runs only on manual CI dispatch and through existing frontend deployment scripts.
Automatic dependency merges use the fast required check and do not wait for the
manual browser guard; for manually merged PRs, follow the final pre-merge guard
in [AGENTS.md](../AGENTS.md).
Major upgrades stay open for review. Failed checks leave the PR open; GitHub's
workflow notifications report failures. Passing tests cannot guarantee that every
production behavior is covered.

The Monday Vite+ workflow uses the latest stable CLI and `vp migrate` to align
Vite+, its Vite alias, Vitest, and browser/coverage packages in a separate PR.
The toolchain PR runs the same required checks. Vite+ or Vitest major upgrades
require review; for pre-1.0 Vite+, minor changes also require review.
GitHub requires one **Approve and run** click before CI runs on these
workflow-created PRs. This avoids storing an extra personal token. After that
click, eligible toolchain updates merge when the checks pass. Ordinary Dependabot
PRs do not need this workflow approval.

No workflow deploys or has production credentials. CI uses dummy frontend config.
Continue using the existing deploy scripts to release when convenient.

## Run locally

```sh
vp upgrade
vp run update:toolchain
vp check
vp test
vp build
```

`vp upgrade` updates the machine's CLI. `update:toolchain` updates this project's
coordinated toolchain. For an ordinary dependency, use `vp update <package>`;
add `--latest` to cross the declared version range. Review major changes.

## Reuse in another repository

Copy `.github/dependabot.yml`, the three workflows, and the `update:toolchain`
package script. Adapt dependency directories and the `Verify` steps. Remove this
repo's Firebase/Cloudflare steps and dummy config when they do not apply.
The toolchain workflow's version detection assumes this repo's pnpm catalog;
adjust that step if the other repo declares versions in `package.json` instead.

Enable repository auto-merge and allow Actions to create PRs. Protect the default
branch with required `Verify` checks and require the PR to be up to date before
merging. No review approval is required for routine updates. Here, administrators
retain direct-push access so solo development can continue normally.

Auto-merge depends on the required PR check: do not remove branch protection
while leaving auto-merge enabled. A manually dispatched CI run does not replace
the PR workflow approval.

To pause automatic merging, disable `Dependabot auto-merge` and `Update Vite+
toolchain` in GitHub Actions, and disable auto-merge on already queued PRs.

Standard GitHub-hosted runners are free for public repositories. Private repos
have plan-dependent included minutes and may incur costs beyond them.

References: [Vite+ upgrades](https://viteplus.dev/guide/upgrade-project),
[Dependabot automation](https://docs.github.com/en/code-security/tutorials/secure-your-dependencies/automate-dependabot-with-actions),
[Dependabot groups](https://docs.github.com/en/code-security/reference/supply-chain-security/dependabot-options-reference).
