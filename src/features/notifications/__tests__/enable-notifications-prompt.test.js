import { describe, it, expect, vi } from 'vite-plus/test';

vi.mock('../../../components/base-legacy/notification.js', () => ({
  createNotification: vi.fn((options) => options),
  buildTemplate: vi.fn((template) => template),
}));

vi.mock('../../../components/base-legacy/toast.js', () => ({
  showErrorToast: vi.fn(),
  showSuccessToast: vi.fn(),
  showWarningToast: vi.fn(),
}));

vi.mock('@push/index.js', () => ({
  getPushNotifications: vi.fn(() => ({})),
  pushNotifications: {},
}));

vi.mock('../in-app-notification-manager.js', () => ({
  inAppNotificationManager: { has: vi.fn(), add: vi.fn(), remove: vi.fn() },
}));

// Mock i18n with a fake t() that returns known values for known keys
const fakeTranslations = {
  'notification.enable.failed_push_setup': 'Generic push setup guidance',
  'notification.enable.failed_push_setup.brave': 'Brave push setup guidance',
  'notification.enable.blocked':
    'Notifications blocked. Check browser settings.',
  'notification.enable.blocked.chrome':
    'Notifications blocked. Click the icon in the address bar to allow.',
  'notification.enable.blocked.firefox':
    'Notifications blocked. Click the lock icon in the address bar, then Permissions.',
  'notification.enable.silent_block':
    'Notifications were automatically blocked by {browser}. Open site settings in the address bar to allow.',
};

vi.mock('../../../shared/i18n/index.js', () => ({
  t: (key, params) => {
    const str = fakeTranslations[key] || key;
    if (!params) return str;
    return str.replace(/{(\w+)}/g, (_, k) => params[k] ?? `{${k}}`);
  },
  onLocaleChange: vi.fn(),
}));

import { getPushNotifications } from '@push';
import { showErrorToast } from '../../../components/base-legacy/toast.js';

const { getBlockedMessage, showEnableNotificationsPrompt } =
  await import('../components/enable-notifications-prompt.js');

it.each(['Brave', 'Chromium'])(
  'shows the appropriate push setup guidance for %s',
  async (browser) => {
    getPushNotifications.mockReturnValue({
      requestPermission: vi.fn().mockResolvedValue({
        state: 'error',
        reason: 'enable-failed',
        browser,
      }),
    });
    const notification = showEnableNotificationsPrompt();
    const button = { disabled: false, textContent: 'Enable' };

    await notification.handlers.handleEnable({ target: button });

    const key =
      browser === 'Brave'
        ? 'notification.enable.failed_push_setup.brave'
        : 'notification.enable.failed_push_setup';
    expect(showErrorToast).toHaveBeenLastCalledWith(fakeTranslations[key]);
    expect(button.disabled).toBe(false);
  },
);

describe('getBlockedMessage', () => {
  it('should return Chrome-specific message for Chrome', () => {
    const msg = getBlockedMessage('Chrome', 'already-denied');
    expect(msg).toBe(fakeTranslations['notification.enable.blocked.chrome']);
  });

  it('should return Firefox-specific message for Firefox', () => {
    const msg = getBlockedMessage('Firefox', 'already-denied');
    expect(msg).toBe(fakeTranslations['notification.enable.blocked.firefox']);
  });

  it('should fall back to generic message for unknown browser', () => {
    const msg = getBlockedMessage('Lynx', 'already-denied');
    expect(msg).toBe(fakeTranslations['notification.enable.blocked']);
  });

  it('should return silent-block message with browser name interpolated', () => {
    const msg = getBlockedMessage('Chrome', 'silent-block');
    expect(msg).toContain('Chrome');
    expect(msg).toContain('automatically blocked');
  });

  it('should handle undefined browser gracefully', () => {
    const msg = getBlockedMessage(undefined, 'already-denied');
    expect(msg).toBe(fakeTranslations['notification.enable.blocked']);
  });
});
