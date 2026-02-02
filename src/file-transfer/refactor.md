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
- Location: `src/webrtc/call-controller.js:549`
- Impact: UI layer knows about concrete implementation, breaking encapsulation

### 2. **Tight Coupling**
- `FileTransfer` constructor requires `dataChannel` (WebRTC-specific)
- Location: `src/file-transfer.js:13`
- Impact: Protocol layer is coupled to WebRTC, making it hard to swap transports

### 3. **Inconsistent Documentation**
- Comment says "100MB file size limit" but code allows 9000MB
- Location: `src/messaging/transports/datachannel-file-transport.js:17`
- Impact: Misleading documentation

### 4. **Scattered File Organization**
- `FileTransfer` is in `src/file-transfer.js` (root level)
- Transport classes are in `src/messaging/transports/`
- Related utilities are in `src/file-transfer/` directory
- Impact: Related code is spread across multiple locations

## Proposed Folder Structure

### Current Structure
```
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
        └── datachannel-file-transport.js
```

### Proposed Structure
```
src/
└── file-transfer/
    ├── file-transfer.js                 # Core protocol (transport-agnostic)
    ├── config.js
    ├── chunk-processor.js
    ├── file-assembler.js
    ├── file-transport.js                # Base interface (moved from messaging/transports)
    └── datachannel-file-transport.js    # WebRTC implementation (moved from messaging/transports)
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
   - Move `readyState` validation to `DataChannelFileTransport`
   - Move `bufferedAmount` backpressure handling to `DataChannelFileTransport`

### Phase 2: Update DataChannelFileTransport

**Changes to `src/file-transfer/datachannel-file-transport.js`:**

1. **Create send function wrapper:**
   ```javascript
   constructor(dataChannel) {
     super();
     
     if (!dataChannel) {
       throw new Error('DataChannelFileTransport requires a DataChannel');
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

**Step 1: Move `src/file-transfer.js` → `src/file-transfer/file-transfer.js`**

**Step 2: Move `src/messaging/transports/file-transport.js` → `src/file-transfer/file-transport.js`**

**Step 3: Move `src/messaging/transports/datachannel-file-transport.js` → `src/file-transfer/datachannel-file-transport.js`**

**Step 4: Update all imports:**

Files that import `FileTransfer`:
- `src/messaging/transports/datachannel-file-transport.js` → Update to `./file-transfer.js`

Files that import `FileTransport`:
- `src/messaging/transports/datachannel-file-transport.js` → Update to `./file-transport.js`
- `src/messaging/messaging-controller.js` → Update to `../file-transfer/file-transport.js`

Files that import `DataChannelFileTransport`:
- `src/webrtc/call-controller.js` → Update to `../file-transfer/datachannel-file-transport.js`

## Updated Architecture

### Layer Responsibilities

```
┌─────────────────────────────────────────┐
│  CallController (Orchestration)         │
│  - Creates transports                    │
│  - Wires components together             │
└──────────────┬──────────────────────────┘
               │
               ↓
┌─────────────────────────────────────────┐
│  DataChannelFileTransport               │
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
- [ ] Update `DataChannelFileTransport` to provide send function wrapper
- [ ] Move backpressure handling to `DataChannelFileTransport`
- [ ] Fix `MessagesUI.setFileTransfer()` to accept `FileTransport` interface
- [ ] Update `CallController` to pass `FileTransport` instead of `FileTransfer`
- [ ] Update documentation comments (file size limit)

### File Moves
- [ ] Move `src/file-transfer.js` → `src/file-transfer/file-transfer.js`
- [ ] Move `src/messaging/transports/file-transport.js` → `src/file-transfer/file-transport.js`
- [ ] Move `src/messaging/transports/datachannel-file-transport.js` → `src/file-transfer/datachannel-file-transport.js`

### Import Updates
- [ ] Update imports in `datachannel-file-transport.js`
- [ ] Update imports in `messaging-controller.js`
- [ ] Update imports in `call-controller.js`
- [ ] Update imports in any test files
- [ ] Search codebase for any other references

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
   - Transport layer (DataChannelFileTransport) handles WebRTC specifics
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

## Notes

- The refactoring maintains backward compatibility at the API level (FileTransport interface)
- No changes needed to how file transfer is used in the application
- The protocol (chunking, assembly) remains unchanged
- Only the architecture and organization improve
