// main.js

// ============================================================================
// HANGVIDU - P2P VIDEO CHAT WITH WATCH-TOGETHER MODE
// ============================================================================

import './initSentry.js';
import { removeAllRTDBListeners } from './shared/storage/fb-rtdb/rtdb.js';

import { getPushNotifications } from './features/push-notifications/index.js';

import CallController from './features/call/call-controller.js';
import { messagingController } from './features/messaging/messaging-controller.js';
import {
  getConversationId,
  getAllContactsSorted,
} from './features/contacts/index.js';
import { mountApp, cleanupApp } from './mount-app.jsx';

import {
  localVideoEl,
  remoteVideoEl,
  sharedVideoEl,
  callBtn,
  hangUpBtn,
  exitWatchModeBtn,
  sharedBoxEl,
  lobbyDiv,
  initializeElements,
} from './elements.js';

import {
  isWatchModeActive,
  getLastWatched,
  setLastWatched,
} from './features/watch/watch-sync.js';

import {
  hasLocalStream,
  cleanupLocalStream,
  cleanupLocalVideoOnlyStream,
} from './shared/media/state.js';

import {
  devDebug,
  isDev,
  setDevDebugEnabled,
} from './shared/utils/dev/dev-utils.js';

import { getDiagnosticLogger } from './shared/utils/dev/diagnostic-logger.js';

import { clearUrlParam } from './shared/utils/url.js';

// ____ UI RELATED IMPORTS - REFACTOR IN PROGRESS ____
import './shared/components/ui/core/ui-state.js'; // Initialize UI state (sets body data-view attribute)
import { bindCallUI } from './setup/bind-call-ui.js';

import {
  onWatchModeEntered,
  onWatchModeExited,
} from './shared/components/ui/core/watch-lifecycle-ui.js';

import {
  destroyYouTubePlayer,
  pauseYouTubeVideo,
  isYTVisible,
  showYouTubePlayer,
  hideYouTubePlayer,
  setYouTubeReady,
} from './shared/media/youtube/youtube-player.js';

import { cleanupMediaControls } from './shared/media/media-controls.js';
import {
  showElement,
  hideElement,
  exitPiP,
} from './shared/components/ui/utils/ui-utils.js';
import { messagesUI } from './features/messaging/components/messages-ui.js';
import { createWatchFileHandler } from './features/watch/watch-file-handler.js';
import { copyToClipboard } from './shared/components/modal/copyLinkModal.js';

// ____ UI END ____

import { onCallDisconnected } from './shared/components/ui/core/call-lifecycle-ui.js';
import { t } from './shared/i18n/index.js';
import { setupMessagingContactsIntegration } from './setup/messaging-contacts-bridge.js';
import { setupApp } from './setup/setupApp.js';
import { setupInitPreflight } from './setup/setupInitPreflight.js';
import { setupTopBarAndLocale } from './setup/setupTopBarAndLocale.js';
import { setupMessagingAppBusHandlers } from './features/messaging/messaging-command-handlers.js';
import { setupCallControllerEventWiring } from './features/call/call-event-wiring.js';
import { setupMainAppBusListeners } from './setup/setupMainAppBusListeners.js';
import { setupAuth } from './setup/setupAuth.js';
import { setupUserAccount } from './setup/setupUserAccount.js';
import {
  getCallOptions,
  applyCallResult,
  joinOrCreateRoomWithId,
} from './features/call/WIP-start-call-refactor.js';
import {
  initLocalStreamAndMedia,
  handleMediaPermissionError,
} from './shared/media/WIP-init-local-media.js';

messagesUI?.setWatchFileHandler?.(createWatchFileHandler());
import {
  settleIncomingCallWaitForRoom,
  startListeningForSavedRooms,
} from './features/call/room-listeners.js';
import { showErrorToast } from './shared/components/toast.js';
import { dispatchCommandAndAwait } from './shared/events/index.js';
import { setAppAction } from './shared/components/ui/app-actions.js';

// Quick access to enable / disable dev debug logs
setDevDebugEnabled(true);
getDiagnosticLogger().disable();
let showDebugUIForNotifications = false;

// ============================================================================
// GLOBAL STATE
// ============================================================================

// Call state now managed by CallController - use CallController.getState()
// to access pc, dataChannel, partnerId, role, messagesUI, roomId, roomLink

