/**
 * Attaches drag-and-drop file detection to an element.
 * Toggles a `dragover` attribute on the element while files are dragged over it.
 * Calls `onDrop` with a FileList when files are dropped.
 * Returns a cleanup function to remove all listeners.
 *
 * @param {HTMLElement} element - The drop target element.
 * @param {(files: FileList) => void} onDrop - Called with the dropped FileList.
 * @param {Object} [options]
 * @param {string} [options.accept] - Comma-separated MIME types or extensions to filter (e.g. "image/*,.pdf").
 * @returns {() => void} cleanup - Call to remove all attached listeners.
 */
export function onFileDrop(element, onDrop, options = {}) {
  if (!element || typeof onDrop !== 'function') {
    throw new Error('onFileDrop: valid element and onDrop callback required');
  }

  const { accept } = options;

  let dragCounter = 0;

  function hasFiles(e) {
    return [...e.dataTransfer.items].some((i) => i.kind === 'file');
  }

  function handleDragEnter(e) {
    if (!hasFiles(e)) return;
    e.preventDefault();
    dragCounter++;
    if (dragCounter === 1) element.setAttribute('dragover', '');
  }

  function handleDragOver(e) {
    if (!hasFiles(e)) return;
    e.preventDefault();
  }

  function handleDragLeave() {
    dragCounter--;
    if (dragCounter <= 0) {
      dragCounter = 0;
      element.removeAttribute('dragover');
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    dragCounter = 0;
    element.removeAttribute('dragover');

    const files = e.dataTransfer.files;
    if (!files.length) return;

    if (accept) {
      const dt = new DataTransfer();
      for (const file of files) {
        if (matchesAccept(file, accept)) dt.items.add(file);
      }
      if (dt.files.length) onDrop(dt.files);
    } else {
      onDrop(files);
    }
  }

  element.addEventListener('dragenter', handleDragEnter);
  element.addEventListener('dragover', handleDragOver);
  element.addEventListener('dragleave', handleDragLeave);
  element.addEventListener('drop', handleDrop);

  return function cleanup() {
    element.removeEventListener('dragenter', handleDragEnter);
    element.removeEventListener('dragover', handleDragOver);
    element.removeEventListener('dragleave', handleDragLeave);
    element.removeEventListener('drop', handleDrop);
    element.removeAttribute('dragover');
  };
}

/**
 * @param {File} file
 * @param {string} accept - Comma-separated rules, e.g. "image/*,.pdf,video/mp4"
 */
function matchesAccept(file, accept) {
  return accept.split(',').some((rule) => {
    rule = rule.trim();
    if (!rule) return false;
    if (rule.startsWith('.'))
      return file.name.toLowerCase().endsWith(rule.toLowerCase());
    if (rule.endsWith('/*')) return file.type.startsWith(rule.slice(0, -1));
    return file.type === rule;
  });
}
