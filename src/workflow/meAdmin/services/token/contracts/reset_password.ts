import { UUID } from 'io-ts-types'
import { JWTVerifyResult } from 'jose'

export type CreateResetPasswordToken = (adminId: UUID) => Promise<string>
export type VerifyResetPasswordToken = (token: string) => Promise<JWTVerifyResult>
