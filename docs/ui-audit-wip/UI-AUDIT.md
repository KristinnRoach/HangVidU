# UI System Audit

Reference doc for the ongoing style refactor. Describes current state, inconsistencies, and boundaries.

---

## Architecture

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

### 4. Non-existent token referenced
`top-bar.css:135`: `border-radius: var(--border-radius-default, 0.5rem)` — `--border-radius-default` doesn't exist in `theme.css`. Falls back to `0.5rem` (8px). Should be `var(--radius-lg)`.

### 5. Button base hover is broken by design
`element/button.css`: `button:hover { background-color: var(--color-success-hover); }` — every button turns dark green on hover unless explicitly overridden. Every component fights this default.

### 6. `.call-controls` vs `.chat-controls` mismatch
`view-state.css` targets `.call-controls` in lobby/calling states, but the HTML element uses class `chat-controls`. The view-state display rules have no effect on it.

### 7. Dead code in `chat-controls.css`
- `#hangUp` selector (line 112) — the HTML button is `id="hang-up-btn"`. This rule is never applied.
- `rgb(255, 80, 80, 1)` is invalid CSS — `rgb()` takes 3 args. Should be `rgba(255, 80, 80, 1)`.

### 8. Duplicate/contradictory `.lobby-btn` color
```css
color: rgb(8, 40, 169) !important;  /* set */
color: var(--btn-primary-text);      /* overrides it — but this token doesn't exist */
```
`--btn-primary-text` is undefined in `theme.css`. The `!important` is overridden by the next line in the same rule, making it dead.

### 9. Inline-styled `#legal-footer`
Fully styled via `style=""` in HTML. No CSS class, no tokens used.

### 10. Commented-out container queries in `top-bar.css`
Lines 297–315 are commented out. Either implement or remove.

### 11. Light mode defined but disabled
`theme.css` has a full light mode block commented out ("TODO: fix issues"). No active light mode support.

### 12. `view-state.css` is incomplete for `calling` state
`calling:user` and `calling:guest` only hide `.call-controls` — nothing else. The calling phase relies on legacy imperative code (`enterCallMode`/`exitCallMode`) rather than CSS-driven state per the refactor roadmap (`src/ui/ui-refactor.md`).

---

## What's working well

- Token system foundation is solid and covers the right categories
- `view-state.css` approach (CSS-driven app state) is the right direction
- Animation classes with `@supports` progressive enhancement are clean
- CSS anchor positioning for messages/notifications with fallbacks is modern and correct
- Component CSS file structure mirrors component JS structure

---

## Refactor priorities

1. Fix `.call-controls` → `.chat-controls` mismatch in `view-state.css`
2. Fix `button:hover` default (scoped to specific button types, not all buttons)
3. Remove `#hangUp` dead selector; fix `rgb(a)` syntax error
4. Remove dead `.lobby-btn` `!important` color and undefined `--btn-primary-text`
5. Migrate `notifications.css` and `toast.css` hardcoded colors to tokens
6. Resolve transition token namespace split — pick one approach, document it
7. Replace `--border-radius-default` reference with `var(--radius-lg)` in `top-bar.css`
8. Move `#legal-footer` inline styles to a CSS class
9. Remove commented-out container queries in `top-bar.css`
10. Expand `view-state.css` to cover calling state properly (per ui-refactor.md)
