import { ConversationNodeSchema } from '../schema.js';
import type {
  ConversationRepository,
  ConversationUpsert,
} from '../interfaces.js';
import type {
  ConversationDraft,
  ConversationId,
  ConversationNode,
} from '../types.js';

function cloneConversation(conversation: ConversationNode): ConversationNode {
  return ConversationNodeSchema.parse(structuredClone(conversation));
}

export function createInMemoryConversationRepository(): ConversationRepository {
  const stored = new Map<ConversationId, ConversationNode>();
  const subs = new Map<
    ConversationId,
    Array<(conversation: ConversationNode | null) => void>
  >();

  function notify(conversationId: ConversationId, value: ConversationNode | null) {
    for (const cb of subs.get(conversationId) ?? []) {
      cb(value ? cloneConversation(value) : null);
    }
  }

  return {
    loadConversation(conversationId) {
      const conversation = stored.get(conversationId);
      return conversation ? cloneConversation(conversation) : null;
    },

    upsertConversation(input: ConversationUpsert) {
      const existing = stored.get(input.conversationId);
      const now = Date.now();
      const conversation = ConversationNodeSchema.parse({
        ...input,
        createdAt: input.createdAt ?? existing?.createdAt ?? now,
        updatedAt: input.updatedAt ?? now,
        draft:
          input.draft === undefined
            ? (existing?.draft ?? null)
            : input.draft,
      });

      stored.set(conversation.conversationId, conversation);
      notify(conversation.conversationId, conversation);
      return cloneConversation(conversation);
    },

    setDraft(conversationId: ConversationId, draft: ConversationDraft | null) {
      const existing = stored.get(conversationId);
      if (!existing) {
        throw new Error(`No conversation: ${conversationId}`);
      }

      const conversation = ConversationNodeSchema.parse({
        ...existing,
        draft,
        updatedAt: draft?.updatedAt ?? Date.now(),
      });

      stored.set(conversationId, conversation);
      notify(conversationId, conversation);
      return cloneConversation(conversation);
    },

    subscribeConversation(conversationId, onConversation) {
      const list = subs.get(conversationId) ?? [];
      list.push(onConversation);
      subs.set(conversationId, list);

      const existing = stored.get(conversationId);
      if (existing) onConversation(cloneConversation(existing));

      return () => {
        subs.set(
          conversationId,
          (subs.get(conversationId) ?? []).filter((cb) => cb !== onConversation),
        );
      };
    },
  };
}
