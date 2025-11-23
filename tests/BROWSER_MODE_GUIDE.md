# Vitest Browser Mode Integration Guide

## Overview

HangVidU uses **Vitest Browser Mode** as the primary testing system for unit, integration, and component tests. This provides native browser APIs (WebRTC, IndexedDB, real DOM) without the limitations of jsdom.

## Testing Strategy: Vitest vs Playwright

### Use Vitest Browser Mode For (Primary System)

✅ **Unit Tests** - Individual functions and modules
✅ **Integration Tests** - Multiple modules working together  
✅ **Component Tests** - UI components with real DOM
✅ **WebRTC Tests** - Native RTCPeerConnection APIs
✅ **IndexedDB Tests** - Real Dexie database operations
✅ **Media API Tests** - getUserMedia, camera/mic switching
✅ **Fast Feedback** - Runs in milliseconds, perfect for TDD

### Use Playwright E2E Only For

⚠️ **Full User Flows** - Complete multi-step scenarios requiring dev server
⚠️ **Visual Regression** - Screenshot comparisons for CSS changes
⚠️ **Cross-Browser** - Testing Firefox/Safari specific issues (rare)

**Key Principle:** If it can be tested in Vitest browser mode, test it there. It's faster and easier to debug.

## Current Test Structure

```
tests/
├── smoke/              # Quick smoke tests (Vitest browser mode)
├── unit/               # Unit tests (Vitest browser mode)
├── integration/        # Integration tests (Vitest browser mode)
└── e2e/                # End-to-end only (Playwright)
    ├── smoke.spec.js   # ⚠️ CANDIDATE FOR MIGRATION
    └── visual-regression.spec.js  # ✅ Keep (screenshots)

src/
└── **/*.test.js        # Component tests (Vitest browser mode)
```

### E2E Tests: Keep in Playwright

After analysis, both `smoke.spec.js` and `visual-regression.spec.js` should **remain in Playwright** because:

1. **They require full app with dev server** - These tests need the complete application running with Vite dev server, all assets loaded, and proper routing
2. **They test integration with server** - Testing that the app boots correctly, assets load, and routing works
3. **Visual regression needs screenshot diffing** - Playwright's built-in screenshot comparison is purpose-built for this

**When to use Playwright E2E:**

- Full page load testing
- Visual regression (screenshots)
- Multi-page navigation flows
- Testing with real dev server running

## Vitest Browser Mode Capabilities

### 1. Native Browser APIs (No Mocking!)

```javascript
import { test, expect } from 'vitest';

test('WebRTC peer connection works', async () => {
  // Real RTCPeerConnection, not mocked!
  const pc = new RTCPeerConnection();
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  expect(pc.signalingState).toBe('have-local-offer');
  pc.close();
});

test('IndexedDB persists data', async () => {
  // Real IndexedDB with Dexie
  await db.contacts.add({ name: 'Alice', roomId: 'room-123' });
  const contacts = await db.contacts.toArray();
  expect(contacts).toHaveLength(1);
});

test('getUserMedia returns stream', async () => {
  // Real Media API (uses fake devices in test config)
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  expect(stream.getTracks().length).toBeGreaterThan(0);
  stream.getTracks().forEach((track) => track.stop());
});
```

### 2. Real User Interactions

```javascript
import { page, userEvent } from 'vitest/browser';

test('user can click call button', async () => {
  // Real browser click, not simulated!
  const callBtn = page.getByRole('button', { name: 'Call' });
  await userEvent.click(callBtn);

  await expect.element(page.getByText('Calling...')).toBeVisible();
});

test('user can type in search', async () => {
  const searchInput = page.getByPlaceholder('Search YouTube...');
  await userEvent.fill(searchInput, 'test video');

  expect(await searchInput.value()).toBe('test video');
});
```

### 3. Real DOM & CSS Layout

```javascript
test('responsive layout adapts to mobile', async () => {
  await page.viewport(375, 667); // iPhone size

  const videoContainer = page.getByTestId('video-container');
  const box = await videoContainer.boundingBox();

  expect(box.width).toBeLessThan(400);
});

test('element is visible after animation', async () => {
  const modal = page.getByRole('dialog');

  // Wait for CSS animation to complete
  await expect.element(modal).toBeVisible();

  const styles = await modal.computedStyle();
  expect(styles.opacity).toBe('1');
});
```

### 4. WebRTC Integration Tests

