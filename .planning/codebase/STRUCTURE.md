# Codebase Structure

**Analysis Date:** 2026-01-08

## Directory Layout

```
HangVidU/
├── src/                      # Application source code
│   ├── main.js              # Primary entry point (1,342 lines)
│   ├── elements.js          # DOM element registry
│   ├── initSentry.js        # Error tracking setup
│   ├── room.js              # RoomService singleton
│   │
│   ├── webrtc/              # WebRTC P2P logic
│   ├── firebase/            # Firebase services
│   ├── storage/             # Data persistence
│   ├── media/               # Media stream management
│   ├── components/          # UI components
│   ├── styles/              # Modular CSS architecture
│   ├── utils/               # Utility functions
│   ├── pwa/                 # PWA service worker
│   └── test/                # Test utilities
│
├── tests/                   # Test suites
│   ├── unit/                # Unit tests (Vitest)
│   ├── integration/         # Integration tests (Vitest)
│   ├── smoke/               # Smoke tests (Vitest)
│   ├── investigation/       # Bug investigation tests
│   └── e2e/                 # E2E tests (Playwright)
│
├── index.html               # Main HTML entry
├── experiments.html         # Experimental features page
├── vite.config.js           # Vite configuration
├── vitest.config.js         # Vitest configuration
├── playwright.config.js     # Playwright E2E configuration
├── package.json             # Dependencies and scripts
└── pnpm-lock.yaml          # Lockfile
```

## Directory Purposes

