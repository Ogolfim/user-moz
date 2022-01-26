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

export const registerUser = async ({name, email, password}: User): Promise<E.Either<Error, CreatedUser>> => {

  const user = await saveUser({
    name,
    email,
    password
  })

  if(E.isRight(user)) {
    return {
      _tag: "Right",
      right: {name, email}
    }
  }

  return {
    _tag: "Left",
    left: user.left
  }
}
