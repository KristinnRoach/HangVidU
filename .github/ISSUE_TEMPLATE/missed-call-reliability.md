---
name: Missed Call Notification Reliability Issues
about: Investigation needed for unreliable missed call notifications and incoming call UI
title: 'Investigate: Missed call notifications unreliable, incoming call UI sometimes missing'
labels: bug, investigation, notifications, call-flow
assignees: ''
---

## Problem Description

After implementing the missed call in-app notification MVP, several reliability issues have been observed:

### 1. Missed Call Notifications Not Predictable/Reliable

- Missed call notifications don't appear consistently
- Sometimes requires making multiple calls before a notification appears
- Unclear what conditions trigger the notification vs. what conditions prevent it

### 2. Incoming Call UI/Ringtone Sometimes Missing

- User sometimes does not see the incoming call UI
- Ringtone sometimes does not play
- Issue appears to resolve after page reload
- Suggests a state initialization or listener attachment problem

## Reproduction Steps

1. User A calls User B (saved contact)
2. User B doesn't answer
3. Expected: Missed call notification appears for User A
4. Actual: Notification may or may not appear

For incoming call issue:

1. User A calls User B
2. Expected: User B sees incoming call UI and hears ringtone
3. Actual: Sometimes no UI or ringtone until page reload

## Potential Root Causes to Investigate

### Missed Call Detection Logic

- Check conditions in `main.js` cleanup handler (around line 1700)
- Verify `isMissedCall` logic: `role === 'initiator' && !partnerId && !wasConnected && roomId`
- Check if `getContactByRoomId()` is reliably finding contacts
- Verify timing: does cleanup happen before contact lookup completes?

### Incoming Call Listener Attachment

- Check if listeners are attached before incoming calls arrive
- Review `listenForIncomingOnRoom()` in main.js
- Check if Firebase RTDB listeners are properly initialized on page load
- Verify listener persistence across call lifecycle

### State Initialization

- Check if ringtone manager is initialized before incoming calls
- Verify call indicators are ready
- Check if notification manager is initialized

## Related Code Locations

- `src/main.js` - Missed call detection (line ~1700)
- `src/main.js` - Incoming call listener setup (line ~730)
- `src/components/notifications/missed-call-notification.js` - Notification component
- `src/media/audio/ringtone-manager.js` - Ringtone playback
- `src/storage/fb-rtdb/rtdb.js` - RTDB listener management

## Architectural Consideration

**Consider whether it is worth doing an event-driven overhaul of the whole call flow**

The current call flow uses a mix of:

- Direct function calls
- RTDB listeners
- DOM events
- Callback patterns

An event-driven architecture might provide:

- More predictable behavior
- Easier debugging
- Better separation of concerns
- Clearer state management

This should be evaluated in a dedicated architectural session reviewing ALL affected code:

- `call-flow.js`
- `main.js`
- `contacts.js`
- `call-controller.js`
- Notification systems

## Success Criteria

- [ ] Missed call notifications appear 100% of the time when conditions are met
- [ ] Incoming call UI and ringtone work on first call without page reload
- [ ] Root cause identified and documented
- [ ] Fix implemented with tests
- [ ] Decision made on event-driven architecture overhaul

## Priority

**High** - Affects core user experience for call notifications

## Labels

- `bug` - Functionality not working as expected
- `investigation` - Root cause needs to be identified
- `notifications` - Related to notification system
- `call-flow` - Related to call lifecycle management
