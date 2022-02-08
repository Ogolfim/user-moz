import { UUID } from 'io-ts-types'

interface ICreateResetPasswordToken {
  adminId: UUID
  expiresIn: string | number
}

export type CreateResetPasswordToken = (userId: ICreateResetPasswordToken) => string
