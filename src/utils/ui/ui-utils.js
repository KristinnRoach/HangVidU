const elExists = (el) => {
  if (!el) {
    console.warn(
      'Element not found. el.id: =>',
      el?.id ?? '(no id), el: =>',
      el
    );
    console.trace();
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

  el.classList.contains('hidden') && el.classList.remove('hidden');
};

export const hideElement = (el) => {
  if (!elExists(el)) return;

  !el.classList.contains('hidden') && el.classList.add('hidden');
};

export const isInSmallFrame = (element) => {
  return element.classList.contains('small-frame');
};

export const placeInSmallFrame = (element) => {
  if (!element) {
    import.meta.env.DEV &&
      console.warn('placeInSmallFrame: valid element required');
    return;
  }

  if (!isInSmallFrame(element)) {
    element.classList.add('small-frame');
    // Add toggle button
    const toggle = document.createElement('div');
    toggle.classList.add('small-frame-toggle-div');
    const icon = document.createElement('span');
    icon.classList.add('small-frame-toggle-icon');
    icon.textContent = '❮'; // ❮ | ⟨
    toggle.appendChild(icon);
    element.appendChild(toggle);
    toggle.addEventListener('click', () => {
      if (element.classList.contains('closed')) {
        // show
        element.classList.remove('closed');
        toggle.classList.remove('closed');
        icon.classList.remove('closed');
      } else {
        // hide
        element.classList.add('closed');
        toggle.classList.add('closed');
        icon.classList.add('closed');
      }
    });
  }
};

export const removeFromSmallFrame = (element) => {
  if (isInSmallFrame(element)) {
    element.classList.remove('small-frame');
    // Remove close icon if exists
    const closeIcon = document.querySelector('.small-frame-close');
    if (closeIcon) closeIcon.remove();
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
