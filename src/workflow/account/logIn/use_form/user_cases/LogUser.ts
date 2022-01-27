import * as TE from 'fp-ts/lib/TaskEither'
import { Name } from '../domain/requiredFields/Name'
import { User } from '../domain/requiredFields/User'

export interface LogedUser {
  name: Name
  id_token: string
}

export type LogUser = (user: User) => TE.TaskEither<Error, LogedUser>
