import * as TE from 'fp-ts/lib/TaskEither'
import { findOrSaveUser } from '../domain/entities/findOrSaveOauthUser'
import { pipe } from 'fp-ts/lib/function'
import { createAccessToken } from '../infra/http/OAuth/create_id_token'
import { UserLoggerByOauth } from '../useCases/UserLoggerByOauth'
import { Name } from '../domain/requiredFields/Name'

export const userLoggerByOauth: UserLoggerByOauth = ({ email, name, serverName}) => {

  const user = pipe(
    findOrSaveUser({ email, name, serverName}),
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
