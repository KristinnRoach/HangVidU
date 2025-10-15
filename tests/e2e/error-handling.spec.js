// tests/e2e/error-handling.spec.js - Error handling and edge cases

import { test, expect } from '@playwright/test';
import { 
  setupTwoPeerConnection, 
  createVideoConnection, 
  cleanupConnection,
  mockMediaDevices 
} from '../helpers/test-utils.js';

test.describe('Error Handling', () => {
  test('should handle room not found error', async ({ browser }) => {
    const { page1, cleanup } = await setupTwoPeerConnection(browser);
    
    try {
      await mockMediaDevices(page1);
      
      // Try to join non-existent room
      await page1.goto('/?room=definitely-does-not-exist-12345');
      
      // Should show appropriate error message
      await expect(page1.locator('#status')).toContainText(/not found|error|failed/i, { timeout: 15000 });
      
      // Should not show connected state
      await expect(page1.locator('#status')).not.toContainText('Connected');
      
    } finally {
      await cleanup();
    }
  });

  test('should handle media permission denial', async ({ browser }) => {
    const { page1, cleanup } = await setupTwoPeerConnection(browser);
    
    try {
      // Mock permission denial
      await page1.addInitScript(() => {
        navigator.mediaDevices.getUserMedia = async () => {
          throw new DOMException('Permission denied', 'NotAllowedError');
        };
      });
      
      await page1.goto('/');
      await page1.click('#startChat');
      
      // Should show permission error
      await expect(page1.locator('#status')).toContainText(/permission|denied|allow/i, { timeout: 10000 });
      
      // Start chat button should remain enabled for retry
      await expect(page1.locator('#startChat')).toBeEnabled();
      
    } finally {
      await cleanup();
    }
  });

  test('should handle no media devices found', async ({ browser }) => {
    const { page1, cleanup } = await setupTwoPeerConnection(browser);
    
    try {
      // Mock no devices found
      await page1.addInitScript(() => {
        navigator.mediaDevices.getUserMedia = async () => {
          throw new DOMException('No devices found', 'NotFoundError');
        };
      });
      
      await page1.goto('/');
      await page1.click('#startChat');
      
      // Should show device error
      await expect(page1.locator('#status')).toContainText(/device|camera|microphone/i, { timeout: 10000 });
      
    } finally {
      await cleanup();
    }
  });

  test('should handle device busy error', async ({ browser }) => {
    const { page1, cleanup } = await setupTwoPeerConnection(browser);
    
    try {
      // Mock device busy
      await page1.addInitScript(() => {
        navigator.mediaDevices.getUserMedia = async () => {
          throw new DOMException('Device busy', 'NotReadableError');
        };
      });
      
      await page1.goto('/');
      await page1.click('#startChat');
      
      // Should show busy error
      await expect(page1.locator('#status')).toContainText(/busy|another|application/i, { timeout: 10000 });
      
    } finally {
      await cleanup();
    }
  });

  test('should handle connection timeout', async ({ browser }) => {
    const { page1, page2, cleanup } = await setupTwoPeerConnection(browser);
    
    try {
      await mockMediaDevices(page1);
      await mockMediaDevices(page2);
      
      // Mock Firebase to simulate connection issues
      await page1.addInitScript(() => {
        // Override Firebase to simulate slow/failing connection
        window.firebase = {
          database: () => ({
            ref: () => ({
              set: () => new Promise(() => {}), // Never resolves
              on: () => {},
              off: () => {},
              once: () => new Promise(() => {}),
              child: () => ({
                set: () => new Promise(() => {}),
                on: () => {},
                off: () => {},
                push: () => new Promise(() => {})
              })
            })
          })
        };
      });
      
      await page1.goto('/');
      await page1.click('#startChat');
      
      // Should eventually timeout or show error
      // Note: This test might need adjustment based on actual timeout implementation
      await page1.waitForTimeout(5000);
      
      // Should not show "Connected" status
      await expect(page1.locator('#status')).not.toContainText('Connected');
      
    } finally {
      await cleanup();
    }
  });

  test('should handle invalid room ID format', async ({ browser }) => {
    const { page1, cleanup } = await setupTwoPeerConnection(browser);
    
    try {
      await mockMediaDevices(page1);
      
      // Try various invalid room ID formats
      const invalidRoomIds = [
        'a', // too short
        'room with spaces',
        'room@with#special$chars',
        'x'.repeat(100) // too long
      ];
      
      for (const roomId of invalidRoomIds) {
        await page1.goto(`/?room=${encodeURIComponent(roomId)}`);
        
        // Should handle gracefully, not crash
        await page1.waitForTimeout(2000);
        
        // Should show error or remain in safe state
        const status = await page1.locator('#status').textContent();
        expect(status).not.toContain('Connected');
      }
      
    } finally {
      await cleanup();
    }
  });

  test('should handle network disconnection during call', async ({ browser }) => {
    const { page1, page2, cleanup } = await setupTwoPeerConnection(browser);
    
    try {
      await mockMediaDevices(page1);
      await mockMediaDevices(page2);
      
      await createVideoConnection(page1, page2);
      
      // Simulate network disconnection on page2
      await page2.context().setOffline(true);
      
      // Page1 should eventually detect disconnection
      await expect(page1.locator('#status')).toContainText(/disconnect|lost|error/i, { timeout: 20000 });
      
      // Restore connection
      await page2.context().setOffline(false);
      
    } finally {
      await cleanupConnection(page1, page2);
      await cleanup();
    }
  });

  test('should handle page reload during call', async ({ browser }) => {
    const { page1, page2, cleanup } = await setupTwoPeerConnection(browser);
    
    try {
      await mockMediaDevices(page1);
      await mockMediaDevices(page2);
      
      const { roomId } = await createVideoConnection(page1, page2);
      
      // Reload page1
      await page1.reload();
      await mockMediaDevices(page1);
      
      // Should handle reload gracefully
      await page1.waitForTimeout(3000);
      
      // Should show appropriate state (not connected anymore)
      const status = await page1.locator('#status').textContent();
      expect(status).not.toContain('Connected');
      
      // Should be able to start new chat
      await expect(page1.locator('#startChat')).toBeEnabled();
      
    } finally {
      await cleanupConnection(page1, page2);
      await cleanup();
    }
  });
});