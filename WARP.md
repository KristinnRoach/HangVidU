# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

HangVidU is a peer-to-peer video chat application with watch-together functionality. It uses WebRTC for video/audio streaming and Firebase Realtime Database for signaling between peers. The app supports 1-to-1 video calls and synchronized video watching.

## Development Commands

```bash
# Install dependencies (using pnpm)
pnpm install

# Start development server (opens at http://localhost:3000)
npm run dev

# Build for production (outputs to dist/ with /HangVidU/ base path for GitHub Pages)
npm run build

# Preview production build locally
npm run preview

# Run Playwright E2E tests
npm run test:e2e

# Run tests with UI
npm run test:e2e:ui

# Debug tests interactively
npm run test:e2e:debug
```

## Environment Setup

Before running locally, create a `.env` file with Firebase configuration (see `.env.example` for template):

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project.firebasedatabase.app
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## Architecture

### Core Components

**`src/app.js`** - Main application logic
- WebRTC peer connection management
- Firebase Realtime Database integration for signaling
- Room creation/joining with unique IDs
- Video chat and watch mode toggle
- Stream synchronization for watch-together feature
- Audio/video mute controls

**`src/pip.js`** - Picture-in-Picture functionality
- Document PiP support (Chrome/Edge) with custom UI
- Native video PiP fallback (Safari/Firefox)
- Floating window management with mute controls

**`index.html`** - Single page application UI
- Local and remote video elements
- Watch mode container with shared video player
- Control buttons for chat management
- Link sharing interface

### Key Features Implementation

**WebRTC Connection Flow:**
1. Initiator creates room, generates offer, stores in Firebase
2. Joiner retrieves offer, creates answer, stores in Firebase
3. ICE candidates exchanged through Firebase
4. Direct peer connection established

**Watch Mode Synchronization:**
- Video URL sharing through Firebase
- Play/pause/seek events synchronized
- Partner notification for shared videos
- Manual acceptance required for security

**Firebase Structure:**
```
rooms/
  {roomId}/
    offer: {type, sdp}
    answer: {type, sdp}
    callerCandidates/
    calleeCandidates/
    stream/
      url: string
      playing: boolean
      time: number
```

## Important Considerations

- Only supports 1-to-1 connections (peer-to-peer limitation)
- Firebase configuration exposed in client (add security rules for production)
- Vite base path configured for GitHub Pages deployment (`/HangVidU/`)
- Watch mode requires both users to manually accept shared URLs
- Picture-in-Picture has browser-specific implementations
- Playwright tests configured but test directory is empty
- Prefer simple utility functions over classes unless classes provide particular value

## Current Development Focus

From TODO.md:
- File transfer and storage options (GitHub CDN or WebRTC + IndexedDB)
- Enhanced Document PiP with mute button on floating window
- Video effects implementation
- Stremio integration exploration (Electron download addon)

## Deployment

The app is deployed to GitHub Pages at: https://kristinnroach.github.io/HangVidU/

Build and deployment use the `/HangVidU/` base path configured in `vite.config.js`.