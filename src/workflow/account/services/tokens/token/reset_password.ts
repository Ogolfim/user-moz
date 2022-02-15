import { generateKeyPair, jwtVerify, SignJWT } from 'jose'
import { createPrivateKey, createPublicKey } from 'crypto'
import { CreateResetPasswordToken, VerifyResetPasswordToken } from '@account/services/tokens/token/contracts/reset_password'

const privateKey = createPrivateKey(Buffer.from(process.env.ACCESS_TOKEN_SECRET))

const publicKey = createPublicKey(privateKey)

export const createResetPasswordToken: CreateResetPasswordToken = async (userId) => {
  const { privateKey } = await generateKeyPair('ES256')

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

export const verifyResetPasswordToken: VerifyResetPasswordToken = async (token: string) => {
  const result = await jwtVerify(token, publicKey, {
    issuer: 'urn:user-moz:issuer',
    audience: 'urn:mail-me:audience'
  })

  return result
}
