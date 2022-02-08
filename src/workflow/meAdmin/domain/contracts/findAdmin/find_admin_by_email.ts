import * as TE from 'fp-ts/TaskEither'
import { HttpErrorResponse } from '../../../../../core/infra/http_error_response'
import { AdminSchema } from '../../../infra/prisma/schemas'
import { Email } from '../../requiredFields/email'

export type FindAdminByEmailDB = (email: Email) => TE.TaskEither<HttpErrorResponse, AdminSchema | null>
