import { CreateEmailVerifyToken, VerifyEmailVerifyToken } from '@meAdmin/services/token/contracts/verify_email'
import { sign, verify } from 'jsonwebtoken'

export const createEmailVerifyToken: CreateEmailVerifyToken = async (userId) => {
  return sign(
    {},
    process.env.VERIFY_EMAIL_TOKEN_SECRET,
    {
      expiresIn: '10m',
      subject: userId
    }
  )
}

export const verifyEmailVerifyToken: VerifyEmailVerifyToken = async (token: string) => {
  const result = verify(token, process.env.VERIFY_EMAIL_TOKEN_SECRET)

  return result
}
