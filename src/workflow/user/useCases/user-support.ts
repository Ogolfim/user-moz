import { clientError } from '@core/infra/middleware/http_error_response'
import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import { userSupportService } from '@user/services/user-support'
import { userSupportPropsValidator } from '@user/services/validate/user-support'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const userSupportUseCase: Middleware = (_httpRequest, httpBody) => {
  const { name, email, phoneNumber, service, message } = httpBody
  const data = { name, email, phoneNumber, service, message }

  const httpResponse = pipe(
    data,
    userSupportPropsValidator,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(data => pipe(
      data,
      userSupportService,
      TE.map(result => {
        return ok(result)
      })
    ))
  )

  return httpResponse
}
