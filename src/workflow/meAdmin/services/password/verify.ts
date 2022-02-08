import bcrypt from 'bcrypt'
import { VerifyPassword } from '@meAdmin/services/password/contracts/verify'

export const verifyPassword: VerifyPassword = async (password, hash) => {
  const result = await bcrypt.compare(password, hash)
  return result
}
