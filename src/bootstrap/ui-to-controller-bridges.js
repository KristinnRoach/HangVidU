import { messagingController } from '../messaging/messaging-controller.js';
import { contactsController } from '../contacts/contacts-controller.js';

// Centralized bridge: convert DOM CustomEvents into controller API calls.
// Keeps UI code free from importing controller directly (contacts.js can remain a dumb UI).

const bridgeAc = new AbortController();

function onMessagesToggle(e) {
  const { contactId, contactName } = e?.detail || {};
  if (!contactId) return;
  messagingController.openSession(contactId, contactName);
}

// Listen for contact-driven UI toggles (contacts.js dispatches this event).
// Use AbortController so the bridge can be torn down cleanly if needed.
document.addEventListener('messages:toggle', onMessagesToggle, {
  signal: bridgeAc.signal,
});

function onContactSaved(e) {
  const { roomId } = e?.detail || {};
  // Forward DOM event into the contacts controller event stream
  contactsController.emit('contact:saved', { roomId });
}

function onContactCall(e) {
  const { contactId, contactName, roomId } = e?.detail || {};
  // Forward DOM event into the contacts controller event stream
  contactsController.emit('contact:call', { contactId, contactName, roomId });
}

document.addEventListener('contact:saved', onContactSaved, {
  signal: bridgeAc.signal,
});

document.addEventListener('contact:call', onContactCall, {
  signal: bridgeAc.signal,
});

export function teardownUiToControllerBridges() {
  bridgeAc.abort();
}
