import {
  ref,
  get,
  onValue,
  update,
  type Database,
} from 'firebase/database';
import type {
  ConversationRepository,
  ConversationUpsert,
} from '../interfaces.js';
import { ConversationNodeSchema } from '../schema.js';
import type { ConversationId, ConversationNode } from '../types.js';

// Conversation metadata on RTDB. The message path that used to live here was
// retired in PR #551 once D1 became the sole message backend. Migrating this
// conversation-metadata repository to D1 is a separate slice (MIGRATION_STATUS
// slice C).

type RTDBRepositoryOptions = {
  database: Database;
};

function conversationRef(database: Database, conversationId: ConversationId) {
  return ref(database, `conversations/${conversationId}`);
}

function toConversationNode(raw: unknown): ConversationNode | null {
  const parsed = ConversationNodeSchema.safeParse(raw);
  return parsed.success ? parsed.data : null;
}

function conversationUpdate(
  input: ConversationUpsert,
  existing: ConversationNode | null,
) {
  const now = Date.now();
  const payload: Record<string, unknown> = {
    conversationId: input.conversationId,
    kind: input.kind,
    title: input.title ?? null,
    participants: input.participants,
    deliveryPolicy: input.deliveryPolicy ?? 'persistent',
    createdAt: input.createdAt ?? existing?.createdAt ?? now,
    updatedAt: input.updatedAt ?? now,
  };
  return payload;
}

export function createRTDBConversationRepository({
  database,
}: RTDBRepositoryOptions): ConversationRepository {
  return {
    async loadConversation(conversationId) {
      const snapshot = await get(conversationRef(database, conversationId));
      if (!snapshot.exists()) return null;
      return toConversationNode(snapshot.val());
    },

    async upsertConversation(input) {
      const existingSnapshot = await get(
        conversationRef(database, input.conversationId),
      );
      const existing = existingSnapshot.exists()
        ? toConversationNode(existingSnapshot.val())
        : null;

      await update(
        conversationRef(database, input.conversationId),
        conversationUpdate(input, existing),
      );

      const snapshot = await get(
        conversationRef(database, input.conversationId),
      );
      const conversation = toConversationNode(snapshot.val());
      if (!conversation) {
        throw new Error(`Invalid conversation node: ${input.conversationId}`);
      }
      return conversation;
    },

    subscribeConversation(conversationId, onConversation) {
      return onValue(conversationRef(database, conversationId), (snapshot) => {
        onConversation(
          snapshot.exists() ? toConversationNode(snapshot.val()) : null,
        );
      });
    },
  };
}
