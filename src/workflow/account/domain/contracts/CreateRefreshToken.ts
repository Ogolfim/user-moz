import * as TE from 'fp-ts/TaskEither'
import { UUID } from 'io-ts-types'
import { HttpErrorResponse } from '../../../../core/infra/HttpErrorResponse'
import { RefreshTokenSchema } from '../../infra/prisma/schemas'

export type CreateRefreshToken = (userId: UUID) => TE.TaskEither<HttpErrorResponse, RefreshTokenSchema>
