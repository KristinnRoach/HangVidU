# Solved Issue: Function Definitions

Use this file for recurring function-definition conventions in `src/media-next/`.

## Optional object params

When a method accepts an optional object parameter and omission is valid, default it to `{}` and destructure inside the function body.

Preferred:

```js
/**
 * @param {{
 *   currentTime?: number,
 *   duration?: number | null,
 * }} [options]
 */
function syncMetrics(options = {}) {
  const {
    currentTime = state.currentTime,
    duration = state.duration,
  } = options;

  // ...
}
```

Avoid:

```js
function syncMetrics({
  currentTime = state.currentTime,
  duration = state.duration,
} = {}) {
  // ...
}
```

Reason:

- callers should not have to pass an empty object just to make a valid no-op or partial update call
- optional object params should not throw during destructuring when omitted
- destructuring inside the function is easier to scan and standardize across the codebase
- JSDoc on the `options` param preserves IntelliSense in JavaScript and keeps migration to TypeScript straightforward

## Call tolerance

Prefer parameter handling that tolerates valid omitted input over forcing boilerplate at every call site.

Current rule:

- if omission is valid by contract, the callee should handle it directly
- only require a fully populated object param when the method truly needs it
- default to this shape for optional options params:

```js
/**
 * @param {{ ... }} [options]
 */
function someMethod(options = {}) {
  const {
    foo = defaultFoo,
    bar = defaultBar,
  } = options;
}
```
