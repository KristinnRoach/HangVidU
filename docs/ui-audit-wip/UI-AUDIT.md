# UI System Audit

Reference doc for the ongoing style refactor. Describes current state, inconsistencies, and boundaries.

---

## JS File Structure

UI-related JS has been consolidated under `src/ui/`:

| Old path | New path |
|---|---|
| `src/components/` | `src/ui/components/` |
| `src/utils/ui/` | `src/ui/utils/` |
| `src/utils/dom/` (component.js, component-utils.js, dom-utils.js) | `src/ui/component-system/` |

`src/utils/` retains non-UI utilities (dev, env, linkify, etc.).

---

## CSS Architecture

**Token system** (`theme.css`) — well-structured:
- Background: `--bg-primary/secondary/tertiary/elevated`
- Text: `--text-primary/secondary/tertiary/muted/disabled`
- Colors: `--color-success/danger/info/warning/primary`
- Spacing: `--spacing-xxs` through `--spacing-3xl`
- Radius: `--radius-sm/md/lg/xl/full`
- Z-index: `--z-low/mid/high/overlay/modal`
- Transitions: `--transition-fast/base/slow/slower` (duration only)

**Animation system** (`animations.css`) — separate and somewhat overlapping:
- Defines `--duration-default`, `--easing-default`, `--transition-default` (a full shorthand)
- Animation classes: `.fade`, `.slide-up/down/left/right`, `.auto-animate`
- Progressive enhancement via `@supports (transition-behavior: allow-discrete)`

**View state** (`view-state.css`) — CSS-driven via `body[data-view="lobby:user"]` etc.:
- States: `lobby/calling/connected × user/guest`
- Secondary: `body[data-main-content="remoteStream|ytVideo|sharedVideo"]`

**Layer order** (`main.css`):

| Layer | File(s) | Purpose |
|---|---|---|
| Reset | `init/` | Normalize + simple reset |
| Tokens | `theme.css` | Design variables |
| Animation | `animations.css` | Transition classes + keyframes |
| View state | `view-state.css` | App state → CSS visibility |
| Utilities | `utilities.css` | `.hidden`, `.visible`, `.invisible` |
| Layout | `layout/` | Flex utilities, container queries |
| Elements | `element/` | `button`, `input` base styles |
| Components | `components/` | Per-feature styles |

---

## Inconsistencies and Problems

### 1. Three parallel visibility systems
No clear rule for which to use:
- `.hidden` class (`display: none !important`) — primary pattern
- `data-view` CSS attribute (declarative, the correct direction)
- `style="display: none"` inline on HTML elements (`#app-pip-btn`, `#switch-camera-btn`, `#fullscreen-partner-btn`)

`main.css` lines 29–38 also manually resets `opacity: 1` for elements that "toggle visibility", implying some elements use opacity-based hiding outside the animation class system.

### 2. Two transition token namespaces
`theme.css` defines **duration-only** tokens: `--transition-fast/base/slow/slower`
`animations.css` defines **full shorthand**: `--transition-default` + `--duration-default` + `--easing-default`

No clear rule for which to use where. `top-bar.css` uses `var(--duration-default, 200ms)` with a fallback of `200ms` even though the defined value is `250ms` — silent mismatch.

### 3. Tokens defined but not used
Most component files hardcode values instead of referencing tokens:
- `notifications.css`: `#2a2a2a`, `#444`, `#4caf50`, `#2196f3`, `#ff9800` — all have token equivalents
- `toast.css`: same issue
- `messages.css`: `font-family: sans-serif` instead of `var(--font-family-primary)`
- `messages.css`: `#3757c1` (avatar color) — raw hex, no token

### 4. Button base hover is broken by design
`element/button.css`: `button:hover { background-color: var(--color-success-hover); }` — every button turns dark green on hover unless explicitly overridden. Every component fights this default.

### 5. Inline-styled `#legal-footer`
Fully styled via `style=""` in HTML. No CSS class, no tokens used.

### 6. Commented-out container queries in `top-bar.css`
Lines 297–315 are commented out. Either implement or remove.

### 7. Light mode defined but disabled
`theme.css` has a full light mode block commented out ("TODO: fix issues"). No active light mode support.

### 8. `view-state.css` is incomplete for `calling` state
`calling:user` and `calling:guest` only hide `.chat-controls` — nothing else. The calling phase relies on legacy imperative code (`enterCallMode`/`exitCallMode`) rather than CSS-driven state per the refactor roadmap (`src/ui/ui-refactor.md`).

---

## What's working well

- Token system foundation is solid and covers the right categories
- `view-state.css` approach (CSS-driven app state) is the right direction
- Animation classes with `@supports` progressive enhancement are clean
- CSS anchor positioning for messages/notifications with fallbacks is modern and correct
- Component CSS file structure mirrors component JS structure (`src/styles/components/` mirrors `src/ui/components/`)

---

## Refactor priorities

1. Fix `button:hover` default (scoped to specific button types, not all buttons)
2. Migrate `notifications.css` and `toast.css` hardcoded colors to tokens
3. Resolve transition token namespace split — pick one approach, document it
4. Move `#legal-footer` inline styles to a CSS class
5. Remove commented-out container queries in `top-bar.css`
6. Expand `view-state.css` to cover calling state properly (per ui-refactor.md)
