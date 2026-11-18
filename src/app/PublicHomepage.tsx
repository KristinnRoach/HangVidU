import { useI18n } from '@shared/i18n';
import { LoginButton } from '@auth';
import { CallLobby } from '@features/call';
import AppReloadButton from '../components/AppReloadButton';

export default function PublicHomepage() {
  const { t } = useI18n();

  return (
    <section class='m-auto flex w-full max-w-sm shrink-0 flex-col gap-8 px-5 pt-8 pb-16 text-text-primary'>
      <div class='flex flex-col gap-2'>
        <h1 class='text-left' aria-label='HangVidU'>
          <AppReloadButton class='text-3xl font-medium text-primary underline-offset-2 hover:underline'>
            HangVidU
          </AppReloadButton>
        </h1>
        <p class='text-base text-text-secondary'>{t('home.description')}</p>
      </div>

      <CallLobby />

      <div class='flex flex-wrap items-center gap-x-3 gap-y-2'>
        <LoginButton showLabel />
        <a
          class='text-sm text-text-secondary hover:text-text-primary hover:underline'
          href='mailto:kristinnroach@gmail.com?subject=HangVidU%20support'
        >
          {t('home.contact')}: kristinnroach@gmail.com
        </a>
      </div>
    </section>
  );
}
