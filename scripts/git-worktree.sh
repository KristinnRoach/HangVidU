#!/bin/sh

set -eu
umask 077

branch_name="${1:-}"

if [ -z "$branch_name" ]; then
  echo "Usage: $0 <branch-name>" >&2
  exit 1
fi

repo_root="$(git rev-parse --show-toplevel)"
worktree_path="$repo_root/.worktrees/$branch_name"

if git show-ref --verify --quiet "refs/heads/$branch_name"; then
  git worktree add "$worktree_path" "$branch_name"
else
  git worktree add -b "$branch_name" "$worktree_path"
fi

main_worktree="$(
  git worktree list --porcelain 2>/dev/null |
    awk '
      /^worktree / { path = substr($0, 10) }
      /^branch refs\/heads\/main$/ { print path; exit }
      /^branch refs\/heads\/master$/ { print path; exit }
    '
)"

if [ -z "$main_worktree" ] || [ ! -d "$main_worktree" ]; then
  echo "Warning: could not find main/master worktree; skipping local files" >&2
  exit 0
fi

for relative_path in \
  .env \
  .env.production \
  .env.development \
  .env.development.local \
  .env.r2.local \
  functions/.env \
  workers/data/.dev.vars \
  workers/files/.dev.vars \
  workers/signaling/.dev.vars
do
  source_path="$main_worktree/$relative_path"
  target_path="$worktree_path/$relative_path"

  if [ -f "$source_path" ] && [ ! -e "$target_path" ]; then
    mkdir -p "$(dirname "$target_path")"
    cp "$source_path" "$target_path"
    echo "copied $relative_path"
  fi
done

if [ -d "$main_worktree/.certs" ] && [ ! -e "$worktree_path/.certs" ]; then
  cp -R "$main_worktree/.certs" "$worktree_path/.certs"
  echo "copied .certs/"
fi