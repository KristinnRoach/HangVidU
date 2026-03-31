// main.js

// ============================================================================
// HANGVIDU - P2P VIDEO CHAT WITH WATCH-TOGETHER MODE
// ============================================================================

import { initIcons } from './ui/icons.js';
import './initSentry.js';
import { removeAllRTDBListeners } from './storage/fb-rtdb/rtdb.js';

import { initAuth } from './auth/index.js';
import { subscribe as subscribeAuth } from './auth/auth-state.js';

import { inAppNotificationManager } from './ui/components/notifications/in-app-notification-manager.js';
import { getPushNotifications } from './push-notifications/index.js';

import CallController from './call/call-controller.js';
import { messagingController } from './messaging/messaging-controller.js';
import { contactsService } from './contacts/contacts-service.js';

import {
  localVideoEl,
  remoteVideoEl,
  sharedVideoEl,
  callBtn,
  hangUpBtn,
  exitWatchModeBtn,
  sharedBoxEl,
  lobbyDiv,
  lobbyCallBtn,
  titleAuthBar,
  pasteJoinBtn,
  addContactBtn,
  testNotificationsBtn,
  getElements,
  updateI18nElements,
  appWrapper,
} from './elements.js';

import {
  isWatchModeActive,
  getLastWatched,
  setLastWatched,
} from './firebase/watch-sync.js';

import {
  hasLocalStream,
  cleanupLocalStream,
  cleanupLocalVideoOnlyStream,
} from './media/state.js';

import { devDebug, isDev, setDevDebugEnabled } from './utils/dev/dev-utils.js';

import { getDiagnosticLogger } from './utils/dev/diagnostic-logger.js';

import { cleanupInviteListeners } from './contacts/invitations.js';
import { setupInviteListener } from './contacts/invite-listener.js';

import {
  captureReferral,
  processReferral,
} from './contacts/referral-handler.js';

import { showEnableNotificationsPrompt } from './ui/components/notifications/enable-notifications-prompt.js';

import { clearUrlParam } from './utils/url.js';

// ____ UI RELATED IMPORTS - REFACTOR IN PROGRESS ____
import './ui/core/ui-state.js'; // Initialize UI state (sets body data-view attribute)
import { initUI } from './ui/core/init-ui.js';
import { bindCallUI } from './ui/core/bind-call-ui.js';

import {
  onWatchModeEntered,
  onWatchModeExited,
} from './ui/core/watch-lifecycle-ui.js';

import {
  renderContactsList,
  cleanupContacts,
} from './contacts/components/contacts-list.js';

import {
  destroyYouTubePlayer,
  pauseYouTubeVideo,
  isYTVisible,
  showYouTubePlayer,
  hideYouTubePlayer,
  setYouTubeReady,
} from './media/youtube/youtube-player.js';

import { cleanupMediaControls } from './media/media-controls.js';
import {
  cleanupSearchUI,
  initializeSearchUI,
} from './media/youtube/youtube-search.js';

import { createNotificationsToggle } from './ui/components/notifications/notifications-toggle.js';

import { showElement, hideElement, exitPiP } from './ui/utils/ui-utils.js';
import { initializeAuthUI } from './ui/components/auth/AuthComponent.js';
import { messagesUI } from './ui/components/messages/messages-ui.js';
import { showAddContactModal } from './contacts/components/add-contact-modal.js';
import { copyToClipboard } from './ui/components/modal/copyLinkModal.js';

// ____ UI END ____

import { onCallDisconnected } from './ui/core/call-lifecycle-ui.js';
import { addDebugUpdateButton } from './ui/components/notifications/debug-notifications.js';
import {
  initI18n,
  setLocale,
  getLocale,
  t,
  onLocaleChange,
} from './i18n/index.js';
import { setupMessagingContactsIntegration } from './app/messaging-contacts-integration.js';
import { setupMessagingAppBusHandlers } from './messaging/handle-appbus-events.js';
import { setupCallControllerEventWiring } from './call/call-event-wiring.js';
import { setupMainAppBusListeners } from './app/setupMainAppBusListeners.js';
import {
  getCallOptions,
  applyCallResult,
  joinOrCreateRoomWithId,
} from './call/WIP-start-call-refactor.js';
import {
  initLocalStreamAndMedia,
  handleMediaPermissionError,
} from './media/WIP-init-local-media.js';
import {
  removeAllIncomingListeners,
  startListeningForSavedRooms,
} from './call/room-listeners.js';

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

