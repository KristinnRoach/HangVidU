/**
 * Apply avatar styling to an element: background image if available, otherwise fallback text
 * @param {HTMLElement} element - Avatar element to style
 * @param {Object} options
 * @param {string} [options.name] - Display name for deriving initial letter
 * @param {string} [options.photoURL] - Profile photo URL
 * @param {string} [options.customFallbackText] - Custom text to display instead of initial (e.g., 'Me')
 * @param {string} [options.imageClass='sender-avatar--image'] - Class to add when image is present
 * @param {boolean} [options.pending=false] - Photo state unknown (not yet fetched); render blank instead of letter fallback to avoid flicker
 */
export function renderAvatar(
  element,
  {
    name = '',
    photoURL = '',
    customFallbackText = null,
    imageClass = 'sender-avatar--image',
    pending = false,
  } = {},
) {
  if (!element) return;

  if (photoURL) {
    element.style.backgroundImage = `url("${photoURL}")`;
    element.style.backgroundSize = 'cover';
    element.style.backgroundPosition = 'center';
    element.classList.add(imageClass);
    element.textContent = '';
    return;
  }

  element.style.backgroundImage = '';
  element.style.backgroundSize = '';
  element.style.backgroundPosition = '';
  element.classList.remove(imageClass);

  if (pending) {
    element.textContent = '';
    return;
  }

  const fallbackText =
    customFallbackText || (name ? name[0].toUpperCase() : 'U');
  element.textContent = fallbackText;
}
