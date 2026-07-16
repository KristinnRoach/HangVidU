// Wake signals for reconnecting sockets. On iOS PWA resume the network stack
// is briefly down, so early reconnect attempts fail and exponential backoff
// stretches the next try — potentially past a call invite's TTL. Foreground
// (`visibilitychange` → visible) and `online` are the moments connectivity
// plausibly just returned, so subscribers collapse their backoff wait then.
export function subscribeToWakeSignals(onWake: () => void): () => void {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return () => {};
  }
  const handleVisibility = () => {
    if (document.visibilityState === 'visible') onWake();
  };
  document.addEventListener('visibilitychange', handleVisibility);
  window.addEventListener('online', onWake);
  return () => {
    document.removeEventListener('visibilitychange', handleVisibility);
    window.removeEventListener('online', onWake);
  };
}
