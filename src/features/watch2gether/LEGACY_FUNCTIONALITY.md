# Firebase Watch-Sync Implementation Documentation

**IMPORTANT: Firebase is the ONLY working sync implementation. The WebRTC sync system is experimental and non-functional.**

This document describes the Firebase-based watch-sync functionality, which is the current production implementation.

## Current Working Features (Firebase Only)

### Core State Management

- `watchMode`: Boolean flag for watch mode vs video chat mode
- `isSyncing`: Prevents sync loops during local events
- `streamUrl`: Current stream URL being watched

### Public API Functions

#### Mode Management

- `toggleWatchMode()`: Switches between video chat and watch mode
- `getWatchMode()`: Returns current mode state

#### Stream Management

- `loadStream()`: Loads a video URL (YouTube or direct video)
- `setupWatchSync()`: Sets up Firebase listeners for sync events
- `getStreamUrl()` / `setStreamUrl()`: Stream URL getters/setters

### Sync Mechanism

#### Firebase Structure Used

```
rooms/{roomId}/stream/
├── url: string (video URL)
├── playing: boolean (play/pause state)
└── time: number (current playback time)
```

#### Sync Event Handling

1. **URL Sharing**: When partner shares a video, shows accept button
2. **Play/Pause Sync**: Listens for `playing` changes and syncs playback
3. **Seek Sync**: Listens for `time` changes and syncs position (>2s difference)
4. **Local Events**: Sends play/pause/seek events to Firebase with 1s debounce

#### YouTube Integration

- Uses existing `youtube.js` module for YouTube player management
- Handles YouTube player state changes via `onYouTubeStateChange()`
- Supports both YouTube URLs and direct video URLs

### Sync Loop Prevention

- Uses `isSyncing` flag with 1-second timeout
- Prevents local events from triggering during remote sync operations

### Error Handling

- Handles video play failures with user-friendly messages
- Shows visual feedback for sync status
- Graceful fallback for unsupported media

## Architecture Decision: Firebase vs WebRTC

**Current Status (January 2025):**

- **Firebase Sync**: ✅ WORKING - Production ready, reliable sync
- **WebRTC Sync**: ❌ NON-FUNCTIONAL - Data channel issues, transport errors
- **Firebase Signaling**: ✅ WORKING - Will continue using for video chat signaling

**Decision**: Continue using Firebase for both video chat signaling AND watch-sync functionality. The WebRTC refactor has been abandoned due to complexity and reliability issues.

## Implementation Status

- `watch-sync-legacy.js` → **Production implementation** (Firebase-based)
- `watch-sync.js` → **Experimental/broken** (WebRTC-based, do not use)
- Toggle available in `src/config/api-config.js` but should remain `useWebRTC: false`

## Files Involved in Original Implementation

- `src/features/watch2gether/watch-sync.js` (main sync logic)
- `src/features/watch2gether/youtube.js` (YouTube player integration)
- `src/storage/firebaseRealTimeDB.js` (Firebase connection)

## Testing the Legacy Implementation

To verify the backup works:

1. Temporarily rename current `watch-sync.js`
2. Copy `watch-sync-legacy.js` to `watch-sync.js`
3. Test basic sync between two browser tabs
4. Restore original file structure
