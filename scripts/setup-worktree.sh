#!/bin/sh

set -eu

main_worktree="${1:-}"

if [ -z "$main_worktree" ]; then
  main_worktree="$(
    git worktree list --porcelain 2>/dev/null |
      awk '
        /^worktree / { path = substr($0, 10) }
        /^branch refs\/heads\/main$/ { print path; exit }
        /^branch refs\/heads\/master$/ { print path; exit }
      '
  )"
fi

if [ -z "$main_worktree" ] || [ ! -d "$main_worktree" ]; then
  echo "Usage: $0 <path-to-main-worktree>" >&2
  exit 1
fi

for name in .env .env.development; do
  source_path="$main_worktree/$name"
  target_path="$PWD/$name"

  if [ -L "$target_path" ] && [ ! -e "$target_path" ]; then
    rm -f "$target_path"
  fi

  if [ -f "$source_path" ] && [ ! -e "$target_path" ] && [ ! -L "$target_path" ]; then
    ln -s "$source_path" "$target_path"
    echo "linked $name"
  fi
done
