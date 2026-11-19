import { beforeEach, expect, it, vi } from 'vite-plus/test';

const mocks = vi.hoisted(() => ({
  userId: null,
  getUserProfileById: vi.fn(),
  connectReferral: vi.fn(() => Promise.resolve()),
}));

vi.mock('@auth', () => ({ getLoggedInUserId: () => mocks.userId }));
vi.mock('@components/toast', () => ({ showToast: vi.fn() }));
vi.mock('../../../stores/contacts-store.js', () => ({
  reloadContacts: vi.fn(() => Promise.resolve()),
}));
vi.mock('../../../stores/user-profile-store.js', () => ({
  connectReferral: mocks.connectReferral,
  getUserProfileById: mocks.getUserProfileById,
}));

const { captureReferral, processReferral, hasPendingReferral } =
  await import('../referrals/referral-handler.js');

beforeEach(() => {
  localStorage.clear();
  mocks.userId = null;
});

it('flags a referral-link visit until the referral is connected', async () => {
  window.history.replaceState({}, '', '/?ref=ada-id');

  await captureReferral();

  expect(window.location.search).toBe('');
  expect(hasPendingReferral()).toBe(true);

  mocks.userId = 'me';
  await processReferral();

  expect(mocks.connectReferral).toHaveBeenCalledWith('ada-id');
  expect(hasPendingReferral()).toBe(false);
});
