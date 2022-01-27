import * as TE from 'fp-ts/lib/TaskEither'
import { findUser } from '../domain/entities/saveUser'
import { pipe } from 'fp-ts/lib/function'
import { createAccessToken } from './create_id_token'
import { LogUser } from '../user_cases/LogUser'
import { Name } from '../domain/requiredFields/Name'

export const logUser: LogUser = ({ email, password}) => {

  const user = pipe(
    findUser(email),
    TE.map(user => {

      const id_token = createAccessToken({id: user.id})

      return {
        name: user.name as Name,
        id_token
      }
    })
  )

  return user

}
