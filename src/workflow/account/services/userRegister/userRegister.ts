import * as TE from 'fp-ts/lib/TaskEither'
import { userSaver } from '../domain/entities/userSaver'
import { pipe } from 'fp-ts/lib/function'
import { createAccessToken } from '../infra/http/OAuth/create_id_token'
import { UserRegister } from '../useCases/UserRegister'
import { hashPassword } from './dependencies/hassPassword'

export const userRegister: UserRegister = ({name, email, password}) => {

  const newUser = pipe(
    TE.tryCatch(
      async () => {
        const hash = await hashPassword(password)

        return { name, email, hash }
      },

      (error) => new Error('Ops! Hass password arror')
    ),
    TE.chain(user => pipe(
      user,
      userSaver,
      TE.map(user => {
  
        const id_token = createAccessToken({id: user.id})
  
        return {
          name,
          id_token
        }
      })
    ))
  )

  return newUser

}
