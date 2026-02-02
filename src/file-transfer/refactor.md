# File Transfer Architecture Refactoring Plan

## Overview

This document outlines a refactoring plan to improve the file transfer architecture by:
1. Clarifying separation of concerns
2. Fixing abstraction leaks
3. Reorganizing folder structure for better cohesion
4. Making the protocol layer transport-agnostic

## Current Architecture Issues

### 1. **Abstraction Leak**
- `MessagesUI` receives `FileTransfer` directly instead of `FileTransport` interface
- Location: `src/webrtc/call-controller.js:549` (needs verification after file moves)
- Impact: UI layer knows about concrete implementation, breaking encapsulation

### 2. **Tight Coupling**
- `FileTransfer` constructor requires `dataChannel` (WebRTC-specific)
- Location: `src/file-transfer/file-transfer.js:13`
- Impact: Protocol layer is coupled to WebRTC, making it hard to swap transports

### 3. **Inconsistent Documentation**
- Comment says "100MB file size limit" but code allows 9000MB
- Location: `src/file-transfer/transport/webrtc-file-transport.js:17`
- Impact: Misleading documentation

### 4. **Scattered File Organization** ✅ COMPLETED
- ~~`FileTransfer` is in `src/file-transfer.js` (root level)~~ → Now in `src/file-transfer/file-transfer.js`
- ~~Transport classes are in `src/messaging/transports/`~~ → Now in `src/file-transfer/transport/`
- Related utilities are in `src/file-transfer/` directory
- Impact: Related code is now consolidated in one location

## Proposed Folder Structure

### Previous Structure
```text
src/
├── file-transfer.js                    # Main FileTransfer class
├── file-transfer/
│   ├── config.js
│   ├── chunk-processor.js
│   ├── file-assembler.js
│   └── ...
└── messaging/
    └── transports/
        ├── file-transport.js           # Base interface
        └── datachannel-file-transport.js  # (renamed to webrtc-file-transport.js)
```

### Current Structure ✅ COMPLETED
```text
src/
└── file-transfer/
    ├── file-transfer.js                 # Core protocol (transport-agnostic)
    ├── config.js
    ├── chunk-processor.js
    ├── file-assembler.js
    └── transport/
        ├── file-transport.js            # Base interface (moved from messaging/transports)
        └── webrtc-file-transport.js     # WebRTC implementation (moved from messaging/transports)
```

**Benefits:**
- All file transfer code in one location
- Clear separation: protocol vs transport
- Easier to discover and maintain
- Better cohesion

## Refactoring Steps

### Phase 1: Make FileTransfer Transport-Agnostic

**Goal:** Decouple `FileTransfer` from WebRTC DataChannel

**Changes to `src/file-transfer/file-transfer.js`:**

1. **Change constructor signature:**
   ```javascript
   // Before:
   constructor(dataChannel) {
     this.dataChannel = dataChannel;
   }

   // After:
   constructor(sendFunction) {
     // sendFunction: (data: string | ArrayBuffer) => void
     this.send = sendFunction;
   }
   ```

2. **Update sendFile method:**
   ```javascript
   // Before:
   this.dataChannel.send(JSON.stringify({...}));
   this.dataChannel.send(packet);
   if (this.dataChannel.readyState !== 'open') { ... }
   while (this.dataChannel.bufferedAmount > 256 * 1024) { ... }

   // After:
   this.send(JSON.stringify({...}));
   this.send(packet);
   // Remove DataChannel-specific checks (moved to transport layer)
   ```

3. **Remove DataChannel state checks:**
   - Move `readyState` validation to `WebRTCFileTransport`
   - Move `bufferedAmount` backpressure handling to `WebRTCFileTransport`

### Phase 2: Update WebRTCFileTransport

**Changes to `src/file-transfer/transport/webrtc-file-transport.js`:**

