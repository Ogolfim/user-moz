import { CreateRefreshAccessToken, VerifyRefreshAccessToken } from '@account/services/token/contracts/refresh'
import { JwtPayload, sign, verify } from 'jsonwebtoken'

export const createRefreshAccessToken: CreateRefreshAccessToken = async (userId) => {
  return sign(
    { },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '48h',
      subject: userId
    }
  )
}

export const verifyRefreshAccessToken: VerifyRefreshAccessToken = async (token: string) => {
  const result = verify(token, process.env.REFRESH_TOKEN_SECRET)

  return result as JwtPayload
}
