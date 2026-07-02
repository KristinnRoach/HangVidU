import { useI18n } from '../../shared/i18n/index.js';
import styles from './Footer.module.css';

export default function LegalFooter() {
  const { t } = useI18n();

  return (
    <footer
      id="legal-footer"
      class={styles.legalFooter}
      aria-label={t('nav.legal_links')}
    >
      <a
        class={styles.legalFooterLink}
        href="/privacy-policy.html"
        target="_blank"
        rel="noopener noreferrer"
        title={t('nav.privacy')}
        aria-label={t('nav.privacy')}
      >
        {t('nav.privacy.short')}
      </a>
      <span class={styles.legalFooterSeparator}>&bull;</span>
      <a
        class={styles.legalFooterLink}
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
