import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  publish: vi.fn(),
}));

vi.mock('../../../shared/events/index.js', () => ({
  publish: mocks.publish,
}));

describe('contacts-state', () => {
  beforeEach(() => {
    vi.resetModules();
    mocks.publish.mockReset();
  });

  it('returns cloned records from public getters', async () => {
    const stateModule = await import('../contacts-state.js');
    const contact = {
      contactId: 'u1',
      contactNickName: 'Alice',
      roomId: 'room-1',
      savedAt: 100,
      lastInteractionAt: 200,
    };
    const expected = structuredClone(contact);

    stateModule.setState({
      byId: { [contact.contactId]: structuredClone(contact) },
      isHydrated: true,
    });

    const allContacts = stateModule.getAllContacts();
    allContacts.u1.contactNickName = 'Mutated via getAllContacts';

    const byIdContact = stateModule.getContactById('u1');
    byIdContact.contactNickName = 'Mutated via getContactById';

    const roomContact = stateModule.getContactByRoomId('room-1');
    roomContact.contactNickName = 'Mutated via getContactByRoomId';

    const sortedContact = stateModule.getAllContactsSorted()[0];
    sortedContact.contactNickName = 'Mutated via getAllContactsSorted';

    expect(stateModule.getContactById('u1')).toEqual(expected);
  });

  it('publishes cloned state and prev snapshots', async () => {
    const stateModule = await import('../contacts-state.js');
    const first = {
      contactId: 'u1',
      contactNickName: 'Alice',
      roomId: 'room-1',
      savedAt: 100,
      lastInteractionAt: 200,
    };
    const second = {
      contactId: 'u1',
      contactNickName: 'Alice Updated',
      roomId: 'room-2',
      savedAt: 100,
      lastInteractionAt: 300,
    };
    const expectedSecond = structuredClone(second);

    stateModule.setState({
      byId: { [first.contactId]: structuredClone(first) },
      isHydrated: true,
    });
    mocks.publish.mockClear();

    stateModule.setState({
      byId: { [second.contactId]: structuredClone(second) },
    });

    const [, payload] = mocks.publish.mock.calls[0];
    payload.state.byId.u1.contactNickName = 'Mutated new snapshot';
    payload.prev.byId.u1.contactNickName = 'Mutated prev snapshot';

    expect(stateModule.getContactById('u1')).toEqual(expectedSecond);
    expect(payload.prev.byId.u1).toEqual({
      ...first,
      contactNickName: 'Mutated prev snapshot',
    });
  });
});
