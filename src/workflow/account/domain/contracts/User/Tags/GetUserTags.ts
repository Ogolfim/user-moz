import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { ValidationError } from '@account/services/validate/errors/validation_error'
import { TagSchema } from '@account/infra/prisma/schemas'
import { UUID } from 'io-ts-types'

export type GetUserTagsValidator = (userId: string) => E.Either<ValidationError, UUID>

export type GetUserTagsDB = (userId: UUID) => Promise<TagSchema[]>

export type GetUserTagsService = (getUserTagsDB: GetUserTagsDB) =>
(userId: UUID) => TE.TaskEither<HttpErrorResponse, TagSchema[]>
