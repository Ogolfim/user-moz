import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '@core/infra/Middleware'
import { clientError } from '@core/infra/http_error_response'
import { createBillValidate } from '@bills/services/validate/bill/create_bill'
import { ok } from '@core/infra/http_success_response'
import { createBillService } from '@bills/services/bill/create_bill'
import { findUserByIdService } from '@bills/services/bill/find_user_by_id'
import { findUserByIdDB } from '@bills/domain/entities/user/find_user_by_id'

export const createBillUseCase: Middleware = (_httpRequest, httpBody) => {
  const { services, billPeriod, userId } = httpBody

  const user = { services, billPeriod, userId }

  const httpResponse = pipe(
    user,
    createBillValidate,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(({ userId, services, billPeriod }) => pipe(
      userId,
      findUserByIdService(findUserByIdDB),
      TE.chain(user => {
        const { accountType, name, email } = user

        return pipe(
          { services, billPeriod, userId, accountType },
          createBillService,
          TE.map(bill => {
            const {
              services,
              totalAmountToPay,
              nextBillableDay,
              note,
              payment: { paymentDeadline }
            } = bill

            const billPaymentStartedEvent = {
              name,
              email,
              bill: {
                services,
                totalAmountToPay,
                nextBillableDay,
                note,
                paymentDeadline
              }
            }
            return ok(billPaymentStartedEvent)
          })
        )
      })
    ))
  )

  return httpResponse
}
