import { statusDiv } from '../../elements.js';

export function updateStatus(message) {
  if (statusDiv) {
    statusDiv.textContent = message;
    import.meta.env.DEV && console.log('Status:', message);
  } else {
    console.warn('Status div not found in the DOM.');
  }
}
