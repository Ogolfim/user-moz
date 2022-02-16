import { CreateResetPasswordToken, VerifyResetPasswordToken } from '@meAdmin/services/token/contracts/reset_password'

import { verify, sign } from 'jsonwebtoken'

export const createAccessToken: CreateResetPasswordToken = async (userId) => {
  return sign(
    {},
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '10m',
      subject: userId
    }
  )
}

export const verifyAccessToken: VerifyResetPasswordToken = async (token: string) => {
  const result = verify(token, process.env.ACCESS_TOKEN_SECRET)

  return result
}
