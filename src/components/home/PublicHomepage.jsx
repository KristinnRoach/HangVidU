import { Show } from 'solid-js';
import { useAuth } from '../../auth/solid-auth.js';
import { useI18n } from '../../shared/i18n/index.js';

export default function PublicHomepage() {
  const { t } = useI18n();
  const { isLoggedIn } = useAuth();

  return (
    <Show when={!isLoggedIn()}>
      <section class='public-homepage' aria-labelledby='public-homepage-title'>
        <div class='public-homepage__content'>
          <h2 id='public-homepage-title'>{t('home.title')}</h2>
          <p>{t('home.description')}</p>
          <div class='public-homepage__links' aria-label={t('home.links')}>
            <a href='/privacy-policy.html'>{t('nav.privacy')}</a>
            <a href='/terms-of-service.html'>{t('nav.terms')}</a>
          </div>
        </div>
      </section>
    </Show>
  );
}
