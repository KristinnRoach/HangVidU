import { createEffect, onCleanup, onMount } from 'solid-js';
import { initOneTap, renderGoogleSignInButton } from '../onetap.js';
import { useI18n } from '../../shared/i18n/index.js';

export default function GoogleSignInButton() {
  const { locale } = useI18n();
  let buttonContainer;
  let isDisposed = false;
  let isMounted = false;

  async function renderButton() {
    if (!buttonContainer) return;

    await initOneTap();
    if (isDisposed) return;

    renderGoogleSignInButton(buttonContainer, {
      text: 'signin_with',
      size: 'medium',
      shape: 'pill',
      // theme: 'filled_black',
      // width: '240',
    });
  }

  onMount(() => {
    isMounted = true;

    renderButton().catch((error) => {
      console.warn('[GoogleSignInButton] render failed:', error);
    });

    onCleanup(() => {
      isDisposed = true;
      buttonContainer?.replaceChildren();
    });
  });

  createEffect(() => {
    locale();
    if (!isMounted) return;

    renderButton().catch((error) => {
      console.warn('[GoogleSignInButton] render failed:', error);
    });
  });

  return <div class="gsi-button-container" ref={buttonContainer} />;
}
