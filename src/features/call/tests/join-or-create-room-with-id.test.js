import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  initLocalStreamAndMedia: vi.fn(() => Promise.resolve()),
  handleMediaPermissionError: vi.fn(),
  createCall: vi.fn(),
  answerCall: vi.fn(),
  checkRoomStatus: vi.fn(),
  devDebug: vi.fn(),
  diagnosticLogger: {
    log: vi.fn(),
    logRoomCreation: vi.fn(),
  },
  getElements: vi.fn(() => ({
    localVideoEl: {},
    remoteVideoEl: {},
    mutePartnerBtn: {},
  })),
  getLocalStream: vi.fn(() => ({})),
  setupRemoteStream: vi.fn(),
  setupWatchSync: vi.fn(),
  showCopyLinkModal: vi.fn(),
}));

vi.mock('../../../../src/auth/index.js', () => ({
  getUser: vi.fn(() => null),
  getUserId: vi.fn(() => 'local-user'),
}));

vi.mock('../../push-notifications/index.js', () => ({
  getPushNotifications: vi.fn(() => null),
}));

vi.mock('../call-controller.js', () => ({
  default: {
    createCall: mocks.createCall,
    answerCall: mocks.answerCall,
    hangUp: vi.fn(() => Promise.resolve()),
  },
}));

vi.mock('../../contacts/index.js', () => ({
  contactsService: {
    updateLastInteraction: vi.fn(() => Promise.resolve()),
  },
}));

vi.mock('../room.js', () => ({
  default: {
    checkRoomStatus: mocks.checkRoomStatus,
  },
}));

vi.mock('../../../shared/utils/dev/diagnostic-logger.js', () => ({
  getDiagnosticLogger: () => mocks.diagnosticLogger,
}));

vi.mock('../../../shared/utils/room-id.js', () => ({
  getDeterministicRoomId: vi.fn(() => 'deterministic-room'),
}));

vi.mock('../../../elements.js', () => ({
  getElements: mocks.getElements,
}));

vi.mock('../../../shared/media/state.js', () => ({
  getLocalStream: mocks.getLocalStream,
}));

vi.mock('../../../shared/media/stream.js', () => ({
  setupRemoteStream: mocks.setupRemoteStream,
}));

vi.mock('../../watch/watch-sync.js', () => ({
  setupWatchSync: mocks.setupWatchSync,
}));

vi.mock('../../../shared/components/modal/copyLinkModal.js', () => ({
  showCopyLinkModal: mocks.showCopyLinkModal,
}));

vi.mock('../../../shared/utils/dev/dev-utils.js', () => ({
  devDebug: mocks.devDebug,
}));

vi.mock('../room-listeners.js', () => ({
  listenForIncomingOnRoom: vi.fn(),
}));

vi.mock('../outgoing-call-session.js', () => ({
  showOutgoingCallUI: vi.fn(() => Promise.resolve()),
}));

vi.mock('../../../shared/components/ui/core/call-lifecycle-ui.js', () => ({
  onCallingStarted: vi.fn(),
  onCallingEnded: vi.fn(),
}));

vi.mock('../../../shared/media/WIP-init-local-media.js', () => ({
  initLocalStreamAndMedia: mocks.initLocalStreamAndMedia,
  handleMediaPermissionError: mocks.handleMediaPermissionError,
}));

describe('joinOrCreateRoomWithId', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.checkRoomStatus.mockResolvedValue({
      exists: false,
      hasMembers: false,
      memberCount: 0,
    });
    mocks.createCall.mockResolvedValue({
      success: true,
      roomLink: 'https://app.test/?room=custom-room',
    });
    mocks.answerCall.mockResolvedValue({ success: true });
  });

  it('retries as joiner when create loses a concurrent room creation race', async () => {
    mocks.createCall.mockRejectedValue(new Error('Room already exists'));

    const { joinOrCreateRoomWithId } = await import(
      '../WIP-start-call-refactor.js'
    );

    const success = await joinOrCreateRoomWithId('custom-room', {
      allowCreate: true,
    });

    expect(success).toBe(true);
    expect(mocks.checkRoomStatus).toHaveBeenCalledWith('custom-room');
    expect(mocks.createCall).toHaveBeenCalledTimes(1);
    expect(mocks.answerCall).toHaveBeenCalledWith(
      expect.objectContaining({ roomId: 'custom-room' }),
    );
    expect(mocks.devDebug).toHaveBeenCalledWith(
      'Room was created concurrently; retrying as joiner...',
    );
    expect(mocks.diagnosticLogger.log).toHaveBeenCalledWith(
      'ROOM',
      'CREATE_RACE_RETRY_JOIN',
      { roomId: 'custom-room' },
    );
  });

  it('throws non-room-exists create failures', async () => {
    const error = new Error('permission denied');
    mocks.createCall.mockRejectedValue(error);

    const { joinOrCreateRoomWithId } = await import(
      '../WIP-start-call-refactor.js'
    );

    await expect(
      joinOrCreateRoomWithId('custom-room', { allowCreate: true }),
    ).rejects.toBe(error);
    expect(mocks.answerCall).not.toHaveBeenCalled();
  });
});
