import type {
  IncomingMessage,
  MessageRepository,
} from '../interfaces.js';
import type { ConversationId, UserId } from '../types.js';

export function createInMemoryMessageRepository(): MessageRepository {
  const stored = new Map<ConversationId, IncomingMessage[]>();
  const recentSubs = new Map<
    ConversationId,
    Array<(messages: IncomingMessage[]) => void>
  >();
  const reactions = new Map<string, Map<UserId, string>>();
  function getStored(id: ConversationId) {
    if (!stored.has(id)) stored.set(id, []);
    return stored.get(id)!;
  }

  function notifyRecent(conversationId: ConversationId) {
    const messages = [...getStored(conversationId)];
    for (const cb of recentSubs.get(conversationId) ?? []) cb(messages);
  }

  return {
    createMessageId() {
      return crypto.randomUUID();
    },

    loadMessages(conversationId) {
      return [...getStored(conversationId)];
    },

    watchRecentMessages(conversationId, onMessages) {
      const list = recentSubs.get(conversationId) ?? [];
      list.push(onMessages);
      recentSubs.set(conversationId, list);
      onMessages([...getStored(conversationId)]);
      return () => {
        recentSubs.set(
          conversationId,
          (recentSubs.get(conversationId) ?? []).filter(
            (cb) => cb !== onMessages,
          ),
        );
      };
    },

    send(message) {
      const msg: IncomingMessage = {
        ...message,
        sentAt: Date.now(),
        reactions: [],
      };
      getStored(msg.conversationId).push(msg);
      notifyRecent(msg.conversationId);
      return { id: msg.messageId, sentAt: msg.sentAt };
    },

    markConversationRead() {},

    setMyReaction(conversationId, messageId, userId, reactionKey) {
      const key = `${conversationId}:${messageId}`;
      const byUser = reactions.get(key) ?? new Map<UserId, string>();
      if (reactionKey === null) {
        byUser.delete(userId);
      } else {
        byUser.set(userId, reactionKey);
      }
      reactions.set(key, byUser);

      const counts = new Map<string, number>();
      for (const value of byUser.values()) {
        counts.set(value, (counts.get(value) ?? 0) + 1);
      }
      const message = getStored(conversationId).find(
        (candidate) => candidate.messageId === messageId,
      );
      if (message) {
        message.reactions = [...counts].map(([reaction, count]) => ({
          key: reaction,
          count,
          reactedByMe: byUser.get(userId) === reaction,
        }));
        notifyRecent(conversationId);
      }
    },
  };
}
