import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Email } from '../requiredFields/Email'
import { Name } from '../requiredFields/Name'
import { User } from '../requiredFields/User'

import { saveUser } from '../entities/saveUser'


interface CreatedUser {
  name: Name
  email: Email
}

export const registerUser = ({name, email, password}: User): E.Either<Error, CreatedUser> => {

  const user = TE.tryCatch(
    async () => {
      return await saveUser({
        name,
        email,
        password
      })
    },

    (error) => error as Error
  )
}
