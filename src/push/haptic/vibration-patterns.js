/**
 * Vibration Patterns Configuration
 *
 * Centralized vibration patterns for haptic feedback in notifications.
 * Used by service worker for push notifications.
 *
 * Pattern format: [vibrate_ms, pause_ms, vibrate_ms, pause_ms, ...]
 *
 * Browser support:
 * - Chrome/Edge: Full support (desktop + mobile)
 * - Firefox: Mobile only
 * - Safari: Limited/no support
 *
 * Keep this file dependency-free for easy import from service worker.
 */

export const VIBRATION_PATTERNS = {
  incoming_call: [700, 100, 100, 700, 100, 100, 700, 100, 100],
  call: [700, 100, 100, 700, 100, 100, 700, 100, 100],
  missed_call: [200, 100, 200],
  message: [200],
  default: [200],
};
