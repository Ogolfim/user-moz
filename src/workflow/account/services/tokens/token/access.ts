import { createPrivateKey, createPublicKey } from 'crypto'
import { jwtVerify, SignJWT } from 'jose'
import { CreateAccessToken, VerifyAccessToken } from '@account/services/tokens/token/contracts/access'

const privateKey = createPrivateKey(Buffer.from(process.env.ACCESS_TOKEN_SECRET))

const publicKey = createPublicKey(privateKey)

export const createAccessToken: CreateAccessToken = async ({ id, services }) => {
  const token = await new SignJWT(
    services
  )
    .setProtectedHeader({ alg: 'ES256' })
    .setSubject(id)
    .setIssuer('urn:user-moz:issuer')
    .setAudience('urn:ui-moz:audience')
    .setExpirationTime('10m')
    .sign(privateKey)

  return token
}

export const verifyAccessToken: VerifyAccessToken = async (token: string) => {
  const result = await jwtVerify(token, publicKey, {
    issuer: 'urn:user-moz:issuer',
    audience: 'urn:moz-ui:audience'
  })

  return result
}
