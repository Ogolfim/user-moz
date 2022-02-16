import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '@core/infra/middleware'
import { clientError } from '@core/infra/http_error_response'
import { created } from '@core/infra/http_success_response'
import { removeUserFromTagsPropsValidator } from '@account/services/validate/tags/remove_user_from_tags_props'
import { removeUserFromTagsDB } from '@account/domain/entities/tags/remove_user_from_tags'
import { removeUserFromTagsService } from '@account/services/user/tags/remove_user_from_tags'
import { findUserByIdDB } from '@account/domain/entities/user/findUser/find_user_by_id'

export const removeUserFromTags: Middleware = (_httpRequest, httpBody) => {
  const { userId, tags } = httpBody

  const unValidatedUserTags = { userId, tags }

  const httpResponse = pipe(
    unValidatedUserTags,
    removeUserFromTagsPropsValidator,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain((validUserTags) => {
      return pipe(
        validUserTags,
        removeUserFromTagsService(removeUserFromTagsDB)(findUserByIdDB),
        TE.map(data => {
          const { tags, user: { name, email } } = data

          const userRemovedFromTagsEvent = {
            name,
            email,
            tags
          }

          // accountEventProducer({
          //   topic: 'USER_TAGS',
          //   key: 'user_added_to_tags',
          //   value: JSON.stringify(event)
          // })

          return created(userRemovedFromTagsEvent)
        })
      )
    })
  )

  return httpResponse
}
