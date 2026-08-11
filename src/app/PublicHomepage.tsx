import type { ParentProps } from 'solid-js';
import { useI18n } from '@shared/i18n';
import { LoginButton } from '@auth';

export default function PublicHomepage(props: ParentProps) {
  const { t } = useI18n();

  return (
    <section class='public-homepage' aria-labelledby='public-homepage-title'>
      <div class='public-homepage__content'>
        <h2 id='public-homepage-title'>{t('home.title')}</h2>
        <p>{t('home.description')}</p>

        <div class='public-homepage__login_prompt'>
          <LoginButton
            popoverTarget='signinSheet'
            textContent={'Log in'}
            class={'public-homepage__login'}
          />
          <p>to save contacts and send DM's</p>
        </div>

        {props.children}

        <div class='public-homepage__support'>
          <p>
            {t('home.contact')}:{' '}
            <a href='mailto:kristinnroach@gmail.com'>kristinnroach@gmail.com</a>
          </p>
        </div>
      </div>
    </section>
  );
}
