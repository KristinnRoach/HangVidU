import { showImagePreview } from '../../../shared/components/modal/imagePreview.js';

/**
 * Build an image preview element + handlers for message UIs.
 * Keeps preview behavior centralized for both persisted and ephemeral file messages.
 */
export function createImagePreviewNode({ fileName, previewUrl }) {
  const img = document.createElement('img');
  img.className = 'file-preview-img';
  img.src = previewUrl;
  img.alt = fileName;

  let startX = 0;
  let startY = 0;
  let hasMoved = false;

  img.addEventListener(
    'touchstart',
    (e) => {
      if (e.touches.length > 0) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }
      hasMoved = false;
    },
    { passive: true },
  );

  img.addEventListener(
    'touchmove',
    (e) => {
      if (e.touches.length > 0) {
        const moveX = e.touches[0].clientX;
        const moveY = e.touches[0].clientY;
        if (Math.abs(moveX - startX) > 10 || Math.abs(moveY - startY) > 10) {
          hasMoved = true;
        }
      }
    },
    { passive: true },
  );

  const openPreview = (e) => {
    if (hasMoved) {
      hasMoved = false; // Prevent preview for the drag/scroll interaction, but reset for future pointer events
      return;
    }
    showImagePreview(previewUrl, fileName);
  };

  const onSingleTap = (e) => {
    if (e.target === img || img.contains(e.target)) {
      openPreview();
    }
  };

  return { element: img, onSingleTap, openPreview };
}
