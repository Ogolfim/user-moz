import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '@core/infra/middleware'
import { clientError } from '@core/infra/http_error_response'
import { getUserTagsPropsValidator } from '@account/services/validate/tags/get_user_tags_props'
import { getUserTagsDB } from '@account/domain/entities/tags/get_user_tags'
import { getUserTagsService } from '@account/services/user/tags/get_user_tags'
import { manyTagView } from '@account/services/views/tag'
import { ok } from '@core/infra/http_success_response'

export const getUserTagsUseCase: Middleware = (_httpRequest, httpBody) => {
  const { userId } = httpBody

  const httpResponse = pipe(
    userId,
    getUserTagsPropsValidator,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(validUserId => {
      return pipe(
        validUserId,
        getUserTagsService(getUserTagsDB),
        TE.map(tags => {
          return ok({
            tags: manyTagView(tags)
          })
        })
      )
    })
  )

  return httpResponse
}