1. **Create send function wrapper:**
   ```javascript
   constructor(dataChannel) {
     super();
     
     if (!dataChannel) {
       throw new Error('WebRTCFileTransport requires a DataChannel');
     }

     this.dataChannel = dataChannel;
     
     // Create send function that handles DataChannel-specific concerns
     const sendFunction = (data) => {
       if (this.dataChannel.readyState !== 'open') {
         throw new Error('DataChannel not ready');
       }
       this.dataChannel.send(data);
     };
     
     // Create FileTransfer with transport-agnostic send function
     this.fileTransfer = new FileTransfer(sendFunction);
     
     this._setupMessageHandling();
   }
   ```

2. **Add backpressure handling:**
   ```javascript
   async sendFile(file, onProgress) {
     if (!this.isReady()) {
       throw new Error('DataChannel not ready');
     }

     // Wrap onProgress to include backpressure handling
     const wrappedProgress = async (progress) => {
       // Handle backpressure before reporting progress
       while (this.dataChannel.bufferedAmount > 256 * 1024) {
         await new Promise((resolve) => setTimeout(resolve, 10));
       }
       if (onProgress) {
         onProgress(progress);
       }
     };

     return this.fileTransfer.sendFile(file, wrappedProgress);
   }
   ```

3. **Update documentation:**
   ```javascript
   /**
    * Features:
    * - Chunked file transfer (64KB chunks)
    * - Progress tracking
    * - Backpressure handling
    * - 9GB file size limit (browser memory dependent)
    */
   ```

### Phase 3: Fix Abstraction Leak

**Changes to `src/webrtc/call-controller.js`:**

```javascript
// Before:
messagesUI.setFileTransfer(fileTransport.fileTransfer);

// After:
messagesUI.setFileTransfer(fileTransport);  // Pass FileTransport interface
```

**Changes to `src/components/messages/messages-ui.js`:**

```javascript
// Before:
function setFileTransfer(instance) {
  fileTransfer = instance;  // Receives FileTransfer directly
  // ...
}

// After:
function setFileTransfer(transport) {
  // transport is FileTransport interface
  if (!transport || typeof transport.isReady !== 'function') {
    throw new Error('setFileTransfer requires a FileTransport instance');
  }
  
  fileTransfer = transport;  // Store FileTransport, not FileTransfer
  
  if (fileTransfer && fileTransfer.isReady()) {
    showElement(attachBtn);
    
    // Use FileTransport interface methods
    fileTransfer.onFileReceived(async (file) => {
      // ... handle received file
    });
    
    fileTransfer.onReceiveProgress((progress) => {
      // ... handle progress
    });
  } else {
    hideElement(attachBtn);
  }
}
```

**Update file sending:**
```javascript
// Before:
await fileTransfer.sendFile(file, (progress) => { ... });

// After: (same, but now using FileTransport interface)
await fileTransfer.sendFile(file, (progress) => { ... });
```

### Phase 4: File Reorganization

**Step 1: Move `src/file-transfer.js` → `src/file-transfer/file-transfer.js`** ✅ COMPLETED

**Step 2: Move `src/messaging/transports/file-transport.js` → `src/file-transfer/transport/file-transport.js`** ✅ COMPLETED

**Step 3: Move `src/messaging/transports/datachannel-file-transport.js` → `src/file-transfer/transport/webrtc-file-transport.js`** ✅ COMPLETED

**Step 4: Update all imports:** ✅ COMPLETED

Files that import `FileTransfer`:
- `src/file-transfer/transport/webrtc-file-transport.js` → Updated to `../file-transfer.js`

Files that import `FileTransport`:
- `src/file-transfer/transport/webrtc-file-transport.js` → Updated to `./file-transport.js`

Files that import `WebRTCFileTransport`:
- `src/webrtc/call-controller.js` → Updated to `../file-transfer/transport/webrtc-file-transport.js`

## Updated Architecture

### Layer Responsibilities

