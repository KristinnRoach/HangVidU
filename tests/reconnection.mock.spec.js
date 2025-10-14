import { test, expect } from '@playwright/test';

test.describe('Reconnection on refresh', () => {
  test('Person A refreshes and reconnects', async ({ browser }) => {
    const contextA = await browser.newContext();
    const contextB = await browser.newContext();

    const addMockToContext = async (context) => {
      await context.addInitScript(() => {
        if (!navigator.mediaDevices) {
          navigator.mediaDevices = {};
        }

        navigator.mediaDevices.getUserMedia = async () => {
          const canvas = document.createElement('canvas');
          canvas.width = 640;
          canvas.height = 480;
          const videoStream = canvas.captureStream(30);

          // Create fake audio track without AudioContext
          const audioTrack = videoStream.getVideoTracks()[0].clone();
          Object.defineProperty(audioTrack, 'kind', { value: 'audio' });

          const stream = new MediaStream([
            ...videoStream.getVideoTracks(),
            audioTrack,
          ]);

          return stream;
        };

        // Mock enumerateDevices for camera switching
        navigator.mediaDevices.enumerateDevices = async () => [
          { kind: 'videoinput', deviceId: 'fake1', label: 'Front Camera' },
          { kind: 'videoinput', deviceId: 'fake2', label: 'Back Camera' },
          { kind: 'audioinput', deviceId: 'fake3', label: 'Microphone' },
        ];
      });
    };

    await addMockToContext(contextA);
    await addMockToContext(contextB);

    const pageA = await contextA.newPage();
    const pageB = await contextB.newPage();

    // Person A: Start chat
    await pageA.goto('http://localhost:5173');
    await pageA.waitForSelector('#startChat');
    await pageA.click('#startChat');

    // Wait for link to appear
    await pageA.waitForSelector('#linkContainer', {
      state: 'visible',
      timeout: 10000,
    });
    const roomUrl = await pageA.inputValue('#shareLink');

    console.log('Room URL:', roomUrl);

    // Person B: Join via link
    await pageB.goto(roomUrl);

    // Wait for connection (both should show "Connected")
    await expect(pageA.locator('#status')).toContainText('Connected', {
      timeout: 15000,
    });
    await expect(pageB.locator('#status')).toContainText('Connected', {
      timeout: 15000,
    });

    console.log('Initial connection established');

    // Person A: Refresh
    await pageA.reload();

    // Verify reconnection
    await expect(pageA.locator('#status')).toContainText(/Reconnect|Connect/, {
      timeout: 10000,
    });
    await expect(pageA.locator('#status')).toContainText('Connected', {
      timeout: 20000,
    });

    console.log('Person A reconnected');

    // Verify Person B still connected
    await expect(pageB.locator('#status')).toContainText('Connected');

    await contextA.close();
    await contextB.close();
  });
});
