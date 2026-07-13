import { subscribe } from '@shared/events/index.js';
import {
  startConversationListSync,
  stopConversationListSync,
} from '../../stores/conversation/conversation-list-state';
import { resetConversationsState } from '../../stores/conversation/conversations-client.js';
import { resetConversationStore } from '../../stores/conversation/conversation-store.js';
import { recordSystemMessage } from '../../stores/conversation/conversation-store.js';
import { createSingleFlightSetup } from '@shared/utils/create-single-flight-setup.js';
import type { SystemMessageType } from '../../../shared/conversation-channel/protocol';

export { ConversationPanel } from './components/ConversationPanel.js';

/**
 * Setup contract:
 * - idempotent: returns existing cleanup when already ready
 * - single-flight: concurrent callers share one init promise
 * - teardown: cleanup aborts the logout subscription and resets readiness
 *
 * Starts conversation-list activity (seed + live mailbox) on login and tears
 * down live conversation state when the user logs out.
 */
export const setup = createSingleFlightSetup({
  label: '[conversations]',
  register: (signal) => {
    const recordCallSystemMessage = (
      systemType: SystemMessageType,
      {
        roomId: conversationId,
        startedAt,
      }: { roomId: string; startedAt: number },
    ) => {
      const messageId = `${systemType}:${conversationId}:${startedAt}`;
      void recordSystemMessage(conversationId, systemType, messageId).catch(
        (error) => {
          console.warn('[conversations] system message write failed:', {
            systemType,
            conversationId,
            error,
          });
        },
      );
    };

    subscribe(
      'evt:call:invite:unanswered',
      (call: { roomId: string; startedAt: number }) =>
        recordCallSystemMessage('call.unanswered', call),
      { signal },
    );

    subscribe(
      'evt:call:invite:declined',
      (call: { roomId: string; startedAt: number }) =>
        recordCallSystemMessage('call.declined', call),
      { signal },
    );

    subscribe(
      'evt:auth:session:logged-in',
      () => {
        try {
          startConversationListSync();
        } catch (error) {
          console.warn('[conversations] list sync start failed:', error);
        }
      },
      { signal },
    );

    subscribe(
      'evt:auth:session:logged-out',
      () => {
        try {
          stopConversationListSync();
        } catch (error) {
          console.warn('[conversations] list sync teardown failed:', error);
        }
        try {
          resetConversationStore();
        } catch (error) {
          console.warn(
            '[conversations] active-conversation reset failed:',
            error,
          );
        }
        try {
          resetConversationsState();
        } catch (error) {
          console.warn('[conversations] state reset failed:', error);
        }
      },
      { signal },
    );
  },
});
