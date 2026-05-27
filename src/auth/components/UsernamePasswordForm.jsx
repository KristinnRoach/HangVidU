import { Show, createSignal } from 'solid-js';
import {
  signInWithUsernameOrEmail,
  signUpWithUsername,
} from '../password-auth.js';
import { useI18n } from '../../shared/i18n/index.js';
import styles from './UsernamePasswordForm.module.css';

const FRIENDLY_ERROR_KEYS = {
  account_has_no_username: 'auth.error.invalid_credentials',
  identifier_required: 'auth.error.identifier_required',
  no_account_for_email: 'auth.error.invalid_credentials',
  password_required: 'auth.error.password_required',
  password_too_short: 'auth.error.password_too_short',
  username_invalid: 'auth.error.username_invalid',
  username_required: 'auth.error.username_required',
  username_taken: 'auth.error.username_taken',
  'auth/email-already-in-use': 'auth.error.username_taken',
  'auth/invalid-credential': 'auth.error.invalid_credentials',
  'auth/user-not-found': 'auth.error.invalid_credentials',
  'auth/wrong-password': 'auth.error.invalid_credentials',
};

function getFriendlyAuthErrorKey(error) {
  const code = error?.code || error?.message;
  return FRIENDLY_ERROR_KEYS[code] || 'auth.error.generic';
}

// Minimal sign-up / sign-in form. No dedicated styles yet — uses semantic
// elements + native browser defaults. Replace with the chosen design when
// the sustainable auth-UI strategy is picked.
export default function UsernamePasswordForm(props) {
  const { t } = useI18n();
  const [mode, setMode] = createSignal('signin'); // 'signin' | 'signup'
  const [identifier, setIdentifier] = createSignal('');
  const [username, setUsername] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [displayName, setDisplayName] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [error, setError] = createSignal('');
  const [busy, setBusy] = createSignal(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      if (mode() === 'signup') {
        await signUpWithUsername({
          username: username(),
          password: password(),
          email: email() || null,
          displayName: displayName() || null,
        });
      } else {
        await signInWithUsernameOrEmail({
          identifier: identifier(),
          password: password(),
        });
      }
    } catch (err) {
      setError(t(getFriendlyAuthErrorKey(err)));
      props.onAuthFailure?.();
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} class={styles.form}>
      <Show
        when={mode() === 'signup'}
        fallback={
          <input
            type='text'
            placeholder={t('auth.placeholder.identifier')}
            autocomplete='username'
            value={identifier()}
            aria-invalid={!!error()}
            aria-describedby={error() ? 'auth-password-error' : undefined}
            onInput={(e) => {
              setError('');
              setIdentifier(e.currentTarget.value);
            }}
            required
          />
        }
      >
        <input
          type='text'
          placeholder={t('auth.placeholder.username')}
          autocomplete='username'
          value={username()}
          aria-invalid={!!error()}
          aria-describedby={error() ? 'auth-password-error' : undefined}
          onInput={(e) => {
            setError('');
            setUsername(e.currentTarget.value);
          }}
          required
        />
        <input
          type='email'
          placeholder={t('auth.placeholder.email')}
          autocomplete='email'
          value={email()}
          onInput={(e) => {
            setError('');
            setEmail(e.currentTarget.value);
          }}
        />
        <input
          type='text'
          placeholder={t('auth.placeholder.display_name')}
          autocomplete='nickname'
          value={displayName()}
          onInput={(e) => {
            setError('');
            setDisplayName(e.currentTarget.value);
          }}
        />
      </Show>
      <input
        type='password'
        placeholder={t('auth.placeholder.password')}
        autocomplete={mode() === 'signup' ? 'new-password' : 'current-password'}
        value={password()}
        aria-invalid={!!error()}
        aria-describedby={error() ? 'auth-password-error' : undefined}
        onInput={(e) => {
          setError('');
          setPassword(e.currentTarget.value);
        }}
        required
      />
      <button type='submit' disabled={busy()}>
        {mode() === 'signup' ? t('auth.sign_up') : t('auth.sign_in')}
      </button>

      <button
        class={styles.modeToggle}
        type='button'
        onClick={() => {
          setError('');
          setMode(mode() === 'signup' ? 'signin' : 'signup');
        }}
      >
        {mode() === 'signup'
          ? t('auth.toggle.to_signin')
          : t('auth.toggle.to_signup')}
      </button>

      <Show when={error()}>
        <small id='auth-password-error' class={styles.error} role='alert'>
          {error()}
        </small>
      </Show>
    </form>
  );
}
