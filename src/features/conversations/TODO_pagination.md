# TODO: Message Pagination

## Goal

Load older messages on scroll-back without changing the live-message path.

## Shape

- Extend `MessageRepository.loadMessages` with an optional cursor:

```ts
loadMessages(
  conversationId: ConversationId,
  opts?: { before?: string; limit?: number },
): Promise<IncomingMessage[]>;
```

- `before` means "messages older than this message id".
- Default `limit` should stay near the current recent-message window.
- Keep live updates separate from historical page loads; a page load is a
  one-shot read, not another subscription.

## UI Work

- Track `oldestLoadedKey`, `hasMoreHistory`, and `loadingOlder`.
- When the message scroller nears the top, load one older page.
- Merge by message id; existing message merge logic already dedupes.
- Preserve scroll position after prepending older messages.

## Out Of Scope

- Virtualized rendering.
- Cross-conversation page caching.
- Backend-specific cursor mechanics; implement those in the active adapter.
