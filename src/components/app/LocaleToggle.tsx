import { useI18n } from '../../shared/i18n';
import styles from './Footer.module.css';

export default function LocaleToggle() {
  const { locale, setLocale } = useI18n();

  async function toggleLocale() {
    const nextLocale = locale() === 'en' ? 'is' : 'en';
    setLocale(nextLocale);
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
