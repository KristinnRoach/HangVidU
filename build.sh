#!/bin/bash

echo "Building HangVidU for all platforms..."

mkdir -p dist

# Windows
GOOS=windows GOARCH=amd64 go build -ldflags="-s -w" -o dist/HangVidU-Windows.exe server.go
echo "✅ Windows build complete"

# Mac Intel
GOOS=darwin GOARCH=amd64 go build -ldflags="-s -w" -o dist/HangVidU-Mac-Intel server.go
echo "✅ Mac Intel build complete"

# Mac Apple Silicon
GOOS=darwin GOARCH=arm64 go build -ldflags="-s -w" -o dist/HangVidU-Mac-M1 server.go
echo "✅ Mac M1/M2/M3 build complete"

# Linux
GOOS=linux GOARCH=amd64 go build -ldflags="-s -w" -o dist/HangVidU-Linux server.go
echo "✅ Linux build complete"

echo ""
echo "🎉 All builds complete! Check the dist/ folder"