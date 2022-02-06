import * as TE from 'fp-ts/TaskEither'
import { AdminSchema } from '../../infra/prisma/schemas'
import { Name } from '../requiredFields/name'
import { Email } from '../requiredFields/email'
import { HttpErrorResponse } from '../../../../core/infra/http_error_response'

interface AdminSaverProps {
  name: Name
  email: Email
  hash: string
}

export type AdminSaver = (user: AdminSaverProps) => TE.TaskEither<HttpErrorResponse, AdminSchema>
