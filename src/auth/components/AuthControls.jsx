import { Show } from 'solid-js';
import { useAuth } from '../solid-auth';
import { signOutUser } from '../index.js';
import { useI18n } from '@shared/i18n/index.js';
import LoginButton from './LoginButton';
import SignInSheet from './SignInSheet';
import { LogOut } from 'lucide-solid';

import styles from './AuthControls.module.css';

export default function AuthControls() {
  const { t } = useI18n();
  const {
    isLoggedIn,
    isLoading,
    isLoggingIn,
    isLoggingOut,
    isAuthInitialized,
  } = useAuth();

  async function requestLogout() {
    try {
      await signOutUser();
    } catch (error) {
      console.error('[AuthControls] logout request failed:', error);
      alert(t('auth.logout_failed'));
    }
  }

  return (
    <div class={styles.authControls}>
      <Show when={isAuthInitialized() && !isLoggedIn()}>
        <LoginButton popoverTarget="signinSheet" />
        <SignInSheet id="signinSheet" />
      </Show>

      <Show when={isLoggingIn() || isLoggingOut()}>
        <span class="signing-in-indicator">
          {isLoggedIn() ? t('auth.signing_out') : t('auth.signing_in')}
        </span>
      </Show>

      <Show when={isLoggedIn()}>
        <button
          id="goog-logout-btn"
          class={styles.logoutBtn}
          type="button"
          title={t('auth.logout')}
          aria-label={t('auth.logout')}
          disabled={isLoading() || !isAuthInitialized()}
          onClick={requestLogout}
        >
          <LogOut />
        </button>
      </Show>
    </div>
  );
}
