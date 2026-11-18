import { useI18n } from '@shared/i18n';
import { LoginButton } from '@auth';
import { CallLobby } from '@features/call';
import AppReloadButton from '../components/AppReloadButton';

export default function PublicHomepage() {
  const { t } = useI18n();

  return (
    <section class='flex w-full flex-1 flex-col gap-16 p-12 text-text-primary'>
      <div class='flex flex-col items-center gap-8'>
        <div class='flex flex-col w-full items-center gap-4'>
          <h1 aria-label='HangVidU'>
            <AppReloadButton class='text-3xl font-medium text-primary underline-offset-2 hover:underline'>
              HangVidU
            </AppReloadButton>
          </h1>
          <p class='text-center text-base text-text-secondary text-pretty'>
            {t('home.description')}
          </p>
        </div>
        <LoginButton showLabel class='w-full max-w-98' />
      </div>

      <CallLobby />
    </section>
  );
}
