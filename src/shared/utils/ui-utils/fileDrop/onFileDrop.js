/**
 * Attaches drag-and-drop file detection to an element.
 * Toggles a `dragover` attribute on the element while files are dragged over it.
 * Calls `onDrop` with an array of File objects when files are dropped.
 * Returns a cleanup function to remove all listeners.
 *
 * @param {HTMLElement} element - The drop target element.
 * @param {(files: File[]) => void} onDrop - Called with the dropped files.
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
  let clearDragTimer = 0;

  function hasFiles(e) {
    const items = e && e.dataTransfer && e.dataTransfer.items;
    const files = e && e.dataTransfer && e.dataTransfer.files;

    if (files && files.length) return true;
    if (!items || typeof items.length !== 'number') return false;
    return Array.from(items).some((item) => item.kind === 'file');
  }

  function clearDragState() {
    dragCounter = 0;
    clearDragTimer = 0;
    element.removeAttribute('dragover');
  }

  function scheduleDragStateClear() {
    if (clearDragTimer) return;

    clearDragTimer = window.setTimeout(() => {
      if (dragCounter <= 0) clearDragState();
      else clearDragTimer = 0;
    }, 0);
  }

  function cancelDragStateClear() {
    if (!clearDragTimer) return;

    window.clearTimeout(clearDragTimer);
    clearDragTimer = 0;
  }

  function isInsideDropTarget(node) {
    return node instanceof Node && element.contains(node);
  }

  function handleDragEnter(e) {
    if (!hasFiles(e)) return;
    e.preventDefault();
    cancelDragStateClear();
    if (isInsideDropTarget(e.relatedTarget)) return;

    dragCounter++;
    if (dragCounter === 1) element.setAttribute('dragover', '');
  }

  function handleDragOver(e) {
    if (!hasFiles(e)) return;

    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
    if (dragCounter === 0) {
      dragCounter = 1;
      element.setAttribute('dragover', '');
    }
  }

  function handleDragLeave(e) {
    if (isInsideDropTarget(e.relatedTarget)) return;

    dragCounter--;
    if (dragCounter <= 0) {
      dragCounter = 0;
      scheduleDragStateClear();
    }
  }

  function handleDrop(e) {
    const files = Array.from((e.dataTransfer && e.dataTransfer.files) || []);
    if (!files.length && !hasFiles(e)) return;

    e.preventDefault();
    cancelDragStateClear();
    clearDragState();
    if (!files.length) return;

    if (accept) {
      const accepted = files.filter((file) => matchesAccept(file, accept));
      if (accepted.length) onDrop(accepted);
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
    cancelDragStateClear();
    clearDragState();
  };
}

/**
 * @param {File} file
 * @param {string} accept - Comma-separated rules, e.g. "image/*,.pdf,video/mp4"
 */
function matchesAccept(file, accept) {
  return accept.split(',').some((rule) => {
    rule = rule.trim().toLowerCase();
    if (!rule) return false;
    if (rule.startsWith('.')) return hasFileExtension(file, [rule]);
    if (rule.endsWith('/*')) return matchesTypeWildcard(file, rule);
    return file.type.toLowerCase() === rule || matchesMimeFallback(file, rule);
  });
}

function matchesTypeWildcard(file, rule) {
  const typePrefix = rule.slice(0, -1);
  if (file.type.toLowerCase().startsWith(typePrefix)) return true;

  const topLevelType = typePrefix.slice(0, -1);
  return (
    !file.type &&
    hasFileExtension(file, TYPE_EXTENSION_FALLBACKS[topLevelType] || [])
  );
}

function matchesMimeFallback(file, rule) {
  if (file.type) return false;
  return hasFileExtension(file, MIME_EXTENSION_FALLBACKS[rule] || []);
}

function hasFileExtension(file, extensions) {
  const name = file.name.toLowerCase();
  return extensions.some((extension) => name.endsWith(extension));
}

const TYPE_EXTENSION_FALLBACKS = {
  audio: [
    '.aac',
    '.aif',
    '.aiff',
    '.flac',
    '.m4a',
    '.mp3',
    '.ogg',
    '.opus',
    '.wav',
  ],
  image: [
    '.apng',
    '.avif',
    '.bmp',
    '.gif',
    '.heic',
    '.heif',
    '.ico',
    '.jfif',
    '.jpeg',
    '.jpg',
    '.pjp',
    '.pjpeg',
    '.png',
    '.svg',
    '.tif',
    '.tiff',
    '.webp',
  ],
  video: [
    '.3gp',
    '.avi',
    '.m4v',
    '.mkv',
    '.mov',
    '.mp4',
    '.mpeg',
    '.mpg',
    '.ogv',
    '.webm',
  ],
};

const MIME_EXTENSION_FALLBACKS = {
  'audio/aac': ['.aac'],
  'audio/flac': ['.flac'],
  'audio/mp4': ['.m4a'],
  'audio/mpeg': ['.mp3'],
  'audio/ogg': ['.ogg', '.opus'],
  'audio/wav': ['.wav'],
  'image/avif': ['.avif'],
  'image/bmp': ['.bmp'],
  'image/gif': ['.gif'],
  'image/heic': ['.heic'],
  'image/heif': ['.heif'],
  'image/jpeg': ['.jpg', '.jpeg', '.jfif', '.pjp', '.pjpeg'],
  'image/png': ['.png'],
  'image/svg+xml': ['.svg'],
  'image/tiff': ['.tif', '.tiff'],
  'image/webp': ['.webp'],
  'video/3gpp': ['.3gp'],
  'video/mp4': ['.mp4', '.m4v'],
  'video/mpeg': ['.mpeg', '.mpg'],
  'video/ogg': ['.ogv'],
  'video/quicktime': ['.mov'],
  'video/webm': ['.webm'],
  'video/x-msvideo': ['.avi'],
};