```text
┌─────────────────────────────────────────┐
│  CallController (Orchestration)         │
│  - Creates transports                    │
│  - Wires components together             │
└──────────────┬──────────────────────────┘
               │
               ↓
┌─────────────────────────────────────────┐
│  WebRTCFileTransport                    │
│  (Transport Layer - WebRTC specific)    │
│  - Handles DataChannel lifecycle        │
│  - Manages backpressure                 │
│  - Routes messages to protocol          │
└──────────────┬──────────────────────────┘
               │ implements
               ↓
┌─────────────────────────────────────────┐
│  FileTransport (Interface)              │
│  (Abstraction - transport agnostic)     │
│  - sendFile(file, onProgress)           │
│  - onFileReceived(callback)             │
│  - onReceiveProgress(callback)          │
│  - isReady()                             │
│  - cleanup()                             │
└──────────────┬──────────────────────────┘
               │ used by
               ↓
┌─────────────────────────────────────────┐
│  MessagingController                    │
│  (Coordination Layer)                   │
│  - Manages file transport lifecycle     │
│  - Coordinates text + file messaging     │
└──────────────┬──────────────────────────┘
               │ provides to
               ↓
┌─────────────────────────────────────────┐
│  MessagesUI (Presentation Layer)         │
│  - Uses FileTransport interface only    │
│  - No knowledge of concrete types        │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  FileTransfer (Protocol Layer)          │
│  (Transport-agnostic)                    │
│  - Chunking logic                        │
│  - Packet assembly                       │
│  - Validation                            │
│  - Uses send function (not DataChannel)  │
└─────────────────────────────────────────┘
```

## Migration Checklist

### Code Changes
- [ ] Refactor `FileTransfer` constructor to accept send function
- [ ] Remove DataChannel-specific code from `FileTransfer`
- [ ] Update `WebRTCFileTransport` to provide send function wrapper
- [ ] Move backpressure handling to `WebRTCFileTransport`
- [ ] Fix `MessagesUI.setFileTransfer()` to accept `FileTransport` interface
- [ ] Update `CallController` to pass `FileTransport` instead of `FileTransfer`
- [ ] Update documentation comments (file size limit)

### File Moves ✅ COMPLETED
- [x] Move `src/file-transfer.js` → `src/file-transfer/file-transfer.js`
- [x] Move `src/messaging/transports/file-transport.js` → `src/file-transfer/transport/file-transport.js`
- [x] Move `src/messaging/transports/datachannel-file-transport.js` → `src/file-transfer/transport/webrtc-file-transport.js`

### Import Updates ✅ COMPLETED
- [x] Update imports in `webrtc-file-transport.js`
- [x] Update imports in `call-controller.js`
- [x] Update class name references (`DataChannelFileTransport` → `WebRTCFileTransport`)
- [x] Update file path references in comments
- [ ] Update imports in any test files (if needed)
- [x] Search codebase for any other references

### Testing
- [ ] Verify file transfer still works end-to-end
- [ ] Test with various file sizes
- [ ] Test backpressure handling
- [ ] Test error cases (disconnected DataChannel, etc.)
- [ ] Run existing unit tests
- [ ] Update test imports if needed

## Benefits After Refactoring

1. **Clear Separation of Concerns**
   - Protocol layer (FileTransfer) is transport-agnostic
   - Transport layer (WebRTCFileTransport) handles WebRTC specifics
   - UI layer (MessagesUI) uses only interface

2. **Better Testability**
   - Can test FileTransfer with mock send function
   - Can test transports independently
   - Easier to add new transport implementations

3. **Improved Maintainability**
   - All file transfer code in one directory
   - Clear dependencies and responsibilities
   - Easier to understand and modify

4. **Future Extensibility**
   - Easy to add WebSocket transport
   - Easy to add other transport mechanisms
   - Protocol layer doesn't need changes

## Additional Improvements

### File Size Limit Testing & Validation

**Goal:** Determine practical file size limits and test large file transfers (1GB+)

**Tasks:**
- [ ] Create integration tests for large file transfers (1GB, 2GB, 5GB)
- [ ] Test in multiple browsers (Chrome, Firefox, Safari)
- [ ] Measure and document:
  - Transfer time and throughput (MB/s)
  - Memory usage (before/during/after transfer)
  - Browser stability (crashes, freezes, timeouts)
  - Progress callback frequency and performance
