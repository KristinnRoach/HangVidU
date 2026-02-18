/**
 * Opens a full-screen preview modal for an image using the native <dialog> element.
 * Clicking the backdrop or pressing Escape closes the modal.
 *
 * @param {string} src - Image src (data URL or object URL)
 * @param {string} fileName - File name used for the download link
 * @param {string} downloadLabel - Label for the download link
 */
export function showImagePreview(src, fileName, downloadLabel = 'Download') {
  const dialog = document.createElement('dialog');
  dialog.className = 'image-preview-dialog';

  const img = document.createElement('img');
  img.src = src;
  img.alt = fileName;
  img.className = 'image-preview-img';

  const downloadBtn = document.createElement('a');
  downloadBtn.href = src;
  downloadBtn.download = fileName;
  downloadBtn.textContent = downloadLabel;
  downloadBtn.className = 'image-preview-download';

  dialog.appendChild(img);
  dialog.appendChild(downloadBtn);

  // Close on backdrop click
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });

  dialog.addEventListener('close', () => {
    if (typeof src === 'string' && src.startsWith('blob:')) {
      URL.revokeObjectURL(src);
    }
    dialog.remove();
  });

  document.body.appendChild(dialog);
  dialog.showModal();
}
