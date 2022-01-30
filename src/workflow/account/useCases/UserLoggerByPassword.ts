import * as TE from 'fp-ts/lib/TaskEither'
import { Name } from '../domain/requiredFields/Name'
import { UserLoggerByPasswordProps } from '../domain/requiredFields/Users/UserLoggerByPasswordProps'

export interface LogedUser {
  name: Name
  id_token: string
}

export type UserLoggerByPassword = (user: UserLoggerByPasswordProps) => TE.TaskEither<Error, LogedUser>
