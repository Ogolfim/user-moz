import * as TE from 'fp-ts/lib/TaskEither'
import { Email } from '../requiredFields/Email'
import { Name } from '../requiredFields/Name'
import { User } from '../requiredFields/User'

import { saveUser } from '../entities/saveUser'
import { pipe } from 'fp-ts/lib/function'
import { createAccessToken } from '../../services/id_token'

interface CreatedUser {
  name: Name
  id_token: string
}

export const registerUser = ({name, email, password}: User): TE.TaskEither<Error, CreatedUser> => {

  const newUser = pipe(
    saveUser({
      name,
      email,
      password
    }),
    TE.map(user => {

      const id_token = createAccessToken({id: user.id})

      return {
        name,
        id_token
      }
    })
  )

  return newUser
}
