import * as TE from 'fp-ts/lib/TaskEither'
import { UUID } from 'io-ts-types'
import { UserSchema } from '@core/infra/prisma/schemas'
import { HttpErrorResponse } from '@core/infra/http_error_response'

export type FindUserByIdDB = (id: UUID) => Promise<UserSchema | null>

export type FindUserByIdService = (findUserByIdDB: FindUserByIdDB) =>
(userId: UUID) => TE.TaskEither<HttpErrorResponse, UserSchema>
