import * as TE from 'fp-ts/lib/TaskEither'
import { findUser } from '../domain/entities/saveUser'
import { pipe } from 'fp-ts/lib/function'
import { createAccessToken } from './create_id_token'
import { LogUser } from '../user_cases/LogUser'
import { Name } from '../domain/requiredFields/Name'
import { verifyPassword } from './verify_password'

export const logUser: LogUser = ({ email, password}) => {

  const user = pipe(
    findUser(email),
    TE.chain(user => {
      return TE.tryCatch(
        async () => {
          const result = await verifyPassword(password, user.hash)

          if(!result) throw new Error('Oops! Senha incorreta')

          return user
        },
        (error) => error as Error
      )
    }),
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
