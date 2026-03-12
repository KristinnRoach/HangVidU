import { contactsController } from '../contacts/contacts-controller.js';
import { messagingController } from '../messaging/messaging-controller.js';

// Centralized bridge: convert DOM CustomEvents into controller API calls.
// Keeps UI code free from importing controller directly (contacts.js can remain a dumb UI).

const bridgeAc = new AbortController();

async function onSelectConversation(e) {
  const { contactId, contactName, displayUI } = e?.detail || {};
  if (!contactId) return;

  try {
    const conversationId =
      messagingController.resolveConversationIdFromContactId(contactId);
    if (!conversationId) {
      console.warn(
        '[Bridge] onSelectConversation(): No conversationId found for contactId',
      );
      return;
    }

    await messagingController.selectConversation(conversationId, contactName);

    if (!displayUI) return;

    messagingController.displayConversation(conversationId);
  } catch (err) {
    console.warn('[Bridge] Failed to select conversation:', err);
  }
}

// Listen for contact-driven UI toggles (contacts.js dispatches this event).
document.addEventListener(
  'messages:conversation:select',
  onSelectConversation,
  {
    signal: bridgeAc.signal,
  },
);

function onContactCall(e) {
  const { contactId, contactName } = e?.detail || {};
  if (!contactId) return;

  try {
    contactsController.emit('contact:call', {
      contactId,
      contactName,
    });
  } catch (err) {
    console.warn('[Bridge] Failed to emit contact:call:', err);
  }
}

document.addEventListener('contact:call', (e) => onContactCall(e), {
  signal: bridgeAc.signal,
});

export function teardownUiToControllerBridges() {
  bridgeAc.abort();
}
