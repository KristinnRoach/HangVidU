/**
 * Cross-cutting constants shared by the client and the Workers.
 *
 * Barrel file. Keep it small; if it grows, split into focused modules under
 * `shared/constants/` and re-export them here so import sites stay stable.
 */

/** Seconds a call invite/response stays valid before it is treated as stale. */
export const CALLING_TTL_SECONDS = 60;

/**
 * Milliseconds form of {@link CALLING_TTL_SECONDS}. Call signaling works in ms
 * (`Date.now()` deadlines), so this is the value most call code wants.
 */
export const CALLING_TTL_MS = CALLING_TTL_SECONDS * 1000;
