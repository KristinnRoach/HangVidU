import { createEffect, onCleanup } from 'solid-js';
import { initOneTap, renderGoogleSignInButton } from '../onetap.js';
import { useI18n } from '@shared/i18n/index.js';

export default function GoogleSignInButton() {
  const { locale } = useI18n();
  let buttonContainer;

  createEffect(() => {
    locale();
    let disposed = false;

    initOneTap()
      .then(() => {
        if (disposed) return;
        renderGoogleSignInButton(buttonContainer, {
          text: 'signin_with',
          size: 'medium',
          shape: 'pill',
        });
      })
      .catch((error) => {
        console.warn('[GoogleSignInButton] render failed:', error);
      });

    onCleanup(() => {
      disposed = true;
      buttonContainer.replaceChildren();
      delete buttonContainer.dataset.gsiRendered;
    });
  });

  // The medium Google button is 32px high. Its temporary button and iframe
  // briefly coexist; their combined height must not resize the dialog.
  return <div class='h-8 w-60 max-w-full shrink-0' ref={buttonContainer} />;
}
