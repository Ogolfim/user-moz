import * as TE from 'fp-ts/TaskEither'
import { UserSchema } from '../../infra/prisma/schemas'
import { Name } from '../requiredFields/name'
import { Email } from '../requiredFields/email'
import { HttpErrorResponse } from '../../../../core/infra/http_error_response'

interface UserSaverProps {
  name: Name
  email: Email
  hash: string
}

export type UserSaver = (user: UserSaverProps) => TE.TaskEither<HttpErrorResponse, UserSchema>
