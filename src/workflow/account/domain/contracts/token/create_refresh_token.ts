import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'
import { UUID } from 'io-ts-types'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { RefreshTokenSchema } from '@account/infra/prisma/schemas'
import { ValidationError } from '@account/services/validate/errors/validation_error'

export type CreateRefreshTokenValidator = (userId: string) => E.Either<ValidationError, UUID>

export type CreateRefreshTokenDB = (userId: UUID) => Promise<RefreshTokenSchema>

export type CreateRefreshTokenService = (createRefreshTokenDB: CreateRefreshTokenDB) =>
(userId: UUID) => TE.TaskEither<HttpErrorResponse, string>
