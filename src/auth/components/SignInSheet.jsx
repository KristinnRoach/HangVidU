import { Show, createSignal } from 'solid-js';
import { LogIn } from 'lucide-solid';
import { useI18n } from '../../shared/i18n/index.js';
import GoogleSignInButton from './GoogleSignInButton.jsx';
import UsernamePasswordForm from './UsernamePasswordForm.jsx';
import LegalFooter from '../../components/app/LegalFooter.jsx';
import LocaleToggle from '../../components/app/LocaleToggle.jsx';
import styles from './SignInSheet.module.css';

// Minimal sign-in sheet. Primary provider (Google) is shown first; password
// flow is opt-in to keep the default view compact. Add new providers by
// dropping their button into the `.providersSection` grid.
export default function SignInSheet() {
  const { t } = useI18n();
  const [showPassword, setShowPassword] = createSignal(false);
  let dialogRef;

  return (
    <>
      <button
        type='button'
        class={styles.openButton}
        aria-label={t('auth.sign_in')}
        title={t('auth.sign_in')}
        onClick={() => dialogRef.showModal()}
      >
        <LogIn />
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby='signin-sheet-title'
        class={styles.signInSheetModal}
      >
        <div class={styles.content}>
          <div class={styles.header}>
            <h2 id='signin-sheet-title' class={styles.title}>
              {t('auth.sign_in')}
            </h2>
            {/* <h3 id='signin-sheet-description' class={styles.description}>
              Continue with a provider <br /> or use a username + password.
            </h3> */}
          </div>

          <div class={styles.divider}></div>

          <section class={styles.providersSection}>
            <GoogleSignInButton />
          </section>

          <div class={styles.divider}>{t('word.or')}</div>

          <section class={styles.passwordSection}>
            <Show
              when={showPassword()}
              fallback={
                <button
                  type='button'
                  class={styles.passwordToggle}
                  onClick={() => setShowPassword(true)}
                >
                  {t('auth.continue_with_username')}
                </button>
              }
            >
              <UsernamePasswordForm />
            </Show>
          </section>

          <form method='dialog'>
            <button class={styles.closeBtn} aria-label='Close'>
              &times;
            </button>
          </form>

          <div class={styles.divider}></div>

          <LegalFooter />
          <LocaleToggle />
        </div>
      </dialog>
    </>
  );
}
