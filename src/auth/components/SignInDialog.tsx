import { Show, createSignal, onCleanup } from 'solid-js';
import { useI18n } from '@shared/i18n';
import Button from '../../components/Button';
import Dialog from '../../components/dialogs/Dialog';
import LegalFooter from '../../components/LegalFooter';
import LocaleToggle from '../../components/LocaleToggle';
import GoogleSignInButton from './GoogleSignInButton';
import UsernamePasswordForm from './UsernamePasswordForm';

const [open, setOpen] = createSignal(false);

/** Opens the sign-in dialog from any login entry point. */
export const openSignIn = () => setOpen(true);

// Primary provider (Google) is shown first; the password flow is opt-in to
// keep the default view compact. Mounted once, while signed out.
export default function SignInDialog() {
  const { t } = useI18n();
  const [showPassword, setShowPassword] = createSignal(false);
  onCleanup(() => setOpen(false));

  return (
    <Dialog open={open()} onOpenChange={setOpen} title={t('auth.sign_in')}>
      <div class='flex flex-col items-center gap-4 pt-2 pb-4 border-b border-b-border-primary'>
        <GoogleSignInButton />

        <div class='flex w-full items-center gap-2 text-sm text-text-secondary before:h-px before:flex-1 before:bg-border-primary after:h-px after:flex-1 after:bg-border-primary'>
          {t('word.or')}
        </div>

        <Show
          when={showPassword()}
          fallback={
            <Button variant='ghost' onClick={() => setShowPassword(true)}>
              {t('auth.continue_with_username')}
            </Button>
          }
        >
          <div class='w-full max-w-xs'>
            <UsernamePasswordForm />
          </div>
        </Show>
      </div>

      {/* Both controls pin themselves to the bottom corners of this row. */}
      <div class='flex justify-between h-8'>
        <LocaleToggle />
        <LegalFooter />
      </div>
    </Dialog>
  );
}
