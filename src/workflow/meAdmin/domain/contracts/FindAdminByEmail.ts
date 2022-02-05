import * as TE from 'fp-ts/TaskEither'
import { HttpErrorResponse } from '../../../../core/infra/HttpErrorResponse'
import { AdminSchema } from '../../infra/prisma/schemas'
import { Email } from '../requiredFields/Email'

export type FindAdminByEmail = (email: Email) => TE.TaskEither<HttpErrorResponse, AdminSchema | null>
