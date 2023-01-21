import { clientError } from '@core/infra/middleware/http_error_response'
import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import { getToolsUserDB } from '@tools/domain/entities/get-tools-user'
import { getToolsUserService } from '@tools/services/get-tools-user'
import { getToolsUserPropsValidator } from '@tools/services/validate/get-tools-user'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const getToolsUserUseCase: Middleware = (_httpRequest, httpBody) => {
  const { userId } = httpBody

  const data = { userId }

  const httpResponse = pipe(
    data,
    getToolsUserPropsValidator,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(data => pipe(
      data,
      getToolsUserService(getToolsUserDB),
      TE.map(result => {
        return ok(result)
      })
    ))
  )

  return httpResponse
}
