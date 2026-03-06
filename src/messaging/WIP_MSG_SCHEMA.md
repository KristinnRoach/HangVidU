# WIP: Messaging Schema Consolidation

**Status:** Schema improved for clarity, consistency, and future DB portability. RTDB migration planned.

---

## What Changed

### ✅ Completed
- All messages now have explicit `type: 'text' | 'file' | 'event'`
- Renamed `call_event` → `event` with `eventType` enum
- Changed `fileType` → `mimeType` for clarity
- File messages support optional `text` field for captions
- Event messages use `from: 'system'` and `metadata` object
- Schema defined in `src/messaging/schema.js` with Zod validation

### 📋 Pending (RTDB Migration)
- Add `type: 'text'` to existing text messages in RTDB (~100-500 messages)
- Rename existing `type: 'call_event'` → `type: 'event'`
- Restructure event metadata (move callerId/callerName → metadata)
- Update UI to expect explicit types everywhere
- Update transport layer to handle new structure

---

## Message Structure

### Conversation Path
```
conversations/{conversationId}/messages/{messageId}
```

**Conversation ID format:** `{userId1}_{userId2}` (alphabetically sorted for consistency)

---

## Message Types

### Text Message
```javascript
{
  type: 'text',
  text: 'Hello!',
  from: 'user-alice',      // Real user ID
  fromName: 'Alice Smith',
  sentAt: 1741254847000,   // Server timestamp (ms)
  read: false,
  reactions: { emoji: { userId: true } }, // Optional
  messageId: 'msg-id'      // Added by transport
}
```

### File Message
```javascript
{
  type: 'file',
  fileName: 'document.pdf',
  mimeType: 'application/pdf',
  fileSize: 1024000,
  data: 'JVBERi0xLjQK...', // Base64-encoded
  text: 'Here is the doc',  // Optional caption
  from: 'user-alice',
  fromName: 'Alice Smith',
  sentAt: 1741254847000,
  read: false,
  reactions: { emoji: { userId: true } }, // Optional
  messageId: 'msg-id'
}
```

### Event Message
```javascript
{
  type: 'event',
  eventType: 'missed_call' | 'rejected_call',
  from: 'system',           // System-generated, not user
  sentAt: 1741254847000,
  read: false,
  metadata: {               // Event-specific data
    callerId: 'user-bob',
    callerName: 'Bob Jones',
    callId: 'room-123'
  },
  messageId: 'msg-id'
}
```

---

## Reactions Structure

**Storage path:** `conversations/{conversationId}/messages/{messageId}/reactions/`

```javascript
{
  "👍": { "user-alice": true, "user-bob": true },
  "❤️": { "user-charlie": true }
}
```

**Parsed format (UI layer):** `{ "👍": ["user-alice", "user-bob"], "❤️": ["user-charlie"] }`

---

## Key Concepts

### Type Discriminator
- Explicit `type` field enables discriminated unions
- Zod schema validates one type per message
- Future extensibility: add new types without breaking existing logic

### System-Generated Events
- Event messages always have `from: 'system'`
- Event-specific data lives in `metadata` object
- Future events (typing, polls, etc.) reuse same structure

### Optional Captions
- File messages support `text` field for user descriptions
- Simplest design: file + caption = single message unit

### Read Status
- `read: false` on creation
- Set to `true` when recipient opens conversation
- Debounced 100ms to prevent quota spam
- Triggers UI checkmark on sender's side

---

## Transport Layer (RTDBTransport)

### Send Flow
```
User input → MessagingController.send()
  → RTDBTransport.sendToConversation(conversationId, text)
  → push(messages/{messageId}, { type: 'text', text, from, ... })
```

### Receive Flow
```
RTDBTransport.listen(conversationId, onMessage)
  → onChildAdded: emit 'message:received' event
  → onChildChanged: emit 'reaction:updated' + 'unread:changed'
```

### Session Caching
- Keeps last 50 messages per conversation in `session.history`
- Used for instant UI re-hydration when switching sessions
- Reactions and read status updates propagate to cache

---

## RTDB Path Structure

```
conversations/
  {conversationId}/
    messages/
      {messageId1}: { type, text?, fileName?, ... }
      {messageId2}: { type, text?, fileName?, ... }
      {messageId3}/
        reactions/
          "👍"/
            {userId}: true
```

---

## Future Extensibility

### New Event Types
Add to `eventType` enum in `EventMessageSchema`:
```javascript
eventType: z.enum([
  'missed_call',
  'rejected_call',
  'typing',           // Future
  'poll_created',     // Future
  'file_transfer',    // Future
])
```

### New Message Types
Create new schema, add to `MessageSchema` union:
```javascript
const SystemNoticeSchema = z.object({
  type: z.literal('notice'),
  title: z.string(),
  body: z.string(),
  // ...
});

export const MessageSchema = z.union([
  TextMessageSchema,
  FileMessageSchema,
  EventMessageSchema,
  SystemNoticeSchema,  // New type
]);
```

---

## Critical Issues (Pre-Migration)

### 1. Three-Layer Message Structure Mismatch
- Storage: `{ text, from, sentAt, read }` (no type for text)
- Transport: adds `messageId`
- UI: transforms `reactions` format, infers type

**Resolution:** RTDB migration to add explicit types

### 2. File Data in RTDB
- Base64 files stored inline (1-2 MB limit)
- Works now but doesn't scale long-term
- Future: move to Firebase Storage or S3

**For now:** Accept RTDB limits; migrate if app scales

### 3. Reactions Listener Architecture
- Message `child_changed` fires for reaction updates
- Full message refetched each time
- If moving reactions to separate collection: need dual listeners

**For now:** Works; optimize if needed

---

## Testing & Validation

### Schema Validation
```javascript
import { MessageSchema, parseMessage } from '@/messaging/schema.js';

// Parse raw RTDB data
const msg = parseMessage(rawData);
// Throws if invalid structure

// Validate new message before sending
MessageSchema.parse(myMessage);
```

### Type Safety
- TypeScript inference works with discriminated unions
- Zod ensures runtime validation
- UI can narrow type based on `msg.type`

---

## Zod Schema Location
`src/messaging/schema.js` - Single source of truth for message structure

---

## Migration Roadmap

**Phase 1: Add Type Field (1-2 hours)**
- RTDB batch update: Add `type: 'text'` to all text messages
- Update schema: Mark type as required
- Backward compat: Handle missing type in parser

**Phase 2: Rename Event Type (2-3 hours)**
- RTDB batch update: `call_event` → `event`, restructure metadata
- Schema update: New EventMessageSchema
- Transport update: Handle old/new formats during transition

**Phase 3: UI Updates (1-2 hours)**
- Stop inferring types, use explicit field
- Update type-based switches
- Handle `from: 'system'` for events

**Phase 4: Cleanup (1 hour)**
- Remove backward compat code
- Remove temp flags/migrations
- Clean up tests

**Estimated total:** 5-8 hours for full migration
