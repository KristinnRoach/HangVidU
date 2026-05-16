const FLAG_KEY = '__msgnext';

export const isMessagingNextEnabled = () =>
  localStorage.getItem(FLAG_KEY) === '1';
