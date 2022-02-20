import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { ValidationError } from '@account/services/validate/errors/validation_error'
import { UpdateUserNameProps } from '@account/domain/requiredFields/Users/update_user_Name_props'
import { Name } from '@account/domain/requiredFields/Name'
import { UserSchema } from '@core/infra/prisma/schemas'
import { UUID } from 'io-ts-types'
import { FindUserByIdDB } from '@account/domain/contracts/User/FindUserById'

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

export type UpdateUserNameService = (updateUserEmailDB: UpdateUserNameDB) =>
(findUserByIdDB: FindUserByIdDB) => (user: UpdateUserNameProps) => TE.TaskEither<HttpErrorResponse, UserSchema>
