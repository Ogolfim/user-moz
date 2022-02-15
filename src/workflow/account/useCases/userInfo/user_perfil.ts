import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '@core/infra/middleware'
import { clientError } from '@core/infra/http_error_response'
import { created } from '@core/infra/http_success_response'
import { userPerfilPropsValidate } from '@account/services/validate/user/UserInfo/user_perfil_props'
import { findAllUserInfoDB } from '@account/domain/entities/user/findUser/find_all_user_info'
import { manyTagView } from '@account/services/views/tag'
import { userInfoService } from '@account/services/user/userInfo/user_info'

export const userPerfil: Middleware = (_httpRequest, httpBody) => {
  const { userId } = httpBody

  const httpResponse = pipe(
    userId,
    userPerfilPropsValidate,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain((userId) => {
      return pipe(
        userId,
        userInfoService(findAllUserInfoDB),
        TE.chain(user => {
          return TE.tryCatch(
            async () => {
              if (!user) {
                throw new Error('Oops! Conta não encontrada')
              }

              return user
            },

            notFoundUserError => clientError(notFoundUserError as Error)
          )
        }),
        TE.map(user => {
          const { name, email, tags } = user

          return created(
            {
              name,
              email,
              tags: manyTagView(tags)
            })
        })
      )
    })
  )

  return httpResponse
}
