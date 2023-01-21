import { clientError } from '@core/infra/middleware/http_error_response'
import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import { createToolsUserDB } from '@tools/domain/entities/create-tools-user'
import { createToolsUserService } from '@tools/services/create-tools-user'
import { createToolsUserPropsValidator } from '@tools/services/validate/create-tools-user'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const createToolsUserUseCase: Middleware = (_httpRequest, httpBody) => {
  const { userId } = httpBody

  const data = { userId }

  const httpResponse = pipe(
    data,
    createToolsUserPropsValidator,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(data => pipe(
      data,
      createToolsUserService(createToolsUserDB),
      TE.map(result => {
        return ok(result)
      })
    ))
  )

  return httpResponse
}
