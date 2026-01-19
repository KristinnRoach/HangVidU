# Testing Patterns

**Analysis Date:** 2026-01-19

## Test Framework

**Runner:**
- Vitest 4.0.13 (browser mode with Playwright provider)
- Config: `vitest.config.js`

**Browser Mode:**
- Tests run in actual Chromium browser (native APIs)
- No JSDOM - real browser environment
- Optional cross-browser: `COMPAT=true` runs Chromium + Firefox + WebKit

**Assertion Library:**
- Vitest's built-in `expect()` (compatible with Jest)

**Run Commands:**
```bash
pnpm test              # Run all tests (Chromium only, fast)
pnpm test:watch        # Watch mode for development
pnpm test:ui           # Vitest UI for debugging
pnpm test:compat       # Cross-browser (Chromium + Firefox + WebKit)
pnpm test:smoke        # Quick smoke tests only
pnpm test:unit         # Unit tests only
pnpm test:integration  # Integration tests only
pnpm test:coverage     # Run with coverage report
```

## E2E Framework

**Runner:**
- Playwright 1.56.1
- Config: `playwright.config.js`

**Run Commands:**
```bash
pnpm test:e2e          # E2E tests (headless)
pnpm test:e2e:ui       # E2E with Playwright UI
pnpm test:e2e:headed   # E2E with visible browser
pnpm test:e2e:debug    # Debug E2E tests
pnpm test:e2e:report   # View test report
```

## Test File Organization

**Location:**
- Co-located tests: `src/**/*.test.js` (next to source)
- Separate test directories: `tests/unit/`, `tests/integration/`, `tests/smoke/`
- E2E tests: `tests/e2e/*.spec.js`

**Naming:**
- Vitest tests: `*.test.js`
- Playwright E2E: `*.spec.js`

**Structure:**
```
src/
├── webrtc/
│   ├── call-controller.js
│   └── tests/
│       ├── ice.test.js
│       └── rtdb-listener-cleanup.test.js
├── messaging/
│   ├── messaging-controller.js
│   └── messaging-controller.test.js
tests/
├── unit/
│   ├── call-controller.test.js
│   └── firebase-connection.test.js
├── integration/
│   └── call-flow-imports.test.js
├── smoke/
│   └── call-controller-smoke.test.js
├── e2e/
│   └── smoke.spec.js
└── setup.js
```

## Test Structure

**Suite Organization:**
```javascript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('CallController (unit)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    CallController.resetState();
  });

  afterEach(() => {
    CallController.resetState();
  });

  it('createCall delegates to call-flow and emits created event', async () => {
    // Arrange
    const fakeResult = { success: true, roomId: 'room-123' };
    createCallFlow.mockResolvedValueOnce(fakeResult);
    const created = vi.fn();
    CallController.on('created', created);

    // Act
    const res = await CallController.createCall({ localStream: {} });

    // Assert
    expect(createCallFlow).toHaveBeenCalled();
    expect(res).toEqual(fakeResult);
    expect(created).toHaveBeenCalledWith({ roomId: 'room-123', ... });
  });
});
```

**Patterns:**
- Group related tests with nested `describe()` blocks
- Use descriptive test names: "should X when Y"
- Arrange-Act-Assert structure
- Reset state in `beforeEach`/`afterEach`

## Mocking

**Framework:** Vitest's `vi.mock()` and `vi.fn()`

**Module Mocking Pattern:**
```javascript
// Mock at top of file, before imports
vi.mock('../../src/webrtc/call-flow.js', () => ({
  createCall: vi.fn(),
  answerCall: vi.fn(),
}));

vi.mock('../../src/room.js', () => ({
  default: {
    cancelCall: vi.fn(),
    leaveRoom: vi.fn(),
    onMemberJoined: vi.fn(),
  },
}));

vi.mock('../../src/firebase/auth.js', () => ({
  getUserId: () => 'test-user-id',
  getCurrentUser: () => ({ uid: 'test-user-id' }),
  isLoggedIn: () => true,
}));

vi.mock('firebase/database', () => ({
  ref: vi.fn((db, path) => ({ _path: path })),
  off: vi.fn(),
  get: vi.fn(),
  set: vi.fn(),
  onValue: vi.fn(),
  onChildAdded: vi.fn(),
}));
```

**Mock Transport for Testing:**
```javascript
class MockTransport {
  constructor() {
    this.sentMessages = [];
    this.listeners = new Map();
  }

  async send(contactId, text) {
    this.sentMessages.push({ contactId, text });
  }

  listen(contactId, onMessage) {
    this.listeners.set(contactId, onMessage);
    return () => this.listeners.delete(contactId);
  }

  // Test helper
  simulateMessage(contactId, text) {
    const listener = this.listeners.get(contactId);
    if (listener) listener(text, { text }, false);
  }
}
```

**What to Mock:**
- Firebase database operations
- External API calls
- Auth state
- Dependency modules when testing unit behavior

