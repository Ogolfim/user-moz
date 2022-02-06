import bcrypt from 'bcrypt'
import { HashPassword } from './contracts/Hash'

export const hashPassword: HashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  return hash
}
