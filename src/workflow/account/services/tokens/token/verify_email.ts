import { createPrivateKey, createPublicKey } from 'crypto'
import { jwtVerify, SignJWT } from 'jose'
import { CreateEmailVerifyToken, VerifyEmailVerifyToken } from '@account/services/tokens/token/contracts/verify_email'

const privateKey = createPrivateKey(Buffer.from(process.env.ACCESS_TOKEN_SECRET))

const publicKey = createPublicKey(privateKey)

export const createResetPasswordToken: CreateEmailVerifyToken = async (userId) => {
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: 'ES256' })
    .setSubject(userId)
    .setExpirationTime('10m')
    .setIssuer('urn:user-moz:issuer')
    .setAudience('urn:mail-me:audience')
    .setExpirationTime('10m')
    .sign(privateKey)

  return token
}

export const verifyEmailVerifyToken: VerifyEmailVerifyToken = async (token: string) => {
  const result = await jwtVerify(token, publicKey, {
    issuer: 'urn:user-moz:issuer',
    audience: 'urn:mail-me:audience'
  })

  return result
}
