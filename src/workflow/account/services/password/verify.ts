import bcrypt from 'bcrypt'
import { VerifyPassword } from '@account/services/password/contracts/Verify'

export const verifyPassword: VerifyPassword = async (password, hash) => {
  const result = await bcrypt.compare(password, hash)
  return result
}
