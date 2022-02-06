import * as TE from 'fp-ts/TaskEither'
import { HttpErrorResponse } from '../../../../core/infra/http_error_response'
import { UserSchema } from '../../infra/prisma/schemas'
import { Email } from '../requiredFields/email'
import { Name } from '../requiredFields/name'
import { ServerName } from '../requiredFields/server_name'

interface FindOrSaveUserProps {
  name: Name
  email: Email
  serverName: ServerName
}

export type FindOrSaveUser = (user: FindOrSaveUserProps) => TE.TaskEither<HttpErrorResponse, UserSchema>
