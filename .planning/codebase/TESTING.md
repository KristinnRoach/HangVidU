# Testing Patterns

**Analysis Date:** 2026-01-08

## Test Framework

**Runner:**
- Vitest 4.0.13 - Primary test framework with browser mode
- Config: `vitest.config.js` in project root
- Browser provider: @vitest/browser-playwright 4.0.13

**Assertion Library:**
- Vitest built-in `expect`
- Matchers: `toBe`, `toEqual`, `toThrow`, `toMatchObject`, `toHaveBeenCalledWith`

**Run Commands:**
```bash
pnpm test                              # Run all tests (Chromium only, fast)
pnpm test:watch                        # Watch mode for development
pnpm test:ui                           # Vitest UI for debugging
pnpm test:compat                       # Cross-browser (Chromium + Firefox + WebKit)
pnpm test:smoke                        # Quick smoke tests only
pnpm test:unit                         # Unit tests only
pnpm test:integration                  # Integration tests only
pnpm test:e2e                          # Playwright E2E tests
pnpm test:e2e:ui                       # E2E with Playwright UI
pnpm test:e2e:headed                   # E2E with visible browser
pnpm test:e2e:debug                    # Debug E2E tests
pnpm test:all                          # Full test suite (compat + e2e)
```

## Test File Organization

**Location:**
- Unit tests: `tests/unit/*.test.js` OR co-located `src/**/*.test.js`
- Integration tests: `tests/integration/*.test.js`
- Smoke tests: `tests/smoke/*.test.js`
- E2E tests: `tests/e2e/*.spec.js` (Playwright, separate from Vitest)
- Investigation tests: `tests/investigation/*.test.js` (bug reproduction)

**Naming:**
- Vitest: `*.test.js` suffix
- Playwright E2E: `*.spec.js` suffix (ONLY for E2E, not unit/integration)

**Structure:**
```
tests/
├── unit/                              # Isolated function/class tests
│   ├── call-controller.test.js
│   └── incoming-listener-cleanup.test.js
├── integration/                       # Module integration tests
│   └── call-flow-imports.test.js
├── smoke/                             # Quick sanity tests
│   └── call-controller-smoke.test.js
├── investigation/                     # Bug investigation tests
│   └── camera-switch-freeze.test.js
└── e2e/                              # End-to-end tests (Playwright)
    └── smoke.spec.js

src/
├── webrtc/
│   └── tests/
│       └── ice.test.js               # Co-located with ice.js
├── utils/dom/
│   └── tests/
│       └── component.test.js         # Co-located with component.js
└── components/base/button/
    └── icon-button.test.js           # Co-located with icon-button.js
```

## Test Structure

**Suite Organization:**
```javascript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('ModuleName', () => {
  describe('functionName', () => {
    beforeEach(() => {
      // Setup before each test (reset state, create fixtures)
    });

    afterEach(() => {
      // Cleanup after each test (restore mocks, remove DOM elements)
    });

    it('should handle success case', () => {
      // Arrange
      const input = createTestInput();

      // Act
      const result = functionName(input);

      // Assert
      expect(result).toEqual(expectedOutput);
    });

    it('should handle error case', () => {
      expect(() => functionName(null)).toThrow('Invalid input');
    });
  });
});
```

**Patterns:**
- Use `beforeEach` for per-test setup (avoid `beforeAll`)
- Use `afterEach` to restore mocks and clean up DOM
- Explicit arrange/act/assert comments in complex tests (optional)
- One assertion focus per test (but multiple `expect()` calls OK)

## Mocking

**Framework:**
- Vitest built-in mocking (`vi`)
- Module mocking via `vi.mock()` at top of test file

**Patterns:**
```javascript
import { vi } from 'vitest';

// Mock entire module
vi.mock('../../src/webrtc/call-flow.js', () => ({
  createCall: vi.fn(),
  answerCall: vi.fn(),
}));

// Mock Firebase functions
vi.mock('firebase/database', () => ({
  getDatabase: vi.fn(() => ({})),
  ref: vi.fn(() => ({})),
  push: vi.fn(() => ({})),
  set: vi.fn(() => Promise.resolve()),
  onChildAdded: vi.fn(),
  onValue: vi.fn(),
  off: vi.fn(),
}));

// Use mocked functions in tests
import { createCall } from '../../src/webrtc/call-flow.js';
const mockCreateCall = vi.mocked(createCall);
mockCreateCall.mockResolvedValue({ success: true });
```

**What to Mock:**
- Firebase database operations (RTDB listeners, reads, writes)
- External API calls (YouTube search)
- File system operations (if any)
- Browser APIs when not in browser mode (rare, since we use browser mode)

**What NOT to Mock:**
- WebRTC APIs (browser mode provides native APIs)
- Internal pure functions
- Simple utilities (string manipulation, array helpers)

**Example from `src/webrtc/tests/ice.test.js`:**
```javascript
vi.mock('firebase/database', () => ({
  getDatabase: vi.fn(() => ({})),
  ref: vi.fn(() => ({})),
  push: vi.fn(() => ({})),
  set: vi.fn(() => Promise.resolve()),
  onChildAdded: vi.fn(),
  get: vi.fn(() => Promise.resolve({ exists: () => false, val: () => null })),
  onValue: vi.fn(),
  off: vi.fn(),
}));

vi.mock('../../firebase/firebase', () => ({ app: {} }));
vi.mock('../storage/fb-rtdb/rtdb', () => ({
  rtdb: {},
  addRTDBListener: vi.fn(),
}));
```

