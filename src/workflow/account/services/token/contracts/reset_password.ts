import { UUID } from 'io-ts-types'
import { JwtPayload } from 'jsonwebtoken'

export type CreateResetPasswordToken = (userId: UUID) => Promise<string>
export type VerifyResetPasswordToken = (token: string) => Promise<JwtPayload>
