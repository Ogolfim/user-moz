import * as TE from 'fp-ts/TaskEither'
import { UserSchema } from '../../infra/prisma/schemas';
import { Name } from '../../domain/requiredFields/Name';
import { Email } from '../requiredFields/Email';


interface UserSaverProps {
  name: Name
  email: Email
  hash: string
}

export type UserSaver = (user: UserSaverProps) => TE.TaskEither<Error, UserSchema>