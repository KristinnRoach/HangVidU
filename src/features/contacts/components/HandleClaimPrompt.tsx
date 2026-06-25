import { createEffect, createSignal, on } from 'solid-js';
import Modal from '../../../components/dialogs/Modal';
import { validateUsername } from '../../../auth/password-auth.js';
import { useI18n } from '../../../shared/i18n';
import {
  claimUsername,
  getPublicUserProfile,
} from '../../../stores/userDirectoryStore.js';
import styles from './HandleClaimPrompt.module.css';

type UserLike = {
  uid?: string;
  userName?: string | null;
  email?: string | null;
  photoURL?: string | null;
};

function storageKey(uid: string) {
  return `handle-claim-dismissed:${uid}`;
}

function suggestHandle(user: UserLike, suffix = '') {
  const source = user.userName || user.email?.split('@')[0] || user.uid || '';
  const base = source
    .toLowerCase()
    .replace(/[^a-z0-9_]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, Math.max(3, 20 - suffix.length));
  return `${(base || 'user').padEnd(3, '_')}${suffix}`.slice(0, 20);
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
        const profile = await getPublicUserProfile(uid);
        if (profile?.username) return;
        setHandle(suggestHandle(props.user ?? {}));
        setOpen(true);
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