```javascript
test('ICE candidates are collected', async () => {
  const pc = new RTCPeerConnection({
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  });

  const candidates = [];
  pc.onicecandidate = (e) => {
    if (e.candidate) candidates.push(e.candidate);
  };

  await pc.createOffer();
  await pc.setLocalDescription(pc.localDescription);

  // Wait for ICE gathering
  await new Promise((resolve) => {
    pc.onicegatheringstatechange = () => {
      if (pc.iceGatheringState === 'complete') resolve();
    };
  });

  expect(candidates.length).toBeGreaterThan(0);
  pc.close();
});

test('data channel sends messages', async () => {
  const pc1 = new RTCPeerConnection();
  const pc2 = new RTCPeerConnection();

  const channel = pc1.createDataChannel('test');

  const messageReceived = new Promise((resolve) => {
    pc2.ondatachannel = (e) => {
      e.channel.onmessage = (msg) => resolve(msg.data);
    };
  });

  // Exchange offers/answers (simplified)
  const offer = await pc1.createOffer();
  await pc1.setLocalDescription(offer);
  await pc2.setRemoteDescription(offer);

  const answer = await pc2.createAnswer();
  await pc2.setLocalDescription(answer);
  await pc1.setRemoteDescription(answer);

  // Wait for channel to open
  await new Promise((resolve) => {
    channel.onopen = resolve;
  });

  channel.send('Hello!');
  const received = await messageReceived;

  expect(received).toBe('Hello!');

  pc1.close();
  pc2.close();
});
```

### 5. Firebase & IndexedDB Tests

```javascript
test('contacts save to IndexedDB', async () => {
  const contact = {
    userId: 'user-123',
    displayName: 'Alice',
    roomId: 'room-abc',
    savedAt: Date.now(),
  };

  await db.contacts.add(contact);

  const saved = await db.contacts.get('user-123');
  expect(saved.displayName).toBe('Alice');

  // Cleanup
  await db.contacts.clear();
});

test('recent calls persist', async () => {
  await db.recentCalls.add({
    roomId: 'room-123',
    partnerId: 'user-456',
    timestamp: Date.now(),
  });

  const calls = await db.recentCalls.toArray();
  expect(calls).toHaveLength(1);

  await db.recentCalls.clear();
});
```

### 6. Media Device Tests

```javascript
test('camera switching works', async () => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoDevices = devices.filter((d) => d.kind === 'videoinput');

  expect(videoDevices.length).toBeGreaterThan(0);

  // Test getting stream from specific device
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { deviceId: videoDevices[0].deviceId },
  });

  expect(stream.getVideoTracks()[0].label).toBeTruthy();
  stream.getTracks().forEach((track) => track.stop());
});

test('mic muting works', async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const audioTrack = stream.getAudioTracks()[0];

  expect(audioTrack.enabled).toBe(true);

  audioTrack.enabled = false;
  expect(audioTrack.enabled).toBe(false);

  stream.getTracks().forEach((track) => track.stop());
});
```

### 7. Performance Testing

```javascript
test('call setup completes quickly', async () => {
  const start = performance.now();

  await CallController.createCall({ localStream: mockStream });

  const duration = performance.now() - start;
  expect(duration).toBeLessThan(1000); // < 1 second
});

test('UI renders without layout thrashing', async () => {
  const start = performance.now();

  // Trigger multiple DOM updates
  for (let i = 0; i < 100; i++) {
    document.body.appendChild(document.createElement('div'));
  }

  const duration = performance.now() - start;
  expect(duration).toBeLessThan(100); // < 100ms
});
```

### 8. Component Testing

```javascript
test('icon button renders and fires click', async () => {
  const onClick = vi.fn();

  const btn = createIconButton({
    title: 'Call',
    iconHtml: '<i class="fa fa-phone"></i>',
    onClick,
    parent: document.body,
  });

  const button = btn.querySelector('button');
  await userEvent.click(button);

  expect(onClick).toHaveBeenCalledTimes(1);
});

test('notification shows and auto-dismisses', async () => {
  showNotification({ message: 'Test', duration: 100 });

  const toast = page.getByText('Test');
  await expect.element(toast).toBeVisible();

  // Wait for auto-dismiss
  await new Promise((resolve) => setTimeout(resolve, 150));
  await expect.element(toast).not.toBeVisible();
});
```

## Advanced Features

### Multi-Browser Testing

```javascript
// vitest.config.js
export default defineConfig({
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [
        { browser: 'chromium' },
        { browser: 'firefox' }, // Test Firefox-specific issues
        { browser: 'webkit' }, // Test Safari engine
      ],
    },
  },
});
```

### Custom Viewport Testing

```javascript
test('mobile layout works', async () => {
  await page.viewport(375, 667); // iPhone SE
  // Test mobile-specific behavior
});

test('tablet layout works', async () => {
  await page.viewport(768, 1024); // iPad
  // Test tablet-specific behavior
});
```

### Screenshot Debugging

```javascript
test('UI renders correctly', async () => {
  await page.goto('/');

  // Screenshots automatically saved on failure
  await page.screenshot({ path: 'debug.png' });

  await expect.element(page.getByRole('main')).toBeVisible();
});
```

