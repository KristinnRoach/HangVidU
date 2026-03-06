# WIP: Messaging Schema Consolidation

**Branch:** `msg-api-improvements`
**Schema:** `src/messaging/schema.js`

---

## Done

- Zod schema defined for `text`, `file`, `event` message types
- `ParsedMessageSchema` extends each union member (not the union itself — Zod 4 constraint)
- Event `details` typed explicitly (not `z.record(z.any())` — broken in Zod 4)
- **`isSentByMe` fully removed** from transport, controller, and UI
  - Transport callback: `onMessage(text, msgData, isSentByMe)` → `onMessage(msgData)`
  - Controller event: `{ conversationId, text, msgData, isSentByMe }` → `{ conversationId, msgData }`
  - `appendMessage(text, opts)` → `appendMessage(msgData, uiOpts?)`
  - `isLocalMessage(msgData)` derives local/remote/null from `msg.from` (with `details.callerId` for events)
- New messages written with explicit `type: 'text'` and `type: 'event'`
- Event messages use `from: 'system'` + `details: { callerId, callerName, callId }`
- Ad-hoc UI notices (DataChannel file transfers, watch-together status) use minimal `{ text, from? }` objects

## Remaining

### 1. RTDB data migration

Old messages in RTDB still have legacy structure:
- Text messages: missing `type` field (code falls back with `msgData.type || 'text'`)
- Call events: `type: 'call_event'` instead of `'event'`, flat `callerId`/`callerName` instead of `details` object
- File messages: `fileType` instead of `mimeType`

**Decision:** Not worth backward-compat code. Either batch-update RTDB or accept old messages won't render correctly (few users, low priority).

Batch update script would need to:
- Add `type: 'text'` to messages missing `type`
- Rename `type: 'call_event'` → `type: 'event'`, move flat caller fields into `details`
- Rename `fileType` → `mimeType` on file messages

### 2. Wire up `parseMessage()` in transport

`rtdb-transport.js` listen() currently passes raw `{ ...msg, messageId }` without validation. Once RTDB data is migrated (or fallback mapping added), run through `parseMessage()` for runtime validation.

### 3. `parseMessage()` needs `messageId` injection

`ParsedMessageSchema` requires `messageId` but `parseMessage(data)` doesn't inject it — the transport adds it separately. Either:
- Change signature to `parseMessage(data, messageId)`
- Or keep relying on transport to attach it before calling parse

### 4. DataChannel file messages outside schema

File transfer messages (send/receive via DataChannel) bypass the schema entirely — they're ad-hoc `appendMessage({ text, from })` calls. These could be modeled as schema messages if needed, but they're UI-only notices (not persisted to RTDB).

### 5. `fileType` → `mimeType` in transport

`rtdb-transport.js` file send still writes `fileType`. Align with schema's `mimeType`.

---

## Message Flow

```
Send:  UI → session.send(text) → RTDBTransport.sendToConversation() → RTDB push
Receive:  RTDB child_added → RTDBTransport.listen() → onMessage(msgData)
            → MessagingController → emit 'message:received' { conversationId, msgData }
            → messages-ui.js processReceivedMessage() → appendMessage(msgData)
```

## Key Files

| File | Role |
|---|---|
| `src/messaging/schema.js` | Zod schemas, `parseMessage()` |
| `src/messaging/messaging-controller.js` | Session management, event emitter |
| `src/messaging/transports/rtdb-transport.js` | RTDB read/write |
| `src/messaging/transports/messaging-transport.js` | Base class (interface) |
| `src/ui/components/messages/messages-ui.js` | Chat UI rendering |

## `isLocalMessage(msgData)` logic

```javascript
// Returns true (local), false (remote), or null (system/no sender)
if (!msgData.from) return null;
if (type === 'event' && details?.callerId) return callerId === myUserId;
if (from === 'system') return null;
return from === myUserId;
```
