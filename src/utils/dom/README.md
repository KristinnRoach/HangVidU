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
// Listen to any prop change
card.onUpdate((props) => {
  console.log('Updated:', props);
});

// Listen to specific prop
card.onPropUpdate('count', (newValue) => {
  console.log('Count changed:', newValue);
});
```
