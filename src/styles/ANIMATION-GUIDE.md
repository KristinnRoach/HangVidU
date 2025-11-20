# Animation Guide

## The Simple Rule for Container Query Animations

**When elements hide/show in container queries, siblings need `transition: var(--transition-default)` to slide smoothly.**

## Why This Works

When an element disappears (via `opacity: 0`, `width: 0`, etc.), **flexbox automatically repositions siblings**. Without transitions, this happens instantly. With `transition: var(--transition-default)`, it's smooth.

## The Pattern

### Step 1: Make your container flexbox

```css
.my-container {
  display: flex;
  gap: 1rem;
}
```

### Step 2: Add transition to children

```css
.my-container > * {
  transition: var(--transition-default);
}
```

### Step 3: Hide/show elements with container queries

```css
@container main (max-width: 650px) {
  .my-element {
    opacity: 0;
    width: 0;
    padding: 0;
    overflow: hidden;
  }
}
```

**That's it!** Siblings will smoothly slide into place.

## Real Example: Auth Buttons

```css
/* Container */
.auth-component {
  display: flex;
  gap: 0.5rem;
}

/* Children auto-animate */
.auth-component > * {
  transition: var(--transition-default);
}

/* Hide disabled buttons on small screens */
@media (max-width: 768px) {
  button:disabled {
    opacity: 0;
    width: 0;
    padding: 0;
    overflow: hidden;
  }
}
```

**Result:** When logout button disappears, login button smoothly slides right.

## The Variable

`--transition-default` is defined in `animations.css`:

```css
:root {
  --duration-default: 200ms;
  --easing-default: ease-in-out;
  --transition-default: all var(--duration-default) var(--easing-default);
}
```

Change duration/easing globally by updating these variables!

## Quick Reference

### ✅ DO:

- Add `transition: var(--transition-default)` to **flex children** (`.container > *`)
- Use `display: flex` on parent
- Hide elements with `opacity: 0`, `width: 0`, `padding: 0`

### ❌ DON'T:

- Add transition to the **parent** (won't work)
- Use `transform` (flexbox doesn't use transform for positioning)
- Forget the `> *` selector (needs to target children)
- Use `display: none` (can't transition, causes instant jump)

## Utility Class (Optional)

For reusable animated flex containers, use `.animated-flex`:

```css
/* In layout/grid.css */
.animated-flex > * {
  transition: var(--transition-default);
}
```

```html
<div class="animated-flex">
  <button>Login</button>
  <button>Logout</button>
</div>
```

## Accessibility

Always respect reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  .my-container > * {
    transition: none !important;
  }
}
```

## Common Patterns

### Pattern 1: Buttons that hide on mobile

```css
.button-group {
  display: flex;
  gap: 1rem;
}

.button-group > * {
  transition: var(--transition-default);
}

@media (max-width: 768px) {
  button:disabled {
    opacity: 0;
    width: 0;
    padding: 0;
  }
}
```

### Pattern 2: Title that hides in narrow containers

```css
.header {
  display: flex;
  gap: 1rem;
}

.header > * {
  transition: var(--transition-default);
}

@container main (max-width: 650px) {
  .title {
    opacity: 0;
    max-width: 0;
    overflow: hidden;
  }
}
```

### Pattern 3: Menu items that collapse

```css
.menu {
  display: flex;
  gap: 0.5rem;
}

.menu > * {
  transition: var(--transition-default);
}

@container (max-width: 500px) {
  .menu-item.optional {
    opacity: 0;
    width: 0;
    padding: 0;
  }
}
```

## Troubleshooting

### Animation not working?

1. ✅ Is parent `display: flex`?
2. ✅ Did you add transition to **children** (`.parent > *`)?
3. ✅ Are you using `var(--transition-default)`?
4. ✅ Are you hiding with `opacity: 0` + `width: 0` (not `display: none`)?

### Animation too slow/fast?

```css
/* Adjust the global variable */
:root {
  --duration-default: 100ms; /* faster */
  --duration-default: 400ms; /* slower */
}
```

### Want to disable for specific elements?

```css
.no-animate {
  transition: none !important;
}
```

## Summary

**The magic formula:**

1. Flexbox parent
2. `transition: var(--transition-default)` on children
3. Hide/show elements with `opacity: 0` + `width: 0` (NOT `display: none`)

That's it! No complex animations, no JavaScript, just smooth automatic transitions.
