#!/bin/bash

# Wait for ngrok to start and display the public URL
echo ""
echo "⏳ Waiting for ngrok to start..."

max_attempts=30
attempt=0

while [ $attempt -lt $max_attempts ]; do
  # Try to get the ngrok URL from the API
  url=$(curl -s http://localhost:4040/api/tunnels 2>/dev/null | grep -o '"public_url":"https://[^"]*"' | head -1 | cut -d'"' -f4)

  if [ ! -z "$url" ]; then
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🌐 NGROK URL (use this for mobile testing):"
    echo "   $url"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    break
  fi

  sleep 0.5
  attempt=$((attempt + 1))
done

if [ -z "$url" ]; then
  echo "⚠️  Could not get ngrok URL. Check http://localhost:4040"
fi
