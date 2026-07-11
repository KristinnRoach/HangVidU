import { createSignal, onCleanup, onMount } from 'solid-js';
import { inAppNotificationManager } from '../in-app-notification-manager.js';
import { useI18n } from '@shared/i18n/index.js';
import { Bell } from 'lucide-solid';

export function NotificationsToggle() {
  const { t } = useI18n();
  const [count, setCount] = createSignal(0);

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
    rootEl.setManager = setManager;

    rootEl.show = () => {
      rootEl.style.display = 'flex';
    };
    rootEl.hide = () => {
      rootEl.style.display = 'none';
    };

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
        <Bell />
        <span
          class='notification-badge'
          style={{ display: count() > 0 ? 'flex' : 'none' }}
        >
          {count()}
        </span>
      </button>
    </div>
  );
}
