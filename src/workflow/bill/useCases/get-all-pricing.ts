import { getAllPricingDB } from '@bill/domain/entities/get-all-pricing'
import { getAllPricingService } from '@bill/services/get-all-pricing'
import { getAllPricingPropsValidator } from '@bill/services/validate/get-all-pricing'
import { clientError } from '@core/infra/middleware/http_error_response'
import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const getAllPricingUseCase: Middleware = (httpRequest, _httpBody) => {
  const { locale } = httpRequest.params

  const httpResponse = pipe(
    { locale },
    getAllPricingPropsValidator,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(data => pipe(
      data,
      getAllPricingService(getAllPricingDB),
      TE.map(result => {
        return ok(result)
      })
    ))
  )

  return httpResponse
}
