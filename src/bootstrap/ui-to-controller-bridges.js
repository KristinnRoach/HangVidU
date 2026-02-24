import { messagingController } from '../messaging/messaging-controller.js';

// Centralized bridge: convert DOM CustomEvents into controller API calls.
// Keeps UI code free from importing controller directly (contacts.js can remain a dumb UI).

const bridgeAc = new AbortController();

function onMessagesToggle(e) {
  const { contactId, contactName } = e?.detail || {};
  if (!contactId) return;

  try {
    messagingController.openSession(contactId, contactName);
  } catch (err) {
    console.warn('[Bridge] Failed to open session:', err);
  }
}

// Listen for contact-driven UI toggles (contacts.js dispatches this event).
// Use AbortController so the bridge can be torn down cleanly if needed.
document.addEventListener('messages:toggle', onMessagesToggle, {
  signal: bridgeAc.signal,
});

export function teardownUiToControllerBridges() {
  bridgeAc.abort();
}
