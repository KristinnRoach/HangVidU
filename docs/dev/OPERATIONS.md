# Deployment and production checks

Read this only for deployment or production investigation. Development commands
are in [the development guide](README.md).

## Deploying

`vpr deploy:fb` runs compat tests, then the Sentry-uploading build (which includes `vp check`), ships to Firebase Hosting, and marks the deploy in Sentry. `vpr deploy:fb:skip-tests` does the same without compat tests.

`vpr deploy:cf` typechecks and tests the Cloudflare Worker, then deploys it. For coordinated backend/frontend releases, `vpr deploy:prod` runs all checks and the build before deploying the Worker, then Hosting, then marking the deploy in Sentry.

`vpr deploy:all` (and `deploy:all:skip-tests`) deploys all of Firebase, including functions and rules, but not Cloudflare. `vpr deploy:fb:db` and `vpr deploy:fb:functions` deploy only rules or functions.

Compat tests prepare Playwright browsers automatically. For other browser tests, run `vpr setup:browsers` on a fresh machine or after a Playwright upgrade.

- The `firebase` CLI is the `firebase-tools` devDependency, kept current by Dependabot. Scripts resolve it from `node_modules/.bin`; run it ad hoc with `vp exec firebase`. Ignore the CLI's `npm install -g` update hint. `re2` builds are denied in `pnpm-workspace.yaml`: it's an optional `superstatic` dependency that only the hosting emulator uses.
- **Commit first.** The Sentry release name embeds `HEAD`'s sha, so a dirty tree ships code the named commit does not contain. It gets a `-dirty` suffix when that happens.
- `vpr bump` bumps the patch version. Optional — the sha already makes each release unique. Not named `patch`, which is a pnpm built-in.
- The build and the deploy marker each derive the release name through `scripts/sentry-release.js`, so the tree must stay unchanged between them or the marker names a different release.
- A Sentry deploy-marker failure makes the script exit non-zero after the Firebase deploy has already succeeded. Do not redeploy to retry it: run `vpr sentry:deploy` from the same commit.
- Source map upload and the deploy marker read `SENTRY_AUTH_TOKEN` from `.env.sentry-build-plugin` (gitignored). A missing token warns and skips instead of failing the deploy.
- Only the `deploy:prod`, `deploy:fb`, `deploy:fb:skip-tests`, `deploy:all` and `deploy:all:skip-tests` scripts upload (they set `SENTRY_UPLOAD=true`); a plain build publishes nothing to Sentry.

## Sentry

- For issue checks, load credentials from `.env.sentry-issues.local`; never print the token.
- Organization: `kristinn-roach`; project: `hangvidu`; environment: `production` (override the Sentry helper's `prod` default).
- Keep routine checks small and read-only: unresolved issues, last 24 hours, up to 10 results. Change issue status only when requested.
