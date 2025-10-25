const elExists = (el) => {
  if (!el) {
    console.warn('Element not found.');
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

  el.classList.remove('hidden');
};

export const hideElement = (el) => {
  if (!elExists(el)) return;

  el.classList.add('hidden');
};

export function showSharedVideo() {
  sharedVideo.classList.remove('hidden');
  enterWatchMode();
}

export function hideSharedVideo() {
  sharedVideo.classList.add('hidden');
  exitWatchMode();
}
