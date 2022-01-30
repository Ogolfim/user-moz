import * as TE from 'fp-ts/TaskEither'
import { UserSchema } from '../../infra/prisma/schemas';
import { Email } from '../requiredFields/Email';
import { Name } from '../requiredFields/Name';
import { ServerName } from '../requiredFields/ServerName';


interface FindOrSaveUserProps {
  name: Name
  email: Email
  serverName: ServerName
}


export type FindOrSaveUser = (user: FindOrSaveUserProps) => TE.TaskEither<Error, UserSchema>