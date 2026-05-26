const loadedPhotoURLs = new Set();
const failedPhotoURLs = new Set();
const maxCachedPhotoURLs = 100;

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
  element.setAttribute('aria-hidden', 'true');
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
  const usablePhoto = photoURL && !failedPhotoURLs.has(photoURL);
  const stateKey = usablePhoto
    ? photoURL
    : pending && !photoURL
      ? 'pending'
      : `letter:${name}`;
  if (element.dataset.avatarState === stateKey) return;

  element.dataset.avatarState = stateKey;
  const prevImg = element.querySelector(':scope > img');

  if (usablePhoto) {
    // Reuse existing <img> so the previous frame keeps painting until the new
    // src decodes — avoids a background flash during conversation switches.
    const img = prevImg || document.createElement('img');
    img.alt = '';
    img.decoding = 'async';
    // Strip Referer — Google's lh3.googleusercontent.com 403s cross-origin
    // requests that carry a referrer header.
    img.referrerPolicy = 'no-referrer';
    img.classList.remove('avatar-entry-animation');
    // Guard onerror so stale image failures don't clobber newer avatars.
    // Capture the current stateKey so the handler ignores superseded requests.
    const fallbackText = name ? name[0].toUpperCase() : 'U';
    const fallbackState = `letter:${name}`;
    const requestedState = stateKey;
    img.onerror = () => {
      failedPhotoURLs.add(photoURL);
      if (element.dataset.avatarState !== requestedState) return;
      element.dataset.avatarState = fallbackState;
      img.remove();
      element.textContent = fallbackText;
    };
    // Animate only the first time we see this URL this session. Re-renders into
    // new <img> elements (e.g. switching conversations) are served from cache
    // and should appear instantly without a fade-in.
    // Attach the listener before setting src so a synchronous cached load
    // still fires it.
    if (!loadedPhotoURLs.has(photoURL)) {
      img.addEventListener(
        'load',
        () => {
          if (loadedPhotoURLs.size >= maxCachedPhotoURLs) {
            loadedPhotoURLs.clear();
          }
          loadedPhotoURLs.add(photoURL);
          img.classList.add('avatar-entry-animation');
        },
        { once: true },
      );
    }
    img.src = photoURL;
    if (!img.parentNode) element.appendChild(img);
    return;
  }

  element.textContent = '';

  if (pending) return;

  element.textContent = name ? name[0].toUpperCase() : 'U';
}
