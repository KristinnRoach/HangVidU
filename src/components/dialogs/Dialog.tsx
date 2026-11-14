import { Dialog as KDialog } from '@kobalte/core/dialog';
import { X } from 'lucide-solid';
import { Show, type JSX, type ParentProps } from 'solid-js';
import { useI18n } from '@shared/i18n';

type DialogProps = ParentProps<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: JSX.Element;
  description?: JSX.Element;
  footer?: JSX.Element;
}>;

// Kobalte owns focus trapping, Escape/outside dismissal, scroll locking and
// aria wiring; this component only supplies layout and styling.
export default function Dialog(props: DialogProps) {
  const { t } = useI18n();
  // Kobalte only restores focus to a Dialog.Trigger; these dialogs are opened
  // by props, so return focus to whatever opened them.
  let returnFocus: HTMLElement | null = null;

  return (
    <KDialog open={props.open} onOpenChange={props.onOpenChange}>
      <KDialog.Portal>
        <KDialog.Overlay class='fixed inset-0 z-(--z-modal) bg-black/45' />
        <div class='fixed inset-0 z-(--z-modal) flex items-center justify-center p-4'>
          <KDialog.Content
            onOpenAutoFocus={() => {
              returnFocus = document.activeElement as HTMLElement | null;
            }}
            onCloseAutoFocus={(event) => {
              if (!returnFocus?.isConnected) return;
              event.preventDefault();
              returnFocus.focus();
            }}
            class='flex max-h-full w-full max-w-lg flex-col gap-3 overflow-auto rounded-lg bg-bg-primary p-4 text-text-primary shadow-lg'
          >
            <header class='flex items-center justify-between gap-4'>
              <KDialog.Title class='m-0 text-lg font-semibold'>
                {props.title}
              </KDialog.Title>
              <KDialog.CloseButton
                class='rounded-md p-1 text-text-secondary hover:bg-bg-brighter hover:text-text-primary focus-visible:outline-2 focus-visible:outline-primary'
                aria-label={t('shared.close')}
              >
                <X size={20} />
              </KDialog.CloseButton>
            </header>
            <Show when={props.description}>
              <KDialog.Description class='m-0 text-sm text-text-secondary'>
                {props.description}
              </KDialog.Description>
            </Show>
            {props.children}
            <Show when={props.footer}>
              <footer class='flex justify-end gap-2'>{props.footer}</footer>
            </Show>
          </KDialog.Content>
        </div>
      </KDialog.Portal>
    </KDialog>
  );
}
