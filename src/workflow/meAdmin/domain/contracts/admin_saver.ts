import * as TE from 'fp-ts/TaskEither'
import { AdminSchema } from '../../infra/prisma/schemas'
import { Name } from '../requiredFields/name'
import { Email } from '../requiredFields/email'
import { HttpErrorResponse } from '../../../../core/infra/http_error_response'

interface ICreateAdmin {
  name: Name
  email: Email
  hash: string
}

export type CreateAdminDB = (user: ICreateAdmin) => TE.TaskEither<HttpErrorResponse, AdminSchema>
