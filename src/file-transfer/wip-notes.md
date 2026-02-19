## Note some of the below might be outdated

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

- `src/ui/components/messages/messages-ui.js` - Clear file references
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
