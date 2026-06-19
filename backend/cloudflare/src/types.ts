export type WorkerEnv = Omit<Env, 'APP_ENV'> & {
  APP_ENV: 'production' | 'development';
};
