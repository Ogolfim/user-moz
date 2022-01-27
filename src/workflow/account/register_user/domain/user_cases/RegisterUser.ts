import * as TE from 'fp-ts/lib/TaskEither'
import { Name } from '../requiredFields/Name'
import { User } from '../requiredFields/User'

export interface CreatedUser {
  name: Name
  id_token: string
}

export type RegisterUser = (user: User) => TE.TaskEither<Error, CreatedUser>
