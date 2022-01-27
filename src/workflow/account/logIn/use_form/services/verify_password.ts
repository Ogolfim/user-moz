import bcrypt from 'bcrypt';
import { VerifyPassword } from '../domain/contracts/VeryfyPassword';


export const verifyPassword: VerifyPassword = async (password, hash) => {

  const result = await bcrypt.compare(password, hash);
  return result;
}
