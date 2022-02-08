import * as TE from 'fp-ts/TaskEither'
import { UUID } from 'io-ts-types'
import { HttpErrorResponse } from '../../../../../core/infra/http_error_response'
import { RefreshTokenSchema } from '../../../infra/prisma/schemas'

export type RefreshTokenByIdDB = (id: UUID) => TE.TaskEither<HttpErrorResponse, RefreshTokenSchema | null>
