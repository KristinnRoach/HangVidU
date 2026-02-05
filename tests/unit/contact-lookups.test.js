import { describe, it, expect, vi, beforeEach } from 'vitest';
import { get } from 'firebase/database';

// Mock all heavy dependencies so we only test lookup logic
vi.mock('firebase/database', () => ({
  ref: vi.fn(),
  set: vi.fn(),
  get: vi.fn(),
  remove: vi.fn(),
  update: vi.fn(),
  onValue: vi.fn(),
  off: vi.fn(),
}));
vi.mock('../../src/storage/fb-rtdb/rtdb.js', () => ({ rtdb: {} }));
vi.mock('../../src/firebase/auth.js', () => ({
  getLoggedInUserId: vi.fn(() => 'my-uid'),
  getCurrentUser: vi.fn(),
}));
vi.mock('../../src/components/calling/calling-ui.js', () => ({
  hideCallingUI: vi.fn(),
  showCallingUI: vi.fn(),
}));
vi.mock('../../src/components/base/confirm-dialog.js', () => ({
  default: vi.fn(),
}));
vi.mock('../../src/utils/ui/ui-utils.js', () => ({
  hideElement: vi.fn(),
  showElement: vi.fn(),
}));
vi.mock('../../src/messaging/messaging-controller.js', () => ({
  messagingController: {},
}));
vi.mock('../../src/components/messages/messages-ui.js', () => ({
  messagesUI: {},
}));
vi.mock('../../src/components/messages/createMessageToggle.js', () => ({
  createMessageToggle: vi.fn(),
}));
vi.mock('../../src/utils/room-id.js', () => ({
  getDeterministicRoomId: vi.fn(),
}));
vi.mock('../../src/notifications/push-notification-controller.js', () => ({
  pushNotificationController: {},
}));

import {
  getContactByRoomId,
  getContactById,
  resolveCallerName,
} from '../../src/components/contacts/contacts.js';

const MOCK_CONTACTS = {
  'user-alice': {
    contactId: 'user-alice',
    contactName: 'Alice',
    roomId: 'room-abc',
    savedAt: 1000,
  },
  'user-bob': {
    contactId: 'user-bob',
    contactName: 'Bob',
    roomId: 'room-xyz',
    savedAt: 2000,
  },
};

beforeEach(() => {
  // getContacts() calls Firebase get() when logged in
  get.mockResolvedValue({
    exists: () => true,
    val: () => MOCK_CONTACTS,
  });
});

// ── getContactByRoomId (current behavior) ──

describe('getContactByRoomId', () => {
  it('finds contact by roomId', async () => {
    const result = await getContactByRoomId('room-abc');
    expect(result).toEqual(MOCK_CONTACTS['user-alice']);
  });

  it('returns null for unknown roomId', async () => {
    const result = await getContactByRoomId('room-unknown');
    expect(result).toBeNull();
  });

  it('returns null for falsy roomId', async () => {
    expect(await getContactByRoomId(null)).toBeNull();
    expect(await getContactByRoomId('')).toBeNull();
  });
});

// ── getContactById (new helper) ──

describe('getContactById', () => {
  it('finds contact by userId (direct key)', async () => {
    const result = await getContactById('user-alice');
    expect(result).toEqual(MOCK_CONTACTS['user-alice']);
  });

  it('returns null for unknown userId', async () => {
    const result = await getContactById('user-unknown');
    expect(result).toBeNull();
  });

  it('returns null for falsy userId', async () => {
    expect(await getContactById(null)).toBeNull();
    expect(await getContactById('')).toBeNull();
  });
});

// ── resolveCallerName (new signature: (userId, roomId)) ──

describe('resolveCallerName', () => {
  it('resolves name by userId (direct key lookup)', async () => {
    const name = await resolveCallerName('user-alice');
    expect(name).toBe('Alice');
  });

  it('falls back to roomId scan when userId not in contacts', async () => {
    const name = await resolveCallerName('user-unknown', 'room-abc');
    expect(name).toBe('Alice');
  });

  it('returns userId when neither lookup matches', async () => {
    const name = await resolveCallerName('user-unknown', 'room-unknown');
    expect(name).toBe('user-unknown');
  });

  it('returns userId when no roomId provided', async () => {
    const name = await resolveCallerName('user-unknown');
    expect(name).toBe('user-unknown');
  });

  it('returns "Unknown" when no userId and no roomId', async () => {
    const name = await resolveCallerName(null, null);
    expect(name).toBe('Unknown');
  });
});
