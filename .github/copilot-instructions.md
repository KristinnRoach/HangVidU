# HangVidU - Copilot Instructions

## Repository Overview

HangVidU is a peer-to-peer video chat application with watch-together mode built using WebRTC for P2P connections and Firebase for signaling. The app allows 1-to-1 video calls with synchronized YouTube video watching.

**Tech Stack:**
- Frontend: Vanilla JavaScript (ES modules), Vite, Lit (web components)
- Runtime: Node.js 20.19.0
- Package Manager: pnpm (required, not npm)
- Testing: Vitest (unit/integration), Playwright (E2E)
- Deployment: Firebase Hosting + GitHub Pages
- Backend: Firebase Realtime Database, Cloud Functions
- Build Tool: Vite 7.3.1

## Build & Development

### Prerequisites
- Node.js 20.19.0
- pnpm (install globally: `npm install -g pnpm`)
- Environment files must be configured before development

### Critical Build Notes

**ALWAYS use pnpm, never npm or yarn.** The project uses pnpm workspaces and lock files.

**Environment Setup:**
1. Copy `.env.production.example` to `.env.production` for local testing (DO NOT commit)
2. For development, create `.env.development` if needed
3. Production secrets are stored in GitHub Actions Secrets and populated during CI

### Common Commands

**Development:**
```bash
pnpm install              # Install dependencies - always run first
pnpm dev                  # Start dev server with Vite + ngrok (HTTPS on port 5173)
pnpm dev:experiments      # Start dev server with experiments.html
```

**Building:**
```bash
pnpm build                # Build for GitHub Pages (base: /HangVidU/)
pnpm build:hosting        # Build for Firebase Hosting (base: /)
pnpm preview              # Preview production build on port 4173
pnpm preview:https        # Preview with HTTPS enabled
```

**Testing:**
```bash
pnpm test                 # Run vitest unit/integration tests (headless browser)
pnpm test:compat          # Run tests on chromium, firefox, and webkit
pnpm test:watch           # Run tests in watch mode
pnpm test:e2e             # Run Playwright E2E tests (requires dev server)
pnpm test:e2e:ui          # Run E2E tests with Playwright UI
pnpm test:all             # Run compatibility tests + E2E tests
pnpm test:coverage        # Generate test coverage report
```

**Deployment:**
```bash
pnpm deploy:fb            # Build hosting + deploy to Firebase
pnpm deploy:gh            # Build + deploy to GitHub Pages
pnpm deploy:all           # Run compat tests + deploy to both
```

### Build Process Details

1. **Always run `pnpm install` before building** to ensure dependencies are up to date
2. Vite build produces output in `dist/` directory
3. Two deployment targets use different base paths:
   - GitHub Pages: `/HangVidU/` (default `pnpm build`)
   - Firebase Hosting: `/` (use `pnpm build:hosting` or set `BUILD_TARGET=hosting`)
4. Service worker (sw.js) is built using inject manifest strategy
5. Dev server runs on HTTPS (port 5173) with self-signed cert from mkcert

### Testing Guidelines

**Unit/Integration Tests (Vitest):**
- Tests run in actual browsers using @vitest/browser-playwright
- Default: Chromium only (fast)
- Use `COMPAT=true` for multi-browser testing (chromium, firefox, webkit)
- Test files: `src/**/*.test.js`, `tests/unit/**/*.test.js`, `tests/integration/**/*.test.js`
- Setup file: `tests/setup.js`

**E2E Tests (Playwright):**
- Tests located in `tests/e2e/`
- **Must start dev server first**: Run `pnpm dev` in separate terminal OR let `pnpm test:e2e` auto-start it
- Tests require HTTPS and media permissions (fake devices used automatically)
- Single worker mode for WebRTC coordination
- Base URL: `https://localhost:5173/HangVidU` (accepts self-signed certs)

**Important Test Notes:**
- WebRTC tests need special coordination, hence single worker mode in Playwright
- E2E tests auto-start dev server if not running (configured in playwright.config.js)
- Vitest uses browser mode, so tests run in real browser environments
- Use `--headed` or `--ui` flags for debugging E2E tests

## Project Structure

