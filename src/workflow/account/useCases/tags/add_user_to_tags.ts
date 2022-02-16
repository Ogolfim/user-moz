import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '@core/infra/middleware'
import { clientError } from '@core/infra/http_error_response'
import { created } from '@core/infra/http_success_response'
import { addUserToTagsPropsValidator } from '@account/services/validate/tags/add_user_to_tags_props'
import { addUserToTagsDB } from '@account/domain/entities/tags/add_user_to_tags'
import { addUserToTagsService } from '@account/services/user/tags/add_user_to_tags'
import { findUserByIdDB } from '@account/domain/entities/user/findUser/find_user_by_id'

export const userAdderToTags: Middleware = (_httpRequest, httpBody) => {
  const { userId, tags } = httpBody

  const unValidatedUserTags = { userId, tags }

  const httpResponse = pipe(
    unValidatedUserTags,
    addUserToTagsPropsValidator,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain((validUserTags) => {
      return pipe(
        validUserTags,
        addUserToTagsService(addUserToTagsDB)((findUserByIdDB)),
        TE.map(data => {
          const { tags, user: { name, email } } = data

          const userAddedToTagsEvent = {
            name,
            email,
            tags
          }

          // accountEventProducer({
          //   topic: 'USER_TAGS',
          //   key: 'user_added_to_tags',
          //   value: JSON.stringify(event)
          // })

          return created(userAddedToTagsEvent)
        })
      )
    })
  )

  return httpResponse
}