let cleanupFunctions = [];
let isHandlingServiceWorkerNavigation = false;
let appSetupCleanup = () => {};

initializeElements();

// ============================================================================
// APP STARTUP
// ============================================================================

function handleInitFailure(error) {
  const buttonTitle = t('error.init.button_title');
  const toastMessageKey = 'error.init.toast';
  const toastMessage = t(toastMessageKey);
  const fallbackToastMessage =
    'An error occurred. Please reload and check cam/mic permissions.';

  for (const button of [callBtn]) {
    if (!button) continue;
    button.disabled = true;
    button.title =
      buttonTitle === 'error.init.button_title'
        ? 'Initialization failed'
        : buttonTitle;
  }

  if (error) {
    console.error('[MAIN] bootstrap failed:', error);
  } else {
    console.error(
      'Initialization failed. Call functionality disabled. Please reload the page.',
    );
  }
  const finalToastMessage =
    toastMessage === toastMessageKey ? fallbackToastMessage : toastMessage;
  try {
    showErrorToast(finalToastMessage);
  } catch (toastError) {
    console.warn('[MAIN] Failed to render init error toast:', toastError);
    if (typeof globalThis.alert === 'function') {
      globalThis.alert(finalToastMessage);
    }
  }
}

async function bootstrapApp() {
  appSetupCleanup = await setupApp({
    runPreflight: () => setupInitPreflight(),
    runInit: init,
    setupTopBarAndLocale: () =>
      setupTopBarAndLocale({
        showDebugUIForNotifications,
      }),
    bindCallUI: () => bindCallUI(CallController),
    mountApp,
    setupMainAppBusListeners,
    startListeningForSavedRooms,
    autoInitMsgSessionIfNeeded,
    autoJoinFromUrl,
    handleServiceWorkerNavigation,
    onInitFailed: (error) => {
      handleInitFailure(error);
    },
    onReady: () => devDebug('Ready. Click "Start New Chat" to begin.'),
  });
}

if (document.readyState === 'loading') {
  document.addEventListener(
    'DOMContentLoaded',
    () => {
      bootstrapApp().catch((error) => {
        console.error('[MAIN] bootstrap failed:', error);
      });
    },
    { once: true },
  );
} else {
  bootstrapApp().catch((error) => {
    console.error('[MAIN] bootstrap failed:', error);
  });
}

// ============================================================================
// INITIALIZATION & MEDIA SETUP
// ============================================================================

async function init() {
  try {
    const isPWAEnabled = import.meta.env.VITE_ENABLE_PWA !== '0';
    if (isPWAEnabled) {
      const { setupPWA } = await import('./shared/pwa/PWA.js');
      await setupPWA();
    }

    // Load PWA update testing utility in development
    if (import.meta.env.DEV) {
      import('./shared/pwa/test-update.js').catch(() => {
        // Silently fail if module not available
      });
    }

    cleanupFunctions.push(await setupAuth({ lobbyElement: lobbyDiv }));
    cleanupFunctions.push(await setupUserAccount());
    cleanupFunctions.push(setupMessagingContactsIntegration());
    cleanupFunctions.push(
      setupMessagingAppBusHandlers({ messagingController }),
    );

    addKeyListeners();

    // Stream is now lazily initialized when user starts/joins a call
    // This prevents Bluetooth headphones from entering "call mode" on page load

    // Initialize push notifications (permission requests happen on auth change)
    try {
      const pushController = getPushNotifications();
      const pushInitialized = await pushController.initialize();
      if (!pushInitialized && !pushController.isNotificationSupported()) {
        const { showPushUnsupportedNotification } =
          await import('./features/notifications/index.js');
        showPushUnsupportedNotification();
      }
    } catch (error) {
      console.error('[MAIN] Push notifications initialization error:', error);
    }

    return true;
  } catch (error) {
    console.error('Initialization error:', error, error && error.stack);
    devDebug('Error: Failed to initialize application.');
    return false;
  }
}

// ============================================================================
// YOUTUBE PLAYER INTEGRATION
// ============================================================================

function isSharedVideoVisible() {
  return (
    sharedVideoEl &&
    sharedBoxEl &&
    !sharedBoxEl.classList.contains('hidden') &&
    sharedVideoEl.src &&
    sharedVideoEl.src.trim() !== ''
  );
}

