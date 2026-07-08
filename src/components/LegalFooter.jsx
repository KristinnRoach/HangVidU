import { useI18n } from '@shared/i18n/index.js';

export default function LegalFooter() {
  const { t } = useI18n();

  return (
    <footer
      id="legal-footer"
      class="absolute right-2 bottom-1 z-0 flex h-7 items-center justify-center gap-1.5 rounded-[10px] bg-transparent px-2.5 py-[5px] font-sans text-xs font-[325] pointer-events-none
        hover:pointer-events-auto hover:text-neutral-200 hover:opacity-90 hover:shadow-[0_2px_8px_rgb(0_0_0/25%)] hover:outline-1 hover:outline-primary-subtle hover:outline-offset-2
        focus-within:pointer-events-auto focus-within:opacity-90"
      aria-label={t('nav.legal_links')}
    >
      <a
        class="pointer-events-auto text-neutral-300/80 no-underline hover:text-neutral-200 hover:underline"
        href="/privacy-policy.html"
        target="_blank"
        rel="noopener noreferrer"
        title={t('nav.privacy')}
        aria-label={t('nav.privacy')}
      >
        {t('nav.privacy.short')}
      </a>
      <span class="pointer-events-none cursor-none text-neutral-500">
        &bull;
      </span>
      <a
        class="pointer-events-auto text-neutral-300/80 no-underline hover:text-neutral-200 hover:underline"
        href="/terms-of-service.html"
        target="_blank"
        rel="noopener noreferrer"
        title={t('nav.terms')}
        aria-label={t('nav.terms')}
      >
        {t('nav.terms.short')}
      </a>
    </footer>
  );
}
