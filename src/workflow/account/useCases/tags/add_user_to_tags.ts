import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '../../../../core/infra/middleware'
import { clientError } from '../../../../core/infra/http_error_response'
import { created } from '../../../../core/infra/http_success_response'
import { userAdderToTagsPropsValidate } from '../../services/validate/add_user_to_tags_props'
import { addUserToTagsDB } from '../../domain/entities/tags/add_user_to_tags'

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
        addUserToTagsDB,
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
