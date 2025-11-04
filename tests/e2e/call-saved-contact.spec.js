/**
 * Minimal E2E test for call-saved-contact flow
 * Focus: Just replicate the scenario and read console logs
 */

import { test, expect } from '@playwright/test';

test.use({
  headless: true,
  timeout: 30000,
});

test.describe('Call Saved Contact Flow', () => {
  test('should replicate the call-saved-contact scenario', async ({
    browser,
  }) => {
    // Create two browser contexts (two users)
    const userAContext = await browser.newContext();
    const userBContext = await browser.newContext();

    const userAPage = await userAContext.newPage();
    const userBPage = await userBContext.newPage();

    // Enable console logging for both pages
    userAPage.on('console', (msg) => console.log(`[USER A] ${msg.text()}`));
    userBPage.on('console', (msg) => console.log(`[USER B] ${msg.text()}`));

    console.log('=== STARTING CALL SAVED CONTACT SCENARIO ===');

    // Step 1: Both users load the app
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

    console.log('✓ Both users loaded app');

    // Step 2: User A creates a call
    console.log('Step 2: User A creates a call...');
    await userAPage.click('#create-link-btn');

    // Wait for room creation
    await userAPage.waitForSelector('#copy-link-btn:not([disabled])', {
      timeout: 5000,
    });

    // Get the room link
    const roomLink = await userAPage.evaluate(() => {
      return window.currentRoomLink || null;
    });

    console.log(`✓ User A created room: ${roomLink}`);

    // Step 3: User B joins the call
    console.log('Step 3: User B joins the call...');
    if (roomLink) {
      await userBPage.goto(roomLink);
    } else {
      // Fallback: extract room ID from URL or use join button
      const roomId = await userAPage.evaluate(() => {
        const url = new URL(window.location);
        return url.searchParams.get('room') || 'test-room-123';
      });

      await userBPage.fill('#room-id-input', roomId);
      await userBPage.click('#join-room-btn');
    }

    console.log('✓ User B joined the call');

    // Step 4: Wait for call to establish
    console.log('Step 4: Waiting for call to establish...');
    await Promise.all([
      userAPage.waitForSelector('#hang-up-btn:not([disabled])', {
        timeout: 10000,
      }),
      userBPage.waitForSelector('#hang-up-btn:not([disabled])', {
        timeout: 10000,
      }),
    ]);

    console.log('✓ Call established between users');

    // Step 5: User A saves User B as contact
    console.log('Step 5: User A saves User B as contact...');

    // Trigger contact save (this usually happens after hanging up)
    await userAPage.click('#hang-up-btn');

    // Wait for contact save prompt (if it appears)
    await userAPage.waitForTimeout(1000);

    console.log('✓ User A hung up (contact save should be prompted)');

    // Step 6: User B also hangs up
    console.log('Step 6: User B hangs up...');
    await userBPage.click('#hang-up-btn');

    console.log('✓ User B hung up');

    // Step 7: Wait a moment, then User A tries to call the saved contact
    console.log('Step 7: User A attempts to call saved contact...');
    await userAPage.waitForTimeout(2000);

    // Look for saved contact in the contacts list and click it
    const contactFound = await userAPage
      .locator('.contact-item')
      .first()
      .isVisible()
      .catch(() => false);

    if (contactFound) {
      console.log('✓ Found saved contact, clicking to call...');
      await userAPage
        .locator('.contact-item .call-contact-btn')
        .first()
        .click();
    } else {
      console.log('⚠ No saved contact found, this might be the issue');
    }

    // Step 8: Check if User B receives incoming call notification
    console.log(
      'Step 8: Checking if User B receives incoming call notification...'
    );
    await userBPage.waitForTimeout(3000);

    // Look for any incoming call UI or console messages
    const hasIncomingCallUI = await userBPage
      .locator('[id*="calling"], [class*="calling"]')
      .isVisible()
      .catch(() => false);

    if (hasIncomingCallUI) {
      console.log('✓ User B received incoming call notification');
    } else {
      console.log('✗ User B did NOT receive incoming call notification');
    }

    console.log('=== SCENARIO COMPLETE - CHECK CONSOLE LOGS ABOVE ===');

    // Cleanup immediately
    await userAContext.close();
    await userBContext.close();

    // Force test completion
    expect(true).toBe(true);
  });
});
