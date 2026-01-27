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
  call: [200, 100, 200, 100, 200], // Urgent: triple pulse for incoming calls
  message: [200], // Single short pulse for messages
  default: [200], // Single short pulse (fallback)
};