## Why Both E2E Tests Stay in Playwright

After analysis, **both** `smoke.spec.js` and `visual-regression.spec.js` should remain in Playwright:

### Smoke Tests Need Full App Context

```javascript
// These tests require:
// 1. Vite dev server running
// 2. All assets loaded (CSS, JS, images)
// 3. Proper routing and base path
// 4. Complete initialization sequence

test('app loads and shows lobby', async ({ page }) => {
  await page.goto('/'); // Needs real server
  await expect(page.locator('#lobby')).toBeVisible();
});
```

### Visual Regression Needs Screenshot Diffing

```javascript
// Playwright provides:
// 1. Pixel-perfect screenshot comparison
// 2. Automatic diff generation
// 3. Baseline management
// 4. Full page rendering

test('lobby view - mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  await expect(page).toHaveScreenshot('lobby-mobile.png');
});
```

### What to Test in Vitest Browser Mode Instead

Focus Vitest tests on **isolated components and logic** that don't need a running server:

```javascript
// ✅ Component rendering (no server needed)
test('icon button renders', () => {
  const btn = createIconButton({ title: 'Call', iconHtml: '...' });
  expect(btn.querySelector('button')).toBeTruthy();
});

// ✅ Business logic (no server needed)
test('CallController creates room', async () => {
  const result = await CallController.createCall({ localStream });
  expect(result.roomId).toBeTruthy();
});

// ✅ WebRTC APIs (no server needed)
test('peer connection works', async () => {
  const pc = new RTCPeerConnection();
  const offer = await pc.createOffer();
  expect(offer.type).toBe('offer');
  pc.close();
});
```

## Best Practices

### 1. Cleanup After Tests

```javascript
afterEach(async () => {
  // Close peer connections
  if (pc) pc.close();

  // Stop media streams
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }

  // Clear IndexedDB
  await db.contacts.clear();

  // Reset DOM
  document.body.innerHTML = '';
});
```

### 2. Use Real APIs, Minimal Mocking

```javascript
// ❌ Don't mock what browser mode provides
vi.mock('navigator.mediaDevices');

// ✅ Use real APIs with test configuration
const stream = await navigator.mediaDevices.getUserMedia({ video: true });
```

### 3. Test Behavior, Not Implementation

```javascript
// ❌ Testing implementation details
expect(CallController.pc.signalingState).toBe('stable');

// ✅ Testing observable behavior
await expect.element(page.getByText('Connected')).toBeVisible();
```

### 4. Keep Tests Fast

```javascript
// ✅ Fast unit test
test('createCall returns room link', async () => {
  const result = await CallController.createCall({ localStream });
  expect(result.roomLink).toContain('room=');
});

// ⚠️ Slow integration test (use sparingly)
test('full call flow works', async () => {
  // This should probably be in Playwright E2E
});
```

## Running Tests

```bash
# Fast feedback during development
pnpm test:watch

# Run all tests
pnpm test

# Quick smoke tests
pnpm test:smoke

# Specific test suite
pnpm test:unit

# Interactive debugging
pnpm test:ui

# E2E tests (slower, use less frequently)
pnpm test:e2e
```

## Debugging Tips

### 1. Use Vitest UI

```bash
pnpm test:ui
```

- Visual test runner
- See test execution in real browser
- Inspect DOM state
- View console logs

### 2. Use `page.screenshot()`

```javascript
test('debug failing test', async () => {
  await page.screenshot({ path: 'debug.png' });
  // Check screenshot to see what's wrong
});
```

### 3. Use `console.log` in Tests

```javascript
test('debug state', async () => {
  console.log('Current state:', CallController.getState());
  // Logs appear in test output
});
```

### 4. Run Single Test

```bash
pnpm test -t "specific test name"
```

## Summary

**Vitest Browser Mode = Primary Testing System (95% of tests)**

- ✅ Unit tests - Individual functions and modules
- ✅ Integration tests - Multiple modules working together
- ✅ Component tests - UI components with real DOM
- ✅ WebRTC tests - Native browser APIs
- ✅ IndexedDB tests - Real database operations
- ✅ Fast feedback - Milliseconds, perfect for TDD

**Playwright E2E = Full App Testing (5% of tests)**

- ✅ Smoke tests - App loads with dev server
- ✅ Visual regression - Screenshot comparisons
- ✅ Full page flows - Multi-step user journeys
- ⚠️ Slower - Requires dev server, use sparingly

**Key Principle:** Test in Vitest browser mode unless you need:

1. Full app with dev server running
2. Screenshot comparison
3. Multi-page navigation

This gives you:

- ⚡ Faster test execution (milliseconds vs seconds)
- 🎯 Simpler mental model (one tool for most tests)
- 🔧 Better debugging experience (Vitest UI)
- 🚀 More confidence in WebRTC/IndexedDB code (real APIs)
