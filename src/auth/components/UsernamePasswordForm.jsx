import { Show, createSignal } from 'solid-js';
import {
  signInWithUsernameOrEmail,
  signUpWithUsername,
} from '../password-auth.js';
import { resolveErrorLookupKey } from '../shared/auth-error-codes.js';
import { useI18n } from '@shared/i18n/index.js';
import Button from '../../components/Button';
import TextField from '../../components/TextField';

const FRIENDLY_ERROR_KEYS = {
  // Domain codes thrown by password-auth.
  account_has_no_username: 'auth.error.invalid_credentials',
  identifier_required: 'auth.error.identifier_required',
  no_account_for_email: 'auth.error.invalid_credentials',
  password_required: 'auth.error.password_required',
  password_too_short: 'auth.error.password_too_short',
  username_invalid: 'auth.error.username_invalid',
  username_required: 'auth.error.username_required',
  username_taken: 'auth.error.username_taken',
  // Normalized Firebase codes (see normalizeAuthErrorCode).
  'email-already-in-use': 'auth.error.username_taken',
  'invalid-credentials': 'auth.error.invalid_credentials',
};

function getFriendlyAuthErrorKey(error) {
  return (
    FRIENDLY_ERROR_KEYS[resolveErrorLookupKey(error)] || 'auth.error.generic'
  );
}

export default function UsernamePasswordForm() {
  const { t } = useI18n();
  const [mode, setMode] = createSignal('signin'); // 'signin' | 'signup'
  const [identifier, setIdentifier] = createSignal('');
  const [username, setUsername] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [displayName, setDisplayName] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [error, setError] = createSignal('');
  const [busy, setBusy] = createSignal(false);

  // Editing any field clears the previous attempt's error.
  const edit = (set) => (value) => {
    setError('');
    set(value);
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (busy()) return;
    setError('');
    setBusy(true);
    try {
      if (mode() === 'signup') {
        await signUpWithUsername({
          username: username(),
          password: password(),
          email: email() || null,
          displayName: displayName() || username(),
        });
      } else {
        await signInWithUsernameOrEmail({
          identifier: identifier(),
          password: password(),
        });
      }
    } catch (err) {
      setError(t(getFriendlyAuthErrorKey(err)));
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} class='flex w-full flex-col gap-3'>
      <Show
        when={mode() === 'signup'}
        fallback={
          <TextField
            label={t('auth.placeholder.identifier')}
            hideLabel
            placeholder={t('auth.placeholder.identifier')}
            autocomplete='username'
            autocapitalize='none'
            value={identifier()}
            onChange={edit(setIdentifier)}
            required
          />
        }
      >
        <TextField
          label={t('auth.placeholder.username')}
          hideLabel
          placeholder={t('auth.placeholder.username')}
          autocomplete='username'
          autocapitalize='none'
          value={username()}
          onChange={edit(setUsername)}
          required
        />
        <TextField
          type='email'
          label={t('auth.placeholder.email')}
          hideLabel
          placeholder={t('auth.placeholder.email')}
          autocomplete='email'
          value={email()}
          onChange={edit(setEmail)}
        />
        <TextField
          label={t('auth.placeholder.display_name')}
          hideLabel
          placeholder={t('auth.placeholder.display_name')}
          autocomplete='nickname'
          value={displayName()}
          onChange={edit(setDisplayName)}
        />
      </Show>
      <TextField
        type='password'
        label={t('auth.placeholder.password')}
        hideLabel
        placeholder={t('auth.placeholder.password')}
        autocomplete={mode() === 'signup' ? 'new-password' : 'current-password'}
        value={password()}
        onChange={edit(setPassword)}
        error={error()}
        required
      />
      <Button type='submit' variant='primary' loading={busy()}>
        {mode() === 'signup' ? t('auth.sign_up') : t('auth.sign_in')}
      </Button>
      <Button
        variant='ghost'
        disabled={busy()}
        onClick={() => {
          setError('');
          setMode(mode() === 'signup' ? 'signin' : 'signup');
        }}
      >
        {mode() === 'signup'
          ? t('auth.toggle.to_signin')
          : t('auth.toggle.to_signup')}
      </Button>
    </form>
  );
}
