import { LogIn } from 'lucide-solid';
import { t } from '@shared/i18n/index.js';
import Button from '../../components/Button';
import { openSignIn } from './SignInDialog';

export default function LoginButton(props: { showLabel?: boolean }) {
  return (
    <Button
      variant={props.showLabel ? 'primary' : 'ghost'}
      aria-label={t('auth.sign_in')}
      title={t('auth.sign_in')}
      onClick={openSignIn}
    >
      {props.showLabel ? t('auth.sign_in') : <LogIn />}
    </Button>
  );
}
