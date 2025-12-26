# Codebase Structure

**Analysis Date:** 2025-12-26

## Directory Layout

```
HangVidU/
├── src/                    # Application source code
│   ├── components/         # UI components by feature
│   ├── firebase/           # Firebase integration (auth, sync)
│   ├── media/              # Media streams and YouTube
│   ├── pwa/                # PWA service worker setup
│   ├── storage/            # Data persistence layer
│   ├── styles/             # Modular CSS architecture
│   ├── utils/              # Utility functions
│   ├── webrtc/             # WebRTC P2P logic
│   ├── temp/               # Draft/temporary code
│   ├── main.js             # Main orchestrator (1,342 lines)
│   ├── elements.js         # DOM element registry
│   ├── room.js             # Room service
│   └── initSentry.js       # Error tracking setup
├── tests/                  # Test suites
│   ├── unit/               # Unit tests
│   ├── integration/        # Integration tests
│   ├── smoke/              # Smoke tests
│   ├── e2e/                # End-to-end Playwright tests
│   └── setup.js            # Test configuration
├── public/                 # Static assets
├── refactor-draft/         # Refactoring documentation
├── index.html              # Main entry point
├── experiments.html        # Dev-only experiments page
├── vite.config.js          # Build configuration
├── vitest.config.js        # Test configuration
├── playwright.config.js    # E2E test configuration
├── firebase.json           # Firebase Hosting config
├── .firebaserc             # Firebase project
├── package.json            # Dependencies and scripts
├── pnpm-lock.yaml          # Dependency lockfile
├── .env.example            # Environment variable template
└── CLAUDE.md               # Developer guidance
```

## Directory Purposes

