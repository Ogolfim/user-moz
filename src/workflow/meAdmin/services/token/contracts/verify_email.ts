import { UUID } from 'io-ts-types'
import { JWTVerifyResult } from 'jose'

export type CreateEmailVerifyToken = (adminId: UUID) => Promise<string>
export type VerifyEmailVerifyToken = (token: string) => Promise<JWTVerifyResult>
