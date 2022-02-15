import { UUID } from 'io-ts-types'
import { JWTVerifyResult } from 'jose'

export type CreateEmailVerifyToken = (userId: UUID) => Promise<string>
export type VerifyEmailVerifyToken = (token: string) => Promise<JWTVerifyResult>
