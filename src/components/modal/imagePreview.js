/**
 * Opens a full-screen preview modal for an image using the native <dialog> element.
 * Clicking the backdrop or pressing Escape closes the modal.
 *
 * @param {string} src - Image src (data URL or object URL)
 * @param {string} fileName - File name used for the download link
 * @param {string|null} downloadLabel - Label for the download link (string or null)
 */
import { attachSwipeUpToClose } from '../../utils/swipeUpToClose.js';

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

  // Font Awesome download icon
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
  // Font Awesome close icon
  const closeIcon = document.createElement('i');
  closeIcon.className = 'fa fa-close';
  closeBtn.appendChild(closeIcon);
  closeBtn.addEventListener('click', () => dialog.close());

  dialog.appendChild(img);
  dialog.appendChild(downloadBtn);
  dialog.appendChild(closeBtn);

  // Close on backdrop click
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });

  // Attach swipe-up-to-close gesture
  let detachSwipe = null;
  dialog.addEventListener('show', () => {
    detachSwipe = attachSwipeUpToClose(dialog, () => dialog.close());
  });

  dialog.addEventListener('close', () => {
    if (detachSwipe) detachSwipe();
    if (typeof src === 'string' && src.startsWith('blob:')) {
      URL.revokeObjectURL(src);
    }
    dialog.remove();
  });

  document.body.appendChild(dialog);
  dialog.showModal();
}
