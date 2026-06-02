import type {
  ConversationActivity,
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
  const activitySubs = new Map<
    ConversationId,
    Array<{
      userId: UserId;
      onChange: (activity: ConversationActivity) => void;
      lastEmittedSentAt: number;
      lastEmittedReadAt: number;
      lastEmittedSenderId: UserId | null | undefined;
    }>
  >();
  const rxnSubs = new Map<
    ConversationId,
    Array<(messageId: string, reactions: ReactionMap) => void>
  >();
  const reactions = new Map<string, ReactionMap>(); // `${conversationId}:${messageId}`
  const lastReadAt = new Map<string, number>(); // `${conversationId}:${userId}`

  function getStored(id: ConversationId) {
    if (!stored.has(id)) stored.set(id, []);
    return stored.get(id)!;
  }

  function readKey(conversationId: ConversationId, userId: UserId) {
    return `${conversationId}:${userId}`;
  }

  function notifyRecent(conversationId: ConversationId) {
    const messages = [...getStored(conversationId)];
    for (const cb of recentSubs.get(conversationId) ?? []) cb(messages);
  }

  function activitySnapshot(
    conversationId: ConversationId,
    userId: UserId,
  ): ConversationActivity {
    const latest = getStored(conversationId).at(-1);
    return {
      latestSentAt: latest?.sentAt ?? 0,
      latestSenderId: latest?.senderId ?? null,
      lastReadAt: lastReadAt.get(readKey(conversationId, userId)) ?? 0,
    };
  }

  function notifyActivity(conversationId: ConversationId) {
    for (const sub of activitySubs.get(conversationId) ?? []) {
      const next = activitySnapshot(conversationId, sub.userId);
      if (
        next.latestSentAt === sub.lastEmittedSentAt &&
        next.lastReadAt === sub.lastEmittedReadAt &&
        next.latestSenderId === sub.lastEmittedSenderId
      ) continue;
      sub.lastEmittedSentAt = next.latestSentAt;
      sub.lastEmittedReadAt = next.lastReadAt;
      sub.lastEmittedSenderId = next.latestSenderId;
      sub.onChange(next);
    }
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
      notifyActivity(msg.conversationId);
      return { id: msg.messageId, sentAt: msg.sentAt };
    },

    markConversationRead(conversationId, userId) {
      lastReadAt.set(readKey(conversationId, userId), Date.now());
      notifyActivity(conversationId);
    },

    watchConversationActivity(conversationId, userId, onChange) {
      const list = activitySubs.get(conversationId) ?? [];
      const initial = activitySnapshot(conversationId, userId);
      const sub = {
        userId,
        onChange,
        lastEmittedSentAt: initial.latestSentAt,
        lastEmittedReadAt: initial.lastReadAt,
        lastEmittedSenderId: initial.latestSenderId,
      };
      list.push(sub);
      activitySubs.set(conversationId, list);
      onChange(initial);
      return () => {
        activitySubs.set(
          conversationId,
          (activitySubs.get(conversationId) ?? []).filter(
            (item) => item !== sub,
          ),
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
