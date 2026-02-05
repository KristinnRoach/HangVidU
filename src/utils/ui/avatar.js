/**
 * Apply avatar styling to an element: background image if available, otherwise fallback text
 * @param {HTMLElement} element - Avatar element to style
 * @param {Object} options
 * @param {string} [options.name] - Display name for deriving initial letter
 * @param {string} [options.photoURL] - Profile photo URL
 * @param {string} [options.customFallbackText] - Custom text to display instead of initial (e.g., 'Me')
 * @param {string} [options.imageClass='sender-avatar--image'] - Class to add when image is present
 */
export function renderAvatar(
  element,
  {
    name = '',
    photoURL = '',
    customFallbackText = null,
    imageClass = 'sender-avatar--image',
  } = {},
) {
  if (!element) return;

  // Determine fallback text: custom text, or first letter of name, or 'U'
  const fallbackText =
    customFallbackText || (name ? name[0].toUpperCase() : 'U');

  if (photoURL) {
    element.style.backgroundImage = `url("${photoURL}")`;
    element.style.backgroundSize = 'cover';
    element.style.backgroundPosition = 'center';
    element.classList.add(imageClass);
    element.textContent = ''; // Hide text when showing image
  } else {
    element.style.backgroundImage = '';
    element.style.backgroundSize = '';
    element.style.backgroundPosition = '';
    element.classList.remove(imageClass);
    element.textContent = fallbackText;
  }
}
