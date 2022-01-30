import * as TE from 'fp-ts/lib/TaskEither'
import { findUser } from '../domain/entities/findUserByEmail'
import { pipe } from 'fp-ts/lib/function'
import { createAccessToken } from '../infra/http/OAuth/create_id_token'
import { UserLoggerByPassword } from '../useCases/UserLoggerByPassword'
import { Name } from '../domain/requiredFields/Name'
import { verifyPassword } from './dependencies/verifyPassword'

export const userLoggerByPassword: UserLoggerByPassword = ({ email, password}) => {

  const user = pipe(
    findUser(email),
    TE.chain(user => {
      return TE.tryCatch(
        async () => {
          if(!user.hash) throw new Error('Oops! Senha incorreta')

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
