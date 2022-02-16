import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { UUID } from 'io-ts-types'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { ValidationError } from '@account/services/validate/errors/validation_error'
import { ResetPasswordProps } from '@account/domain/requiredFields/Users/reset_password_props'
import { UserSchema } from '@account/infra/prisma/schemas'

interface UnValidatedUser {
  userId: string
  password: string
}

interface IUpdateUserPasswordDB {
  userId: UUID
  hash: string
}

export type UpdateUserPasswordValidator = (data: UnValidatedUser) => E.Either<ValidationError, ResetPasswordProps>

export type UpdateUserPasswordDB = (user: IUpdateUserPasswordDB) => Promise<UserSchema>

export type UpdateUserPasswordService = (updateUserPasswordDB: UpdateUserPasswordDB) =>
(user: ResetPasswordProps) => TE.TaskEither<HttpErrorResponse, UserSchema>
