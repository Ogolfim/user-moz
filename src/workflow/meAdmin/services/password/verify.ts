import bcrypt from 'bcrypt';
import { Password } from '../../domain/requiredFields/Password';

export type VerifyPassword = (password: Password, hash: string) => Promise<boolean>

export const verifyPassword: VerifyPassword = async (password, hash) => {

  const result = await bcrypt.compare(password, hash);
  return result;
}
