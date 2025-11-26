/**
 * PWA Update Testing Utility
 *
 * This module simulates PWA update notifications for testing purposes.
 * Use this to test update UI without deploying or rebuilding.
 *
 * Usage in browser console:
 *   window.testPWAUpdate()  // Show update notification
 *   window.testPWAUpdate(3000)  // Show after 3 seconds
 */

import { showUpdateNotification } from '../components/notifications/update-notification.js';

/**
 * Simulates a PWA update by triggering the update notification
 * @param {number} delay - Delay in milliseconds before showing notification
 */
export function simulatePWAUpdate(delay = 0) {
  console.info('[PWA Test] Simulating update...');

  // Mock updateSW function that simulates reload
  const mockUpdateSW = (reloadPage = false) => {
    console.info('[PWA Test] Update triggered, reload:', reloadPage);
    if (reloadPage) {
      // In a real update, this would reload with new SW
      console.info('[PWA Test] Would reload page now');
      console.info(
        '%c[PWA Test] Update Applied!',
        'color: #4CAF50; font-weight: bold',
        '\nIn production, the page would reload with the new version.'
      );
    }
  };

  setTimeout(() => {
    console.info('[PWA Test] Showing update notification...');
    showUpdateNotification(mockUpdateSW);
  }, delay);
}

// Expose to window for easy console testing
if (typeof window !== 'undefined') {
  window.testPWAUpdate = simulatePWAUpdate;
  console.info(
    '%c[PWA Test] Test utility loaded!',
    'color: #4CAF50; font-weight: bold',
    '\n\nQuick start:',
    '\n  • window.testPWAUpdate()     - Show update notification',
    '\n  • window.testPWAUpdate(3000)  - Show after 3 seconds',
    '\n  • Cmd+Shift+P (Mac) / Ctrl+Shift+P (Win/Linux) - Keyboard shortcut',
    '\n'
  );

  // Add keyboard shortcut for quick testing (Ctrl/Cmd + Shift + P for "PWA")
  window.addEventListener('keydown', (e) => {
    // Use e.code instead of e.key for better cross-platform compatibility
    // KeyP works regardless of keyboard layout
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'P' || e.code === 'KeyP')) {
      e.preventDefault();
      console.info('[PWA Test] Keyboard shortcut triggered!');
      simulatePWAUpdate();
    }
  });
}
