import { Show, createEffect, createMemo, createSignal } from 'solid-js';
import { useAuth } from '../../auth/solid-auth.js';
import {
  AUTH_COMMANDS,
  parseAuthLogoutRequested,
} from '../../auth/auth-events-schema.js';
import { dispatchCommand } from '../../shared/events/index.js';
import { useI18n } from '../../shared/i18n/index.js';
import GoogleSignInButton from './GoogleSignInButton.jsx';
import { LogOut } from 'lucide-solid';

// import './AuthControls.css';
import styles from '../TopBar.module.css';

function smartTruncateName(fullName, maxLength = 20) {
  if (!fullName || fullName.length <= maxLength) {
    return fullName;
  }

  const firstName = fullName.split(' ')[0];
  if (firstName.length <= maxLength) {
    return firstName;
  }

  return `${firstName.slice(0, maxLength - 3)}...`;
}

export default function AuthControls() {
  const { t } = useI18n();
  const { isLoggedIn, status, user } = useAuth();
  const [avatarFailed, setAvatarFailed] = createSignal(false);

  const isLoading = () => status() === 'loading';

  // TODO: Decide whether to show name, for now just showing avatar
  const displayName = createMemo(() => {
    const name = user()?.userName || user()?.email || t('auth.guest_user');
    return smartTruncateName(name);
  });

  const photoUrl = createMemo(() => user()?.photoURL || '');
  const avatarInitial = createMemo(() =>
    (displayName() || t('auth.guest_user')).trim().slice(0, 1).toUpperCase(),
  );

  createEffect(() => {
    photoUrl();
    setAvatarFailed(false);
  });

  function requestLogout() {
    try {
      dispatchCommand(
        AUTH_COMMANDS.LOGOUT_REQUESTED,
        parseAuthLogoutRequested({ source: 'auth-ui' }),
      );
    } catch (error) {
      console.error('[AuthControls] logout request failed:', error);
      alert(t('auth.logout_failed'));
    }
  }

  return (
    <div class={styles.authControls}>
      <Show when={!isLoggedIn()}>
        <GoogleSignInButton />
      </Show>

      <Show when={isLoading()}>
        <span class='signing-in-indicator'>
          {isLoggedIn() ? t('auth.signing_out') : t('auth.signing_in')}
        </span>
      </Show>

      <Show when={isLoggedIn()}>
        <div class={styles.userInfo}>
          <Show
            when={photoUrl() && !avatarFailed()}
            fallback={
              <span class={styles.userAvatarPlaceholder}>
                {avatarInitial()}
              </span>
            }
          >
            <img
              src={photoUrl()}
              alt={displayName()}
              class={styles.userAvatar}
              referrerpolicy='no-referrer'
              onError={() => setAvatarFailed(true)}
            />
          </Show>

          {/* TODO: Decide whether to keep name */}
          {/* <span class={styles.userName}>{displayName()}</span> */}
        </div>
        <button
          id='goog-logout-btn'
          class={styles.logoutBtn}
          type='button'
          title={t('auth.logout')}
          aria-title={t('auth.logout')}
          disabled={isLoading()}
          onClick={requestLogout}
        >
          <LogOut />
        </button>
      </Show>
    </div>
  );
}
