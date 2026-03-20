import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const callSequence = [];
  let memberJoinedHandler = null;
  const pushController = {
    initialize: vi.fn().mockResolvedValue(true),
    isNotificationSupported: vi.fn().mockReturnValue(true),
    isNotificationEnabled: vi.fn().mockReturnValue(true),
    shouldSendNotification: vi.fn().mockReturnValue(false),
    ensureEnabledIfGranted: vi.fn().mockResolvedValue({ state: 'enabled' }),
    disable: vi.fn().mockResolvedValue(true),
    requestPermission: vi.fn(),
    dismissCallNotifications: vi.fn(),
    sendMissedCall: vi.fn(),
    sendIncomingCall: vi.fn(async ({ targetUserId, ...callData }) => {
      callSequence.push('sendIncomingCall');
      return {
        ok: true,
        status: 200,
        body: { success: true },
        targetUserId,
        roomId: callData.roomId,
      };
    }),
  };

  const callController = {
    createCall: vi.fn(async () => {
      callSequence.push('createCall');
      return {
        success: true,
        roomId: 'saved-room-123',
        roomLink: 'https://hangvidu.app/?room=saved-room-123',
        role: 'initiator',
      };
    }),
    answerCall: vi.fn(),
    getPeerConnection: vi.fn(() => null),
    getState: vi.fn(() => ({
      roomId: null,
      partnerId: null,
      role: null,
      state: 'idle',
    })),
    hangUp: vi.fn(),
    cleanupCall: vi.fn(),
    on: vi.fn(),
    off: vi.fn(),
  };

  const contactsController = {
    updateLastInteraction: vi.fn(() => {
      callSequence.push('updateLastInteraction');
      return Promise.resolve();
    }),
    getContactByRoomId: vi.fn(),
    resolveCallerName: vi.fn().mockResolvedValue('Resolved Caller'),
    getContactsSorted: vi.fn().mockResolvedValue([]),
    getContacts: vi.fn().mockResolvedValue({}),
    saveContact: vi.fn(),
    emit: vi.fn(),
    on: vi.fn(),
  };

  const logger = {
    disable: vi.fn(),
    logRoomCreation: vi.fn(),
    logListenerAttachment: vi.fn(),
    logMemberJoinEvent: vi.fn(),
    logIncomingCallEvent: vi.fn(),
    logNotificationDecision: vi.fn(),
    log: vi.fn(),
    clearLogs: vi.fn(),
    getLogs: vi.fn(() => []),
  };

  return {
    callSequence,
    get memberJoinedHandler() {
      return memberJoinedHandler;
    },
    set memberJoinedHandler(handler) {
      memberJoinedHandler = handler;
    },
    pushController,
    callController,
    contactsController,
    logger,
  };
});

vi.mock('../../src/ui/icons.js', () => ({
  initIcons: vi.fn(),
}));

vi.mock('../../src/initSentry.js', () => ({}));

vi.mock('firebase/database', () => ({
  set: vi.fn(),
  get: vi.fn(),
  remove: vi.fn(),
}));

vi.mock('../../src/storage/fb-rtdb/rtdb.js', () => ({
  removeAllRTDBListeners: vi.fn(),
  removeRTDBListenersForRoom: vi.fn(),
  getUserRecentCallsRef: vi.fn(),
  getUserRecentCallRef: vi.fn(),
}));

