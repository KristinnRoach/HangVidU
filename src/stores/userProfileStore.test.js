import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  authState: {
    isLoggedIn: true,
    user: {
      uid: 'user-1',
      email: 'crystalquicksand@gmail.com',
    },
  },
  providerSeed: {
    uid: 'user-1',
    displayName: 'Kristinn Roach',
    username: null,
    email: 'crystalquicksand@gmail.com',
    photoURL: 'https://example.test/google-photo.jpg',
  },
  getUserProfile: vi.fn(),
  saveUserProfile: vi.fn(() => Promise.resolve()),
  register: vi.fn(() => Promise.resolve()),
  lookupByEmail: vi.fn(),
  findByEmails: vi.fn(),
  searchByHandle: vi.fn(),
  workerRequest: vi.fn(),
}));

vi.mock('../auth/index.js', () => ({
  getAuthState: () => mocks.authState,
  getAuthProviderProfileSeed: () => mocks.providerSeed,
  getLoggedInUserToken: vi.fn(async () => 'token'),
}));

vi.mock('../shared/events/index.js', () => ({
  subscribe: vi.fn(() => () => {}),
}));

vi.mock('../infra/firebase-rtdb.js', () => ({
  rtdb: {},
}));

vi.mock('firebase/database', () => ({
  ref: vi.fn((_, path) => path),
  set: vi.fn(() => Promise.resolve()),
}));

vi.mock('../infra/hangvidu-api-url', () => ({
  getHangViduApiBaseUrl: () => 'https://api.test',
}));

vi.mock('@lib/utils/email-hash.js', () => ({
  hashEmail: (email) => `hash:${email}`,
}));

vi.mock('../storage/user/index.js', () => ({
  createUserProfileD1Adapter: vi.fn(() => ({})),
  createUserProfileRepository: vi.fn(() => ({
    getUserProfile: mocks.getUserProfile,
    saveUserProfile: mocks.saveUserProfile,
  })),
  createUserDiscovery: vi.fn(() => ({
    register: mocks.register,
    lookupByEmail: mocks.lookupByEmail,
    findByEmails: mocks.findByEmails,
    searchByHandle: mocks.searchByHandle,
  })),
}));

vi.mock('../storage/worker-request.js', () => ({
  createWorkerRequest: vi.fn(() => mocks.workerRequest),
}));

async function flushAsync() {
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
}

describe('userProfileStore', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    mocks.authState.isLoggedIn = true;
    mocks.authState.user = {
      uid: 'user-1',
      email: 'crystalquicksand@gmail.com',
    };
    mocks.providerSeed = {
      uid: 'user-1',
      displayName: 'Kristinn Roach',
      username: null,
      email: 'crystalquicksand@gmail.com',
      photoURL: 'https://example.test/google-photo.jpg',
    };
    mocks.saveUserProfile.mockResolvedValue(undefined);
    mocks.register.mockResolvedValue(undefined);
    mocks.workerRequest.mockResolvedValue({
      profile: { username: 'crystal_quicksand' },
    });
  });

  it('uses an existing D1 profile instead of provider profile fields', async () => {
    mocks.getUserProfile.mockResolvedValue({
      displayName: 'Crystal Quicksand',
      photoURL: null,
      username: 'crystal_quicksand',
    });

    const { getLoggedInUserProfile } = await import('./userProfileStore.js');

    getLoggedInUserProfile();
    await flushAsync();

    expect(mocks.saveUserProfile).not.toHaveBeenCalled();
    expect(getLoggedInUserProfile()).toEqual({
      uid: 'user-1',
      displayName: 'Crystal Quicksand',
      photoURL: null,
      username: 'crystal_quicksand',
      email: 'crystalquicksand@gmail.com',
      discoverable: undefined,
    });
  });

  it('seeds provider profile fields only when D1 has no profile data', async () => {
    mocks.getUserProfile
      .mockResolvedValueOnce({
        displayName: null,
        photoURL: null,
        username: null,
      })
      .mockResolvedValueOnce({
        displayName: null,
        photoURL: null,
        username: null,
      })
      .mockResolvedValueOnce({
        displayName: 'Kristinn Roach',
        photoURL: 'https://example.test/google-photo.jpg',
        username: 'crystal_quicksand',
      });

    const { getLoggedInUserProfile } = await import('./userProfileStore.js');

    getLoggedInUserProfile();
    await flushAsync();

    expect(mocks.saveUserProfile).toHaveBeenCalledWith(mocks.providerSeed);
    expect(mocks.workerRequest).toHaveBeenCalledWith(
      'PUT',
      '/users/me/profile',
      expect.objectContaining({ username: 'kristinn_roach' }),
    );
    expect(getLoggedInUserProfile()?.username).toBe('crystal_quicksand');
  });
});