```
/
├── .github/
│   ├── workflows/
│   │   ├── deploy.yml          # Auto-deploy to GitHub Pages on main push
│   │   ├── dependency-check.yml # Weekly outdated deps check
│   │   └── auto-merge-dependabot.yml
│   └── ISSUE_TEMPLATE/
├── src/                        # Main application source
│   ├── main.js                 # Application entry point
│   ├── room.js                 # Video chat room logic
│   ├── sw.js                   # Service worker (PWA)
│   ├── elements.js             # DOM element references
│   ├── components/             # UI components (Lit elements)
│   ├── webrtc/                 # WebRTC connection logic
│   ├── firebase/               # Firebase initialization and config
│   ├── storage/                # Storage utilities (Dexie, Firebase RTDB)
│   ├── media/                  # Media stream handling
│   ├── messaging/              # WebRTC data channel messaging
│   ├── notifications/          # Push notifications (FCM)
│   ├── file-transfer/          # P2P file transfer
│   ├── contacts/               # Contact management
│   ├── user/                   # User authentication/profile
│   ├── utils/                  # Utility functions
│   └── styles/                 # CSS stylesheets
├── tests/
│   ├── setup.js                # Test configuration
│   ├── unit/                   # Unit tests
│   ├── integration/            # Integration tests
│   ├── e2e/                    # End-to-end tests (Playwright)
│   └── investigation/          # Experimental/debugging tests
├── functions/                  # Firebase Cloud Functions
├── public/                     # Static assets
├── scripts/                    # Build/dev scripts
├── index.html                  # Main HTML entry
├── vite.config.js              # Vite configuration
├── vitest.config.js            # Vitest configuration
├── playwright.config.js        # Playwright configuration
├── firebase.json               # Firebase config
└── package.json                # Dependencies and scripts
```

## Key Architectural Elements

### WebRTC Implementation
- Uses Firebase Realtime Database for signaling
- Supports 1-to-1 video calls only
- Media streams handled in `src/media/`
- Connection logic in `src/webrtc/`

### State Management
- No framework - uses vanilla JavaScript
- Dexie (IndexedDB wrapper) for local persistence
- Firebase RTDB for remote state sync

### PWA Configuration
- Service worker strategy: injectManifest
- Source: `src/sw.js`
- Workbox used for precaching and routing
- Dev mode: PWA disabled (injectManifest + ES modules issue)

### Firebase Services Used
- Realtime Database (signaling, contacts)
- Authentication (Google OAuth)
- Cloud Functions (notifications, backend logic)
- Hosting (production deployment)

## CI/CD Pipeline

**GitHub Actions Workflows:**

1. **deploy.yml** (runs on push to main):
   - Installs Node 20.19.0 and pnpm
   - Creates `.env.production` from GitHub Secrets
   - Runs `pnpm build` (GitHub Pages target)
   - Deploys to gh-pages branch

2. **dependency-check.yml** (weekly schedule):
   - Checks for outdated packages
   - Creates/updates issue with report

**Required GitHub Secrets:**
- All `VITE_*` environment variables (Firebase config, API keys, etc.)
- See `.env.production.example` for complete list

## Common Issues & Solutions

### Build Issues
1. **Error: Cannot find pnpm**: Install globally with `npm install -g pnpm`
2. **Vite build fails**: Ensure `pnpm install` was run first
3. **Service worker issues**: In dev, PWA is disabled; test with `pnpm preview:https`

### Test Issues
1. **E2E tests timeout**: Start dev server manually first with `pnpm dev`
2. **WebRTC tests flaky**: Use single worker mode (already configured)
3. **Browser tests fail**: Check that Playwright browsers are installed: `npx playwright install`

### Development Issues
1. **HTTPS required**: Dev server uses mkcert for local HTTPS (auto-configured)
2. **ngrok URL needed**: For testing on mobile devices; domain can be set via `NGROK_DOMAIN` env var
3. **Firebase emulator**: Use `firebase emulators:start` for local Firebase testing

## Important Conventions

1. **Use ES modules**: All JavaScript uses `type: "module"` and ESM syntax
2. **No linter configured**: Follow existing code style when making changes
3. **Test file naming**: `*.test.js` for unit/integration, `*.spec.js` for E2E
4. **Component style**: Lit web components in `src/components/`
5. **Browser support**: Primary target is modern Chromium browsers; Firefox/Safari best-effort

## Quick Reference

**Before making code changes:**
```bash
pnpm install           # Update dependencies
pnpm test             # Run unit tests
pnpm test:e2e         # Run E2E tests
```

**After making changes:**
```bash
pnpm build            # Verify build succeeds
pnpm test             # Run tests again
```

**For deployment verification:**
```bash
pnpm build:hosting    # Build for Firebase
pnpm preview:https    # Test production build locally
```

## Trust These Instructions

**These instructions are comprehensive and tested.** Only search for additional information if:
- Instructions are incomplete for your specific task
- You encounter errors not documented here
- You need to understand implementation details not covered

When in doubt, refer to package.json scripts and config files (vite.config.js, vitest.config.js, playwright.config.js).
