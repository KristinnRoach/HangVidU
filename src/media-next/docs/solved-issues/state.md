# Solved Issue: State

Use this file for recurring state-shape and state-exposure decisions in `src/media-next/`.

## Public state exposure

Do not expose mutable internal state objects directly.

Preferred:

```js
getState() {
  return { ...state };
}
```

Avoid:

```js
getState() {
  return state;
}
```

Reason:

- callers must not be able to mutate controller-owned state
- public state reads should behave like snapshots, not shared mutable references

## Copy depth

Use the smallest defensive copy that matches the current state shape.

Current rule for media-next state objects:

- shallow-copy flat state objects with `{ ...state }`
- if a public state object later contains nested mutable objects or arrays, revisit this rule and return a deeper immutable public shape
