export async function copyToClipboard(text, inputElement = null) {
  // Clipboard API
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn('Clipboard API failed, using fallback:', err);
      return false;
    }
  }

  if (!inputElement) return false;
  // Fallback for older browsers
  try {
    inputElement.select();
    inputElement.setSelectionRange(0, 99999);
    const successful = document.execCommand('copy');
    return successful;
  } catch (err) {
    console.error('Fallback copy failed:', err);
    return false;
  }
}
