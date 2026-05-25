import { LogIn } from 'lucide-solid';
import { t } from '../../shared/i18n/index.js';

import styles from './SignInSheet.module.css';

export default function LoginButton(props: { popoverTarget: string }) {
  return (
    <button
      type='button'
      popovertarget={props.popoverTarget}
      class={styles.openButton}
      aria-label={t('auth.sign_in')}
      title={t('auth.sign_in')}
    >
      <LogIn />
    </button>
  );
}
