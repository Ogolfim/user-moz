import * as TE from 'fp-ts/TaskEither'
import { UUID } from 'io-ts-types'
import { HttpErrorResponse } from '../../../../core/infra/HttpErrorResponse'
import { RefreshTokenSchema } from '../../infra/prisma/schemas'

export type RefreshTokenById = (id: UUID) => TE.TaskEither<HttpErrorResponse, RefreshTokenSchema | null>
