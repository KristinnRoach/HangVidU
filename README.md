# HangVidU

A simple peer-to-peer video chat app with a watch-together mode.

## Try it now

**Live demo**: [https://kristinnroach.github.io/HangVidU/](https://kristinnroach.github.io/HangVidU/)

## Usage

1. Click "Start Chat" to generate a one-time video chat link
2. Share the link with one other person
3. Optional: Click "Switch to Watch Mode" to watch videos together
4. Experimental: In "Watch Mode" send a link to stream to your partner

## What it does

- **Video Chat**: Create a room, share the link, and video chat with one person
- **Watch Mode**: Both people paste the same video URL and watch in sync (play/pause/seek)
- WebRTC for video, Firebase for signaling

## Limitations

- Only works for 1-to-1 connections
- Firebase keys are exposed in client code (security rules will be added soon)
- No authentication or room persistence for now
- Watch mode requires both users to manually paste the same video URL

## Requirements

- Modern browser with WebRTC support (Chrome, Edge, Safari, Firefox)
- Camera/microphone permissions
- Internet connection.
