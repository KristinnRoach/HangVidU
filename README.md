## Environment Variables (Vite)

If you are running locally with Vite, you must set your Firebase configuration in a `.env` file at the project root. All variables must be prefixed with `VITE_` to be exposed to the client:

```
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project.firebasedatabase.app
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

See `.env.example` for a template.

# HangVidU

A simple peer-to-peer video chat app with a watch-together mode.

## Try it now

**Live demo**: [https://kristinnroach.github.io/HangVidU/](https://kristinnroach.github.io/HangVidU/)

## Usage

1. Click "Generate Video Chat Link"
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
- Internet connection
