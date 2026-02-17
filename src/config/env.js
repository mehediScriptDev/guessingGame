const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';
const APP_NAME = import.meta.env.VITE_APP_NAME ?? 'React App';

export const ENV = Object.freeze({
  MODE: import.meta.env.MODE,
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,

  API_BASE_URL,
  APP_NAME,
  API_ENABLED: Boolean(API_BASE_URL),
});
