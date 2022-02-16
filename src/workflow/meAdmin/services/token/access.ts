import { CreateAccessToken, VerifyAccessToken } from '@meAdmin/services/token/contracts/access'
import { verify, sign } from 'jsonwebtoken'

export const createAccessToken: CreateAccessToken = async ({ id }) => {
  return sign(
    {},
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '10m',
      subject: id
    }
  )
}

export const verifyAccessToken: VerifyAccessToken = async (token: string) => {
  const result = verify(token, process.env.ACCESS_TOKEN_SECRET)

  return result
}
