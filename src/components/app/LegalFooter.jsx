import { useI18n } from '../../shared/i18n/index.js';

export default function LegalFooter() {
  const { t } = useI18n();

  return (
    <footer id='legal-footer' class='legal-footer'>
      <a
        class='legal-footer-link'
        href='/privacy-policy.html'
        target='_blank'
        rel='noopener noreferrer'
        title={t('nav.privacy')}
        aria-label={t('nav.privacy')}
      >
        {t('nav.privacy.short')}
      </a>
      <span class='legal-footer-separator'>&bull;</span>
      <a
        class='legal-footer-link'
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
