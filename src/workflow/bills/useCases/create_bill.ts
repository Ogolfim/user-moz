import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '@core/infra/Middleware'
import { clientError } from '@core/infra/http_error_response'
import { createBillValidate } from '@bills/services/validate/bill/create_bill'
import { ok } from '@core/infra/http_success_response'
import { createBillService } from '@bills/services/bill/create_bill'

export const createBillUseCase: Middleware = (_httpRequest, httpBody) => {
  const { services, billPeriod, userId } = httpBody

  const user = { services, billPeriod, userId }

  const httpResponse = pipe(
    user,
    createBillValidate,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(validBillInfo => pipe(
      validBillInfo,
      createBillService,
      TE.map(bill => {
        const {
          services,
          totalAmountToPay,
          nextBillableDay,
          note,
          payment
        } = bill

        const billPaymentStartedEvent = {
          name: '',
          email: '',
          bill: {
            services,
            totalAmountToPay,
            nextBillableDay,
            note,
            paymentDeadline: payment.paymentDeadline
          }
        }
        return ok(billPaymentStartedEvent)
      })
    ))
  )

  return httpResponse
}
