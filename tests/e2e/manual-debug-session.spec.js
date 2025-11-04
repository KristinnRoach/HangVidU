/**
 * Manual Debug Session - Two Browser Windows for Real-Time Testing
 *
 * This test opens two browser windows and keeps them open for manual testing
 * while capturing all console output for analysis.
 */

import { test, expect } from '@playwright/test';

test.use({
  headless: false, // Always show browsers
  timeout: 0, // No timeout - keep open indefinitely
});

test.describe('Manual Debug Session', () => {
  test('should open two browsers for manual testing with console monitoring', async ({
    browser,
  }) => {
    // Create two browser contexts
    const userAContext = await browser.newContext();
    const userBContext = await browser.newContext();

    const userAPage = await userAContext.newPage();
    const userBPage = await userBContext.newPage();

    // Set up comprehensive console logging
    const userALogs = [];
    const userBLogs = [];

    userAPage.on('console', (msg) => {
      const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
      const logEntry = `[${timestamp}] [USER A] ${msg.type()}: ${msg.text()}`;
      userALogs.push(logEntry);
      console.log(logEntry);
    });

    userBPage.on('console', (msg) => {
      const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
      const logEntry = `[${timestamp}] [USER B] ${msg.type()}: ${msg.text()}`;
      userBLogs.push(logEntry);
      console.log(logEntry);
    });

    // Capture page errors
    userAPage.on('pageerror', (error) => {
      console.error(`[USER A ERROR] ${error.message}`);
    });

    userBPage.on('pageerror', (error) => {
      console.error(`[USER B ERROR] ${error.message}`);
    });

    console.log('=== MANUAL DEBUG SESSION STARTED ===');
    console.log('User A: Left browser window');
    console.log('User B: Right browser window');
    console.log('All console output will be captured here in real-time');
    console.log('=====================================');

    // Load both users
    await Promise.all([
      userAPage.goto('https://localhost:5173'),
      userBPage.goto('https://localhost:5173'),
    ]);

    // Wait for app initialization
    await Promise.all([
      userAPage.waitForSelector('#lobby', { timeout: 15000 }),
      userBPage.waitForSelector('#lobby', { timeout: 15000 }),
    ]);

    console.log('✓ Both browsers loaded and ready for manual testing');

    // Add debug helpers to both pages
    await userAPage.evaluate(() => {
      // Add debug helpers to window
      window.debugHelpers = {
        checkListeners: () => {
          console.log('=== LISTENER STATE ===');
          console.log(
            'Active listeners:',
            Array.from(window.listeningRoomIds || new Set())
          );
          if (window.diagnosticLogger) {
            const listeners = window.diagnosticLogger.getListenerDiagnostics();
            console.log('Listener diagnostics:', listeners.slice(-5));
          }
        },

        checkContacts: () => {
          console.log('=== CONTACTS STATE ===');
          const contacts = JSON.parse(localStorage.getItem('contacts') || '{}');
          console.log('Saved contacts:', contacts);
          Object.values(contacts).forEach((contact) => {
            console.log(
              `Contact ${contact.contactName}: room ${contact.roomId}`
            );
          });
        },

        checkIncomingCalls: () => {
          console.log('=== INCOMING CALL LOGS ===');
          if (window.diagnosticLogger) {
            const incomingLogs = window.diagnosticLogger
              .getInstance()
              .getLogs({ category: 'INCOMING_CALL' });
            console.log('Incoming call events:', incomingLogs);

            const memberJoins = window.diagnosticLogger
              .getInstance()
              .getLogs({ category: 'ROOM' })
              .filter((log) => log.event === 'MEMBER_JOINED');
            console.log('Member join events:', memberJoins.slice(-3));
          }
        },

        forceListenerAttachment: () => {
          console.log('=== FORCE LISTENER ATTACHMENT ===');
          const contacts = JSON.parse(localStorage.getItem('contacts') || '{}');
          Object.values(contacts).forEach((contact) => {
            if (contact.roomId && window.listenForIncomingOnRoom) {
              console.log('Force attaching listener for:', contact.roomId);
              window.listenForIncomingOnRoom(contact.roomId);
            }
          });
        },

        exportDiagnostics: () => {
          if (window.diagnosticLogger) {
            const data = window.diagnosticLogger.exportLogs();
            console.log('=== DIAGNOSTIC EXPORT ===');
            console.log(JSON.stringify(data, null, 2));
            return data;
          }
        },
      };

      console.log('=== DEBUG HELPERS LOADED ===');
      console.log('Available commands:');
      console.log('- debugHelpers.checkListeners()');
      console.log('- debugHelpers.checkContacts()');
      console.log('- debugHelpers.checkIncomingCalls()');
      console.log('- debugHelpers.forceListenerAttachment()');
      console.log('- debugHelpers.exportDiagnostics()');
    });

    await userBPage.evaluate(() => {
      // Add same debug helpers to User B
      window.debugHelpers = {
        checkListeners: () => {
          console.log('=== LISTENER STATE ===');
          console.log(
            'Active listeners:',
            Array.from(window.listeningRoomIds || new Set())
          );
          if (window.diagnosticLogger) {
            const listeners = window.diagnosticLogger.getListenerDiagnostics();
            console.log('Listener diagnostics:', listeners.slice(-5));
          }
        },

        checkContacts: () => {
          console.log('=== CONTACTS STATE ===');
          const contacts = JSON.parse(localStorage.getItem('contacts') || '{}');
          console.log('Saved contacts:', contacts);
          Object.values(contacts).forEach((contact) => {
            console.log(
              `Contact ${contact.contactName}: room ${contact.roomId}`
            );
          });
        },

        checkIncomingCalls: () => {
          console.log('=== INCOMING CALL LOGS ===');
          if (window.diagnosticLogger) {
            const incomingLogs = window.diagnosticLogger
              .getInstance()
              .getLogs({ category: 'INCOMING_CALL' });
            console.log('Incoming call events:', incomingLogs);

            const memberJoins = window.diagnosticLogger
              .getInstance()
              .getLogs({ category: 'ROOM' })
              .filter((log) => log.event === 'MEMBER_JOINED');
            console.log('Member join events:', memberJoins.slice(-3));
          }
        },

        forceListenerAttachment: () => {
          console.log('=== FORCE LISTENER ATTACHMENT ===');
          const contacts = JSON.parse(localStorage.getItem('contacts') || '{}');
          Object.values(contacts).forEach((contact) => {
            if (contact.roomId && window.listenForIncomingOnRoom) {
              console.log('Force attaching listener for:', contact.roomId);
              window.listenForIncomingOnRoom(contact.roomId);
            }
          });
        },

        exportDiagnostics: () => {
          if (window.diagnosticLogger) {
            const data = window.diagnosticLogger.exportLogs();
            console.log('=== DIAGNOSTIC EXPORT ===');
            console.log(JSON.stringify(data, null, 2));
            return data;
          }
        },
      };

      console.log('=== DEBUG HELPERS LOADED ===');
      console.log('Available commands:');
      console.log('- debugHelpers.checkListeners()');
      console.log('- debugHelpers.checkContacts()');
      console.log('- debugHelpers.checkIncomingCalls()');
      console.log('- debugHelpers.forceListenerAttachment()');
      console.log('- debugHelpers.exportDiagnostics()');
    });

    console.log('\n=== MANUAL TESTING INSTRUCTIONS ===');
    console.log('1. User A (Left): Create call link');
    console.log('2. User B (Right): Join using room ID');
    console.log('3. Both: Complete call and save contacts');
    console.log('4. User B: Run debugHelpers.checkListeners() in console');
    console.log('5. User A: Click contact call button');
    console.log('6. Monitor console output here for listener events');
    console.log(
      '7. If User B gets no prompt, run debugHelpers.forceListenerAttachment()'
    );
    console.log('8. Test page reload on User B if needed');
    console.log('=====================================');

    // Keep the test running indefinitely for manual testing
    // You can stop it with Ctrl+C when done
    await new Promise(() => {}); // Never resolves - keeps browsers open
  });
});
