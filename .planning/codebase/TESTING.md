# Testing Patterns

**Analysis Date:** 2025-12-26

## Test Framework

**Runner:**
- Vitest 4.0.13 with browser mode (Playwright provider)
- Config: `vitest.config.js`
- Globals enabled: `globals: true`

**Assertion Library:**
- Vitest built-in expect
- Matchers: toBe, toEqual, toThrow, toHaveBeenCalled, toMatchObject

**Run Commands:**
```bash
pnpm test                     # Run all tests (Chromium only)
pnpm test:watch               # Watch mode for development
pnpm test:ui                  # Vitest UI for debugging
pnpm test:compat              # Cross-browser (Chromium + Firefox + WebKit)
pnpm test:smoke               # Quick smoke tests only
pnpm test:unit                # Unit tests only
pnpm test:integration         # Integration tests only
pnpm test:e2e                 # E2E tests (headless)
pnpm test:e2e:ui              # E2E with Playwright UI
pnpm test:e2e:headed          # E2E with visible browser
pnpm test:e2e:debug           # Debug E2E tests
pnpm test:e2e:report          # View test report
```

## Test File Organization

**Location:**
- Co-located with source: `src/**/*.test.js` (e.g., `src/components/base/button/icon-button.test.js`)
- Centralized in tests/: `tests/unit/*.test.js`, `tests/integration/*.test.js`
- Test types organized by directory:
  - `tests/unit/` - Unit tests
  - `tests/smoke/` - Quick smoke tests
  - `tests/integration/` - Integration tests
  - `tests/e2e/` - End-to-end Playwright tests

**Naming:**
- Unit/integration/smoke tests: `*.test.js`
- E2E tests: `*.spec.js`
- Examples:
  - `tests/unit/call-controller.test.js`
  - `tests/smoke/call-controller-smoke.test.js`
  - `tests/e2e/smoke.spec.js`

**Structure:**
```
HangVidU/
├── src/
│   ├── components/
│   │   └── base/
│   │       └── button/
│   │           ├── icon-button.js
│   │           └── icon-button.test.js
│   └── webrtc/
│       └── tests/
│           └── ice.test.js
├── tests/
│   ├── unit/
│   │   ├── call-controller.test.js
│   │   ├── firebase-connection.test.js
│   │   └── listener-persistence.test.js
│   ├── smoke/
│   │   └── call-controller-smoke.test.js
│   ├── integration/
│   │   └── call-flow-imports.test.js
│   ├── e2e/
│   │   └── smoke.spec.js
│   └── setup.js
```

## Test Structure

**Suite Organization:**
```javascript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock dependencies at top of file
vi.mock('../../src/webrtc/call-flow.js', () => ({
  createCall: vi.fn(),
  answerCall: vi.fn(),
}));

describe('CallController (unit)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    CallController.resetState();
  });

  afterEach(() => {
    // Cleanup if needed
  });

  it('createCall delegates to call-flow and emits created event', async () => {
    const fakeResult = { success: true, roomLink: 'link' };
    createCallFlow.mockResolvedValueOnce(fakeResult);

    const created = vi.fn();
    CallController.on('created', created);

    const res = await CallController.createCall({ localStream: {} });

    expect(createCallFlow).toHaveBeenCalled();
    expect(res).toEqual(fakeResult);
    expect(created).toHaveBeenCalled();
  });
});
```

**Patterns:**
- Use beforeEach for per-test setup (not beforeAll)
- Use afterEach to clean up mocks: `vi.clearAllMocks()`, `vi.restoreAllMocks()`
- Arrange/Act/Assert pattern in complex tests
- One primary assertion focus per test (multiple expects OK if related)

**Component Test Structure:**
```javascript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import createIconButton from './icon-button.js';

describe('createIconButton', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders icon and fires click handler', () => {
    const onClick = vi.fn();
    const btn = createIconButton({
      title: 'Call',
      iconHtml: '<i class="fa fa-phone"></i>',
      onClick,
      parent: container,
    });

    const button = btn.querySelector('button');
    expect(button).toBeTruthy();

    button.click();
    expect(onClick).toHaveBeenCalled();
  });
});
```

## Mocking

**Framework:**
- Vitest built-in mocking (vi)
- Module mocking via `vi.mock()` at top of file
- Function mocking via `vi.fn()`

**Patterns:**
```javascript
import { vi } from 'vitest';

// Mock entire module
vi.mock('../../src/webrtc/call-flow.js', () => ({
  createCall: vi.fn(),
  answerCall: vi.fn(),
}));

// Access mocked function
import { createCall } from '../../src/webrtc/call-flow.js';
createCall.mockResolvedValueOnce({ success: true });

// Or with vi.mocked
const mockCreateCall = vi.mocked(createCall);
mockCreateCall.mockReturnValue('result');
```

**What to Mock:**
- Firebase RTDB operations
- WebRTC peer connections (in unit tests)
- File system/browser APIs
- External services (YouTube API)
- Time/dates (use vi.useFakeTimers if needed)

