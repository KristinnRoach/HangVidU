# createComponent

Lightweight reactive vanilla JS component factory with automatic input state preservation.

## Basic Usage

```javascript
import createComponent from './component.js';

const card = createComponent({
  initialProps: { name: 'Ada', count: 0 },
  template: `
    <h2>\${name}</h2>
    <p>Count: \${count}</p>
  `,
  parent: document.body,
});

// Update props
card.name = 'Grace';
card.count++;

// Batch update
card.update({ name: 'Alan', count: 10 });
```

## Event Handlers

```javascript
const counter = createComponent({
  initialProps: { count: 0 },
  template: `
    <button onclick="increment">Count: \${count}</button>
    <button onclick="decrement">-</button>
  `,
  handlers: {
    increment: () => counter.count++,
    decrement: () => counter.count--,
  },
  parent: document.body,
});

// Handlers survive re-renders automatically
```

## With Inputs

```javascript
const form = createComponent({
  initialProps: { label: 'Name' },
  template: `
    <label>\${label}</label>
    <input type="text" placeholder="Type here" />
  `,
  parent: document.body,
});

// User's typed text is automatically preserved during re-renders
form.label = 'Full Name'; // Input value stays intact
```

## Options

```javascript
createComponent({
  initialProps: {
    /* ... */
  },
  template: `/* ... */`,
  parent: document.body, // Optional: parent element
  containerTag: 'section', // Optional: default 'div'
  className: 'my-class', // Optional: CSS class
  onMount: (el) => {
    /* runs once after initial render (after append if autoAppend) */
  },
  onCleanup: () => {
    /* runs on dispose() */
  },
  autoAppend: true, // Optional: default true
  preserveInputState: true, // Optional: default true
});
```

## Nested Properties

```javascript
const profile = createComponent({
  initialProps: {
    user: { name: 'Ada', age: 30 },
  },
  template: `<p>\${user.name} is \${user.age}</p>`,
});
```

## Template Syntax & Limitations

**✅ Supported:**
```javascript
${propName}                    // Simple property
${user.name}                   // Nested property
${contentHtml}                 // Raw HTML (props ending with "Html")
```

**❌ NOT Supported (expressions):**
```javascript
${count > 0 ? 'yes' : 'no'}   // Conditional expressions
${items.length}                // Method calls
${price * 1.1}                 // Arithmetic
${name.toUpperCase()}          // String methods
```

**Why:** Templates use simple string interpolation, not JavaScript evaluation. Expressions are treated as property paths and return empty string when not found.

**Workaround:** Use `onPropUpdated()` for dynamic behavior:
```javascript
const toggle = createComponent({
  initialProps: { count: 0 },
  template: `<span class="badge">\${count}</span>`,
});

// Set initial state
let initialBadge = toggle.querySelector('.badge');
if (initialBadge) initialBadge.style.display = 'none';

toggle.onPropUpdated('count', (count) => {
  // IMPORTANT: Re-query element each time - re-renders create new DOM elements
  const badge = toggle.querySelector('.badge');
  if (badge) {
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
});
```

**Template String Escaping:**
When writing templates inside template literals, escape `${}` placeholders:
```javascript
// ❌ Wrong - evaluated immediately as JavaScript
template: `<div>${count}</div>`

// ✅ Correct - becomes literal "${count}" for createComponent
template: `<div>${'${'}count${'}'}</div>`
```

## Raw HTML (XSS Risk)

```javascript
// Properties ending with "Html" are NOT sanitized
const card = createComponent({
  initialProps: {
    safeText: '<script>alert(1)</script>', // Sanitized
    iconHtml: '<i class="fa fa-user"></i>', // Raw HTML
  },
  template: `
    <div>\${safeText}</div>
    <div>\${iconHtml}</div>
  `,
});
```

## Cleanup

```javascript
// Basic cleanup - removes listeners and detaches from DOM
component.dispose();

// With custom cleanup function (e.g., unsubscribe from Firebase)
const authComponent = createComponent({
  initialProps: { user: null },
  template: `<div>\${user ? user.name : 'Guest'}</div>`,
  onCleanup: () => {
    // Called automatically when dispose() is invoked
    unsubscribeAuth();
  },
  parent: document.body,
});

// With multiple cleanup functions
const component = createComponent({
  initialProps: {
    /* ... */
  },
  template: `/* ... */`,
  onCleanup: [
    () => clearInterval(intervalId),
    () => removeEventListener('resize', handler),
    () => websocket.close(),
  ],
  parent: document.body,
});

// Later...
component.dispose(); // Runs all cleanup functions, then removes component
```

## onMount

```javascript
// Called once right after the first render.
// If autoAppend is true (default) and parent is provided,
// onMount runs after the element has been appended to the parent.
const comp = createComponent({
  initialProps: { text: 'Hello' },
  template: `<div>\${text}</div>`,
  parent: document.body,
  onMount: (el) => {
    // el is the root element of the component
    el.setAttribute('data-mounted', '1');
  },
});
```

## Listeners

```javascript
// After each render (DOM updated)
card.onRender((props) => console.log('Rendered:', props));

// Any prop change (render optional)
card.onAnyPropUpdated(({ changedKeys }) =>
  console.log('Changed:', changedKeys)
);

// Specific prop
card.onPropUpdated('count', (v) => console.log('count →', v));
```

### When to Use Which Listener?

**Use `onPropUpdated(prop, callback)`** when:
- ✅ You need to update DOM elements that are IN the template
- ✅ You need to react to a specific prop change
- ✅ **Always re-query elements inside the callback** (re-renders create new DOM)

```javascript
toggle.onPropUpdated('count', (count) => {
  const badge = toggle.querySelector('.badge'); // ✅ Query fresh each time
  if (badge) badge.textContent = count;
});
```

**Use `onRender(callback)`** when:
- ✅ You need to do something after ANY prop changes and re-render
- ✅ You're working with multiple props at once
- ✅ You need the full props object

```javascript
card.onRender(({ name, email }) => {
  // Runs after any prop change that triggers re-render
  console.log(`Card updated: ${name} (${email})`);
});
```

**Use `onAnyPropUpdated(callback)`** when:
- ✅ You need to track changes WITHOUT waiting for re-render
- ✅ You need to know which specific props changed
- ✅ Performance-critical scenarios (runs even if no re-render)

```javascript
card.onAnyPropUpdated(({ props, changedKeys }) => {
  if (changedKeys.includes('count')) {
    // React immediately, even if 'count' isn't in template
  }
});
```

**Rule of thumb:**
- 90% of the time → `onPropUpdated` (and always re-query elements!)
- Multiple props → `onRender`
- Advanced/performance → `onAnyPropUpdated`
