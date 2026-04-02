import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const callSequence = [];
  let memberJoinedHandler = null;
  let memberLeftHandler = null;
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

  const contactsService = {
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
    get memberLeftHandler() {
      return memberLeftHandler;
    },
    set memberLeftHandler(handler) {
      memberLeftHandler = handler;
    },
    pushController,
    callController,
    contactsService,
    logger,
    firebase: {
      remove: vi.fn(),
    },
    getUserRecentCallRef: vi.fn((_userId, roomId) => ({ roomId })),
  };
});

vi.mock('../../src/ui/icons.js', () => ({
  initIcons: vi.fn(),
}));

vi.mock('../../src/initSentry.js', () => ({}));

vi.mock('firebase/database', () => ({
  set: vi.fn(),
  get: vi.fn(),
  remove: mocks.firebase.remove,
  ref: vi.fn(),
}));

vi.mock('../../src/storage/fb-rtdb/rtdb.js', () => ({
  removeAllRTDBListeners: vi.fn(),
  removeRTDBListenersForRoom: vi.fn(),
  getUserRecentCallsRef: vi.fn(),
  getUserRecentCallRef: mocks.getUserRecentCallRef,
  getUserOutgoingCallRef: vi.fn(() => ({})),
  rtdb: {},
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

vi.mock('../../src/notifications/index.js', () => ({
  inAppNotificationManager: {
    setToggle: vi.fn(),
    add: vi.fn(),
    remove: vi.fn(),
    has: vi.fn(() => false),
    notifications: new Map(),
    isListVisible: vi.fn(() => false),
    hideList: vi.fn(),
  },
  showEnableNotificationsPrompt: vi.fn(),
  createNotificationsToggle: vi.fn(),
  addDebugUpdateButton: vi.fn(),
  showPushUnsupportedNotification: vi.fn(),
  showUpdateNotification: vi.fn(),
  createInviteNotification: vi.fn(),
  createMissedCallNotification: vi.fn(),
  createReferralNotification: vi.fn(),
  buildTemplate: vi.fn(),
  createNotification: vi.fn(),
}));

vi.mock('../../src/push-notifications/index.js', () => ({
  getPushNotifications: vi.fn(() => mocks.pushController),
  pushNotifications: mocks.pushController,
}));

vi.mock('../../src/call/call-controller.js', () => ({
  default: mocks.callController,
}));

vi.mock('../../src/messaging/messaging-controller.js', () => ({
  messagingController: {
    resolveConversationIdFromContactId: vi.fn(),
    sendEventMessage: vi.fn(),
    closeAllSessions: vi.fn(),
  },
}));

vi.mock('../../src/contacts/contacts-service.js', () => ({
  ContactsService: class ContactsService {},
  contactsService: mocks.contactsService,
}));

vi.mock('../../src/contacts/index.js', () => ({
  contactsService: mocks.contactsService,
  cleanupInviteListeners: vi.fn(),
  setupInviteListener: vi.fn(),
  captureReferral: vi.fn(),
  processReferral: vi.fn().mockResolvedValue(undefined),
  renderContactsList: vi.fn(),
  cleanupContacts: vi.fn(),
  showSaveContactPrompt: vi.fn(),
  showAddContactModal: vi.fn(),
  setupContactsAppBusBridge: vi.fn(),
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

vi.mock('../../src/utils/dev/dev-utils.js', async () => {
  const actual = await vi.importActual('../../src/utils/dev/dev-utils.js');
  return {
    ...actual,
    devDebug: vi.fn(),
    isDev: vi.fn(() => false),
    setDevDebugEnabled: vi.fn(),
  };
});

vi.mock('../../src/call/room.js', () => ({
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
    onMemberLeft: vi.fn((_roomId, callback) => {
      mocks.memberLeftHandler = callback;
      return () => {};
    }),
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

// enable-notifications-prompt is covered by the ../../src/notifications/index.js barrel mock

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

vi.mock('../../src/contacts/components/contacts-list.js', () => ({
  renderContactsList: vi.fn(),
  cleanupContacts: vi.fn(),
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

// notifications-toggle is covered by the ../../src/notifications/index.js barrel mock

vi.mock('../../src/components/toast.js', () => ({
  showSuccessToast: vi.fn(),
  showErrorToast: vi.fn(),
}));

// invite-notification is covered by the ../../src/notifications/index.js barrel mock

vi.mock('../../src/ui/utils/ui-utils.js', () => ({
  showElement: vi.fn(),
  hideElement: vi.fn(),
  exitPiP: vi.fn(),
}));

vi.mock('../../src/auth/index.js', () => ({
  signInWithAccountSelection: vi.fn(),
  signOutUser: vi.fn(),
  deleteAccount: vi.fn(),
  isSafariExternalOpenArmed: vi.fn(),
  setSafariExternalOpenArmed: vi.fn(),
  requestContactsAccess: vi.fn(),
  requestGmailSendAccess: vi.fn(),
  clearGISTokenCache: vi.fn(),
  getAuthState: vi.fn(),
  getIsLoggedIn: vi.fn(() => true),
  getUser: vi.fn(() => ({
    uid: 'user-123',
    displayName: 'Caller Example',
    email: 'caller@example.com',
  })),
  getUserId: vi.fn(() => 'user-123'),
  getLoggedInUserId: vi.fn(() => 'user-123'),
  getUserName: vi.fn(),
  subscribe: vi.fn(() => () => {}),
  setState: vi.fn(),
  waitForAuthReady: vi.fn(),
  initializeAuthUI: vi.fn(),
  auth: vi.fn(),
  initAuth: vi.fn().mockResolvedValue(undefined),
  getCurrentUserAsync: vi.fn(),
  getLoggedInUserToken: vi.fn(),
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

vi.mock('../../src/contacts/components/add-contact-modal.js', () => ({
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
  // isRoomCallFresh: vi.fn(() => true),
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

// debug-notifications is covered by the ../../src/notifications/index.js barrel mock

import RoomService from '../../src/call/room.js';
import { showIncomingCallUI } from '../../src/ui/components/calling/incoming-call.js';
import { ringtoneManager } from '../../src/media/audio/ringtone-manager.js';
import { callIndicators } from '../../src/ui/utils/call-indicators.js';

describe('callContact push notification flow', () => {
  let consoleWarnSpy;

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    mocks.callSequence.length = 0;
    mocks.memberJoinedHandler = null;
    mocks.memberLeftHandler = null;
    mocks.pushController.dismissCallNotifications.mockResolvedValue(undefined);
    mocks.pushController.shouldSendNotification.mockReturnValue(false);
    mocks.pushController.isNotificationEnabled.mockReturnValue(true);
    mocks.firebase.remove.mockReset();
    mocks.getUserRecentCallRef.mockClear();
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
  });

  it('renders the calling UI before attempting the push notification', async () => {
    await import('../../src/main.js');
    const { callContact } =
      await import('../../src/call/WIP-start-call-refactor.js');

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
    expect(mocks.callSequence.indexOf('showCallingUI')).toBeLessThan(
      mocks.callSequence.indexOf('sendIncomingCall'),
    );
    expect(consoleWarnSpy).not.toHaveBeenCalledWith(
      '[CALL] Call-start push notification did not succeed',
    );
  });

  it('does not create a new outbound call when the incoming answer target room is gone', async () => {
    const { joinOrCreateRoomWithId } =
      await import('../../src/call/WIP-start-call-refactor.js');

    RoomService.checkRoomStatus.mockResolvedValue({
      exists: false,
      hasMembers: false,
      memberCount: 0,
    });

    const result = await joinOrCreateRoomWithId('stale-incoming-room');

    expect(result).toBe(false);
    expect(mocks.callController.createCall).not.toHaveBeenCalled();
    expect(mocks.callController.answerCall).not.toHaveBeenCalled();
  });

  it('skips RTDB incoming-call UI when push notifications should handle a background call', async () => {
    mocks.pushController.shouldSendNotification.mockReturnValue(true);
    RoomService.getRoomData.mockResolvedValue({
      offer: { type: 'offer' },
      answer: null,
      createdBy: 'caller-999',
    });

    const { listenForIncomingOnRoom } =
      await import('../../src/call/room-listeners.js');

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
    expect(mocks.contactsService.resolveCallerName).not.toHaveBeenCalled();
    expect(mocks.logger.logNotificationDecision).toHaveBeenCalledWith(
      'DEFER',
      'background_push_only',
      'room-background',
      expect.objectContaining({
        joiningUserId: 'caller-999',
        pushNotificationsEnabled: true,
      }),
    );
  });

  it('settles a pending incoming-call wait when listeners are removed', async () => {
    mocks.contactsService.getContactByRoomId.mockResolvedValue({
      contactId: 'caller-999',
      contactName: 'Resolved Caller',
    });
    RoomService.getRoomData.mockResolvedValue({
      offer: { type: 'offer' },
      answer: null,
      createdBy: 'caller-999',
    });

    const { listenForIncomingOnRoom, removeIncomingListenersForRoom } =
      await import('../../src/call/room-listeners.js');

    listenForIncomingOnRoom('room-pending');

    const pendingIncomingCall = mocks.memberJoinedHandler({
      key: 'caller-999',
      val: () => ({
        joinedAt: Date.now(),
      }),
    });

    await vi.waitFor(() => {
      expect(showIncomingCallUI).toHaveBeenCalled();
    });

    removeIncomingListenersForRoom('room-pending');
    await pendingIncomingCall;

    expect(ringtoneManager.stop).toHaveBeenCalled();
    expect(callIndicators.stopCallIndicators).toHaveBeenCalled();
  });

  it('removes the saved recent-call record when a room becomes empty', async () => {
    mocks.contactsService.getContactByRoomId.mockResolvedValue(null);
    RoomService.checkRoomStatus.mockResolvedValue({
      exists: true,
      hasMembers: false,
      memberCount: 0,
    });

    const { listenForIncomingOnRoom } =
      await import('../../src/call/room-listeners.js');

    listenForIncomingOnRoom('room-empty');

    await mocks.memberLeftHandler?.({
      key: 'other-user',
    });

    expect(mocks.getUserRecentCallRef).toHaveBeenCalledWith(
      'user-123',
      'room-empty',
    );
    expect(mocks.firebase.remove).toHaveBeenCalledWith({
      roomId: 'room-empty',
    });
  });
});
