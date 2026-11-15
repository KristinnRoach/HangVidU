#!/bin/sh
# Copies untracked local config (env files, dev vars, certs) from the main
# checkout into a worktree. Existing files in the worktree are kept.
# Usage: scripts/copy-local-files.sh [worktree-path]   (default: current dir)

set -eu
umask 077

worktree_path="$(git -C "${1:-.}" rev-parse --show-toplevel)"

main_worktree="$(
  git -C "$worktree_path" worktree list --porcelain 2>/dev/null |
    awk '/^worktree / { print substr($0, 10); exit }'
)"

if [ -z "$main_worktree" ] || [ "$main_worktree" = "$worktree_path" ]; then
  echo "Not a linked worktree; nothing to copy" >&2
  exit 0
fi

for relative_path in \
  .env \
  .env.development \
  .env.development.local \
  .env.production \
  .env.r2.local \
  .env.sentry-build-plugin \
  .env.sentry-issues.local \
  backend/cloudflare/.dev.vars \
  backend/firebase/.env \
  .certs
do
  source_path="$main_worktree/$relative_path"
  target_path="$worktree_path/$relative_path"

  if [ -e "$source_path" ] && [ ! -e "$target_path" ]; then
    mkdir -p "$(dirname "$target_path")"
    cp -R "$source_path" "$target_path"
    echo "copied $relative_path"
  fi
done
