import { useI18n } from '../../shared/i18n/index.js';
import styles from './Footer.module.css';

export default function LocaleToggle() {
  const { locale, setLocale } = useI18n();

  async function toggleLocale() {
    await setLocale(locale() === 'en' ? 'is' : 'en');
  }

  return (
    <button
      id='toggle-lang-btn'
      class={styles.localeToggle}
      type='button'
      onClick={toggleLocale}
    >
      🌐 {locale().toUpperCase()}
    </button>
  );
}
