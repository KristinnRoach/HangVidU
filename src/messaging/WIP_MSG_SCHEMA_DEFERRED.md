# Deferred Issues (msg-api-improvements)

Items identified during PR #392 review. None are regressions — all are pre-existing or edge cases.

## 1. `rejected_call` event ownership

`from` is set to `callerId` (the caller), not the writer (the callee who rejected). Unread attribution is arguably correct (caller sees it as unread) but semantically odd. Revisit if adding more event types.

## 2. `serverTimestamp()` placeholder vs `z.number()`

`parseMessage()` requires `sentAt: z.number()`. Firebase's `serverTimestamp()` is a placeholder object until resolved. In practice, `child_added` fires after resolution for remote listeners, and the local writer doesn't go through `listen()`. Theoretical only.

## 3. Last reaction removal not detected

When the final reaction is removed, RTDB deletes the `reactions` key. `child_changed` fires without `reactions` in the payload, so the `if (msg.reactions !== undefined)` guard skips it — stale reaction chips stay rendered. Fixing cleanly requires tracking previous reaction state.

## 4. History replay can double-count unread badge

`appendCachedHistory()` → `appendMessage()` bumps the unread badge for hidden remote unread messages. Self-correcting: `displayCurrentSession()` fires immediately after and resets via `markAsRead`. Brief visual flash only.