## Fixtures and Factories

**Test Data:**
```javascript
// Factory functions in test file
function createTestConfig(overrides) {
  return {
    targetDir: '/tmp/test',
    global: false,
    ...overrides,
  };
}

function createMockPeerConnection() {
  return {
    addIceCandidate: vi.fn().mockResolvedValue(undefined),
    remoteDescription: null,
  };
}
```

**Location:**
- Factory functions: Define in test file near usage
- Shared fixtures: Not heavily used (most tests create data inline)

**Example from `tests/unit/call-controller.test.js`:**
```javascript
function createMockCallController() {
  return {
    state: 'idle',
    createCall: vi.fn(),
    answerCall: vi.fn(),
    hangup: vi.fn(),
  };
}
```

## Coverage

**Requirements:**
- No enforced coverage target
- Coverage tracked for awareness

**Configuration:**
```javascript
// From vitest.config.js
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
pnpm test:coverage      # Run tests with coverage
open coverage/index.html  # View HTML report
```

## Test Types

**Unit Tests:**
- Scope: Test single function/class in isolation
- Mocking: Mock all external dependencies (Firebase, APIs)
- Speed: Fast (<100ms per test)
- Examples: `tests/unit/call-controller.test.js`, `src/webrtc/tests/ice.test.js`

**Integration Tests:**
- Scope: Test multiple modules together
- Mocking: Mock only external boundaries (Firebase, external APIs), use real internal modules
- Examples: `tests/integration/call-flow-imports.test.js`

**Smoke Tests:**
- Scope: Quick sanity checks for critical functionality
- Speed: Very fast
- Examples: `tests/smoke/call-controller-smoke.test.js`

**E2E Tests:**
- Framework: Playwright 1.56.1 (separate from Vitest)
- Scope: Test full user flows in real browser
- Location: `tests/e2e/smoke.spec.js`
- Config: `playwright.config.js`
- Special: Uses fake media devices (`--use-fake-device-for-media-stream`)

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
// Synchronous error
it('should throw on invalid input', () => {
  expect(() => functionCall()).toThrow('error message');
});

// Async error
it('should reject on failure', async () => {
  await expect(asyncCall()).rejects.toThrow('error message');
});
```

**DOM Testing (Browser Mode):**
```javascript
describe('Component', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders and fires click handler', () => {
    const onClick = vi.fn();
    const component = createComponent({
      parent: container,
      onClick,
    });

    const button = container.querySelector('button');
    button.click();

    expect(onClick).toHaveBeenCalled();
  });
});
```

**Spy Pattern:**
```javascript
it('calls dependency with correct arguments', () => {
  const spy = vi.spyOn(dependency, 'method');

  functionUnderTest();

  expect(spy).toHaveBeenCalledWith('expected', 'args');
  spy.mockRestore();
});
```

## Browser Mode Configuration

**From `vitest.config.js`:**
```javascript
test: {
  browser: {
    enabled: true,
    provider: playwright(),
    headless: true,
    instances: isCompatMode
      ? [
          { browser: 'chromium' },
          { browser: 'firefox' },
          { browser: 'webkit' },
        ]
      : [{ browser: 'chromium' }],
  },
  globals: true,
  setupFiles: ['./tests/setup.js'],
}
```

**Key Features:**
- Native browser APIs (WebRTC, MediaDevices) without mocking
- Cross-browser testing with `COMPAT=true` environment variable
- Setup file stubs Firebase environment variables

**Setup File (`tests/setup.js`):**
```javascript
// Stub import.meta.env for tests so Firebase config does not throw
try {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    Object.assign(import.meta.env, {
      VITE_FIREBASE_API_KEY: 'dummy',
      VITE_FIREBASE_AUTH_DOMAIN: 'dummy',
      // ... other stubs
    });
  }
} catch {}
```

## E2E Test Configuration

**Playwright Config (`playwright.config.js`):**
- Single worker (WebRTC coordination required)
- Fake media streams (`--use-fake-device-for-media-stream`)
- Self-signed cert acceptance for local HTTPS
- Extended timeouts for connection establishment

**Example E2E Test (`tests/e2e/smoke.spec.js`):**
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

## Test Commands Summary

| Command | Purpose | Browser(s) | Speed |
|---------|---------|------------|-------|
| `pnpm test` | All Vitest tests | Chromium | Fast |
| `pnpm test:watch` | Watch mode | Chromium | Interactive |
| `pnpm test:ui` | Vitest UI | Chromium | Interactive |
| `pnpm test:compat` | Cross-browser | Chromium, Firefox, WebKit | Slow |
| `pnpm test:smoke` | Smoke tests only | Chromium | Very Fast |
| `pnpm test:unit` | Unit tests only | Chromium | Fast |
| `pnpm test:integration` | Integration tests only | Chromium | Medium |
| `pnpm test:e2e` | Playwright E2E | Chromium | Slow |
| `pnpm test:all` | Full suite | All | Slowest |

---

*Testing analysis: 2026-01-08*
*Update when test patterns change*
