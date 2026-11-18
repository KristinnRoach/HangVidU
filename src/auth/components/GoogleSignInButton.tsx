import { useI18n } from '@shared/i18n';
import { signInWithAccountSelection } from '../auth-commands.js';
import { useAuth } from '../solid-auth';
import googleSignIn from '../assets/google-sign-in-dark.png';

export default function GoogleSignInButton() {
  const { t } = useI18n();
  const { isLoading } = useAuth();
  const width = 220;
  const height = width / 4.5; // org 360 x 80

  return (
    <button
      type='button'
      class='rounded-full p-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
      disabled={isLoading()}
      aria-busy={isLoading() || undefined}
      onClick={() => {
        if (!isLoading()) void signInWithAccountSelection();
      }}
    >
      <img
        src={googleSignIn}
        width={width}
        height={height}
        class='rounded-full'
        alt={t('auth.sign_in_with_google')}
      />
    </button>
  );
}