vi.mock('../../src/auth/index.js', () => ({
  initAuth: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('../../src/auth/auth-state.js', () => ({
  getLoggedInUserId: vi.fn(() => 'user-123'),
  getUserId: vi.fn(() => 'user-123'),
  getUser: vi.fn(() => ({
    uid: 'user-123',
    displayName: 'Caller Example',
    email: 'caller@example.com',
  })),
  subscribe: vi.fn(() => () => {}),
}));

vi.mock('../../src/ui/components/notifications/in-app-notification-manager.js', () => ({
  inAppNotificationManager: {
    setToggle: vi.fn(),
    add: vi.fn(),
    remove: vi.fn(),
    has: vi.fn(() => false),
    notifications: new Map(),
  },
}));

vi.mock('../../src/push-notifications/index.js', () => ({
  getPushNotifications: vi.fn(() => mocks.pushController),
  pushNotifications: mocks.pushController,
}));

vi.mock('../../src/webrtc/call-controller.js', () => ({
  default: mocks.callController,
}));

vi.mock('../../src/messaging/messaging-controller.js', () => ({
  messagingController: {
    resolveConversationIdFromContactId: vi.fn(),
    sendEventMessage: vi.fn(),
    closeAllSessions: vi.fn(),
  },
}));

vi.mock('../../src/contacts/contacts-controller.js', () => ({
  contactsController: mocks.contactsController,
}));

vi.mock('../../src/bootstrap/ui-to-controller-bridges.js', () => ({
  teardownUiToControllerBridges: vi.fn(),
}));

vi.mock('../../src/elements.js', () => {
  const localVideoEl = document.createElement('video');
  const remoteVideoEl = document.createElement('video');
  const sharedVideoEl = document.createElement('video');
  const lobbyDiv = document.createElement('div');
  const titleAuthBar = document.createElement('div');
  const appWrapper = document.createElement('div');

  return {
    localVideoEl,
    remoteVideoEl,
    sharedVideoEl,
    callBtn: document.createElement('button'),
    hangUpBtn: document.createElement('button'),
    mutePartnerBtn: document.createElement('button'),
    fullscreenPartnerBtn: document.createElement('button'),
    remotePipBtn: document.createElement('button'),
    micBtn: document.createElement('button'),
    cameraBtn: document.createElement('button'),
    switchCameraBtn: document.createElement('button'),
    exitWatchModeBtn: document.createElement('button'),
    chatControls: document.createElement('div'),
    localBoxEl: document.createElement('div'),
    remoteBoxEl: document.createElement('div'),
    sharedBoxEl: document.createElement('div'),
    lobbyDiv,
    lobbyCallBtn: document.createElement('button'),
    titleAuthBar,
    pasteJoinBtn: document.createElement('button'),
    addContactBtn: document.createElement('button'),
    testNotificationsBtn: document.createElement('button'),
    getElements: vi.fn(() => ({
      localVideoEl,
      remoteVideoEl,
      localBoxEl: document.createElement('div'),
      remoteBoxEl: document.createElement('div'),
      chatControls: document.createElement('div'),
      lobbyDiv,
      titleAuthBar,
    })),
    updateI18nElements: vi.fn(),
    appWrapper,
  };
});

vi.mock('../../src/firebase/watch-sync.js', () => ({
  setupWatchSync: vi.fn(),
  isWatchModeActive: vi.fn(() => false),
  getLastWatched: vi.fn(),
  setLastWatched: vi.fn(),
}));

vi.mock('../../src/media/stream.js', () => ({
  setUpLocalStream: vi.fn().mockResolvedValue(undefined),
  setupRemoteStream: vi.fn(() => true),
}));

vi.mock('../../src/media/state.js', () => ({
  hasLocalStream: vi.fn(() => true),
  getLocalStream: vi.fn(() => ({ id: 'local-stream' })),
  setLocalStream: vi.fn(),
  cleanupLocalStream: vi.fn(),
  cleanupRemoteStream: vi.fn(),
  cleanupLocalVideoOnlyStream: vi.fn(),
}));

vi.mock('../../src/utils/dev/dev-utils.js', () => ({
  devDebug: vi.fn(),
  isDev: vi.fn(() => false),
  setDevDebugEnabled: vi.fn(),
}));

vi.mock('../../src/room.js', () => ({
  default: {
    checkRoomStatus: vi.fn(),
    getRoomData: vi.fn(),
    cancelCall: vi.fn(),
    leaveRoom: vi.fn(),
    onMemberJoined: vi.fn((_roomId, callback) => {
      mocks.memberJoinedHandler = callback;
      return () => {};
    }),
    onCallCancelled: vi.fn(() => () => {}),
    onAnswerAdded: vi.fn(() => () => {}),
    onMemberLeft: vi.fn(() => () => {}),
    rejectCall: vi.fn(),
  },
}));

vi.mock('../../src/utils/dev/diagnostic-logger.js', () => ({
  getDiagnosticLogger: vi.fn(() => mocks.logger),
}));

vi.mock('../../src/contacts/invitations.js', () => ({
  listenForInvites: vi.fn(),
  listenForAcceptedInvites: vi.fn(),
  acceptInvite: vi.fn(),
  declineInvite: vi.fn(),
  cleanupInviteListeners: vi.fn(),
}));

vi.mock('../../src/contacts/referral-handler.js', () => ({
  captureReferral: vi.fn(),
  processReferral: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('../../src/ui/components/notifications/enable-notifications-prompt.js', () => ({
  showEnableNotificationsPrompt: vi.fn(),
}));

vi.mock('../../src/utils/url.js', () => ({
  clearUrlParam: vi.fn(),
}));

vi.mock('../../src/media/audio/ringtone-manager.js', () => ({
  ringtoneManager: {
    playIncoming: vi.fn(),
    startIncoming: vi.fn(),
    stopIncoming: vi.fn(),
    stop: vi.fn(),
  },
}));

vi.mock('../../src/utils/room-id.js', () => ({
  getDeterministicRoomId: vi.fn(() => 'deterministic-room'),
}));

vi.mock('../../src/ui/core/ui-state.js', () => ({}));

vi.mock('../../src/ui/core/init-ui.js', () => ({
  initUI: vi.fn(),
}));

vi.mock('../../src/ui/core/bind-call-ui.js', () => ({
  bindCallUI: vi.fn(),
}));

vi.mock('../../src/ui/core/watch-lifecycle-ui.js', () => ({
  onWatchModeEntered: vi.fn(),
  onWatchModeExited: vi.fn(),
}));

vi.mock('../../src/ui/components/contacts/contacts.js', () => ({
  renderContactsList: vi.fn(),
  cleanupContacts: vi.fn(),
  showSaveContactPrompt: vi.fn(),
  autoInitMsgSessionIfNeeded: vi.fn(),
}));

vi.mock('../../src/media/youtube/youtube-player.js', () => ({
  destroyYouTubePlayer: vi.fn(),
  pauseYouTubeVideo: vi.fn(),
  isYTVisible: vi.fn(() => false),
  showYouTubePlayer: vi.fn(),
  hideYouTubePlayer: vi.fn(),
  setYouTubeReady: vi.fn(),
}));

vi.mock('../../src/media/media-controls.js', () => ({
  initializeMediaControls: vi.fn(),
  cleanupMediaControls: vi.fn(),
}));

vi.mock('../../src/media/youtube/youtube-search.js', () => ({
  cleanupSearchUI: vi.fn(),
  initializeSearchUI: vi.fn(),
}));

vi.mock('../../src/ui/components/notifications/notifications-toggle.js', () => ({
  createNotificationsToggle: vi.fn(),
}));

vi.mock('../../src/ui/utils/toast.js', () => ({
  showSuccessToast: vi.fn(),
  showErrorToast: vi.fn(),
}));

vi.mock('../../src/ui/components/notifications/invite-notification.js', () => ({
  createInviteNotification: vi.fn(),
}));

vi.mock('../../src/ui/utils/ui-utils.js', () => ({
  showElement: vi.fn(),
  hideElement: vi.fn(),
  exitPiP: vi.fn(),
}));

vi.mock('../../src/ui/components/auth/AuthComponent.js', () => ({
  initializeAuthUI: vi.fn(),
}));

vi.mock('../../src/ui/components/messages/messages-ui.js', () => ({
  messagesUI: {
    reset: vi.fn(),
  },
}));

vi.mock('../../src/ui/components/calling/incoming-call.js', () => ({
  showIncomingCallUI: vi.fn(),
  resolveIncomingCallUI: vi.fn(),
  dismissActiveIncomingCallUI: vi.fn(),
}));

vi.mock('../../src/ui/components/contacts/add-contact-modal.js', () => ({
  showAddContactModal: vi.fn(),
}));

vi.mock('../../src/ui/utils/call-indicators.js', () => ({
  callIndicators: {
    startIncoming: vi.fn(),
    stopIncoming: vi.fn(),
    startCallIndicators: vi.fn(),
    stopCallIndicators: vi.fn(),
  },
}));

vi.mock('../../src/ui/components/modal/copyLinkModal.js', () => ({
  copyToClipboard: vi.fn(),
  showCopyLinkModal: vi.fn(),
}));

vi.mock('../../src/ui/components/calling/calling-ui.js', () => ({
  showCallingUI: vi.fn(async () => {
    mocks.callSequence.push('showCallingUI');
  }),
  onCallAnswered: vi.fn(),
  isRoomCallFresh: vi.fn(() => true),
}));

vi.mock('../../src/ui/core/legacy/watch-mode.js', () => ({
  isRemoteVideoVideoActive: vi.fn(() => false),
}));

vi.mock('../../src/ui/core/call-lifecycle-ui.js', () => ({
  onCallConnected: vi.fn(),
  onCallDisconnected: vi.fn(),
  onCallingStarted: vi.fn(() => {
    mocks.callSequence.push('onCallingStarted');
  }),
  onCallingEnded: vi.fn(),
}));

vi.mock('../../src/i18n/index.js', () => ({
  initI18n: vi.fn().mockResolvedValue(undefined),
  setLocale: vi.fn().mockResolvedValue(undefined),
  getLocale: vi.fn(() => 'en'),
  t: vi.fn((key) => key),
  onLocaleChange: vi.fn(() => () => {}),
}));

vi.mock('../../src/ui/components/notifications/debug-notifications.js', () => ({
  addDebugUpdateButton: vi.fn(),
}));

import RoomService from '../../src/room.js';
import { showIncomingCallUI } from '../../src/ui/components/calling/incoming-call.js';
import { ringtoneManager } from '../../src/media/audio/ringtone-manager.js';
import { callIndicators } from '../../src/ui/utils/call-indicators.js';

describe('callContact push notification flow', () => {
  let consoleLogSpy;
  let consoleWarnSpy;

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    mocks.callSequence.length = 0;
    mocks.memberJoinedHandler = null;
    mocks.pushController.shouldSendNotification.mockReturnValue(false);
    mocks.pushController.isNotificationEnabled.mockReturnValue(true);
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  it('attempts the push immediately after successful call start', async () => {
    const { callContact } = await import('../../src/main.js');

    const result = await callContact(
      'contact-456',
      'Saved Contact',
      'saved-room-123',
    );

    expect(result).toBe(true);
    expect(mocks.callController.createCall).toHaveBeenCalledWith(
      expect.objectContaining({
        targetRoomId: 'saved-room-123',
      }),
    );
    expect(mocks.pushController.sendIncomingCall).toHaveBeenCalledWith({
      targetUserId: 'contact-456',
      roomId: 'saved-room-123',
      callerId: 'user-123',
      callerName: 'Caller Example',
    });
    expect(mocks.callSequence.indexOf('sendIncomingCall')).toBeGreaterThan(-1);
    expect(mocks.callSequence.indexOf('showCallingUI')).toBeGreaterThan(-1);
    expect(
      mocks.callSequence.indexOf('sendIncomingCall'),
    ).toBeLessThan(mocks.callSequence.indexOf('showCallingUI'));
    expect(consoleLogSpy).toHaveBeenCalledWith(
      '[CALL] Reached call-start push notification send',
      {
        contactId: 'contact-456',
        roomId: 'saved-room-123',
      },
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      '[CALL] Call-start push notification result',
      {
        contactId: 'contact-456',
        roomId: 'saved-room-123',
        pushResult: {
          ok: true,
          status: 200,
          body: { success: true },
          targetUserId: 'contact-456',
          roomId: 'saved-room-123',
        },
      },
    );
    expect(consoleWarnSpy).not.toHaveBeenCalledWith(
      '[CALL] Call-start push notification did not succeed',
      expect.anything(),
    );
  });

  it('skips RTDB incoming-call UI when push notifications should handle a background call', async () => {
    mocks.pushController.shouldSendNotification.mockReturnValue(true);
    RoomService.getRoomData.mockResolvedValue({
      offer: { type: 'offer' },
      answer: null,
      createdBy: 'caller-999',
    });

    const { listenForIncomingOnRoom } = await import('../../src/main.js');

    listenForIncomingOnRoom('room-background');

    await mocks.memberJoinedHandler({
      key: 'caller-999',
      val: () => ({
        joinedAt: Date.now(),
      }),
    });

    expect(showIncomingCallUI).not.toHaveBeenCalled();
    expect(ringtoneManager.playIncoming).not.toHaveBeenCalled();
    expect(callIndicators.startCallIndicators).not.toHaveBeenCalled();
    expect(mocks.contactsController.resolveCallerName).not.toHaveBeenCalled();
    expect(mocks.logger.logNotificationDecision).toHaveBeenCalledWith(
      'DEFER',
      'background_push_only',
      'room-background',
      expect.objectContaining({
        joiningUserId: 'caller-999',
        pushNotificationsEnabled: true,
      }),
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      '[CALL] Background incoming call detected, using push-only notification path',
      {
        roomId: 'room-background',
        joiningUserId: 'caller-999',
      },
    );
  });
});
