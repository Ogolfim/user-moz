import * as TE from 'fp-ts/lib/TaskEither'
import { Name } from '../domain/requiredFields/Name'
import { UserRegisterProps } from '../domain/requiredFields/Users/UserRegisterProps'

export interface CreatedUser {
  name: Name
  id_token: string
}

export type UserRegister = (user: UserRegisterProps) => TE.TaskEither<Error, CreatedUser>
