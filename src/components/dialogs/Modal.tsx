import { createEffect, createUniqueId, type JSX } from 'solid-js';
import styles from './Modal.module.css';

type ModalProps = {
  open: boolean;
  title: JSX.Element;
  children: JSX.Element;
  // layout: 'default' | 'centered' | 'drawer';
  onOpenChange?: (open: boolean) => void;
  onClose?: (returnValue: string) => void;
};

export default function Modal(props: ModalProps) {
  let modal!: HTMLDialogElement;
  const titleId = createUniqueId();

  const requestClose = (returnValue = '') => {
    modal.requestClose?.(returnValue) ?? modal.close(returnValue);
  };

  createEffect(() => {
    if (props.open && !modal.open) {
      modal.returnValue = '';
      modal.showModal();
    }

    if (!props.open && modal.open) {
      modal.close();
    }
  });

  return (
    <dialog
      ref={modal}
      class={styles.modal}
      aria-labelledby={titleId}
      onClose={() => {
        props.onOpenChange?.(false);
        props.onClose?.(modal.returnValue);
      }}
    >
      <header class={styles.header}>
        <h2 id={titleId} class={styles.title}>
          {props.title}
        </h2>

        <button
          type='button'
          class={styles.closeButton}
          aria-label='Close modal'
          onClick={() => requestClose('close')}
        >
          &times;
        </button>
      </header>

      <div class={styles.body}>{props.children}</div>
    </dialog>
  );
}

// export function TestModal() {
//   const [open, setOpen] = createSignal(false);
//   const [lastResult, setLastResult] = createSignal('');

//   return (
//     <main class='page'>
//       <button type='button' onClick={() => setOpen(true)}>
//         Open modal
//       </button>

//       {lastResult() && <p>Last result: {lastResult()}</p>}

//       <Modal
//         open={open()}
//         onOpenChange={setOpen}
//         title='Delete project?'
//         onClose={(value) => setLastResult(value || 'dismissed')}
//       >
//         <p>
//           This removes the project and its local metadata. This action cannot be
//           undone.
//         </p>

//         <footer class='modal__actions'>
//           <button type='button' onClick={() => setOpen(false)}>
//             Cancel
//           </button>

//           <button
//             type='button'
//             class='danger'
//             autofocus
//             onClick={() => {
//               // Run your destructive action here, then close.
//               setOpen(false);
//               setLastResult('confirmed');
//             }}
//           >
//             Delete
//           </button>
//         </footer>
//       </Modal>
//     </main>
//   );
// }
