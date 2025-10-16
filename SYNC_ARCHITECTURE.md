# HangVidU Sync Architecture Documentation

## Current Implementation Status (January 2025)

### ✅ PRODUCTION: Firebase-Based Sync

- **File**: `src/features/watch2gether/watch-sync-legacy.js`
- **Status**: Fully functional, production-ready
- **Features**:
  - Video URL sharing and acceptance
  - Play/pause/seek synchronization
  - YouTube search integration
  - Works with or without active video calls

### ❌ EXPERIMENTAL: WebRTC-Based Sync

- **File**: `src/features/watch2gether/watch-sync.js`
- **Status**: Non-functional, abandoned
- **Issues**:
  - Data channel establishment failures
  - Transport errors preventing all sync operations
  - Complex state management causing reliability issues

## Architecture Decision

**Firebase will continue to be used for ALL signaling and sync operations:**

1. **Video Chat Signaling**: Firebase Realtime Database

   - WebRTC offers, answers, ICE candidates
   - Room creation and management
   - Connection status tracking

2. **Watch-Sync Operations**: Firebase Realtime Database

   - Video URL sharing between partners
   - Play/pause/seek event synchronization
   - Real-time status updates

3. **WebRTC Usage**: Limited to media streams only
   - Peer-to-peer video and audio transmission
   - No data channels for sync operations

## Configuration

In `src/config/api-config.js`:

```javascript
sync: {
  useWebRTC: false, // DO NOT CHANGE - WebRTC sync is broken
}
```

## Why Firebase Over WebRTC for Sync?

### Firebase Advantages

- ✅ **Reliability**: Consistent performance across browsers
- ✅ **Simplicity**: Straightforward event-based architecture
- ✅ **Debugging**: Easy to inspect data in Firebase console
- ✅ **Fallback**: Works even if WebRTC peer connection has issues
- ✅ **Latency**: Acceptable for video sync operations (~100-300ms)

### WebRTC Disadvantages

- ❌ **Complexity**: Multiple layers (SyncManager, PlayerAdapter, Transport)
- ❌ **Reliability**: Data channel establishment is fragile
- ❌ **Debugging**: Difficult to troubleshoot connection issues
- ❌ **Dependencies**: Requires working WebRTC peer connection
- ❌ **Browser Support**: More edge cases and compatibility issues

## Future Considerations

The WebRTC sync code is preserved for potential future development, but is not recommended for production use. Any future WebRTC sync implementation would need to address:

1. Data channel reliability issues
2. Connection state management complexity
3. Error handling and retry logic
4. Cross-browser compatibility
5. Integration timing with player adapters

**Recommendation**: Focus development efforts on core application features rather than sync architecture optimization.
