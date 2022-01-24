import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { genPassword } from '../../services/password'
import { Email } from '../requiredFields/Email'
import { Name } from '../requiredFields/Name'
import { User } from '../requiredFields/User'

import { fail } from '../../../../core/infra/HttpResponse'
import { saveUser } from '../entities/saveUser'
import { Password } from '../requiredFields/Password'

interface createdUser {
  name: Name
  email: Email
}

export const registerUser = ({name, email, password}: User): E.Either<Error, createdUser> => {

  pipe(
    password,
    genPassword,
    TE.mapLeft(error => fail(error)),
    TE.map(hash => pipe(
      saveUser({
        name,
        email,
        password: hash as Password
      }),
      TE.mapLeft(error => )
    ))
  )
}
