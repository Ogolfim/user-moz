import { jwtVerify, SignJWT } from 'jose'
import { createPrivateKey, createPublicKey } from 'crypto'
import { CreateRefreshAccessToken, VerifyRefreshAccessToken } from '@account/services/tokens/token/contracts/refresh'

const privateKey = createPrivateKey(Buffer.from(process.env.ACCESS_TOKEN_SECRET))

const publicKey = createPublicKey(privateKey)

export const createRefreshAccessToken: CreateRefreshAccessToken = async ({ id, userId }) => {
  const token = await new SignJWT({ id })

    .setProtectedHeader({ alg: 'ES256' })
    .setSubject(userId)
    .setIssuer('urn:user-moz:issuer')
    .setAudience('urn:ui-moz:audience')
    .setExpirationTime('24h')
    .sign(privateKey)

  return token
}

export const verifyRefreshAccessToken: VerifyRefreshAccessToken = async (token: string) => {
  const result = await jwtVerify(token, publicKey, {
    issuer: 'urn:user-moz:issuer',
    audience: 'urn:moz-ui:audience'
  })

  return result
}
