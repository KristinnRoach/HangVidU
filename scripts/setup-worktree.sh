#!/bin/sh

set -eu

main_worktree="${1:-$HOME/Desktop/Dev/HangVidU}"

for name in .env .env.development; do
  source_path="$main_worktree/$name"
  target_path="$PWD/$name"

  if [ -f "$source_path" ] && [ ! -e "$target_path" ]; then
    ln -s "$source_path" "$target_path"
    echo "linked $name"
  fi
done
