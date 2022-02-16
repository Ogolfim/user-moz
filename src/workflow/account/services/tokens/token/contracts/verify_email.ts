import { UUID } from 'io-ts-types'
import { JwtPayload } from 'jsonwebtoken'

export type CreateEmailVerifyToken = (userId: UUID) => Promise<string>
export type VerifyEmailVerifyToken = (token: string) => Promise<JwtPayload>
