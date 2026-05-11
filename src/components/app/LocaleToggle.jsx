import { useI18n } from '../../shared/i18n/index.js';

export default function LocaleToggle() {
  const { locale, setLocale } = useI18n();

  async function toggleLocale() {
    await setLocale(locale() === 'en' ? 'is' : 'en');
  }

  return (
    <button id='toggle-lang-btn' type='button' onClick={toggleLocale}>
      🌐 {locale().toUpperCase()}
    </button>
  );
}
