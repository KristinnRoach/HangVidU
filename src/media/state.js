let remoteStream = null;
let localStream = null;
let localVideoOnlyStream = null;

// ============================================================================
// REMOTE STREAM STATE
// ============================================================================

export function getRemoteStream(logNullError = true) {
  if (!remoteStream || !(remoteStream instanceof MediaStream)) {
    if (logNullError) {
      console.error('Invalid remote MediaStream accessed:', remoteStream);
    }
    return null;
  }
  return remoteStream;
}

export function setRemoteStream(newStream) {
  remoteStream = newStream;
}

export function cleanupRemoteStream() {
  if (remoteStream) {
    remoteStream.getTracks().forEach((track) => track.stop());
    remoteStream = null;
  }
}

// ============================================================================
// LOCAL STREAM STATE
// ============================================================================

export function getLocalStream(logNullError = true) {
  if (!localStream || !(localStream instanceof MediaStream)) {
    if (logNullError) {
      console.error('Invalid local MediaStream accessed:', localStream);
      console.error('Call createLocalStream() before accessing local stream.');
    }
    return null;
  }
  return localStream;
}

export function setLocalStream(newStream) {
  localStream = newStream;
}

export function cleanupLocalStream() {
  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
    localStream = null;
  }
}

// ============================================================================
// VIDEO-ONLY STREAM STATE (for local preview to avoid echo)
// ============================================================================

export function getLocalVideoOnlyStream() {
  return localVideoOnlyStream;
}

export function setLocalVideoOnlyStream(newStream) {
  localVideoOnlyStream = newStream;
}

export function cleanupLocalVideoOnlyStream() {
  // Note: videoOnlyStream is a derived stream, so we don't stop tracks
  // The tracks belong to localStream. We just clear the reference.
  if (localVideoOnlyStream) {
    localVideoOnlyStream = null;
  }
}

// ============================================================================
// CLEANUP ALL STREAMS
// ============================================================================

export function cleanupAllStreams() {
  cleanupLocalStream();
  cleanupRemoteStream();
  cleanupLocalVideoOnlyStream();
}
