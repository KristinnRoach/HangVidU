# Codebase Structure

**Analysis Date:** 2025-01-19

## Directory Layout

```
HangVidU/
├── src/                    # Application source code
│   ├── components/         # UI components (vanilla JS, some Lit)
│   │   ├── auth/           # Authentication UI
│   │   ├── base/           # Reusable base components (button, dialog)
│   │   ├── calling/        # Call state UI (ringing, connecting)
│   │   ├── contacts/       # Contact management UI
│   │   ├── lobby/          # Lobby/join room UI
│   │   ├── messages/       # In-call chat UI
│   │   ├── modal/          # Modal components
│   │   ├── notifications/  # Toast notifications, update prompts
│   │   ├── recent-calls/   # Recent calls UI
│   │   ├── select/         # Media device selector
│   │   └── ui/             # UI state managers (call-mode, watch-mode)
│   ├── contacts/           # Contact logic (invitations, discovery)
│   ├── firebase/           # Firebase services (auth, watch-sync, presence)
│   ├── file-transfer/      # File chunking and assembly
│   ├── media/              # Media handling
│   │   ├── audio/          # Ringtones, audio player
│   │   └── youtube/        # YouTube player and search
│   ├── messaging/          # Messaging controller and transports
│   │   └── transports/     # RTDB, DataChannel transports
│   ├── pwa/                # PWA setup, service worker, update handling
│   ├── storage/            # Storage abstractions
│   │   ├── fb-rtdb/        # Firebase RTDB helpers
│   │   ├── idb/            # IndexedDB wrapper (Dexie)
│   │   └── local/          # localStorage utilities
│   ├── styles/             # CSS architecture
│   │   ├── components/     # Component-specific styles
│   │   ├── element/        # Element-level styles
│   │   ├── init/           # CSS resets, base styles
│   │   └── layout/         # Layout utilities
│   ├── utils/              # Shared utilities
│   │   ├── dev/            # Development utilities, logging
│   │   ├── dom/            # DOM manipulation helpers
│   │   ├── env/            # Environment detection
│   │   └── ui/             # UI utilities (visibility, click outside)
│   ├── webrtc/             # WebRTC connection handling
│   │   └── tests/          # WebRTC unit tests
│   ├── temp/               # Draft/experimental code (ignore)
│   ├── test/               # Test utilities
│   ├── main.js             # Application entry point
│   ├── elements.js         # Centralized DOM element exports
│   ├── room.js             # Room management service
│   └── file-transfer.js    # File transfer orchestration
├── tests/                  # Test files
│   ├── e2e/                # Playwright E2E tests
│   ├── integration/        # Vitest integration tests
│   ├── unit/               # Vitest unit tests
│   ├── smoke/              # Quick smoke tests
│   ├── fixtures/           # Test fixtures
│   └── utils/              # Test utilities
├── public/                 # Static assets
│   ├── icons/              # App icons (PWA)
│   └── sounds/             # Audio files (ringtones)
├── scripts/                # Build/dev scripts
├── .planning/              # GSD planning documents
│   └── codebase/           # Codebase analysis docs
├── index.html              # Main HTML entry point
├── experiments.html        # Experiments page entry
├── vite.config.js          # Vite build configuration
├── vitest.config.js        # Vitest test configuration
├── playwright.config.js    # Playwright E2E configuration
├── package.json            # Dependencies and scripts
├── firebase.json           # Firebase hosting config
├── database.rules.json     # Firebase RTDB security rules
└── CLAUDE.md               # AI assistant instructions
```

## Directory Purposes

**`src/components/`:**
- Purpose: UI components for all visual elements
- Contains: Vanilla JS components, some Lit web components
- Key files:
  - `auth/AuthComponent.js`: Login/logout UI with Google One Tap
  - `messages/messages-ui.js`: Chat overlay with file transfer
  - `calling/calling-ui.js`: Calling/connecting state indicators
  - `contacts/contacts.js`: Contact list rendering and management
  - `ui/call-mode.js`: Call mode UI state transitions
  - `ui/watch-mode.js`: Watch-together UI state transitions
  - `base/confirm-dialog.js`: Reusable confirmation dialog
  - `notifications/notification-manager.js`: Toast notification system

**`src/webrtc/`:**
- Purpose: WebRTC peer connection handling
- Contains: Call lifecycle, ICE handling, connection utilities
- Key files:
  - `call-controller.js`: High-level call API with events
  - `call-flow.js`: Initiator/joiner flow orchestration
  - `ice.js`: ICE candidate gathering and exchange
  - `webrtc-utils.js`: RTCPeerConnection helpers, SDP manipulation
  - `webrtc.js`: Connection state handlers

**`src/firebase/`:**
- Purpose: Firebase service integrations
- Contains: Auth, watch-together sync, presence tracking
- Key files:
  - `auth.js`: Authentication with Google provider, guest IDs
  - `watch-sync.js`: Synchronized video playback via RTDB
  - `firebase.js`: Firebase app initialization
  - `onetap.js`: Google One Tap sign-in
  - `presence.js`: Online/offline status tracking

**`src/media/`:**
- Purpose: Media stream and device management
- Contains: Local/remote streams, constraints, YouTube integration
- Key files:
  - `stream.js`: Stream creation and setup
  - `state.js`: Media state (streams, tracks)
  - `media-controls.js`: Camera/mic/mute controls
  - `media-devices.js`: Device enumeration and switching
  - `youtube/youtube-player.js`: YouTube IFrame API wrapper
  - `youtube/youtube-search.js`: YouTube search UI
  - `audio/ringtone-manager.js`: Call ringtones

