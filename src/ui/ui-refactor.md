# UI Refactor Roadmap

## Goal

Clean UI state management with declarative rendering, enabling Messenger-like redesign.

## Approach

- Single source of truth (`uiState` in `state.js`)
- CSS-driven visibility via `[data-view]` and `[data-main-content]` attributes
- Incremental migration from legacy show/hide code

## Key Files

- `src/ui/state.js` - uiState source of truth
- `src/ui/call-lifecycle-ui.js` - call connect/disconnect handlers
- `src/ui/watch-lifecycle-ui.js` - watch mode enter/exit handlers
- `src/ui/bind-call-ui.js` - binds UI handlers to CallController events
- `src/styles/view-state.css` - declarative CSS rules for view states

## Status

### Done

- [x] `state.js` - uiState with `view` and `currentMedia`
- [x] `call-lifecycle-ui.js` - sets `connected`/`lobby`
- [x] `calling-ui.js` - sets `calling`/`lobby`
- [x] View lifecycle: `lobby → calling → connected → lobby`
- [x] CSS scaffold - `[data-view]` pattern proven working
- [x] `watch-lifecycle-ui.js` - sets `currentMedia` on watch mode
- [x] `bind-call-ui.js` - extracted CallController UI bindings from main.js

### In Progress

- [ ] Verify watch mode `currentMedia` works end-to-end
- [ ] Rethink state naming (`currentMedia` vs `mainContent` - see state.js notes)

### Future

- Remove legacy `enterCallMode`/`exitCallMode` calls
- Remove legacy `enterWatchMode`/`exitWatchMode` calls
- Messenger-like layout redesign
