# Watch Together MVP Roadmap

## Overview
Integrate P2P file transfer + synchronized video playback into your existing messaging app. Users can share movie files and watch together in real-time with progressive download (start watching at 25% downloaded).

---

## Phase 1: Foundation (Days 1–2)

### Step 1.1: Create Watch Session Data Model
- Add Firebase RTDB structure:
  ```
  /watch-sessions/{sessionId}
    - initiatorId: string
    - recipientId: string
    - fileName: string
    - fileSize: number
    - createdAt: timestamp
    - status: 'pending' | 'downloading' | 'ready' | 'playing'
  
  /watch-playback/{sessionId}
    - isPlaying: boolean
    - currentTime: number (seconds)
    - duration: number
    - lastUpdateAt: timestamp
    - lastUpdateBy: userId
  ```

### Step 1.2: Add File Transfer Data Channel
- Extend your existing WebRTC peer connection to create a dedicated data channel for file transfer
- Label: `'file-transfer'`
- Ordered: `true`
- Add metadata channel for transfer progress/status:
  ```javascript
  const fileDataChannel = peerConnection.createDataChannel('file-transfer', {
    ordered: true,
    maxPacketLifeTime: 3000
  });
  ```

### Step 1.3: Set Up Local Storage (Temporary Files)
- Decide storage backend:
  - **Web**: IndexedDB (limited ~50MB) or temporary downloads folder
  - **Electron**: `app.getPath('temp')` for temporary files
- Create utility: `getTempFilePath(fileName)` → returns safe path
- Add cleanup: Delete files 24 hours after session ends

---

## Phase 2: File Sending (Days 2–3)

### Step 2.1: File Selection & Validation
- Add file picker to UI (or drag-drop)
- Validate:
  - File size (warn if >2GB, max 5GB for MVP)
  - Video format (check mimetype: video/mp4, video/webm, etc.)
  - Disk space on recipient's device

### Step 2.2: Send File Metadata
- Before transfer begins, send metadata via Firebase:
  ```javascript
  {
    type: 'file-transfer-init',
    fileName: 'movie.mp4',
    fileSize: 1234567890,
    fileHash: 'sha256-xxx', // For integrity check
    chunkSize: 65536
  }
  ```
- Recipient acknowledges & creates watch session

### Step 2.3: Chunk-Based Transfer via Data Channel
- Split file into 64KB chunks
- Send chunks sequentially:
  ```javascript
  const chunkSize = 64 * 1024;
  let offset = 0;
  
  const sendChunk = () => {
    if (offset < file.size) {
      const chunk = file.slice(offset, offset + chunkSize);
      chunk.arrayBuffer().then(buffer => {
        fileDataChannel.send(buffer);
        offset += chunkSize;
        updateTransferProgress(offset / file.size);
        sendChunk();
      });
    } else {
      fileDataChannel.send(JSON.stringify({ type: 'transfer-complete' }));
    }
  };
  
  fileDataChannel.onopen = sendChunk;
  ```

### Step 2.4: Add Transfer Progress UI
- Show progress bar: `[████░░░░░] 40% • 2.3 MB/s • ETA 5m 12s`
- Allow pause/resume (optional for MVP)
- Show transfer status: "Connecting...", "Transferring...", "Complete"

---

## Phase 3: File Reception & Buffering (Days 3–4)

### Step 3.1: Receive & Assemble Chunks
- Collect incoming chunks in memory (or stream to disk for large files)
- Track bytes received in real-time
- Update Firebase progress:
  ```javascript
  updateDoc(doc(db, 'watch-sessions', sessionId), {
    status: 'downloading',
    bytesDownloaded: totalReceived
  });
  ```

### Step 3.2: Implement Progressive Buffering
- Define buffer threshold: **25% of file size**
- Once threshold reached:
  - Create blob from buffered chunks
  - Generate temporary object URL
  - Unlock "Play" button in UI
  - Continue downloading in background

### Step 3.3: Handle Download Stalls
- Monitor download speed every 5 seconds
- If speed drops to 0 for >10s, pause playback with notification: "Waiting for download..."
- Resume when buffer refills to 25%

