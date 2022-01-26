import bcrypt from 'bcrypt';
import { Password } from '../domain/requiredFields/Password';


export const genPassword = async (password: Password): Promise<string> => {

  const salt = await bcrypt.genSalt(10)
  const  hash = await bcrypt.hash(password, salt)

  return hash
}


export const isValidPassword = async (password: Password, hash: string) => {
  const result = await bcrypt.compare(password, hash);
  return result;
}
