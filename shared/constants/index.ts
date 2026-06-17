/**
 * Cross-cutting constants shared by the client and the Workers.
 *
 * Barrel file. Keep it small; if it grows, split into focused modules under
 * `shared/constants/` and re-export them here so import sites stay stable.
 */

/**
 * Single duration governing a call's whole live window: how long the caller rings
 * before giving up AND how long an invite/response is treated as valid. These are
 * the same thing — an invite is meaningless once the caller has stopped ringing —
 * so the ring timeout and the envelope TTL share this one value.
 */
export const CALLING_TTL_SECONDS = 45;

/**
 * Milliseconds form of {@link CALLING_TTL_SECONDS}. Call signaling works in ms
 * (`Date.now()` deadlines), so this is the value most call code wants.
 */
export const CALLING_TTL_MS = CALLING_TTL_SECONDS * 1000;
