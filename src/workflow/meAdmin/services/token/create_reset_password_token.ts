import { sign } from 'jsonwebtoken'
import { CreateResetPasswordToken } from '@account/services/token/contracts/create_reset_password_token'

export const createResetPasswordToken: CreateResetPasswordToken = ({ userId, expiresIn }) => {
  return sign(
    {},
    process.env.RESET_PASSWORD_TOKEN_SECRET!,
    {
      subject: userId,
      expiresIn: expiresIn
    }
  )
}
