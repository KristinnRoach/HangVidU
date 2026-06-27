import { createEffect, createSignal, on } from 'solid-js';
import Modal from '../../../components/dialogs/Modal';
import { validateUsername } from '../../../auth/password-auth.js';
import { useI18n } from '../../../shared/i18n';
import {
  claimUsername,
  getPublicUserProfile,
  suggestHandle,
} from '../../../stores/userDirectoryStore.js';
import styles from './HandleClaimPrompt.module.css';

type UserLike = {
  uid?: string;
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
};

function storageKey(uid: string) {
  return `handle-claim-dismissed:${uid}`;
}

export default function HandleClaimPrompt(props: { user: UserLike | null }) {
  const { t } = useI18n();
  const [open, setOpen] = createSignal(false);
  const [handle, setHandle] = createSignal('');
  const [message, setMessage] = createSignal('');
  const [saving, setSaving] = createSignal(false);

  createEffect(
    on(
      () => props.user?.uid,
      async (uid) => {
        setOpen(false);
        setMessage('');
        if (!uid || localStorage.getItem(storageKey(uid))) return;
        // Dormant settings-slice candidate; not mounted in the current app.
        try {
          const profile = await getPublicUserProfile(uid);
          setHandle(profile?.username || suggestHandle(props.user ?? {}));
          setOpen(true);
        } catch (error) {
          console.warn('[HandleClaimPrompt] profile lookup failed:', error);
        }
      },
    ),
  );

  async function save() {
    const user = props.user;
    if (!user?.uid || saving()) return;
    const next = handle().trim().toLowerCase();
    const validation = validateUsername(next);
    if (validation) {
      setMessage(t('auth.error.username_invalid'));
      return;
    }

    setSaving(true);
    setMessage('');
    try {
      await claimUsername(user, next);
      localStorage.setItem(storageKey(user.uid), '1');
      setOpen(false);
    } catch (error) {
      if ((error as { status?: number })?.status === 409) {
        const suffix = Math.floor(Math.random() * 90 + 10).toString();
        setHandle(suggestHandle(user, suffix));
        setMessage(t('auth.error.username_taken'));
        return;
      }
      console.error('[HandleClaimPrompt] claim failed:', error);
      setMessage(t('shared.error'));
    } finally {
      setSaving(false);
    }
  }

  function dismiss() {
    const uid = props.user?.uid;
    if (uid) localStorage.setItem(storageKey(uid), '1');
    setOpen(false);
  }

  return (
    <Modal
      open={open()}
      onOpenChange={(next) => (next ? setOpen(true) : dismiss())}
      title={t('handle.claim.title')}
    >
      <form
        class={styles.form}
        onSubmit={(event) => {
          event.preventDefault();
          void save();
        }}
      >
        <div class={styles.row}>
          <input
            value={handle()}
            onInput={(event) => setHandle(event.currentTarget.value)}
            autocomplete='username'
            autocapitalize='none'
            aria-label={t('handle.claim.input')}
          />
          <button type='submit' disabled={saving()}>
            {saving() ? t('shared.saving') : t('shared.save')}
          </button>
        </div>
        <p class={styles.message} role='status'>
          {message()}
        </p>
        <div class={styles.actions}>
          <button type='button' onClick={dismiss} disabled={saving()}>
            {t('shared.dismiss')}
          </button>
        </div>
      </form>
    </Modal>
  );
}
