#!/bin/sh
set -e
NODE_BIN="$(node -e 'process.stdout.write(process.execPath)')"
NODE_DIR="$(dirname "$NODE_BIN")"
"$NODE_DIR/npm" install --prefix "$(dirname "$0")/../functions"