**`src/storage/fb-rtdb/`:**
- Purpose: Firebase RTDB operations and listener management
- Contains: Ref builders, data fetching, listener tracking
- Key files:
  - `rtdb.js`: All RTDB operations, listener cleanup utilities

**`src/messaging/`:**
- Purpose: In-app messaging abstraction
- Contains: Controller, transport implementations
- Key files:
  - `messaging-controller.js`: Session-based messaging API
  - `transports/rtdb-transport.js`: Firebase RTDB messaging
  - `transports/datachannel-file-transport.js`: P2P file transfer

**`src/utils/`:**
- Purpose: Shared utility functions
- Contains: UI helpers, DOM manipulation, environment detection
- Key files:
  - `ui/ui-utils.js`: show/hide, visibility helpers
  - `ui/view-manager.js`: View state management
  - `dom/component-utils.js`: Component creation helpers
  - `dev/dev-utils.js`: Development logging
  - `env/isMobileDevice.js`: Device detection
  - `room-id.js`: Deterministic room ID generation

**`src/styles/`:**
- Purpose: CSS architecture
- Contains: Modular CSS organized by concern
- Key files:
  - `main.css`: CSS imports aggregator
  - `theme.css`: CSS custom properties (colors, spacing)
  - `animations.css`: Animation utilities
  - `ANIMATION-GUIDE.md`: Animation pattern documentation

## Key File Locations

**Entry Points:**
- `index.html`: Main HTML entry, DOM structure
- `src/main.js`: Application bootstrap, event handlers, call orchestration
- `src/pwa/PWA.js`: PWA setup (dynamic import)

**Configuration:**
- `vite.config.js`: Build configuration, base path, plugins
- `vitest.config.js`: Test runner configuration (browser mode)
- `playwright.config.js`: E2E test configuration
- `.env`: Environment variables (Firebase config, API keys)
- `firebase.json`: Firebase hosting configuration
- `database.rules.json`: Firebase RTDB security rules

**Core Logic:**
- `src/webrtc/call-controller.js`: Call lifecycle controller
- `src/webrtc/call-flow.js`: WebRTC connection establishment
- `src/room.js`: Firebase room management
- `src/storage/fb-rtdb/rtdb.js`: RTDB operations and listeners
- `src/firebase/watch-sync.js`: Watch-together synchronization

**Testing:**
- `tests/e2e/`: Playwright E2E tests
- `tests/unit/`: Vitest unit tests
- `tests/integration/`: Vitest integration tests
- `src/**/*.test.js`: Co-located component tests

## Naming Conventions

**Files:**
- Components: `PascalCase.js` for class-based, `kebab-case.js` for functional
- Tests: `*.test.js` co-located with source
- CSS: `kebab-case.css`
- Draft/WIP: `*.draft.js` suffix

**Directories:**
- Feature-based: `components/`, `webrtc/`, `firebase/`
- Concern-based: `utils/`, `storage/`, `styles/`
- Nested by sub-feature: `media/youtube/`, `storage/fb-rtdb/`

**Exports:**
- Components: Named exports for functions, default for classes/singletons
- Singletons: camelCase instance export (e.g., `messagesUI`, `messagingController`)
- Elements: Named exports for individual elements, `getElements()` for object

## Where to Add New Code

**New Feature:**
- Primary code: Create directory under `src/` (e.g., `src/new-feature/`)
- Main orchestration: Import and wire up in `src/main.js`
- Tests: Create `src/new-feature/*.test.js` for unit tests

**New Component:**
- Implementation: `src/components/{category}/{component-name}.js`
- Styles: `src/styles/components/{component-name}.css`
- Tests: `src/components/{category}/{component-name}.test.js`

**New UI State Manager:**
- Implementation: `src/components/ui/{feature}-mode.js`
- Import elements from `src/elements.js`
- Export state getter and enter/exit functions

**New Firebase Operation:**
- Ref builder: Add to `src/storage/fb-rtdb/rtdb.js`
- Domain logic: Add to `src/firebase/` or relevant service file
- Listener tracking: Use `addRTDBListener()` for cleanup

**New WebRTC Feature:**
- Implementation: `src/webrtc/{feature}.js`
- Wire to CallController: Add setup method and event emission
- Cleanup: Track listeners in `CallController.listeners`

**Utilities:**
- Shared helpers: `src/utils/{category}/{utility}.js`
- UI utilities: `src/utils/ui/`
- DOM utilities: `src/utils/dom/`
- Environment: `src/utils/env/`

**New Test:**
- Unit test: `tests/unit/{feature}.test.js` or co-locate as `src/**/*.test.js`
- Integration test: `tests/integration/{feature}.test.js`
- E2E test: `tests/e2e/{feature}.spec.js`

## Special Directories

**`src/temp/`:**
- Purpose: Draft code, experiments, examples
- Generated: No
- Committed: Yes (for reference)
- Note: Ignore when implementing features

**`dist/`:**
- Purpose: Production build output
- Generated: Yes (by `pnpm build`)
- Committed: No (gitignored)

**`dev-dist/`:**
- Purpose: Development PWA service worker output
- Generated: Yes (by Vite PWA plugin)
- Committed: No (gitignored)

**`coverage/`:**
- Purpose: Test coverage reports
- Generated: Yes (by Vitest)
- Committed: No (gitignored)

**`node_modules/`:**
- Purpose: NPM dependencies
- Generated: Yes (by pnpm install)
- Committed: No (gitignored)

**`.planning/`:**
- Purpose: GSD planning and analysis documents
- Generated: By planning tools
- Committed: Yes

**`public/`:**
- Purpose: Static assets served as-is
- Generated: No
- Committed: Yes
- Note: PWA icons, audio files

---

*Structure analysis: 2025-01-19*
