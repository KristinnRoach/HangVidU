export async function copyLink(inputEl, buttonEl) {
  try {
    await navigator.clipboard.writeText(inputEl.value);
    buttonEl.textContent = 'Copied!';
    setTimeout(() => (buttonEl.textContent = 'Copy Link'), 2000);
    return true;
  } catch (err) {
    console.error('Failed to copy: ', err);
    return false;
  }
}
