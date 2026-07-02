import type { ParentProps } from 'solid-js';
import { useI18n } from '../../shared/i18n';
import LoginButton from '@auth/components/LoginButton';

export default function PublicHomepage(props: ParentProps) {
  const { t } = useI18n();

  return (
    <section class="public-homepage" aria-labelledby="public-homepage-title">
      <div class="public-homepage__content">
        <h2 id="public-homepage-title">{t('home.title')}</h2>
        <p>{t('home.description')}</p>
        <p>{t('contact.disclosure.import')}</p>
        <p>{t('contact.disclosure.gmail_send')}</p>

        <p class="public-homepage__login_prompt">
          <LoginButton
            popoverTarget="signinSheet"
            textContent={'Log in'}
            class={'public-homepage__login'}
          />
          to save contacts and send DM's
        </p>

        {props.children}

        <p class="public-homepage__support">
          Support:{' '}
          <a href="mailto:kristinnroach@gmail.com">kristinnroach@gmail.com</a>
        </p>

        <div class="public-homepage__links" aria-label={t('home.links')}>
          <a href="/privacy-policy.html">{t('nav.privacy')}</a>
          <a href="/terms-of-service.html">{t('nav.terms')}</a>
        </div>
      </div>
    </section>
  );
}
