import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { UUID } from 'io-ts-types'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { UserSchema, UserServicesSchema } from '@core/infra/prisma/schemas'
import { FindUserByIdDB } from '@account/domain/contracts/User/FindUserById'
import { ValidationError } from '@account/services/validate/errors/validation_error'

interface User extends UserSchema {
  userServices: UserServicesSchema
}

export type GetUserValidator = (userId: string) => E.Either<ValidationError, UUID>

export type GetUserService = (findUserByIdDB: FindUserByIdDB) =>
(userId: UUID) => TE.TaskEither<HttpErrorResponse, User>
