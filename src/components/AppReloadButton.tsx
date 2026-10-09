import { createSignal, onCleanup, type ParentProps } from 'solid-js';
import { getAppReloadAllowed } from '@shared/app-reload';
import { subscribe } from '@shared/events';
import { useI18n } from '@shared/i18n/index.js';
import styles from './AppReloadButton.module.css';

export default function AppReloadButton(props: ParentProps<{ id?: string }>) {
  const { t } = useI18n();
  const [reloadAllowed, setReloadAllowed] = createSignal(getAppReloadAllowed());
  const unsubscribe = subscribe('evt:app-reload:state:changed', () => {
    setReloadAllowed(getAppReloadAllowed());
  });
  onCleanup(() => unsubscribe());

  function reloadPage() {
    // Check the current gate too, so a stale UI cannot interrupt a call.
    if (getAppReloadAllowed()) window.location.reload();
  }

  return (
    <button
      id={props.id}
      type='button'
      class={styles.reload}
      title={t(reloadAllowed() ? 'nav.reload' : 'nav.reload_blocked')}
      aria-label={t('nav.reload')}
      disabled={!reloadAllowed()}
      onClick={reloadPage}
    >
      {props.children}
    </button>
  );
}
