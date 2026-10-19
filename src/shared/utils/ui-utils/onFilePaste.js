/**
 * Forward user-pasted files as File[]; callers decide when they own paste.
 * Returns a cleanup function, matching onFileDrop.
 * @param {Document | HTMLElement} target
 * @param {(files: File[]) => void} onFiles
 * @param {(event: ClipboardEvent) => boolean} shouldHandle
 * @returns {() => void}
 */
export function onFilePaste(target, onFiles, shouldHandle) {
  /** @param {ClipboardEvent} event */
  function handlePaste(event) {
    if (event.defaultPrevented || !shouldHandle(event)) return;
    const files = Array.from(event.clipboardData?.files || []);
    if (!files.length) return;

    event.preventDefault();
    onFiles(files);
  }

  target.addEventListener('paste', handlePaste);
  return () => target.removeEventListener('paste', handlePaste);
}

/**
 * Keep document-level paste out of dialogs and unrelated editors.
 * @param {ClipboardEvent} event
 * @param {HTMLElement | undefined} scope
 * @param {HTMLElement | undefined} input
 * @returns {boolean}
 */
export function acceptsFilePasteTarget(event, scope, input) {
  const target = event.composedPath()[0];
  if (
    document.querySelector(
      'dialog[open], [role="dialog"], [role="alertdialog"]',
    )
  )
    return false;
  if (!(target instanceof Element)) return target === document;
  if (
    target.closest(
      'input, textarea, [contenteditable]:not([contenteditable="false"])',
    )
  )
    return target === input;
  return (
    target === document.body ||
    target === document.documentElement ||
    !!scope?.contains(target)
  );
}
