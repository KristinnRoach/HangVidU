# Message reactions

Framework-agnostic, in-memory emoji reactions for any HTML element. The module
has no backend or application-state dependency.

## Drop-in usage

```js
import { attachReactions } from './index.js';
import './reactions.css';

const cleanup = attachReactions(
  document.querySelector('.message'),
  'message-123',
  'user-456',
  ({ messageId, userId, reactionKey }) => {
    // Optional integration seam for persistence or analytics.
  },
);

cleanup();
```

Double-tap toggles the default heart. Long-press opens the reaction picker.
Calling `attachReactions` again for the same element replaces its existing
gesture listeners.

The optional callback receives one event per changed reaction:

```js
{ messageId, userId, reactionKey: string | null }
```

Persistence and remote synchronization belong to the host. Use the exported
`ReactionManager` and `ReactionUI` directly when the host needs to hydrate or
own reaction state.

Use `createReactions(config)` instead of the default `attachReactions` export
when a host needs its own emoji set, gesture timings, or isolated state (e.g.
two panels with different reaction sets in the same process):

```js
import { createReactions, DEFAULT_CONFIG } from './index.js';

const { attachReactions, syncReactionSummaries } = createReactions({
  ...DEFAULT_CONFIG,
  reactions: { heart: '❤️', sad: '😢' },
});
```

## Solid

The optional directive adapter handles reactive options and DOM cleanup without
adding wrapper markup:

```tsx
import { reactions } from './solid/solid.js';
import './reactions.css';

<div
  use:reactions={{
    messageId: message.id,
    userId: currentUser.id,
    reactions: message.reactions,
    onChange: persistReaction,
  }}
/>;
```

Importing `index.js` does not import Solid; framework adapters remain separate.

## Files

- `attachReactions.js` — drop-in behavior, local state, and `createReactions(config)`
- `ReactionManager.js` — reaction counts and the local actor's selected key
- `ReactionUI.js` — DOM rendering, picker, and animation
- `ReactionConfig.js` — default emoji set and gesture settings
- `onTapGesture.js` — framework-independent gesture handling
- `solid/solid.ts` — optional Solid directive adapter
- `reactions.css` — required styles

## Tests

```sh
pnpm vitest --run src/features/messaging-next/reactions
```

## Gesture edge cases

`onTapGesture.js`'s `shouldIgnore` skips gesture handling only when the exact
tap target is an `<a>`/`<button>` (or matches `ignoreTarget`). It does not
walk up via `closest()`, so a tap on a nested child (e.g. an icon inside a
button) inside the message element is not currently ignored. This hasn't
been an issue because message bubbles don't nest interactive elements today.
If a future layout puts links/buttons inside a message bubble's content, this
will need a bounded ancestor check (stopping at the message element, not
walking past it) so an unrelated wrapping `<a>`/`<button>` further up the DOM
doesn't suppress gestures on the whole message.
