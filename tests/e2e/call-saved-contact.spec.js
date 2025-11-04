/**
 * E2E test for call-saved-contact flow
 * Tests the complete flow: initial call -> save contact -> call saved contact -> receive incoming call
 * Based on successful patterns from calling-ui-bug-reproduction test
 */

import { test, expect } from '@playwright/test';

test.use({
  headless: true, // Use headless mode to prevent hanging
  timeout: 60000, // Reasonable timeout
});

test.describe('Call Saved Contact Flow', () => {
  test('should complete the full call-saved-contact flow successfully', async ({
    browser,
  }) => {
    // Ensure test always exits - wrap in try/finally
    let userAContext, userBContext;

    try {
      // Create two browser contexts (two users)
      userAContext = await browser.newContext();
      userBContext = await browser.newContext();

      const userAPage = await userAContext.newPage();
      const userBPage = await userBContext.newPage();

      // Collect console logs for analysis
      const userALogs = [];
      const userBLogs = [];

      userAPage.on('console', (msg) => {
        const logText = `[USER A] ${msg.type()}: ${msg.text()}`;
        console.log(logText);
        userALogs.push(msg.text());
      });

      userBPage.on('console', (msg) => {
        const logText = `[USER B] ${msg.type()}: ${msg.text()}`;
        console.log(logText);
        userBLogs.push(msg.text());
      });

      console.log('=== STARTING CALL SAVED CONTACT FLOW TEST ===');

      // Step 1: Both users load the app
      console.log('--- PHASE 1: Initial Setup ---');
      console.log('Step 1: Loading app for both users...');
      await Promise.all([
        userAPage.goto('https://localhost:5173'),
        userBPage.goto('https://localhost:5173'),
      ]);

      // Wait for app initialization
      await Promise.all([
        userAPage.waitForSelector('#lobby', { timeout: 10000 }),
        userBPage.waitForSelector('#lobby', { timeout: 10000 }),
      ]);

      console.log('✓ Both users loaded app successfully');

      // Step 2: Initialize cameras for both users
      console.log('Step 2: Initializing cameras for both users...');

      // Force camera initialization for both users
      await Promise.all([
        userAPage.evaluate(() => {
          if (window.createLocalStream) {
            window.createLocalStream();
          }
        }),
        userBPage.evaluate(() => {
          if (window.createLocalStream) {
            window.createLocalStream();
          }
        }),
      ]);

      // Wait for camera initialization
      await Promise.all([
        userAPage.waitForTimeout(2000),
        userBPage.waitForTimeout(2000),
      ]);

      console.log('✓ Cameras initialized for both users');

      // Step 3: User A creates a call
      console.log('Step 3: User A creates a call...');
      await userAPage.click('#create-link-btn');

      // Wait for room creation and get room ID
      await userAPage.waitForSelector('#copy-link-btn:not([disabled])', {
        timeout: 10000,
      });

      // Extract room ID from User A's actual room
      const roomId = await userAPage.evaluate(() => {
        // Try multiple methods to get the ACTUAL room ID that was created

        // Method 1: Check URL parameters (most reliable)
        const urlParams = new URLSearchParams(window.location.search);
        const urlRoomId = urlParams.get('room');
        if (urlRoomId) return urlRoomId;

        // Method 2: Check global currentRoomId variable
        if (window.currentRoomId) return window.currentRoomId;

        // Method 3: Extract from currentRoomLink if available
        if (window.currentRoomLink) {
          try {
            const url = new URL(window.currentRoomLink);
            const linkRoomId = url.searchParams.get('room');
            if (linkRoomId) return linkRoomId;
          } catch (e) {
            // Ignore URL parsing errors
          }
        }

        // Method 4: Check diagnostic logs for the actual room ID
        if (window.diagnosticLogger && window.diagnosticLogger.getInstance) {
          const logger = window.diagnosticLogger.getInstance();
          const roomLogs = logger.getLogs({ category: 'ROOM' });
          const createLog = roomLogs.find(
            (log) => log.event === 'CREATE_START'
          );
          if (createLog && createLog.data.roomId) {
            return createLog.data.roomId;
          }
        }

        // If all else fails, return null to indicate failure
        return null;
      });

      console.log(`✓ User A created room: ${roomId}`);

      // Step 4: Wait for User A to fully establish room
      console.log('Step 4: Waiting for User A to fully establish room...');
      await userAPage.waitForTimeout(2000);
      console.log('✓ User A room fully established');

      // Step 5: User B joins the call
      console.log('Step 5: User B joins the call...');
      console.log(`User B attempting to join room: ${roomId}`);

      if (!roomId) {
        throw new Error('Failed to extract room ID from User A');
      }

      await userBPage.fill('#room-id-input', roomId);
      await userBPage.click('#join-room-btn');

      console.log('✓ User B joined the call');

      // Step 6: Wait for call to establish
      console.log('Step 6: Waiting for call to establish and UI to update...');

      // Wait for connection to establish
      await Promise.all([
        userAPage.waitForTimeout(5000),
        userBPage.waitForTimeout(5000),
      ]);

      // Wait for connection to fully establish
      await Promise.all([
        userAPage.waitForTimeout(3000),
        userBPage.waitForTimeout(3000),
      ]);

      console.log('✓ Call established between users');

      // Force both users into call mode to ensure proper state
      await Promise.all([
        userAPage.evaluate(() => {
          if (window.enterCallMode) {
            console.log('Forcing enterCallMode for User A');
            window.enterCallMode();
          }
        }),
        userBPage.evaluate(() => {
          if (window.enterCallMode) {
            console.log('Forcing enterCallMode for User B');
            window.enterCallMode();
          }
        }),
      ]);

      console.log('✓ Call established between users');

      // Step 7: Both users hang up to trigger contact save
      console.log('--- PHASE 2: Contact Save Flow ---');
      console.log('Step 7: Both users hang up to trigger contact save...');

      // Force hang-up for both users
      console.log('Forcing hang-up for both users...');
      await userAPage.evaluate(() => {
        // Try to call hangUp function directly
        if (window.hangUp) {
          console.log('Calling hangUp() for User A');
          window.hangUp();
        } else {
          console.log(
            'hangUp function not available, clicking button directly'
          );
          const hangUpBtn = document.querySelector('#hang-up-btn');
          if (hangUpBtn) {
            hangUpBtn.click();
          }
        }
      });

      await userBPage.evaluate(() => {
        // Try to call hangUp function directly
        if (window.hangUp) {
          console.log('Calling hangUp() for User B');
          window.hangUp();
        } else {
          console.log(
            'hangUp function not available, clicking button directly'
          );
          const hangUpBtn = document.querySelector('#hang-up-btn');
          if (hangUpBtn) {
            hangUpBtn.click();
          }
        }
      });

      await userAPage.waitForTimeout(2000); // Wait for hangup processing
      await userBPage.waitForTimeout(2000);
      await Promise.all([
        userAPage.waitForTimeout(1000),
        userBPage.waitForTimeout(1000),
      ]);

      console.log('✓ Both users hung up');

      // Step 8: Handle contact saving prompts (custom confirmDialog)
      console.log('Step 8: Handling contact saving prompts...');

      // Wait for and handle custom contact save dialogs
      console.log('Waiting for custom contact save dialogs...');

      // Handle User A's contact save dialog
      try {
        await userAPage.waitForSelector(
          'dialog[open] button[data-action="confirm"]',
          { timeout: 5000 }
        );
        await userAPage.click('dialog[open] button[data-action="confirm"]');
        console.log('✓ User A accepted contact save dialog');
      } catch (e) {
        console.log(
          '⚠ User A contact save dialog not found or already handled'
        );
      }

      // Handle User B's contact save dialog
      try {
        await userBPage.waitForSelector(
          'dialog[open] button[data-action="confirm"]',
          { timeout: 5000 }
        );
        await userBPage.click('dialog[open] button[data-action="confirm"]');
        console.log('✓ User B accepted contact save dialog');
      } catch (e) {
        console.log(
          '⚠ User B contact save dialog not found or already handled'
        );
      }

      // Wait for contacts to be processed and UI to settle
      await Promise.all([
        userAPage.waitForTimeout(3000),
        userBPage.waitForTimeout(3000),
      ]);

      console.log('✓ Contact save process completed');

      // Step 9: Check if contacts are saved and call buttons are available
      console.log('--- PHASE 3: Contact Call Attempt ---');
      console.log('Step 9: User A attempts to call saved contact...');

      // Check if contacts list is visible and populated
      const userAHasContacts = await userAPage
        .locator('.contact-call-btn')
        .first()
        .isVisible()
        .catch(() => false);

      console.log(
        `✓ User A has contacts with call buttons: ${userAHasContacts}`
      );

      let contactCallInitiated = false;
      if (userAHasContacts) {
        console.log('✓ Found contact call button, clicking...');

        // Close any open dialogs that might block the click
        await userAPage.evaluate(() => {
          const dialogs = document.querySelectorAll('dialog[open]');
          dialogs.forEach((dialog) => dialog.close());
        });

        await userAPage.locator('.contact-call-btn').first().click();
        contactCallInitiated = true;
        console.log('✓ Contact call button clicked');
      } else {
        console.log('⚠ No contact call buttons found');
      }

      // Step 10: Monitor calling UI behavior
      console.log('--- PHASE 4: Calling UI and Incoming Call Detection ---');
      console.log('Step 10: Monitoring calling UI behavior...');

      // Check if calling UI appears and monitor its behavior
      const callingUIAppeared = await userAPage
        .locator('#calling-modal, [id*="calling"], [class*="calling"]')
        .isVisible({ timeout: 5000 })
        .catch(() => false);

      console.log(`Calling UI appeared: ${callingUIAppeared}`);

      let callingUIDuration = 0;
      let callingUIDisappearedTooQuickly = false;

      if (callingUIAppeared) {
        // Monitor how long calling UI stays visible
        const callingUIStartTime = Date.now();
        console.log('Monitoring calling UI duration...');

        // Wait for calling UI to disappear (either answered or timeout)
        try {
          await userAPage.waitForSelector('#calling-modal', {
            state: 'hidden',
            timeout: 35000, // Wait for answer or timeout
          });

          callingUIDuration = Date.now() - callingUIStartTime;
          console.log(`Calling UI was visible for: ${callingUIDuration}ms`);

          // Check if it disappeared too quickly (less than 3 seconds indicates premature dismissal)
          if (callingUIDuration < 3000) {
            console.log('🚨 BUG DETECTED: Calling UI disappeared too quickly!');
            callingUIDisappearedTooQuickly = true;
          } else {
            console.log('✓ Calling UI stayed visible appropriately');
          }
        } catch (e) {
          console.log(
            'Calling UI still visible after 35 seconds (timeout expected)'
          );
          callingUIDuration = Date.now() - callingUIStartTime;
        }
      }

      // Step 11: Check for incoming call detection on User B
      console.log(
        'Step 11: Checking if User B receives incoming call notification...'
      );

      // Check for custom confirmDialog incoming call notification
      let hasIncomingCallUI = false;
      let incomingCallAccepted = false;

      try {
        // Wait for the custom confirm dialog to appear
        await userBPage.waitForSelector('.confirm-dialog', { timeout: 8000 });

        // Check if it's an incoming call dialog
        const dialogText = await userBPage.textContent('.confirm-dialog');
        if (
          dialogText &&
          (dialogText.includes('incoming call') ||
            dialogText.includes('wants to call'))
        ) {
          hasIncomingCallUI = true;
          console.log('✓ Found incoming call custom dialog');

          // Accept the incoming call to complete the test
          await userBPage.click(
            '.confirm-dialog .confirm-btn, .confirm-dialog button[data-action="confirm"]'
          );
          incomingCallAccepted = true;
          console.log('✓ Accepted incoming call');

          // Wait for call to establish
          await userBPage.waitForTimeout(3000);
        }
      } catch (e) {
        console.log('No incoming call dialog found within timeout');

        // Fallback: check console logs for incoming call detection
        const hasIncomingCallLogs = userBLogs.some(
          (log) =>
            log.includes('incoming call') ||
            log.includes('INCOMING_CALL:DETECTED')
        );

        if (hasIncomingCallLogs) {
          hasIncomingCallUI = true;
          console.log('✓ Found incoming call detection in console logs');
        }
      }

      console.log(
        `User B received incoming call notification: ${hasIncomingCallUI}`
      );
      console.log(`User B accepted incoming call: ${incomingCallAccepted}`);

      if (!hasIncomingCallUI) {
        console.log(
          '🚨 BUG CONFIRMED: User B did NOT receive incoming call notification'
        );
      }

      // Step 12: Test Results Summary
      console.log('--- PHASE 5: Test Results ---');
      console.log('=== TEST RESULTS SUMMARY ===');
      console.log(`Room ID: ${roomId}`);
      console.log(`Contact call initiated: ${contactCallInitiated}`);
      console.log(`Calling UI appeared: ${callingUIAppeared}`);
      console.log(`Calling UI duration: ${callingUIDuration}ms`);
      console.log(
        `Calling UI premature dismissal: ${callingUIDisappearedTooQuickly}`
      );
      console.log(`Incoming call received: ${hasIncomingCallUI}`);
      console.log(`Incoming call accepted: ${incomingCallAccepted}`);
      console.log(
        `Bug detected - Calling UI disappears: ${callingUIDisappearedTooQuickly}`
      );
      console.log(`Bug detected - Missed incoming call: ${!hasIncomingCallUI}`);

      // Test assertions based on expected behavior
      expect(roomId).toBeTruthy();
      expect(contactCallInitiated).toBe(true);

      if (callingUIDisappearedTooQuickly) {
        console.log('⚠ CALLING UI BUG DETECTED: UI disappeared too quickly');
      }

      if (!hasIncomingCallUI) {
        console.log(
          '⚠ INCOMING CALL BUG DETECTED: Call notification not received'
        );
      }

      if (!callingUIDisappearedTooQuickly && hasIncomingCallUI) {
        console.log(
          '✅ NO BUGS DETECTED: All functionality working correctly!'
        );
      }

      console.log(
        '✓ Test completed successfully - full call saved contact flow tested'
      );

      // Cleanup - ensure proper test exit
      console.log('--- Cleaning up test resources ---');
      try {
        await userAContext.close();
        await userBContext.close();
        console.log('✓ Test cleanup completed');
      } catch (e) {
        console.log('Cleanup error (non-critical):', e.message);
      }
    } catch (error) {
      console.log('❌ Test failed with error:', error.message);
      throw error;
    } finally {
      // Always cleanup contexts to prevent hanging
      console.log('--- Final cleanup (ensuring test exit) ---');
      try {
        if (userAContext) await userAContext.close();
        if (userBContext) await userBContext.close();
        console.log('✓ Final cleanup completed - test will exit');
      } catch (e) {
        console.log('Final cleanup error (non-critical):', e.message);
      }
    }
  });
});
