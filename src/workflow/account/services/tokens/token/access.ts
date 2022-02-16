import { verify, sign, JwtPayload } from 'jsonwebtoken'
import { CreateAccessToken, VerifyAccessToken } from '@account/services/tokens/token/contracts/access'

export const createAccessToken: CreateAccessToken = async ({ id, services }) => {
  return sign(
    {
      api: services.api,
      webDownload: services.webDownload
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '10m',
      subject: id
    }
  )
}

export const verifyAccessToken: VerifyAccessToken = async (token: string) => {
  const result = verify(
    token,
    process.env.ACCESS_TOKEN_SECRET
  )

  return result as JwtPayload
}
