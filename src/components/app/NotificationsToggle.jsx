import { createSignal, onCleanup, onMount } from 'solid-js';
import { inAppNotificationManager } from '../../features/notifications/index.js';
import { useI18n } from '../../shared/i18n/index.js';
import { initIcons } from '../../components/base-legacy/icons.js';

export default function NotificationsToggle() {
  const { t } = useI18n();
  const [count, setCount] = createSignal(0);
  const [unreadCount, setUnreadCount] = createSignal(0);
  let manager = inAppNotificationManager;
  let rootEl;

  function setManager(nextManager) {
    manager = nextManager;
  }

  function toggleList() {
    manager?.toggleList?.();
  }

  onMount(() => {
    rootEl.setCount = setCount;
    rootEl.setUnread = setUnreadCount;
    rootEl.setManager = setManager;
    rootEl.show = () => {
      rootEl.style.display = 'block';
    };
    rootEl.hide = () => {
      rootEl.style.display = 'none';
    };

    initIcons(rootEl);
    inAppNotificationManager.setToggle(rootEl);
  });

  onCleanup(() => {
    if (inAppNotificationManager.toggle === rootEl) {
      inAppNotificationManager.setToggle(null);
    }
  });

  return (
    <div ref={rootEl} class='notifications-toggle-container'>
      <button
        class='notifications-toggle-btn'
        title={t('notification.toggle')}
        aria-label={t('notification.toggle')}
        data-count={count()}
        disabled={count() === 0}
        onClick={toggleList}
      >
        <i data-lucide='bell' />
        <span
          class='notification-badge'
          style={{ display: unreadCount() > 0 ? 'flex' : 'none' }}
        >
          {unreadCount()}
        </span>
      </button>
    </div>
  );
}
