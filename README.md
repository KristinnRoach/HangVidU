# HangVidU

A simple peer-to-peer video chat app with a watch-together mode.

## Try it now

**Live demo**: [https://yourusername.github.io/hangvidu](https://yourusername.github.io/hangvidu)

## Usage

1. Click "Generate Video Chat Link"
2. Share the link with one other person
3. Optional: Click "Switch to Watch Mode" to watch videos together
4. In "Watch Mode" send a link to stream to your partner

## What it does

- **Video Chat**: Create a room, share the link, and video chat with one person
- **Watch Mode**: Both people paste the same video URL and watch in sync (play/pause/seek)
- WebRTC for video, Firebase for signaling

## Limitations

- Only works for 1-to-1 connections
- Firebase keys are exposed in client code (security rules will be added soon)
- No authentication or room persistence for now
- Watch mode requires both users to manually paste the same video URL

## Dev/Local Setup

1. Replace Firebase config in `app.js` with your own (current keys are exposed)
2. Host the three files on any web server
3. Requires HTTPS for camera/mic access (localhost works for testing)

## Requirements

- Modern browser with WebRTC support
- Camera/microphone permissions
- Internet connection
