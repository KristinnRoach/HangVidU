import { Show, createEffect, createMemo, createSignal } from 'solid-js';
import { useAuth } from '../../auth/solid-auth.js';
import {
  AUTH_COMMANDS,
  parseAuthLogoutRequested,
} from '../../auth/auth-events-schema.js';
import { dispatchCommand } from '../../shared/events/index.js';
import { useI18n } from '../../shared/i18n/index.js';
import GoogleSignInButton from './GoogleSignInButton.jsx';

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
  const displayName = createMemo(() =>
    smartTruncateName(user()?.userName || user()?.email || t('auth.guest_user')),
  );
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
    <div class='auth-component'>
      <Show when={!isLoggedIn()}>
        <GoogleSignInButton />
      </Show>

      <Show when={isLoading()}>
        <span class='signing-in-indicator'>
          {isLoggedIn() ? t('auth.signing_out') : t('auth.signing_in')}
        </span>
      </Show>

      <Show when={isLoggedIn()}>
        <div class='user-info'>
          <Show when={photoUrl() && !avatarFailed()} fallback={
            <span class='user-avatar-placeholder'>{avatarInitial()}</span>
          }>
            <img
              src={photoUrl()}
              alt={displayName()}
              class='user-avatar'
              referrerpolicy='no-referrer'
              onError={() => setAvatarFailed(true)}
            />
          </Show>
          <span class='user-name'>{displayName()}</span>
        </div>
        <button
          id='goog-logout-btn'
          class='logout-btn'
          type='button'
          disabled={isLoading()}
          onClick={requestLogout}
        >
          {t('auth.logout')}
        </button>
      </Show>
    </div>
  );
}
