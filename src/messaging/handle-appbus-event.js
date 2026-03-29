import { appBus } from '../app/app-bus';
import { tempWarn } from '../utils/dev/dev-utils';
import { messagingController } from './messaging-controller';

// TEMP or WIP file to help decouple event wiring.

appBus.on('call:incoming:accepted', ({ contactId }) => {
  tempWarn(`[APPBUS] Handling call answered event from contact ${contactId}`);

  const conversationId =
    messagingController.resolveConversationIdFromContactId(contactId);

  messagingController
    .selectConversation(conversationId, {
      remoteParticipantIds: [contactId],
      displayUI: false,
    })
    .catch((e) => {
      console.warn(
        'Failed to select conversation on call:incoming:accepted:',
        e,
      );
    });
});

appBus.on('call:unanswered', async ({ roomId, contactId }) => {
  tempWarn(
    `[APPBUS] Handling unanswered call for room ${roomId}, contact ${contactId}`,
  );

  try {
    const conversationId =
      messagingController.resolveConversationIdFromContactId(contactId);

    await messagingController.sendEventMessage(
      conversationId,
      'call:unanswered',
      { callId: roomId },
    );
  } catch (e) {
    console.warn('[APPBUS] Failed to write unanswered call message:', e);
  }
});

// Wire up any cross-domain side effects for MessagingController events here.
// UI-specific handlers currently live in bind-messaging-ui.js; these should be for things like:
// - Triggering push notifications on new messages
// - Updating contact presence based on messaging events
// - Any other side effects that need to happen across domains (messaging, contacts, push, etc)
