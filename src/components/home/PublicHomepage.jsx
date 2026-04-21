import { Show, createSignal, onCleanup } from 'solid-js';
import { getAuthState, onAuthStateChanged } from '../../auth/auth-state.js';
import { useI18n } from '../../shared/i18n/index.js';

function createAuthSnapshot() {
  const [authSnapshot, setAuthSnapshot] = createSignal(getAuthState());
  const unsubscribe = onAuthStateChanged(setAuthSnapshot);
  onCleanup(unsubscribe);
  return authSnapshot;
}

export default function PublicHomepage() {
  const { t } = useI18n();
  const authSnapshot = createAuthSnapshot();

  return (
    <Show when={!authSnapshot().isLoggedIn}>
      <section
        class='public-homepage'
        aria-labelledby='public-homepage-title'
      >
        <div class='public-homepage__content'>
          <p class='public-homepage__eyebrow'>{t('home.eyebrow')}</p>
          <h2 id='public-homepage-title'>{t('home.title')}</h2>
          <p class='public-homepage__lede'>{t('home.lede')}</p>
          <ul class='public-homepage__features' aria-label={t('home.features')}>
            <li>{t('home.feature.video')}</li>
            <li>{t('home.feature.watch')}</li>
            <li>{t('home.feature.contacts')}</li>
          </ul>
          <p class='public-homepage__google-use'>{t('home.google_use')}</p>
          <div class='public-homepage__links' aria-label={t('home.links')}>
            <a href='/privacy-policy.html'>{t('nav.privacy')}</a>
            <a href='/terms-of-service.html'>{t('nav.terms')}</a>
          </div>
        </div>
      </section>
    </Show>
  );
}
