import { Plus, Info } from 'lucide-solid';
import { createSignal, onCleanup, onMount, Show } from 'solid-js';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const isIOS = () =>
  /iphone|ipad|ipod/i.test(navigator.userAgent) &&
  !(window as unknown as { MSStream?: unknown }).MSStream;

const isStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches ||
  (window.navigator as unknown as { standalone?: boolean }).standalone === true;

export default function InstallButton() {
  const [evt, setEvt] = createSignal<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = createSignal(isStandalone());

  onMount(() => {
    const ac = new AbortController();
    const opts = { signal: ac.signal };

    window.addEventListener(
      'beforeinstallprompt',
      (e) => {
        e.preventDefault();
        setEvt(e as BeforeInstallPromptEvent);
      },
      opts,
    );
    window.addEventListener(
      'appinstalled',
      () => {
        setInstalled(true);
        setEvt(null);
      },
      opts,
    );

    onCleanup(() => ac.abort());
  });

  const onClick = async () => {
    if (isIOS()) {
      alert("Tap Share, then 'Add to Home Screen' to install.");
      return;
    }
    const e = evt();
    if (!e) return;
    await e.prompt();
    await e.userChoice;
    setEvt(null);
  };

  return (
    <Show when={!installed() && (isIOS() || evt())}>
      <button
        type="button"
        title={isIOS() ? 'Show install instructions' : 'Install app'}
        onClick={onClick}
      >
        {isIOS() ? <Info size={18} /> : <Plus size={18} />}
      </button>
    </Show>
  );
}
