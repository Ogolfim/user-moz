import * as TE from 'fp-ts/lib/TaskEither'
import { Email } from '../requiredFields/Email'
import { Name } from '../requiredFields/Name'
import { User } from '../requiredFields/User'

import { saveUser } from '../entities/saveUser'
import { pipe } from 'fp-ts/lib/function'

interface CreatedUser {
  name: Name
  email: Email
}

export const registerUser = ({name, email, password}: User): TE.TaskEither<Error, CreatedUser> => {

  const newUser = pipe(
    saveUser({
      name,
      email,
      password
    }),
    TE.map(() => ({ name, email }))
  )

  return newUser
}
