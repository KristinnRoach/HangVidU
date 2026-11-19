import { Toast, toaster } from '@kobalte/core/toast';
import { Check, CircleAlert, Info, X } from 'lucide-solid';
import { onCleanup, splitProps, type ComponentProps, type JSX } from 'solid-js';
import { Dynamic, Portal } from 'solid-js/web';
import { t } from '@shared/i18n';
import Button from '../Button';

const tones = {
  info: { icon: Info, color: 'text-primary' },
  success: { icon: Check, color: 'text-success' },
  error: { icon: CircleAlert, color: 'text-danger' },
};

type ToastOptions = {
  tone?: keyof typeof tones;
  duration?: number;
  action?: { label: string; run: () => void };
};

function ToastItem(
  props: Omit<ComponentProps<'li'>, 'onKeyDown'> & {
    onKeyDown?: JSX.EventHandler<HTMLLIElement, KeyboardEvent>;
  },
) {
  const [local, rest] = splitProps(props, ['onKeyDown']);

  // Let the focused toast handle Escape before a dialog's document listener.
  return <li {...rest} on:keydown={local.onKeyDown} />;
}

export function showToast(
  message: string,
  { tone = 'info', duration, action }: ToastOptions = {},
) {
  const { icon, color } = tones[tone];

  toaster.show(({ toastId }) => (
    <Toast
      as={ToastItem}
      toastId={toastId}
      duration={duration}
      priority={tone === 'error' ? 'high' : 'low'}
      onEscapeKeyDown={(event) => event.stopPropagation()}
      class='flex items-start gap-2 rounded-lg border border-border-primary bg-bg-secondary p-3 text-sm text-text-primary shadow-md motion-safe:data-opened:animate-toast-in motion-safe:data-closed:not-data-[swipe=end]:animate-toast-out data-[swipe=move]:translate-y-(--kb-toast-swipe-move-y) data-[swipe=move]:select-none data-[swipe=cancel]:transition-[translate] motion-safe:data-[swipe=end]:animate-toast-swipe-out focus-visible:outline-2 focus-visible:outline-primary'
    >
      <Dynamic
        component={icon}
        size={18}
        class={`mt-0.5 shrink-0 ${color}`}
        aria-hidden='true'
      />
      <div class='min-w-0 flex-1'>
        <Toast.Title class='wrap-anywhere'>{message}</Toast.Title>
        {action && (
          <Toast.CloseButton
            as={Button}
            class='mt-2'
            aria-label={action.label}
            onClick={action.run}
          >
            {action.label}
          </Toast.CloseButton>
        )}
      </div>
      <Toast.CloseButton
        class='shrink-0 rounded-md p-1 text-text-secondary hover:bg-bg-brighter hover:text-text-primary focus-visible:outline-2 focus-visible:outline-primary'
        aria-label={t('shared.dismiss')}
      >
        <X size={16} aria-hidden='true' />
      </Toast.CloseButton>
    </Toast>
  ));
}

export function ToastHost() {
  onCleanup(toaster.clear);

  return (
    <Portal>
      <Toast.Region
        topLayer
        swipeDirection='up'
        duration={6000}
        aria-label={t('shared.toast_region')}
        class='fixed inset-x-4 bottom-[calc(max(2rem,env(safe-area-inset-bottom))+var(--call-controls-height,0px))] z-[calc(var(--z-modal)+1)] mx-auto max-w-sm'
      >
        <Toast.List class='m-0 flex list-none flex-col gap-2 p-0 empty:hidden' />
      </Toast.Region>
    </Portal>
  );
}
