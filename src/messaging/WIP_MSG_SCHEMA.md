# Messaging Schema Status

**Branch:** `msg-api-improvements`

## Architecture

### Two append paths in messages-ui.js

- `appendMessage(msgData)` — schema-validated messages from RTDB transport only
- `appendEphemeralMessage({ text })` — non-persisted UI notices (status, errors, watch-together, file transfer). Returns DOM element for caller to extend (e.g. attach download link).

### Message flow

```
Send:  UI → session.send(text) → RTDBTransport.sendToConversation() → RTDB push
Receive:  RTDB child_added → RTDBTransport.listen() → parseMessage(msg, msgId)
            → MessagingController → emit 'message:received' { conversationId, msgData }
            → messages-ui.js processReceivedMessage() → appendMessage(msgData)
```

### Zod 4 gotchas

- `z.record(valueSchema)` means **key** validator in Zod 4. Always use `z.record(z.string(), valueSchema)`.
- `.extend()` on a union doesn't work — must extend each union member individually.
- `z.record(z.any())` is broken for `details` — use explicit object shape.

## Key files

| File | Role |
|---|---|
| `src/messaging/schema.js` | Zod schemas, `parseMessage()` |
| `src/messaging/messaging-controller.js` | Session management, event emitter |
| `src/messaging/transports/rtdb-transport.js` | RTDB read/write, calls `parseMessage()` in `listen()` |
| `src/ui/components/messages/messages-ui.js` | Chat UI: `appendMessage` + `appendEphemeralMessage` |
