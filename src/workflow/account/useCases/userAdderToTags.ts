import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '../../../core/infra/Middleware'
import { clientError } from '../../../core/infra/HttpErrorResponse'
import { created } from '../../../core/infra/HttpSuccessResponse'
import { userAdderToTagsPropsValidate } from '../services/validate/userAdderToTagsProps'
import { addUserToTags } from '../domain/entities/addUserToTags'

export const userAdderToTags: Middleware = (_httpRequest, httpBody) => {
  const { userId, tags } = httpBody

  const unValidatedUserTags = { userId, tags }

  const httpResponse = pipe(
    unValidatedUserTags,
    userAdderToTagsPropsValidate,
    E.mapLeft(error => clientError(new Error(error.message))),
    TE.fromEither,
    TE.chain((validUserTags) => {
      return pipe(
        validUserTags,
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
