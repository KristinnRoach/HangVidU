import { describe, it, expect, vi } from 'vitest';

// Mock dependencies so the module can load — only t() matters for getBlockedMessage
vi.mock('../../notifications/push-notification-controller.js', () => ({
  pushNotificationController: {},
}));
vi.mock('./notification.js', () => ({
  createNotification: vi.fn(),
  buildTemplate: vi.fn(),
}));
vi.mock('./in-app-notification-manager.js', () => ({
  inAppNotificationManager: { has: vi.fn(), add: vi.fn(), remove: vi.fn() },
}));
vi.mock('../../../utils/toast.js', () => ({
  showSuccessToast: vi.fn(),
  showWarningToast: vi.fn(),
  showErrorToast: vi.fn(),
}));

// Mock i18n with a fake t() that returns known values for known keys
const fakeTranslations = {
  'notification.enable.blocked': 'Notifications blocked. Check browser settings.',
  'notification.enable.blocked.chrome':
    'Notifications blocked. Click the icon in the address bar to allow.',
  'notification.enable.blocked.firefox':
    'Notifications blocked. Click the lock icon in the address bar, then Permissions.',
  'notification.enable.silent_block':
    'Notifications were automatically blocked by {browser}. Open site settings in the address bar to allow.',
};

vi.mock('../../../i18n/index.js', () => ({
  t: (key, params) => {
    const str = fakeTranslations[key] || key;
    if (!params) return str;
    return str.replace(/{(\w+)}/g, (_, k) => params[k] ?? `{${k}}`);
  },
  onLocaleChange: vi.fn(),
}));

const { getBlockedMessage } = await import('../enable-notifications-prompt.js');

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
