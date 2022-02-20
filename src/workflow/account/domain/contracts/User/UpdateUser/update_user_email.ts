import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { ValidationError } from '@account/services/validate/errors/validation_error'
import { UpdateUserEmailProps } from '@account/domain/requiredFields/Users/update_user_email_props'
import { Email } from '@account/domain/requiredFields/email'
import { UserSchema } from '@core/infra/prisma/schemas'
import { UUID } from 'io-ts-types'
import { FindUserByIdDB } from '@account/domain/contracts/User/FindUserById'

interface UnValidatedUser {
  userId: string
  email: string
}

interface IUpdateUserEmailDB {
  email: Email
  userId: UUID
}

export type UpdateUserEmailValidator = (data: UnValidatedUser) => E.Either<ValidationError, UpdateUserEmailProps>

export type UpdateUserEmailDB = (user: IUpdateUserEmailDB) => Promise<UserSchema>

export type UpdateUserEmailService = (updateUserEmailDB: UpdateUserEmailDB) =>
(findUserByIdDB: FindUserByIdDB) => (user: UpdateUserEmailProps) => TE.TaskEither<HttpErrorResponse, UserSchema>
