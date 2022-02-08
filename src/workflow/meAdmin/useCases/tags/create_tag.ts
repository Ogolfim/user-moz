import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '../../../../core/infra/middleware'
import { clientError } from '../../../../core/infra/http_error_response'
import { ok } from '../../../../core/infra/http_success_response'
import { tagCreatorPropsValidate } from '../../services/validate/tag_creator_props'
import { createTagDB } from '../../domain/entities/tags/create_tag'

export const tagCreator: Middleware = (_httpRequest, httpBody) => {
  const { id, title } = httpBody

  const httpResponse = pipe(
    { id, title },
    tagCreatorPropsValidate,
    E.mapLeft(err => clientError(new Error(err.message))),
    TE.fromEither,
    TE.chain(validTag => {
      return pipe(
        validTag,
        createTagDB,
        TE.map(newTag => {
          const { id, title } = newTag

          return ok({ id, title })
        })
      )
    })
  )

  return httpResponse
}
