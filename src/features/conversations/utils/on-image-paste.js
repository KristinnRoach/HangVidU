/**
 * Forward user-pasted images as File[]; callers decide when they own paste.
 * Returns a cleanup function, matching onFileDrop.
 * @param {Document} target
 * @param {(files: File[]) => void} onFiles
 * @param {(event: ClipboardEvent) => boolean} shouldHandle
 * @returns {() => void}
 */
export function onImagePaste(target, onFiles, shouldHandle) {
  /** @param {ClipboardEvent} event */
  function handlePaste(event) {
    if (event.defaultPrevented || !shouldHandle(event)) return;
    const files = Array.from(event.clipboardData?.files || []).filter((file) =>
      file.type.toLowerCase().startsWith('image/'),
    );
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
 * @param {HTMLElement | undefined} panel
 * @param {HTMLTextAreaElement | undefined} composer
 * @returns {boolean}
 */
export function acceptsConversationPaste(event, panel, composer) {
  const target = event.composedPath()[0];
  if (document.querySelector('dialog[open], [role="dialog"], [role="alertdialog"]'))
    return false;
  if (!(target instanceof Element)) return target === document;
  if (target.closest('input, textarea, [contenteditable]:not([contenteditable="false"])'))
    return target === composer;
  return (
    target === document.body ||
    target === document.documentElement ||
    !!panel?.contains(target)
  );
}
