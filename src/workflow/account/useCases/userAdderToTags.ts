import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '../../../core/infra/Middleware'
import { clientError } from '../../../core/infra/HttpErrorResponse'
import { created } from '../../../core/infra/HttpSuccessResponse'
import { UserAdderToTagsPropsValidate } from '../services/validate/userAdderToTagsProps'
import { addUserToTags } from '../domain/entities/addUserToTags'
import { findUserById } from '../domain/entities/findUserById'

export const userAdderToTags: Middleware = (_httpRequest, httpBody) => {
  const { userId, tags } = httpBody

  const unValidatedUser = { userId, tags }

  const httpResponse = pipe(
    unValidatedUser,
    UserAdderToTagsPropsValidate,
    E.mapLeft(error => clientError(new Error(error.message))),
    TE.fromEither,
    TE.chain(({ userId, tags }) => {
      return pipe(
        userId,
        findUserById,
        TE.chain(foundUser => {
          return TE.tryCatch(
            async () => {
              if (!foundUser) {
                throw new Error('Oops! Usuário não encontrado')
              }

              return { userId, tags }
            },

            userFoundError => clientError(userFoundError as Error)
          )
        })
      )
    }),
    TE.chain((user) => {
      return pipe(
        user,
        addUserToTags,
        TE.map(user => {
          const { name, email } = user

          const event = {
            name,
            email,
            tags
          }

          // accountEventProducer({
          //   topic: 'USER_TAGS',
          //   key: 'user_added_to_tags',
          //   value: JSON.stringify(event)
          // })

          return created(event)
        })
      )
    })
  )

  return httpResponse
}
