import * as TE from 'fp-ts/TaskEither'
import { AdminSchema } from '../../infra/prisma/schemas';
import { Name } from '../requiredFields/Name';
import { Email } from '../requiredFields/Email';
import { HttpErrorResponse } from '../../../../core/infra/HttpErrorResponse';


interface AdminSaverProps {
  name: Name
  email: Email
  hash: string
}

export type AdminSaver = (user: AdminSaverProps) => TE.TaskEither<HttpErrorResponse, AdminSchema>