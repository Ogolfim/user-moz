import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '../../../core/infra/Middleware'
import { clientError } from '../../../core/infra/HttpErrorResponse'
import { ok } from '../../../core/infra/HttpSuccessResponse'
import { tagCreatorPropsValidate } from '../services/validate/tagCreatorPropsValidate'
import { tagSaver } from '../domain/entities/tagSaver'

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
        tagSaver,
        TE.map(newTag => {
          const { id, title } = newTag

          return ok({ id, title })
        })
      )
    })
  )

  return httpResponse
}
