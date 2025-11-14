# Manual Testing Debug Commands

## Console Commands to Run During Testing

### 1. Check Active Listeners

```javascript
// Check which rooms have active listeners
console.log(
  'Active listeners:',
  Array.from(window.listeningRoomIds || new Set())
);

// Check saved contacts
window.diagnosticLogger.getInstance().getLogs({ category: 'CONTACT' });
```

### 2. Check Listener State

```javascript
// Get listener diagnostics
window.diagnosticLogger.getListenerDiagnostics();

// Check recent listener events
window.diagnosticLogger
  .getInstance()
  .getLogs({ category: 'LISTENER' })
  .slice(-10);
```

### 3. Check Incoming Call Detection

```javascript
// Check incoming call events
window.diagnosticLogger.getInstance().getLogs({ category: 'INCOMING_CALL' });

// Check member join events
window.diagnosticLogger
  .getInstance()
  .getLogs({ category: 'ROOM' })
  .filter((log) => log.event === 'MEMBER_JOINED');
```

### 4. Force Listener Attachment (Emergency Fix)

```javascript
// If User B doesn't get incoming call, run this:
const contacts = JSON.parse(localStorage.getItem('contacts') || '{}');
Object.values(contacts).forEach((contact) => {
  if (contact.roomId) {
    console.log('Force attaching listener for:', contact.roomId);
    window.listenForIncomingOnRoom(contact.roomId);
  }
});
```

### 5. Export Full Diagnostic Data

```javascript
// Export all diagnostic data for analysis
window.diagnosticLogger.exportLogs();
```

## Testing Steps

### User A (Caller):

1. Create call link
2. Wait for User B to join
3. Both hang up and save contacts
4. **Before calling contact**: Run listener check commands
5. Click contact call button
6. **Monitor console** for listener attachment logs
7. Note if calling UI disappears quickly

### User B (Receiver):

1. Join User A's room
2. Complete call and save contact
3. **After saving contact**: Run listener check commands
4. **When User A calls**: Monitor console for incoming call detection
5. **If no prompt appears**: Run emergency listener fix
6. **Test page reload**: Refresh and see if prompt appears

## Expected Console Output

### Normal Flow:

```
[CONTACT SAVE] Attaching listener for saved contact room: abc123
[LISTENER] Attempting to attach listener for room: abc123
[LISTENER] Attaching new listener for room: abc123 (total: 1)
[CONTACT CALL] Ensuring listener is active for room: abc123
[LISTENER] Duplicate listener prevented for room: abc123
incoming call from user123 for room abc123
```

### Bug Scenario:

```
[CONTACT CALL] Ensuring listener is active for room: abc123
[LISTENER] Attempting to attach listener for room: abc123
[LISTENER] Attaching new listener for room: abc123 (total: 1)
// Missing: "incoming call from user123 for room abc123"
```
