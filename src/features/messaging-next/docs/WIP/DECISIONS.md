# Messaging Next Decisions

This document should contain only agreed and stable design decisions plus the
target public API. Keep unsettled items in [QUESTIONS.md](./QUESTIONS.md).

## Stable Decisions

- Direct conversation IDs currently use `{sortedUserA}_{sortedUserB}`.
- Group conversation IDs use `group:{generatedId}`.
- Runtime user drafts are private per-user/per-conversation local state and are
  not sent messages. They must not be stored as shared conversation-node state.
- Message envelopes include `conversationId`.
- Message envelopes include `delivery: 'persistent' | 'private'`.
- Message envelopes use `sentAt` for message send time.
- First schema slice supports `text`, `event`, and `system` payloads only.
- Typing state is modeled outside message envelopes as ephemeral participant
  presence with optional UI indicator for `isTyping`.
- `ConversationRepository` owns shared conversation-node metadata: kind,
  participants, title, delivery policy, and timestamps. User drafts are not
  shared conversation metadata.
- `MessageRepository` and private data-channel envelopes use
  `MessageEnvelope` as the core message contract.

## Target Public API

Current draft API:

- `loadLocalDraft(userId, conversationId)`
- `saveLocalDraft(userId, conversationId, text)`
- `clearLocalDraft(userId, conversationId)`
- `ConversationRepository.loadConversation(conversationId)`
- `ConversationRepository.upsertConversation(conversationUpsert)`
- `ConversationRepository.subscribeConversation(conversationId, onConversation)`
- `MessageRepository.loadMessages(conversationId)`
- `MessageRepository.send(messageEnvelope)`
- `MessageRepository.subscribe(conversationId, myUserId, onMessage)`
- `MessageRepository.setReaction(...)`
- `MessageRepository.subscribeReactions(...)`
- `PrivateMessageTransport.send(data)`
- `PrivateMessageTransport.onMessage(callback)`

The current RTDB adapter is a legacy-compatible adapter. It translates between
`MessageEnvelope` and the existing RTDB row shape
`{ from, fromName, text, type, sentAt, read }` and currently supports text
payloads only.