**What NOT to Mock:**
- Pure functions and utilities
- Internal business logic (test it directly)
- Simple getters/setters

## Fixtures and Factories

**Test Data:**
```javascript
// Factory pattern for test objects
function createMockStream() {
  return {
    getTracks: vi.fn(() => []),
    getVideoTracks: vi.fn(() => []),
    getAudioTracks: vi.fn(() => []),
  };
}

// In tests
const localStream = createMockStream();
```

**Location:**
- Factory functions: Defined in test file near usage
- Shared fixtures: Could use `tests/fixtures/` (not currently used)
- Mock data: Inline in tests when simple, factory when complex

## Coverage

**Requirements:**
- No enforced coverage target
- Coverage tracked for awareness only
- Focus on critical paths (WebRTC, Firebase, media)

**Configuration:**
```javascript
// vitest.config.js
coverage: {
  reporter: ['text', 'html', 'lcov'],
  exclude: [
    'node_modules/',
    'tests/e2e/',
    'dist/',
    '*.config.js',
    'go-server/',
  ],
}
```

**View Coverage:**
```bash
pnpm test:coverage
open coverage/index.html
```

## Test Types

**Unit Tests:**
- Test single function/module in isolation
- Mock all external dependencies (Firebase, WebRTC, media)
- Fast: each test <100ms
- Examples: `tests/unit/call-controller.test.js`, `tests/unit/firebase-connection.test.js`

**Smoke Tests:**
- Minimal verification of core functionality
- Quick: entire suite <5 seconds
- Examples: `tests/smoke/call-controller-smoke.test.js`

**Integration Tests:**
- Test multiple modules together
- Mock only external boundaries (Firebase, WebRTC)
- Use real internal modules
- Examples: `tests/integration/call-flow-imports.test.js`

**E2E Tests:**
- Framework: Playwright
- Scope: Full user flows in browser
- Location: `tests/e2e/*.spec.js`
- Fake media devices: `--use-fake-device-for-media-stream`
- Single worker mode for WebRTC coordination

## Common Patterns

**Async Testing:**
```javascript
it('should handle async operation', async () => {
  const result = await asyncFunction();
  expect(result).toBe('expected');
});
```

**Error Testing:**
```javascript
it('should throw on invalid input', () => {
  expect(() => functionCall()).toThrow('error message');
});

// Async error
it('should reject on failure', async () => {
  await expect(asyncCall()).rejects.toThrow('error message');
});
```

**Event Emitter Testing:**
```javascript
it('emits event when call is created', async () => {
  const handler = vi.fn();
  CallController.on('created', handler);

  await CallController.createCall({ localStream: {} });

  expect(handler).toHaveBeenCalled();
});
```

**DOM Testing (Browser Mode):**
```javascript
it('renders element correctly', () => {
  const container = document.createElement('div');
  document.body.appendChild(container);

  const element = createComponent({ parent: container });

  expect(container.querySelector('.component')).toBeTruthy();

  // Cleanup
  document.body.innerHTML = '';
});
```

**Snapshot Testing:**
- Not used in this codebase
- Prefer explicit assertions

## E2E Testing (Playwright)

**Configuration:**
```javascript
// playwright.config.js
{
  workers: 1,  // Single worker for WebRTC coordination
  use: {
    launchOptions: {
      args: [
        '--use-fake-device-for-media-stream',
        '--use-fake-ui-for-media-stream',
      ],
    },
    ignoreHTTPSErrors: true,  // Self-signed certs
    actionTimeout: 10000,
    navigationTimeout: 15000,
  },
}
```

**Test Structure:**
```javascript
import { test, expect } from '@playwright/test';

test.describe('Core Functionality Smoke Tests', () => {
  test('app loads and shows lobby', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('#lobby')).toBeVisible();
    await expect(page.locator('#lobby-call-btn')).toBeVisible();
  });
});
```

## Browser Mode Benefits

**Why Browser Mode (from `vitest.config.js`):**
- Native WebRTC APIs (no mocking needed for RTCPeerConnection)
- Real browser environment for accurate testing
- Tests run in actual Chromium browser via Playwright
- Access to getUserMedia, IndexedDB, localStorage
- More realistic test environment than Node.js + JSDOM

**Cross-Browser Testing:**
```bash
# Test in Chromium + Firefox + WebKit
pnpm test:compat

# Or via environment variable
COMPAT=true pnpm test
```

## Test Setup

**Setup File:** `tests/setup.js`
```javascript
// Stubs import.meta.env for Firebase config
vi.stubGlobal('import', {
  meta: {
    env: {
      VITE_FIREBASE_API_KEY: 'test-key',
      // ... other env vars
    },
  },
});
```

## Linting & Formatting for Tests

**Current State:**
- No ESLint config detected
- No Prettier config detected
- Test style follows manual conventions
- Consistent 2-space indentation, semicolons

---

*Testing analysis: 2025-12-26*
*Update when test patterns change*
