import type {
  IncomingMessage,
  MessageRepository,
  ReactionMap,
} from '../interfaces.js';
import type { ConversationId, UserId } from '../types.js';

export function createInMemoryMessageRepository(): MessageRepository {
  const stored = new Map<ConversationId, IncomingMessage[]>();
  const recentSubs = new Map<
    ConversationId,
    Array<(messages: IncomingMessage[]) => void>
  >();
  const rxnSubs = new Map<
    ConversationId,
    Array<(messageId: string, reactions: ReactionMap) => void>
  >();
  const reactions = new Map<string, ReactionMap>(); // `${conversationId}:${messageId}`
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
      };
      getStored(msg.conversationId).push(msg);
      notifyRecent(msg.conversationId);
      return { id: msg.messageId, sentAt: msg.sentAt };
    },

    markConversationRead() {},

    setReaction(conversationId, messageId, emoji, userId, active) {
      const key = `${conversationId}:${messageId}`;
      const map: ReactionMap = { ...(reactions.get(key) ?? {}) };
      if (active) {
        map[emoji] = { ...map[emoji], [userId as string]: true };
      } else if (map[emoji]) {
        const { [userId as string]: _, ...rest } = map[emoji];
        if (Object.keys(rest).length === 0) {
          delete map[emoji];
        } else {
          map[emoji] = rest as Record<UserId, true>;
        }
      }
      reactions.set(key, map);
      for (const cb of rxnSubs.get(conversationId) ?? []) cb(messageId, map);
    },

    subscribeReactions(conversationId, onReactions) {
      const list = rxnSubs.get(conversationId) ?? [];
      list.push(onReactions);
      rxnSubs.set(conversationId, list);
      return () => {
        rxnSubs.set(
          conversationId,
          (rxnSubs.get(conversationId) ?? []).filter((cb) => cb !== onReactions),
        );
      };
    },
  };
}
