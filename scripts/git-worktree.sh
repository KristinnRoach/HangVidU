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

"$(dirname "$0")/copy-local-files.sh" "$worktree_path"
