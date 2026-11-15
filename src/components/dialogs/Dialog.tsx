import { Dialog as KDialog } from '@kobalte/core/dialog';
import { X } from 'lucide-solid';
import { Show, type JSX, type ParentProps } from 'solid-js';
import { useI18n } from '@shared/i18n';

type DialogProps = ParentProps<{
  open: boolean;
  /**
   * Called when the user dismisses the dialog (close button, Escape, outside
   * press). Omit it for a dialog that must be answered through its own
   * actions: it then has no close button and is announced as an alert dialog.
   */
  onOpenChange?: (open: boolean) => void;
  title: JSX.Element;
  description?: JSX.Element;
  /** Action buttons, right-aligned below the body. */
  footer?: JSX.Element;
  /** Size to the content (up to the viewport) instead of a reading width. */
  wide?: boolean;
}>;

// Kobalte owns focus trapping, Escape/outside dismissal, scroll locking and
// aria wiring; this component only supplies layout and styling.
export default function Dialog(props: DialogProps) {
  const { t } = useI18n();
  // Kobalte only restores focus to a Dialog.Trigger; these dialogs are opened
  // by props, so return focus to whatever opened them.
  let returnFocus: HTMLElement | null = null;
  let content!: HTMLDivElement;

  return (
    <KDialog open={props.open} onOpenChange={props.onOpenChange}>
      <KDialog.Portal>
        <KDialog.Overlay class='fixed inset-0 z-(--z-modal) bg-black/60' />
        <div class='fixed inset-0 z-(--z-modal) flex items-center justify-center p-4'>
          <KDialog.Content
            ref={content}
            role={props.onOpenChange ? 'dialog' : 'alertdialog'}
            onOpenAutoFocus={(event) => {
              returnFocus = document.activeElement as HTMLElement | null;
              // An unrequested dialog (incoming call) must not put a button
              // under a key the user was already pressing.
              if (props.onOpenChange) return;
              event.preventDefault();
              // Let Kobalte pause the underlying dialog's focus trap first.
              queueMicrotask(() => {
                if (content.isConnected && props.open) content.focus();
              });
            }}
            onCloseAutoFocus={(event) => {
              if (!returnFocus?.isConnected) return;
              event.preventDefault();
              returnFocus.focus();
            }}
            class={`flex max-h-full flex-col gap-3 overflow-auto rounded-lg border border-border-primary bg-bg-primary p-4 text-text-primary shadow-lg outline-none ${props.wide ? 'max-w-full' : 'w-full max-w-lg'}`}
          >
            <header class='flex items-center justify-between gap-4'>
              <KDialog.Title class='m-0 min-w-0 wrap-anywhere text-lg font-semibold'>
                {props.title}
              </KDialog.Title>
              <Show when={props.onOpenChange}>
                <KDialog.CloseButton
                  class='shrink-0 rounded-md p-1 text-text-secondary hover:bg-bg-brighter hover:text-text-primary focus-visible:outline-2 focus-visible:outline-primary'
                  aria-label={t('shared.close')}
                >
                  <X size={20} />
                </KDialog.CloseButton>
              </Show>
            </header>
            <Show when={props.description}>
              <KDialog.Description class='m-0 text-sm text-text-secondary'>
                {props.description}
              </KDialog.Description>
            </Show>
            {props.children}
            <Show when={props.footer}>
              <footer class='flex flex-wrap justify-end gap-2'>
                {props.footer}
              </footer>
            </Show>
          </KDialog.Content>
        </div>
      </KDialog.Portal>
    </KDialog>
  );
}
