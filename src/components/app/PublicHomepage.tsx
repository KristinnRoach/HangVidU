import type { ParentProps } from 'solid-js';
import { useI18n } from '../../shared/i18n';

export default function PublicHomepage(props: ParentProps) {
  const { t } = useI18n();

  return (
    <section class='public-homepage' aria-labelledby='public-homepage-title'>
      <div class='public-homepage__content'>
        <h2 id='public-homepage-title'>{t('home.title')}</h2>
        <p>{t('home.description')}</p>

        {props.children}

        <div class='public-homepage__links' aria-label={t('home.links')}>
          <a href='/privacy-policy.html'>{t('nav.privacy')}</a>
          <a href='/terms-of-service.html'>{t('nav.terms')}</a>
        </div>
      </div>
    </section>
  );
}
