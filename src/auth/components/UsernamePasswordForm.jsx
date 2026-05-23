import { Show, createSignal } from 'solid-js';
import {
  signInWithUsernameOrEmail,
  signUpWithUsername,
} from '../password-auth.js';
import styles from './UsernamePasswordForm.module.css';

// Minimal sign-up / sign-in form. No dedicated styles yet — uses semantic
// elements + native browser defaults. Replace with the chosen design when
// the sustainable auth-UI strategy is picked.
export default function UsernamePasswordForm() {
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
      setError(err?.code || err?.message || 'failed');
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
            placeholder='username or email'
            autocomplete='username'
            value={identifier()}
            onInput={(e) => setIdentifier(e.currentTarget.value)}
            required
          />
        }
      >
        <input
          type='text'
          placeholder='username (a-z, 0-9, _)'
          autocomplete='username'
          value={username()}
          onInput={(e) => setUsername(e.currentTarget.value)}
          required
        />
        <input
          type='email'
          placeholder='email (optional)'
          autocomplete='email'
          value={email()}
          onInput={(e) => setEmail(e.currentTarget.value)}
        />
        <input
          type='text'
          placeholder='display name (optional)'
          autocomplete='nickname'
          value={displayName()}
          onInput={(e) => setDisplayName(e.currentTarget.value)}
        />
      </Show>
      <input
        type='password'
        placeholder='password (min 8)'
        autocomplete={mode() === 'signup' ? 'new-password' : 'current-password'}
        value={password()}
        onInput={(e) => setPassword(e.currentTarget.value)}
        required
      />
      <button type='submit' disabled={busy()}>
        {mode() === 'signup' ? 'Sign up' : 'Sign in'}
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
          ? 'Have an account? Sign in'
          : 'No account? Sign up'}
      </button>

      <Show when={error()}>
        <small class={styles.error}>{error()}</small>
      </Show>
    </form>
  );
}
