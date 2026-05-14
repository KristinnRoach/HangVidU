import { t } from '.';

// i18n attributes configuration: { elementId: { attrs: ['attr1', 'attr2'], key: 'translation.key' } }
const i18nElements = {
  'exit-watch-mode-btn': { attrs: ['title'], key: 'media.exit_watch' },
  'camera-btn': { attrs: ['aria-label'], key: 'a11y.camera_toggle' },
  'switch-camera-btn': { attrs: ['aria-label'], key: 'a11y.camera_switch' },
  'mic-btn': { attrs: ['aria-label'], key: 'a11y.mic_toggle' },
  'mute-btn': { attrs: ['aria-label'], key: 'a11y.partner_mute' },
  'fullscreen-partner-btn': { attrs: ['aria-label'], key: 'a11y.fullscreen' },
};

/**
 * Update all i18n element attributes based on current locale
 */
export function updateI18nElements() {
  Object.entries(i18nElements).forEach(([elementId, { attrs, key }]) => {
    const el = document.getElementById(elementId);
    if (!el) return;
    const translation = t(key);
    attrs.forEach((attr) => {
      el.setAttribute(attr, translation);
    });
  });
}