**src/webrtc/**
- Purpose: WebRTC peer-to-peer connection logic
- Contains: Call flow, ICE handling, data channels, peer connection factory
- Key files:
  - `call-controller.js` (653 lines) - Event API + state manager
  - `call-flow.js` (363 lines) - Initiator/joiner orchestration
  - `webrtc.js` - PeerConnection factory
  - `ice.js` - ICE candidate handling
  - `data-channel.js` - DataChannel setup (currently disabled)
- Subdirectories: `tests/` (co-located tests)

**src/firebase/**
- Purpose: Firebase services and real-time synchronization
- Contains: Authentication, RTDB operations, watch-together sync, messaging, presence
- Key files:
  - `firebase.js` - App initialization
  - `auth.js` (407 lines) - Google Sign-In + guest auth
  - `watch-sync.js` (398 lines) - YouTube/video synchronization
  - `messaging.js` (265 lines) - RTDB contact messaging (NEW)
  - `presence.js` - User online/offline
  - `onetap.js` - Google One Tap UI
- Subdirectories: None

**src/storage/**
- Purpose: Data persistence abstractions
- Contains: Firebase RTDB wrappers, IndexedDB, LocalStorage utilities
- Key files:
  - `fb-rtdb/rtdb.js` - Firebase RTDB API + listener tracking
  - `idb/idb.js` - Dexie wrapper for IndexedDB
  - `local/recent-rooms-local.js` - LocalStorage utilities
- Subdirectories: `fb-rtdb/`, `idb/`, `local/`

**src/media/**
- Purpose: Media stream management and YouTube integration
- Contains: Camera/mic controls, YouTube player, constraints
- Key files:
  - `stream.js` - Local/remote stream setup
  - `state.js` - Stream state singleton
  - `media-controls.js` - Camera/mic UI controls
  - `constraints.js` - Video/audio constraints
  - `media-devices.js` - Device enumeration
  - `youtube/youtube-player.js` (367 lines) - YouTube IFrame API wrapper
  - `youtube/youtube-search.js` (391 lines) - YouTube search UI
  - `audio/ringtone-manager.js` - Call ringtone management
- Subdirectories: `youtube/`, `audio/`

**src/components/**
- Purpose: UI components (vanilla JS + Lit)
- Contains: Authentication, calling UI, contacts, messages, lobby, notifications
- Key files:
  - `contacts/contacts.js` (662 lines) - Contact list + presence + message toggles (refactoring pending)
  - `messages/messages-ui.js` (357 lines) - Main messaging UI
  - `messages/message-toggle.js` (117 lines) - Reusable toggle component
  - `messages/OLD_messages-ui.js` - Deprecated implementation
  - `calling/calling-ui.js` - Incoming call UI
  - `modal/copyLinkModal.js` (408 lines) - Copy link modal
  - `notifications/pwa-update-toast.js` - PWA update notification
- Subdirectories:
  - `auth/` - Google One Tap container
  - `base/` - Reusable components (buttons, dialogs)
    - `base/button/` - Button components (icon-button.js, lit-icon-button.draft.js)
    - `base/confirm-dialog.js` - Confirmation dialogs
  - `calling/` - Incoming call UI
  - `contacts/` - Contact management
  - `lobby/` - Main lobby UI
  - `messages/` - In-call chat
  - `modal/` - Modal dialogs
  - `notifications/` - Toast notifications
  - `recent-calls/` - Recent call history
  - `select/` - Device selection dropdown
  - `ui/` - State-driven UI (call-mode.js, watch-mode.js)
  - `self-contained-drafts/` - Draft components

**src/styles/**
- Purpose: Modular CSS architecture
- Contains: Resets, element styles, layout utilities, component styles
- Key files:
  - `main.css` - Master stylesheet
  - `theme.css` - CSS custom properties
  - `animations.css` - Animation utilities
- Subdirectories:
  - `init/` - Resets + typography
  - `element/` - Element-level styles (button, input)
  - `layout/` - Layout utilities (grid, flexbox)
  - `components/` - Component-specific styles

**src/utils/**
- Purpose: Shared utility functions
- Contains: Dev logging, UI helpers, DOM utilities, environment detection
- Key files:
  - `dev/dev-utils.js` - Dev logging (`devDebug()`)
  - `dev/diagnostic-logger.js` (696 lines) - Comprehensive diagnostic logging
  - `ui/ui-utils.js` - UI helpers (show/hide, visibility)
  - `dom/component.js` - DOM component utilities
  - `env/redirectIOSPWA.js` - iOS PWA redirect handling
- Subdirectories: `dev/`, `ui/`, `dom/`, `env/`

**src/pwa/**
- Purpose: Progressive Web App setup
- Contains: Service worker registration, update handling
- Key files:
  - `PWA.js` - Service worker registration
  - `test-update.js` - PWA update testing utilities
  - `debug-pwa.js` - PWA debugging helpers
- Subdirectories: None

**src/temp/**
- Purpose: Temporary/draft files (should be cleaned up)
- Contains: P2P integration examples, drafts, WIP experiments
- Key files:
  - `p2p/integration-example.js` (701 lines)
  - `drafts/webrtc.js` (330 lines)
  - `examples/failed-rejoin-attempt.js` (320 lines)
- Subdirectories: `p2p/`, `drafts/`, `examples/`
- **Note:** This directory bloats the source tree and should be archived or removed

**tests/**
- Purpose: Test suites organized by type
- Contains: Unit, integration, smoke, investigation, E2E tests
- Subdirectories:
  - `unit/` - Isolated function/class tests (Vitest browser mode)
  - `integration/` - Module integration tests (Vitest browser mode)
  - `smoke/` - Quick sanity tests (Vitest browser mode)
  - `investigation/` - Bug investigation tests
  - `e2e/` - Full workflow tests (Playwright)

## Key File Locations

**Entry Points:**
- `index.html` - Main HTML entry
- `src/main.js` (1,342 lines) - Primary JavaScript entry
- `src/webrtc/call-controller.js` (653 lines) - WebRTC entry point

**Configuration:**
- `vite.config.js` - Build tool configuration
- `vitest.config.js` - Test runner configuration
- `playwright.config.js` - E2E test configuration
- `package.json` - Project dependencies and scripts
- `.env.development` - Development environment variables (gitignored)
- `.env.production` - Production environment variables (gitignored)
- `.env.example` - Environment variable template

**Core Logic:**
- `src/room.js` (339 lines) - Room service singleton
- `src/webrtc/call-flow.js` (363 lines) - Call establishment flow
- `src/firebase/watch-sync.js` (398 lines) - Watch-together synchronization
- `src/firebase/messaging.js` (265 lines) - Contact messaging (NEW)
- `src/firebase/auth.js` (407 lines) - Authentication

**Testing:**
- `tests/unit/` - Unit tests co-located with logic
- `tests/e2e/smoke.spec.js` - E2E smoke tests
- `src/**/tests/` - Co-located test files (e.g., `src/webrtc/tests/ice.test.js`)

**Documentation:**
- `README.md` - User-facing documentation
- `CLAUDE.md` - Developer instructions for Claude Code
- `.planning/codebase/` - Codebase documentation (this directory)
- `.claude/REFACTORING-STATUS.md` - Ongoing refactoring status

## Naming Conventions

**Files:**
- kebab-case for all files: `call-controller.js`, `media-controls.js`, `watch-sync.js`
- Test files: `*.test.js` suffix (Vitest), `*.spec.js` suffix (Playwright E2E only)
- Draft files: `*.draft.js` or `OLD_*.js` prefix (should be cleaned up)

**Directories:**
- kebab-case for all directories: `webrtc/`, `firebase/`, `media/`, `components/`
- Plural for collections: `components/`, `utils/`, `tests/`

**Special Patterns:**
- `index.html` - Main HTML entry
- `main.js` - Primary JavaScript entry
- `*.test.js` - Vitest tests (co-located or in tests/ directory)
- `*.spec.js` - Playwright E2E tests (tests/e2e/ only)

## Where to Add New Code

**New WebRTC Feature:**
- Primary code: `src/webrtc/`
- Tests: `src/webrtc/tests/` or `tests/unit/`
- Config: `src/webrtc/webrtc.js` (if configuration needed)

**New Firebase Service:**
- Implementation: `src/firebase/{service-name}.js`
- RTDB utilities: `src/storage/fb-rtdb/`
- Tests: `tests/unit/` or `tests/integration/`

**New UI Component:**
- Implementation: `src/components/{category}/{component-name}.js`
- Styles: `src/styles/components/{component-name}.css`
- Tests: `src/components/{category}/tests/` or co-located `*.test.js`

**New Media Feature:**
- Implementation: `src/media/{feature-name}.js`
- Tests: `src/media/tests/` or `tests/unit/`

**Utilities:**
- Shared helpers: `src/utils/{category}/{helper-name}.js`
- Tests: `src/utils/{category}/tests/`

## Special Directories

**src/temp/**
- Purpose: Temporary/draft files, integration examples
- Source: Created during development, not cleaned up
- Committed: Yes (should be archived or removed)
- **Concern:** Bloats source tree with 10+ draft files

**src/components/self-contained-drafts/**
- Purpose: Draft self-contained components
- Source: Experimental component development
- Committed: Yes (should be cleaned up)

**src/utils/dom/wip-interop/**
- Purpose: Work-in-progress React interop experiments
- Source: Experimental framework interop
- Committed: Yes (should be archived if not actively used)

**tests/investigation/**
- Purpose: Bug investigation tests
- Source: Created during debugging (e.g., camera-switch-freeze.test.js)
- Committed: Yes (useful for reproducing issues)

**.planning/**
- Purpose: GSD (Get Shit Done) project planning documents
- Source: Generated by Claude Code GSD workflow
- Committed: Yes
- Structure:
  - `PROJECT.md` - Project overview
  - `ROADMAP.md` - Phase roadmap
  - `STATE.md` - Current project state
  - `phases/` - Phase plans
  - `codebase/` - Codebase documentation (this directory)

**.claude/**
- Purpose: Manual refactoring notes
- Source: Created during vanilla Claude sessions
- Committed: Yes
- Files: `REFACTORING-STATUS.md` - Messaging refactoring progress

---

*Structure analysis: 2026-01-08*
*Update when directory structure changes*
