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

  const openPreview = () => {
    showImagePreview(previewUrl, fileName);
  };

  const onSingleTap = (e) => {
    if (e.target === img || img.contains(e.target)) {
      openPreview();
    }
  };

  return { element: img, onSingleTap, openPreview };
}
