const elExists = (el) => {
  if (!el) {
    console.warn('Element not found.');
    return false;
  }
  return true;
};

export const isHidden = (el) => {
  if (!elExists(el)) return;

  return el.classList.contains('hidden');
};

export const showElement = (el) => {
  if (!elExists(el)) return;

  el.classList.remove('hidden');
};

export const hideElement = (el) => {
  if (!elExists(el)) return;

  el.classList.add('hidden');
};

export const isInSmallFrame = (element) => {
  return element.classList.contains('smallFrame');
};

export const placeInSmallFrame = (element) => {
  if (!isInSmallFrame(element)) {
    element.classList.add('smallFrame');
    // Add close icon
    const icon = document.createElement('button');
    icon.classList.add('smallFrame-toggle-btn');
    icon.textContent = '❮'; // ❮ | ⟨
    document.body.appendChild(icon);
    icon.addEventListener('click', () => {
      if (element.classList.contains('closed')) {
        // show
        element.classList.remove('closed');
        icon.classList.remove('closed');
      } else {
        // hide
        element.classList.add('closed');
        icon.classList.add('closed');
      }
    });
  }
};

export const removeFromSmallFrame = (element) => {
  if (isInSmallFrame(element)) {
    element.classList.remove('smallFrame');
    // Remove close icon if exists
    const icon = document.querySelector('.smallFrame-close');
    if (icon) icon.remove();
  }
};

/**
 * Checks if a given element is currently in Picture-in-Picture mode.
 * @param {Element} element - The DOM element to check.
 * @returns {boolean} True if the element is in PiP, false otherwise.
 */
export function isElementInPictureInPicture(element) {
  return document.pictureInPictureElement === element;
}
