import { useI18n } from '@shared/i18n/index.js';

const linkClass = 'text-neutral-400 hover:text-neutral-200 hover:underline';

export default function LegalFooter() {
  const { t } = useI18n();

  return (
    <footer
      id='legal-footer'
      class='absolute right-3 bottom-2 flex items-center gap-2 text-xs text-neutral-400'
    >
      <a
        class={linkClass}
        href='mailto:kristinnroach@gmail.com?subject=HangVidU%20support'
      >
        {t('home.contact')}: kristinnroach@gmail.com
      </a>
      <span class='text-neutral-600'>&bull;</span>
      <a
        class={linkClass}
        href='/privacy-policy.html'
        target='_blank'
        rel='noopener noreferrer'
        title={t('nav.privacy')}
        aria-label={t('nav.privacy')}
      >
        {t('nav.privacy.short')}
      </a>
      <span class='text-neutral-600'>&bull;</span>
      <a
        class={linkClass}
        href='/terms-of-service.html'
        target='_blank'
        rel='noopener noreferrer'
        title={t('nav.terms')}
        aria-label={t('nav.terms')}
      >
        {t('nav.terms.short')}
      </a>
    </footer>
  );
}
