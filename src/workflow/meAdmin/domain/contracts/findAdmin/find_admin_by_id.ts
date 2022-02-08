import * as TE from 'fp-ts/TaskEither'
import { UUID } from 'io-ts-types'
import { HttpErrorResponse } from '../../../../../core/infra/http_error_response'
import { AdminSchema } from '../../../infra/prisma/schemas'

export type FindAdminByIdDB = (id: UUID) => TE.TaskEither<HttpErrorResponse, AdminSchema | null>
