import { Middleware } from '@core/infra/Middleware'
import { pipe } from 'fp-ts/lib/function'

const createBill: Middleware = (httpRequest, httpBody) => {
  const { services, billPeriod, userId } = httpBody

  const httpResponse = pipe(
    customer,
    findOrCreateCustomerValidate,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(validCustomer => pipe(
      findOrCreateCustomer(validCustomer)(findOrCreateCustomerDB),
      TE.map(customer => {
        return ok(customer)
      })
    ))
  )

  return httpResponse
}
