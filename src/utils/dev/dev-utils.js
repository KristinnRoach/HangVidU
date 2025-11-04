// DEV convenience utils

export const isDev = () => import.meta.env.DEV;
export const isProd = () => import.meta.env.PROD;

export const devDebug = (msg, data) => {
  if (isDev()) console.debug(msg, data ? data : '');
};
