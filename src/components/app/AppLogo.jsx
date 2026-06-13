import { useI18n } from '../../shared/i18n/index.js';

export default function AppLogo() {
  const { t } = useI18n();

  return (
    <h1 id='app-title-h1' class='app-title'>
      <a id='app-title-a' title={t('nav.app_title')}>
        <span id='app-title-span'>HvU</span>
      </a>
    </h1>
  );
}
