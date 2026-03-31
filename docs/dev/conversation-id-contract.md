# Conversation ID Contract

**Branch introduced:** `codex/conversation-id-contract`  
**Last updated:** 2026-03-31

---

## The contract in one sentence

`conversationId` is an **opaque, stable identifier**. No production code derives participants from it.

---

## Data model

```
conversations/{conversationId}/members/{uid}  = true          ← membership authority
users/{uid}/conversations/{conversationId}    = true          ← reverse index (user → conversations)
users/{uid}/directConversations/{otherUid}    = conversationId ← 1:1 dedup index
conversations/{conversationId}/messages/{id} = { … }         ← messages
```

### Membership authority

`conversations/{conversationId}/members` is the single source of truth for who belongs to a conversation.

- Authorization rules check this path, not the conversation ID string.
- Server-side flows (notifications, account deletion) read from this path.
- Populated atomically via `RTDBMessageStore.ensureConversation(id, participantIds)`.

### Reverse index

`users/{uid}/conversations/{conversationId}` lets a user quickly list all their conversations without scanning the entire `conversations/` tree.

### 1:1 dedup index

`users/{uid}/directConversations/{otherUid}` maps a pair of UIDs to the existing conversationId for their direct conversation. This enables deduplication without parsing the ID.

- Written by `ensureConversation()` when `participantIds.length === 2`.
- Written by `migrate-conversation-members.js` for legacy conversations.

---

## ID format

### Legacy 1:1 conversations (existing data)

```
{userId1}_{userId2}   where userId1 < userId2 (lexicographic sort)
```

These IDs exist in production and must not be broken. They encode participant UIDs for historical reasons but **no code should rely on that encoding** — use the `members` collection instead.

### Future conversations

New conversation types (e.g. group chats) should use opaque IDs (e.g. Firebase push keys). The data model already supports them; only the RTDB rules for the membership bootstrap fallback need to be updated when they are introduced.

---

## Rules summary

| Path | Read | Write |
|------|------|-------|
| `conversations/{id}` | member only | — |
| `conversations/{id}/members/{uid}` | — | LEGACY: id-based bootstrap (see note) |
| `conversations/{id}/messages/{msgId}` | — | member only |
| `users/{uid}/conversations/{id}` | owner only | LEGACY: id-based bootstrap |
| `users/{uid}/directConversations/{otherId}` | owner only | owner only |

**LEGACY bootstrap note:** The write rule for `members/{uid}` and `users/{uid}/conversations/{id}` still uses `$conversationId.contains(auth.uid)` to allow bootstrapping membership for the existing `uid1_uid2` conversations from the client. Once a proper server-side conversation-creation endpoint exists, this can be replaced with a trusted-server-only write.

---

## Key callsites

### Creating / resolving a conversation (client)

```javascript
// 1. Get the conversationId (still deterministic for 1:1, opaque for groups)
const conversationId = messagingController.resolveConversationIdFromContactId(contactId);

// 2. Open the conversation — ensureConversation() is called here
await messagingController.selectConversation(conversationId, {
  remoteParticipantIds: [contactId],
});
```

### Writing membership (client)

`RTDBMessageStore.ensureConversation(conversationId, participantIds)` — call this before the first message write. `selectConversation()` calls it automatically when `remoteParticipantIds` are supplied.

### Notification fanout (server)

`send-message-notification-handler.js` reads `conversations/{id}/members` to find recipients. No ID parsing.

### Account deletion (server / admin script)

Both `delete-account-handler.js` and `scripts/delete-user-account.js` use `users/{uid}/conversations` (the reverse index) to find conversations. No ID parsing. The fallback that called `id.split('_').includes(uid)` was removed on 2026-03-31 when the safety period expired.

---

## Migration

Run `scripts/migrate-conversation-members.js` before deploying to production if any conversations still lack members or the `directConversations` index. It is idempotent.

```bash
# Dry run first:
node scripts/migrate-conversation-members.js

# Apply:
node scripts/migrate-conversation-members.js --confirm
```

The script has two passes:
1. **Membership bootstrap** — for legacy `uid1_uid2` conversations without members (only splits ID for legacy-format IDs that predate members).
2. **`directConversations` index** — reads from the `members` collection (no ID parsing) to write the 1:1 dedup index for all 2-member conversations.

---

## What "legacy fallback" means and when to remove it

| Fallback | Location | Safe to remove when |
|----------|----------|---------------------|
| `contains(auth.uid)` in member write rule | `database.rules.json` | Conversation creation moves server-side |
| `contains($userId)` in reverse-index write rule | `database.rules.json` | Same |
| `resolveConversationId()` deterministic sort+join | `rtdb-message-store.js` | 1:1 lookup switches to `directConversations` index |
| `_ensureMembers()` warning-only fallback | `rtdb-message-store.js` | All call sites pass participants to `ensureConversation()` |

---

## What this branch does NOT do

- Does not implement group chat UI.
- Does not rename existing conversation IDs in the database.
- Does not move conversation creation to the server.
- Does not remove the deterministic `uid1_uid2` ID generation for 1:1 chats (kept for backward compat; future work can switch to opaque push IDs using the `directConversations` index for dedup).
