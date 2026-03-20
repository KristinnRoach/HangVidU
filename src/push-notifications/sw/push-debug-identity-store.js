const PUSH_DEBUG_IDENTITY_CACHE = 'push-debug-identity-v1';
const PUSH_DEBUG_IDENTITY_PATH = '/__push_debug_identity__';

function getFallbackIdentity() {
  return {
    userId: null,
    displayName: 'unknown-user',
  };
}

export async function persistPushDebugIdentity(identity) {
  const cache = await caches.open(PUSH_DEBUG_IDENTITY_CACHE);
  const request = new Request(PUSH_DEBUG_IDENTITY_PATH);
  await cache.put(
    request,
    new Response(JSON.stringify(identity || {}), {
      headers: { 'Content-Type': 'application/json' },
    }),
  );
}

export async function readPushDebugIdentity() {
  try {
    const cache = await caches.open(PUSH_DEBUG_IDENTITY_CACHE);
    const response = await cache.match(new Request(PUSH_DEBUG_IDENTITY_PATH));

    if (!response) {
      return getFallbackIdentity();
    }

    const identity = await response.json().catch(() => ({}));
    return {
      userId: identity.userId || null,
      displayName: identity.displayName || identity.userId || 'unknown-user',
      syncedAt: identity.syncedAt || null,
    };
  } catch (error) {
    console.warn('[SW] Failed to read push debug identity:', error);
    return getFallbackIdentity();
  }
}
