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

## Cleanup

```javascript
card.dispose(); // Removes listeners and detaches from DOM
```
