import { useI18n } from '@shared/i18n';
import { LoginButton } from '@auth';
import { CallLobby } from '@features/call';
import AppReloadButton from '../components/AppReloadButton';

export default function PublicHomepage() {
  const { t } = useI18n();

  return (
    <section class='mx-auto flex w-full max-w-sm flex-1 flex-col justify-evenly gap-8 px-5 pt-8 pb-16 text-text-primary'>
      <div class='flex flex-col gap-4'>
        <div class='flex flex-col gap-2'>
          <h1 class='text-left' aria-label='HangVidU'>
            <AppReloadButton class='text-3xl font-medium text-primary underline-offset-2 hover:underline'>
              HangVidU
            </AppReloadButton>
          </h1>
          <p class='text-base text-text-secondary'>{t('home.description')}</p>
        </div>
        <LoginButton showLabel />
      </div>

      <CallLobby />
    </section>
  );
}
