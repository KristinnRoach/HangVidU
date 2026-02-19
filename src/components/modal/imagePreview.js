// src/components/modal/imagePreview.js

import { onSwipe } from '../../utils/ui/swipe-interactions.js';

/**
 * Opens a full-screen preview modal for an image using the native <dialog> element.
 * Clicking the backdrop or pressing Escape closes the modal.
 *
 * @param {string} src - Image src (data URL or object URL)
 * @param {string} fileName - File name used for the download link
 * @param {string|null} downloadLabel - Label for the download link (string or null)
 */
export function showImagePreview(src, fileName, downloadLabel = null) {
  const dialog = document.createElement('dialog');
  dialog.className = 'image-preview-dialog';

  const img = document.createElement('img');
  img.src = src;
  img.alt = fileName;
  img.className = 'image-preview-img';

  const downloadBtn = document.createElement('a');
  downloadBtn.href = src;
  downloadBtn.download = fileName;
  downloadBtn.className = 'image-preview-download';
  downloadBtn.setAttribute('aria-label', `Download`);
  downloadBtn.setAttribute('title', `Download`);

  const downloadIcon = document.createElement('i');
  downloadIcon.className = 'fa fa-download';
  downloadBtn.appendChild(downloadIcon);
  if (typeof downloadLabel === 'string' && downloadLabel.trim() !== '') {
    const labelSpan = document.createElement('span');
    labelSpan.textContent = ' ' + downloadLabel;
    downloadBtn.appendChild(labelSpan);
  }

  const closeBtn = document.createElement('button');
  closeBtn.className = 'image-preview-close';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.setAttribute('title', 'Close Image Preview');

  const closeIcon = document.createElement('i');
  closeIcon.className = 'fa fa-close';
  closeBtn.appendChild(closeIcon);
  closeBtn.addEventListener('click', () => dialog.close());

  dialog.appendChild(img);
  dialog.appendChild(downloadBtn);
  dialog.appendChild(closeBtn);

  const cleanupSwipe = onSwipe(dialog, {
    onSwipeUp() {
      console.debug('[ImagePreview] Swipe up detected, closing dialog');
      dialog.close();
    },
  });

  const onBackdropClick = (e) => {
    if (e.target === dialog) {
      dialog.close();
    }
  };

  const cleanup = () => {
    cleanupSwipe();
    dialog.removeEventListener('click', onBackdropClick);
  };

  const onClose = () => {
    if (typeof src === 'string' && src.startsWith('blob:')) {
      URL.revokeObjectURL(src);
    }
    cleanup();
    dialog.remove();
  };

  dialog.addEventListener('click', onBackdropClick);
  dialog.addEventListener('close', onClose);

  document.body.appendChild(dialog);
  dialog.showModal();
}