// ============================================================================
// INITIALIZATION & MEDIA SETUP
// ============================================================================

async function init() {
  initUI();
  initIcons(); // Initialize icons from index.html

  await initI18n();

  // Hydrate i18n attributes in index.html and re-hydrate on locale change
  updateI18nElements();
  onLocaleChange(() => updateI18nElements());

  // Validate critical elements first
  const elements = getElements();
  const criticalElements = [
    'localVideoEl',
    'remoteVideoEl',
    'localBoxEl',
    'remoteBoxEl',
    'chatControls',
    'lobbyDiv',
    'titleAuthBar',
  ];

  const missingCritical = criticalElements.filter((name) => !elements[name]);
  if (missingCritical.length > 0) {
    console.error('Critical elements missing:', missingCritical);
    devDebug('Error: Required UI elements not found.');
    return false;
  }

  try {
    const isPWAEnabled = import.meta.env.VITE_ENABLE_PWA !== '0';
    if (isPWAEnabled) {
      const { setupPWA } = await import('./pwa/PWA.js');
      await setupPWA();
    }

    // Load PWA update testing utility in development
    if (import.meta.env.DEV) {
      import('./pwa/test-update.js').catch(() => {
        // Silently fail if module not available
      });
    }

    initializeSearchUI();
    addKeyListeners();

    // Initialize auth (persistence + redirect + onAuthStateChanged listener)
    await initAuth();
    cleanupFunctions.push(setupMessagingContactsIntegration());
    cleanupFunctions.push(
      setupMessagingAppBusHandlers({ messagingController }),
    );

    const authComponent = initializeAuthUI(titleAuthBar);
    if (authComponent) cleanupFunctions.push(authComponent.dispose);

    // Stream is now lazily initialized when user starts/joins a call
    // This prevents Bluetooth headphones from entering "call mode" on page load

    // Add debug button for testing update notification (dev only)
    showDebugUIForNotifications && addDebugUpdateButton();

    // Initialize notification system for production (PWA updates, etc.)
    const topRightMenu = document.querySelector('.top-right-menu');
    if (topRightMenu) {
      const notificationsToggle = createNotificationsToggle({
        parent: topRightMenu,
        hideWhenAllRead: false,
      });
      inAppNotificationManager.setToggle(notificationsToggle);
    }

    // TODO: integrate into template (and settings menu once implemented) ____
    const toggleLangBtn = document.createElement('button');
    toggleLangBtn.id = 'toggle-lang-btn';
    toggleLangBtn.textContent = `🌐 ${getLocale().toUpperCase()}`;
    toggleLangBtn.style.cssText = `
      position: fixed;
      bottom: 2px;
      left: 2px;

      z-index: 0;
      padding: 8px 12px;
      background: transparent;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
      white-space: nowrap;
      cursor: pointer;
      box-shadow: none; 
    `;
    toggleLangBtn.onclick = async () => {
      const newLocale = getLocale() === 'en' ? 'is' : 'en';
      await setLocale(newLocale);
      toggleLangBtn.textContent = `🌐 ${newLocale.toUpperCase()}`;
    };
    appWrapper && appWrapper.appendChild(toggleLangBtn);
    // END TODO ________________________

    // Initialize push notifications (permission requests happen on auth change)
    try {
      const pushController = getPushNotifications();
      const pushInitialized = await pushController.initialize();
      if (!pushInitialized && !pushController.isNotificationSupported()) {
        const { showPushUnsupportedNotification } =
          await import('./ui/components/notifications/push-unsupported-notification.js');
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

callBtn.onclick = handleCall;
lobbyCallBtn.onclick = handleCall;

// Paste & Join: read clipboard, extract room ID, and join
if (pasteJoinBtn) {
  if (navigator.clipboard && navigator.clipboard.readText) {
    pasteJoinBtn.onclick = async () => {
      try {
        const clipboardText = await navigator.clipboard.readText();
        const roomId = normalizeRoomInput(clipboardText);

        if (!roomId) {
          alert(t('error.clipboard.no_link'));
          return;
        }

        await joinOrCreateRoomWithId(roomId);
      } catch (error) {
        // Clipboard access denied or other error
        if (error.name === 'NotAllowedError') {
          alert(t('error.clipboard.denied'));
        } else {
          console.error('Paste & Join failed:', error);
          alert(t('error.clipboard.failed'));
        }
      }
    };
  } else {
    pasteJoinBtn.style.display = 'none';
    console.warn(
      'Paste & Join button hidden: Clipboard API not available in this context (requires HTTPS).',
    );
  }
}

// Add Contact button
if (addContactBtn) {
  addContactBtn.onclick = async () => {
    await showAddContactModal();
  };
}

// Test Notifications button (development/testing only)
if (isDev() && testNotificationsBtn) {
  showElement(testNotificationsBtn);
  testNotificationsBtn.onclick = async () => {
    try {
      console.log('[TEST] Testing notification permissions...');

      const result = await getPushNotifications()?.requestPermission({
        onGranted: () => {
          console.log('[TEST] Notifications granted!');
          alert('✅ ' + t('status.push_enabled'));
        },
        onDenied: (reason) => {
          console.log('[TEST] Notifications denied:', reason);
          if (reason === 'silent-block') {
            alert('❌ ' + t('error.push.blocked'));
          } else if (reason === 'already-denied') {
            alert('❌ ' + t('error.push.denied_prev'));
          } else {
            alert('❌ ' + t('error.push.denied'));
          }
        },
        onDismissed: () => {
          console.log('[TEST] Notification prompt dismissed');
          alert('⚠️ ' + t('error.push.dismissed'));
        },
      });

      console.log('[TEST] Permission result:', result);

      // If already enabled, show current status
      if (getPushNotifications()?.isNotificationEnabled()) {
        alert('✅ ' + t('status.push_already'));
      }
    } catch (error) {
      console.error('[TEST] Error testing notifications:', error);
      alert('❌ ' + t('error.push.test') + error.message);
    }
  };
}

if (exitWatchModeBtn) {
  // TODO: refactor UI
  exitWatchModeBtn.onclick = () => {
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
  };
}

// TODO: refactor UI (actions?)
hangUpBtn.onclick = async () => {
  console.debug('Hanging up...');

  // Call CallController.hangUp (emits cancellation and performs cleanup)
  // The 'cleanup' event handler will handle all UI updates including contact save prompt
  await CallController.hangUp({ emitCancel: true, reason: 'user_hung_up' });
};

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
      const conversationId =
        conversationIdFromUrl ??
        (contactId ? await contactsService.getConversationId(contactId) : null);

      if (!conversationId) {
        console.warn(
          '[MAIN] SW navigation -> Cannot open text chat UI because no conversation ID was found for user with id:',
          {
            contactId,
          },
        );
        return false;
      }

      await messagingController.selectConversation(conversationId, {
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
    const contacts = await contactsService.getAllContactsSorted();
    if (!Array.isArray(contacts) || contacts.length === 0) return;

    const firstContact = contacts[0];
    if (!firstContact?.contactId) return;

    // Pre select the conversation for the first contact
    const conversationId = firstContact.conversationId ?? null;
    if (!conversationId) return;
    await messagingController.selectConversation(conversationId, {
      remoteParticipantIds: [firstContact.contactId],
      displayUI: false,
    });
  } catch (error) {
    console.warn(
      '[Contacts] Failed to auto-init messaging conversation:',
      error,
    );
  }
}
// ! END OF TODO

window.onload = async () => {
  // Capture referral link BEFORE auth (stores referrer ID in localStorage)
  await captureReferral();

  const initSuccess = await init();

  if (!initSuccess) {
    if (callBtn) {
      callBtn.disabled = true;
      callBtn.title = t('error.init.button_title');
    }
    console.error(
      'Initialization failed. Call functionality disabled. Please reload the page.',
    );
    alert(t('error.init.alert'));
    return;
  }

  // UI handlers (business logic handlers registered separately below)
  bindCallUI(CallController);

  setupMainAppBusListeners();

  // Start listening for incoming calls on any saved/recent room ids FIRST
  await startListeningForSavedRooms().catch((e) =>
    console.warn('Failed to start saved-room listeners', e),
  );

  // Then render saved contacts list in lobby (now listeners are ready)
  await renderContactsList(lobbyDiv).catch((e) => {
    console.warn('Failed to render contacts list:', e);
  });

  // Auto-open first contact session if user has saved contacts
  await autoInitMsgSessionIfNeeded().catch((e) => {
    console.warn('Failed to auto-init messaging session:', e);
  });

  // TODO: Replace this monolithic auth callback with per-module appBus subscribers
  // reacting to auth:login / auth:logout events. Each module (contacts, call listeners,
  // invites, push notifications) should own its own auth-change response.
  let previousAuthState = null;
  const unsubscribeAuthContacts = subscribeAuth(async ({ isLoggedIn }) => {
    try {
      const isInitialLoad = previousAuthState === null;
      const isActualLogout = previousAuthState === true && !isLoggedIn;
      const isLoginOrInitialLogin =
        (previousAuthState === false && isLoggedIn) ||
        (isInitialLoad && isLoggedIn);

      previousAuthState = isLoggedIn;

      await renderContactsList(lobbyDiv);

      if (isActualLogout) {
        devDebug('[AUTH] User logged out - cleaning up listeners');
        removeAllIncomingListeners();
        cleanupInviteListeners();
      } else if (isLoginOrInitialLogin) {
        devDebug('[AUTH] User logged in - setting up listeners');

        await processReferral().catch((e) =>
          console.warn('[REFERRAL] Failed to process referral:', e),
        );
        await renderContactsList(lobbyDiv).catch(() => {});

        // Re-attach on actual login; already attached on initial load
        if (!isInitialLoad) {
          await startListeningForSavedRooms().catch((e) =>
            console.warn('Failed to re-attach saved-room listeners', e),
          );
        }

        setupInviteListener(lobbyDiv);

        // Enable push notifications if already granted (no prompt without user gesture)
        const pushController = getPushNotifications();
        if (pushController) {
          const notifResult = await pushController
            .ensureEnabledIfGranted()
            .catch((e) => {
              console.warn('[AUTH] Push notification setup failed:', e);
              return { state: 'error' };
            });
          if (notifResult.state === 'prompt-needed') {
            showEnableNotificationsPrompt();
          }
        }
      }
    } catch (e) {
      console.warn('Failed to handle auth change:', e);
    }
  });
  cleanupFunctions.push(() => {
    try {
      if (typeof unsubscribeAuthContacts === 'function')
        unsubscribeAuthContacts();
    } catch (_) {}
  });

  if ('serviceWorker' in navigator) {
    const handleServiceWorkerMessage = (event) => {
      const { type, path } = event.data || {};

      if (type !== 'NAVIGATE') return;

      console.log('[MAIN] Received service worker NAVIGATE message', {
        path,
      });

      handleServiceWorkerNavigation(path).catch((error) => {
        console.warn('[MAIN] Failed to handle service worker NAVIGATE:', error);
      });
    };

    navigator.serviceWorker.addEventListener(
      'message',
      handleServiceWorkerMessage,
    );
    cleanupFunctions.push(() => {
      navigator.serviceWorker.removeEventListener(
        'message',
        handleServiceWorkerMessage,
      );
    });
  }

  // Auto-join if room parameter exists
  const autoJoinedSuccessfully = await autoJoinFromUrl();
  if (autoJoinedSuccessfully) return;

  devDebug('Ready. Click "Start New Chat" to begin.');
};

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

// CallController business-logic handlers (memberJoined, memberLeft, cleanup)
setupCallControllerEventWiring({ lobbyElement: lobbyDiv });

// ============================================================================
// CLEANUP
// ============================================================================

async function cleanup() {
  // Call CallController.hangUp for page unload
  await CallController.hangUp({ emitCancel: true, reason: 'page_unload' });

  // Global teardown: safe to remove all listeners on page unload
  cleanupMediaControls();
  removeAllRTDBListeners();
  cleanupContacts();

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
  cleanupSearchUI();

  clearUrlParam();
  setYouTubeReady(false);

  cleanupFunctions.forEach((cleanupFn) => cleanupFn());
}
