import { test, expect } from '@playwright/test';

test.describe('Reconnection on refresh', () => {
  test('Person A refreshes and reconnects', async ({ browser }) => {
    // Use fake devices flag
    const contextA = await browser.newContext({
      permissions: ['camera', 'microphone'],
      launchOptions: {
        args: [
          '--use-fake-device-for-media-stream',
          '--use-fake-ui-for-media-stream',
        ],
      },
    });

    const contextB = await browser.newContext({
      permissions: ['camera', 'microphone'],
      launchOptions: {
        args: [
          '--use-fake-device-for-media-stream',
          '--use-fake-ui-for-media-stream',
        ],
      },
    });

    const pageA = await contextA.newPage();
    const pageB = await contextB.newPage();

    // Person A: Start chat
    await pageA.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await pageA.waitForSelector('#startChat', { state: 'visible' });
    await pageA.click('#startChat');

    // Wait for link
    await pageA.waitForSelector('#linkContainer', { state: 'visible' });
    const roomUrl = await pageA.inputValue('#shareLink');

    // Person B: Join
    await pageB.goto(roomUrl, { waitUntil: 'networkidle' });

    // Wait for connection
    await expect(pageA.locator('#status')).toContainText('Connected', {
      timeout: 15000,
    });
    await expect(pageB.locator('#status')).toContainText('Connected', {
      timeout: 15000,
    });

    // Person A: Refresh
    await pageA.reload({ waitUntil: 'networkidle' });

    // Verify reconnection
    await expect(pageA.locator('#status')).toContainText('Connected', {
      timeout: 20000,
    });

    await contextA.close();
    await contextB.close();
  });
});
