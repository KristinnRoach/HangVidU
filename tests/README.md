# HangVidU E2E Testing

This directory contains end-to-end tests for HangVidU using Playwright.

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Install Playwright browsers:
```bash
pnpm exec playwright install
```

## Running Tests

### Development
```bash
# Run all E2E tests
pnpm test:e2e

# Run tests with UI (interactive mode)
pnpm test:ui

# Run specific test file
pnpm exec playwright test tests/e2e/video-chat.spec.js

# Run tests in headed mode (see browser)
pnpm test:e2e:headed

# Debug specific test
pnpm test:e2e:debug tests/e2e/video-chat.spec.js
```

### CI/CD
```bash
# Run all tests in headless mode
pnpm test:e2e

# Generate HTML report
pnpm test:report
```

## Test Structure

### Test Files
- `video-chat.spec.js` - Core video chat functionality
- `watch-mode.spec.js` - Watch together mode features
- `media-controls.spec.js` - Media device controls
- `error-handling.spec.js` - Error scenarios and edge cases

### Helper Files
- `test-utils.js` - Common utilities for setting up tests
- `firebase-mock.js` - Firebase mocking utilities

## Writing New Tests

### Basic Test Pattern
```javascript
import { test, expect } from '@playwright/test';
import { 
  setupTwoPeerConnection, 
  createVideoConnection, 
  cleanupConnection,
  mockMediaDevices 
} from '../helpers/test-utils.js';

test.describe('My Feature', () => {
  test('should do something', async ({ browser }) => {
    const { page1, page2, cleanup } = await setupTwoPeerConnection(browser);
    
    try {
      await mockMediaDevices(page1);
      await mockMediaDevices(page2);
      
      await createVideoConnection(page1, page2);
      
      // Your test logic here
      await expect(page1.locator('#someElement')).toBeVisible();
      
    } finally {
      await cleanupConnection(page1, page2);
      await cleanup();
    }
  });
});
```

### Available Utilities

#### Connection Setup
- `setupTwoPeerConnection(browser)` - Creates two browser contexts
- `createVideoConnection(page1, page2)` - Establishes video chat
- `cleanupConnection(page1, page2)` - Properly closes connections

#### Watch Mode
- `switchToWatchMode(page1, page2)` - Switches both pages to watch mode
- `loadAndSyncVideo(page1, page2, url)` - Loads and syncs video URL

#### Media
- `mockMediaDevices(page)` - Provides fake camera/microphone
- `testMediaControls(page)` - Tests mute/video toggle buttons

#### Assertions
- `waitForVisible(page, selector, timeout)` - Wait for element visibility
- `waitForText(page, selector, text, timeout)` - Wait for text content

## Test Configuration

### Browser Settings
- **Chromium**: Uses fake media devices, grants camera/microphone permissions
- **Firefox**: Configured with fake media preferences
- **Single Worker**: Prevents race conditions in WebRTC tests

### Timeouts
- Action timeout: 10 seconds
- Navigation timeout: 15 seconds
- Connection establishment: 15 seconds

### Media Mocking
Tests use fake media devices to ensure consistent behavior:
- Fake video: Green canvas with "TEST VIDEO" text
- Fake audio: Generated oscillator tone
- Multiple camera simulation for testing camera switching

## Debugging Tests

### Visual Debugging
```bash
# Run with browser visible
pnpm test:e2e:headed

# Run in debug mode (step through)
pnpm test:e2e:debug

# Generate trace for failed tests
pnpm exec playwright test --trace on
```

### Console Logging
Tests automatically capture console logs from both pages:
```
Page1: Connection established
Page2: Received remote stream
```

### Screenshots and Videos
- Screenshots taken on failure
- Videos recorded for failed tests
- Traces available for debugging

## Common Issues

### WebRTC Timing
- Use proper timeouts for connection establishment
- Wait for status messages before proceeding
- Clean up connections properly to avoid interference

### Media Permissions
- Always mock media devices for consistent testing
- Grant permissions in browser context setup
- Handle permission denial scenarios explicitly

### Firebase Mocking
- Use Firebase mocks for unit-like testing
- Real Firebase for integration testing
- Clean up listeners to prevent memory leaks

## Adding New Test Categories

1. Create new spec file: `tests/e2e/my-feature.spec.js`
2. Import utilities from `../helpers/test-utils.js`
3. Follow the established patterns for setup/cleanup
4. Add specific utilities to helpers if needed
5. Update this README with new patterns

## Performance Considerations

- Tests run with single worker to avoid WebRTC conflicts
- Media devices are mocked to reduce resource usage
- Proper cleanup prevents memory leaks between tests
- Timeouts are optimized for CI/CD environments