- [ ] Determine practical limits per browser:
  - Maximum reliable file size
  - Recommended file size limits for good UX
  - When to warn users about large files
- [ ] Test file generation strategy:
  - Use sparse files or pattern-based generation to avoid using actual disk space
  - Generate chunks on-demand for very large test files
- [ ] Document findings and update `MAX_FILE_SIZE` constant if needed

**Test Implementation Notes:**
- Use Vitest browser mode for testing (real browser APIs)
- Create test files programmatically without using actual disk space
- Monitor memory usage via DevTools/performance APIs
- Test with network throttling to simulate real-world conditions

### Cleanup & Memory Management

**Goal:** Properly clean up file references and blob URLs to prevent memory leaks

**Current Issues:**
- Blob URLs not revoked when watch-together is used
- `receivedFile` in `MessagesUI` never cleared
- `sentFiles` Map grows indefinitely
- No cleanup on call end for file references

**Tasks:**
- [ ] Revoke blob URLs when:
  - Watch mode exits
  - Call ends
  - Component unmounts
  - User navigates away
- [ ] Clear `receivedFile` reference:
  - On call end in `CallController.cleanupCall()`
  - In `MessagesUI.reset()`
  - When new file is received (replace previous)
- [ ] Clear `sentFiles` Map:
  - On call end
  - In `MessagesUI.reset()`
  - Implement size limit with LRU eviction (optional)
- [ ] Add cleanup in `FileTransfer`:
  - Clear `receivedChunks` and `fileMetadata` on cleanup
  - Revoke any blob URLs created during transfer
- [ ] Add cleanup hooks:
  - `CallController.cleanupCall()` should trigger file cleanup
  - `MessagesUI.reset()` should clear all file references
  - Page unload handler should clean up blob URLs

**Implementation Locations:**
- `src/components/messages/messages-ui.js` - Clear file references
- `src/webrtc/call-controller.js` - Trigger cleanup on call end
- `src/file-transfer/file-transfer.js` - Add cleanup method
- `src/firebase/watch-sync.js` - Revoke blob URLs on watch mode exit

### IndexedDB Integration for Large Files

**Goal:** Store large files in IndexedDB instead of memory to avoid memory pressure

**Current State:**
- All files stored in memory as `File`/`Blob` objects
- Large files (>1GB) can cause memory issues
- No persistence - files lost on page reload

**Tasks:**
- [ ] Research IndexedDB storage limits per browser
- [ ] Design storage strategy:
  - When to use IndexedDB vs memory (file size threshold?)
  - How to stream chunks to IndexedDB during receive
  - How to read from IndexedDB for playback/download
- [ ] Implement IndexedDB storage layer:
  - Store file metadata (name, size, mimeType, timestamp)
  - Store file chunks or full file in IndexedDB
  - Create blob URLs from IndexedDB data
- [ ] Add cleanup policy:
  - Auto-delete files after X hours/days
  - Manual cleanup option
  - Respect browser storage quotas
- [ ] Update file transfer flow:
  - Option 1: Stream chunks directly to IndexedDB during receive
  - Option 2: Store in memory, then move to IndexedDB after assembly
  - Consider progressive loading for watch-together (start at 25% downloaded)
- [ ] Update watch-together to work with IndexedDB:
  - Load video from IndexedDB if available
  - Fallback to memory if IndexedDB unavailable
  - Handle IndexedDB quota exceeded errors gracefully

**Considerations:**
- IndexedDB has ~50MB limit in some browsers (may need to request quota)
- File System API (Chrome) might be better for very large files
- Need to handle browser compatibility
- May need user permission for persistent storage

**Implementation Priority:**
- Phase 1: Add IndexedDB storage for files >100MB
- Phase 2: Stream chunks directly to IndexedDB
- Phase 3: Progressive loading for watch-together

## Notes

- The refactoring maintains backward compatibility at the API level (FileTransport interface)
- No changes needed to how file transfer is used in the application
- The protocol (chunking, assembly) remains unchanged
- Only the architecture and organization improve
