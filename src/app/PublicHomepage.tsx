import { useI18n } from '@shared/i18n';
import { LoginButton } from '@auth';
import { CallLobby } from '@features/call';

export default function PublicHomepage() {
  const { t } = useI18n();

  return (
    <section class='flex h-full flex-col items-center overflow-y-auto px-6 pt-8 pb-16 text-center text-neutral-200'>
      <p class='text-4xl font-medium text-primary underline decoration-primary-subtle underline-offset-2'>
        HangVidU
      </p>

      <p class='mt-3 max-w-lg text-base text-neutral-400'>
        {t('home.description')}
      </p>

      <LoginButton
        popoverTarget='signinSheet'
        textContent='Log in'
        class='mt-7 rounded-md border border-primary bg-primary/20 px-4 py-2 font-medium text-neutral-100 transition-colors hover:bg-primary/30'
      />

      <div class='mt-8 w-full max-w-md'>
        <CallLobby />
      </div>
    </section>
  );
}
