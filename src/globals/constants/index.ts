import path from 'path';

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;

  if (value === undefined) throw new Error(`Environment variable not defined`);

  return value;
};

export const NODE_ENV = getEnv('NODE_ENV', 'development');
export const PORT = Number(getEnv('PORT', '5000'));
export const DATABASE_URL = getEnv('DATABASE_URL');
export const SALT_ROUNDS = Number(getEnv('SALT_ROUNDS', '10'));
export const JWT_SECRET = getEnv('JWT_SECRET');
export const REFRESH_TOKEN_SECRET = getEnv('REFRESH_TOKEN_SECRET');
export const ACCESS_TOKEN_EXPIRES_IN = getEnv('ACCESS_TOKEN_EXPIRES_IN', '15m');
export const REFRESH_TOKEN_EXPIRES_IN = getEnv(
  'REFRESH_TOKEN_EXPIRES_IN',
  '7d',
);
export const ROOT_PATH = path.resolve(process.cwd());
