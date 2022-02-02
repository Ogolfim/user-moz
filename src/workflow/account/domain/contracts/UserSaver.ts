import * as TE from 'fp-ts/TaskEither'
import { UserSchema } from '../../infra/prisma/schemas';
import { Name } from '../../domain/requiredFields/Name';
import { Email } from '../requiredFields/Email';
import { HttpErrorResponse } from '../../../../core/infra/HttpErrorResponse';


interface UserSaverProps {
  name: Name
  email: Email
  hash: string
}

export type UserSaver = (user: UserSaverProps) => TE.TaskEither<HttpErrorResponse, UserSchema>