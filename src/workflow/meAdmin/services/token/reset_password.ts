import { CreateResetPasswordToken, VerifyResetPasswordToken } from '@meAdmin/services/token/contracts/reset_password'

import { verify, sign } from 'jsonwebtoken'

export const createResetPasswordToken: CreateResetPasswordToken = async (userId) => {
  return sign(
    {},
    process.env.RESET_PASSWORD_TOKEN_SECRET,
    {
      expiresIn: '10m',
      subject: userId
    }
  )
}

export const verifyAccessToken: VerifyResetPasswordToken = async (token: string) => {
  const result = verify(token, process.env.RESET_PASSWORD_TOKEN_SECRET)

  return result
}
