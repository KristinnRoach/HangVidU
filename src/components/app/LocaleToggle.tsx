import { useI18n } from '../../shared/i18n';

export default function LocaleToggle() {
  const { locale, setLocale } = useI18n();

  async function toggleLocale() {
    const nextLocale = locale() === 'en' ? 'is' : 'en';
    setLocale(nextLocale);
  }

  return (
    <button
      id="toggle-lang-btn"
      class="absolute bottom-1 left-2 z-(--z-high) cursor-pointer px-2.5 py-[5px] text-xs font-bold whitespace-nowrap text-text-secondary
        hover:border-primary hover:bg-transparent hover:text-text-primary hover:shadow-[0_2px_8px_rgb(0_0_0/25%)] hover:outline-1 hover:outline-primary-subtle hover:outline-offset-2
        focus-visible:border-primary focus-visible:bg-transparent focus-visible:text-text-primary focus-visible:shadow-[0_2px_8px_rgb(0_0_0/25%)] focus-visible:outline-1 focus-visible:outline-primary-subtle focus-visible:outline-offset-2"
      type="button"
      onClick={toggleLocale}
    >
      🌐 {locale().toUpperCase()}
    </button>
  );
}
