import { UUID } from 'io-ts-types'

interface ICreateResetPasswordToken {
  userId: UUID
  expiresIn: string | number
}

export type CreateResetPasswordToken = (userId: ICreateResetPasswordToken) => string
