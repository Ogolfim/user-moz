import { UUID } from 'io-ts-types'
import { JWTVerifyResult } from 'jose'

export type CreateResetPasswordToken = (userId: UUID) => Promise<string>
export type VerifyResetPasswordToken = (token: string) => Promise<JWTVerifyResult>
