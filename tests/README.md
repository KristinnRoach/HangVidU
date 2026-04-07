# Tests

## Two Vitest Projects

Tests run in two vitest projects, split by filename suffix:

- **`*.test.js`** — runs in Node with jsdom (default, fast, no Playwright overhead)
- **`*.browser.test.js`** — runs in real Chromium via Playwright

Use `.browser.test.js` only when the test needs real browser APIs that jsdom can't provide (WebRTC, OPFS, ServiceWorker, Canvas, etc.). Everything else should be `.test.js`.

## Scripts

| Script | What it runs |
|--------|-------------|
| `pnpm test` | Both projects (node + browser), Chromium only |
| `pnpm test:node` | Node project only |
| `pnpm test:browser` | Browser project only |
| `pnpm test:compat` | Node once, then browser across Chromium/Firefox/WebKit |
| `pnpm test:all` | `test:compat` + `test:e2e` |
| `pnpm test:watch` | Both projects in watch mode |
| `pnpm test:ui` | Vitest UI |
| `pnpm test:coverage` | Both projects with coverage report |
| `pnpm test:file-transfer` | Standalone large file transfer benchmark |
| `pnpm test:file-transfer:full` | Extended file transfer benchmark (multiple sizes) |
| `pnpm test:e2e` | Playwright end-to-end tests (separate from vitest) |
| `pnpm test:e2e:ui` | Playwright with interactive UI |
| `pnpm test:e2e:headed` | Playwright with visible browser |
| `pnpm test:e2e:debug` | Playwright in debug mode |
| `pnpm test:e2e:report` | Show last Playwright report |

## Structure

```
tests/
├── unit/           # Unit tests
├── smoke/          # Quick smoke tests
├── integration/    # Integration tests
├── e2e/            # Playwright end-to-end (separate runner)
├── setup.js        # Shared setup (env stubs, runs in both projects)
└── global-setup.js # Node-process setup (birpc teardown suppression, browser project only)

src/**/*.test.js    # Co-located component/module tests
```

## Adding a New Test

1. Create `my-feature.test.js` (defaults to node/jsdom)
2. If it needs real browser APIs, name it `my-feature.browser.test.js` instead
3. No config changes needed — the filename pattern handles routing
