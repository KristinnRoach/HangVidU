# Solved Issue: Zod

Use this file for recurring Zod-specific decisions in `src/media-next/`.

## Issue codes

Use raw string literal issue codes in `ctx.addIssue(...)`.

Preferred:

```js
ctx.addIssue({
  code: 'custom',
  path: ['field'],
  message: 'Explanation',
});
```

Avoid:

```js
ctx.addIssue({
  code: z.ZodIssueCode.custom,
  path: ['field'],
  message: 'Explanation',
});
```

Reason:

- `ZodIssueCode` is deprecated in current Zod typings.
- Raw string literal codes match current Zod guidance and avoid IDE noise.

## Schema style

Prefer the smallest schema that keeps one clear source of truth.

Current rule for media-next state schemas:

- do not add redundant convenience flags when `status` already encodes the same information
- use `superRefine(...)` only for invariants that the docs and controller contract already require
- keep custom issue messages explicit enough to map directly back to the violated invariant

## Naming

Prefer names that match the scope of the object, not just one aspect of it.

Current rule:

- use `PlayerStateSchema` for the player domain state object
- avoid `PlaybackStateSchema` when the object includes source selection, progress, and error state in addition to playback status
