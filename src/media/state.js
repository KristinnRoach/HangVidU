let localStream = null;

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
