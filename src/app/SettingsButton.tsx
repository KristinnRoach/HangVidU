import { createSignal, For } from 'solid-js';
import { Settings } from 'lucide-solid';

import { useI18n, type Locale } from '@shared/i18n';

import Dialog from '../components/dialogs/Dialog';

// Language names stay in their own language so a user can find theirs
// regardless of the current locale.
const LANGUAGES: { locale: Locale; name: string }[] = [
  { locale: 'en', name: 'English' },
  { locale: 'is', name: 'Íslenska' },
];

function LanguageSetting() {
  const { t, locale, setLocale } = useI18n();

  return (
    <fieldset class='m-0 flex flex-col gap-2 border-0 p-0'>
      <legend class='mb-2 p-0 text-sm font-medium text-text-secondary'>
        {t('settings.language')}
      </legend>
      <For each={LANGUAGES}>
        {(language) => (
          <label class='flex items-center gap-3 text-sm text-text-primary'>
            <input
              type='radio'
              name='settings-language'
              value={language.locale}
              class='size-4 shrink-0 cursor-pointer accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
              checked={locale() === language.locale}
              onChange={() => setLocale(language.locale)}
            />
            <span lang={language.locale}>{language.name}</span>
          </label>
        )}
      </For>
    </fieldset>
  );
}

export default function SettingsButton() {
  const { t } = useI18n();
  const [open, setOpen] = createSignal(false);

  return (
    <>
      <button
        type='button'
        title={t('settings.title')}
        aria-label={t('settings.title')}
        aria-haspopup='dialog'
        onClick={(event) => {
          // Safari can click a button without focusing it. Dialog restores
          // focus to the element that was active when it opened.
          event.currentTarget.focus();
          setOpen(true);
        }}
      >
        <Settings />
      </button>
      <Dialog open={open()} onOpenChange={setOpen} title={t('settings.title')}>
        <LanguageSetting />
      </Dialog>
    </>
  );
}
