#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
repo_root="$(cd -- "$script_dir/.." && pwd)"
cd "$repo_root"

firebase database:get /users > users.json
firebase database:get /usersByEmail > usersByEmail.json

node backend/cloudflare/scripts/backfill-users-to-d1.mjs \
  --input users.json --emails usersByEmail.json \
  --out backend/cloudflare/backfill-users.sql

cd backend/cloudflare
npx wrangler d1 execute hangvidu-data --local --persist-to .wrangler/state \
  --file=backfill-users.sql
