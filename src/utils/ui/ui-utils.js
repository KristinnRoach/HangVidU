const elExists = (el) => {
  if (!el) {
    console.warn(
      'Element not found. el.id: =>',
      el?.id ?? '(no id)',
      'el: =>',
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
    element.classList.remove('closed');
    // Remove toggle button if exists
    const toggle = element.querySelector('.small-frame-toggle-div');
    if (toggle) toggle.remove();
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

// ============================================================================
// PICTURE-IN-PICTURE UTILITIES
// ============================================================================

/**
 * Whether the browser supports Picture-in-Picture.
 * @returns {boolean}
 */
export function isPiPSupported() {
  return (
    'pictureInPictureEnabled' in document &&
    typeof document.pictureInPictureEnabled === 'boolean' &&
    document.pictureInPictureEnabled
  );
}

/**
 * Request PiP for a video element, falling back to smallFrame on failure.
 *
 * @param {HTMLVideoElement} videoEl - The video element to put in PiP.
 * @param {HTMLElement} fallbackContainerEl - The container to place in smallFrame if PiP fails.
 * @returns {Promise<'pip'|'small-frame'|'already-pip'>} Which mode was entered.
 */
export async function requestPiP(videoEl, fallbackContainerEl) {
  if (!videoEl || !fallbackContainerEl) return 'small-frame';

  if (isElementInPictureInPicture(videoEl)) {
    removeFromSmallFrame(fallbackContainerEl);
    return 'already-pip';
  }

  if (!isPiPSupported()) {
    placeInSmallFrame(fallbackContainerEl);
    showElement(fallbackContainerEl);
    return 'small-frame';
  }

  try {
    await videoEl.requestPictureInPicture();
    removeFromSmallFrame(fallbackContainerEl);
    return 'pip';
  } catch (err) {
    console.warn('Failed to enter Picture-in-Picture:', err);
    placeInSmallFrame(fallbackContainerEl);
    showElement(fallbackContainerEl);
    return 'small-frame';
  }
}

/**
 * Exit PiP if the given element (or any element) is currently in PiP.
 * @param {HTMLVideoElement} [videoEl] - If provided, only exits if this element is in PiP.
 */
export async function exitPiP(videoEl) {
  try {
    if (videoEl && !isElementInPictureInPicture(videoEl)) return;
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
    }
  } catch (err) {
    console.warn('Failed to exit Picture-in-Picture:', err);
  }
}
