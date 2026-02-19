Session vs Conversation: proposed refactoring/renaming, to be reviewed and verified or rejected.

Summary

- Recommendation: make the core transport/storage conversation-centric (use `conversationId`) while keeping small convenience helpers for `contactId` (e.g., `openSessionForContact`) to preserve existing UI flows.

Pros of using `conversationId`

- Aligns with storage: direct mapping to `/conversations/{conversationId}` avoids repeated derivation logic.
- Supports multi-party: naturally models groups, threads, channels and future multi-participant features.
- Opaque/portable ID: can be generated without exposing participant user IDs; supports versioning/metadata.
- Multiple session contexts: enables threads or topic-based sessions with the same participants.
- Easier cross-device sync: canonical conversation key reduces per-device derivation mismatch.

Cons of using `conversationId`

- Less direct for 1:1 UI: UI needs a mapping layer `conversationId -> primaryContact/participants` for display.
- Caller responsibility: code that opens sessions must know/resolve the `conversationId` (or use helpers).
- Access control: must validate membership server/client-side when opening/listening to a conversation.
- Migration effort: existing `contactId`-centric code (badges, toggles, lists) needs small updates.
- Duplicate conversation risk: requires deterministic creation/lookup rules for 1:1 conversations.

Main implications

- API change surface: `MessagingController` and transport can accept `conversationId` (new methods) and keep `contactId`-based helpers for compatibility.
- Transport simplification: transports operate directly on `conversationId`, removing `_getConversationId` coupling to UI/controller internals.
- Data model: need a canonical conversation creation/lookup flow (deterministic for 1:1; canonical central creation for groups).
- UI mapping and badges: UI must maintain `conversationId -> participants/primaryContact` mapping and adapt unread/badge logic accordingly.
- Security: every open/listen/send should validate participant membership.
- Extensibility: easier to add conversation-level metadata, settings, pinned messages, threads, and group features.

Minimal implementation (non-breaking, keep changes small)

1. Transport: add small conversation-centric wrappers in transport implementations (no breaking rename):

   - `sendToConversation(conversationId, text)`
   - `listenToConversation(conversationId, onMessage)`
   - `getUnreadCountForConversation(conversationId)`
   - `markAsReadForConversation(conversationId)`
   - `listenToUnreadCountForConversation(conversationId, cb)`
     These call the same DB paths as current code but accept `conversationId` directly.

2. Controller: add a convenience method in `MessagingController`:

   - `openSessionForConversation(conversationId, {onMessage, onUnreadChange})`
   - Store conversation sessions under a namespaced key (e.g., `conversation:{conversationId}`) to avoid colliding with `contactId` keys.
   - The method should use transport conversation-centric APIs when available and fall back to existing contact-based functions if not.

3. Keep `openSession(contactId, ...)` as-is for backward compatibility; optionally add `openSessionForContact(contactId)` that resolves/creates the canonical conversation and delegates to `openSessionForConversation`.

4. UI: adapt message list / toggles to map `conversationId` → display data (primary contact, title, avatar). Keep per-contact convenience UI by exposing a small resolve helper.

5. Migration checklist (minimal):
   - Add transport conversation methods to implementations (`src/messaging/transports/*`) as thin wrappers.
   - Add `openSessionForConversation` to `src/messaging/messaging-controller.js` (store namespaced session keys).
   - Update any code that currently calls transport `_getConversationId` or expects controller to derive conversation IDs; replace with match to helpers.
   - Add small unit test(s) for both contact-based and conversation-based session flows.

Why this approach

- Minimal surface change: existing APIs still work; new conversation APIs are additive.
- Eases future features (groups, metadata) while keeping current UX stable.

Next steps (suggested)

- I can produce a tiny patch that adds the thin transport wrappers and `openSessionForConversation` (2–3 files changed). Want me to prepare that patch now?
