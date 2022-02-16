import { UUID } from 'io-ts-types'
import { JwtPayload } from 'jsonwebtoken'

export type CreateRefreshAccessToken = (userId: UUID) => Promise<string>
export type VerifyRefreshAccessToken = (token: string) => Promise<JwtPayload>
