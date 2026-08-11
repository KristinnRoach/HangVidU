import { useI18n } from '@shared/i18n';
import { LoginButton } from '@auth';
import { CallLobby } from '@features/call';

export default function PublicHomepage() {
  const { t } = useI18n();

  return (
    <section
      class='flex h-full flex-col items-center overflow-y-auto px-6 pt-10 pb-20 text-center text-neutral-200'
      aria-labelledby='public-homepage-title'
    >
      <h2 id='public-homepage-title' class='text-4xl font-medium text-primary'>
        {t('home.title')}
      </h2>
      <p class='mt-4 max-w-xl text-lg'>{t('home.description')}</p>

      <LoginButton
        popoverTarget='signinSheet'
        textContent='Log in'
        class='mt-8 rounded-md border border-primary bg-primary/20 px-4 py-2 font-medium tracking-wide text-neutral-100 transition-colors hover:bg-primary/30'
      />

      <div class='mt-10 w-full max-w-md'>
        <CallLobby />
      </div>

      <p class='mt-auto pt-12 text-sm text-neutral-400'>
        {t('home.contact')}:{' '}
        <a
          class='text-primary hover:underline'
          href='mailto:kristinnroach@gmail.com'
        >
          kristinnroach@gmail.com
        </a>
      </p>
    </section>
  );
}
