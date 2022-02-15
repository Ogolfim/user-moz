import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { ValidationError } from '@account/services/validate/errors/validation_error'
import { UpdateUserNameProps } from '@account/domain/requiredFields/Users/update_user_Name_props'
import { Name } from '@account/domain/requiredFields/Name'
import { UserSchema } from '@account/infra/prisma/schemas'
import { UUID } from 'io-ts-types'

interface UnValidatedUser {
  userId: string
  name: string
}

interface IUpdateUserNameDB {
  userId: UUID
  name: Name
}

export type UpdateUserNameValidator = (data: UnValidatedUser) => E.Either<ValidationError, UpdateUserNameProps>

export type UpdateUserNameDB = (user: IUpdateUserNameDB) => Promise<UserSchema>

export type UpdateUserNameService = (createUserDB: UpdateUserNameDB) =>
(user: UpdateUserNameProps) => TE.TaskEither<HttpErrorResponse, UserSchema>
