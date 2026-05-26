#!/bin/sh

set -eu

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
  echo "Warning: could not find main/master worktree, skipping env linking" >&2
  exit 0
fi

for name in .env .env.development; do
  source_path="$main_worktree/$name"
  target_path="$worktree_path/$name"

  if [ -L "$target_path" ] && [ ! -e "$target_path" ]; then
    rm -f "$target_path"
  fi

  if [ -f "$source_path" ] && [ ! -e "$target_path" ] && [ ! -L "$target_path" ]; then
    ln -s "$source_path" "$target_path"
    echo "linked $name"
  fi
done
