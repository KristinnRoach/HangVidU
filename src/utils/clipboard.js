export async function copyLink(button) {
  try {
    await navigator.clipboard.writeText(shareLink.value);
    button.textContent = 'Copied!';
    setTimeout(() => (button.textContent = 'Copy Link'), 2000);
  } catch (err) {
    shareLink.select();
    document.execCommand('copy');
  }
}
