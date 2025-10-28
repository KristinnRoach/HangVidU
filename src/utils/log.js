export const devDebug = (msg, data) => {
  if (import.meta.env.DEV) console.debug(msg, data ? data : '');
};
