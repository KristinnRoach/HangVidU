#!/bin/zsh
# Script to kill leftover hanging processes from pnpm dev or pnpm dev:pwa

echo "Checking for leftover Vite, ngrok, and concurrently processes..."

# Find and kill Vite processes
VITE_PIDS=($(pgrep -f "vite"))
if [[ ${#VITE_PIDS[@]} -gt 0 ]]; then
  echo "Killing Vite processes: ${VITE_PIDS[@]}"
  kill -9 ${VITE_PIDS[@]}
else
  echo "No Vite processes found."
fi

# Find and kill ngrok processes
NGROK_PIDS=($(pgrep -f "ngrok"))
if [[ ${#NGROK_PIDS[@]} -gt 0 ]]; then
  echo "Killing ngrok processes: ${NGROK_PIDS[@]}"
  kill -9 ${NGROK_PIDS[@]}
else
  echo "No ngrok processes found."
fi

# Find and kill concurrently processes
CONCURRENTLY_PIDS=($(pgrep -f "concurrently"))
if [[ ${#CONCURRENTLY_PIDS[@]} -gt 0 ]]; then
  echo "Killing concurrently processes: ${CONCURRENTLY_PIDS[@]}"
  kill -9 ${CONCURRENTLY_PIDS[@]}
else
  echo "No concurrently processes found."
fi

echo "Cleanup complete."
