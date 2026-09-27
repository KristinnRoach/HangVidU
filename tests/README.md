# Tests

## Two Vitest Projects

Tests run in two vitest projects, split by filename suffix:

- **`*.test.js`** — runs in Node with jsdom (default, fast, no Playwright overhead)
- **`*.browser.test.js`** — runs in real Chromium via Playwright

Use `.browser.test.js` only when the test needs real browser APIs that jsdom can't provide (WebRTC, OPFS, ServiceWorker, Canvas, etc.). Everything else should be `.test.js`.

## Scripts

| Script                   | What it runs                                           |
| ------------------------ | ------------------------------------------------------ |
| `vp run test`            | Both projects (node + browser), Chromium only          |
| `vp run test:node`       | Node project only                                      |
| `vp run test:browser`    | Browser project only                                   |
| `vp run setup:browsers`  | Ensure Chromium, Firefox, and WebKit are installed     |
| `vp run test:compat`     | Node once, then browser across Chromium/Firefox/WebKit |
| `vp run test:all`        | `test:compat` + `test:e2e`                             |
| `vp run test:watch`      | Both projects in watch mode                            |
| `vp run test:ui`         | Vitest UI                                              |
| `vp run test:coverage`   | Both projects with coverage report                     |
| `vp run test:e2e`        | Playwright end-to-end tests (separate from vitest)     |
| `vp run test:e2e:ui`     | Playwright with interactive UI                         |
| `vp run test:e2e:headed` | Playwright with visible browser                        |
| `vp run test:e2e:debug`  | Playwright in debug mode                               |
| `vp run test:e2e:report` | Show last Playwright report                            |

`vp run test:compat` handles browser installation automatically and reuses installed browsers. Other browser test commands need `vp run setup:browsers` on a fresh machine or after a Playwright upgrade.

## Structure

```text
tests/
├── unit/           # Unit tests
├── smoke/          # Quick smoke tests
├── integration/    # Integration tests
├── e2e/            # Playwright end-to-end (separate runner)
├── env-setup.js     # Runs inside each test environment before every file (env stubs)
└── process-setup.js # Runs once in the Node orchestrator process (birpc suppression)

src/**/*.test.js    # Co-located component/module tests
```

## Adding a New Test

1. Create `my-feature.test.js` (defaults to node/jsdom)
2. If it needs real browser APIs, name it `my-feature.browser.test.js` instead
3. No config changes needed — the filename pattern handles routing
