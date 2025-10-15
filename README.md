# HangVidU

A simple peer-to-peer video chat app with a watch-together mode.

## Try it now

**Live demo**: [https://kristinnroach.github.io/HangVidU/](https://kristinnroach.github.io/HangVidU/)

## Usage

1. Click "Start Chat" to generate a one-time video chat link
2. Share the link with a partner
3. Partner opens the link in a browser to start video chat
4. Optional: Click "Switch to Watch Mode" to watch videos together
5. In "Watch Mode" send a link to stream to your partner

## What it does

- **Video Chat**: Create a room, share the link, and video chat with one person
- **Watch Mode**: Paste a video URL and watch it in sync (play/pause/seek)
- WebRTC for video, Firebase for signaling

## Limitations

- Only works for 1-to-1 connections for now
- No authentication or room persistence for now

## Requirements

- Modern browser with WebRTC support (Chrome, Edge, Safari, Firefox)
- Camera/microphone permissions
- Internet connection
