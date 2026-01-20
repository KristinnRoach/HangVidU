# UI Refactor Roadmap

## Goal

Clean UI state management with declarative rendering, enabling Messenger-like redesign.

## Approach

- Single source of truth (`uiState` in `state.js`)
- CSS-driven visibility via `[data-view]` attributes
- Incremental migration from legacy show/hide code

## Status

### Done

- [x] `state.js` - uiState with `view` and `mainContent`
- [x] `call-lifecycle-ui.js` - sets `connected`/`lobby`
- [x] `calling-ui.js` - sets `calling`/`lobby`
- [x] View lifecycle complete: `lobby → calling → connected → lobby`

### Next

- [x] CSS scaffold - prove `[data-view]` pattern works
- [ ] Wire `mainContent` for watch mode transitions

### Future (not committed)

- Remove legacy `enterCallMode`/`exitCallMode`
- Messenger-like layout redesign
