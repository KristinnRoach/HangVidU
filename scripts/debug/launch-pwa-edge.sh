#!/bin/zsh

set -euo pipefail

APP_URL="${PWA_URL:-https://vidu-aae11.web.app/}"
DEBUG_PORT="${EDGE_DEBUG_PORT:-9222}"
USER_DATA_DIR="${EDGE_DEBUG_USER_DATA_DIR:-/tmp/edge-codex-debug}"
EDGE_APP="${EDGE_APP_PATH:-Microsoft Edge}"

echo "Launching Edge PWA debug window..."
echo "URL: $APP_URL"
echo "Remote debugging: http://127.0.0.1:$DEBUG_PORT"

open -na "$EDGE_APP" --args \
  --remote-debugging-port="$DEBUG_PORT" \
  --user-data-dir="$USER_DATA_DIR" \
  --app="$APP_URL"
