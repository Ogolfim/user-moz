import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '@core/infra/Middleware'
import { clientError } from '@core/infra/http_error_response'
import { createBillValidate } from '@bills/services/validate/bill/create_bill'
import { createBillDB } from '@bills/domain/entities/unipersonal/create_unipersonal_bill'
import { ok } from '@core/infra/http_success_response'

const createBill: Middleware = (_httpRequest, httpBody) => {
  const { services, billPeriod, userId } = httpBody

  const user = { services, billPeriod, userId }

  const httpResponse = pipe(
    user,
    createBillValidate,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(validBillInfo => pipe(
      createBillDB(validBillInfo)(createBillDB),
      TE.map(customer => {
        return ok(customer)
      })
    ))
  )

  return httpResponse
}
