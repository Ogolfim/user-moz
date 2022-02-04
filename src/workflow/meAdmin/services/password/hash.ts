import bcrypt from 'bcrypt';
import { Password } from '../../domain/requiredFields/Password';


export type HashPassword = (password: Password) => Promise<string>

export const hashPassword: HashPassword = async (password) => {

  const salt = await bcrypt.genSalt(10)
  const  hash = await bcrypt.hash(password, salt)

  return hash
}