**What NOT to Mock:**
- Native browser APIs in browser mode (WebRTC, DOM)
- The module under test
- Simple utilities without side effects

## Fixtures and Factories

**Test Data:**
```javascript
const mockResult = {
  success: true,
  pc: { id: 'pc1' },
  roomId: 'room-123',
  roomLink: 'https://example.com/?room=room-123',
  role: 'initiator',
  dataChannel: { addEventListener: vi.fn(), readyState: 'open' },
};

const mockCandidates = [
  {
    candidate: 'candidate:1 1 UDP 2122260223 192.168.1.1 50001 typ host',
    sdpMid: '0',
    sdpMLineIndex: 0,
  },
];
```

**Location:**
- Inline in test files for simple fixtures
- `tests/fixtures/` for shared test data

## Coverage

**Requirements:** None enforced (no coverage thresholds)

**View Coverage:**
```bash
pnpm test:coverage     # Generate report
# Reports output to /coverage/
```

**Coverage config:**
```javascript
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

## Test Types

**Unit Tests:**
- Location: `tests/unit/`, `src/**/*.test.js`
- Scope: Single module/function isolation
- Heavy mocking of dependencies
- Fast execution

**Integration Tests:**
- Location: `tests/integration/`
- Scope: Module import chains, real module interactions
- Light mocking (only external services)
- Verify imports resolve correctly

**Smoke Tests:**
- Location: `tests/smoke/`
- Scope: Critical happy paths
- Minimal mocking
- Quick verification after refactors
- Target: < 5 seconds

**E2E Tests:**
- Location: `tests/e2e/*.spec.js`
- Scope: Full user flows in browser
- Uses Playwright with fake media devices
- Single worker (WebRTC coordination)
- Extended timeouts for connection establishment

## Common Patterns

**Async Testing:**
```javascript
it('should handle async operation', async () => {
  const result = await CallController.createCall({ localStream: {} });
  expect(result.success).toBe(true);
});

it('should wait for async with timeout', async () => {
  // Wait a tick for async listener setup
  await new Promise((resolve) => setTimeout(resolve, 10));
  expect(CallController.listeners.has('rejection')).toBe(true);
});
```

**Error Testing:**
```javascript
it('should throw if transport is missing', () => {
  expect(() => new MessagingController()).toThrow('transport implementation');
});

it('should reject invalid input', async () => {
  await expect(session.send('')).rejects.toThrow('non-empty string');
  await expect(session.send(null)).rejects.toThrow('non-empty string');
});
```

**Event Listener Testing:**
```javascript
it('emits remoteHangup event when cleanup is triggered by remote party', async () => {
  CallController.pc = { close: vi.fn() };
  CallController.roomId = 'room-remote';
  CallController.partnerId = 'partner-123';

  const remoteHangupListener = vi.fn();
  CallController.on('remoteHangup', remoteHangupListener);

  await CallController.cleanupCall({ reason: 'remote_cancelled' });

  expect(remoteHangupListener).toHaveBeenCalledWith({
    roomId: 'room-remote',
    partnerId: 'partner-123',
    reason: 'remote_cancelled',
  });
});
```

**Idempotency Testing:**
```javascript
it('multiple rapid hangUp calls only execute once', async () => {
  CallController.pc = { close: vi.fn() };
  CallController.roomId = 'room-idempotent';
  RoomService.cancelCall.mockResolvedValueOnce();

  await Promise.all([
    CallController.hangUp(),
    CallController.hangUp(),
    CallController.hangUp(),
  ]);

  expect(RoomService.cancelCall).toHaveBeenCalledTimes(1);
});
```

**DOM Component Testing:**
```javascript
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
    button.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
```

## E2E Patterns

**Playwright E2E Test:**
```javascript
import { test, expect } from '@playwright/test';

test.describe('Core Functionality Smoke Tests', () => {
  test('app loads and shows lobby', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#lobby')).toBeVisible();
    await expect(page.locator('#lobby-call-btn')).toBeVisible();
  });

  test('UI elements are present and interactive', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#lobby-call-btn')).toBeEnabled();
    await expect(page.locator('#chat-controls')).toBeAttached();
  });
});
```

**WebRTC E2E Config:**
```javascript
// playwright.config.js
use: {
  permissions: ['camera', 'microphone'],
  launchOptions: {
    args: [
      '--use-fake-ui-for-media-stream',
      '--use-fake-device-for-media-stream',
    ],
  },
}
```

## Test Setup

**Global Setup (`tests/setup.js`):**
```javascript
// Stub import.meta.env for tests
try {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    Object.assign(import.meta.env, {
      VITE_FIREBASE_API_KEY: 'dummy',
      VITE_FIREBASE_AUTH_DOMAIN: 'dummy',
      VITE_FIREBASE_PROJECT_ID: 'dummy',
    });
  }
} catch {}

// Browser mode provides native WebRTC APIs - no mocking needed
```

---

*Testing analysis: 2026-01-19*