let keyListenersAdded = false;

function addKeyListeners() {
  if (keyListenersAdded) return;

  const isTextInputFocused = () => {
    const activeElement = document.activeElement;
    return (
      activeElement &&
      (activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.isContentEditable)
    );
  };

  // TODO: refactor UI key handling
  document.addEventListener('keydown', (event) => {
    // Press 'W' to toggle player visibility
    if (!isTextInputFocused()) {
      if (event.key === 'w' || event.key === 'W') {
        console.log('=== W KEY PRESSED ===');
        console.log('lastWatched:', getLastWatched());
        console.log('isYTVisible():', isYTVisible());
        console.log('isSharedVideoVisible():', isSharedVideoVisible());
        console.log('isWatchModeActive():', isWatchModeActive());

        if (getLastWatched() === 'yt') {
          if (isYTVisible()) {
            hideYouTubePlayer();
            onWatchModeExited();
          } else {
            showYouTubePlayer();
            onWatchModeEntered();
          }
        } else if (getLastWatched() === 'url' || getLastWatched() === 'file') {
          if (isSharedVideoVisible()) {
            hideElement(sharedBoxEl);
            onWatchModeExited();
          } else {
            showElement(sharedBoxEl);
            onWatchModeEntered();
          }
        }
      }
    }

    // Hide media player when pressing 'Escape', if player is visible
    if (event.key === 'Escape') {
      if (isWatchModeActive()) {
        if (getLastWatched() === 'yt' && isYTVisible()) {
          pauseYouTubeVideo();
          hideYouTubePlayer();
        } else if (getLastWatched() === 'url' && isSharedVideoVisible()) {
          sharedVideoEl.pause();
          hideElement(sharedBoxEl);
        } else if (getLastWatched() === 'file' && isSharedVideoVisible()) {
          sharedVideoEl.pause();
          hideElement(sharedBoxEl);
        }
        onWatchModeExited();
      }
    }
  });

  keyListenersAdded = true;
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================

async function handleCopyLink() {
  const state = CallController.getState();
  if (state.roomLink) {
    const success = await copyToClipboard(state.roomLink);
    if (success) {
      devDebug('Link copied to clipboard!');
      alert(t('status.link_copied'));
    } else {
      devDebug('Failed to copy link to clipboard.');
    }
  }
}

const handleCall = async () => {
  try {
    await initLocalStreamAndMedia();
    const result = await CallController.createCall(getCallOptions());
    applyCallResult(result, true);
  } catch (error) {
    console.error('Failed to start call:', error);
    handleMediaPermissionError(error);
  }
};

if (callBtn) {
  cleanupFunctions.push(setAppAction('startCall', handleCall));
}

// Paste & Join: read clipboard, extract room ID, and join
// if (pasteJoinBtn) {
//   if (navigator.clipboard && navigator.clipboard.readText) {
//     pasteJoinBtn.onclick = async () => {
//       try {
//         const clipboardText = await navigator.clipboard.readText();
//         const roomId = normalizeRoomInput(clipboardText);

//         if (!roomId) {
//           alert(t('error.clipboard.no_link'));
//           return;
//         }

//         await joinOrCreateRoomWithId(roomId);
//       } catch (error) {
//         // Clipboard access denied or other error
//         if (error.name === 'NotAllowedError') {
//           alert(t('error.clipboard.denied'));
//         } else {
//           console.error('Paste & Join failed:', error);
//           alert(t('error.clipboard.failed'));
//         }
//       }
//     };
//   } else {
//     pasteJoinBtn.style.display = 'none';
//     console.warn(
//       'Paste & Join button hidden: Clipboard API not available in this context (requires HTTPS).',
//     );
//   }
// }

if (exitWatchModeBtn) {
  cleanupFunctions.push(setAppAction('exitWatchMode', () => {
    if (getLastWatched() === 'yt') {
      pauseYouTubeVideo();
      hideYouTubePlayer();
    } else if (getLastWatched() === 'url' || getLastWatched() === 'file') {
      sharedVideoEl.pause();

      // Revoke blob URL to free memory (only if it's a blob)
      if (sharedVideoEl.src.startsWith('blob:')) {
        URL.revokeObjectURL(sharedVideoEl.src);
        // sharedVideoEl.removeAttribute('src');
        // sharedVideoEl.load();
      }

      hideElement(sharedBoxEl);
    }
    onWatchModeExited();
  }));
}

// TODO: refactor UI (actions?)
if (hangUpBtn) {
  cleanupFunctions.push(setAppAction('hangUp', async () => {
    console.debug('Hanging up...');

    // Call CallController.hangUp (emits cancellation and performs cleanup)
    // The 'cleanup' event handler will handle all UI updates including contact save prompt
    await CallController.hangUp({ emitCancel: true, reason: 'user_hung_up' });
  }));
}

// ============================================================================
// TEST: JOIN ROOM BUTTON (TEMPORARY - FOR TESTING)
// ============================================================================

function normalizeRoomInput(raw) {
  let room = raw.trim();
  if (!room) return '';
  try {
    const maybeUrl = new URL(room, window.location.origin);
    const q = maybeUrl.searchParams.get('room');
    if (q) return q;
    const hashMatch = maybeUrl.hash.match(/room=([^&]+)/);
    if (hashMatch) return decodeURIComponent(hashMatch[1]);
    return maybeUrl.pathname.replace(/^\//, '') || room;
  } catch (e) {
    return room; // not a full URL
  }
}

async function waitForLocalStream(timeoutMs = 5000) {
  if (hasLocalStream()) return true;
  const start = Date.now();
  return new Promise((resolve) => {
    const check = () => {
      if (hasLocalStream()) return resolve(true);
      if (Date.now() - start > timeoutMs) return resolve(false);
      setTimeout(check, 150);
    };
    check();
  });
}

// ============================================================================
// AUTO-JOIN FROM URL PARAMETER
// ============================================================================

async function autoJoinFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const urlRoomId = urlParams.get('room');

  if (!urlRoomId) return false;

  const success = await joinOrCreateRoomWithId(urlRoomId);

  if (!success) {
    clearUrlParam();
    onCallDisconnected(); // reset UI state
  }

  devDebug('Auto-joined room from URL');
  return success;
}

async function handleServiceWorkerNavigation(path) {
  if (!path) return false;

  let targetUrl;
  try {
    targetUrl = new URL(path, window.location.origin);
  } catch (error) {
    console.warn('[MAIN] Invalid service worker navigation path:', path, error);
    return false;
  }

  const roomId = targetUrl.searchParams.get('room');
  const contactId = targetUrl.searchParams.get('contact');
  const conversationIdFromUrl =
    targetUrl.searchParams.get('conversationId')?.trim() || null;

  window.history.replaceState({}, '', targetUrl);

  console.log('[MAIN] Handling service worker navigation', {
    path,
    roomId,
    contactId,
    conversationIdFromUrl,
  });

  if (!roomId) {
    if (!contactId && !conversationIdFromUrl) {
      return false;
    }

    try {
      let conversationId = conversationIdFromUrl ?? null;

      if (contactId) {
        const contactConversationId = getConversationId(contactId);

        if (contactConversationId) {
          if (
            conversationIdFromUrl &&
            conversationIdFromUrl !== contactConversationId
          ) {
            console.warn(
              '[MAIN] SW navigation -> conversationId mismatch; preferring saved contact conversation',
              {
                contactId,
                conversationIdFromUrl,
                contactConversationId,
              },
            );
          }
          conversationId = contactConversationId;
        }
      }

      if (!conversationId) {
        console.warn(
          '[MAIN] SW navigation -> Cannot open text chat UI because no conversation ID was found for user with id:',
          {
            contactId,
          },
        );
        return false;
      }

      await dispatchCommandAndAwait('cmd:messaging:conversation:select', {
        conversationId,
        remoteParticipantIds: contactId ? [contactId] : [],
        displayUI: true,
      });

      return true;
    } catch (error) {
      console.warn(
        '[MAIN] SW navigation -> Failed to open text chat UI for contact ID:',
        {
          contactId,
          conversationIdFromUrl,
          error,
        },
      );
      return false;
    }
  }

  if (isHandlingServiceWorkerNavigation) {
    console.log('[MAIN] Service worker navigation already in progress', {
      roomId,
    });
    return false;
  }

  isHandlingServiceWorkerNavigation = true;

  try {
    // Settle the pending incoming-call wait so the listener's accept branch
    // runs the same way as the dialog accept path.
    const settledPendingIncomingCall = settleIncomingCallWaitForRoom(
      roomId,
      'notification_click_answer',
    );

    if (settledPendingIncomingCall) {
      return true;
    }

    const success = await joinOrCreateRoomWithId(roomId);

    console.log('[MAIN] Service worker room navigation result', {
      roomId,
      success,
    });

    if (!success) {
      clearUrlParam();
      onCallDisconnected();
    }

    return success;
  } catch (error) {
    console.warn('[MAIN] Service worker room navigation failed:', error, {
      roomId,
    });
    clearUrlParam();
    onCallDisconnected();
    return false;
  } finally {
    isHandlingServiceWorkerNavigation = false;
  }
}

// ============================================================================
// INITIALIZE ON PAGE LOAD
// ============================================================================

// ! TODO: REMOVE autoInitMsgSessionIfNeeded() when proper AppBus implemented
/**
 * Auto-initialize messaging session with first saved contact on app bootstrap.
 * Runs once at startup if no session is already active and user has saved contacts.
 */
export async function autoInitMsgSessionIfNeeded() {
  // Don't override existing active conversation
  if (messagingController.conversations.size > 0) return;

  try {
    const contacts = getAllContactsSorted();
    if (!Array.isArray(contacts) || contacts.length === 0) return;

    const firstContact = contacts[0];
    if (!firstContact?.contactId) return;

    // Pre select the conversation for the first contact
    const conversationId = firstContact.conversationId ?? null;
    if (!conversationId) return;
    await dispatchCommandAndAwait('cmd:messaging:conversation:select', {
      remoteParticipantIds: [firstContact.contactId],
      conversationId,
      displayUI: false,
      contactNickName: firstContact.contactNickName ?? null,
    });
  } catch (error) {
    console.warn(
      '[Contacts] Failed to auto-init messaging conversation:',
      error,
    );
  }
}
// ! END OF TODO

// Handle page leave, beforeunload is cancellable
window.addEventListener('beforeunload', async (e) => {
  // Trigger browser's generic "leave page?" dialog if in active call
  const state = CallController.getState();
  if (state.pc && state.pc.connectionState === 'connected') {
    e.preventDefault();
    e.returnValue = // NOTE: Modern browsers ignore returnValue text
      'You are in an active call. Are you sure you want to leave?';
    return e.returnValue;
  }
});

// Cleanup in pagehide (fires on page unload (after beforeunload) and some?? navigations)
window.addEventListener('pagehide', async () => {
  await cleanup();
});

// CallController business-logic handlers (evt:call:* lifecycle)
setupCallControllerEventWiring({});

// ============================================================================
// CLEANUP
// ============================================================================

async function cleanup() {
  // Call CallController.hangUp for page unload
  await CallController.hangUp({ emitCancel: true, reason: 'page_unload' });

  // Global teardown: safe to remove all listeners on page unload
  cleanupMediaControls();
  removeAllRTDBListeners();
  cleanupApp();

  exitPiP();
  messagesUI.cleanup();

  // Clear URL parameter
  window.history.replaceState({}, document.title, window.location.pathname);
  sharedVideoEl.src = '';

  // Note: Local stream cleanup is now handled by CallController.cleanupCall()
  // Only clean up if CallController hasn't already (e.g., page unload)
  cleanupLocalStream();
  cleanupLocalVideoOnlyStream();
  if (localVideoEl && localVideoEl.srcObject) {
    localVideoEl.srcObject = null;
  }
  if (remoteVideoEl && remoteVideoEl.srcObject) {
    remoteVideoEl.srcObject = null;
  }

  // TODO: refactor UI (teardown)
  onWatchModeExited();
  setLastWatched('none');
  destroyYouTubePlayer();
  clearUrlParam();
  setYouTubeReady(false);

  try {
    for (const cleanupFn of cleanupFunctions) {
      try {
        cleanupFn?.();
      } catch (error) {
        console.warn('[MAIN] Cleanup step failed:', error);
      }
    }
  } finally {
    try {
      appSetupCleanup?.();
    } catch (error) {
      console.warn('[MAIN] appSetupCleanup failed:', error);
    } finally {
      appSetupCleanup = () => {};
    }
  }
}
