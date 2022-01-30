import * as TE from 'fp-ts/lib/TaskEither'
import { Name } from '../domain/requiredFields/Name'
import { UserLoggerByOauthProps } from '../domain/requiredFields/Users/UserLoggerByOauthProps'

export interface LogedUser {
  name: Name
  id_token: string
}

export type UserLoggerByOauth = (user: UserLoggerByOauthProps) => TE.TaskEither<Error, LogedUser>
