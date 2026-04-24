import { onMount } from 'solid-js';
import { useI18n } from '../../shared/i18n/index.js';
import { initIcons } from '../../shared/components/ui/icons.js';

export default function AppPipButton() {
  const { t } = useI18n();
  let rootEl;

  onMount(() => {
    initIcons(rootEl);
  });

  return (
    <button
      ref={rootEl}
      type='button'
      id='app-pip-btn'
      style='display: none'
      title={t('a11y.popup')}
      aria-label={t('a11y.popup')}
    >
      <i data-lucide='monitor' />
    </button>
  );
}

