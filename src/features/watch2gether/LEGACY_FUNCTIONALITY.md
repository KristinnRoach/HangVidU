# Legacy Watch-Sync Functionality Documentation

This document describes the original watch-sync.js functionality before refactoring to use the new SyncManager and YouTubePlayerAdapter components.

## Current Working Features

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

## Known Limitations (Addressed by Refactor)

1. **Basic Sync Loop Prevention**: Simple timeout-based approach
2. **No Retry Logic**: Failed sync operations are not retried
3. **No Event Queuing**: Events lost if player not ready
4. **Limited Error Recovery**: Basic error handling only
5. **Tight Coupling**: Sync logic mixed with UI and player controls
6. **No Conflict Resolution**: No handling of simultaneous user actions

## Rollback Instructions

If the refactor causes issues, restore functionality by:

1. Copy `watch-sync-legacy.js` back to `watch-sync.js`
2. Ensure all imports in consuming modules still work
3. Test basic sync functionality between two browser instances

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
