const loadedPhotoURLs = new Set();

/**
 * Create a new avatar element and apply styling.
 * @param {Object} options - See renderAvatar for options, plus:
 * @param {string[]} [options.classList=['avatar']] - Classes to apply to the new element
 * @returns {HTMLElement}
 */
export function createAvatar(options = {}) {
  const element = document.createElement('span');
  const { classList = ['avatar'] } = options;
  classList.forEach((cls) => element.classList.add(cls));
  renderAvatar(element, options);
  return element;
}

/**
 * Render an avatar into an element: <img> child if photoURL, else letter fallback.
 * Idempotent per URL — safe to call repeatedly with the same photoURL.
 * @param {HTMLElement} element
 * @param {Object} options
 * @param {string} [options.name]
 * @param {string} [options.photoURL]
 * @param {boolean} [options.pending=false] - Photo unknown yet; render blank to avoid letter flicker
 */
export function renderAvatar(
  element,
  { name = '', photoURL = '', pending = false } = {},
) {
  if (!element) return;
  const stateKey = photoURL || (pending ? 'pending' : `letter:${name}`);
  if (element.dataset.avatarState === stateKey) return;

  element.dataset.avatarState = stateKey;
  element.textContent = '';
  const prevImg = element.querySelector(':scope > img');
  if (prevImg) prevImg.remove();

  if (photoURL) {
    const img = document.createElement('img');
    img.alt = '';
    img.decoding = 'async';
    // Strip Referer — Google's lh3.googleusercontent.com 403s cross-origin
    // requests that carry a referrer header.
    img.referrerPolicy = 'no-referrer';
    img.onerror = () => {
      element.dataset.avatarState = `letter:${name}`;
      img.remove();
      element.textContent = name ? name[0].toUpperCase() : 'U';
    };
    img.src = photoURL;
    // Animate only the first time we see this URL this session. Re-renders into
    // new <img> elements (e.g. switching conversations) are served from cache
    // and should appear instantly without a fade-in.
    if (!loadedPhotoURLs.has(photoURL)) {
      img.addEventListener(
        'load',
        () => {
          loadedPhotoURLs.add(photoURL);
          img.classList.add('avatar-entry-animation');
        },
        { once: true },
      );
    }
    element.appendChild(img);
    return;
  }

  if (pending) return;

  element.textContent = name ? name[0].toUpperCase() : 'U';
}
