import { within, waitFor } from '@solidjs/testing-library';
import { afterEach, describe, it, expect, vi } from 'vite-plus/test';

vi.mock('@components/toast', () => ({
  showToast: vi.fn(),
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
  'notification.enable.timeout': 'Permission timed out. Try again.',
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
import { inAppNotificationManager } from '../in-app-notification-manager.js';

const { getBlockedMessage, showEnableNotificationsPrompt } =
  await import('../components/enable-notifications-prompt.js');

let notification;
afterEach(() => {
  notification?.dispose();
  notification = undefined;
  vi.clearAllMocks();
});

it.each([
  ['Brave', 'error', 'enable-failed', 'failed_push_setup.brave'],
  ['Chromium', 'error', 'enable-failed', 'failed_push_setup'],
  ['Chromium', 'error', 'permission-timeout', 'timeout'],
  ['Chromium', 'denied', 'already-denied', 'blocked.chrome'],
])(
  'keeps %s %s (%s) guidance in the notification and allows retry',
  async (browser, state, reason, messageKey) => {
    getPushNotifications.mockReturnValue({
      requestPermission: vi.fn().mockResolvedValue({ state, reason, browser }),
    });
    notification = showEnableNotificationsPrompt();
    document.body.append(notification);
    const { getByRole } = within(notification);
    const button = getByRole('button', { name: 'shared.enable' });
    button.click();

    await waitFor(() =>
      expect(getByRole('status').textContent).toBe(
        fakeTranslations[`notification.enable.${messageKey}`],
      ),
    );
    expect(button.disabled).toBe(false);
    expect(inAppNotificationManager.remove).not.toHaveBeenCalled();
  },
);

describe('getBlockedMessage', () => {
  it.each(['Chrome', 'Chromium', 'Edge', 'Brave'])(
    'returns site-permission guidance for %s',
    (browser) => {
      const msg = getBlockedMessage(browser, 'already-denied');
      expect(msg).toBe(fakeTranslations['notification.enable.blocked.chrome']);
    },
  );

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
