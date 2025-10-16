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

## Setup (for developers)

To run HangVidU locally with full functionality:

### 1. Clone and install dependencies

```bash
git clone https://github.com/KristinnRoach/HangVidU.git
cd HangVidU
pnpm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in the required values:

```bash
cp .env.example .env
```

### 3. Get a YouTube API key (optional, for search functionality)

1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project or select an existing one
3. Enable the "YouTube Data API v3"
4. Create credentials (API key)
5. **Configure API key restrictions** (important for security):
   - Go to the API key settings
   - Under "Application restrictions", select "HTTP referrers (web sites)"
   - Add these referrer patterns:
     ```
     http://localhost:5173/*
     http://127.0.0.1:5173/*
     https://kristinnroach.github.io/*
     ```
6. Add the API key to your `.env` file:
   ```
   VITE_YOUTUBE_API_KEY=your_actual_api_key_here
   ```

**Notes**:

- Without a YouTube API key, the search functionality won't work, but you can still paste YouTube URLs directly
- YouTube API has daily quotas - if exceeded, search will fallback to manual URL input
- **If you get 403 errors**: Check that the YouTube Data API v3 is enabled AND that your API key has the correct HTTP referrer restrictions configured
- For production deployment, make sure to add your production domain to the API key restrictions

### 4. Run the development server

```bash
pnpm dev
```

## Requirements

- Modern browser with WebRTC support (Chrome, Edge, Safari, Firefox)
- Camera/microphone permissions
- Internet connection
