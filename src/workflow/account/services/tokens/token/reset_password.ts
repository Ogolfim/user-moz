import { CreateResetPasswordToken, VerifyResetPasswordToken } from '@account/services/tokens/token/contracts/reset_password'
import { JwtPayload, sign, verify } from 'jsonwebtoken'

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

export const verifyResetPasswordToken: VerifyResetPasswordToken = async (token: string) => {
  const result = verify(token, process.env.RESET_PASSWORD_TOKEN_SECRET)

  return result as JwtPayload
}
