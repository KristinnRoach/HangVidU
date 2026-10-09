import { createSignal, onCleanup, type ParentProps } from 'solid-js';
import { getAppReloadAllowed } from '@shared/app-reload';
import { subscribe } from '@shared/events';
import { useI18n } from '@shared/i18n/index.js';

export default function AppReloadButton(
  props: ParentProps<{ class?: string }>,
) {
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
      type='button'
      class={`rounded-none bg-transparent p-0 hover:bg-transparent focus-visible:outline-2 focus-visible:outline-current focus-visible:outline-offset-4 ${props.class ?? ''}`}
      title={t(reloadAllowed() ? 'nav.reload' : 'nav.reload_blocked')}
      aria-label={t('nav.reload')}
      disabled={!reloadAllowed()}
      onClick={reloadPage}
    >
      {props.children}
    </button>
  );
}
