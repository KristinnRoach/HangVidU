# Messaging Next Decisions

This document should contain only agreed and stable design decisions plus the
target public API. Keep unsettled items in [QUESTIONS.md](./QUESTIONS.md).

## Stable Decisions

- Direct conversation IDs use `dm:{sortedUserA}:{sortedUserB}`.
- Group conversation IDs use `grp:{generatedId}`.
- Drafts are conversation-node state and are not sent messages.
- Message envelopes include `conversationId`.
- Message envelopes include `delivery: 'persistent' | 'private'`.
- First schema slice supports `text`, `event`, and `system` payloads only.

## Target Public API

To be defined after the repository and private transport interfaces are agreed.
