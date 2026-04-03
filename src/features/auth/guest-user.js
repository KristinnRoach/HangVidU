// src/auth/guest-user.js — persistent guest ID with TTL

let guestUserId = null;

const createNewGuestUserId = () => {
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    return crypto.randomUUID();
  }
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.getRandomValues === 'function'
  ) {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
  }
  return Math.random().toString(36).substring(2, 15);
};

const GUEST_STORAGE_KEY = 'guestUser';
const DEFAULT_GUEST_TTL_MS = 48 * 60 * 60 * 1000; // 48 hours

function loadGuestFromLocalStorage() {
  try {
    const raw =
      typeof localStorage !== 'undefined'
        ? localStorage.getItem(GUEST_STORAGE_KEY)
        : null;
    if (!raw) return null;
    const obj = JSON.parse(raw);
    if (!obj || typeof obj !== 'object' || !obj.id) return null;
    if (obj.expiresAt && Date.now() > obj.expiresAt) {
      try {
        localStorage.removeItem(GUEST_STORAGE_KEY);
      } catch (_) {}
      return null;
    }
    return obj;
  } catch (_) {
    return null;
  }
}

function persistGuestToLocalStorage(id, ttlMs = DEFAULT_GUEST_TTL_MS) {
  const now = Date.now();
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(
        GUEST_STORAGE_KEY,
        JSON.stringify({ id, createdAt: now, expiresAt: now + ttlMs }),
      );
    }
  } catch (_) {}
}

export function getOrCreateGuestId() {
  if (!guestUserId) {
    const stored = loadGuestFromLocalStorage();
    if (stored?.id) {
      guestUserId = stored.id;
    } else {
      guestUserId = createNewGuestUserId();
      persistGuestToLocalStorage(guestUserId);
    }
  }
  return guestUserId;
}
