import * as TE from 'fp-ts/TaskEither'
import { UUID } from 'io-ts-types'
import { HttpErrorResponse } from '../../../../core/infra/http_error_response'
import { UserSchema } from '../../infra/prisma/schemas'

export type FindUserById = (id: UUID) => TE.TaskEither<HttpErrorResponse, UserSchema | null>