**src/components/**
- Purpose: UI components organized by feature domain
- Contains: Vanilla JS and Lit web components
- Key files: Component initialization and cleanup functions
- Subdirectories:
  - `auth/` - Authentication UI (AuthComponent.js, google-one-tap.js)
  - `calling/` - Call state overlays (calling-ui.js)
  - `contacts/` - Contact management (contacts.js)
  - `lobby/` - Pre-call lobby UI (lobby.js)
  - `messages/` - DataChannel messaging (messages-ui.js)
  - `notifications/` - Toast and update notifications (notification-manager.js, incoming-call.js)
  - `modal/` - Link copy dialog (copyLinkModal.js)
  - `recent-calls/` - Recent calls history
  - `select/` - Device selection UI
  - `ui/` - Mode controllers (call-mode.js, watch-mode.js)
  - `base/` - Reusable base components (button/, dialog/)

**src/webrtc/**
- Purpose: WebRTC peer-to-peer connection orchestration
- Contains: Call flow logic, peer connection setup, ICE handling, data channels
- Key files:
  - `call-controller.js` - High-level facade with event emitter (653 lines)
  - `call-flow.js` - Core connection establishment (353 lines)
  - `webrtc.js` - PeerConnection factory
  - `ice.js` - ICE candidate management
  - `data-channel.js` - DataChannel setup
  - `webrtc-utils.js` - STUN/TURN configuration
- Subdirectories: `tests/` - WebRTC unit tests

**src/firebase/**
- Purpose: Firebase integration for auth and synchronization
- Contains: Authentication flows, watch-together sync, Firebase config
- Key files:
  - `auth.js` - Authentication with fallback chain (398 lines)
  - `watch-sync.js` - YouTube watch-together sync (398 lines)
  - `onetap.js` - Google One Tap integration
  - `firebase.js` - Firebase app initialization

**src/media/**
- Purpose: Media stream lifecycle and YouTube integration
- Contains: Camera/mic management, YouTube player, device constraints
- Key files:
  - `stream.js` - Stream setup/cleanup
  - `media-controls.js` - Camera/mic controls
  - `media-devices.js` - Device enumeration and switching
  - `state.js` - Media state management
- Subdirectories:
  - `audio/` - Audio controls (audio-controls.js)
  - `youtube/` - YouTube integration (youtube-player.js, youtube-search.js)

**src/storage/**
- Purpose: Data persistence and Firebase RTDB abstraction
- Contains: Firebase RTDB utilities, IndexedDB wrapper, localStorage
- Key files:
  - `fb-rtdb/rtdb.js` - Firebase RTDB with listener tracking
  - `idb.js` - IndexedDB abstraction via Dexie
  - `local/` - LocalStorage utilities (local-storage.js)

**src/styles/**
- Purpose: Modular CSS architecture
- Contains: CSS organized by abstraction level
- Subdirectories:
  - `init/` - CSS resets and base styles
  - `element/` - Element-level styles
  - `layout/` - Layout utilities (flexbox, grid)
  - `components/` - Component-specific styles
- Key files: `theme.css` (CSS custom properties), `animations.css`

**src/utils/**
- Purpose: Shared utility functions
- Contains: UI helpers, DOM utilities, dev tools, environment detection
- Subdirectories:
  - `ui/` - UI utilities (ui-utils.js, animations, modals, notifications)
  - `dom/` - DOM helpers (component-utils.js, event handlers)
  - `dev/` - Development tools (diagnostic-logger.js, debug-logger.js)
  - `env/` - Environment detection (isIOSPWA.js, redirectIOSPWA.js)
- Key files: `url.js` - URL parameter handling

**src/pwa/**
- Purpose: Progressive Web App functionality
- Contains: Service worker registration, update notifications, PWA testing
- Key files:
  - `PWA.js` - Service worker registration
  - `update-handlers.js` - Update notification logic
  - `test-update.js` - PWA update testing utilities

**src/temp/**
- Purpose: Draft and temporary code (11 files, should be archived)
- Contains: Experimental code, examples, reference implementations
- Subdirectories:
  - `drafts/` - Draft implementations
  - `examples/` - Code examples
  - `p2p/` - P2P reference files

**tests/**
- Purpose: Test suites for all layers
- Contains: Unit, integration, smoke, and E2E tests
- Subdirectories:
  - `unit/` - Unit tests (call-controller.test.js, firebase-connection.test.js)
  - `integration/` - Integration tests (call-flow-imports.test.js)
  - `smoke/` - Quick smoke tests (call-controller-smoke.test.js)
  - `e2e/` - Playwright E2E tests (smoke.spec.js)
- Key files: `setup.js` - Vitest test configuration

**refactor-draft/**
- Purpose: Refactoring planning and documentation
- Contains: Task lists, architectural notes
- Key files: `task-list.md` - CallController refactoring plan

## Key File Locations

**Entry Points:**
- `index.html` - Main application entry
- `experiments.html` - Dev-only experiments
- `src/main.js` - JavaScript entry point and orchestrator (1,342 lines)

**Configuration:**
- `vite.config.js` - Vite build config (PWA, HTTPS, multi-target)
- `vitest.config.js` - Test configuration (browser mode with Playwright)
- `playwright.config.js` - E2E test configuration
- `firebase.json` - Firebase Hosting deployment
- `.firebaserc` - Firebase project: vidu-aae11
- `package.json` - Dependencies and npm scripts
- `.env.example` - Environment variable template

**Core Logic:**
- `src/main.js` - Main application orchestrator
- `src/webrtc/call-controller.js` - Call management facade
- `src/webrtc/call-flow.js` - WebRTC connection flow
- `src/room.js` - Room service for signaling
- `src/firebase/auth.js` - Authentication
- `src/firebase/watch-sync.js` - Watch-together synchronization

**Testing:**
- `tests/setup.js` - Vitest setup
- `tests/unit/*.test.js` - Unit tests
- `tests/e2e/*.spec.js` - E2E tests
- `src/**/*.test.js` - Co-located component tests

**Documentation:**
- `README.md` - User-facing documentation
- `CLAUDE.md` - Developer guidance for Claude Code
- `PWA-TESTING-GUIDE.md` - PWA update testing strategies
- `ANIMATION-GUIDE.md` - Animation pattern documentation

## Naming Conventions

**Files:**
- kebab-case for multi-word files: `call-controller.js`, `media-controls.js`, `watch-sync.js`
- PascalCase for class-like components: `AuthComponent.js`
- *.test.js for Vitest tests: `call-controller.test.js`
- *.spec.js for Playwright E2E: `smoke.spec.js`
- index.js for barrel exports (rare in this codebase)

**Directories:**
- kebab-case for all directories: `webrtc/`, `media-controls/`, `recent-calls/`
- Plural for collections: `components/`, `utils/`, `tests/`

**Special Patterns:**
- Co-located tests: `icon-button.test.js` alongside `icon-button.js`
- State modules: `state.js` for module-level state management
- Cleanup functions: Returned from initialization functions

## Where to Add New Code

**New WebRTC Feature:**
- Primary code: `src/webrtc/`
- Tests: `tests/unit/` or co-located in `src/webrtc/tests/`
- Integration: Update `src/webrtc/call-controller.js` facade

**New UI Component:**
- Implementation: `src/components/{feature}/`
- Styles: `src/styles/components/{feature}.css`
- Tests: Co-located `*.test.js` or `tests/unit/`
- Integration: Initialize in `src/main.js`

**New Media Feature:**
- Implementation: `src/media/{feature}/`
- Tests: Co-located `*.test.js`
- Controls: Update `src/media/media-controls.js`
- State: Manage in `src/media/state.js`

**New Firebase Integration:**
- Implementation: `src/firebase/{feature}.js`
- Storage: Use `src/storage/fb-rtdb/rtdb.js` for RTDB operations
- Cleanup: Register listeners with scoped cleanup
- Tests: `tests/unit/firebase-*.test.js`

**New Utility:**
- Shared helpers: `src/utils/{category}/`
- UI utilities: `src/utils/ui/`
- DOM utilities: `src/utils/dom/`
- Type definitions: TypeScript not used (vanilla JS only)

**New Test:**
- Unit: `tests/unit/{feature}.test.js`
- Integration: `tests/integration/{feature}.test.js`
- Smoke: `tests/smoke/{feature}-smoke.test.js`
- E2E: `tests/e2e/{flow}.spec.js`

## Special Directories

**src/temp/**
- Purpose: Draft and experimental code
- Source: Developer experiments and refactoring drafts
- Committed: Yes (11 files currently, should be archived)

**public/**
- Purpose: Static assets served directly
- Source: Images, icons, manifest
- Committed: Yes

**dist/**
- Purpose: Build output
- Source: Generated by Vite build
- Committed: No (.gitignore)

**node_modules/**
- Purpose: npm dependencies
- Source: Installed via pnpm
- Committed: No (.gitignore)

---

*Structure analysis: 2025-12-26*
*Update when directory structure changes*
