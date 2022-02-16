import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { ValidationError } from '@account/services/validate/errors/validation_error'
import { Email } from '@account/domain/requiredFields/email'
import { UserSchema } from '@account/infra/prisma/schemas'

export type UpdateUserPasswordRequestValidator = (email: string) => E.Either<ValidationError, Email>

export type FindUserByEmailDB = (email: Email) => Promise<UserSchema | null>

export type UpdateUserPasswordRequestService = (findUserByEmailDB: FindUserByEmailDB) =>
(email: Email) => TE.TaskEither<HttpErrorResponse, UserSchema>
