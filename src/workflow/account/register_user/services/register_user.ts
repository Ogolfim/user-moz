import * as TE from 'fp-ts/lib/TaskEither'
import { saveUser } from '../domain/entities/saveUser'
import { pipe } from 'fp-ts/lib/function'
import { createAccessToken } from './create_id_token'
import { RegisterUser } from '../user_cases/RegisterUser'

export const registerUser: RegisterUser = ({name, email, password}) => {

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
