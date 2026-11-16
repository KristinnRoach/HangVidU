import { LogIn } from 'lucide-solid';
import { t } from '@shared/i18n/index.js';
import { openSignIn } from './SignInDialog';

export default function LoginButton(props: {
  textContent?: string;
  class?: string;
}) {
  return (
    <button
      type='button'
      class={props.class}
      aria-label={t('auth.sign_in')}
      title={t('auth.sign_in')}
      onClick={openSignIn}
    >
      {props.textContent ? props.textContent : <LogIn />}
    </button>
  );
}