### Step 3.4: Save to Temp Storage
- As chunks arrive, write to disk (for large files, don't hold everything in memory)
- Use OS temp directory (cleans up automatically)
- Verify integrity with hash after transfer completes

---

## Phase 4: Synchronized Playback (Days 4–5)

### Step 4.1: Create Video Player Component
- Use `<video>` element with controls
- Attach to DOM once file is ready
- Bind to Firebase real-time updates

### Step 4.2: Implement Real-Time Sync Logic
- Listen to `/watch-playback/{sessionId}` on Firebase
- Every 500ms, check for remote changes:
  ```javascript
  onSnapshot(doc(db, 'watch-playback', sessionId), (snap) => {
    const { isPlaying, currentTime, lastUpdateBy } = snap.data();
    
    // Ignore self-updates
    if (lastUpdateBy === userId) return;
    
    // Sync playback state
    if (isPlaying && video.paused) video.play();
    if (!isPlaying && !video.paused) video.pause();
    
    // Sync time (with 500ms tolerance to avoid jitter)
    if (Math.abs(video.currentTime - currentTime) > 0.5) {
      video.currentTime = currentTime;
    }
  });
  ```

### Step 4.3: Send Local Changes to Firebase
- Emit play/pause/seek events:
  ```javascript
  video.addEventListener('play', () => {
    updateDoc(doc(db, 'watch-playback', sessionId), {
      isPlaying: true,
      currentTime: video.currentTime,
      lastUpdateAt: serverTimestamp(),
      lastUpdateBy: userId
    });
  });
  
  video.addEventListener('pause', () => {
    updateDoc(doc(db, 'watch-playback', sessionId), {
      isPlaying: false,
      currentTime: video.currentTime,
      lastUpdateAt: serverTimestamp(),
      lastUpdateBy: userId
    });
  });
  
  video.addEventListener('seeked', () => {
    updateDoc(doc(db, 'watch-playback', sessionId), {
      currentTime: video.currentTime,
      lastUpdateAt: serverTimestamp(),
      lastUpdateBy: userId
    });
  });
  ```

### Step 4.4: Handle Download Lag
- If User A is ahead of User B's download, limit playback:
  ```javascript
  const maxPlayheadTime = (bytesDownloaded / fileSize) * duration;
  if (video.currentTime > maxPlayheadTime) {
    video.currentTime = maxPlayheadTime;
    video.pause();
  }
  ```
- Resume when download catches up

---

## Phase 5: UI & Integration (Days 5–6)

### Step 5.1: Add "Start Watch Session" Button
- In messaging interface, add: "Share a movie"
- Opens file picker or shows "Initiate watch session" modal
- Sends Firebase invitation to recipient

### Step 5.2: Create Watch Session Screen
- Layout:
  - Video player (top 70%)
  - Transfer progress / playback info (bottom 30%)
  - Recipient status: "Downloading 45%...", "Ready to play", "Watching with you"

### Step 5.3: Session Lifecycle UI
- States:
  1. **Pending**: Waiting for recipient to accept → "Waiting for [name]..."
  2. **Downloading**: Show progress + ETA
  3. **Ready**: Both have file → "Ready to start"
  4. **Playing**: Synced video + pause buttons
  5. **Complete**: "Session ended" + option to save file or delete

### Step 5.4: Integrate into Messaging App
- Add tab/button in chat interface: "Watch Together"
- Show active watch sessions in sidebar
- Add quick action: "Share movie with [name]"

---

## Phase 6: Polish & Error Handling (Days 6–7)

### Step 6.1: Network Error Handling
- Data channel disconnects → Pause playback, show "Connection lost"
- Firebase connection lost → Show offline banner, queue updates
- Retry logic with exponential backoff

### Step 6.2: Edge Cases
- User closes tab mid-transfer → Clean up chunks, notify peer
- File too large for storage → Show warning, allow skip
- Unsupported video codec → Warn user, allow continue anyway
- Recipient declines → Clear session, notify sender

### Step 6.3: Performance Optimization
- Lazy load video component (only when session active)
- Debounce sync updates (max 1 update per 250ms)
- Implement garbage collection for old sessions (>7 days)

### Step 6.4: Testing
- Test with different file sizes (10MB, 100MB, 1GB)
- Test network interruptions (pause download, resume)
- Test lag scenarios (slow upload, slow download)
- Test cross-browser (Chrome, Firefox, Safari if applicable)

---

## Implementation Order (TL;DR)

1. **Firebase schema** + data channel setup (Day 1)
2. **File chunking & sending** (Days 2–3)
3. **Progressive download & buffering** (Days 3–4)
4. **Sync playback logic** (Days 4–5)
5. **UI & integration** (Days 5–6)
6. **Error handling & polish** (Days 6–7)

**MVP Target: ~7 days of focused work**

---

## Optional Future Enhancements
- [ ] Save watched files locally (with user consent)
- [ ] Resume interrupted transfers
- [ ] Support for subtitles/metadata
- [ ] Playlist support (queue multiple movies)
- [ ] Watch history & recommendations
- [ ] Throttle upload/download speed (for bandwidth control)
- [ ] Support for streaming URLs (via HLS/DASH)

---

## Success Criteria
- ✅ User A selects file → initiates watch session
- ✅ User B receives invite, accepts
- ✅ File transfers via WebRTC data channel with progress visibility
- ✅ Both can start watching once 25% downloaded
- ✅ Playback syncs in real-time (max ±500ms drift)
- ✅ Download continues in background until complete
- ✅ Both users can pause/play/seek in sync
- ✅ Session ends gracefully, temp files cleaned up