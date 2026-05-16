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
- `MessageRepository` and private data-channel envelopes use
  `MessageEnvelope` as the core message contract.

## Target Public API

Current draft API:

- `MessageRepository.loadMessages(conversationId)`
- `MessageRepository.send(messageEnvelope)`
- `MessageRepository.subscribe(conversationId, myUserId, onMessage)`
- `MessageRepository.setReaction(...)`
- `MessageRepository.subscribeReactions(...)`
- `PrivateMessageTransport.send(data)`
- `PrivateMessageTransport.onMessage(callback)`

The current RTDB adapter is a legacy-compatible adapter. It translates between
`MessageEnvelope` and the existing RTDB row shape and currently supports text
payloads only.
