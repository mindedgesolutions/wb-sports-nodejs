import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '@/globals/constants';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);

  return bcrypt.hash(password, salt);
}

// -----------------------------

export async function comparePassword(
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}
