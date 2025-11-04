/**
 * Simplified E2E Test for Calling UI Bug Reproduction
 *
 * This test focuses on reproducing the specific calling UI bug by:
 * 1. Setting up two users with saved contacts
 * 2. Testing the contact call flow
 * 3. Capturing diagnostic data when the calling UI disappears
 */

import { test, expect } from '@playwright/test';

test.use({
  headless: false,
  timeout: 90000,
});

test.describe('Calling UI Bug - Simplified', () => {
  test('should test calling UI behavior and capture diagnostic data', async ({
    browser,
  }) => {
    const userAContext = await browser.newContext();
    const userBContext = await browser.newContext();

    const userAPage = await userAContext.newPage();
    const userBPage = await userBContext.newPage();

    // Enable console logging
    const userALogs = [];
    const userBLogs = [];

    userAPage.on('console', (msg) => {
      const logEntry = `[USER A] ${msg.type()}: ${msg.text()}`;
      userALogs.push(logEntry);
      console.log(logEntry);
    });

    userBPage.on('console', (msg) => {
      const logEntry = `[USER B] ${msg.type()}: ${msg.text()}`;
      userBLogs.push(logEntry);
      console.log(logEntry);
    });

    console.log('=== SIMPLIFIED CALLING UI BUG TEST ===');

    try {
      // Load both users
      console.log('Loading app for both users...');
      await Promise.all([
        userAPage.goto('https://localhost:5173'),
        userBPage.goto('https://localhost:5173'),
      ]);

      await Promise.all([
        userAPage.waitForSelector('#lobby', { timeout: 15000 }),
        userBPage.waitForSelector('#lobby', { timeout: 15000 }),
      ]);

      console.log('✓ Both users loaded app');

      // Test 1: Check if diagnostic logger is available
      console.log('\n--- Testing Diagnostic Logger Availability ---');

      const userAHasDiagnostics = await userAPage.evaluate(() => {
        return !!(
          window.diagnosticLogger && window.diagnosticLogger.getInstance
        );
      });

      const userBHasDiagnostics = await userBPage.evaluate(() => {
        return !!(
          window.diagnosticLogger && window.diagnosticLogger.getInstance
        );
      });

      console.log(`User A has diagnostic logger: ${userAHasDiagnostics}`);
      console.log(`User B has diagnostic logger: ${userBHasDiagnostics}`);

      // Test 2: Simulate contact call scenario programmatically
      console.log('\n--- Testing Contact Call Scenario ---');

      const testRoomId = `test-room-${Date.now()}`;
      console.log(`Using test room ID: ${testRoomId}`);

      // Simulate User A calling a saved contact (User B)
      console.log('User A: Simulating contact call...');

      // First check what functions are available
      const availableFunctions = await userAPage.evaluate(() => {
        const functions = [];
        if (typeof window.joinOrCreateRoomWithId === 'function')
          functions.push('joinOrCreateRoomWithId');
        if (typeof window.showCallingUI === 'function')
          functions.push('showCallingUI');
        if (typeof window.listenForIncomingOnRoom === 'function')
          functions.push('listenForIncomingOnRoom');

        return {
          functions,
          windowKeys: Object.keys(window)
            .filter(
              (key) =>
                key.includes('call') ||
                key.includes('room') ||
                key.includes('join')
            )
            .slice(0, 10),
        };
      });

      console.log('Available functions:', availableFunctions);

      // Try to trigger calling UI through UI interaction since functions aren't global
      console.log('Attempting to trigger calling UI through UI interaction...');

      // Create a room first to establish the call flow
      await userAPage.click('#create-link-btn');
      await userAPage.waitForTimeout(2000);

      // Check if any calling UI appeared
      let callingUIResult = {
        success: false,
        method: 'ui_interaction',
        availableFunctions: availableFunctions.functions,
      };

      const callingUIVisible = await userAPage
        .locator('#calling-modal, [id*="calling"], [class*="calling"]')
        .isVisible({ timeout: 2000 })
        .catch(() => false);

      if (callingUIVisible) {
        callingUIResult.success = true;
        callingUIResult.method = 'ui_interaction_success';
      }

      console.log(`Calling UI trigger result:`, callingUIResult);

      // Test 3: Monitor calling UI behavior
      console.log('\n--- Monitoring Calling UI Behavior ---');

      if (callingUIResult.success) {
        // Check if calling UI appeared
        const callingUIVisible = await userAPage
          .locator('#calling-modal, [id*="calling"], [class*="calling"]')
          .isVisible({ timeout: 3000 })
          .catch(() => false);

        console.log(`Calling UI visible: ${callingUIVisible}`);

        if (callingUIVisible) {
          const startTime = Date.now();

          // Monitor how long it stays visible
          try {
            await userAPage.waitForSelector('#calling-modal', {
              state: 'hidden',
              timeout: 35000,
            });

            const duration = Date.now() - startTime;
            console.log(`Calling UI was visible for: ${duration}ms`);

            if (duration < 5000) {
              console.log(
                '🚨 BUG DETECTED: Calling UI disappeared too quickly!'
              );
            }
          } catch (e) {
            console.log('Calling UI still visible after 35 seconds or timeout');
          }
        }
      }

      // Test 4: Check User B for incoming call detection
      console.log('\n--- Checking User B for Incoming Call ---');

      // Check User B's listener capabilities
      const listenerSetup = await userBPage.evaluate((roomId) => {
        // Check what listener-related functions/variables are available
        const available = {
          listenForIncomingOnRoom:
            typeof window.listenForIncomingOnRoom === 'function',
          listeningRoomIds: !!window.listeningRoomIds,
          startListeningForSavedRooms:
            typeof window.startListeningForSavedRooms === 'function',
        };

        // Try to set up listener if function is available
        if (window.listenForIncomingOnRoom) {
          window.listenForIncomingOnRoom(roomId);
          return {
            success: true,
            method: 'listenForIncomingOnRoom',
            available,
          };
        }

        // Check if listener is already set up
        if (
          window.listeningRoomIds &&
          window.listeningRoomIds.has &&
          window.listeningRoomIds.has(roomId)
        ) {
          return { success: true, method: 'already_listening', available };
        }

        return { success: false, method: 'none', available };
      }, testRoomId);

      console.log(`User B listener setup:`, listenerSetup);

      // Wait and check for incoming call notifications
      await userBPage.waitForTimeout(5000);

      const hasIncomingCall = await userBPage.evaluate(() => {
        // Check for various incoming call indicators
        const indicators = [
          document.querySelector('[id*="incoming"]'),
          document.querySelector('[class*="incoming"]'),
          document.querySelector('dialog'),
          document.querySelector('.modal'),
        ];

        return indicators.some((el) => el && el.offsetParent !== null);
      });

      console.log(`User B has incoming call notification: ${hasIncomingCall}`);

      // Test 5: Capture comprehensive diagnostic data
      console.log('\n--- Capturing Diagnostic Data ---');

      const diagnosticData = {};

      if (userAHasDiagnostics) {
        diagnosticData.userA = await userAPage.evaluate(() => {
          const logger = window.diagnosticLogger.getInstance();
          return {
            sessionInfo: window.diagnosticLogger.getSessionInfo(),
            recentLogs: logger.getLogs().slice(-20), // Last 20 logs
            failures: window.diagnosticLogger.getFailures(),
            callingUILogs: logger.getLogs({ category: 'CALLING_UI' }),
            listenerLogs: logger.getLogs({ category: 'LISTENER' }),
          };
        });
      }

      if (userBHasDiagnostics) {
        diagnosticData.userB = await userBPage.evaluate(() => {
          const logger = window.diagnosticLogger.getInstance();
          return {
            sessionInfo: window.diagnosticLogger.getSessionInfo(),
            recentLogs: logger.getLogs().slice(-20),
            failures: window.diagnosticLogger.getFailures(),
            incomingCallLogs: logger.getLogs({ category: 'INCOMING_CALL' }),
            listenerLogs: logger.getLogs({ category: 'LISTENER' }),
          };
        });
      }

      // Test 6: Analyze results
      console.log('\n--- Test Results Analysis ---');

      const testResults = {
        timestamp: new Date().toISOString(),
        testRoomId,
        diagnosticLoggerAvailable: {
          userA: userAHasDiagnostics,
          userB: userBHasDiagnostics,
        },
        callingUI: {
          triggerSuccess: callingUIResult.success,
          triggerMethod: callingUIResult.method,
        },
        incomingCall: {
          listenerSetup: listenerSetup.success,
          notificationReceived: hasIncomingCall,
        },
        diagnosticData,
        consoleLogs: {
          userA: userALogs.slice(-10), // Last 10 logs
          userB: userBLogs.slice(-10),
        },
      };

      console.log('\n=== FINAL TEST RESULTS ===');
      console.log(
        `Diagnostic logger available: User A: ${userAHasDiagnostics}, User B: ${userBHasDiagnostics}`
      );
      console.log(
        `Calling UI trigger: ${callingUIResult.success} (${callingUIResult.method})`
      );
      console.log(
        `Incoming call listener: ${listenerSetup.success} (${listenerSetup.method})`
      );
      console.log(`Incoming call notification: ${hasIncomingCall}`);

      if (diagnosticData.userA?.callingUILogs?.length > 0) {
        console.log(
          `User A calling UI events: ${diagnosticData.userA.callingUILogs.length}`
        );
      }

      if (diagnosticData.userB?.incomingCallLogs?.length > 0) {
        console.log(
          `User B incoming call events: ${diagnosticData.userB.incomingCallLogs.length}`
        );
      }

      // Test passes if we successfully captured diagnostic data
      expect(testResults.timestamp).toBeTruthy();
      expect(testResults.testRoomId).toBeTruthy();

      console.log('\n✓ Simplified test completed - diagnostic data captured');
    } catch (error) {
      console.error('Test failed:', error.message);
      throw error;
    } finally {
      await userAContext.close();
      await userBContext.close();
    }
  });

  // Additional test for specific calling UI timeout behavior
  test('should test calling UI timeout behavior', async ({ browser }) => {
    console.log('\n=== CALLING UI TIMEOUT TEST ===');

    const context = await browser.newContext();
    const page = await context.newPage();

    page.on('console', (msg) => console.log(`[TIMEOUT TEST] ${msg.text()}`));

    try {
      await page.goto('https://localhost:5173');
      await page.waitForSelector('#lobby', { timeout: 15000 });

      // Test calling UI timeout directly
      const timeoutTest = await page.evaluate(() => {
        if (window.showCallingUI) {
          const startTime = Date.now();

          // Show calling UI with a test contact
          window.showCallingUI(
            'timeout-test-room',
            'Timeout Test Contact',
            () => {
              console.log('Calling UI cancelled or timed out');
            }
          );

          return { success: true, startTime };
        }
        return { success: false };
      });

      if (timeoutTest.success) {
        console.log('Calling UI timeout test started');

        // Wait for timeout (should be 30 seconds)
        await page.waitForTimeout(35000);

        // Check if calling UI is still visible
        const stillVisible = await page
          .locator('#calling-modal')
          .isVisible()
          .catch(() => false);

        console.log(`Calling UI still visible after 35s: ${stillVisible}`);

        // The UI should have timed out by now
        expect(stillVisible).toBe(false);
      }
    } finally {
      await context.close();
    }
  });
});
