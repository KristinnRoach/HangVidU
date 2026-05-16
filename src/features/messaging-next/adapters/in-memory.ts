import type {
  IncomingMessage,
  MessageRepository,
  ReactionMap,
} from '../interfaces.js';
import type { ConversationId, UserId } from '../types.js';

export function createInMemoryMessageRepository(): MessageRepository {
  const stored = new Map<ConversationId, IncomingMessage[]>();
  const msgSubs = new Map<
    ConversationId,
    Array<(msg: IncomingMessage) => void>
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

  return {
    loadMessages(conversationId) {
      return [...getStored(conversationId)];
    },

    send({ conversationId, senderId, text, delivery }) {
      const msg: IncomingMessage = {
        id: crypto.randomUUID(),
        conversationId,
        senderId,
        text,
        createdAt: Date.now(),
        delivery,
      };
      getStored(conversationId).push(msg);
      for (const cb of msgSubs.get(conversationId) ?? []) cb(msg);
      return { id: msg.id, createdAt: msg.createdAt };
    },

    subscribe(conversationId, myUserId, onMessage) {
      const list = msgSubs.get(conversationId) ?? [];
      const wrapped = (msg: IncomingMessage) => {
        if (msg.senderId !== myUserId) onMessage(msg);
      };
      list.push(wrapped);
      msgSubs.set(conversationId, list);
      return () => {
        msgSubs.set(
          conversationId,
          (msgSubs.get(conversationId) ?? []).filter((cb) => cb !== wrapped),
        );
      };
    },

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
