import { useI18n } from '@shared/i18n';
import { LoginButton } from '@auth';
import { CallLobby } from '@features/call';
import AppReloadButton from '../components/AppReloadButton';

export default function PublicHomepage() {
  const { t } = useI18n();

  return (
    <section class='flex flex-col items-center gap-6 px-4 pt-8 pb-12 text-center text-text-primary sm:gap-8 sm:px-6 sm:pt-12'>
      <div class='flex flex-col gap-2'>
        <h1 aria-label='HangVidU'>
          <AppReloadButton class='text-3xl font-medium text-primary underline-offset-2 hover:underline sm:text-4xl'>
            HangVidU
          </AppReloadButton>
        </h1>
        <p class='text-base text-text-secondary'>{t('home.description')}</p>
      </div>

      <div class='w-full max-w-sm'>
        <CallLobby />
      </div>

      <LoginButton showLabel />

      <a
        class='text-sm text-text-secondary hover:text-text-primary hover:underline'
        href='mailto:kristinnroach@gmail.com?subject=HangVidU%20support'
      >
        {t('home.contact')}: kristinnroach@gmail.com
      </a>
    </section>
  );
}
